import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";

export default function TaskNotFound() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-slate-900">Task Not Found</h1>
          <p className="mt-2 text-slate-500">
            The task you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
          <Link href="/">
            <Button className="mt-6">Back to Projects</Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
