<template>
    <heightResize class="tool-timestamp-page">
        <div class="tool-timestamp-block">
            <option-block>
                <input-block bottom="8px" right="8px">
                    <Input size="large" v-model="current.input">
                        <span slot="prepend">{{ $t('timestamp_input') }}</span>
                    </Input>
                    <template slot="extra">
                        <Dropdown @on-click="currentTime" transfer>
                            <Button size="small" type="primary">
                                {{ $t('timestamp_get') }}
                                <Icon type="ios-arrow-down"></Icon>
                            </Button>
                            <DropdownMenu slot="list">
                                <DropdownItem name="normalSecond">{{ $t('timestamp_normal_second') }}</DropdownItem>
                                <DropdownItem name="normalMillisecond">{{
                                        $t('timestamp_normal_millisecond')
                                    }}
                                </DropdownItem>
                                <DropdownItem name="unixSecond">{{ $t('timestamp_unix_second') }}</DropdownItem>
                                <DropdownItem name="unixMillisecond">{{
                                        $t('timestamp_unix_millisecond')
                                    }}
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </template>
                </input-block>
            </option-block>
            <option-block>
                <input-block bottom="8px" right="8px">
                    <Input size="large" :value="output">
                        <span slot="prepend">{{ $t('timestamp_output') }}</span>
                    </Input>
                    <template slot="extra">
                        <Button size="small" type="primary" @click="()=>$copy(output)">{{
                                $t('timestamp_copy')
                            }}
                        </Button>
                    </template>
                </input-block>
            </option-block>
            <Table :columns="exampleColumns" stripe border size="small" :data="example">
                <template slot-scope="{ row }" slot="_value">
                    <Button size="small" type="text" @click="()=>$copy(row.value)">{{ row.value }}</Button>
                </template>
            </Table>
        </div>
    </heightResize>
</template>
<script>
import moment from 'moment'
import heightResize from "./components/heightResize";

let inputType = {
    'normalSecond': 1,
    'normalMillisecond': 2,
    'unixSecond': 3,
    'unixMillisecond': 4,
    'error': 0,
}

export default {
    components: {
        heightResize
    },
    created() {
        this.$initToolData('input', (data) => {
            return (
                (new RegExp(/^\d+-\d+-\d+ \d+:\d+:\d+$/)).test(data)
                || (new RegExp(/^\d+-\d+-\d+ \d+:\d+:\d+\.\d+$/)).test(data)
                || (new RegExp(/^\d{10}$/)).test(data)
                || (new RegExp(/^\d{13}$/)).test(data)
            )
        })
    },
    mounted() {
        this.timer = setInterval(() => {
            this.timestamp = moment().format('x')
        }, 100);
    },
    beforeDestroy() {
        clearInterval(this.timer);
    },
    computed: {
        example() {
            let time = moment(parseInt(this.timestamp))
            return [
                {format: this.$t('timestamp_normal_second'), value: time.format('YYYY-MM-DD HH:mm:ss')},
                {format: this.$t('timestamp_unix_second'), value: time.format('X')},
                {format: this.$t('timestamp_normal_millisecond'), value: time.format('YYYY-MM-DD HH:mm:ss.SSS')},
                {format: this.$t('timestamp_unix_millisecond'), value: time.format('x')},
            ]
        },
        output() {
            let result = "";
            if (!this.current.input) {
                return result;
            }
            try {
                let type = function (input) {
                    if ((new RegExp(/^\d+-\d+-\d+ \d+:\d+:\d+$/)).test(input)) {
                        return inputType.normalSecond
                    }
                    if ((new RegExp(/^\d+-\d+-\d+ \d+:\d+:\d+\.\d+$/)).test(input)) {
                        return inputType.normalMillisecond
                    }
                    if ((new RegExp(/^\d{10}$/)).test(input)) {
                        return inputType.unixSecond
                    }
                    if ((new RegExp(/^\d{13}$/)).test(input)) {
                        return inputType.unixMillisecond
                    }
                    return inputType.error
                }(this.current.input.trim())
                if (type === inputType.error) {
                    throw new Error(this.$t('timestamp_error_format').toString())
                }
                switch (type) {
                    case inputType.normalSecond:
                        result = moment(this.current.input).format('X')
                        break
                    case inputType.normalMillisecond:
                        result = moment(this.current.input).format('x')
                        break
                    case inputType.unixSecond:
                        result = moment(parseInt(this.current.input) * 1000).format('YYYY-MM-DD HH:mm:ss')
                        break
                    case inputType.unixMillisecond:
                        result = moment(parseInt(this.current.input)).format('YYYY-MM-DD HH:mm:ss.SSS')
                        break
                }
                this.$saveToolData(this.current)
            } catch (e) {
                result = this.$t('timestamp_error', [e.message])
            }
            return result;
        }
    },
    methods: {
        currentTime(type) {
            if (type === "normalSecond") {
                this.current.input = moment().format('YYYY-MM-DD HH:mm:ss')
            } else if (type === "normalMillisecond") {
                this.current.input = moment().format('YYYY-MM-DD HH:mm:ss.SSS')
            } else if (type === "unixSecond") {
                this.current.input = moment().format('X')
            } else {
                this.current.input = moment().format('x')
            }
        },
    },
    data() {
        return {
            current: {
                input: moment().format('YYYY-MM-DD HH:mm:ss')
            },
            timer: null,
            timestamp: 0,
            exampleColumns: [
                {
                    title: this.$t('timestamp_format'),
                    key: 'format',
                    width: 200
                },
                {
                    title: this.$t('timestamp_value'),
                    slot: '_value',
                }
            ]
        }
    },
}
</script>
<style>
.tool-timestamp-page {
    display: flex;
    display: -webkit-flex;
    align-items: center;
    justify-content: center;
}

.tool-timestamp-block {
    width: 600px;
}
</style>
