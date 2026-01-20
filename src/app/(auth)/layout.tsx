import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TaskMan",
  description: "TaskMan Application",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
