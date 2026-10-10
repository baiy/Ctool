const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const { createRequire } = require("node:module");
const { join } = require("node:path");
const { test } = require("node:test");
const { runInNewContext } = require("node:vm");
const { getTool } = require("ctool-config");
const { jwtDecode } = createRequire(join(__dirname, "../../../ctool-core/package.json"))("jwt-decode");

const bundlePath = join(__dirname, "../dist/index.js");
const bundle = readFileSync(bundlePath, "utf8");
const jwtFeature = getTool("jwt").getFeature("jwt");
const jwtCode = `ctool-${jwtFeature.getKey()}`;
const encode = value => Buffer.from(JSON.stringify(value)).toString("base64url");
const token = `${encode({ alg: "HS256", typ: "JWT" })}.${encode({ sub: "test-only", name: "\u6d4b\u8bd5" })}.test_signature`;
const clone = value => JSON.parse(JSON.stringify(value));

function createHost() {
    const features = new Map([["Ctool", { code: "Ctool", cmds: ["Ctool"] }]]);
    const writes = [];
    const routes = [];
    let enter;
    const utools = {
        getFeatures: () => [...features.values()],
        setFeature: feature => features.set(feature.code, clone(feature)),
        removeFeature: code => features.delete(code),
        onPluginEnter: callback => { enter = callback; },
        showMainWindow() {},
    };
    const module = { exports: {} };
    runInNewContext(bundle, {
        module,
        exports: module.exports,
        require: createRequire(bundlePath),
        window: { utools, $t: key => key },
        navigator: { userAgent: "uTools" },
    }, { filename: bundlePath });
    const runtime = module.exports.runtime;
    runtime.initialize({
        storage: () => ({ setNoVersion: (key, value, expiry) => writes.push({ key, value, expiry }) }),
        push: (path, query) => routes.push({ path, query: clone(query) }),
    });
    return { runtime, features, writes, routes, enter: event => enter(event) };
}

async function generateManifest() {
    const releasePath = join(__dirname, "../dist/release.js");
    const requireBundle = createRequire(releasePath);
    let features;
    let version;
    let finish;
    const released = new Promise(resolve => { finish = resolve; });
    runInNewContext(readFileSync(releasePath, "utf8"), {
        __dirname: join(__dirname, "../dist"),
        console: { info() {} },
        require(name) {
            if (name === "fs") {
                return { rmSync() {}, mkdirSync() {}, cpSync() {} };
            }
            if (name === "ctool-adapter-base") {
                return {
                    copyCoreDist() {},
                    getAdditionData: () => ({ i18n: { detail: { zh_CN: { tool_jwt_jwt: { message: "JWT decode" } } } } }),
                    version: () => "test-version",
                    replaceFileContent(path, search, value) {
                        assert.equal(path.endsWith("plugin.json"), true);
                        if (search === '"##features##"') features = JSON.parse(value);
                        if (search === "##version##") version = value;
                    },
                    release: async (path, platform) => {
                        assert.equal(platform, "utools");
                        finish();
                        return "test.zip";
                    },
                };
            }
            return requireBundle(name);
        },
    }, { filename: releasePath });
    await released;
    assert.equal(version, "test-version");
    return features;
}

function commandRegex(command) {
    const end = command.match.lastIndexOf("/");
    return new RegExp(command.match.slice(1, end), command.match.slice(end + 1));
}

test("release manifest contains a translated JWT content command without a length cap", async () => {
    const manifest = await generateManifest();
    const feature = manifest.find(item => item.code === jwtCode);
    assert.equal(feature.explain, "JWT decode");
    assert.equal(feature.cmds.length, 1);
    assert.equal(feature.cmds[0].type, "regex");
    assert.equal(feature.cmds[0].label, feature.explain);
    assert.equal(feature.cmds[0].minLength, 5);
    assert.equal("maxLength" in feature.cmds[0], false);
    for (const code of ["ctool-time-timestamp", "ctool-unicode-decoder", "ctool-qrCode-generate", "ctool-ip-ip"]) {
        assert.equal(manifest.some(item => item.code === code), true, code);
    }
});

test("JWT content command matches raw tokens, Bearer variants and horizontal whitespace", async () => {
    const manifest = await generateManifest();
    const regex = commandRegex(manifest.find(item => item.code === jwtCode).cmds[0]);
    const largeToken = `${encode({ alg: "HS256" })}.${encode({ data: "x".repeat(20000) })}.test_signature`;
    for (const input of [token, ` ${token}\t `, `Bearer ${token}`, `bearer   ${token}`, `\tBeArEr\t \t${token}  `, largeToken]) {
        assert.equal(regex.test(input), true);
    }
});

