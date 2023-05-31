import React from "react";
import { MessageInput } from "../component-library/components/MessageInput/MessageInput";
import { RecipientInputMode } from "../helpers";
import useGetRecipientInputMode from "../hooks/useGetRecipientInputMode";
import useSendMessage from "../hooks/useSendMessage";
import { useXmtpStore } from "../store/xmtp";
import { address } from "../pages/inbox";
import { Attachment } from "xmtp-content-type-remote-attachment";

interface MessageInputWrapperProps {
  attachment?: Attachment;
  attachmentPreview?: string;
  setAttachment: Function;
  setAttachmentPreview: Function;
  setIsDragActive: Function;
}

export const MessageInputWrapper = ({
  attachment,
  setAttachment,
  attachmentPreview,
  setAttachmentPreview,
  setIsDragActive,
}: MessageInputWrapperProps) => {
  // XMTP Hooks
  const { recipientInputMode } = useGetRecipientInputMode();
  const conversationId = useXmtpStore((state) => state.conversationId);
  const { sendMessage } = useSendMessage(
    conversationId as address,
    attachment || undefined,
  );

  return (
    <MessageInput
      isDisabled={recipientInputMode !== RecipientInputMode.OnNetwork}
      onSubmit={sendMessage}
      conversationId={conversationId}
      attachment={attachment}
      setAttachment={setAttachment}
      attachmentPreview={attachmentPreview}
      setAttachmentPreview={setAttachmentPreview}
      setIsDragActive={setIsDragActive}
    />
  );
};
