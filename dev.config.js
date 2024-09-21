module.exports = {
  apps: [
    {
      name: "Adapt Ready API DEV",
      script: "npm run api:build && npm run start",
      env: {
        DOTENV_CONFIG_PATH: ".env.local",
      },
      watch: "./src/api",
      watch_delay: 1000,
      watch_options: {
        followSymlinks: false,
      },
    },
    {
      name: "Adapt Ready FE DEV",
      script: "npm run fe:dev",
    },
  ],
};
