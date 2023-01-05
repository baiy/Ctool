import {defineConfig} from "tsup";

export default defineConfig({
    entry: [
        "./src/index.ts",
        "./src/init.ts",
        "./src/release.ts",
    ],
    outDir: "./dist/",
    legacyOutput: true,
    format: ["cjs", "esm"],
    platform: "node",
    target: "node16",
    splitting: false,
    dts: true,
    clean: true,
});
