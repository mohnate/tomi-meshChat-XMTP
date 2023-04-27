import React from "react";
import { MessageInput } from "../component-library/components/MessageInput/MessageInput";
import { RecipientInputMode } from "../helpers";
import useGetRecipientInputMode from "../hooks/useGetRecipientInputMode";
import useSendMessage from "../hooks/useSendMessage";
import { useXmtpStore } from "../store/xmtp";
import { address } from "../pages/inbox";

export const MessageInputWrapper = () => {
  // XMTP Hooks
  const { recipientInputMode } = useGetRecipientInputMode();
  const conversationId = useXmtpStore((state) => state.conversationId);
  const { sendMessage } = useSendMessage(conversationId as address);

  return (
    <MessageInput
      isDisabled={recipientInputMode !== RecipientInputMode.OnNetwork}
      onSubmit={sendMessage}
      conversationId={conversationId}
    />
  );
};
