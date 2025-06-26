"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";


const HomeView = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  if (!session) {
    return <div className="flex flex-col p-4 gap-y-4">Loading....</div>;
  }
  return (
    <div className="flex flex-col p-4 gap-y-4">
      <div className="text-xl font-semibold">Welcome, {session.user?.name || session.user?.email || "Guest"}!</div>
      <Button
        onClick={() =>
          authClient.signOut({
            fetchOptions: {
              onSuccess: () => router.push("/sign-in"),
            },
          })
        }
      >
        Sign Out
      </Button>
    </div>
  );
};

export default HomeView;
