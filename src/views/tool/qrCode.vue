<template>
    <div>
        <Tabs v-model="current.operation">
            <TabPane :label="$t('qrCode_generate_title')" name="generate">
                <Row :gutter="16">
                    <Col span="14">
                        <Input v-model="current.generateInput" :rows="14" type="textarea" :placeholder="$t('qrCode_generate_input')"></Input>
                    </Col>
                    <Col span="10" style="text-align: center;">
                        <img v-if="generateOutput" @click="()=>$clipboardCopyImages(generateOutput)" style="width:300px;cursor:pointer" :src="generateOutput" />
                    </Col>
                </Row>
            </TabPane>
            <TabPane :label="$t('qrCode_reader_title')" name="reader">
                <Row :gutter="16">
                    <Col span="14">
                        <input-block style="margin-bottom: 10px" bottom="0px" right="10px">
                            <pasteClipboardFlie @on-paste-image="handleUpload">
                                <Input v-model="current.readerInput" :rows="3" type="textarea" :placeholder="$t('qrCode_reader_input')"></Input>
                            </pasteClipboardFlie>
                            <Upload slot="extra" action="#" :before-upload="handleUpload">
                                <Button size="small" type="primary" icon="ios-cloud-upload-outline">{{ $t('qrCode_reader_upload') }}</Button>
                            </Upload>
                        </input-block>
                        <Input v-model="readerOutput" :rows="8" type="textarea" :placeholder="$t('qrCode_reader_output')"></Input>
                    </Col>
                    <Col span="10" style="text-align: center" v-html="readerInputImg" />
                </Row>
            </TabPane>
        </Tabs>

    </div>
</template>
<script>
import generator from 'qrcode'
import qrcodeParser from 'qrcode-parser'
import model from '../../tool/model'
import Jimp from 'jimp';
import pasteClipboardFlie from './components/pasteClipboardFlie';

export default {
    components: {
        pasteClipboardFlie,
    },
    computed: {
        readerInputImg() {
            if (this.current.readerInput) {
                return `<img style="width:300px" src="${this.current.readerInput}" />`
            }
            return ''
        }
    },
    watch: {
        "current.generateInput"() {
            this.generate()
        },
        "current.readerInput"() {
            this.reader()
        }
    },
    created() {
        let feature = model.getToolCurrentFeature('generate')
        if (feature === 'generate') {
            this.current.operation = feature;
            this.$initToolData('generateInput')
        } else if (feature === 'reader') {
            this.current.operation = feature;
            this.$initToolData('readerInput')
        } else {
            this.$initToolData()
        }
    },
    methods: {
        generate() {
            if (!this.current.generateInput) {
                this.generateOutput = "";
                return;
            }
            generator.toDataURL(this.current.generateInput, (error, url) => {
                if (error) {
                    this.generateOutput = this.$t("qrCode_generate_error", [error]);
                    return;
                }
                this.generateOutput = url

                this.$saveToolData(this.current)
            })
        },
        reader() {
            if (!this.current.readerInput) {
                this.readerOutput = "";
                return
            }
            this.getReaderImagePngBase64(this.current.readerInput).then((result) => {
                this.readerOutput = result
                this.$saveToolData(this.current)
            }).catch(e => {
                this.readerOutput = this.$t('qrCode_reader_error', [e.message])
            })
        },
        getReaderImagePngBase64(input) {
            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open('GET', input);
                xhr.responseType = 'blob';
                xhr.onload = () => {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        let blob = xhr.response;
                        const myReader = new FileReader();
                        myReader.readAsArrayBuffer(blob);
                        myReader.addEventListener('loadend', e => {
                            const buffer = e.target.result;
                            try {
                                Jimp.read(buffer, (err, image) => {
                                    if (err) {
                                        return reject(err);
                                    }
                                    image.getBase64Async("image/png").then((img) => {
                                        return qrcodeParser(img)
                                    }).then((c) => {
                                        resolve(c.data)
                                    }).catch((e) => {
                                        reject(e);
                                    })
                                });
                            } catch (e) {
                                reject(e);
                            }
                        });
                    } else {
                        reject(new Error(this.$t('qrCode_reader_parsing_failure').toString()));
                    }
                };
                xhr.onerror = () => reject(new Error(this.$t('qrCode_reader_parsing_failure').toString()));
                xhr.send();
            })
        },
        handleUpload(file) {
            if (this.current.operation !== "reader"){
                return;
            }
            let r = new FileReader()
            r.readAsDataURL(file)
            r.onloadend = () => {
                this.current.readerInput = r.result
            }
            return false
        }
    },
    data() {
        return {
            readerOutput: "",
            generateOutput: "",
            current: {
                generateInput: '',
                readerInput: '',
                operation: 'generate',
            },
        }
    },
}
</script>
