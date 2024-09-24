import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
  const config = {
    plugins: [react()],
    root: "src/fe",
    build: {
      outDir: "../../public",
      emptyOutDir: true,
    },
    resolve: {
      alias: {
        "@pages": path.resolve(__dirname, "./src/fe/pages"),
        "@ui": path.resolve(__dirname, "./src/fe/components/ui"),
        "@components": path.resolve(__dirname, "./src/fe/components"),
        "@": path.resolve(__dirname, "./src/fe"),
        "@hooks": path.resolve(__dirname, "./src/fe/hooks"),
      },
    },
  };

  if (mode === "development") {
    config.build.sourcemap = true;
    config.build.watch = {
      include: ["./src/fe/**/*.*"],
    };
  }
  return config;
});
