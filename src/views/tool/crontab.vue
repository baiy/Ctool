<template>
    <div>
        <Row :gutter="16">
            <Col span="12">
                <Input v-model="current.input" style="margin-bottom: 16px" class="page-option-input">
                    <span slot="prepend">{{ $t('crontab_expression') }}</span>
                </Input>
                <heightResize :append="['.page-option-input']">
                    <autoHeightTextarea :value="output" :placeholder="$t('crontab_execute_time')"/>
                </heightResize>
            </Col>
            <Col span="12" class="page-option-reference">
                <Tabs value="example">
                    <TabPane :label="$t('crontab_example')" name="example">
                        <heightResize :reduce="52" @resize="resize">
                            <Table stripe size="small" :height="referenceHeight" border :columns="example.columns"
                                   :data="example.data"></Table>
                        </heightResize>
                    </TabPane>
                    <TabPane :label="$t('crontab_format')" name="format" style="text-align: center">
                        <img v-if="locale === 'zh_CN'" src="../../statics/crontab_cn.png" style="height: 300px" alt="">
                        <img v-else src="../../statics/crontab_en.png" style="height: 300px" alt="">
                    </TabPane>
                    <TabPane :label="$t('crontab_symbol')" name="special">
                        <Table stripe size="small" height="300" :columns="special.columns" :data="special.data"></Table>
                    </TabPane>
                </Tabs>
            </Col>
        </Row>
    </div>
</template>
<script>
import cronstrue from 'cronstrue/i18n';
import parser from 'cron-parser';
import moment from "moment"
import {getCurrentLocale} from "../../i18n";
import heightResize from "./components/heightResize";
import autoHeightTextarea from "./components/autoHeightTextarea";

export default {
    components: {
        heightResize,
        autoHeightTextarea
    },
    computed: {
        locale() {
            return getCurrentLocale()
        },
        output() {
            if (!this.current.input) return "";
            let list = [];
            try {
                list.push(this.conversion(this.current.input));
                list.push(`\n${this.$t('crontab_execute_time_list')}`);
                let interval = parser.parseExpression(this.current.input);
                for (let i = 1; i <= 10; i++) {
                    list.push(this.$t('crontab_no', [i, moment(interval.next().toString()).format("YYYY-MM-DD HH:mm:ss")]))
                }
                this.$saveToolData(this.current);
            } catch (err) {
                list.push(err)
            }

            return list.join("\n");
        },
    },
    created() {
        this.$initToolData('input', (data) => {
            try {
                cronstrue.toString(data)
            } catch {
                return false
            }
            return true
        })
        this.example.data = this.example.data.map((item) => {
            return {
                example: item,
                text: this.conversion(item)
            }
        })
    },
    methods: {
        conversion(input) {
            return cronstrue.toString(input, {locale: this.locale, use24HourTimeFormat: true})
        },
        resize(height) {
            this.referenceHeight = height
        }
    },
    data() {
        return {
            referenceHeight: 101,
            current: {
                input: "2 */5 * * 2-5"
            },
            special: {
                columns: [
                    {title: this.$t('crontab_symbol'), key: 'name', width: 100},
                    {title: this.$t('crontab_description'), key: 'text'},
                ],
                data: [
                    {
                        name: "*",
                        text: this.$t('crontab_symbol_description_1')
                    },
                    {
                        name: ",",
                        text: this.$t('crontab_symbol_description_2')
                    },
                    {
                        name: "-",
                        text: this.$t('crontab_symbol_description_3')
                    },
                    {
                        name: "/n",
                        text: this.$t('crontab_symbol_description_4')
                    }
                ]
            },
            example: {
                columns: [
                    {title: this.$t('crontab_example'), key: 'example', width: 120},
                    {title: this.$t('crontab_description'), key: 'text'},
                ],
                data: [
                    "*/1 * * * *",
                    "* * * * *",
                    "*/5 * * * *",
                    "0 * * * *",
                    "0 */1 * * *",
                    "0 7 * * *",
                    "10 7 * * *",
                    "0 0 * * *",
                    "0 0 * * 0",
                    "0 0 1 * *",
                    "0 0 1 1 *",
                    "5 * * * *",
                    "30 5 * * *",
                    "30 7 8 * *",
                    "30 5 8 6 *",
                    "30 6 * * 0",
                    "30 3 10,20 * *",
                    "25 8-11 * * *",
                    "*/15 * * * *",
                    "30 6 */10 * *"
                ]
            }
        }
    }
}
</script>
