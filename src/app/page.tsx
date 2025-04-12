
import { HydrateClient } from "@/trpc/server";
import { createClient } from "@/utils/supabase/server";
import TryoutButton from "@/components/ui/tryout-button";
import DashboardPage from "@/components/dashboard/dashboard-page";
import { AuthProvider } from "@/contexts/auth-context";

export default async function Home() {
  const supabase = await createClient();

  const { data: { session } } = await supabase.auth.getSession();
  const { data: { user } } = await supabase.auth.getUser();
  if (!session) {
    return (
      <HydrateClient>
        <main className="flex min-h-screen flex-col gap-2 items-center justify-center">
          <p>AI Agent landing page</p>
          <TryoutButton />
        </main>
      </HydrateClient>
    );
  }

  return (
    <HydrateClient> 
      <AuthProvider 
        user={user}
      >
        <DashboardPage 
        />
      </AuthProvider>
    </HydrateClient>
  );
}