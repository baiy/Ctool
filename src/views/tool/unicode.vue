<template>
    <div>
        <Input v-model="current.input" :rows="7" type="textarea" placeholder="内容"></Input>
        <option-block>
            <FormItem>
                <ButtonGroup>
                    <Button type="primary" @click="handle('encode')">字符转Unicode(编码)</Button>
                    <Button type="primary" @click="handle('decode')">Unicode转字符(解码)</Button>
                </ButtonGroup>
            </FormItem>
            <FormItem>
                <Select v-model="current.type" style="width:250px">
                    <Option value="unicode_point_default">Unicode 默认模式 \u[0-9a-f]{4}</Option>
                    <Option value="unicode_point_wide">Unicode 宽字符模式 \u[0-9a-f]{4,6}</Option>
                    <Option value="unicode_point_wide_brace">Unicode 宽字符模式(带大括号) \u{[0-9a-f]{4,6}}</Option>
                    <Option value="unicode_number">Unicode 编码模式 U+[0-9A-F]{4,6}</Option>
                    <Option value="html_entity_10">html 实体(10进制) &amp;#[0-9]+;</Option>
                    <Option value="html_entity_16">html 实体(16进制) &amp;#x[0-9a-f]{1,6};</Option>
                    <Option value="css_entitie">css 实体(16进制) \[0-9a-f]{4,6}</Option>
                </Select>
            </FormItem>
            <FormItem v-if="!disable_ignore_ascii_select.includes(current.type)">
                <Checkbox v-model="current.ignore_ascii">禁止 ASCII 字符编码</Checkbox>
            </FormItem>
        </option-block>
        <Input v-model="current.output" :rows="7" type="textarea" placeholder="结果"></Input>
    </div>
</template>
<script>
import Unicode from "./library/unicode"

export default {
    created() {
        this.current = Object.assign(this.current, this.$getToolData("input"))
    },
    methods: {
        handle(operation) {
            if (this.current.input) {
                try {
                    if (operation === "encode") {
                        this.current.output = Unicode.encode(
                            this.current.input,
                            this.current.type,
                            this.disable_ignore_ascii_select.includes(this.current.type) ? false : this.current.ignore_ascii
                        );
                    } else {
                        this.current.output = Unicode.decode(this.current.input, this.current.type);
                    }
                } catch (e) {
                    return this.$Message.error(e.message)
                }
                this.current.operation = operation;
                this.$clipboardCopy(this.current.output);
                this.$saveToolData(this.current);
            }
        }
    },
    data() {
        return {
            current: {
                input: "",
                output: "",
                operation: "",
                type: "unicode_point_default",
                ignore_ascii: true,
            },
            disable_ignore_ascii_select: ['unicode_point_wide', 'unicode_number', 'css_entitie']
        }
    },
}
</script>