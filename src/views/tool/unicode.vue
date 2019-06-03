<template>
    <div>
        <Input v-model="current.input" :rows="7" type="textarea" placeholder="内容"></Input>
        <option-block>
            <FormItem>
                <ButtonGroup>
                    <Button type="primary" @click="handle('string2unicode')">字符转Unicode</Button>
                    <Button type="primary" @click="handle('unicode2string')">Unicode转字符</Button>
                </ButtonGroup>
            </FormItem>
        </option-block>
        <Input v-model="current.output" :rows="7" type="textarea" placeholder="结果"></Input>
    </div>
</template>
<script>
    export default {
        created() {
            this.current = Object.assign(this.current, this.$getToolData("input"))
        },
        methods: {
            handle(v) {
                if (this.current.input) {
                    this.current.output = this[v](this.current.input);
                    this.current.operation = v;
                    this.$clipboardCopy(this.current.output);
                    this.$saveToolData(this.current);
                }
            },
            string2unicode(string) {
                let character = String(string).split("");
                let ascii = "";
                for (let i = 0; i < character.length; i++) {
                    let code = Number(character[i].charCodeAt(0));
                    if (code > 127) {
                        let charAscii = code.toString(16);
                        charAscii = String("0000").substring(charAscii.length, 4) + charAscii;
                        ascii += "\\u" + charAscii;
                    } else {
                        ascii += character[i];
                    }
                }
                return ascii;
            },
            unicode2string(unicode) {
                let character = unicode.split("\\u");
                let native = character[0];
                for (let i = 1; i < character.length; i++) {
                    let code = character[i];
                    native += String.fromCharCode(parseInt("0x" + code.substring(0, 4)));
                    if (code.length > 4) {
                        native += code.substring(4, code.length);
                    }
                }
                return native;
            }
        },
        data() {
            return {
                current: {
                    input: "",
                    output: "",
                    operation: ""
                }
            }
        },
    }
</script>