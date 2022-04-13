<template>
    <Tabs v-model="current.operation">
        <TabPane :label="$t('bcrypt_generate')" name="generate">
            <div class="tool-bcrypt-generate-top" style="margin-bottom: 10px">
                <input-block bottom="8px" right="8px" style="margin-bottom: 10px">
                    <Input v-model="current.generate.password">
                        <span slot="prepend"></span>
                    </Input>
                    <template slot="extra">
                        {{ $t('bcrypt_password') }}
                    </template>
                </input-block>
                <input-block bottom="8px" right="8px" style="margin-bottom: 10px">
                    <Input v-model="current.generate.rounds">
                        <span slot="prepend"></span>
                    </Input>
                    <template slot="extra">
                        {{ $t('bcrypt_rounds') }}
                    </template>
                </input-block>
                <Button long type="primary" @click="generate">{{ $t('bcrypt_generate') }}</Button>
            </div>
            <heightResize :append="['.tool-bcrypt-generate-top']" :reduce="52" ignore>
                <autoHeightTextarea :value="generateError ? generateError : current.generate.hash"
                                    :placeholder="$t('bcrypt_result')"/>
            </heightResize>
        </TabPane>
        <TabPane :label="$t('bcrypt_check')" name="check">
            <div class="tool-bcrypt-check-top">
                <input-block bottom="8px" right="8px" style="margin-bottom: 10px">
                    <Input v-model="current.check.password">
                        <span slot="prepend"></span>
                    </Input>
                    <template slot="extra">
                        {{ $t('bcrypt_password') }}
                    </template>
                </input-block>
            </div>
            <heightResize :append="['.tool-bcrypt-check-top']" :reduce="52" ignore>
                <input-block bottom="8px" right="8px">
                    <autoHeightTextarea :value="current.check.hash" :placeholder="$t('bcrypt_hash_password')"/>
                    <template slot="extra">
                        <Tag v-if="checkResult !== 0" :color="checkResult ===1 ? 'success' : 'error'">
                            <template v-if="checkResult ===1">
                                {{ $t('check_result_success') }}
                            </template>
                            <template v-if="checkResult ===-1">
                                {{ $t('check_result_error') }}
                            </template>
                        </Tag>
                    </template>
                </input-block>
            </heightResize>
        </TabPane>
    </Tabs>
</template>
<script>
import heightResize from "./components/heightResize";
import bcrypt from "bcryptjs";
import autoHeightTextarea from "./components/autoHeightTextarea";

export default {
    components: {
        heightResize,
        autoHeightTextarea
    },
    created() {
        this.$initToolData()
    },
    computed: {
        checkResult() {
            if (!this.current.password || !this.current.hash) {
                return 0;
            }
            return bcrypt.compareSync(this.current.password, this.current.hash) ? 1 : -1
        },
        check() {
            return this.current.check
        }
    },
    watch: {
        check: {
            handler() {
                this.saveToolData()
            },
            deep: true
        }
    },
    methods: {
        generate() {
            if (this.current.generate.password || !this.current.generate.rounds) {
                return;
            }
            this.current.generate.hash = bcrypt.hashSync(this.current.generate.password, this.current.generate.rounds)
            this.saveToolData();
        },
        saveToolData() {
            this.$saveToolData(this.current)
        }
    },
    data() {
        return {
            current: {
                generate: {
                    password: '',
                    rounds: '',
                    hash: '',
                },
                check: {
                    hash: '',
                    password: '',
                },
                operation: 'generate',
            },
            generateError: ""
        }
    },
}
</script>
