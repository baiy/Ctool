<template>
    <div>
        <Row :gutter="10">
            <Col span="14">
                <Tabs value="content">
                    <TabPane label="文本内容" name="content">
                        <Input v-model="current.content" :rows="12" type="textarea" placeholder="内容"></Input>
                        <option-block style="padding: 0 0">
                            <FormItem v-if="current.original.length > 0">
                                <Button type="default" :size="buttonSize"
                                        @click="[current.content,current.original]=[current.original,current.content]">
                                    恢复
                                </Button>
                            </FormItem>
                            <FormItem>
                                <Dropdown @on-click="(item)=>handle(item)" transfer>
                                    <Button :size="buttonSize" type="primary">
                                        大小写转换
                                        <Icon type="ios-arrow-down"></Icon>
                                    </Button>
                                    <DropdownMenu slot="list">
                                        <DropdownItem name="upper">全部大写</DropdownItem>
                                        <DropdownItem name="lower">全部小写</DropdownItem>
                                        <DropdownItem name="upperLineStart">行首大写</DropdownItem>
                                        <DropdownItem name="lowerLineStart">行首小写</DropdownItem>
                                        <DropdownItem name="upperStart">词首大写</DropdownItem>
                                        <DropdownItem name="lowerStart">词首小写</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </FormItem>
                            <FormItem>
                                <Dropdown @on-click="(item)=>handle('replacePunctuation',item)" transfer>
                                    <Button :size="buttonSize" type="primary">
                                        中英标点替换
                                        <Icon type="ios-arrow-down"></Icon>
                                    </Button>
                                    <DropdownMenu slot="list">
                                        <DropdownItem name="en">中 -> 英</DropdownItem>
                                        <DropdownItem name="zh">英 -> 中</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </FormItem>
                            <FormItem>
                                <Dropdown @on-click="(item)=>handle('zhTran',item)" transfer>
                                    <Button :size="buttonSize" type="primary">
                                        简繁转换
                                        <Icon type="ios-arrow-down"></Icon>
                                    </Button>
                                    <DropdownMenu slot="list">
                                        <DropdownItem name="simplified">繁 -> 简</DropdownItem>
                                        <DropdownItem name="traditional">简 -> 繁</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </FormItem>
                        </option-block>
                        <option-block style="padding: 0 0">
                            <FormItem>
                                <Button :size="buttonSize" type="primary" @click="replace.show = true">字符替换</Button>
                            </FormItem>
                            <FormItem>
                                <Button :size="buttonSize" type="primary" @click="handle('lineRemoveRepeat')">行去重
                                </Button>
                            </FormItem>
                            <FormItem>
                                <Dropdown @on-click="(item)=>handle(item)" transfer>
                                    <Button :size="buttonSize" type="primary">
                                        增/删行号
                                        <Icon type="ios-arrow-down"></Icon>
                                    </Button>
                                    <DropdownMenu slot="list">
                                        <DropdownItem name="addLineIndex">添加行号</DropdownItem>
                                        <DropdownItem name="removeLineIndex">移除行号</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </FormItem>
                            <FormItem>
                                <Dropdown @on-click="(item)=>handle('lineSort',item)" transfer>
                                    <Button :size="buttonSize" type="primary">
                                        行排序
                                        <Icon type="ios-arrow-down"></Icon>
                                    </Button>
                                    <DropdownMenu slot="list">
                                        <DropdownItem name="asc">升序</DropdownItem>
                                        <DropdownItem name="desc">降序</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </FormItem>
                            <FormItem>
                                <Dropdown @on-click="(item)=>handle(item)" transfer>
                                    <Button :size="buttonSize" type="primary">
                                        过滤
                                        <Icon type="ios-arrow-down"></Icon>
                                    </Button>
                                    <DropdownMenu slot="list">
                                        <DropdownItem name="lineTrim">过滤行首尾不可见字符(trim)</DropdownItem>
                                        <DropdownItem name="filterBlankLine">过滤多余空行</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </FormItem>
                        </option-block>
                    </TabPane>
                </Tabs>
            </Col>
            <Col span="10">
                <Tabs value="right">
                    <TabPane label="统计" name="right">
                        <Table :columns="statColumns" stripe border size="small" :data="stat">
                        </Table>
                    </TabPane>
                    <Button @click="statExplain.show = true" type="text" slot="extra">
                        <Icon type="md-help-circle"/>
                    </Button>
                </Tabs>
            </Col>
        </Row>
        <Modal v-model="statExplain.show" width="600" title="统计说明" class-name="ctool-stat-explain" footer-hide>
            <Table :columns="statExplain.columns" stripe size="small" :data="statExplain.data"/>
        </Modal>
        <Modal v-model="replace.show" width="400" title="字符替换">
            <Form label-position="top">
                <Row :gutter="16">
                    <Col span="12">
                        <FormItem label="查找字符">
                            <Input v-model="replace.search" :rows="6" type="textarea"></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="替换字符">
                            <Input v-model="replace.replace" :rows="6" type="textarea"></Input>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <Alert>可输入多行, 按行进行批量替换</Alert>
            <div slot="footer">
                <Button type="text" @click="replace.show = false">取消</Button>
                <Button type="success" @click="replaceRun()">提交</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
