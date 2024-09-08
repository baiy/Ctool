<template>
    <HeightResize v-slot="{small,large}" ignore :append="['.ctool-page-option']" :reduce="10" direction="vertical">
        <Align direction="vertical">
            <TextInput
                v-model="action.current.input"
                :height="small"
                :placeholder="$t(`asn1_input_der_text`)"
                :allow="['hex','base64']"
            />
            
            <Editor v-model="action.current.output"
                    :lang="action.current.language"
                    disableLineNumbers
                    :height="large"
                    :placeholder="$t(`asn1_output_result`)"
                    :onchange="format()"
            />
        </Align>
    </HeightResize>
</template>

<script lang="ts" setup>
import { initialize, useAction } from "@/store/action";
import { createTextInput } from "@/components/text";
import { watch } from "vue";
import formatter from "../code/formatter";
import ASN1 from "./lib/asn1.js";
import ASN1TOXML from "./lib/asn1toxml.js";

const action = useAction(await initialize({
    input: createTextInput("hex"),
    output: "",
    language: "xml",
    formatOption: { tab: 2, collapse_content: true },
}));


const output = $computed(() => {
    if (action.current.input.text.isEmpty()) {
        action.current.output = "";
    }
    if (action.current.input.text.isError()) {
        action.current.output = "error";
    }
    try {
        const asn1 = ASN1.decode(action.current.input.text.toUint8Array());
        action.current.output = ASN1TOXML.decode2Xml(asn1);
    } catch (e) {
        action.current.output = "";
    }
});

watch(() => output, (output) => {
    if (output === undefined) {
        return;
    }
    action.save();
}, { immediate: true, deep: true });


async function format() {
    //格式化
    if (action.current.output !== "") {
        const handle = await formatter.load("xml");
        const result = await handle.set(action.current.output, action.current.formatOption).format("beautify");
        if (result === "") {
            throw new Error("result empty");
        }
        action.current.output = result;
    }
}

</script>
