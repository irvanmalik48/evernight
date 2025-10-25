import { AuthCard } from "@/components/auth-card";
import { EvernightLogoText } from "@/components/svg/evernight-logo-text";

export default function Auth() {
  return (
    <main className="w-full min-h-screen pt-16">
      <section className="min-w-full min-h-full flex flex-col gap-8 items-center-safe justify-center-safe p-5">
        <EvernightLogoText className="w-[360px]" />
        <AuthCard className="max-w-lg w-full" />
      </section>
    </main>
  );
}
