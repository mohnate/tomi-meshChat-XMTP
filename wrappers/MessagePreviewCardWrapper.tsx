import { Conversation } from "@xmtp/react-sdk";
import React from "react";
import { useEnsAvatar, useEnsName } from "wagmi";
import { MessagePreviewCard } from "../component-library/components/MessagePreviewCard/MessagePreviewCard";
import {
  XMTP_FEEDBACK_ADDRESS,
  getConversationId,
  shortAddress,
} from "../helpers";
import { address } from "../pages/inbox";
import { useXmtpStore } from "../store/xmtp";
import MessageContentWrapper from "./MessageContentWrapper";

interface MessagePreviewCardWrapperProps {
  convo?: Conversation;
}
export const MessagePreviewCardWrapper = ({
  convo,
}: MessagePreviewCardWrapperProps) => {
  // XMTP State
  const previewMessages = useXmtpStore((state) => state.previewMessages);
  const recipientWalletAddress = useXmtpStore(
    (state) => state.recipientWalletAddress,
  );
  const setRecipientWalletAddress = useXmtpStore(
    (state) => state.setRecipientWalletAddress,
  );
  const conversationId = useXmtpStore((state) => state.conversationId);

  const setConversationId = useXmtpStore((state) => state.setConversationId);
  const previewMessage = previewMessages.get(getConversationId(convo));

  // Get ENS name and avatar from Wagmi
  const { data: previewEnsName } = useEnsName({
    address: convo?.peerAddress as address,
  });
  const { data: convoAvatarUrl, isLoading: convoAvatarLoading } = useEnsAvatar({
    address: convo?.peerAddress as address,
  });

  // Helpers
  const isSelected = conversationId === getConversationId(convo);

  const onConvoClick = (conversation: Conversation) => {
    if (recipientWalletAddress !== conversation.peerAddress) {
      setRecipientWalletAddress(conversation.peerAddress);
    }
    if (conversationId !== getConversationId(conversation)) {
      setConversationId(getConversationId(conversation));
    }
  };

  const conversationDomain = convo?.context?.conversationId.split("/")[0] ?? "";

  return (
    <MessagePreviewCard
      isSelected={isSelected}
      key={previewMessage?.id}
      text={
        previewMessage?.content ? (
          <MessageContentWrapper
            content={
              typeof previewMessage.content !== "string"
                ? "Attachment"
                : previewMessage?.content
            }
          />
        ) : undefined
      }
      datetime={previewMessage?.sent}
      displayAddress={previewEnsName || shortAddress(convo?.peerAddress || "")}
      onClick={() => {
        if (convo) {
          onConvoClick?.(convo);
        }
      }}
      isLoading={convoAvatarLoading}
      avatarUrl={convoAvatarUrl || ""}
      conversationDomain={shortAddress(conversationDomain)}
      pinned={convo?.peerAddress === XMTP_FEEDBACK_ADDRESS}
      address={convo?.peerAddress}
    />
  );
};
