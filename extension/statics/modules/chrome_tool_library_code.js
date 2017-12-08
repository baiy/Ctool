/**
 * 格式化算法
 * 来源:https://github.com/zachofalltrades/jquery.format
 */
layui.define(['jquery'],function (exports) {
    var $ = layui.$;
    (function( $ ) {

        /**
         * utility function called from constructor of Formatter
         */
        function createShiftArr(step) {
            var space = '    ';
            if ( isNaN(parseInt(step)) ) {  // argument is string
                space = step;
            } else { // argument is integer
                space = new Array(step + 1).join(' '); //space is result of join (a string), not an array
            }
            var shift = ['\n']; // array of shifts
            for(var ix=0;ix<100;ix++){
                shift.push(shift[ix]+space);
            }
            return shift;
        };

        /**
         *
         */
        function isSubquery(str, parenthesisLevel) {
            return  parenthesisLevel - (str.replace(/\(/g,'').length - str.replace(/\)/g,'').length );
        };

        /**
         *
         */
        function split_sql(str, tab) {
            return str.replace(/\s{1,}/g," ")
                .replace(/ AND /ig,"~::~"+tab+tab+"AND ")
                .replace(/ BETWEEN /ig,"~::~"+tab+"BETWEEN ")
                .replace(/ CASE /ig,"~::~"+tab+"CASE ")
                .replace(/ ELSE /ig,"~::~"+tab+"ELSE ")
                .replace(/ END /ig,"~::~"+tab+"END ")
                .replace(/ FROM /ig,"~::~FROM ")
                .replace(/ GROUP\s{1,}BY/ig,"~::~GROUP BY ")
                .replace(/ HAVING /ig,"~::~HAVING ")
                //.replace(/ SET /ig," SET~::~")
                .replace(/ IN /ig," IN ")
                .replace(/ JOIN /ig,"~::~JOIN ")
                .replace(/ CROSS~::~{1,}JOIN /ig,"~::~CROSS JOIN ")
                .replace(/ INNER~::~{1,}JOIN /ig,"~::~INNER JOIN ")
                .replace(/ LEFT~::~{1,}JOIN /ig,"~::~LEFT JOIN ")
                .replace(/ RIGHT~::~{1,}JOIN /ig,"~::~RIGHT JOIN ")
                .replace(/ ON /ig,"~::~"+tab+"ON ")
                .replace(/ OR /ig,"~::~"+tab+tab+"OR ")
                .replace(/ ORDER\s{1,}BY/ig,"~::~ORDER BY ")
                .replace(/ OVER /ig,"~::~"+tab+"OVER ")
                .replace(/\(\s{0,}SELECT /ig,"~::~(SELECT ")
                .replace(/\)\s{0,}SELECT /ig,")~::~SELECT ")
                .replace(/ THEN /ig," THEN~::~"+tab+"")
                .replace(/ UNION /ig,"~::~UNION~::~")
                .replace(/ USING /ig,"~::~USING ")
                .replace(/ WHEN /ig,"~::~"+tab+"WHEN ")
                .replace(/ WHERE /ig,"~::~WHERE ")
                .replace(/ WITH /ig,"~::~WITH ")
                //.replace(/\,\s{0,}\(/ig,",~::~( ")
                //.replace(/\,/ig,",~::~"+tab+tab+"")
                .replace(/ ALL /ig," ALL ")
                .replace(/ AS /ig," AS ")
                .replace(/ ASC /ig," ASC ")
                .replace(/ DESC /ig," DESC ")
                .replace(/ DISTINCT /ig," DISTINCT ")
                .replace(/ EXISTS /ig," EXISTS ")
                .replace(/ NOT /ig," NOT ")
                .replace(/ NULL /ig," NULL ")
                .replace(/ LIKE /ig," LIKE ")
                .replace(/\s{0,}SELECT /ig,"SELECT ")
                .replace(/\s{0,}UPDATE /ig,"UPDATE ")
                .replace(/ SET /ig," SET ")
                .replace(/~::~{1,}/g,"~::~")
                .split('~::~');
        };


        var Formatter = function (options) {
            this.init(options);
            //TODO - if options object maps any functions, add them as appropriately named methods
            var methodName = this.options.method;
            if (!$.isFunction(this[methodName])) {
                $.error("'" + methodName + "' is not a Formatter method.");
            };
            this.format = function(text) { //alias to currently selected method
                return this[this.options.method].call(this, text);
            };
        };


        /**
         * putting the methods into the prototype instead of the constructor method
         * enables more efficient on-the-fly creation of Formatter instances
         */
        Formatter.prototype = {
            options: {},

            init: function(options) {
                this.options = $.extend({}, $.fn.format.defaults, options);
                this.step = this.options.step;
                this.preserveComments = this.options.preserveComments;
                this.shift = createShiftArr(this.step);
            },

            xml: function(text) {
                var ar = text.replace(/>\s{0,}</g,"><")
                        .replace(/</g,"~::~<")
                        .replace(/\s*xmlns\:/g,"~::~xmlns:")
                        .replace(/\s*xmlns\=/g,"~::~xmlns=")
                        .split('~::~'),
                    len = ar.length,
                    inComment = false,
                    deep = 0,
                    str = '',
                    ix = 0;

                for(ix=0;ix<len;ix++) {
                    // start comment or <![CDATA[...]]> or <!DOCTYPE //
                    if(ar[ix].search(/<!/) > -1) {
                        str += this.shift[deep]+ar[ix];
                        inComment = true;
                        // end comment  or <![CDATA[...]]> //
                        if(ar[ix].search(/-->/) > -1 || ar[ix].search(/\]>/) > -1 || ar[ix].search(/!DOCTYPE/) > -1 ) {
                            inComment = false;
                        }
                    } else
                    // end comment  or <![CDATA[...]]> //
                    if(ar[ix].search(/-->/) > -1 || ar[ix].search(/\]>/) > -1) {
                        str += ar[ix];
                        inComment = false;
                    } else
                    // <elm></elm> //
                    if( /^<\w/.exec(ar[ix-1]) && /^<\/\w/.exec(ar[ix]) &&
                        /^<[\w:\-\.\,]+/.exec(ar[ix-1]) == /^<\/[\w:\-\.\,]+/.exec(ar[ix])[0].replace('/','')) {
                        str += ar[ix];
                        if(!inComment) deep--;
                    } else
                    // <elm> //
                    if(ar[ix].search(/<\w/) > -1 && ar[ix].search(/<\//) == -1 && ar[ix].search(/\/>/) == -1 ) {
                        str = !inComment ? str += this.shift[deep++]+ar[ix] : str += ar[ix];
                    } else
                    // <elm>...</elm> //
                    if(ar[ix].search(/<\w/) > -1 && ar[ix].search(/<\//) > -1) {
                        str = !inComment ? str += this.shift[deep]+ar[ix] : str += ar[ix];
                    } else
                    // </elm> //
                    if(ar[ix].search(/<\//) > -1) {
                        str = !inComment ? str += this.shift[--deep]+ar[ix] : str += ar[ix];
                    } else
                    // <elm/> //
                    if(ar[ix].search(/\/>/) > -1 ) {
                        str = !inComment ? str += this.shift[deep]+ar[ix] : str += ar[ix];
                    } else
                    // <? xml ... ?> //
                    if(ar[ix].search(/<\?/) > -1) {
                        str += this.shift[deep]+ar[ix];
                    } else
                    // xmlns //
                    if( ar[ix].search(/xmlns\:/) > -1  || ar[ix].search(/xmlns\=/) > -1) {
                        str += this.shift[deep]+ar[ix];
                    }

                    else {
                        str += ar[ix];
                    }
                }

                return  (str[0] == '\n') ? str.slice(1) : str;
            },

            xmlmin: function(text) {
                var str = this.preserveComments ? text
                    : text.replace(/\<![ \r\n\t]*(--([^\-]|[\r\n]|-[^\-])*--[ \r\n\t]*)\>/g,"")
                        .replace(/[ \r\n\t]{1,}xmlns/g, ' xmlns');
                return  str.replace(/>\s{0,}</g,"><");
            },
            json: function(text) {
                if ( typeof JSON === 'undefined' ) return text;
                if ( typeof text === "string" ) {
                    return JSON.stringify(JSON.parse(text), null, this.step);
                }
                if ( typeof text === "object" ) {
                    return JSON.stringify(text, null, this.step);
                }
                return text; // text is not string nor object
            },

            jsonmin: function(text) {
                if (typeof JSON === 'undefined' ) {
                    return text;
                }
                return JSON.stringify(JSON.parse(text), null, 0);
            },

            css: function(text) {
                var ar = text.replace(/\s{1,}/g,' ')
                        .replace(/\{/g,"{~::~")
                        .replace(/\}/g,"~::~}~::~")
                        .replace(/\;/g,";~::~")
                        .replace(/\/\*/g,"~::~/*")
                        .replace(/\*\//g,"*/~::~")
                        .replace(/~::~\s{0,}~::~/g,"~::~")
                        .split('~::~'),
                    len = ar.length,
                    deep = 0,
                    str = '',
                    ix = 0;

                for(ix=0;ix<len;ix++) {

                    if( /\{/.exec(ar[ix]))  {
                        str += this.shift[deep++]+ar[ix];
                    } else
                    if( /\}/.exec(ar[ix]))  {
                        str += this.shift[--deep]+ar[ix];
                    } else
                    if( /\*\\/.exec(ar[ix]))  {
                        str += this.shift[deep]+ar[ix];
                    }
                    else {
                        str += this.shift[deep]+ar[ix];
                    }
                }
                return str.replace(/^\n{1,}/,'');
            },

            cssmin: function(text) {
                var str = this.preserveComments ? text : text.replace(/\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+\//g,"") ;
                return str.replace(/\s{1,}/g,' ')
                    .replace(/\{\s{1,}/g,"{")
                    .replace(/\}\s{1,}/g,"}")
                    .replace(/\;\s{1,}/g,";")
                    .replace(/\/\*\s{1,}/g,"/*")
                    .replace(/\*\/\s{1,}/g,"*/");
            },

            sql: function(text) {

                var ar_by_quote = text.replace(/\s{1,}/g," ")
                        .replace(/\'/ig,"~::~\'")
                        .split('~::~'),
                    len = ar_by_quote.length,
                    ar = [],
                    deep = 0,
                    tab = this.step,//+this.step,
                    parenthesisLevel = 0,
                    str = '',
                    ix = 0;

                for(ix=0;ix<len;ix++) {
                    if(ix%2) {
                        ar = ar.concat(ar_by_quote[ix]);
                    } else {
                        ar = ar.concat(split_sql(ar_by_quote[ix], tab) );
                    }
                }

                len = ar.length;
                for(ix=0;ix<len;ix++) {

                    parenthesisLevel = isSubquery(ar[ix], parenthesisLevel);

                    if( /\s{0,}\s{0,}SELECT\s{0,}/.exec(ar[ix]))  {
                        ar[ix] = ar[ix].replace(/\,/g,",\n"+tab+tab+"");
                    }

                    if( /\s{0,}\s{0,}SET\s{0,}/.exec(ar[ix]))  {
                        ar[ix] = ar[ix].replace(/\,/g,",\n"+tab+tab+"");
                    }

                    if( /\s{0,}\(\s{0,}SELECT\s{0,}/.exec(ar[ix]))  {
                        deep++;
                        str += this.shift[deep]+ar[ix];
                    } else
                    if( /\'/.exec(ar[ix]) )  {
                        if(parenthesisLevel<1 && deep) {
                            deep--;
                        }
                        str += ar[ix];
                    }
                    else  {
                        str += this.shift[deep]+ar[ix];
                        if(parenthesisLevel<1 && deep) {
                            deep--;
                        }
                    }
                }
                str = str.replace(/^\n{1,}/,'').replace(/\n{1,}/g,"\n");
                return str;
            },

            sqlmin: function(text) {
                return text.replace(/\s{1,}/g," ").replace(/\s{1,}\(/,"(").replace(/\s{1,}\)/,")");
            }

        };//end Formatter.prototype


        /**
         * DOM chaining version
         */
        $.fn.format = function(options) {
            var fmt = new Formatter(options);
//		var methodName = fmt.options.method;
//		if (!$.isFunction(fmt[methodName])) {
//			$.error("'" + methodName + "' is not a Formatter method.")
//		};
//		console.log("call " + methodName + " on " + $.type(this));
//		console.log(this);
            return this.each(function() {
//			console.log($.type(this));
//			console.log(this);
                var node = $(this);
//			console.log($.type(node));
//			console.log(node);
                var text = node.val();
//			console.log("text ==>\n" + text);
                text = fmt.format(text);
                node.val(text);
            });
        };

        /**
         * utility version
         */
        $.format = function(text, options) {
            var fmt = new Formatter(options);
//		var methodName = fmt.options.method;
//		if (!$.isFunction(fmt[methodName])) {
//			$.error("'" + methodName + "' is not a Formatter method.")
//		};
//		console.log("call " + methodName + " on " + $.type(text));
//		console.log(text);
//		return fmt[methodName].call(fmt, text);
            return fmt.format(text);
        };

        /**
         * default configuration
         */
        $.fn.format.defaults = {
            method: 'xml', // the method to be called
            step: '    ', // 4 spaces
            preserveComments: false //applies to cssmin and xmlmin functions
        };
    })($);



    var chrome_tool_library_code = {
        xml:function(string,is_compress){
            return $.format(string,{"method": (is_compress ? "xmlmin" : "xml")});
        },
        json:function(string,is_compress){
            return $.format(string,{"method": (is_compress ? "jsonmin" : "json")});
        },
        css:function(string,is_compress){
            return $.format(string,{"method": (is_compress ? "cssmin" : "css")});
        },
        sql:function(string,is_compress){
            return $.format(string,{"method": (is_compress ? "sqlmin" : "sql")});
        }
        ,
        javascript:function(string,is_compress){
            return $.format(string,{"method": (is_compress ? "javascriptmin" : "javascript")});
        }
    };

    exports('chrome_tool_library_code', chrome_tool_library_code);
});

