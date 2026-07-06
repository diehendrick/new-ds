import figma from "@figma/code-connect";
import { Button } from "./Button";

figma.connect(
  "https://www.figma.com/design/n7Rpd5Tt9M4jWB8K4L9LM4/NEW-DS?node-id=66-250",
  {
    props: {
      label: figma.string("Label"),
      variant: figma.enum("Variant", {
        Primary: "Primary",
        Secondary: "Secondary",
        Tertiary: "Tertiary",
        Danger: "Danger",
      }),
      size: figma.enum("Size", {
        Small: "Small",
        Medium: "Medium",
        Large: "Large",
      }),
      leading: figma.boolean("Leading"),
      trailing: figma.boolean("Trailing"),
      disabled: figma.boolean("Disabled"),
    },
    example: (props) => Button(props),
  },
);

