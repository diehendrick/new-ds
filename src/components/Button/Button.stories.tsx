import type { Meta, StoryObj } from "@storybook/react";
import figma from "@figma/code-connect";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/n7Rpd5Tt9M4jWB8K4L9LM4/NEW-DS?node-id=66-250",
      imports: ['import { Button } from "./Button"'],
      examples: [
        { example: "Primary", variant: { Variant: "Primary" } },
        { example: "Secondary", variant: { Variant: "Secondary" } },
        { example: "Tertiary", variant: { Variant: "Tertiary" } },
        { example: "Danger", variant: { Variant: "Danger" } },
        { example: "Disabled", variant: { State: "Disabled" } },
      ],
      props: {
        label: figma.string("Label"),
        size: figma.enum("Size", {
          Small: "Small",
          Medium: "Medium",
          Large: "Large",
        }),
        variant: figma.enum("Variant", {
          Primary: "Primary",
          Secondary: "Secondary",
          Tertiary: "Tertiary",
          Danger: "Danger",
        }),
        leading: figma.boolean("Leading"),
        trailing: figma.boolean("Trailing"),
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["Primary", "Secondary", "Tertiary", "Danger"] as const,
    },
    size: {
      control: "select",
      options: ["Small", "Medium", "Large"] as const,
    },
    label: { control: "text" },
    disabled: { control: "boolean" },
    leading: { control: "boolean" },
    trailing: { control: "boolean" },
    leadingIconName: {
      control: "select",
      options: ["none", "Add", "Check", "Delete", "Favorite", "Home", "Info", "Search", "Settings", "Star"] as const,
    },
    trailingIconName: {
      control: "select",
      options: ["none", "Add", "Check", "Delete", "Favorite", "Home", "Info", "Search", "Settings", "Star"] as const,
    },
    leadingIcon: { table: { disable: true } },
    trailingIcon: { table: { disable: true } },
    state: {
      control: "select",
      options: ["Default", "Hover", "Pressed", "Disabled"] as const,
    },
    onClick: { action: "clicked" },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: "Primary",
    size: "Medium",
    label: "Primary Button",
    state: "Default",
  },
};

export const Secondary: Story = {
  args: {
    variant: "Secondary",
    size: "Medium",
    label: "Secondary Button",
    state: "Default",
  },
};

export const Tertiary: Story = {
  args: {
    variant: "Tertiary",
    size: "Medium",
    label: "Tertiary Button",
    state: "Default",
  },
};

export const Danger: Story = {
  args: {
    variant: "Danger",
    size: "Medium",
    label: "Danger Button",
    state: "Default",
  },
};

export const SmallPrimary: Story = {
  name: "Primary Small",
  args: {
    variant: "Primary",
    size: "Small",
    label: "Small",
    state: "Default",
  },
};

export const LargePrimary: Story = {
  name: "Primary Large",
  args: {
    variant: "Primary",
    size: "Large",
    label: "Large",
    state: "Default",
  },
};

export const Disabled: Story = {
  args: {
    variant: "Primary",
    size: "Medium",
    label: "Disabled",
    state: "Disabled",
  },
};

export const WithLeadingIcon: Story = {
  name: "With Leading Icon",
  args: {
    variant: "Primary",
    size: "Medium",
    label: "With Icon",
    leading: true,
    leadingIconName: "Star",
    state: "Default",
  },
};

export const WithTrailingIcon: Story = {
  name: "With Trailing Icon",
  args: {
    variant: "Primary",
    size: "Medium",
    label: "With Icon",
    trailing: true,
    trailingIconName: "Delete",
    state: "Default",
  },
};

export const AllVariants: Story = {
  name: "All Variants",
  render: () => (
    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
      <Button variant="Primary" label="Primary" />
      <Button variant="Secondary" label="Secondary" />
      <Button variant="Tertiary" label="Tertiary" />
      <Button variant="Danger" label="Danger" />
    </div>
  ),
};

export const AllSizes: Story = {
  name: "All Sizes",
  render: () => (
    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
      <Button variant="Primary" size="Small" label="Small" />
      <Button variant="Primary" size="Medium" label="Medium" />
      <Button variant="Primary" size="Large" label="Large" />
    </div>
  ),
};
