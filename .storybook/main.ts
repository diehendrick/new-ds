import type { StorybookConfig } from "@storybook/react-webpack5";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-styling-webpack",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  webpackFinal: async (config) => {
    config.module = config.module || {};
    config.module.rules = config.module.rules || [];

    // Add babel-loader for TypeScript files
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: require.resolve("babel-loader"),
          options: {
            presets: [
              ["@babel/preset-react", { runtime: "automatic" }],
              "@babel/preset-typescript",
            ],
          },
        },
      ],
    });

    // Find Storybook's existing CSS rule and inject PostCSS (Tailwind)
    const cssRuleIndex = config.module.rules.findIndex(
      (rule) =>
        typeof rule === "object" &&
        rule !== null &&
        "test" in rule &&
        rule.test instanceof RegExp &&
        rule.test.toString().includes("css")
    );
    if (cssRuleIndex >= 0) {
      const cssRule = config.module.rules[cssRuleIndex];
      if (typeof cssRule === "object" && cssRule !== null && "use" in cssRule) {
        const use = Array.isArray(cssRule.use) ? [...cssRule.use] : [cssRule.use];
        // Add postcss-loader BEFORE the existing loaders
        use.push({
          loader: require.resolve("postcss-loader"),
          options: {
            postcssOptions: {
              plugins: [require.resolve("tailwindcss"), require.resolve("autoprefixer")],
            },
          },
        });
        cssRule.use = use;
      }
    }

    // Mock @figma/code-connect for browser runtime
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      "@figma/code-connect": require.resolve("./figma-mock"),
    };

    return config;
  },
};

export default config;
