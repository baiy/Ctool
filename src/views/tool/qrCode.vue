<template>
    <div>
        <Tabs v-model="current.operation">
            <TabPane label="二维码生成" name="generate">
                <Row :gutter="16">
                    <Col span="12">
                        <Input v-model="current.generateInput" :rows="14" type="textarea" placeholder="内容"></Input>
                        <option-block>
                            <FormItem>
                                <Button type="primary" @click="generate()">生成</Button>
                            </FormItem>
                            <FormItem>
                                <Checkbox v-model="current.generateIsShort">生成短连接</Checkbox>
                            </FormItem>
                            <FormItem v-if="current.generateIsShort">
                                <Alert>短链接API由 t.cn 提供</Alert>
                            </FormItem>
                        </option-block>
                    </Col>
                    <Col span="12">
                        <div style="text-align: center" v-html="current.generateOutput"></div>
                        <p style="text-align: center" v-if="current.generateIsShort && current.generateShortUrl">短连接:{{current.generateShortUrl}}</p>
                    </Col>
                </Row>
            </TabPane>
            <TabPane label="二维码解析" name="reader">
                <Row :gutter="16">
                    <Col span="12">
                        <Input v-model="current.readerInput" :rows="5" type="textarea" placeholder="请输入二维码图片地址或点击下方按钮上传图片"></Input>
                        <option-block>
                            <FormItem>
                                <Button type="primary" @click="reader()">解析</Button>
                            </FormItem>
                            <FormItem>
                                <Upload action="#" :before-upload="handleUpload">
                                    <Button icon="ios-cloud-upload-outline">上传图片</Button>
                                </Upload>
                            </FormItem>
                        </option-block>
                        <Input v-model="current.readerOutput" :rows="5" type="textarea" placeholder="解析结果"></Input>
                    </Col>
                    <Col span="12" style="text-align: center" v-html="readerInputImg"></Col>
                </Row>
            </TabPane>
        </Tabs>
    </div>
</template>
<script>
    import generator from "qrcode"
    import qrcodeParser from "qrcode-parser"
    import request from "ajax-request"
    import isUrl from "is-url"

    export default {
        computed: {
            readerInputImg(){
                if (this.current.readerInput){
                    return `<img style="width:300px" src="${this.current.readerInput}" />`;
                }
                return "";
            }
        },
        created() {
            this.current = Object.assign(this.current,this.$getToolData())
        },
        methods: {
            generate(){
                if (!this.current.generateInput) return;
                if (this.current.generateIsShort){
                    if (!isUrl(this.current.generateInput)) {
                        return this.$Message.error("生成短连接的内容是url");
                    }
                    request({
                        url:"http://api.t.sina.com.cn/short_url/shorten.json",
                        data:{"source": "2815391962", "url_long": this.current.generateInput},
                    },(err, res, result)=>{
                        if (err) return this.$Message.error("二维码短连接生成错误:"+err);
                        result = JSON.parse(result);
                        if(!result[0]['url_short']){
                            return this.$Message.error("短连接生成错误");
                        }
                        else {
                            this.current.generateShortUrl = result[0]['url_short'];
                            this.generateHandle(this.current.generateShortUrl)
                        }
                    })
                }
                else{
                    this.current.generateShortUrl = "";
                    this.generateHandle(this.current.generateInput)
                }
                this.$saveToolData(this.current);
            },
            reader(){
                if (!this.current.readerInput){
                    return;
                }
                qrcodeParser(this.current.readerInput).then((c)=>{
                    this.current.readerOutput = c.data;
                    this.$saveToolData(this.current);
                    this.$Message.success("解析成功");
                }).catch(()=>{
                    return this.$Message.error("图片解析错误");
                });
            },
            generateHandle(str){
                generator.toDataURL(str, (error,url) => {
                    if (error) return this.$Message.error("二维码生成错误:"+error);
                    this.$Message.success("生成成功");
                    this.current.generateOutput = `<img style="width:300px" src="${url}" />`;
                })
            },
            handleUpload(file){
                let r = new FileReader();
                r.readAsDataURL(file);
                r.onloadend =  () => {
                    this.current.readerInput = r.result
                    this.reader()
                };
                return false;
            }
        },
        data() {
            return {
                current:{
                    generateInput: "",
                    generateOutput: "",
                    generateIsShort: false,
                    generateShortUrl: "",
                    readerInput: "",
                    readerOutput: "",
                    operation:"generate"
                }
            }
        },
    }
</script>