import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Tag } from "./Tag";
import { shortAddress } from "../../../helpers";

export default {
  title: "Tag/Tags",
  component: Tag,
} as ComponentMeta<typeof Tag>;

const Template: ComponentStory<typeof Tag> = (args) => <Tag {...args} />;

export const CategoryTag = Template.bind({});
CategoryTag.args = {
  text: "messaging",
};

export const WalletAddressTag = Template.bind({});
WalletAddressTag.args = {
  text: shortAddress("0x1234567890123456789012345678901234567890") as any,
};

export const EnsAddressTag = Template.bind({});
EnsAddressTag.args = {
  text: "hi.xmtp.eth" as any,
};

export const LensAddressTag = Template.bind({});
LensAddressTag.args = {
  text: "test.lens" as any,
};

export const TagLoading = Template.bind({});
TagLoading.args = {
  isLoading: true,
};
