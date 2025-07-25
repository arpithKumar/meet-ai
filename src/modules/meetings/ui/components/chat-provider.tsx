"use client";

import LoadingState from "@/components/loading-state";
import { authClient } from "@/lib/auth-client";
import React from "react";
import ChatUI from "./chat-ui";

interface ChatProviderProps {
  meetingId: string;
  meetingName: string;
}

const ChatProvider = ({ meetingId, meetingName }: ChatProviderProps) => {
  const { data, isPending } = authClient.useSession();

  if (isPending || !data?.user) {
    return (
      <LoadingState
        title="Loading..."
        description="Please wait while we load the chat"
      />
    );
  }
  const { id: userId, name: userName, image: userImage } = data.user;

  return (
    <ChatUI
      meetingId={meetingId}
      meetingName={meetingName}
      userId={userId}
      userName={userName}
      userImage={userImage ?? ""}
    />
  );
};

export default ChatProvider;
