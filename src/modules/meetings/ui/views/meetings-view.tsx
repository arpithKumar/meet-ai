"use client";

import { DataTable } from "@/components/data-table";
import ErrorState from "@/components/error-state";
import LoadingState from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";
import { columns } from "../components/columns";
import EmptyState from "@/components/empty-state";

const MeetingsView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}));
  return (
    <div className="flex flex-1 flex-col gap-y-4 pb-4 px-4 md:px-8">
      <DataTable data={data.items} columns={columns} />
      {data.items.length === 0 && (
        <EmptyState
          title="Create your first meeting"
          description="Schedule a meeting to connect with others. Each meeting lets you collaborate, share ideas, and interact with participants in real time..."
        />
      )}
    </div>
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