test("JWT content command rejects fragments, extra fields, illegal characters and newlines", async () => {
    const manifest = await generateManifest();
    const regex = commandRegex(manifest.find(item => item.code === jwtCode).cmds[0]);
    const [header, payload, signature] = token.split(".");
    for (const input of [
        "", "jwt", header, `${header}.${payload}`, `${header}.${payload}.`,
        `.${payload}.${signature}`, `${header}..${signature}`, `a.b.c.d.e`,
        `prefix ${token}`, `${token} suffix`, `Authorization: Bearer ${token}`,
        `Bearer\n${token}`, `Bearer\r\n${token}`,
        token.replace(".", "+."), token.replace(".", "/."), token.replace(".", "=."),
        `${token}\n`, `${token}\r`, `${token}\r\n`, `\n${token}`, `${header}.\n${payload}.${signature}`,
    ]) {
        assert.equal(regex.test(input), false, input);
    }
});

test("JWT format matching does not validate decoded JSON or signatures", async () => {
    const manifest = await generateManifest();
    const regex = commandRegex(manifest.find(item => item.code === jwtCode).cmds[0]);
    assert.equal(regex.test("a.b.c"), true);
    assert.equal(regex.test(`x${token}`), true);
    assert.equal(regex.test(`Bearer${token}`), true);
});

test("JWT entry passes only the token as fixed input and refreshes the target route", async () => {
    const manifest = await generateManifest();
    const regex = commandRegex(manifest.find(item => item.code === jwtCode).cmds[0]);
    const host = createHost();
    for (const payload of [token, ` ${token}\t `, `Bearer ${token}`, `bearer   ${token}`, `\tBeArEr\t \t${token}  `]) {
        assert.equal(regex.test(payload), true);
        host.enter({ code: jwtCode, type: "regex", payload });
        assert.deepEqual(host.writes.at(-1), { key: "_temp_input_storage", value: token, expiry: 10 });
        assert.deepEqual(jwtDecode(host.writes.at(-1).value), { sub: "test-only", name: "\u6d4b\u8bd5" });
        assert.deepEqual(jwtDecode(host.writes.at(-1).value, { header: true }), { alg: "HS256", typ: "JWT" });
        const route = host.routes.at(-1);
        assert.equal(route.path, jwtFeature.getRouter());
        assert.equal(typeof route.query._t, "string");
        assert.equal("keyword" in route.query, false);
    }
});

test("other regex and over content entries retain their original payload", () => {
    const host = createHost();
    for (const [tool, featureName, type, payload] of [
        ["time", "timestamp", "regex", "1720000000"],
        ["unicode", "decoder", "regex", "\\u4e2d"],
        ["ip", "ip", "over", "192.168.1.1"],
        ["qrCode", "generate", "over", `  Bearer ${token}\t`],
    ]) {
        const feature = getTool(tool).getFeature(featureName);
        host.enter({ code: `ctool-${feature.getKey()}`, type, payload });
        assert.deepEqual(host.writes.at(-1), { key: "_temp_input_storage", value: payload, expiry: 10 });
        assert.equal(host.routes.at(-1).path, feature.getRouter());
        assert.equal(typeof host.routes.at(-1).query._t, "string");
        assert.equal("keyword" in host.routes.at(-1).query, false);
    }
});

test("native JWT keyword entry remains navigation without fixed input", () => {
    const host = createHost();
    for (const payload of ["j", "jw", "jwt", "jwt decode"]) {
        host.enter({ code: `${jwtCode}-customize`, type: "text", payload });
        assert.deepEqual(host.routes.at(-1), { path: jwtFeature.getRouter(), query: { keyword: payload } });
    }
    assert.deepEqual(host.writes, []);
});

test("empty content and invalid feature codes do not write tool input", () => {
    const host = createHost();
    host.enter({ code: jwtCode, type: "regex", payload: "" });
    assert.deepEqual(host.routes.at(-1), { path: jwtFeature.getRouter(), query: {} });
    const count = host.routes.length;
    for (const code of ["ctool", "ctool-unknown-jwt", "ctool-jwt-unknown"]) {
        host.enter({ code, type: "regex", payload: token });
    }
    assert.equal(host.routes.length, count);
    assert.deepEqual(host.writes, []);
});