import TextHandle from './library/text'

export default {
    created() {
        this.current = Object.assign(this.current, this.$getToolData("content"))
    },
    computed: {
        stat() {
            let stat = TextHandle(this.current.content).stat();
            return [
                {name: "字符数", value: stat.string_length},
                {name: "字节数(utf8/gbk)", value: `${stat.byte_utf8_length} / ${stat.byte_gbk_length}`},
                {name: "字数", value: stat.word_length},
                {name: "行数", value: stat.line_length},
                {name: "(中文)字数/标点", value: `${stat.zh_word} / ${stat.zh_punctuation}`},
                {name: "(英文)字母/单词/标点", value: `${stat.en_string} / ${stat.en_word} / ${stat.en_punctuation}`},
                {name: "(数字)字符/单词", value: `${stat.int_string} / ${stat.int_word}`},
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
                this.$Message.success("完成")
            } catch (e) {
                this.$Message.error(e.message)
            }
        },
        replaceRun() {
            this.handle('replace', this.replace.search.split(/\r?\n/), this.replace.replace.split(/\r?\n/))
            this.replace.show = false
        }
    },
    data() {
        return {
            replace: {
                show: false,
                search: "",
                replace: ""
            },
            current: {
                content: "",
                original: "",
            },
            statExplain: {
                show: false,
                columns: [
                    {
                        title: '统计项目',
                        key: 'name',
                        width: 100
                    },
                    {
                        title: '说明',
                        key: 'explain',
                    },
                ],
                data: [
                    {name: "字节数utf8", explain: "中文字符计3个长度"},
                    {name: "字节数gbk", explain: "中文字符计2个长度"},
                    {name: "字符数", explain: "中/英文字符均计1个长度 换行符不计入长度"},
                    {name: "字数", explain: "中文字数+英文单词数+中文标点数+英文标点数+数字单词数"},
                    // {name: "中文字数/标点",explain:"-"},
                    // {name: "英文字母/单词/标点",explain:"-"},
                    {name: "数字字符", explain: "统计单个数字出现次数 例如:'a1024 1024' 结果为:8"},
                    {name: "数字单词", explain: "例如:'a1024 1024' 结果为:1 其中:'a1024' 为英文单词 '1024' 为数字单词"},
                    {name: "行数", explain: "空行也会计入行数"},
                ]
            },
            statColumns: [
                {
                    title: '统计项目',
                    key: 'name',
                    width: 150
                },
                {
                    title: '值',
                    key: 'value',
                    align: "right"
                },
            ],
            buttonSize: "small",
        }
    },
}
</script>
<style>
.ctool-stat-explain .ivu-modal-body {
    padding: 0;
}
</style>