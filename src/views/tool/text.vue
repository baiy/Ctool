<template>
    <div>
        <input-block right="15px" bottom="10px">
            <heightResize :append="['.page-option-block']">
                <autoHeightTextarea  v-model="current.content" :placeholder="$t('text_input')"></autoHeightTextarea>
            </heightResize>
            <template slot="extra">
                <Button type="dashed" @click="statShow = true" size="small">
                    {{ $t('text_stat_show',[stat.word_length,stat.byte_utf8_length,stat.byte_gbk_length]) }}
                    <Icon type="ios-more" />
                </Button>
            </template>
        </input-block>
        <option-block class="page-option-block">
            <FormItem v-if="current.original.length > 0">
                <Button type="default" :size="buttonSize"
                        @click="[current.content,current.original]=[current.original,current.content]">
                    {{ $t('text_resume') }}
                </Button>
            </FormItem>
            <FormItem>
                <Dropdown @on-click="(item)=>handle(item)" transfer>
                    <Button :size="buttonSize" type="primary">
                        {{ $t('text_case_conversion') }}
                        <Icon type="ios-arrow-down"></Icon>
                    </Button>
                    <DropdownMenu slot="list">
                        <DropdownItem name="upper">{{ $t('text_upper_all') }}</DropdownItem>
                        <DropdownItem name="lower">{{ $t('text_lower_all') }}</DropdownItem>
                        <DropdownItem name="upperLineStart">{{ $t('text_upper_line_start') }}</DropdownItem>
                        <DropdownItem name="lowerLineStart">{{ $t('text_lower_line_start') }}</DropdownItem>
                        <DropdownItem name="upperStart">{{ $t('text_upper_word_start') }}</DropdownItem>
                        <DropdownItem name="lowerStart">{{ $t('text_lower_word_start') }}</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </FormItem>
            <FormItem>
                <Dropdown @on-click="(item)=>handle('replacePunctuation',item)" transfer>
                    <Button :size="buttonSize" type="primary">
                        {{ $t('text_punctuation') }}
                        <Icon type="ios-arrow-down"></Icon>
                    </Button>
                    <DropdownMenu slot="list">
                        <DropdownItem name="en">{{ $t('text_cn') }} -> {{ $t('text_en') }}</DropdownItem>
                        <DropdownItem name="zh">{{ $t('text_en') }} -> {{ $t('text_cn') }}</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </FormItem>
            <FormItem>
                <Dropdown @on-click="(item)=>handle('zhTran',item)" transfer>
                    <Button :size="buttonSize" type="primary">
                        {{ $t('text_simplified_traditional') }}
                        <Icon type="ios-arrow-down"></Icon>
                    </Button>
                    <DropdownMenu slot="list">
                        <DropdownItem name="simplified">{{ $t('text_simplified') }} -> {{ $t('text_traditional') }}</DropdownItem>
                        <DropdownItem name="traditional">{{ $t('text_traditional') }} -> {{ $t('text_simplified') }}</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </FormItem>
            <FormItem>
                <Button :size="buttonSize" type="primary" @click="replace.show = true">{{ $t('text_replace') }}</Button>
            </FormItem>
            <FormItem>
                <Button :size="buttonSize" type="primary" @click="handle('lineRemoveRepeat')">
                    {{ $t('text_line_remove_duplicate') }}
                </Button>
            </FormItem>
            <FormItem>
                <Dropdown @on-click="(item)=>handle(item)" transfer>
                    <Button :size="buttonSize" type="primary">
                        {{ $t('text_line_number') }}
                        <Icon type="ios-arrow-down"></Icon>
                    </Button>
                    <DropdownMenu slot="list">
                        <DropdownItem name="addLineIndex">{{ $t('text_line_number_add') }}</DropdownItem>
                        <DropdownItem name="removeLineIndex">{{ $t('text_line_number_remove') }}</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </FormItem>
            <FormItem>
                <Dropdown @on-click="(item)=>handle('lineSort',item)" transfer>
                    <Button :size="buttonSize" type="primary">
                        {{ $t('text_line_sort') }}
                        <Icon type="ios-arrow-down"></Icon>
                    </Button>
                    <DropdownMenu slot="list">
                        <DropdownItem name="asc">{{ $t('text_line_sort_asc') }}</DropdownItem>
                        <DropdownItem name="desc">{{ $t('text_line_sort_desc') }}</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </FormItem>
            <FormItem>
                <Dropdown @on-click="(item)=>handle(item)" transfer>
                    <Button :size="buttonSize" type="primary">
                        {{ $t('text_filter') }}
                        <Icon type="ios-arrow-down"></Icon>
                    </Button>
                    <DropdownMenu slot="list">
                        <DropdownItem name="lineTrim">{{ $t('text_filter_trim') }}</DropdownItem>
                        <DropdownItem name="filterBlankLine">{{ $t('text_filter_blank_line') }}</DropdownItem>
                        <DropdownItem name="filterAllBr">{{ $t('text_filter_all_br') }}</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </FormItem>
        </option-block>
        <Modal v-model="statShow" :styles="{top: '20px'}" width="700" footer-hide>
            <Tabs value="stat">
                <TabPane :label="$t('text_stat')" name="stat">
                    <Table :columns="statColumns" stripe border size="small" :data="statTable" />
                </TabPane>
                <TabPane :label="$t('text_stat_explain')" name="explain">
                    <Table :columns="statExplain.columns" border stripe size="small" :data="statExplain.data"/>
                </TabPane>
            </Tabs>
        </Modal>
        <Modal v-model="replace.show" width="400" :title="$t('text_replace')">
            <Form label-position="top">
                <Row :gutter="16">
                    <Col span="12">
                        <FormItem :label="$t('text_replace_search')">
                            <input-block>
                                <Input v-model="replace.search" :rows="6" type="textarea"></Input>
                                <template slot="extra">
                                    <Checkbox v-model="replace.regular">{{ $t('text_replace_regular') }}
                                    </Checkbox>
                                </template>
                            </input-block>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem :label="$t('text_replace_replace')">
                            <Input v-model="replace.replace" :rows="6" type="textarea"></Input>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <Alert v-if="!replace.regular">{{ $t('text_replace_explain') }}</Alert>
            <div slot="footer">
                <Button type="text" @click="replace.show = false">{{ $t('text_cancel') }}</Button>
                <Button type="primary" @click="replaceRun()">{{ $t('text_submit') }}</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
