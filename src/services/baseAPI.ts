import { createApi, fetchBaseQuery, BaseQueryFn } from "@reduxjs/toolkit/query/react";
import type { FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { setAccessToken, logout } from "@/store/authSlice";
import type { RootState } from "@/store/store";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL ?? "/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    const refreshResult = await baseQuery(
      { url: "/auth/refresh", method: "POST" },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      const { accessToken } = refreshResult.data as { accessToken: string };
      api.dispatch(setAccessToken(accessToken));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User", "Notes"],
  endpoints: (builder) => ({
    getUser: builder.query<any, void>({
      query: () => "/user/me",
      providesTags: (result) => (result ? [{ type: "User", id: "CURRENT" }] : []),
    }),
    refreshToken: builder.mutation<{ accessToken: string }, void>({
      query: () => ({ url: "/auth/refresh", method: "POST" }),
    }),
    getNotes: builder.query<
      { id: number; title: string; body: string; tags?: string[] }[],
      void
    >({
      query: () => ({
        // Public dummy JSON API endpoint (GET)
        url: "https://dummyjson.com/posts?limit=20",
        method: "GET",
      }),
      transformResponse: (resp: any) => resp?.posts ?? [],
      providesTags: (result) =>
        result
          ? [{ type: "Notes" as const, id: "LIST" }, ...result.map((n) => ({ type: "Notes" as const, id: n.id }))]
          : [{ type: "Notes" as const, id: "LIST" }],
    }),
    addNote: builder.mutation<
      { id: number; title: string; body: string },
      { title: string; body: string }
    >({
      query: (body) => ({
        // Public dummy JSON API endpoint (POST)
        url: "https://dummyjson.com/posts/add",
        method: "POST",
        body: { ...body, userId: 1 },
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: [{ type: "Notes", id: "LIST" }],
    }),
  }),
});

export const {
  useGetUserQuery,
  useRefreshTokenMutation,
  useGetNotesQuery,
  useAddNoteMutation,
} = apiSlice;
