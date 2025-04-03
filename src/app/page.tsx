
import { api, HydrateClient } from "@/trpc/server";
import { createClient } from "@/utils/supabase/server";
import SignOutButton from "@/components/ui/signout-button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import TryoutButton from "@/components/ui/tryout-button";

export default async function Home() {
  const supabase = await createClient();

  const { data: {session}} = await supabase.auth.getSession();

  if (!session) {
    return (
      <HydrateClient>
        <main className="flex min-h-screen flex-col gap-2 items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
          <p>hello</p>
          <TryoutButton />
        </main>
      </HydrateClient>
    )
  }

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col gap-2 items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <p>hello</p>
        <p>{session?.user?.email}</p>
        <Avatar>
          <AvatarImage src={session?.user?.user_metadata.avatar_url} />
          <AvatarFallback>
            {session?.user?.user_metadata.name?.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <SignOutButton />   
      </main>
    </HydrateClient>
  );
}