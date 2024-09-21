module.exports = {
  apps: [
    {
      name: "Adapt Ready",
      script: "dist/index.js",
      env: {
        DOTENV_CONFIG_PATH: ".env",
      },
    },
  ],
};
