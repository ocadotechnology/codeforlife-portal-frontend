import react from "@vitejs/plugin-react"
import path from "path"
import { defineConfig } from "vitest/config"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      codeforlife: path.resolve(__dirname, "./node_modules/codeforlife/src"),
    },
  },
  server: {
    open: true,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "src/setupTests",
    mockReset: true,
    coverage: {
      enabled: true,
      provider: "istanbul",
      reporter: ["html", "cobertura"],
    },
  },
})
