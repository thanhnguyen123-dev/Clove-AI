
import { api, HydrateClient } from "@/trpc/server";
import { createClient } from "@/utils/supabase/server";
import LoginButton from "./_components/LoginButton";
import SignOutButton from "./_components/SignOutButton";

export default async function Home() {
  const supabase = await createClient();

  const { data: {session}} = await supabase.auth.getSession();

  if (!session) {
    return (
      <HydrateClient>
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
          <p>hello</p>
          <LoginButton />
        </main>
      </HydrateClient>
    )
  }

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <p>hello</p>
        <p>{session?.user?.email}</p>
        <SignOutButton />   
      </main>
    </HydrateClient>
  );
}
