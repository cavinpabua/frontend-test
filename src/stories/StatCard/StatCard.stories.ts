import type { Meta, StoryObj } from "@storybook/react";

import StatCard from "../../components/Shared/StatCard";

const meta: Meta<typeof StatCard> = {
  title: "StatCard",
  component: StatCard,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof StatCard>;

export const Simple: Story = {
  args: {
    value: 13321,
    statTitle: "Sample Title",
    cardTitle: "Sample Card Title",
  },
};

export const WithPrecision: Story = {
  args: {
    value: 133231,
    statTitle: "Sample Title With Precision",
    cardTitle: "Sample Card Title With Precision",
    precision: 2,
  },
};

export const WithPercent: Story = {
  args: {
    value: 13321,
    statTitle: "Sample Title",
    cardTitle: "Sample Card Title",
    percent: 50,
    badgeColor: "green",
  },
};
