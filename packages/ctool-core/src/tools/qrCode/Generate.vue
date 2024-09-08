<template>
    <HeightResize v-slot="{height}" :append="['.ctool-page-option']" v-row="`1-320px`">
        <Display :position="'bottom-right'">
            <TextInput v-model="action.current.input" :height="height" upload="file"/>
            <template #extra>
                <Bool :size="'small'" v-if="!(output.isEmpty() || output.isError())" v-model="action.current.option.is_show" :label="$t(`main_ui_setting`)" border/>
            </template>
        </Display>
        <TextOutput
            v-model="action.current.output"
            :allow="['image','hex','base64']"
            :content="output"
            :height="height"
            @success="action.save()"
        />
    </HeightResize>
    <div class="ctool-page-option" v-if="action.current.option.is_show" style="margin-top: 5px">
        <Tabs
            v-model="action.current.option.tab"
            :lists="[
                {label:$t('qrCode_generate_option_common'), name:`common`},
                {label:$t('qrCode_generate_option_content'), name:`content`},
                {label:$t('qrCode_generate_option_corners_square'), name:`corners_square`},
                {label:$t('qrCode_generate_option_corners_dot'), name:`corners_dot`},
                {label:$t('qrCode_generate_option_background'), name:`background`},
            ]"
        >
            <Align>
                <InputNumber :size="generateOptionSize" :width="120" v-model="action.current.option.margin" :max="1000">
                    <template #prepend>
                        {{ $t('qrCode_generate_option_margin') }}
                    </template>
                </InputNumber>
                <Select
                    :size="generateOptionSize"
                    :options="['L','M','Q','H']"
                    v-model="action.current.option.error_correction_level"
                    :label="$t('qrCode_generate_option_correction')"
                />
                <UploadFile :size="generateOptionSize" @success="uploadHandle" button-type="text" type="image"/>
                <InputNumber :size="generateOptionSize" :width="100" v-model="action.current.option.image_options.size" :max="10">
                    <template #prepend>
                        {{ $t('qrCode_generate_option_size') }}
                    </template>
                </InputNumber>
                <InputNumber :size="generateOptionSize" :width="120" v-model="action.current.option.image_options.margin" :max="1000">
                    <template #prepend>
                        {{ $t('qrCode_generate_option_margin') }}
                    </template>
                </InputNumber>
            </Align>
            <GenerateOptionColor v-model="action.current.option.dots_options.color" :size="generateOptionSize">
                <Select
                    v-model="action.current.option.dots_options.type"
                    :options="optionMap(['square' ,'dots' , 'rounded' , 'classy' , 'extra-rounded','classy-rounded'],'qrCode_generate_option_')"
                    :size="generateOptionSize"
                    :label="$t('qrCode_generate_option_style')"
                />
            </GenerateOptionColor>
            <GenerateOptionColor v-model="action.current.option.corners_square_options.color" :size="generateOptionSize">
                <Select
                    v-model="action.current.option.corners_square_options.type"
                    :options="optionMap(['dot' , 'square' , 'extra-rounded'],'qrCode_generate_option_')"
                    :size="generateOptionSize"
                    :label="$t('qrCode_generate_option_style')"
                />
            </GenerateOptionColor>
            <GenerateOptionColor v-model="action.current.option.corners_dot_options.color" :size="generateOptionSize">
                <Select
                    v-model="action.current.option.corners_dot_options.type"
                    :options="optionMap(['dot' , 'square'],'qrCode_generate_option_')"
                    :size="generateOptionSize"
                    :label="$t('qrCode_generate_option_style')"
                />
            </GenerateOptionColor>
            <GenerateOptionColor v-model="action.current.option.background_options.color" :size="generateOptionSize"/>
        </Tabs>
    </div>
</template>

<script lang="ts" setup>
import {initialize, useAction} from "@/store/action";
import {createTextInput, createTextOutput} from "@/components/text"
import Text from "@/helper/text";
import {watch} from "vue";
import GenerateOptionColor from "./GenerateOptionColor.vue";
import {generateOptionsHandle, defaultGenerateOption} from "./util";
import QRCodeStyling from 'qr-code-styling'
import {optionMap} from "@/helper/helper";
import {ComponentSizeType} from "@/types";

const action = useAction(await initialize({
    input: createTextInput(),
    option: defaultGenerateOption(),
    output: createTextOutput('image'),
}))
const generateOptionSize: ComponentSizeType = "default"

let image = $shallowRef(Text.empty())
let output = $shallowRef(Text.empty())

const update = async () => {
    if (action.current.input.text.isError()) {
        output = Text.fromError(action.current.input.text.toString())
        return;
    }
    output = Text.empty()
    if (action.current.input.text.isEmpty()) {
        return;
    }
    try {
        const qrCode = new QRCodeStyling(generateOptionsHandle(action.current.option, action.current.input.text.toString(), image))
        const result = await qrCode.getRawData()
        if (!result){
            throw new Error('generated error')
        }
        output = await Text.fromBlob(result)
    } catch (e) {
        output = Text.fromError($error(e))
    }
}

const uploadHandle = async (value: File) => {
    image = (await Text.fromBlob(value)).setFileName(value.name)
}

watch(
    () => {
        return {option: action.current.option, image, text: action.current.input.text}
    },
    () => update(),
    {immediate: true, deep: true}
)
</script>
