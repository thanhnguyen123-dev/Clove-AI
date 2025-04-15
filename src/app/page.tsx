import { HydrateClient } from "@/trpc/server";

import TryoutButton from "@/components/ui/tryout-button";
import { redirect } from "next/navigation";

export default async function Home() {
  // const supabase = await createClient();
  // const { data: { user } } = await supabase.auth.getUser();

  // if (user) {
  //   redirect(`/${user.user_metadata.user_name}`);
  // }

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col gap-2 items-center justify-center">
        <p>AI Agent landing page</p>
        <TryoutButton />
      </main>
    </HydrateClient>
  );
  
}