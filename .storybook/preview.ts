import type { Preview } from "@storybook/react";
import React, { useEffect } from "react";
import "../src/index.css";

const preview: Preview = {
  globalTypes: {
    theme: {
      name: "Theme",
      description: "Switch between light and dark mode",
      defaultValue: "light",
      toolbar: {
        icon: "mirror",
        items: [
          { value: "light", title: "Light Mode", icon: "sun" },
          { value: "dark", title: "Dark Mode", icon: "moon" },
        ],
        dynamicTitle: true,
      },
      showName: true,
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || "light";
      useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
      }, [theme]);
      return React.createElement("div", null, React.createElement(Story));
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
