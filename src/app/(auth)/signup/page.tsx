import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SignUpForm from "@/components/features/auth/sign-up-form";

export default function SignupPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
        <CardDescription>Sign Up</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter>
        <div className="text-center text-sm w-full">
          <SignUpForm />
          {/* <span className="text-zinc-600">Already have an account? </span>
					<Link href="/login" className="font-medium text-zinc-900 hover:underline">
						Sign in
					</Link> */}
        </div>
      </CardFooter>
    </Card>
  );
}
