"use client";

import ErrorState from "@/components/error-state";
import LoadingState from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";

const MeetingsView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}));
  return (
    <div className="overflow-x-scroll">{JSON.stringify(data, null, 2)}</div>
  );
};

export default MeetingsView;

export const MeetingsViewLoading = () => {
  return (
    <div>
      <LoadingState
        title="Loading the meetings"
        description="This may take a few seconds..."
      />
    </div>
  );
};

export const MeetingsViewError = () => {
  return (
    <div>
      <ErrorState
        title="Error loading meetings"
        description="Please try again later!"
      />
    </div>
  );
};