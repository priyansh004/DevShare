import { redirect } from "next/navigation";
import { getCurrentUser } from "./auth-server";

export async function requireAuth() {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect("/auth/signin");
  }
  
  return user;
}

export async function optionalAuth() {
  return await getCurrentUser();
}

