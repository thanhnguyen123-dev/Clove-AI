// "use client";

// import { createContext, useContext } from "react";
// import { useUser, useAuth as useClerkAuth } from "@clerk/nextjs";
// import type { User } from "@clerk/nextjs/server";

// type AuthContextType = {
//   user: User | null;
//   userId: string | null;
//   isLoaded: boolean;
//   isSignedIn: boolean;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// }

// export function AuthProvider({
//   children
// }: {
//   children: React.ReactNode;
// }) {
//   const { user, isLoaded, isSignedIn } = useUser();
//   const { userId } = useClerkAuth();

//   const value: AuthContextType = {
//     user,
//     userId,
//     isLoaded,
//     isSignedIn
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// }