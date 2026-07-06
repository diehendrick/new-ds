import figma from "@figma/code-connect";
import { TextField } from "./TextField";

figma.connect(
  "https://www.figma.com/design/n7Rpd5Tt9M4jWB8K4L9LM4/NEW-DS?node-id=91-766",
  {
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
      showLabel: figma.boolean("Show Label"),
      showLeading: figma.boolean("Show Leading"),
      showTrailing: figma.boolean("Show Trailing"),
      showSupportingText: figma.boolean("Show Supporting Text"),
      readOnly: figma.boolean("Read Only"),
    },
    example: (props) => TextField(props),
  },
);

