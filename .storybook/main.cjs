module.exports = {
  "stories": [
    "../src/components/ui/**/*.stories.@(js|jsx|ts|tsx)",
    "../src/components/chat/**/*.stories.@(js|jsx|ts|tsx)",
    "../src/components/panels/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
  "framework": "@storybook/react",
  "core": {
    "builder": "webpack5"
  }
};
