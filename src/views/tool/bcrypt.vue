<template>
    <Tabs v-model="current.operation">
        <TabPane :label="$t('bcrypt_generate')" name="generate">
            <Input size="large" v-model="current.generate.password">
                <span slot="prepend">{{ $t('bcrypt_password') }}</span>
            </Input>
            <Input size="large" v-model="current.generate.rounds" style="margin-top: 10px">
                <span slot="prepend">{{ $t('bcrypt_rounds') }}</span>
            </Input>
            <Button :disabled="inOperation" long size="large" type="primary" @click="generate" style="margin: 10px 0">
                {{ $t('bcrypt_generate_submit') }}
            </Button>
            <input-block right="8px" top="8px">
                <Input size="large" :value="generateError ? generateError : current.generate.hash">
                    <span slot="prepend">{{ $t('bcrypt_hash_password') }}</span>
                </Input>
                <template slot="extra">
                    <Icon style="cursor:pointer" size="24" v-if="!generateError" type="md-copy"
                          @click="$copy(current.generate.hash)"/>
                </template>
            </input-block>
        </TabPane>
        <TabPane :label="$t('bcrypt_check')" name="check">
            <Input size="large" v-model="current.check.password" style="margin-bottom: 10px">
                <span slot="prepend">{{ $t('bcrypt_password') }}</span>
            </Input>
            <Input size="large" v-model="current.check.hash">
                <span slot="prepend">{{ $t('bcrypt_hash_password') }}</span>
            </Input>
            <Button :disabled="inOperation" long size="large" type="primary" @click="check" style="margin: 10px 0">{{
                    $t('bcrypt_check_submit')
                }}
            </Button>
            <div style="margin-top: 20px;text-align: center">
                <Tag v-if="this.current.check.result !== ''"
                     :color="this.current.check.result === true ? 'success' : 'error'">
                    <template v-if="this.current.check.result === true">
                        {{ $t('bcrypt_check_result_success') }}
                    </template>
                    <template v-else>
                        {{ $t('bcrypt_check_result_error') }}
                    </template>
                </Tag>
            </div>
        </TabPane>
    </Tabs>
</template>
<script>
import bcrypt from "bcryptjs";

export default {
    created() {
        this.$initToolData()
    },
    methods: {
        check() {
            this.current.check.result = "";
            if (!this.current.check.password || !this.current.check.hash) {
                return;
            }
            this.inOperation = true
            setTimeout(() => {
                bcrypt.compare(this.current.check.password, this.current.check.hash, (err, res) => {
                    this.current.check.result = !!res
                    this.inOperation = false
                    this.saveToolData();
                });
            }, 300)
        },
        generate() {
            this.generateError = "";
            if (!this.current.generate.password || !this.current.generate.rounds) {
                return;
            }
            this.inOperation = true
            setTimeout(() => {
                try {
                    const rounds = parseInt(this.current.generate.rounds)
                    if (rounds < 4 || rounds > 30) {
                        throw new Error(this.$t('bcrypt_rounds_range', [4, 30]).toString())
                    }
                    bcrypt.hash(this.current.generate.password, rounds, (err, hash) => {
                        if (err) {
                            this.generateError = err.message
                            return;
                        }
                        this.current.generate.hash = hash
                        this.saveToolData();
                        this.inOperation = false
                    });
                } catch (e) {
                    this.generateError = e.message
                    this.inOperation = false
                }
            }, 300)
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
                    rounds: '10',
                    hash: '',
                },
                check: {
                    hash: '',
                    password: '',
                    result: "",
                },
                operation: 'generate',
            },
            inOperation: false,
            generateError: "",
        }
    },
}
</script>
