<template>
    <div>
        <heightResize :append="['.page-option-block','.tool-json-mode-get']" @resize="resize">
            <Row :gutter="10">
                <Col :span="24-jsonInputCol" v-if="isMode('from_csv')">
                    <csvToJson @change="(json)=>current.content = json" @saveToolData="saveToolData" :height="height" v-model="current.from_csv" />
                </Col>
                <Col :span="24-jsonInputCol" v-if="isMode('from_table')">
                    <tableToJson @change="(json)=>current.content = json" @saveToolData="saveToolData" :height="height" v-model="current.from_table" />
                </Col>
                <Col :span="jsonInputCol">
                    <input-block top="4px">
                        <code-editor :height="`${height}px`" :placeholder="`${$t('json_input')}JSON`" v-model="current.content" language="json"></code-editor>
                        <template slot="extra">
                            <Button shape="circle"  icon="md-code" v-if="!isMode('default')" @click="setMode('default')"></Button>
                        </template>
                    </input-block>
                </Col>
                <Col :span="24-jsonInputCol" v-if="isMode('to_csv')">
                    <jsonToCsv :json="current.content" :height="height" v-model="current.to_csv" @saveToolData="saveToolData"  />
                </Col>
                <Col :span="24-jsonInputCol" v-if="isMode('to_table')">
                    <jsonToTable :json="current.content" :height="height" v-model="current.to_table" @saveToolData="saveToolData"  />
                </Col>
                <Col :span="24-jsonInputCol" v-if="isMode('object')">
                    <jsonToObject :json="current.content" :height="height" v-model="current.to_object" @saveToolData="saveToolData" />
                </Col>
            </Row>
        </heightResize>
        <option-block style="padding-top: 10px" disable-padding class="tool-json-mode-get" v-if="isMode('to_get') || isMode('from_get')">
            <Input v-if="isMode('to_get')" type="textarea" :rows="3" :value="getOutput" :placeholder="`Get ${$t('json_output')}`"></Input>
            <Input v-else type="textarea" :rows="3" v-model="current.get.input" :placeholder="`Get ${$t('json_input')} var1=value1&var2=value2`"></Input>
        </option-block>
        <option-block center class="page-option-block">
            <FormItem class="tool-json-button">
                <ButtonGroup class="tool-json-item">
                    <Button type="primary" @click="simple('beautify')">{{ $t('json_format') }}</Button>
                    <Button type="primary" @click="simple('compress')">{{ $t('json_compress') }}</Button>
                </ButtonGroup>
                <Dropdown @on-click="(name)=>simple(name)" class="tool-json-item">
                    <Button type="primary">
                        {{ $t('json_escape') }}
                        <Icon type="ios-arrow-up" />
                    </Button>
                    <DropdownMenu slot="list">
                        <DropdownItem name="escape">{{ $t('json_add_escape') }}</DropdownItem>
                        <DropdownItem name="clearEscape">{{ $t('json_clear_escape') }}</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <Dropdown @on-click="(name)=>simple(name)" class="tool-json-item">
                    <Button type="primary">
                        {{ $t('json_unicode') }}
                        <Icon type="ios-arrow-up" />
                    </Button>
                    <DropdownMenu slot="list">
                        <DropdownItem name="unicode2zh">{{ $t('json_unicode_to_zh') }}</DropdownItem>
                        <DropdownItem name="zh2unicode">{{ $t('json_zh_to_unicode') }}</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <Dropdown @on-click="(name)=>setMode(name)" class="tool-json-item">
                    <Button type="primary">
                        {{ $t('json_get') }}
                        <Icon type="ios-arrow-up" />
                    </Button>
                    <DropdownMenu slot="list">
                        <DropdownItem name="to_get">JSON => Get</DropdownItem>
                        <DropdownItem name="from_get">Get => JSON</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <Button class="tool-json-item" type="primary" @click="setMode('object')">{{ $t('json_object') }}</Button>
                <Dropdown @on-click="(name)=>setMode(name)" class="tool-json-item">
                    <Button type="primary">
                        {{ $t('json_csv') }}
                        <Icon type="ios-arrow-up" />
                    </Button>
                    <DropdownMenu slot="list">
                        <DropdownItem name="to_csv">JSON => CSV</DropdownItem>
                        <DropdownItem name="from_csv">CSV => JSON</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <Dropdown @on-click="(name)=>setMode(name)" class="tool-json-item">
                    <Button type="primary">
                        {{ $t('json_table') }}
                        <Icon type="ios-arrow-up" />
                    </Button>
                    <DropdownMenu slot="list">
                        <DropdownItem name="to_table">JSON => Table</DropdownItem>
                        <DropdownItem name="from_table">Table => JSON</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </FormItem>
        </option-block>
    </div>
