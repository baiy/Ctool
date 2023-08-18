<template>
    <Display :position="useInput ? 'right-center' : 'top-right'" :toggle="!useInput" :style="style">
        <template v-if="current.type !== 'upload'">
            <Textarea v-if="!useInput" v-model="current.value" :disabled="disabled" :placeholder="placeholder" />
            <Input
                v-else
                v-model="current.value"
                :placeholder="placeholder"
                :disabled="disabled"
                :label="useInput !== true ? useInput : ''"
            />
        </template>
        <Card v-else style="height: 100%">
            <Align direction="vertical" horizontal="center" vertical="center">
                <UploadFile v-model="current.value" buttonType="text" :type="upload" />
                <div
                    style="
                        font-size: 0.75rem;
                        color: var(--ctool-placeholder-text-color);
                        display: inline-flex;
                        align-items: center;
                        gap: 5px;
                    "
                >
                    <template v-if="current.type === `upload` && !current.text.isEmpty()">
                        <Icon name="right" :size="14" />
                        {{ current.text.name() || "" }}
                        <template v-if="current.text.isImage()">
                            {{ current.text.imageSizeString ? `(${current.text.imageSizeString})` : "" }}
                        </template>
                    </template>
                    <template v-else>
                        {{ $t(`component_upload_support_paste`) }}
                    </template>
                </div>
            </Align>
        </Card>
        <template #extra>
            <Align>
                <Select
                    size="small"
                    :disabled="disabled"
                    :options="encodings"
                    v-model="current.option.text.encoding"
                    v-if="encoding && current.type === 'text'"
                />
                <Bool
                    size="small"
                    v-model="current.option.hex.preserve_line_breaks"
                    :label="$t('component_content_type_hex_preserve_line_breaks')"
                    v-if="current.type === 'hex' && isString(current.value) && current.value.includes('\n')"
                />
                <Select
                    size="small"
                    :disabled="disabled"
                    :model-value="current.type"
                    @change="
                        value => {
                            current.type = value;
                            current.value = ``;
                            current.text = Text.empty();
                        }
                    "
                    v-if="typeLists.length > 1"
                    :options="
                        typeLists.map(item => {
                            return {
                                value: item,
                                label: $t(`component_content_type_${item}`),
                            };
                        })
                    "
                />
                <slot />
            </Align>
        </template>
    </Display>
</template>

<script setup lang="ts">
import { TextInput, createTextInput } from "./index";
import { nextTick, PropType, watch, toRaw, StyleValue } from "vue";
import Text, { encodings } from "@/helper/text";
import { TextInputUpload, textInputEncoderLists, TextInputEncoderType } from "@/types";
import { debounce, isString } from "lodash";
import { sizeConvert } from "@/components/util";
import Bool from "@/components/ui/Bool.vue";

const props = defineProps({
    modelValue: {
        type: Object as PropType<TextInput>,
        default: () => createTextInput(),
    },
    height: {
        type: [Number, String],
        default: "",
    },
    placeholder: {
        type: String,
        default: () => {
            return $t("main_ui_input");
        },
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    allow: {
        type: Array as PropType<TextInputEncoderType[]>,
        default: () => textInputEncoderLists,
    },
    upload: {
        type: String as PropType<TextInputUpload>,
        default: "none",
    },
    encoding: {
        // 输入编码选项框
        type: Boolean,
        default: false,
    },
    useInput: {
        // 非上传使用input框
        type: [Boolean, String],
        default: false,
    },
});

const typeLists = $computed(() => {
    return textInputEncoderLists.filter(item => {
        return ![...(props.upload === "none" ? ["upload"] : [])].includes(item) && props.allow.includes(item);
    });
});

const emit = defineEmits<{ (e: "update:modelValue", modelValue: TextInput): void }>();

let current = $ref(toRaw(props.modelValue));

// 更新
const transform = debounce(async () => {
    if (current.value === "") {
        return (current.text = Text.empty());
    }
    try {
        if (current.type === "upload") {
            if (current.value instanceof File) {
                current.text = (await Text.fromBlob(current.value)).setFileName(current.value.name);
                await current.text.calculateImageSize();
                return;
            }
            throw new Error("error data");
        }

        if (!isString(current.value)) {
            throw new Error("error data");
        }

        switch (current.type) {
            case "text":
                return (current.text = Text.fromString(current.value, current.option.text.encoding));
            case "base64":
                return (current.text = Text.fromBase64(current.value));
            case "hex":
                return (current.text = Text.fromHex(current.value, {
                    preserve_line_breaks: current.option.hex.preserve_line_breaks,
                }));
            case "url":
                return (current.text = await Text.fromUrl(current.value));
        }
        throw new Error("error type");
    } catch (e) {
        return (current.text = Text.fromError($error(e)));
    }
}, 200);

watch(
    () => {
        return {
            type: current.type,
            value: current.value,
            option: current.option,
        };
    },
    () => {
        transform();
    },
    { immediate: true, deep: true },
);

watch(
    () => current.text,
    () => emit("update:modelValue", toRaw(current) as TextInput),
    { immediate: true, deep: true },
);

watch(
    () => {
        return {
            type: props.modelValue.type,
            value: props.modelValue.value,
            option: props.modelValue.option,
        };
    },
    async () => {
        await nextTick();
        current = toRaw(props.modelValue);
    },
    { deep: true },
);

const style = $computed(() => {
    let css: StyleValue = {};
    if (props.height) {
        css.height = sizeConvert(props.height);
    }
    return css;
});
</script>
