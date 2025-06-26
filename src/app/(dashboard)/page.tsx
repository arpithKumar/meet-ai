import { auth } from "@/lib/auth";
import HomeView from "@/modules/home/ui/views/home-view";
import { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userDisplayName =
    session?.user?.name || session?.user?.email || "Guest";
  
  console.log(`Generating metadata for user: ${userDisplayName}`);
  
  return {
    title: `${userDisplayName} | Meet.AI`,
    description: "AI-powered meeting experience.",
  };
}

const Page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/sign-in");
  }
  return <HomeView />;
};

export default Page;