import TextHandle from './library/text'
import autoHeightTextarea from "./components/autoHeightTextarea";
import heightResize from "./components/heightResize";

export default {
    components:{
        autoHeightTextarea,
        heightResize
    },
    created() {
        this.$initToolData('content')
    },
    computed: {
        stat(){
            return TextHandle(this.current.content).stat()
        },
        statTable() {
            let stat = TextHandle(this.current.content).stat();
            return [
                {
                    name1: this.$t('text_string_length'), value1: stat.string_length,
                    name2: this.$t('text_byte_length'), value2: `${stat.byte_utf8_length} / ${stat.byte_gbk_length}`
                },
                {
                    name1: this.$t('text_word_length'), value1: stat.word_length,
                    name2: this.$t('text_line_length'), value2: stat.line_length
                },
                {
                    name1: this.$t('text_zh_length'), value1: `${stat.zh_word} / ${stat.zh_punctuation}`,
                    name2: this.$t('text_en_length'), value2: `${stat.en_string} / ${stat.en_word} / ${stat.en_punctuation}`
                },
                {
                    name1: this.$t('text_int_length'), value1: `${stat.int_string} / ${stat.int_word}`,
                    name2: '-', value2: '-'
                },
            ]
        }
    },
    methods: {
        handle(method, ...parameter) {
            try {
                let result = TextHandle(this.current.content)[method](...parameter)
                this.current.original = this.current.content;
                this.current.content = result;
                this.$saveToolData(this.current);
                this.$Message.success(this.$t('text_ok').toString())
            } catch (e) {
                this.$Message.error(this.$t('text_error',[e.message]).toString())
            }
        },
        replaceRun() {
            if (this.replace.regular){
                this.handle('regularReplace', this.replace.search, this.replace.replace)
            }
            else{
                this.handle('replace', this.replace.search.split(/\r?\n/), this.replace.replace.split(/\r?\n/))
            }
            this.replace.show = false
        }
    },
    data() {
        return {
            replace: {
                show: false,
                search: "",
                replace: "",
                regular: false
            },
            current: {
                content: "",
                original: "",
            },
            statShow:false,
            statExplain: {
                columns: [
                    {
                        title: this.$t('text_item'),
                        key: 'name',
                        width: 200
                    },
                    {
                        title: this.$t('text_explain'),
                        key: 'explain',
                    },
                ],
                data: [
                    {name: this.$t('text_explain_byte_length_utf8_name'), explain: this.$t('text_explain_byte_length_utf8_info')},
                    {name: this.$t('text_explain_byte_length_gbk_name'), explain: this.$t('text_explain_byte_length_gbk_info')},
                    {name: this.$t('text_explain_string_length_name'), explain: this.$t('text_explain_string_length_info')},
                    {name: this.$t('text_explain_word_length_name'), explain: this.$t('text_explain_word_length_info')},
                    {name: this.$t('text_explain_int_length_name'), explain: this.$t('text_explain_int_length_info')},
                    {name: this.$t('text_explain_int_word_length_name'), explain: this.$t('text_explain_int_word_length_info')},
                    {name: this.$t('text_explain_blank_line_length_name'), explain: this.$t('text_explain_blank_line_length_info')},
                ]
            },
            statColumns: [
                {
                    title: this.$t('text_item'),
                    key: 'name1',
                    width: 200
                },
                {
                    title: this.$t('text_value'),
                    key: 'value1',
                    align: "right"
                },
                {
                    title: this.$t('text_item'),
                    key: 'name2',
                    width: 200
                },
                {
                    title: this.$t('text_value'),
                    key: 'value2',
                    align: "right"
                },
            ],
            buttonSize: "small",
        }
    },
}
</script>
<style>
.ctool-stat-block .ivu-modal-body {
    padding: 0;
}
</style>
