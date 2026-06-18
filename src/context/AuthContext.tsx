/* eslint-disable react-refresh/only-export-components */

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type {
  Session,
  User,
} from "@supabase/supabase-js";

import { supabase } from "../lib/supabase";
import type { Profile } from "../types/profile";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;

  signIn(
    email: string,
    password: string
  ): Promise<void>;

  signOut(): Promise<void>;

  refreshProfile(): Promise<void>;
}

export const AuthContext =
  createContext<AuthContextType>(
    {} as AuthContextType
  );

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [session, setSession] =
    useState<Session | null>(null);

  const [user, setUser] =
    useState<User | null>(null);

  const [profile, setProfile] =
    useState<Profile | null>(null);

  const [loading, setLoading] =
    useState(true);

  async function loadProfile(
    userId: string
  ) {
    try {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .maybeSingle();

      setProfile(data ?? null);

    } catch (error) {

      console.error(error);

      setProfile(null);
    }
  }

  async function refreshProfile() {

    if (!user) return;

    await loadProfile(user.id);
  }

  async function signIn(
    email: string,
    password: string
  ) {

    const { error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (error) throw error;
  }

  async function signOut() {

    await supabase.auth.signOut();

    setSession(null);
    setUser(null);
    setProfile(null);
  }

  useEffect(() => {

    async function initialize() {

      try {

        const { data } =
          await supabase.auth.getSession();

        setSession(data.session);

        setUser(
          data.session?.user ?? null
        );

        if (data.session?.user) {
          await loadProfile(
            data.session.user.id
          );
        }

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);
      }
    }

    initialize();

    const {
      data: listener,
    } = supabase.auth.onAuthStateChange(
      async (_, session) => {

        setSession(session);

        setUser(
          session?.user ?? null
        );

        if (session?.user) {
          await loadProfile(
            session.user.id
          );
        } else {
          setProfile(null);
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };

  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        loading,
        signIn,
        signOut,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}