// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import { defineConfig } from "vite";
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  if (mode === "development") {
    return {
      plugins: [react()],
      root: "src/fe",
      build: {
        sourcemap: true,
        outDir: "../../public",
        watch: {
          include: ["./src/fe/**/*.*"],
        },
        emptyOutDir: true,
      },
    };
  } else {
    return {
      plugins: [react()],
      root: "src/fe",
      build: {
        outDir: "../../public",
        emptyOutDir: true,
      },
    };
  }
});