</template>
<script>
import jsonInstance from "./library/json"
import codeEditor from "./components/codeEditor";
import heightResize from "./components/heightResize";
import jsonToObject from "./library/json/components/jsonToObject";
import csvToJson from "./library/json/components/csvToJson";
import tableToJson from "./library/json/components/tableToJson";
import {dispatchWindowResize} from "../../tool/event";
import jsonToCsv from "./library/json/components/jsonToCsv";
import jsonToTable from "./library/json/components/jsonToTable";

export default {
    components: {
        jsonToCsv,
        jsonToTable,
        codeEditor,
        heightResize,
        csvToJson,
        jsonToObject,
        tableToJson
    },
    computed:{
        jsonInputCol(){
            if (this.isMode('object')){
                return 10
            }
            if (this.isMode('from_csv') || this.isMode('from_table') || this.isMode('to_csv') || this.isMode('to_table')){
                return 12
            }
            return 24
        },
        getOutput(){
            if (!this.isMode('to_get')){
                return "";
            }
            return this.errorHandle(()=>{
                return jsonInstance.toGet(this.current.content)
            })
        },
        fromGet(){
            if (this.isMode('from_get') && this.current.get.input.trim()){
                return this.current.get.input;
            }
            return "";
        }
    },
    watch:{
        fromGet(val){
            if (val){
                this.errorHandle(()=>{
                    this.setContentAndSaveToolData(jsonInstance.fromGet(val))
                })
            }
        }
    },
    created() {
        this.$initToolData()
    },
    methods: {
        resize(height){
            this.height = height
        },
        errorHandle(callback){
            try {
                return callback()
            } catch (e) {
                this.$Message.error(this.$t('json_error', [e.message]).toString())
            }
            return ""
        },
        isMode(mode){
            return mode === this.current.mode
        },
        setMode(mode){
            this.current.mode = mode
            this.$nextTick(() => {
                dispatchWindowResize()
            })
        },
        // 简单处理
        simple(type) {
            this.errorHandle(()=>{
                this.current.content = this.current.content.trim()
                if (!this.current.content) {
                    throw new Error(this.$t('json_json_input_empty').toString())
                }
                // 保存操作前数据
                this.saveToolData(true)
                if (!(type in jsonInstance)) {
                    throw new Error("type error")
                }
                this.current.content = jsonInstance[type](this.current.content)
                this.saveToolData()
                this.$Message.success(this.$t('json_complete').toString())
            })
        },
        saveToolData(force = false){
            this.$saveToolData(this.current, force)
        },
        setContentAndSaveToolData(content){
            this.current.content = content
            this.saveToolData()
        }
    },
    data() {
        return {
            current: {
                content: '',
                get: {
                    input: ""
                },
                to_object:{},
                from_csv:{},
                from_table:{},
                to_csv:{},
                to_table:{},
                mode: "default"
            },
            height:100
        }
    },
}
</script>
<style scoped>
.tool-json-button .ivu-btn {
    padding: 0 10px;
}
.tool-json-button .tool-json-item{
    margin-right: 5px;
}
</style>
