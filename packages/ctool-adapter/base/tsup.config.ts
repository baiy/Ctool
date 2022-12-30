import {defineConfig} from "tsup";

export default defineConfig({
    entry: ["./src/index.ts"],
    outDir: "./dist/",
    legacyOutput: true,
    format: ["cjs"],
    platform: "node",
    target: "node16",
    splitting: false,
    dts: true,
    clean: true,
});
