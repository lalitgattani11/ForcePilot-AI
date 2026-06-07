/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useEffect, useState } from "react";

import type { ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";

import { supabase } from "../lib/supabase";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  const [session, setSession] = useState<Session | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session);
      setUser(session?.user ?? null);

      setLoading(false);
    };

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);

      const currentUser = session?.user ?? null;
      setUser(currentUser);

      // Welcome Email Trigger: Only send if not already marked as sent in user metadata
      if (
        event === "SIGNED_IN" &&
        currentUser &&
        !currentUser.user_metadata?.welcome_email_sent
      ) {
        try {
          const API_URL = import.meta.env.VITE_API_URL;

          const response = await fetch(`${API_URL}/api/email/login-email`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: currentUser.email,
              name: currentUser.user_metadata?.full_name || "Candidate",
            }),
          });

          if (response.ok) {
            await Promise.race([
              supabase.auth.updateUser({
                data: {
                  welcome_email_sent: true,
                },
              }),

              new Promise((_, reject) =>
                setTimeout(
                  () => reject(new Error("UPDATE_USER_TIMEOUT")),
                  10000,
                ),
              ),
            ]);
          } else {
            console.error("[AUTH] Email API failed");
          }
        } catch (error) {
          console.error("[AUTH] Welcome email error:", error);
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });
  };

  const signOut = async () => {
    sessionStorage.clear();

    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        signInWithGoogle,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
