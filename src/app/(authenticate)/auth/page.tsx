import { AuthCard } from "@/components/auth-card";

export default function Auth() {
  return (
    <main className="w-full min-h-screen pt-24">
      <section className="min-w-full min-h-full flex flex-col items-center-safe justify-center-safe p-5">
        <AuthCard className="max-w-lg w-full" />
      </section>
    </main>
  );
}
