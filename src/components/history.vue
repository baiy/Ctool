<template>
    <div>
        <Table ref="historyTable" border :columns="columns" :data="lists" :height="tableHeight">
            <template slot-scope="{ row }" slot="_value">
                <div>{{ stringify(row.value) }}}</div>
            </template>
            <template slot-scope="{ index }" slot="_op">
                <Button type="primary" size="small" @click="view(index)">{{ $t('main_ui_views') }}</Button>
                <Button type="primary" style="margin-left: 5px" @click="load(index)" size="small">
                    {{ $t('main_ui_load') }}
                </Button>
            </template>
        </Table>
        <div class="drawer-footer">
            <Button type="primary" @click="clear">{{ $t('main_history_clear') }}</Button>
        </div>
    </div>
</template>
<script>
import model from '../tool/model'
import historyFactory, {setForceLoadHistoryIndex} from "../tool/history";

export default {
    name: "history",
    data() {
        return {
            lists: [],
            columns: [
                {
                    title: this.$t('main_history_time'),
                    key: 'time',
                    width: 180
                },
                {
                    title: this.$t('main_history_data'),
                    slot: '_value',
                    ellipsis: true,
                },
                {
                    title: this.$t('main_history_op'),
                    slot: '_op',
                    width: 160
                }
            ],
        }
    },
    computed: {
        tableHeight() {
            // 设置表格高度
            return window.innerHeight - 140
        }
    },
    created() {
        let history = historyFactory(this.currentTool())
        if (history.length() < 1) {
            return this.$Message.error(this.$t('main_history_null').toString())
        }
        this.lists = history.all()
    },
    methods: {
        currentTool() {
            return model.getCurrentTool()
        },
        stringify(value) {
            return JSON.stringify(value)
        },
        view(index) {
            this.$Modal.info({
                render: (h) => {
                    return h('Input', {
                        props: {
                            type: "textarea",
                            rows: 10,
                            value: JSON.stringify(historyFactory(this.currentTool()).get(index), null, "\t"),
                        }
                    })
                },
                width: 700,
                okText: this.$t('main_ui_close')
            })
        },
        load(index) {
            setForceLoadHistoryIndex(index)
            this.close()
            this.$router.push({
                path: this.$router.currentRoute.fullPath,
                query: {
                    t: Date.now(),
                },
            });
        },
        clear() {
            historyFactory(model.getCurrentTool()).clear()
            this.close()
        },
        close(){
            this.$emit('close')
        }
    }
};
</script>
<style scoped>
.drawer-footer {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    border-top: 1px solid #e8e8e8;
    padding: 10px 16px;
    text-align: right;
    background: #fff;
}
</style>
