"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login, signup } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export default function SignInForm() {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <form action={action} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          required
        />
        {state?.errors?.email && <p>{state.errors.email}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          required
          minLength={8}
        />
        {state?.errors?.password && <p>{state.errors.password}</p>}

        <p className="text-xs text-muted-foreground">
          Must be at least 8 characters
        </p>
      </div>
      <Button type="submit" className="w-full bg-slate-700" disabled={pending}>
        {pending && <Spinner />}
        Sign In
      </Button>
    </form>
  );
}
