// 进制转换
layui.define(['chromeTool', 'jquery', 'chromeToolBase','form'], function (exports) {
    var $ = layui.$;

    function zhengze(x) {
        var str;
        x = parseInt(x);
        if (x <= 10) {
            str = new RegExp("^[+\\-]?[0-" + (x - 1) + "]*[.]?[0-" + (x - 1) + "]*$", "gi");
        } else {
            var letter = "";
            switch (x) {
                case 11:
                    letter = "a";
                    break;
                case 12:
                    letter = "b";
                    break;
                case 13:
                    letter = "c";
                    break;
                case 14:
                    letter = "d";
                    break;
                case 15:
                    letter = "e";
                    break;
                case 16:
                    letter = "f";
                    break;
                case 17:
                    letter = "g";
                    break;
                case 18:
                    letter = "h";
                    break;
                case 19:
                    letter = "i";
                    break;
                case 20:
                    letter = "j";
                    break;
                case 21:
                    letter = "k";
                    break;
                case 22:
                    letter = "l";
                    break;
                case 23:
                    letter = "m";
                    break;
                case 24:
                    letter = "n";
                    break;
                case 25:
                    letter = "o";
                    break;
                case 26:
                    letter = "p";
                    break;
                case 27:
                    letter = "q";
                    break;
                case 28:
                    letter = "r";
                    break;
                case 29:
                    letter = "s";
                    break;
                case 30:
                    letter = "t";
                    break;
                case 31:
                    letter = "u";
                    break;
                case 32:
                    letter = "v";
                    break;
                case 33:
                    letter = "w";
                    break;
                case 34:
                    letter = "x";
                    break;
                case 35:
                    letter = "y";
                    break;
                case 36:
                    letter = "z";
                    break;
            }
            str = new RegExp("^[+\\-]?[0-9a-" + letter + "]*[.]?[0-9a-" + letter + "]*$", "gi");
        }
        return str;
    }

    function hexconvert(num, input_hex, output_hex) {
        if (num == '') return '';
        if (output_hex > 32 || output_hex < 2 || input_hex > 32 || input_hex < 2) return '';
        num = num.match(zhengze(input_hex));
        if (!num) {
            return '';
        }
        if (num[0].indexOf(".") == -1) {
            return parseInt(num, input_hex).toString(output_hex);
        } else {
            return px1 = pxparseFloat(num, input_hex).toString(output_hex);
        }
    }

    var chrome_tool_hexconvert = function (tool_id) {
        var tool = new layui.chromeToolBase(tool_id);
        tool.getPageData = function (key) {
            return tool.pageData().get(key,function(){
                return {
                    "input_hex":10,
                    "output_hex_1":2,
                    "output_hex_2":8,
                    "output_hex_3":10,
                    "output_hex_4":16,
                    "output_hex_5":32
                };
            });
        };
        tool.loadComplete = function () {
            var block = $("#" + this.getBlockId());
            var func = function(){
                var data = {
                    "input_content": block.find(".input_content").val(),
                    "input_hex": block.find(".input_hex").val()
                };
                for(var i = 1;i < 6;i++)
                {
                    data['output_hex_'+i] = $("#output_hex_"+i).val();
                    data['output_content_'+i] = hexconvert(data.input_content,data.input_hex,data['output_hex_'+i]);
                    $("#output_content_"+i).val(data['output_content_'+i]);

                }
                tool.pageData().set(data);
            };
            block.find(".input_content").on('input propertychange', function () {
                func();
            });
            for(var i = 0;i < 6;i++)
            {
                layui.form.on('select(hex_'+i+')', function(){
                    func();
                });
            }

        };
        return tool;
    };
    exports('chrome_tool_hexconvert', chrome_tool_hexconvert);
});