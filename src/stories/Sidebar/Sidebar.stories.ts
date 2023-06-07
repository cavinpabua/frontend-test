import type { Meta, StoryObj } from "@storybook/react";

import PrivateLayout from "../../components/Shared/PrivateLayout";

const meta: Meta<typeof PrivateLayout> = {
  title: "SideBar",
  component: PrivateLayout,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PrivateLayout>;

export const Simple: Story = {
  args: {},
};
