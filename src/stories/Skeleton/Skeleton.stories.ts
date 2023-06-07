import type { Meta, StoryObj } from "@storybook/react";

import Skeleton from "../../components/Shared/Skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Simple: Story = {
  args: {
    className: "w-32 h-32",
  },
};
