# 程序开发常用工具

使用过程中的任何问题或者需要新的工具欢迎提交`Issue`,新工具如果可以提供实现代码就完美了O(∩_∩)O

## 先睹为快

![](https://cdn.jsdelivr.net/gh/baiy/Ctool@master/images/v2.0.0.png)

## 安装使用

### 在线使用

<https://ctool.dev>

### Chrome 安装

- 在 [Chrome 应用商店](https://chrome.google.com/webstore/detail/ipfcebkfhpkjeikaammlkcnalknjahmh) 安装

### 微软 Edge 安装

- 在 [微软 Edge 应用商店](https://microsoftedge.microsoft.com/addons/detail/cihekagpnnadjjplgljkmkpcfiopfplc) 安装

### 火狐 Firefox 安装

- 在 [火狐 Firefox 应用商店](https://addons.mozilla.org/zh-CN/firefox/addon/ctool/) 安装

### Utools 安装

- [utools](https://u.tools/) 插件中心 搜索 `ctool`

### Windows 客户端安装

- 在 [Microsoft 应用商店](https://www.microsoft.com/store/apps/9P63J98XZ0M1) 安装

### 其他桌面客户端安装

- [点击下载](https://github.com/baiy/Ctool/releases)

### aur

```
paru -S ctool-bin
```

## 开发

```
# 安装依赖
pnpm install

# 开发调试
pnpm run dev

# 编译核心文件
pnpm run build

## 打包适配发布平台
// 所有平台
pnpm run release
// chrome
pnpm --filter ctool-adapter-chrome run platform-release
// edge
pnpm --filter ctool-adapter-edge run platform-release
// electron
pnpm --filter ctool-adapter-electron run platform-release
// tauri 无法交叉编译, 请在对应操作系统下运行
pnpm --filter ctool-adapter-tauri run platform-release
// firefox
pnpm --filter ctool-adapter-firefox run platform-release
// utools
pnpm --filter ctool-adapter-utools run platform-release
// web
pnpm --filter ctool-adapter-web run platform-release
```

> 打包适配平台文件存放位置: /_release

## 功能列表

|功能|说明|离线使用 |
|--------------|-------------------------------------------------------------------------------------------------------------------------------|------|
|哈希|`md5`, `sha1`, `sha256`, `sha512`,`sm3`,`批量处理`,`支持文件` |√|
|加密/解密|`AES`,`DES`,`RC4`,`Rabbit`,`TripleDes`,`sm2`,`sm4`|√|
|BASE64编码 |`加密`,`解密`,`支持文件`|√|
|URL编码|`编码`,`解码` |√|
|时间|`时间戳双向转换`,`毫秒` ,`时区`,`时间计算器`|√|
|二维码|`生成`,`解析` |√|
|条形码|`生成` |√|
|汉字转拼音|`声调`,`首字母`,`分隔符`|√|
|IP地址查询 |`运营商`,`城市`|×|
|代码格式化|`js`, `ts`, `html`, `css`, `less`, `scss`, `graphql`, `vue`, `angular`, `markdown`, `json5`, `xml`, `yaml`, `sql`, `压缩` |√|
|Unicode|`双向转换`,`emoji`,`html 实体`,`css 实体` |√|
|进制转换 |`2-64进制`|√|
|正则表达式|`匹配`,`查找`,`替换`  |√|
|随机字符生成器|`批量`,`特殊字符` |√|
|序列化转换|`json`, `xml`, `yaml`, `phpArray`, `phpSerialize`, `properties`|√|
|文本差异化对比|`行`,`单词`,`css`  |√|
|crontab校验|`Crontab`,`规则`,`校验`,`例子`   |√|
|websocket调试  |`websocket`,`在线调试` |×|
|单位换算 |`长度`,`面积`,`体积`,`质量`,`温度`,`压力`,`功率`,`功`,`密度`,`力`,`时间`,`速度`,`数据存储`,`角度`  |√|
|时间计算器|-|√|
|JSON工具 |`格式化`,`校验`,`压缩`,`转义`,`去除转义`,`Unicode转中文`,`中文转Unicode`,`转GET参数`,`Java`, `C#`, `Go`, `Dart`,`csv`,`table`,`Protobuf`,`jsonpath` |√|
|UUID |`在线生成uuid`|√|
|ascii编码转换|`十进制`, `十六进制`, `八进制`, `二进制`, `字符串`|√|
|变量名格式转换|`Var Name`, `var-name`, `VAR_NAME`, `VarName`, `varName`, `var_name`, `var name`  |√|
|jwt解码|`header`, `payload`|√|
|Hex/String转换 |`hex to string`, `string to hex`, `十六进制转字符串`, `字符串转十六进制`|√|
|Hex/Base64转换 |`hex to Base64`, `Base64 to hex`|√|
|文本处理 |`大小写转换`, `中英文标点转换`, `简繁转换`, `替换`, `字符统计`, `行去重`, `添加行号`, `行排序`, `过滤行首尾不可见字符`,`过滤空行`|√|
|html编码 |-|√|
|原码/反码/补码 |`生成` |√|
|ARM/HEX|`互转` |×|
|Bcrypt |`加密`,`验证` |√|
|IP网络计算器|`子网掩码各个进制表示换算,IP地址进制表示换算`  |√|
|SQL参数填充|`Mybatis打印SQL的参数填充`|√|
