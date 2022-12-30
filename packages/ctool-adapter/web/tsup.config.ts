import {defineConfig} from "tsup";

export default defineConfig({
    entry: ["./src/release.ts"],
    outDir: "./dist/",
    legacyOutput: true,
    format: ["cjs"],
    platform: "node",
    target: "node16",
    splitting: false,
    clean: true,
});
