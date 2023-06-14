import type { Meta, StoryObj } from "@storybook/react";

import StatCard from "../../components/Shared/StatCard";

const meta: Meta<typeof StatCard> = {
  title: "StatCard",
  component: StatCard,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof StatCard>;

export const Rising: Story = {
  args: {
    value: 14425,
    statTitle: "Total Send",
    subText: "Everything you've sent",
    isRising: true,
  },
};

export const Falling: Story = {
  args: {
    value: 23.81,
    statTitle: "Open Rate",
    subText: "13,980 Opened your emails",
    isRising: false,
    precision: 2,
    isPercent: true,
  },
};
