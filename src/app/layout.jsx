import Providers from "@/provider/providers";
import MainLayout from "@/layout/MainLayout";

export const metadata = {
  title: "Media @ Marsons Test",
  description: "Media @ Marsons Test",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <MainLayout>{children}</MainLayout>
        </Providers>
      </body>
    </html>
  );
}
