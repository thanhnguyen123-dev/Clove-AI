"use server";

import { createClient } from "@/utils/supabase/server";
import type { Provider } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

const signInWith = async (provider: Provider) => {
  const supabase = await createClient();
  const auth_callback_url = process.env.SITE_URL + "/auth/callback";

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: auth_callback_url,
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  redirect(data.url);
}

const signInWithGoogle = async () => {
  await signInWith("google");
}

const signInWithGithub = async () => {
  await signInWith("github");
}


export { signInWithGoogle, signInWithGithub };