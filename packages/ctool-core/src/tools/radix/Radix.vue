<template>
    <Align direction="vertical">
        <Display position="right-center" v-for="i of range(0,6)">
            <Input v-model="numberInstance[`number${i}`].value" :placeholder="$t('radix_input_placeholder')" :size="size"/>
            <template #extra>
                <Align>
                    <Select
                        v-model="action.current.map[i]"
                        :options="base"
                        size="small"
                        :disabled="isValid && action.current.map[i] === action.current.type"
                    />
                    <Button v-if="isValid" :text="$t(`main_ui_copy`)" @click="$copy(numberInstance[`number${i}`].value)" :size="'small'" :type="'primary'"/>
                </Align>
            </template>
        </Display>
        <div v-row="`1-100px`" v-if="isValid">
            <Button :size="size" @click="isMore = true" :text="$t(`main_ui_more`)"/>
            <Button :size="size" @click="action.current.input = ``" :text="$t(`main_ui_clear`)"/>
        </div>
        <Display v-else position="right-center" :text="alphabet !== defaultAlphabet ? $t('radix_reset') : ''" :type="'danger'" @click="resetAlphabet">
            <Input v-model="alphabet" :placeholder="$t('radix_alphabet')" :size="size" :label="$t('radix_alphabet')"/>
        </Display>
    </Align>
    <ExtendPage v-model="isMore">
        <div v-row="'1-1-1'" style="width: 100%;row-gap: 5px">
            <template v-for="i in range(2,65)">
                <Input :model-value="getHandle(i)">
                    <template #prepend>
                            <span
                                :style="{...(i === action.current.type ? {color:`red`} : {}),...{width: `20px`,cursor: `pointer`}}"
                                @click="()=>$copy(getHandle(i))"
                            >{{ i }}</span>
                    </template>
                </Input>
            </template>
        </div>
    </ExtendPage>
</template>

<script lang="ts" setup>
import {initialize, useAction} from "@/store/action";
import convert, {defaultAlphabet} from "@/helper/radix";
import {range} from "lodash";
import {watch,computed} from "vue";
import {SelectOption, ComponentSizeType} from "@/types";

const action = useAction(await initialize({
    type: 0,
    input: "",
    map: [2, 8, 10, 16, 60, 64],
    alphabet: ""
}, {paste: false}))

const size: ComponentSizeType = "large";
const base: SelectOption = $computed(() => {
    return range(2, 65).map((n) => {
        return {value: n, label: $t('radix_base', [n])}
    })
})

let isMore = $ref(false)
let alphabet = $ref(action.current.alphabet || defaultAlphabet)
const resetAlphabet = () => {
    alphabet = defaultAlphabet
}

watch(() => alphabet, (value) => {
    action.current.alphabet = value === defaultAlphabet ? "" : value
})

const isValid = $computed(() => {
    return /^[\-0-9]+$/.test(getHandle(10)) && /^[\-0-1]+$/.test(getHandle(2))
})

const getHandle = (target: number) => {
    if (alphabet.length !== 64) {
        return $t('radix_alphabet_length_error')
    }
    if (action.current.type === 0 || action.current.input === "") {
        return ""
    }
    if (action.current.type === target) {
        return action.current.input
    }
    try {
        return convert(action.current.input, action.current.type, target, alphabet)
    } catch (e) {
        return $error(e)
    }
}

const setHandle = (source: number, value: string) => {
    action.current.input = value
    action.current.type = source
    if (action.current.input !== "") {
        action.save()
    }
}

const number0 = computed({
    get: () => {
        return getHandle(action.current.map[0])
    },
    set: (value) => {
        return setHandle(action.current.map[0], value)
    }
})

const number1 = computed({
    get: () => {
        return getHandle(action.current.map[1])
    },
    set: (value) => {
        return setHandle(action.current.map[1], value)
    }
})

const number2 = computed({
    get: () => {
        return getHandle(action.current.map[2])
    },
    set: (value) => {
        return setHandle(action.current.map[2], value)
    }
})

const number3 = computed({
    get: () => {
        return getHandle(action.current.map[3])
    },
    set: (value) => {
        return setHandle(action.current.map[3], value)
    }
})

const number4 = computed({
    get: () => {
        return getHandle(action.current.map[4])
    },
    set: (value) => {
        return setHandle(action.current.map[4], value)
    }
})

const number5 = computed({
    get: () => {
        return getHandle(action.current.map[5])
    },
    set: (value) => {
        return setHandle(action.current.map[5], value)
    }
})

const numberInstance = {
    number0,
    number1,
    number2,
    number3,
    number4,
    number5,
}
</script>
