import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TaskMan",
  description: "TaskMan Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4`">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
