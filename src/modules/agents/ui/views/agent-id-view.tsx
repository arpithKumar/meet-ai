"use client";

import ErrorState from "@/components/error-state";
import LoadingState from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";
import AgentIdViewHeader from "../components/agent-id-view-header";
import GeneratedAvatar from "@/components/generatedAvatar";
import { Badge } from "@/components/ui/badge";
import { CornerDownRightIcon, VideoIcon } from "lucide-react";

interface AgentIdViewProps {
  agentId: string;
}

const AgentIdView = ({ agentId }: AgentIdViewProps) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.agents.getOne.queryOptions({ id: agentId })
  );

  return (
    <div className="flex-1 py-4 px-4 flex flex-col gap-y-4 md:px-8">
      <AgentIdViewHeader
        agentId={agentId}
        agentName={data.name}
        onEdit={() => {}}
        onRemove={() => {}}
      />
      <div className="bg-white rounded-lg border">
        <div className="px-4 py-5 gap-y5 flex flex-col col-span-5">
          <div className="flex items-center gap-x-3 pb-4">
            <GeneratedAvatar
              variant="botttsNeutral"
              seed={data.name}
              className="size-10"
            />
            <h2 className="text-2xl font-medium">{data.name}</h2>
          </div>
          <Badge
            variant={"outline"}
            className="flex items-center gap-x-2 p-0.5 px-2 [&>svg]:size-5 m-2"
          >
            <VideoIcon className="text-blue-700" />
            {data.meetingCount}{" "}
            {data.meetingCount === 1 ? "meeting" : "meetings"}
          </Badge>
          <div className="flex flex-col gap-y-4">
            <p className="text-lg font-medium mx-2.5">Instructions</p>
            <div className="flex items-center gap-x-2 mx-2">
              <CornerDownRightIcon className="ml-4 size-3 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {data.instructions}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentIdView;

export const AgentsIdViewLoading = () => {
  return (
    <div>
      <LoadingState
        title="Loading Agents"
        description="This may take a few seconds..."
      />
    </div>
  );
};

export const AgentsIdViewError = () => {
  return (
    <div>
      <ErrorState
        title="Error loading agents"
        description="Please try again later!"
      />
    </div>
  );
};
