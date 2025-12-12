"use client";

import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">TaskMan</h1>
            <p className="text-sm text-slate-500">
              Manage all your projects, tasks, and subtasks in one organized space
            </p>
          </div>
          <Button variant="outline">My Account</Button>
        </div>
      </div>
    </header>
  );
}
