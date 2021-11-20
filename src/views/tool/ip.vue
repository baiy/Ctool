<template>
    <div>
        <option-block class="page-option-block" style="padding: 0 0 0 5px">
            <FormItem>
                <Input v-model="current.input" :placeholder="$t('ip_input')" style="width:200px"></Input>
            </FormItem>
            <FormItem>
                <ButtonGroup>
                    <Button type="primary" @click="handle()">{{ $t('ip_query') }}</Button>
                    <Button type="primary" @click="local()">{{ $t('ip_local') }}</Button>
                </ButtonGroup>
            </FormItem>
            <FormItem>
                <Alert>{{ $t('ip_info_source') }} <a href="https://get.geojs.io/" target="_blank">https://get.geojs.io/</a></Alert>
            </FormItem>
        </option-block>
        <heightResize :append="['.page-option-block']">
            <code-editor v-model="current.output" language="json"></code-editor>
        </heightResize>
    </div>
</template>
<script>
import axios from "axios"
import _ from "lodash"
import codeEditor from "./components/codeEditor";
import jsonFormatter from "./library/formatter/json";
import heightResize from "./components/heightResize";

export default {
    components: {
        codeEditor,
        heightResize
    },
    created() {
        this.$initToolData('input',(input)=>{
            return (
                /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(input)
                || input === "localhost"
            )
        })
    },
    methods: {
        handle() {
            if (this.current.input) {
                axios({
                    url: 'https://get.geojs.io/v1/ip/geo.json',
                    params: this.current.input !== "localhost" ? {ip: this.current.input} : {}
                }).then(({data}) => {
                    this.current.output = jsonFormatter.objectBeautify(_.isArray(data) && data.length < 2 ? data[0] : data);
                    this.$saveToolData(this.current);
                    this.$Message.success(this.$t('ip_ok').toString())
                }).catch((error) => {
                    return this.$Message.error(
                        this.$t('ip_error', [error.message]).toString()
                    )
                });
            }
        },
        local() {
            this.current.input = 'localhost';
            this.handle()
        }
    },
    data() {
        return {
            current: {
                input: "",
                output: "",
            }
        }
    },
}
</script>
