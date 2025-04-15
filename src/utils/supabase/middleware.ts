// src/utils/supabase/middleware.ts
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  // Initialize NextResponse based on the incoming request.
  let response = NextResponse.next({ request });

  // Create a Supabase server client that reads cookies from the incoming request.
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        // This callback writes cookies that Supabase updates
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) => {
            // Update the request cookie store (if needed).
            request.cookies.set(name, value);
          });
          // Create a new NextResponse so we can update its cookie header.
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  // Read the current session.
  let { data: { session } } = await supabase.auth.getSession();

  // If a session exists and the token has expired, call refreshSession.
  if (session?.provider_token && session.expires_at) {
    if (session.expires_at * 1000 < Date.now()) {
      const { data: refreshData, error: refreshError } = await supabase.auth.refreshSession();
      if (!refreshError && refreshData.session) {
        // On a successful refresh, update the local session variable.
        session = refreshData.session;
        // The setAll callback in createServerClient should have updated the cookies.
      }
      // Optionally, you could log or handle refreshError if needed.
    }
  }

  // Optionally, get the user after the potential refresh so that the latest state is used.
  const { data: { user } } = await supabase.auth.getUser();

  // If the user is not authenticated and the route is not one of the public ones, redirect.
  if (
    request.nextUrl.pathname !== "/" &&
    !request.nextUrl.pathname.startsWith("/login") &&
    !request.nextUrl.pathname.startsWith("/auth") &&
    !user
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Return the updated response (with refreshed cookies, if applicable).
  return response;
}
