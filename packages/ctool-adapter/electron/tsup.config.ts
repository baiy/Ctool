import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["./src/index.ts", "./src/release.ts", "./src/sync.ts", "./src/preload.ts", "./src/main.ts"],
    outDir: "./dist/",
    format: ["cjs", "esm"],
    platform: "node",
    target: "node16",
    splitting: false,
    dts: true,
    clean: true,
});
