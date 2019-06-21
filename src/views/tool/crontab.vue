<template>
    <div>
        <Row :gutter="16">
            <Col span="12">
                <Input v-model="current.input" style="margin-bottom: 16px">
                    <span slot="prepend">表达式</span>
                </Input>
                <Input :value="output" :rows="14" type="textarea" placeholder="最近执行时间"></Input>
            </Col>
            <Col span="12">
                <Tabs value="example">
                    <TabPane label="例子" name="example">
                        <Table stripe size="small" height="300" :columns="example.columns" :data="example.data"></Table>
                    </TabPane>
                    <TabPane label="格式" name="format" style="text-align: center">
                        <img src="../../statics/crontab.png" style="height: 300px" alt="">
                    </TabPane>
                    <TabPane label="特殊字符" name="special">
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
    import {formatDate} from "../../helper";

    export default {
        computed: {
            output() {
                if (!this.current.input) return "";
                let list = [];
                try {
                    list.push(cronstrue.toString(this.current.input, {locale: "zh_CN"}));
                    list.push("\n最近10次执行时间");
                    let interval = parser.parseExpression(this.current.input);
                    for (let i = 1; i <= 10; i++) {
                        list.push(`第${i}次: ` + formatDate(new Date(interval.next().toString())))
                    }
                    this.$saveToolData(this.current);
                } catch (err) {
                    list.push(err)
                }

                return list.join("\n");
            },
        },
        created() {
            this.current = Object.assign(this.current, this.$getToolData())
        },
        data() {
            return {
                current: {
                    input: "2 */5 * * 2-5",
                    operation: "check"
                },
                special: {
                    columns: [
                        {title: '特殊字符', key: 'name', width: 100},
                        {title: '代表意义', key: 'text'},
                    ],
                    data: [
                        {
                            name: "*(星号)",
                            text: "代表任何时刻都接受的意思。举例来说，范例一内那个日、月、周都是*，就代表着不论何月、何日的礼拜几的12：00都执行后续命令的意思。"
                        },
                        {
                            name: ",(逗号)",
                            text: "代表分隔时段的意思。举例来说，如果要执行的工作是3：00与6：00时，就会是：0 3,6 * * * command时间还是有五列，不过第二列是 3,6 ，代表3与6都适用"
                        },
                        {
                            name: "-(减号)",
                            text: "代表一段时间范围内，举例来说，8点到12点之间的每小时的20分都进行一项工作：20 8-12 * * * command仔细看到第二列变成8-12.代表 8,9,10,11,12 都适用的意思"
                        },
                        {
                            name: "/n(斜线)",
                            text: "那个n代表数字，即是每隔n单位间隔的意思，例如每五分钟进行一次，则：*/5 * * * * command用*与/5来搭配，也可以写成0-59/5，意思相同"
                        }
                    ]
                },
                example: {
                    columns: [
                        {title: '例子', key: 'example', width: 120},
                        {title: '说明', key: 'text'},
                    ],
                    data: [
                        {example: "*/1 * * * *", text: "每1分钟执行"},
                        {example: "* * * * *", text: "每1分钟执行"},
                        {example: "*/5 * * * *", text: "每5分钟执行"},
                        {example: "0 * * * *", text: "每小时执行"},
                        {example: "0 */1 * * *", text: "每小时执行"},
                        {example: "0 7 * * *", text: "每天上午7点执行"},
                        {example: "10 7 * * *", text: "每天上午7点10分执行"},
                        {example: "0 0 * * *", text: "每天定时执行一次"},
                        {example: "0 0 * * 0", text: "每周定时执行一次"},
                        {example: "0 0 1 * *", text: "每月定时执行一次"},
                        {example: "0 0 1 1 *", text: "每年定时执行一次"},
                        {example: "5 * * * *", text: "指定每小时的第5分钟执行一次命令"},
                        {example: "30 5 * * *", text: "指定每天的 5:30 执行命令"},
                        {example: "30 7 8 * *", text: "指定每月8号的7：30分执行命令"},
                        {example: "30 5 8 6 *", text: "指定每年的6月8日5：30执行命令"},
                        {example: "30 6 * * 0", text: "指定每星期日的6:30执行命令"},
                        {example: "30 3 10,20 * *", text: "每月10号及20号的3：30执行命令[注：“，”用来连接多个不连续的时段]"},
                        {example: "25 8-11 * * *", text: "每天8-11点的第25分钟执行命令[注：“-”用来连接连续的时段"},
                        {example: "*/15 * * * *", text: "每15分钟执行一次命令 [即每个小时的第0 15 30 45 60分钟执行命令]"},
                        {example: "30 6 */10 * *", text: "每个月中，每隔10天6:30执行一次命令[即每月的1、11、21、31日是的6：30执行一次命令。]"}
                    ]
                }
            }
        }
    }
</script>