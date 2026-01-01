import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getUserData, verifySession } from "@/lib/dal";
import UserMenu from "@/components/features/auth/user-menu";

export default async function Navbar() {
  const session = await verifySession();
  const isAuthenticated = session?.isAuth;
  console.log(session);

  const user = await getUserData();

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-zinc-200 bg-background-light backdrop-blur-md supports-backdrop-filter:bg-white/60">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-xl font-bold tracking-tight text-zinc-900 transition-colors hover:text-zinc-700"
          >
            <div className="flex h-8 w-8 items-center justify-center">
              <img src="/icon.svg" />
            </div>
            <span className="hidden sm:inline text-primary tracking-tight">
              Taskman
            </span>
          </Link>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <UserMenu user={user} />
            ) : (
              <div className="flex items-center gap-2">
                {/* <Button variant="ghost" asChild>
									<Link href="/login">Sign In</Link>
								</Button> */}
                <Button asChild>
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
