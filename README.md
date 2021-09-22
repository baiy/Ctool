# 程序开发常用工具

使用过程中的任何问题或者需要新的工具欢迎提交`Issue`,新工具如果可以提供实现代码就完美了O(∩_∩)O

## 先睹为快

![](https://cdn.jsdelivr.net/gh/baiy/Ctool@master/images/v2_1.png)

## 在线使用

<https://baiy.github.io/Ctool/>

## chrome 安装

- 方法1: 在 [Chrome 应用商店](https://chrome.google.com/webstore/detail/ipfcebkfhpkjeikaammlkcnalknjahmh) 安装
- 方法2: [下载 .crx 安装包](https://github.com/baiy/Ctool/releases/latest)
- 方法3: [百度网盘下载](https://pan.baidu.com/s/1mhWbqWC) 安装方法和方法2一致

> 方法2 / 方法3 不定期维护 仅供网络环境特别恶劣的同学使用
>
> [猛戳这里查看手动安装`.crx`教程](http://www.cnplugins.com/tool/outline-install-crx-file.html)

## 微软 Edge 安装

- 在 [微软 Edge 应用商店](https://microsoftedge.microsoft.com/addons/detail/cihekagpnnadjjplgljkmkpcfiopfplc) 安装

## 火狐 Firefox 安装

- 在 [火狐 Firefox 应用商店](https://addons.mozilla.org/zh-CN/firefox/addon/ctool/) 安装

## utools 安装

### 插件中心安装

> 插件中心搜索 `ctool`

## 开发

```
# 安装依赖
npm install
# 调试
npm run serve -adapter=[chrome|edge|utools|firefox|web]
# 编译 
npm run build -adapter=[chrome|edge|utools|firefox|web]
// 编译输出目录: `/dist/`
```

## 功能列表

|功能|说明|离线使用|
|---|---|---|
|哈希|`md5`, `sha1`, `sha256`, `sha512`,`sm3`|√|
|加密/解密|`AES`,`DES`,`RC4`,`Rabbit`,`TripleDes`,`sm2`|√|
|BASE64编码|`加密`,`解密`,`支持文件`|√|
|URL编码|`编码`,`解码`|√|
|时间戳|双向转换|√|
|二维码|`生成`,`解析`|√|
|汉字转拼音|`声调`,`首字母`,`分隔符`|√|
|IP地址查询|`运营商`,`城市`|×|
|代码格式化|`js`, `html`, `css`, `xml`, `sql`, `压缩`|√|
|Unicode|`双向转换`,`emoji`,`html 实体`,`css 实体`|√|
|进制转换|2-64进制互转|√|
|正则表达式|字符匹配|√|
|随机字符生成器|`批量`,`特殊字符`|√|
|序列化转换|`json`, `xml`, `yaml`, `phpArray`, `phpSerialize`, `properties`|√|
|文本差异化对比|`行`,`单词`,`css`|√|
|crontab校验|`Crontab`,`规则`,`校验`,`例子`|√|
|websocket调试|`websocket`,`在线调试`|×|
|单位换算|`长度`,`面积`,`体积`,`质量`,`温度`,`压力`,`功率`,`功`,`密度`,`力`,`时间`,`速度`,`数据存储`,`角度`|√|
|时间计算器| - |√|
|JSON工具|`格式化`,`校验`,`压缩`,`转义`,`去除转义`,`Unicode转中文`,`中文转Unicode`,`转GET参数`|√|
|UUID|在线生成uuid|√|
|JSON转实体类|`Java`, `C#`, `Go`, `Dart`|√|
|ascii编码转换|`十进制`, `十六进制`, `八进制`, `二进制`, `字符串`|√|
|变量名格式转换|`Var Name`, `var-name`, `VAR_NAME`, `VarName`, `varName`, `var_name`, `var name`|√|
|jwt解码|`header`, `payload`|√|
|Hex/String转换|`hex to string`, `string to hex`, `十六进制转字符串`, `字符串转十六进制`|√|
|文本处理|`大小写转换`, `中英文标点转换`, `简繁转换`, `替换`, `字符统计`, `行去重`, `添加行号`, `行排序`, `过滤行首尾不可见字符`,`过滤空行`|√|

## 第三方开源库

项目诞生离不开这些优秀的开源程序

- [code-formatter](https://www.npmjs.com/package/code-formatter)
- [crypto-js](https://www.npmjs.com/package/crypto-js)
- [ipinyinjs](https://www.npmjs.com/package/ipinyinjs)
- [is-url](https://www.npmjs.com/package/is-url)
- [iview](https://www.npmjs.com/package/iview)
- [js-base64](https://www.npmjs.com/package/js-base64)
- [lscache](https://www.npmjs.com/package/lscache)
- [php-array-reader](https://www.npmjs.com/package/php-array-reader)
- [phparr](https://www.npmjs.com/package/phparr)
- [qrcode](https://www.npmjs.com/package/qrcode)
- [qrcode-parser](https://www.npmjs.com/package/qrcode-parser)
- [radix.js](https://www.npmjs.com/package/radix.js)
- [serialize-php](https://www.npmjs.com/package/serialize-php)
- [diff](https://www.npmjs.com/package/diff)
- [vue](https://www.npmjs.com/package/vue)
- [vue-router](https://www.npmjs.com/package/vue-router)
- [taobao](http://ip.taobao.com/)
- [layui](https://github.com/sentsin/layui/)
- [jquery](https://github.com/jquery/jquery)
- [js-base64](https://github.com/dankogai/js-base64)
- [jquery.format](https://github.com/zachofalltrades/jquery.format)
- [pinyinjs](https://github.com/sxei/pinyinjs)
- [jsqrcode-production](https://github.com/aray894/jsqrcode-production)
- [qrcodejs](https://github.com/davidshimjs/qrcodejs)
- [pconline](http://whois.pconline.com.cn/)
- [moment](https://momentjs.com/)
- [vue-codemirror](https://www.npmjs.com/package/vue-codemirror)
- [sm-crypto](https://github.com/JuneAndGreen/sm-crypto)
- [camelcaseplugin](https://github.com/netnexus/camelcaseplugin)
- [jwt-decode](https://www.npmjs.com/package/jwt-decode)
- [jian_fan](https://www.npmjs.com/package/jian_fan)
- [axios](https://www.npmjs.com/package/axios)

> 当然项目中还使用很多不知道姓名的大神的代码, 在这里就不一一感谢
