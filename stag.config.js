module.exports = {
  apps: [
    {
      name: "Adapt Ready Stage",
      script: "dist/index.js",
      env: {
        DOTENV_CONFIG_PATH: ".env",
      },
    },
  ],
};
