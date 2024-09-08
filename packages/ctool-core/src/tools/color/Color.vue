<template>
    <div v-row="`auto-1`">
        <div ref="container"></div>
        <Align direction="vertical">
            <Display position="right-center" v-for="i of typeLists" :text="i"
                     @click="$copy(colorInstance[`${i}`].value)">
                <Input v-model="colorInstance[`${i}`].value" :placeholder="$t('color_input_placeholder',[i,example[i]])"
                       :size="size" />
            </Display>
        </Align>
    </div>
</template>

<script lang="ts" setup>
import { initialize, useAction } from "@/store/action";
import { colord, extend } from "colord";
import { computed, onMounted, watch } from "vue";
import { ComponentSizeType } from "@/types";
import cmykPlugin from "colord/plugins/cmyk";
import hwbPlugin from "colord/plugins/hwb";
import labPlugin from "colord/plugins/lab";
import xyzPlugin from "colord/plugins/xyz";
import namesPlugin from "colord/plugins/names";
import lchPlugin from "colord/plugins/lch";
import * as AColorPicker from "a-color-picker";

extend([cmykPlugin, hwbPlugin, namesPlugin, lchPlugin, labPlugin, xyzPlugin]);

const action = useAction(await initialize({
    type: "rgb",
    input: "",
}, { paste: false }));

const container = $ref<HTMLElement | null>(null);
let picker = $ref<AColorPicker.ACPController | null>(null);

const size: ComponentSizeType = "default";
let isDisablePickerChangeEvent = false;
onMounted(() => {
    if (container) {
        picker = AColorPicker.createPicker({
            attachTo: container,
            color: action.current.input,
            showHSL: false,
            showRGB: false,
            showHEX: false,
            showAlpha: true,
            hueBarSize: [218, 11],
            alphaBarSize: [218, 11],
            slBarSize: [300, 301],
        });
        picker.on("change", (_, color) => {
            if (isDisablePickerChangeEvent) {
                isDisablePickerChangeEvent = false;
                return;
            }
            setHandle("rgb", color || "");
        });
    }
});

const getHandle = (target: string) => {
    if (action.current.input === "") {
        return "";
    }
    if (action.current.type === target) {
        return action.current.input;
    }
    try {
        const color = colord(["hsv", "lab", "xyz"].includes(action.current.type) ? JSON.parse(action.current.input) : action.current.input);
        let result = "";
        
        if (target === "name") {
            result = color.toName({ closest: true }) ?? "";
        }
        if (target === "hex") {
            result = color.toHex();
        }
        if (target === "rgb") {
            result = color.toRgbString();
        }
        if (target === "hsl") {
            result = color.toHslString();
        }
        if (target === "hwb") {
            result = color.toHwbString();
        }
        if (target === "cmyk") {
            result = color.toCmykString();
        }
        if (target === "lch") {
            result = color.toLchString();
        }
        if (target === "hsv") {
            result = JSON.stringify(color.toHsv());
        }
        if (target === "lab") {
            result = JSON.stringify(color.toLab());
        }
        if (target === "xyz") {
            result = JSON.stringify(color.toXyz());
        }
        return result;
    } catch (e) {
        return $error(e);
    }
};

const setHandle = (source: string, value: string) => {
    action.current.input = value;
    action.current.type = source;
    if (action.current.input !== "") {
        action.save();
    }
};

const handler = (type: string) => {
    return {
        get: () => getHandle(type),
        set: (value: string) => setHandle(type, value),
    };
};

const colorName = computed(handler("name"));
const colorHex = computed(handler("hex"));
const colorRgb = computed(handler("rgb"));
const colorHsl = computed(handler("hsl"));
const colorHwb = computed(handler("hwb"));
const colorCmyk = computed(handler("cmyk"));
const colorLch = computed(handler("lch"));
const colorHsv = computed(handler("hsv"));
const colorLab = computed(handler("lab"));
const colorXyz = computed(handler("xyz"));

const colorInstance = {
    name: colorName,
    hex: colorHex,
    rgb: colorRgb,
    hsl: colorHsl,
    hwb: colorHwb,
    cmyk: colorCmyk,
    lch: colorLch,
    hsv: colorHsv,
    lab: colorLab,
    xyz: colorXyz,
};

type ColorType = keyof typeof colorInstance;

const typeLists: ColorType[] = ["name", "hex", "rgb", "hsl", "hwb", "cmyk", "lch", "hsv", "lab", "xyz"];

watch(() => {
    return { color: colorRgb.value };
}, ({ color }) => {
    if (picker && color !== "") {
        isDisablePickerChangeEvent = true;
        picker.color = color;
    }
}, { immediate: true });

const example: Record<ColorType, any> = (() => {
    const color = colord("red");
    return {
        name: color.toName({ closest: true }) ?? "",
        hex: color.toHex(),
        rgb: color.toRgbString(),
        hsl: color.toHslString(),
        hwb: color.toHwbString(),
        cmyk: color.toCmykString(),
        lch: color.toLchString(),
        hsv: JSON.stringify(color.toHsv()),
        lab: JSON.stringify(color.toLab()),
        xyz: JSON.stringify(color.toXyz()),
    };
})();
</script>
<style>
.a-color-picker-dot {
    z-index: unset;
}
</style>
