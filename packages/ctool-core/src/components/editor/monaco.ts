import loader from "@monaco-editor/loader";
import ContextMenu from "./contextMenu";
import * as monaco from "monaco-editor";

const monacoInstance = () => {
    return loader.__getMonacoInstance();
};

export { loader, ContextMenu, monacoInstance, monaco };
