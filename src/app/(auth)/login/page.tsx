import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SignInForm from "@/components/features/auth/sign-in-form";
import SignUpForm from "@/components/features/auth/sign-up-form";

export default function LoginPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome back</CardTitle>
        <CardDescription>Sign in to your account to continue</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mt-6 text-center text-sm">
          <SignInForm />          
        </div>
        <div className="mt-6 text-center text-sm w-full">
          <SignUpForm />
          <span className="mt-4 text-zinc-600">Don't have an account? </span>
          <Link
            href="/signup"
            className="font-medium text-zinc-900 hover:underline"
          >
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
