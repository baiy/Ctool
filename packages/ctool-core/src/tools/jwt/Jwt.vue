<template>
    <HeightResize v-slot="{small,large}" :reduce="5">
        <Align direction="vertical">
            <Display>
                <Textarea v-model="action.current.input" :height="small" :placeholder="$t('main_ui_input')" />
                <template #extra>
                    <Align>
                        <Bool border :size="'small'" v-model="action.current.header" label="header" />
                        <Bool border :size="'small'" v-model="action.current.payload" label="payload" />
                    </Align>
                </template>
            </Display>
            <SerializeOutput
                switch-position="bottom-right"
                :allow="['json','xml','yaml','toml','php_array','properties','http_query_string']"
                :content="outputSerialize"
                :height="large"
                v-model="action.current.outputOption"
                @success="action.save()"
            />
        </Align>
    </HeightResize>
</template>

<script lang="ts" setup>
import { initialize, useAction } from "@/store/action";
import { jwtDecode } from "jwt-decode";
import Serialize from "@/helper/serialize";
import { createSerializeOutput as serializeGetOutput } from "@/components/serialize";

const action = useAction(await initialize({
    input: "",
    header: false,
    payload: true,
    outputOption: serializeGetOutput("json"),
}, { paste: false }));

const outputSerialize: Serialize = $computed(() => {
    if (!action.current.input.trim()) {
        return Serialize.empty();
    }
    try {
        let data: Record<string, any> = {};
        if (action.current.header) {
            data.header = jwtDecode(action.current.input, { header: true });
        }
        if (action.current.payload) {
            data.payload = jwtDecode(action.current.input);
        }
        return Serialize.formObject(data);
    } catch (e) {
        return Serialize.fromError($error(e));
    }
});
</script>
