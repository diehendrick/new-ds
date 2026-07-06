import type { Meta, StoryObj } from "@storybook/react";
import figma from "@figma/code-connect";
import { TextField } from "./TextField";

const meta: Meta<typeof TextField> = {
  title: "Components/TextField",
  component: TextField,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/n7Rpd5Tt9M4jWB8K4L9LM4/NEW-DS?node-id=91-766",
      imports: ['import { TextField } from "./TextField"'],
      examples: [
        { example: "Default", variant: { Size: "Medium", Interaction: "Default", Validation: "None" } },
        { example: "Hover", variant: { Size: "Medium", Interaction: "Hover", Validation: "None" } },
        { example: "Error", variant: { Size: "Medium", Validation: "Error" } },
        { example: "Success", variant: { Size: "Medium", Validation: "Success" } },
        { example: "Disabled", variant: { Size: "Medium", Interaction: "Disabled" } },
      ],
      props: {
        label: figma.string("Label"),
        size: figma.enum("Size", {
          Small: "Small",
          Medium: "Medium",
          Large: "Large",
        }),
        interaction: figma.enum("Interaction", {
          Default: "Default",
          Hover: "Hover",
          Disabled: "Disabled",
        }),
        validation: figma.enum("Validation", {
          None: "None",
          Error: "Error",
          Success: "Success",
        }),
        required: figma.boolean("Required"),
      },
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: ["Small", "Medium", "Large"] as const,
    },
    interaction: {
      control: "select",
      options: ["Default", "Hover", "Disabled"] as const,
    },
    validation: {
      control: "select",
      options: ["None", "Error", "Success"] as const,
    },
    label: { control: "text" },
    placeholder: { control: "text" },
    supportingText: { control: "text" },
    showLabel: { control: "boolean" },
    showSupportingText: { control: "boolean" },
    readOnly: { control: "boolean" },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
    showLeading: { control: "boolean" },
    showTrailing: { control: "boolean" },
    leadingIconName: {
      control: "select",
      options: ["none", "Search", "Mail", "Person", "Home", "Info", "Star", "Settings", "Add", "Check", "Delete", "Favorite"] as const,
    },
    trailingIconName: {
      control: "select",
      options: ["none", "Visibility", "VisibilityOff", "Error", "ErrorOutline", "CheckCircle", "Search", "Delete", "Settings", "Add", "Check"] as const,
    },
    type: {
      control: "select",
      options: ["text", "password", "email", "number", "search"] as const,
    },
    value: { control: "text" },
    onTrailingClick: { action: "trailing-clicked" },
    onChange: { action: "changed" },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof TextField>;

export const Default: Story = {
  args: {
    size: "Medium",
    interaction: "Default",
    validation: "None",
    label: "Label",
    showLabel: true,
    placeholder: "Placeholder",
    supportingText: "Supporting information",
  },
};

export const Small: Story = {
  name: "Small",
  args: {
    size: "Small",
    label: "Small input",
    placeholder: "Placeholder",
  },
};

export const Large: Story = {
  name: "Large",
  args: {
    size: "Large",
    label: "Large input",
    placeholder: "Placeholder",
  },
};

export const Hover: Story = {
  name: "Hover",
  args: {
    size: "Medium",
    interaction: "Hover",
    label: "Hover state",
    placeholder: "Placeholder",
  },
};

export const Disabled: Story = {
  name: "Disabled",
  args: {
    size: "Medium",
    interaction: "Disabled",
    label: "Disabled input",
    placeholder: "Placeholder",
    supportingText: "This field is disabled",
    showSupportingText: true,
  },
};

export const Error: Story = {
  name: "Error",
  args: {
    size: "Medium",
    validation: "Error",
    label: "Error input",
    placeholder: "Placeholder",
    supportingText: "This field has an error",
  },
};

export const Success: Story = {
  name: "Success",
  args: {
    size: "Medium",
    validation: "Success",
    label: "Success input",
    placeholder: "Placeholder",
    supportingText: "This field is valid",
  },
};

export const ReadOnly: Story = {
  name: "Read Only",
  args: {
    size: "Medium",
    readOnly: true,
    label: "Read only",
    value: "Cannot edit this",
  },
};

export const Required: Story = {
  name: "Required",
  args: {
    size: "Medium",
    required: true,
    label: "Required field",
    placeholder: "This field is required",
  },
};

export const WithHelperText: Story = {
  name: "With Helper Text",
  args: {
    size: "Medium",
    label: "With helper",
    placeholder: "Placeholder",
    supportingText: "Enter a valid value for this field",
    showSupportingText: true,
  },
};

export const WithLeadingIcon: Story = {
  name: "With Leading Icon",
  args: {
    size: "Medium",
    label: "Search",
    placeholder: "Search...",
    showLeading: true,
    leadingIconName: "Search",
  },
};

export const WithTrailingIcon: Story = {
  name: "With Trailing Icon",
  args: {
    size: "Medium",
    label: "Password",
    placeholder: "Enter password",
    showTrailing: true,
    trailingIconName: "Visibility",
    type: "password",
  },
};

export const SmallError: Story = {
  name: "Small Error",
  args: {
    size: "Small",
    validation: "Error",
    label: "Small error",
    placeholder: "Placeholder",
    supportingText: "Error message",
  },
};

export const LargeSuccess: Story = {
  name: "Large Success",
  args: {
    size: "Large",
    validation: "Success",
    label: "Large success",
    placeholder: "Placeholder",
    supportingText: "All good",
  },
};

export const AllSizes: Story = {
  name: "All Sizes",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "320px" }}>
      <TextField size="Small" label="Small (32px)" placeholder="Small" />
      <TextField size="Medium" label="Medium (40px)" placeholder="Medium" />
      <TextField size="Large" label="Large (48px)" placeholder="Large" />
    </div>
  ),
};

export const AllValidations: Story = {
  name: "All Validations",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "320px" }}>
      <TextField size="Medium" label="Default" placeholder="No validation" />
      <TextField size="Medium" validation="Error" label="Error" supportingText="Something went wrong" />
      <TextField size="Medium" validation="Success" label="Success" supportingText="Looks good" />
    </div>
  ),
};
