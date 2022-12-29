const {join} = require("path");
const {mkdirSync, rmSync} = require("fs");

const releasePath = join(__dirname, '_release')

rmSync(releasePath, {recursive: true, force: true});
mkdirSync(releasePath);
