"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import LoadingState from "@/components/loading-state";
import ErrorState from "@/components/error-state";

export const AgentsView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());
  return <div>{JSON.stringify(data, null, 2)}</div>;
};

export const AgentsViewLoading = () => {
  return (
    <div>
      <LoadingState
        title="Loading Agents"
        description="This may take a few seconds..."
      />
    </div>
  );
};

export const AgentsViewError = () => {
  return (
    <div>
      <ErrorState
        title="Error loading agents"
        description="Please try again later!"
      />
    </div>
  );
};
