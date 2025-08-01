import { auth } from "@/lib/auth";
import PremiumUpgradeView, {
  PremiumUpgradeViewError,
  PremiumUpgradeViewLoading,
} from "@/modules/premium/ui/views/premium-upgrade-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const Page = async () => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.premium.getCurrentSubscription.queryOptions()
  );

  void queryClient.prefetchQuery(trpc.premium.getProducts.queryOptions());

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/sign-in");
  }
  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<PremiumUpgradeViewLoading />}>
          <ErrorBoundary fallback={<PremiumUpgradeViewError />}>
            <PremiumUpgradeView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
};

export default Page;
