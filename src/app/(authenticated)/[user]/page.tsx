import DashboardPage from '@/components/dashboard/dashboard-page';
import { HydrateClient } from '@/trpc/server';
// import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

const page = async () => {
  // const supabase = await createClient();
  // const { data: { user } } = await supabase.auth.getUser();

  if (true) {
    redirect("/");
  }

  return (
    <HydrateClient>
      <DashboardPage />
    </HydrateClient>
  );
}

export default page;