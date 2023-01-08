<template>
    <HeightResize v-slot="{height}">
        <Align direction="vertical">
            <template v-for="item in ['str','bin','oct','dec','hex']">
                <Display :position="'bottom-right'">
                    <Textarea
                        v-model="output[item].value"
                        :placeholder="item===`str` ? $t('ascii_input_str_prompt') : $t('ascii_input_prompt',[$t(`ascii_input_${item}`)])"
                        :height="(height - 20) / 5"
                    />
                    <template #extra>
                        <Align>
                            <Button v-if="item === `str`" :size="'small'" @click="showReference = !showReference" :text="$t(`main_ui_reference`)"/>
                            <Button :size="'small'" :type="'primary'" @click="$copy(output[item].value)" :text="$t(`ascii_input_${item}`)"/>
                        </Align>
                    </template>
                </Display>
            </template>
        </Align>
    </HeightResize>
    <ExtendPage v-model="showReference">
        <Reference/>
    </ExtendPage>
</template>

<script lang="ts" setup>
import {initialize, useAction} from "@/store/action";
import {convent, ConventType} from "./util";
import Reference from "./Reference.vue";
import {computed} from "vue";

const action = useAction(await initialize<{ input: string, type: ConventType | "" }>({
    type: "",
    input: "",
}, {paste: false}))

let showReference = $ref(false)

const getHandle = (target: ConventType) => {
    if (action.current.type === "" || action.current.input === "") {
        return ""
    }
    if (action.current.type === target) {
        return action.current.input
    }
    try {
        return convent(action.current.input, action.current.type, target)
    } catch (e) {
        return $error(e)
    }
}
const setHandle = (source: ConventType, value: string) => {
    action.current.input = value
    action.current.type = source
    if (action.current.input !== "") {
        action.save()
    }
}

const dec = computed({
    get: () => {
        return getHandle("dec")
    },
    set: (value) => {
        return setHandle('dec', value)
    }
})

const hex = computed({
    get: () => {
        return getHandle("hex")
    },
    set: (value) => {
        return setHandle('hex', value)
    }
})

const oct = computed({
    get: () => {
        return getHandle("oct")
    },
    set: (value) => {
        return setHandle('oct', value)
    }
})

const bin = computed({
    get: () => {
        return getHandle("bin")
    },
    set: (value) => {
        return setHandle('bin', value)
    }
})

const str = computed({
    get: () => {
        return getHandle("str")
    },
    set: (value) => {
        return setHandle('str', value)
    }
})

const output = {
    dec,
    hex,
    oct,
    bin,
    str,
}
</script>
