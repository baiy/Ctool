/* eslint-disable */
const UglifyJS = {}
!function(_) {
    "use strict";
    function e(e) {
        return e.split("");
    }
    function qn(e, n) {
        return 0 <= n.indexOf(e);
    }
    function Cn(e, n) {
        for (var t = n.length; 0 <= --t; ) if (e(n[t])) return n[t];
    }
    function n(e) {
        Object.defineProperty(e.prototype, "stack", {
            get: function() {
                var e = new Error(this.message);
                e.name = this.name;
                try {
                    throw e;
                } catch (e) {
                    return e.stack;
                }
            }
        });
    }
    function r(e, n) {
        this.message = e, this.defs = n;
    }
    function oe(e, n, t) {
        if (t) for (var i in e) if (Vn(e, i) && !Vn(n, i)) throw new r("`" + i + "` is not a supported option", n);
        for (var i in e) Vn(e, i) && (n[i] = e[i]);
        return n;
    }
    function t(e, n) {
        var t, i = 0;
        for (t in n) Vn(n, t) && (e[t] = n[t], i++);
        return i;
    }
    function Mn() {}
    function Fn() {
        return !1;
    }
    function jn() {
        return !0;
    }
    function Pn() {
        return this;
    }
    function Nn() {
        return null;
    }
    ((r.prototype = Object.create(Error.prototype)).constructor = r).prototype.name = "DefaultsError",
    n(r);
    var In = function() {
        function e(e, n) {
            for (var t = [], i = 0; i < e.length; i++) {
                var r = n(e[i], i);
                r !== o && (r instanceof a ? t.push.apply(t, r.v) : t.push(r));
            }
            return t;
        }
        e.is_op = function(e) {
            return e === o || e instanceof a;
        }, e.splice = function(e) {
            return new a(e);
        };
        var o = e.skip = {};
        function a(e) {
            this.v = e;
        }
        return e;
    }();
    function Hn(e, n) {
        if (e.indexOf(n) < 0) return e.push(n);
    }
    function Yn(e, t) {
        return e.replace(/\{([^{}]+)\}/g, function(e, n) {
            n = t[n];
            return n instanceof Gn ? n.print_to_string() : n;
        });
    }
    function Rn(e, n) {
        n = e.indexOf(n);
        0 <= n && e.splice(n, 1);
    }
    function Bn(e) {
        Array.isArray(e) || (e = e.split(" "));
        var n = Object.create(null);
        return e.forEach(function(e) {
            n[e] = !0;
        }), n;
    }
    function Ln(e, n) {
        for (var t = e.length; 0 <= --t; ) if (!n(e[t], t)) return !1;
        return !0;
    }
    function Un() {
        this._values = Object.create(null), this._size = 0;
    }
    function Vn(e, n) {
        return Object.prototype.hasOwnProperty.call(e, n);
    }
    function Wn(e, n, t) {
        for (var i, r = e.parent(-1), o = 0; i = e.parent(o++); r = i) {
            if (yt(i)) return n && i.value === r;
            if (i instanceof ki) {
                if (i.left === r) continue;
            } else if ("Call" == i.TYPE) {
                if (i.expression === r) continue;
            } else if (i instanceof Ei) {
                if (i.condition === r) continue;
            } else {
                if (i instanceof fi) return t;
                if (i instanceof mi) {
                    if (i.expression === r) continue;
                } else if (i instanceof hi) {
                    if (i.expressions[0] === r) continue;
                } else {
                    if (i instanceof et) return !0;
                    if (i instanceof tr) {
                        if (i.tag === r) continue;
                    } else if (i instanceof xi && i.expression === r) continue;
                }
            }
            return !1;
        }
    }
    function i(e, n, t, i) {
        void 0 === i && (i = Gn);
        var r = n = n ? n.split(/\s+/) : [];
        i && i.PROPS && (n = n.concat(i.PROPS));
        var o = [ "return function AST_", e, "(props){", "if(props){" ];
        n.forEach(function(e) {
            o.push("this.", e, "=props.", e, ";");
        }), o.push("}");
        var a = Object.create(i && i.prototype);
        (t.initialize || a.initialize) && o.push("this.initialize();"), o.push("};");
        var s, f = new Function(o.join(""))();
        for (s in f.prototype = a, (f.prototype.CTOR = f).prototype.TYPE = f.TYPE = e, i && (f.BASE = i).SUBCLASSES.push(f),
        f.DEFMETHOD = function(e, n) {
            this.prototype[e] = n;
        }, f.PROPS = n, f.SELF_PROPS = r, f.SUBCLASSES = [], t) Vn(t, s) && (/^\$/.test(s) ? f[s.substr(1)] = t[s] : f.DEFMETHOD(s, t[s]));
        return void 0 !== _ && (_["AST_" + e] = f), f;
    }
    Un.prototype = {
        set: function(e, n) {
            return this.has(e) || ++this._size, this._values["$" + e] = n, this;
        },
        add: function(e, n) {
            return this.has(e) ? this.get(e).push(n) : this.set(e, [ n ]), this;
        },
        get: function(e) {
            return this._values["$" + e];
        },
        del: function(e) {
            return this.has(e) && (--this._size, delete this._values["$" + e]), this;
        },
        has: function(e) {
            return "$" + e in this._values;
        },
        all: function(e) {
            for (var n in this._values) if (!e(this._values[n], n.substr(1))) return !1;
            return !0;
        },
        each: function(e) {
            for (var n in this._values) e(this._values[n], n.substr(1));
        },
        size: function() {
            return this._size;
        },
        map: function(e) {
            var n, t = [];
            for (n in this._values) t.push(e(this._values[n], n.substr(1)));
            return t;
        },
        clone: function() {
            var e, n = new Un();
            for (e in this._values) n._values[e] = this._values[e];
            return n._size = this._size, n;
        },
        toObject: function() {
            return this._values;
        }
    }, Un.fromObject = function(e) {
        var n = new Un();
        return n._size = t(n._values, e), n;
    };
    var Y = i("Token", "type value line col pos endline endcol endpos nlb comments_before comments_after file raw", {}, null), Gn = i("Node", "start end", {
        _clone: function(e) {
            if (e) {
                var n = this.clone();
                return n.transform(new _r(function(e) {
                    if (e !== n) return e.clone(!0);
                }));
            }
            return new this.CTOR(this);
        },
        clone: function(e) {
            return this._clone(e);
        },
        $documentation: "Base class of all AST nodes",
        $propdoc: {
            start: "[AST_Token] The first token of this node",
            end: "[AST_Token] The last token of this node"
        },
        walk: function(e) {
            e.visit(this);
        },
        _validate: function() {
            if ("Node" == this.TYPE) throw new Error("should not instantiate AST_Node");
        },
        validate: function() {
            for (var e = this.CTOR; e.prototype._validate.call(this), e = e.BASE; );
        },
        validate_ast: function() {
            var n = {};
            this.walk(new mr(function(e) {
                if (e.validate_visited === n) throw new Error(Yn("cannot reuse {type} from [{file}:{line},{col}]", {
                    type: "AST_" + e.TYPE,
                    file: e.start.file,
                    line: e.start.line,
                    col: e.start.col
                }));
                e.validate_visited = n;
            }));
        }
    }, null);
    (Gn.log_function = function(n, e) {
        var t;
        function i(e) {
            t[e] || (t[e] = !0, n(e));
        }
        "function" == typeof n ? (t = Object.create(null), Gn.info = e ? function(e, n) {
            i("INFO: " + Yn(e, n));
        } : Mn, Gn.warn = function(e, n) {
            i("WARN: " + Yn(e, n));
        }) : Gn.info = Gn.warn = Mn;
    })();
    var o = [];
    Gn.enable_validation = function() {
        Gn.disable_validation(), function e(n) {
            var t;
            n.SUBCLASSES.forEach(e), Vn(n.prototype, "transform") && (t = n.prototype.transform,
            n.prototype.transform = function(e, n) {
                e = t.call(this, e, n);
                if (e instanceof Gn) e.validate(); else if (!(null === e || n && In.is_op(e))) throw new Error("invalid transformed value: " + e);
                return e;
            }, o.push(function() {
                n.prototype.transform = t;
            }));
        }(this);
    }, Gn.disable_validation = function() {
        for (var e; e = o.pop(); ) e();
    };
    var Jn = i("Statement", null, {
        $documentation: "Base class of all statements",
        _validate: function() {
            if ("Statement" == this.TYPE) throw new Error("should not instantiate AST_Statement");
        }
    }), Xn = i("Debugger", null, {
        $documentation: "Represents a debugger statement"
    }, Jn), Kn = i("Directive", "quote value", {
        $documentation: 'Represents a directive, like "use strict";',
        $propdoc: {
            quote: "[string?] the original quote character",
            value: "[string] The value of this directive as a plain string (it's not an AST_String!)"
        },
        _validate: function() {
            if (null != this.quote) {
                if ("string" != typeof this.quote) throw new Error("quote must be string");
                if (!/^["']$/.test(this.quote)) throw new Error("invalid quote: " + this.quote);
            }
            if ("string" != typeof this.value) throw new Error("value must be string");
        }
    }, Jn), Qn = i("EmptyStatement", null, {
        $documentation: "The empty statement (empty block or simply a semicolon)"
    }, Jn);
    function Zn(e) {
        return e instanceof Jn && !(e instanceof Pt) && !(e instanceof bt);
    }
    function a(e, n, t, i, r) {
        if (t = t ? "contain" : "be", !(e instanceof Gn)) throw new Error(n + " must " + t + " AST_Node");
        if (e instanceof li) throw new Error(n + " cannot " + t + " AST_DefaultValue");
        if (e instanceof Oi) throw new Error(n + " cannot " + t + " AST_Destructured");
        if (e instanceof lr && !r) throw new Error(n + " cannot " + t + " AST_Hole");
        if (e instanceof bi && !i) throw new Error(n + " cannot " + t + " AST_Spread");
        if (Zn(e)) throw new Error(n + " cannot " + t + " AST_Statement");
        if (e instanceof Hi) throw new Error(n + " cannot " + t + " AST_SymbolDeclaration");
    }
    function s(e, n) {
        a(e[n], n);
    }
    var et = i("SimpleStatement", "body", {
        $documentation: "A statement consisting of an expression, i.e. a = 1 + 2",
        $propdoc: {
            body: "[AST_Node] an expression node (should not be instanceof AST_Statement)"
        },
        walk: function(e) {
            var n = this;
            e.visit(n, function() {
                n.body.walk(e);
            });
        },
        _validate: function() {
            s(this, "body");
        }
    }, Jn), nt = i("BlockScope", "enclosed functions make_def parent_scope variables", {
        $documentation: "Base class for all statements introducing a lexical scope",
        $propdoc: {
            enclosed: "[SymbolDef*/S] a list of all symbol definitions that are accessed from this scope or any subscopes",
            functions: "[Dictionary/S] like `variables`, but only lists function declarations",
            parent_scope: "[AST_Scope?/S] link to the parent scope",
            variables: "[Dictionary/S] a map of name ---\x3e SymbolDef for all variables/functions defined in this scope"
        },
        clone: function(e) {
            e = this._clone(e);
            return this.enclosed && (e.enclosed = this.enclosed.slice()), this.functions && (e.functions = this.functions.clone()),
            this.variables && (e.variables = this.variables.clone()), e;
        },
        pinned: function() {
            return this.resolve().pinned();
        },
        resolve: function() {
            return this.parent_scope.resolve();
        },
        _validate: function() {
            if ("BlockScope" == this.TYPE) throw new Error("should not instantiate AST_BlockScope");
            if (null != this.parent_scope) {
                if (!(this.parent_scope instanceof nt)) throw new Error("parent_scope must be AST_BlockScope");
                if (!(this.resolve() instanceof vt)) throw new Error("must be contained within AST_Scope");
            }
        }
    }, Jn);
    function tt(e, n) {
        e.body.forEach(function(e) {
            e.walk(n);
        });
    }
    var it = i("Block", "body", {
        $documentation: "A body of statements (usually braced)",
        $propdoc: {
            body: "[AST_Statement*] an array of statements"
        },
        walk: function(e) {
            var n = this;
            e.visit(n, function() {
                tt(n, e);
            });
        },
        _validate: function() {
            if ("Block" == this.TYPE) throw new Error("should not instantiate AST_Block");
            this.body.forEach(function(e) {
                if (!Zn(e)) throw new Error("body must contain AST_Statement");
            });
        }
    }, nt), rt = i("BlockStatement", null, {
        $documentation: "A block statement"
    }, it), F = i("StatementWithBody", "body", {
        $documentation: "Base class for all statements that contain one nested body: `For`, `ForIn`, `Do`, `While`, `With`",
        $propdoc: {
            body: "[AST_Statement] the body; this should always be present, even if it's an AST_EmptyStatement"
        },
        _validate: function() {
            if ("StatementWithBody" == this.TYPE) throw new Error("should not instantiate AST_StatementWithBody");
            if (!Zn(this.body)) throw new Error("body must be AST_Statement");
        }
    }, nt), ot = i("LabeledStatement", "label", {
        $documentation: "Statement with a label",
        $propdoc: {
            label: "[AST_Label] a label definition"
        },
        walk: function(e) {
            var n = this;
            e.visit(n, function() {
                n.label.walk(e), n.body.walk(e);
            });
        },
        clone: function(e) {
            var n, t, i = this._clone(e);
            return e && (n = i.label, t = this.label, i.walk(new mr(function(e) {
                return e instanceof Ut ? e.label && e.label.thedef === t ? ((e.label.thedef = n).references.push(e),
                !0) : void 0 : e instanceof vt || void 0;
            }))), i;
        },
        _validate: function() {
            if (!(this.label instanceof le)) throw new Error("label must be AST_Label");
        }
    }, F), at = i("IterationStatement", null, {
        $documentation: "Internal class.  All loops inherit from it.",
        _validate: function() {
            if ("IterationStatement" == this.TYPE) throw new Error("should not instantiate AST_IterationStatement");
        }
    }, F), st = i("DWLoop", "condition", {
        $documentation: "Base class for do/while statements",
        $propdoc: {
            condition: "[AST_Node] the loop condition.  Should not be instanceof AST_Statement"
        },
        _validate: function() {
            if ("DWLoop" == this.TYPE) throw new Error("should not instantiate AST_DWLoop");
            s(this, "condition");
        }
    }, at), ft = i("Do", null, {
        $documentation: "A `do` statement",
        walk: function(e) {
            var n = this;
            e.visit(n, function() {
                n.body.walk(e), n.condition.walk(e);
            });
        }
    }, st), ct = i("While", null, {
        $documentation: "A `while` statement",
        walk: function(e) {
            var n = this;
            e.visit(n, function() {
                n.condition.walk(e), n.body.walk(e);
            });
        }
    }, st), ut = i("For", "init condition step", {
        $documentation: "A `for` statement",
        $propdoc: {
            init: "[AST_Node?] the `for` initialization code, or null if empty",
            condition: "[AST_Node?] the `for` termination clause, or null if empty",
            step: "[AST_Node?] the `for` update clause, or null if empty"
        },
        walk: function(e) {
            var n = this;
            e.visit(n, function() {
                n.init && n.init.walk(e), n.condition && n.condition.walk(e), n.step && n.step.walk(e),
                n.body.walk(e);
            });
        },
        _validate: function() {
            if (null != this.init) {
                if (!(this.init instanceof Gn)) throw new Error("init must be AST_Node");
                if (Zn(this.init) && !(this.init instanceof ti)) throw new Error("init cannot be AST_Statement");
            }
            null != this.condition && s(this, "condition"), null != this.step && s(this, "step");
        }
    }, at), lt = i("ForEnumeration", "init object", {
        $documentation: "Base class for enumeration loops, i.e. `for ... in`, `for ... of` & `for await ... of`",
        $propdoc: {
            init: "[AST_Node] the assignment target during iteration",
            object: "[AST_Node] the object to iterate over"
        },
        walk: function(e) {
            var n = this;
            e.visit(n, function() {
                n.init.walk(e), n.object.walk(e), n.body.walk(e);
            });
        },
        _validate: function() {
            if ("ForEnumeration" == this.TYPE) throw new Error("should not instantiate AST_ForEnumeration");
            if (this.init instanceof ti) {
                if (1 != this.init.definitions.length) throw new Error("init must have single declaration");
            } else c(this.init, function(e) {
                if (!(e instanceof mi || e instanceof Xi)) throw new Error("init must be assignable: " + e.TYPE);
            });
            s(this, "object");
        }
    }, at), pt = i("ForIn", null, {
        $documentation: "A `for ... in` statement"
    }, lt), ae = i("ForOf", null, {
        $documentation: "A `for ... of` statement"
    }, lt), dt = i("ForAwaitOf", null, {
        $documentation: "A `for await ... of` statement"
    }, ae), ht = i("With", "expression", {
        $documentation: "A `with` statement",
        $propdoc: {
            expression: "[AST_Node] the `with` expression"
        },
        walk: function(e) {
            var n = this;
            e.visit(n, function() {
                n.expression.walk(e), n.body.walk(e);
            });
        },
        _validate: function() {
            s(this, "expression");
        }
    }, F), vt = i("Scope", "uses_eval uses_with", {
        $documentation: "Base class for all statements introducing a lexical scope",
        $propdoc: {
            uses_eval: "[boolean/S] tells whether this scope contains a direct call to the global `eval`",
            uses_with: "[boolean/S] tells whether this scope uses the `with` statement"
        },
        pinned: function() {
            return this.uses_eval || this.uses_with;
        },
        resolve: Pn,
        _validate: function() {
            if ("Scope" == this.TYPE) throw new Error("should not instantiate AST_Scope");
        }
    }, it), mt = i("Toplevel", "globals", {
        $documentation: "The toplevel scope",
        $propdoc: {
            globals: "[Dictionary/S] a map of name ---\x3e SymbolDef for all undeclared names"
        },
        wrap: function(e) {
            var n = this.body;
            return kr([ "(function(exports){'$ORIG';})(typeof ", e, "=='undefined'?(", e, "={}):", e, ");" ].join(""), {
                filename: "wrap=" + JSON.stringify(e)
            }).transform(new _r(function(e) {
                if (e instanceof Kn && "$ORIG" == e.value) return In.splice(n);
            }));
        },
        enclose: function(e) {
            var n = (e = "string" != typeof e ? "" : e).indexOf(":");
            n < 0 && (n = e.length);
            var t = this.body;
            return kr([ "(function(", e.slice(0, n), '){"$ORIG"})(', e.slice(n + 1), ")" ].join(""), {
                filename: "enclose=" + JSON.stringify(e)
            }).transform(new _r(function(e) {
                if (e instanceof Kn && "$ORIG" == e.value) return In.splice(t);
            }));
        }
    }, vt), _t = i("Lambda", "argnames length_read rest uses_arguments", {
        $documentation: "Base class for functions",
        $propdoc: {
            argnames: "[(AST_DefaultValue|AST_Destructured|AST_SymbolFunarg)*] array of function arguments and/or destructured literals",
            length_read: "[boolean/S] whether length property of this function is accessed",
            rest: "[(AST_Destructured|AST_SymbolFunarg)?] rest parameter, or null if absent",
            uses_arguments: "[boolean/S] whether this function accesses the arguments array"
        },
        each_argname: function(n) {
            var t = new mr(function(e) {
                return e instanceof li ? (e.name.walk(t), !0) : e instanceof zi ? (e.value.walk(t),
                !0) : void (e instanceof Ui && n(e));
            });
            this.argnames.forEach(function(e) {
                e.walk(t);
            }), this.rest && this.rest.walk(t);
        },
        walk: function(n) {
            var e = this;
            n.visit(e, function() {
                e.name && e.name.walk(n), e.argnames.forEach(function(e) {
                    e.walk(n);
                }), e.rest && e.rest.walk(n), tt(e, n);
            });
        },
        _validate: function() {
            if ("Lambda" == this.TYPE) throw new Error("should not instantiate AST_Lambda");
            this.argnames.forEach(function(e) {
                c(e, function(e) {
                    if (!(e instanceof Ui)) throw new Error("argnames must be AST_SymbolFunarg[]");
                }, !0);
            }), null != this.rest && c(this.rest, function(e) {
                if (!(e instanceof Ui)) throw new Error("rest must be AST_SymbolFunarg");
            });
        }
    }, vt), gt = i("Accessor", null, {
        $documentation: "A getter/setter function",
        _validate: function() {
            if (null != this.name) throw new Error("name must be null");
        }
    }, _t), bt = i("LambdaExpression", "inlined", {
        $documentation: "Base class for function expressions",
        $propdoc: {
            inlined: "[boolean/S] whether this function has been inlined"
        },
        _validate: function() {
            if ("LambdaExpression" == this.TYPE) throw new Error("should not instantiate AST_LambdaExpression");
        }
    }, _t);
    function yt(e) {
        return e instanceof Et || e instanceof St;
    }
    function wt(e) {
        return e instanceof St || e instanceof zt || e instanceof Tt || e instanceof qt || e instanceof At;
    }
    function xt(e) {
        return e instanceof qt || e instanceof At || e instanceof Mt || e instanceof Ot;
    }
    function kt(e, n) {
        yt(e) && e.value ? e.value.walk(n) : tt(e, n);
    }
    var Et = i("Arrow", "value", {
        $documentation: "An arrow function expression",
        $propdoc: {
            value: "[AST_Node?] simple return expression, or null if using function body."
        },
        walk: function(n) {
            var e = this;
            n.visit(e, function() {
                e.argnames.forEach(function(e) {
                    e.walk(n);
                }), e.rest && e.rest.walk(n), e.value ? e.value.walk(n) : tt(e, n);
            });
        },
        _validate: function() {
            if (null != this.name) throw new Error("name must be null");
            if (this.uses_arguments) throw new Error("uses_arguments must be false");
            if (null != this.value && (s(this, "value"), this.body.length)) throw new Error("body must be empty if value exists");
        }
    }, bt), St = i("AsyncArrow", "value", {
        $documentation: "An asynchronous arrow function expression",
        $propdoc: {
            value: "[AST_Node?] simple return expression, or null if using function body."
        },
        walk: function(n) {
            var e = this;
            n.visit(e, function() {
                e.argnames.forEach(function(e) {
                    e.walk(n);
                }), e.rest && e.rest.walk(n), e.value ? e.value.walk(n) : tt(e, n);
            });
        },
        _validate: function() {
            if (null != this.name) throw new Error("name must be null");
            if (this.uses_arguments) throw new Error("uses_arguments must be false");
            if (null != this.value && (s(this, "value"), this.body.length)) throw new Error("body must be empty if value exists");
        }
    }, bt), Tt = i("AsyncFunction", "name", {
        $documentation: "An asynchronous function expression",
        $propdoc: {
            name: "[AST_SymbolLambda?] the name of this function, or null if not specified"
        },
        _validate: function() {
            if (null != this.name && !(this.name instanceof Wi)) throw new Error("name must be AST_SymbolLambda");
        }
    }, bt), At = i("AsyncGeneratorFunction", "name", {
        $documentation: "An asynchronous generator function expression",
        $propdoc: {
            name: "[AST_SymbolLambda?] the name of this function, or null if not specified"
        },
        _validate: function() {
            if (null != this.name && !(this.name instanceof Wi)) throw new Error("name must be AST_SymbolLambda");
        }
    }, bt), Dt = i("Function", "name", {
        $documentation: "A function expression",
        $propdoc: {
            name: "[AST_SymbolLambda?] the name of this function, or null if not specified"
        },
        _validate: function() {
            if (null != this.name && !(this.name instanceof Wi)) throw new Error("name must be AST_SymbolLambda");
        }
    }, bt), Ot = i("GeneratorFunction", "name", {
        $documentation: "A generator function expression",
        $propdoc: {
            name: "[AST_SymbolLambda?] the name of this function, or null if not specified"
        },
        _validate: function() {
            if (null != this.name && !(this.name instanceof Wi)) throw new Error("name must be AST_SymbolLambda");
        }
    }, bt), $t = i("LambdaDefinition", "inlined name", {
        $documentation: "Base class for function definitions",
        $propdoc: {
            inlined: "[boolean/S] whether this function has been inlined",
            name: "[AST_SymbolDefun] the name of this function"
        },
        _validate: function() {
            if ("LambdaDefinition" == this.TYPE) throw new Error("should not instantiate AST_LambdaDefinition");
            if (!(this.name instanceof Vi)) throw new Error("name must be AST_SymbolDefun");
        }
    }, _t), zt = i("AsyncDefun", null, {
        $documentation: "An asynchronous function definition"
    }, $t), qt = i("AsyncGeneratorDefun", null, {
        $documentation: "An asynchronous generator function definition"
    }, $t), Ct = i("Defun", null, {
        $documentation: "A function definition"
    }, $t), Mt = i("GeneratorDefun", null, {
        $documentation: "A generator function definition"
    }, $t), Ft = i("Class", "extends name properties", {
        $documentation: "Base class for class literals",
        $propdoc: {
            extends: "[AST_Node?] the super class, or null if not specified",
            properties: "[AST_ClassProperty*] array of class properties"
        },
        walk: function(n) {
            var e = this;
            n.visit(e, function() {
                e.name && e.name.walk(n), e.extends && e.extends.walk(n), e.properties.forEach(function(e) {
                    e.walk(n);
                });
            });
        },
        _validate: function() {
            if ("Class" == this.TYPE) throw new Error("should not instantiate AST_Class");
            null != this.extends && s(this, "extends"), this.properties.forEach(function(e) {
                if (!(e instanceof Nt)) throw new Error("properties must contain AST_ClassProperty");
            });
        }
    }, nt), jt = i("DefClass", null, {
        $documentation: "A class definition",
        $propdoc: {
            name: "[AST_SymbolDefClass] the name of this class"
        },
        _validate: function() {
            if (!(this.name instanceof ue)) throw new Error("name must be AST_SymbolDefClass");
        }
    }, Ft), Pt = i("ClassExpression", null, {
        $documentation: "A class expression",
        $propdoc: {
            name: "[AST_SymbolClass?] the name of this class, or null if not specified"
        },
        _validate: function() {
            if (null != this.name && !(this.name instanceof Gi)) throw new Error("name must be AST_SymbolClass");
        }
    }, Ft), Nt = i("ClassProperty", "key private static value", {
        $documentation: "Base class for `class` properties",
        $propdoc: {
            key: "[string|AST_Node] property name (AST_Node for computed property)",
            private: "[boolean] whether this is a private property",
            static: "[boolean] whether this is a static property",
            value: "[AST_Node?] property value (AST_Accessor for getters/setters, AST_LambdaExpression for methods, null if not specified for fields)"
        },
        walk: function(e) {
            var n = this;
            e.visit(n, function() {
                n.key instanceof Gn && n.key.walk(e), n.value && n.value.walk(e);
            });
        },
        _validate: function() {
            if ("ClassProperty" == this.TYPE) throw new Error("should not instantiate AST_ClassProperty");
            if ("string" != typeof this.key) {
                if (!(this.key instanceof Gn)) throw new Error("key must be string or AST_Node");
                s(this, "key");
            }
            if (null != this.value && !(this.value instanceof Gn)) throw new Error("value must be AST_Node");
        }
    }), It = i("ClassField", null, {
        $documentation: "A `class` field",
        _validate: function() {
            null != this.value && s(this, "value");
        }
    }, Nt), se = i("ClassGetter", null, {
        $documentation: "A `class` getter",
        _validate: function() {
            if (!(this.value instanceof gt)) throw new Error("value must be AST_Accessor");
        }
    }, Nt), fe = i("ClassSetter", null, {
        $documentation: "A `class` setter",
        _validate: function() {
            if (!(this.value instanceof gt)) throw new Error("value must be AST_Accessor");
        }
    }, Nt), Ht = i("ClassMethod", null, {
        $documentation: "A `class` method",
        _validate: function() {
            if (!(this.value instanceof bt)) throw new Error("value must be AST_LambdaExpression");
            if (yt(this.value)) throw new Error("value cannot be AST_Arrow or AST_AsyncArrow");
            if (null != this.value.name) throw new Error("name of class method's lambda must be null");
        }
    }, Nt), Yt = i("Jump", null, {
        $documentation: "Base class for “jumps” (for now that's `return`, `throw`, `break` and `continue`)",
        _validate: function() {
            if ("Jump" == this.TYPE) throw new Error("should not instantiate AST_Jump");
        }
    }, Jn), Rt = i("Exit", "value", {
        $documentation: "Base class for “exits” (`return` and `throw`)",
        $propdoc: {
            value: "[AST_Node?] the value returned or thrown by this statement; could be null for AST_Return"
        },
        walk: function(e) {
            var n = this;
            e.visit(n, function() {
                n.value && n.value.walk(e);
            });
        },
        _validate: function() {
            if ("Exit" == this.TYPE) throw new Error("should not instantiate AST_Exit");
        }
    }, Yt), Bt = i("Return", null, {
        $documentation: "A `return` statement",
        _validate: function() {
            null != this.value && s(this, "value");
        }
    }, Rt), Lt = i("Throw", null, {
        $documentation: "A `throw` statement",
        _validate: function() {
            s(this, "value");
        }
    }, Rt), Ut = i("LoopControl", "label", {
        $documentation: "Base class for loop control statements (`break` and `continue`)",
        $propdoc: {
            label: "[AST_LabelRef?] the label, or null if none"
        },
        walk: function(e) {
            var n = this;
            e.visit(n, function() {
                n.label && n.label.walk(e);
            });
        },
        _validate: function() {
            if ("LoopControl" == this.TYPE) throw new Error("should not instantiate AST_LoopControl");
            if (null != this.label && !(this.label instanceof pe)) throw new Error("label must be AST_LabelRef");
        }
    }, Yt), Vt = i("Break", null, {
        $documentation: "A `break` statement"
    }, Ut), Wt = i("Continue", null, {
        $documentation: "A `continue` statement"
    }, Ut), Gt = i("If", "condition alternative", {
        $documentation: "A `if` statement",
        $propdoc: {
            condition: "[AST_Node] the `if` condition",
            alternative: "[AST_Statement?] the `else` part, or null if not present"
        },
        walk: function(e) {
            var n = this;
            e.visit(n, function() {
                n.condition.walk(e), n.body.walk(e), n.alternative && n.alternative.walk(e);
            });
        },
        _validate: function() {
            if (s(this, "condition"), null != this.alternative && !Zn(this.alternative)) throw new Error("alternative must be AST_Statement");
        }
    }, F), Jt = i("Switch", "expression", {
        $documentation: "A `switch` statement",
        $propdoc: {
            expression: "[AST_Node] the `switch` “discriminant”"
        },
        walk: function(e) {
            var n = this;
            e.visit(n, function() {
                n.expression.walk(e), tt(n, e);
            });
        },
        _validate: function() {
            s(this, "expression"), this.body.forEach(function(e) {
                if (!(e instanceof Xt)) throw new Error("body must be AST_SwitchBranch[]");
            });
        }
    }, it), Xt = i("SwitchBranch", null, {
        $documentation: "Base class for `switch` branches",
        _validate: function() {
            if ("SwitchBranch" == this.TYPE) throw new Error("should not instantiate AST_SwitchBranch");
        }
    }, it), Kt = i("Default", null, {
        $documentation: "A `default` switch branch"
    }, Xt), Qt = i("Case", "expression", {
        $documentation: "A `case` switch branch",
        $propdoc: {
            expression: "[AST_Node] the `case` expression"
        },
        walk: function(e) {
            var n = this;
            e.visit(n, function() {
                n.expression.walk(e), tt(n, e);
            });
        },
        _validate: function() {
            s(this, "expression");
        }
    }, Xt), Zt = i("Try", "bcatch bfinally", {
        $documentation: "A `try` statement",
        $propdoc: {
            bcatch: "[AST_Catch?] the catch block, or null if not present",
            bfinally: "[AST_Finally?] the finally block, or null if not present"
        },
        walk: function(e) {
            var n = this;
            e.visit(n, function() {
                tt(n, e), n.bcatch && n.bcatch.walk(e), n.bfinally && n.bfinally.walk(e);
            });
        },
        _validate: function() {
            if (null != this.bcatch && !(this.bcatch instanceof ei)) throw new Error("bcatch must be AST_Catch");
            if (null != this.bfinally && !(this.bfinally instanceof ni)) throw new Error("bfinally must be AST_Finally");
        }
    }, it), ei = i("Catch", "argname", {
        $documentation: "A `catch` node; only makes sense as part of a `try` statement",
        $propdoc: {
            argname: "[(AST_Destructured|AST_SymbolCatch)?] symbol for the exception, or null if not present"
        },
        walk: function(e) {
            var n = this;
            e.visit(n, function() {
                n.argname && n.argname.walk(e), tt(n, e);
            });
        },
        _validate: function() {
            null != this.argname && c(this.argname, function(e) {
                if (!(e instanceof Ji)) throw new Error("argname must be AST_SymbolCatch");
            });
        }
    }, it), ni = i("Finally", null, {
        $documentation: "A `finally` node; only makes sense as part of a `try` statement"
    }, it), ti = i("Definitions", "definitions", {
        $documentation: "Base class for `var` nodes (variable declarations/initializations)",
        $propdoc: {
            definitions: "[AST_VarDef*] array of variable definitions"
        },
        walk: function(n) {
            var e = this;
            n.visit(e, function() {
                e.definitions.forEach(function(e) {
                    e.walk(n);
                });
            });
        },
        _validate: function() {
            if ("Definitions" == this.TYPE) throw new Error("should not instantiate AST_Definitions");
            if (this.definitions.length < 1) throw new Error("must have at least one definition");
        }
    }, Jn), ii = i("Const", null, {
        $documentation: "A `const` statement",
        _validate: function() {
            this.definitions.forEach(function(e) {
                if (!(e instanceof ai)) throw new Error("definitions must be AST_VarDef[]");
                c(e.name, function(e) {
                    if (!(e instanceof Yi)) throw new Error("name must be AST_SymbolConst");
                });
            });
        }
    }, ti), ri = i("Let", null, {
        $documentation: "A `let` statement",
        _validate: function() {
            this.definitions.forEach(function(e) {
                if (!(e instanceof ai)) throw new Error("definitions must be AST_VarDef[]");
                c(e.name, function(e) {
                    if (!(e instanceof Bi)) throw new Error("name must be AST_SymbolLet");
                });
            });
        }
    }, ti), oi = i("Var", null, {
        $documentation: "A `var` statement",
        _validate: function() {
            this.definitions.forEach(function(e) {
                if (!(e instanceof ai)) throw new Error("definitions must be AST_VarDef[]");
                c(e.name, function(e) {
                    if (!(e instanceof Li)) throw new Error("name must be AST_SymbolVar");
                });
            });
        }
    }, ti), ai = i("VarDef", "name value", {
        $documentation: "A variable declaration; only appears in a AST_Definitions node",
        $propdoc: {
            name: "[AST_Destructured|AST_SymbolVar] name of the variable",
            value: "[AST_Node?] initializer, or null of there's no initializer"
        },
        walk: function(e) {
            var n = this;
            e.visit(n, function() {
                n.name.walk(e), n.value && n.value.walk(e);
            });
        },
        _validate: function() {
            null != this.value && s(this, "value");
        }
    }), si = i("ExportDeclaration", "body", {
        $documentation: "An `export` statement",
        $propdoc: {
            body: "[AST_DefClass|AST_Definitions|AST_LambdaDefinition] the statement to export"
        },
        walk: function(e) {
            var n = this;
            e.visit(n, function() {
                n.body.walk(e);
            });
        },
        _validate: function() {
            if (!(this.body instanceof jt || this.body instanceof ti || this.body instanceof $t)) throw new Error("body must be AST_DefClass, AST_Definitions or AST_LambdaDefinition");
        }
    }, Jn), fi = i("ExportDefault", "body", {
        $documentation: "An `export default` statement",
        $propdoc: {
            body: "[AST_Node] the default export"
        },
        walk: function(e) {
            var n = this;
            e.visit(n, function() {
                n.body.walk(e);
            });
        },
        _validate: function() {
            this.body instanceof jt || this.body instanceof $t || s(this, "body");
        }
    }, Jn), ce = i("ExportForeign", "aliases keys path quote", {
        $documentation: "An `export ... from '...'` statement",
        $propdoc: {
            aliases: "[string*] array of aliases to export",
            keys: "[string*] array of keys to import",
            path: "[string] the path to import module",
            quote: "[string?] the original quote character"
        },
        _validate: function() {
            if (this.aliases.length != this.keys.length) throw new Error("aliases:key length mismatch: " + this.aliases.length + " != " + this.keys.length);
            if (this.aliases.forEach(function(e) {
                if ("string" != typeof e) throw new Error("aliases must contain string");
            }), this.keys.forEach(function(e) {
                if ("string" != typeof e) throw new Error("keys must contain string");
            }), "string" != typeof this.path) throw new Error("path must be string");
            if (null != this.quote) {
                if ("string" != typeof this.quote) throw new Error("quote must be string");
                if (!/^["']$/.test(this.quote)) throw new Error("invalid quote: " + this.quote);
            }
        }
    }, Jn), ci = i("ExportReferences", "properties", {
        $documentation: "An `export { ... }` statement",
        $propdoc: {
            properties: "[AST_SymbolExport*] array of aliases to export"
        },
        walk: function(n) {
            var e = this;
            n.visit(e, function() {
                e.properties.forEach(function(e) {
                    e.walk(n);
                });
            });
        },
        _validate: function() {
            this.properties.forEach(function(e) {
                if (!(e instanceof Ki)) throw new Error("properties must contain AST_SymbolExport");
            });
        }
    }, Jn), ui = i("Import", "all default path properties quote", {
        $documentation: "An `import` statement",
        $propdoc: {
            all: "[AST_SymbolImport?] the imported namespace, or null if not specified",
            default: "[AST_SymbolImport?] the alias for default `export`, or null if not specified",
            path: "[string] the path to import module",
            properties: "[(AST_SymbolImport*)?] array of aliases, or null if not specified",
            quote: "[string?] the original quote character"
        },
        walk: function(n) {
            var e = this;
            n.visit(e, function() {
                e.all && e.all.walk(n), e.default && e.default.walk(n), e.properties && e.properties.forEach(function(e) {
                    e.walk(n);
                });
            });
        },
        _validate: function() {
            if (null != this.all) {
                if (!(this.all instanceof Ri)) throw new Error("all must be AST_SymbolImport");
                if (null != this.properties) throw new Error("cannot import both * and {} in the same statement");
            }
            if (null != this.default) {
                if (!(this.default instanceof Ri)) throw new Error("default must be AST_SymbolImport");
                if ("" !== this.default.key) throw new Error("invalid default key: " + this.default.key);
            }
            if ("string" != typeof this.path) throw new Error("path must be string");
            if (null != this.properties && this.properties.forEach(function(e) {
                if (!(e instanceof Ri)) throw new Error("properties must contain AST_SymbolImport");
            }), null != this.quote) {
                if ("string" != typeof this.quote) throw new Error("quote must be string");
                if (!/^["']$/.test(this.quote)) throw new Error("invalid quote: " + this.quote);
            }
        }
    }, Jn), li = i("DefaultValue", "name value", {
        $documentation: "A default value declaration",
        $propdoc: {
            name: "[AST_Destructured|AST_SymbolDeclaration] name of the variable",
            value: "[AST_Node] value to assign if variable is `undefined`"
        },
        walk: function(e) {
            var n = this;
            e.visit(n, function() {
                n.name.walk(e), n.value.walk(e);
            });
        },
        _validate: function() {
            s(this, "value");
        }
    });
    function f(e, n, t, i) {
        e[n].forEach(function(e) {
            a(e, n, !0, t, i);
        });
    }
    var pi = i("Call", "args expression optional pure terminal", {
        $documentation: "A function call expression",
        $propdoc: {
            args: "[AST_Node*] array of arguments",
            expression: "[AST_Node] expression to invoke as function",
            optional: "[boolean] whether the expression is optional chaining",
            pure: "[string/S] marker for side-effect-free call expression",
            terminal: "[boolean] whether the chain has ended"
        },
        walk: function(n) {
            var e = this;
            n.visit(e, function() {
                e.expression.walk(n), e.args.forEach(function(e) {
                    e.walk(n);
                });
            });
        },
        _validate: function() {
            s(this, "expression"), f(this, "args", !0);
        }
    }), di = i("New", null, {
        $documentation: "An object instantiation.  Derives from a function call since it has exactly the same properties",
        _validate: function() {
            if (this.optional) throw new Error("optional must be false");
            if (this.terminal) throw new Error("terminal must be false");
        }
    }, pi), hi = i("Sequence", "expressions", {
        $documentation: "A sequence expression (comma-separated expressions)",
        $propdoc: {
            expressions: "[AST_Node*] array of expressions (at least two)"
        },
        walk: function(n) {
            var e = this;
            n.visit(e, function() {
                e.expressions.forEach(function(e) {
                    e.walk(n);
                });
            });
        },
        _validate: function() {
            if (this.expressions.length < 2) throw new Error("expressions must contain multiple elements");
            f(this, "expressions");
        }
    });
    function vi(e) {
        for (;e instanceof mi; ) e = e.expression;
        return e;
    }
    var mi = i("PropAccess", "expression optional property terminal", {
        $documentation: 'Base class for property access expressions, i.e. `a.foo` or `a["foo"]`',
        $propdoc: {
            expression: "[AST_Node] the “container” expression",
            optional: "[boolean] whether the expression is optional chaining",
            property: "[AST_Node|string] the property to access.  For AST_Dot this is always a plain string, while for AST_Sub it's an arbitrary AST_Node",
            terminal: "[boolean] whether the chain has ended"
        },
        get_property: function() {
            var e = this.property;
            return e instanceof ir ? e.value : e instanceof wi && "void" == e.operator && e.expression instanceof ir ? void 0 : e;
        },
        _validate: function() {
            if ("PropAccess" == this.TYPE) throw new Error("should not instantiate AST_PropAccess");
            s(this, "expression");
        }
    }), _i = i("Dot", null, {
        $documentation: "A dotted property access expression",
        walk: function(e) {
            var n = this;
            e.visit(n, function() {
                n.expression.walk(e);
            });
        },
        _validate: function() {
            if ("string" != typeof this.property) throw new Error("property must be string");
        }
    }, mi), gi = i("Sub", null, {
        $documentation: 'Index-style property access, i.e. `a["foo"]`',
        walk: function(e) {
            var n = this;
            e.visit(n, function() {
                n.expression.walk(e), n.property.walk(e);
            });
        },
        _validate: function() {
            s(this, "property");
        }
    }, mi), bi = i("Spread", "expression", {
        $documentation: "Spread expression in array/object literals or function calls",
        $propdoc: {
            expression: "[AST_Node] expression to be expanded"
        },
        walk: function(e) {
            var n = this;
            e.visit(n, function() {
                n.expression.walk(e);
            });
        },
        _validate: function() {
            s(this, "expression");
        }
    }), yi = i("Unary", "operator expression", {
        $documentation: "Base class for unary expressions",
        $propdoc: {
            operator: "[string] the operator",
            expression: "[AST_Node] expression that this unary operator applies to"
        },
        walk: function(e) {
            var n = this;
            e.visit(n, function() {
                n.expression.walk(e);
            });
        },
        _validate: function() {
            if ("Unary" == this.TYPE) throw new Error("should not instantiate AST_Unary");
            if ("string" != typeof this.operator) throw new Error("operator must be string");
            s(this, "expression");
        }
    }), wi = i("UnaryPrefix", null, {
        $documentation: "Unary prefix expression, i.e. `typeof i` or `++i`"
    }, yi), xi = i("UnaryPostfix", null, {
        $documentation: "Unary postfix expression, i.e. `i++`"
    }, yi), ki = i("Binary", "operator left right", {
        $documentation: "Binary expression, i.e. `a + b`",
        $propdoc: {
            left: "[AST_Node] left-hand side expression",
            operator: "[string] the operator",
            right: "[AST_Node] right-hand side expression"
        },
        walk: function(e) {
            var n = this;
            e.visit(n, function() {
                n.left.walk(e), n.right.walk(e);
            });
        },
        _validate: function() {
            if (this instanceof Si || s(this, "left"), "string" != typeof this.operator) throw new Error("operator must be string");
            s(this, "right");
        }
    }), Ei = i("Conditional", "condition consequent alternative", {
        $documentation: "Conditional expression using the ternary operator, i.e. `a ? b : c`",
        $propdoc: {
            condition: "[AST_Node]",
            consequent: "[AST_Node]",
            alternative: "[AST_Node]"
        },
        walk: function(e) {
            var n = this;
            e.visit(n, function() {
                n.condition.walk(e), n.consequent.walk(e), n.alternative.walk(e);
            });
        },
        _validate: function() {
            s(this, "condition"), s(this, "consequent"), s(this, "alternative");
        }
    }), Si = i("Assign", null, {
        $documentation: "An assignment expression — `a = b + 5`",
        _validate: function() {
            if (this.operator.indexOf("=") < 0) throw new Error('operator must contain "="');
            if (this.left instanceof Oi) {
                if ("=" != this.operator) throw new Error("invalid destructuring operator: " + this.operator);
                c(this.left, function(e) {
                    if (!(e instanceof mi || e instanceof Xi)) throw new Error("left must be assignable: " + e.TYPE);
                });
            }
        }
    }, ki), Ti = i("Await", "expression", {
        $documentation: "An await expression",
        $propdoc: {
            expression: "[AST_Node] expression with Promise to resolve on"
        },
        walk: function(e) {
            var n = this;
            e.visit(n, function() {
                n.expression.walk(e);
            });
        },
        _validate: function() {
            s(this, "expression");
        }
    }), Ai = i("Yield", "expression nested", {
        $documentation: "A yield expression",
        $propdoc: {
            expression: "[AST_Node?] return value for iterator, or null if undefined",
            nested: "[boolean] whether to iterate over expression as generator"
        },
        walk: function(e) {
            var n = this;
            e.visit(n, function() {
                n.expression && n.expression.walk(e);
            });
        },
        _validate: function() {
            if (null != this.expression) s(this, "expression"); else if (this.nested) throw new Error("yield* must contain expression");
        }
    }), Di = i("Array", "elements", {
        $documentation: "An array literal",
        $propdoc: {
            elements: "[AST_Node*] array of elements"
        },
        walk: function(n) {
            var e = this;
            n.visit(e, function() {
                e.elements.forEach(function(e) {
                    e.walk(n);
                });
            });
        },
        _validate: function() {
            f(this, "elements", !0, !0);
        }
    }), Oi = i("Destructured", "rest", {
        $documentation: "Base class for destructured literal",
        $propdoc: {
            rest: "[(AST_Destructured|AST_SymbolDeclaration|AST_SymbolRef)?] rest parameter, or null if absent"
        },
        _validate: function() {
            if ("Destructured" == this.TYPE) throw new Error("should not instantiate AST_Destructured");
        }
    });
    function c(e, n, t) {
        if (e instanceof li && t) return c(e.name, n);
        if (e instanceof Oi) {
            if (null != e.rest && c(e.rest, n), e instanceof $i) return e.elements.forEach(function(e) {
                e instanceof lr || c(e, n, !0);
            });
            if (e instanceof qi) return e.properties.forEach(function(e) {
                c(e.value, n, !0);
            });
        }
        n(e);
    }
    var u, $i = i("DestructuredArray", "elements", {
        $documentation: "A destructured array literal",
        $propdoc: {
            elements: "[(AST_DefaultValue|AST_Destructured|AST_SymbolDeclaration|AST_SymbolRef)*] array of elements"
        },
        walk: function(n) {
            var e = this;
            n.visit(e, function() {
                e.elements.forEach(function(e) {
                    e.walk(n);
                }), e.rest && e.rest.walk(n);
            });
        }
    }, Oi), zi = i("DestructuredKeyVal", "key value", {
        $documentation: "A key: value destructured property",
        $propdoc: {
            key: "[string|AST_Node] property name.  For computed property this is an AST_Node.",
            value: "[AST_DefaultValue|AST_Destructured|AST_SymbolDeclaration|AST_SymbolRef] property value"
        },
        walk: function(e) {
            var n = this;
            e.visit(n, function() {
                n.key instanceof Gn && n.key.walk(e), n.value.walk(e);
            });
        },
        _validate: function() {
            if ("string" != typeof this.key) {
                if (!(this.key instanceof Gn)) throw new Error("key must be string or AST_Node");
                s(this, "key");
            }
            if (!(this.value instanceof Gn)) throw new Error("value must be AST_Node");
        }
    }), qi = i("DestructuredObject", "properties", {
        $documentation: "A destructured object literal",
        $propdoc: {
            properties: "[AST_DestructuredKeyVal*] array of properties"
        },
        walk: function(n) {
            var e = this;
            n.visit(e, function() {
                e.properties.forEach(function(e) {
                    e.walk(n);
                }), e.rest && e.rest.walk(n);
            });
        },
        _validate: function() {
            this.properties.forEach(function(e) {
                if (!(e instanceof zi)) throw new Error("properties must be AST_DestructuredKeyVal[]");
            });
        }
    }, Oi), Ci = i("Object", "properties", {
        $documentation: "An object literal",
        $propdoc: {
            properties: "[(AST_ObjectProperty|AST_Spread)*] array of properties"
        },
        walk: function(n) {
            var e = this;
            n.visit(e, function() {
                e.properties.forEach(function(e) {
                    e.walk(n);
                });
            });
        },
        _validate: function() {
            this.properties.forEach(function(e) {
                if (!(e instanceof Mi || e instanceof bi)) throw new Error("properties must contain AST_ObjectProperty and/or AST_Spread only");
            });
        }
    }), Mi = i("ObjectProperty", "key value", {
        $documentation: "Base class for literal object properties",
        $propdoc: {
            key: "[string|AST_Node] property name.  For computed property this is an AST_Node.",
            value: "[AST_Node] property value.  For getters and setters this is an AST_Accessor."
        },
        walk: function(e) {
            var n = this;
            e.visit(n, function() {
                n.key instanceof Gn && n.key.walk(e), n.value.walk(e);
            });
        },
        _validate: function() {
            if ("ObjectProperty" == this.TYPE) throw new Error("should not instantiate AST_ObjectProperty");
            if ("string" != typeof this.key) {
                if (!(this.key instanceof Gn)) throw new Error("key must be string or AST_Node");
                s(this, "key");
            }
            if (!(this.value instanceof Gn)) throw new Error("value must be AST_Node");
        }
    }), Fi = i("ObjectKeyVal", null, {
        $documentation: "A key: value object property",
        _validate: function() {
            s(this, "value");
        }
    }, Mi), ji = i("ObjectMethod", null, {
        $documentation: "A key(){} object property",
        _validate: function() {
            if (!(this.value instanceof bt)) throw new Error("value must be AST_LambdaExpression");
            if (yt(this.value)) throw new Error("value cannot be AST_Arrow or AST_AsyncArrow");
            if (null != this.value.name) throw new Error("name of object method's lambda must be null");
        }
    }, Fi), Pi = i("ObjectSetter", null, {
        $documentation: "An object setter property",
        _validate: function() {
            if (!(this.value instanceof gt)) throw new Error("value must be AST_Accessor");
        }
    }, Mi), Ni = i("ObjectGetter", null, {
        $documentation: "An object getter property",
        _validate: function() {
            if (!(this.value instanceof gt)) throw new Error("value must be AST_Accessor");
        }
    }, Mi), Ii = i("Symbol", "scope name thedef", {
        $documentation: "Base class for all symbols",
        $propdoc: {
            name: "[string] name of this symbol",
            scope: "[AST_Scope/S] the current scope (not necessarily the definition scope)",
            thedef: "[SymbolDef/S] the definition of this symbol"
        },
        _validate: function() {
            if ("Symbol" == this.TYPE) throw new Error("should not instantiate AST_Symbol");
            if ("string" != typeof this.name) throw new Error("name must be string");
        }
    }), Hi = i("SymbolDeclaration", "init", {
        $documentation: "A declaration symbol (symbol in var, function name or argument, symbol in catch)"
    }, Ii), Yi = i("SymbolConst", null, {
        $documentation: "Symbol defining a constant"
    }, Hi), Ri = i("SymbolImport", "key", {
        $documentation: "Symbol defined by an `import` statement",
        $propdoc: {
            key: "[string] the original `export` name"
        },
        _validate: function() {
            if ("string" != typeof this.key) throw new Error("key must be string");
        }
    }, Yi), Bi = i("SymbolLet", null, {
        $documentation: "Symbol defining a lexical-scoped variable"
    }, Hi), Li = i("SymbolVar", null, {
        $documentation: "Symbol defining a variable"
    }, Hi), Ui = i("SymbolFunarg", null, {
        $documentation: "Symbol naming a function argument"
    }, Li), Vi = i("SymbolDefun", null, {
        $documentation: "Symbol defining a function"
    }, Hi), Wi = i("SymbolLambda", null, {
        $documentation: "Symbol naming a function expression"
    }, Hi), ue = i("SymbolDefClass", null, {
        $documentation: "Symbol defining a class"
    }, Yi), Gi = i("SymbolClass", null, {
        $documentation: "Symbol naming a class expression"
    }, Yi), Ji = i("SymbolCatch", null, {
        $documentation: "Symbol naming the exception in catch"
    }, Hi), le = i("Label", "references", {
        $documentation: "Symbol naming a label (declaration)",
        $propdoc: {
            references: "[AST_LoopControl*] a list of nodes referring to this label"
        },
        initialize: function() {
            this.references = [], this.thedef = this;
        }
    }, Ii), Xi = i("SymbolRef", "fixed in_arg redef", {
        $documentation: "Reference to some symbol (not definition/declaration)"
    }, Ii), Ki = i("SymbolExport", "alias", {
        $documentation: "Reference in an `export` statement",
        $propdoc: {
            alias: "[string] the `export` alias"
        },
        _validate: function() {
            if ("string" != typeof this.alias) throw new Error("alias must be string");
        }
    }, Xi), pe = i("LabelRef", null, {
        $documentation: "Reference to a label symbol"
    }, Ii), Qi = i("ObjectIdentity", null, {
        $documentation: "Base class for `super` & `this`",
        _validate: function() {
            if ("ObjectIdentity" == this.TYPE) throw new Error("should not instantiate AST_ObjectIdentity");
        }
    }, Ii), Zi = i("Super", null, {
        $documentation: "The `super` symbol",
        _validate: function() {
            if ("super" !== this.name) throw new Error('name must be "super"');
        }
    }, Qi), er = i("This", null, {
        $documentation: "The `this` symbol",
        _validate: function() {
            if ("This" == this.TYPE && "this" !== this.name) throw new Error('name must be "this"');
        }
    }, Qi), nr = i("NewTarget", null, {
        $documentation: "The `new.target` symbol",
        initialize: function() {
            this.name = "new.target";
        },
        _validate: function() {
            if ("new.target" !== this.name) throw new Error('name must be "new.target": ' + this.name);
        }
    }, er), tr = i("Template", "expressions strings tag", {
        $documentation: "A template literal, i.e. tag`str1${expr1}...strN${exprN}strN+1`",
        $propdoc: {
            expressions: "[AST_Node*] the placeholder expressions",
            strings: "[string*] the raw text segments",
            tag: "[AST_Node] tag function, or null if absent"
        },
        walk: function(n) {
            var e = this;
            n.visit(e, function() {
                e.tag && e.tag.walk(n), e.expressions.forEach(function(e) {
                    e.walk(n);
                });
            });
        },
        _validate: function() {
            if (this.expressions.length + 1 != this.strings.length) throw new Error("malformed template with " + this.expressions.length + " placeholder(s) but " + this.strings.length + " text segment(s)");
            f(this, "expressions"), this.strings.forEach(function(e) {
                if ("string" != typeof e) throw new Error("strings must contain string");
            }), null != this.tag && s(this, "tag");
        }
    }), ir = i("Constant", null, {
        $documentation: "Base class for all constants",
        _validate: function() {
            if ("Constant" == this.TYPE) throw new Error("should not instantiate AST_Constant");
        }
    }), rr = i("String", "quote value", {
        $documentation: "A string literal",
        $propdoc: {
            quote: "[string?] the original quote character",
            value: "[string] the contents of this string"
        },
        _validate: function() {
            if (null != this.quote) {
                if ("string" != typeof this.quote) throw new Error("quote must be string");
                if (!/^["']$/.test(this.quote)) throw new Error("invalid quote: " + this.quote);
            }
            if ("string" != typeof this.value) throw new Error("value must be string");
        }
    }, ir), or = i("Number", "value", {
        $documentation: "A number literal",
        $propdoc: {
            value: "[number] the numeric value"
        },
        _validate: function() {
            if ("number" != typeof this.value) throw new Error("value must be number");
            if (!isFinite(this.value)) throw new Error("value must be finite");
            if (this.value < 0) throw new Error("value cannot be negative");
        }
    }, ir), ar = i("BigInt", "value", {
        $documentation: "A BigInt literal",
        $propdoc: {
            value: "[string] the numeric representation"
        },
        _validate: function() {
            if ("string" != typeof this.value) throw new Error("value must be string");
            if ("-" == this.value[0]) throw new Error("value cannot be negative");
        }
    }, ir), sr = i("RegExp", "value", {
        $documentation: "A regexp literal",
        $propdoc: {
            value: "[RegExp] the actual regexp"
        },
        _validate: function() {
            if (!(this.value instanceof RegExp)) throw new Error("value must be RegExp");
        }
    }, ir), g = i("Atom", null, {
        $documentation: "Base class for atoms",
        _validate: function() {
            if ("Atom" == this.TYPE) throw new Error("should not instantiate AST_Atom");
        }
    }, ir), fr = i("Null", null, {
        $documentation: "The `null` atom",
        value: null
    }, g), cr = i("NaN", null, {
        $documentation: "The impossible value",
        value: NaN
    }, g), ur = i("Undefined", null, {
        $documentation: "The `undefined` value",
        value: void 0
    }, g), lr = i("Hole", null, {
        $documentation: "A hole in an array",
        value: void 0
    }, g), pr = i("Infinity", null, {
        $documentation: "The `Infinity` value",
        value: 1 / 0
    }, g), dr = i("Boolean", null, {
        $documentation: "Base class for booleans",
        _validate: function() {
            if ("Boolean" == this.TYPE) throw new Error("should not instantiate AST_Boolean");
        }
    }, g), hr = i("False", null, {
        $documentation: "The `false` atom",
        value: !1
    }, dr), vr = i("True", null, {
        $documentation: "The `true` atom",
        value: !0
    }, dr);
    function mr(e) {
        this.callback = e, this.directives = Object.create(null), this.stack = [];
    }
    function _r(e, n) {
        mr.call(this), this.before = e, this.after = n;
    }
    function l(e, n) {
        return In(e, function(e) {
            return e.transform(n, !0);
        });
    }
    function p(e, n) {
        e.argnames = l(e.argnames, n), e.rest && (e.rest = e.rest.transform(n)), e.value ? e.value = e.value.transform(n) : e.body = l(e.body, n);
    }
    mr.prototype = {
        visit: function(e, n) {
            this.push(e), !this.callback(e, n || Mn) && n && n(), this.pop();
        },
        parent: function(e) {
            return this.stack[this.stack.length - 2 - (e || 0)];
        },
        push: function(e) {
            e instanceof _t ? this.directives = Object.create(this.directives) : e instanceof Kn && !this.directives[e.value] && (this.directives[e.value] = e),
            this.stack.push(e);
        },
        pop: function() {
            this.stack.pop() instanceof _t && (this.directives = Object.getPrototypeOf(this.directives));
        },
        self: function() {
            return this.stack[this.stack.length - 1];
        },
        find_parent: function(e) {
            for (var n = this.stack, t = n.length; 0 <= --t; ) {
                var i = n[t];
                if (i instanceof e) return i;
            }
        },
        has_directive: function(e) {
            var n = this.directives[e];
            if (n) return n;
            var t = this.stack[this.stack.length - 1];
            if (t instanceof vt) for (var i = 0; i < t.body.length; ++i) {
                var r = t.body[i];
                if (!(r instanceof Kn)) break;
                if (r.value == e) return r;
            }
        },
        loopcontrol_target: function(e) {
            var n, t = this.stack;
            if (e.label) {
                for (var i = t.length; 0 <= --i; ) if ((n = t[i]) instanceof ot && n.label.name == e.label.name) return n.body;
            } else for (i = t.length; 0 <= --i; ) if ((n = t[i]) instanceof at || e instanceof Vt && n instanceof Jt) return n;
        },
        in_boolean_context: function() {
            for (var e, n = this.self(), t = 0; e = this.parent(t); t++) {
                if (e instanceof Ei && e.condition === n || e instanceof st && e.condition === n || e instanceof ut && e.condition === n || e instanceof Gt && e.condition === n || e instanceof Bt && e.in_bool || e instanceof hi && e.tail_node() !== n || e instanceof et || e instanceof wi && "!" == e.operator && e.expression === n) return !0;
                if (e instanceof ki && ("&&" == e.operator || "||" == e.operator) || e instanceof Ei || e.tail_node() === n) n = e; else {
                    if (!(e instanceof Bt)) return !1;
                    for (var i, r = e; i = this.parent(++t); r = i) if ("Call" == i.TYPE) {
                        if (!(r instanceof _t) || r.name) return !1;
                    } else if (r instanceof _t) return !1;
                }
            }
        }
    }, _r.prototype = new mr(), (u = function(e, r) {
        e.DEFMETHOD("transform", function(e, n) {
            var t, i;
            return e.push(this), void 0 === (t = e.before ? e.before(this, r, n) : t) && (r(t = this, e),
            e.after && void 0 !== (i = e.after(t, n)) && (t = i)), e.pop(), t;
        });
    })(Gn, Mn), u(ot, function(e, n) {
        e.label = e.label.transform(n), e.body = e.body.transform(n);
    }), u(et, function(e, n) {
        e.body = e.body.transform(n);
    }), u(it, function(e, n) {
        e.body = l(e.body, n);
    }), u(ft, function(e, n) {
        e.body = e.body.transform(n), e.condition = e.condition.transform(n);
    }), u(ct, function(e, n) {
        e.condition = e.condition.transform(n), e.body = e.body.transform(n);
    }), u(ut, function(e, n) {
        e.init && (e.init = e.init.transform(n)), e.condition && (e.condition = e.condition.transform(n)),
        e.step && (e.step = e.step.transform(n)), e.body = e.body.transform(n);
    }), u(lt, function(e, n) {
        e.init = e.init.transform(n), e.object = e.object.transform(n), e.body = e.body.transform(n);
    }), u(ht, function(e, n) {
        e.expression = e.expression.transform(n), e.body = e.body.transform(n);
    }), u(Rt, function(e, n) {
        e.value && (e.value = e.value.transform(n));
    }), u(Ut, function(e, n) {
        e.label && (e.label = e.label.transform(n));
    }), u(Gt, function(e, n) {
        e.condition = e.condition.transform(n), e.body = e.body.transform(n), e.alternative && (e.alternative = e.alternative.transform(n));
    }), u(Jt, function(e, n) {
        e.expression = e.expression.transform(n), e.body = l(e.body, n);
    }), u(Qt, function(e, n) {
        e.expression = e.expression.transform(n), e.body = l(e.body, n);
    }), u(Zt, function(e, n) {
        e.body = l(e.body, n), e.bcatch && (e.bcatch = e.bcatch.transform(n)), e.bfinally && (e.bfinally = e.bfinally.transform(n));
    }), u(ei, function(e, n) {
        e.argname && (e.argname = e.argname.transform(n)), e.body = l(e.body, n);
    }), u(ti, function(e, n) {
        e.definitions = l(e.definitions, n);
    }), u(ai, function(e, n) {
        e.name = e.name.transform(n), e.value && (e.value = e.value.transform(n));
    }), u(li, function(e, n) {
        e.name = e.name.transform(n), e.value = e.value.transform(n);
    }), u(_t, function(e, n) {
        e.name && (e.name = e.name.transform(n)), e.argnames = l(e.argnames, n), e.rest && (e.rest = e.rest.transform(n)),
        e.body = l(e.body, n);
    }), u(Et, p), u(St, p), u(Ft, function(e, n) {
        e.name && (e.name = e.name.transform(n)), e.extends && (e.extends = e.extends.transform(n)),
        e.properties = l(e.properties, n);
    }), u(Nt, function(e, n) {
        e.key instanceof Gn && (e.key = e.key.transform(n)), e.value && (e.value = e.value.transform(n));
    }), u(pi, function(e, n) {
        e.expression = e.expression.transform(n), e.args = l(e.args, n);
    }), u(hi, function(e, n) {
        e.expressions = l(e.expressions, n);
    }), u(Ti, function(e, n) {
        e.expression = e.expression.transform(n);
    }), u(Ai, function(e, n) {
        e.expression && (e.expression = e.expression.transform(n));
    }), u(_i, function(e, n) {
        e.expression = e.expression.transform(n);
    }), u(gi, function(e, n) {
        e.expression = e.expression.transform(n), e.property = e.property.transform(n);
    }), u(bi, function(e, n) {
        e.expression = e.expression.transform(n);
    }), u(yi, function(e, n) {
        e.expression = e.expression.transform(n);
    }), u(ki, function(e, n) {
        e.left = e.left.transform(n), e.right = e.right.transform(n);
    }), u(Ei, function(e, n) {
        e.condition = e.condition.transform(n), e.consequent = e.consequent.transform(n),
        e.alternative = e.alternative.transform(n);
    }), u(Di, function(e, n) {
        e.elements = l(e.elements, n);
    }), u($i, function(e, n) {
        e.elements = l(e.elements, n), e.rest && (e.rest = e.rest.transform(n));
    }), u(zi, function(e, n) {
        e.key instanceof Gn && (e.key = e.key.transform(n)), e.value = e.value.transform(n);
    }), u(qi, function(e, n) {
        e.properties = l(e.properties, n), e.rest && (e.rest = e.rest.transform(n));
    }), u(Ci, function(e, n) {
        e.properties = l(e.properties, n);
    }), u(Mi, function(e, n) {
        e.key instanceof Gn && (e.key = e.key.transform(n)), e.value = e.value.transform(n);
    }), u(si, function(e, n) {
        e.body = e.body.transform(n);
    }), u(fi, function(e, n) {
        e.body = e.body.transform(n);
    }), u(ci, function(e, n) {
        e.properties = l(e.properties, n);
    }), u(ui, function(e, n) {
        e.all && (e.all = e.all.transform(n)), e.default && (e.default = e.default.transform(n)),
        e.properties && (e.properties = l(e.properties, n));
    }), u(tr, function(e, n) {
        e.tag && (e.tag = e.tag.transform(n)), e.expressions = l(e.expressions, n);
    });
    var j = [ "abstract async await boolean byte char double enum export final float goto implements import int interface let long native package private protected public short static super synchronized this throws transient volatile yield", A = "false null true", de = "break case catch class const continue debugger default delete do else extends finally for function if in instanceof new return switch throw try typeof var void while with" ].join(" "), T = "return new delete throw else case", de = Bn(de), j = Bn(j), T = Bn(T), A = Bn(A), D = /^0b([01]+)$/i, O = /^0x([0-9a-f]+)$/i, $ = /^0o?([0-7]+)$/i, z = Bn([ "in", "instanceof", "typeof", "new", "void", "delete", "++", "--", "+", "-", "!", "~", "&", "|", "^", "*", "/", "%", "**", ">>", "<<", ">>>", "<", ">", "<=", ">=", "==", "===", "!=", "!==", "?", "=", "+=", "-=", "/=", "*=", "%=", "**=", ">>=", "<<=", ">>>=", "&=", "|=", "^=", "&&", "||", "??", "&&=", "||=", "??=" ]), q = "\n\r\u2028\u2029", C = "+-*&%=<>!?|~^", he = ",;:)}]", M = "[{(,;:", P = M + "`)}]", N = q + "  \t\f\v​             　\ufeff", I = Bn(e("./'\"#" + C + P + N));
    function R(e) {
        return 56320 <= e && e <= 57343;
    }
    function H(e) {
        return 48 <= e && e <= 57;
    }
    function B(e) {
        return !I[e];
    }
    function gr(e) {
        return /^[a-z_$][a-z0-9_$]*$/i.test(e);
    }
    function br(e) {
        switch (e[0]) {
          case "b":
            return "\b";

          case "f":
            return "\f";

          case "n":
            return "\n";

          case "r":
            return "\r";

          case "t":
            return "\t";

          case "u":
            if ("{" == e[1] && "}" == e.slice(-1)) n = e.slice(2, -1); else {
                if (5 != e.length) return;
                n = e.slice(1);
            }
            return (n = parseInt(n, 16)) < 0 || isNaN(n) ? void 0 : n < 65536 ? String.fromCharCode(n) : 1114111 < n ? void 0 : String.fromCharCode(55232 + (n >> 10)) + String.fromCharCode(56320 + (1023 & n));

          case "v":
            return "\v";

          case "x":
            return 3 != e.length ? void 0 : (n = parseInt(e.slice(1), 16)) < 0 || isNaN(n) ? void 0 : String.fromCharCode(n);
            var n;

          case "\r":
          case "\n":
            return "";

          default:
            return "0" == e ? "\0" : "0" <= e[0] && e[0] <= "9" ? void 0 : e;
        }
    }
    function yr(e, n, t, i, r) {
        this.message = e, this.filename = n, this.line = t, this.col = i, this.pos = r;
    }
    function ve(e, n, t, i, r) {
        throw new yr(e, n, t, i, r);
    }
    function me(e, n, t) {
        return e.type == n && (null == t || e.value == t);
    }
    q = Bn(e(q)), C = Bn(e(C)), he = Bn(e(he)), M = Bn(e(M)), P = Bn(e(P)), N = Bn(e(N)),
    ((yr.prototype = Object.create(Error.prototype)).constructor = yr).prototype.name = "SyntaxError",
    n(yr);
    var L = {};
    function _e(i, r, o, a) {
        var s = {
            text: i,
            filename: r,
            pos: 0,
            tokpos: 0,
            line: 1,
            tokline: 0,
            col: 0,
            tokcol: 0,
            newline_before: !1,
            regex_allowed: !1,
            comments_before: [],
            directives: {},
            directive_stack: [],
            read_template: e("Unterminated template literal", function(e) {
                for (var n = ""; ;) {
                    var t = i();
                    switch (t) {
                      case "\\":
                        t += i();
                        break;

                      case "`":
                        return void e.push(n);

                      case "$":
                        if ("{" == c()) return u(), e.push(n), s.regex_allowed = !0;
                    }
                    n += t;
                }
                function i() {
                    var e = u(!0, !0);
                    return "\r" == e ? "\n" : e;
                }
            })
        }, f = !1;
        function c() {
            return s.text.charAt(s.pos);
        }
        function u(e, n) {
            var t = s.text.charAt(s.pos++);
            if (e && !t) throw L;
            return q[t] ? (s.col = 0, s.line++, n || (s.newline_before = !0), "\r" == t && "\n" == c() && (s.pos++,
            t = "\n")) : s.col++, t;
        }
        function l(e) {
            for (;0 < e--; ) u();
        }
        function p(e) {
            return s.text.substr(s.pos, e.length) == e;
        }
        function d() {
            s.tokline = s.line, s.tokcol = s.col, s.tokpos = s.pos;
        }
        function h(e, n, t) {
            s.regex_allowed = "operator" == e && !wr[n] || "keyword" == e && T[n] || "punc" == e && M[n],
            "punc" == e && "." == n ? f = !0 : t || (f = !1);
            n = {
                type: e,
                value: n,
                line: s.tokline,
                col: s.tokcol,
                pos: s.tokpos,
                endline: s.line,
                endcol: s.col,
                endpos: s.pos,
                nlb: s.newline_before,
                file: r
            };
            return /^(?:num|string|regexp)$/i.test(e) && (n.raw = i.substring(n.pos, n.endpos)),
            t || (n.comments_before = s.comments_before, n.comments_after = s.comments_before = []),
            s.newline_before = !1, new Y(n);
        }
        function v(e) {
            ve(e, r, s.tokline, s.tokcol, s.tokpos);
        }
        function m(e) {
            return /^0[0-7_]+$/.test(e);
        }
        function _(e) {
            var t = !1, i = !1, r = !1, o = "." == e, n = function(e) {
                for (var n, t = ""; (n = c()) && e(n, t); ) t += u();
                return t;
            }(function(e, n) {
                switch (e) {
                  case "x":
                  case "X":
                    return !r && (r = !0);

                  case "e":
                  case "E":
                    return r || !t && (t = i = !0);

                  case "+":
                  case "-":
                    return i;

                  case i = !1, ".":
                    return !(o || t || r || m(n)) && (o = !0);
                }
                return /[_0-9a-dfo]/i.test(e);
            });
            m(n = e ? e + n : n) ? S.has_directive("use strict") && v("Legacy octal literals are not allowed in strict mode") : n = n.replace(r ? /([1-9a-f]|.0)_(?=[0-9a-f])/gi : /([1-9]|.0)_(?=[0-9])/gi, "$1");
            e = function(e) {
                if (n = D.exec(e)) return parseInt(n[1], 2);
                if (n = O.exec(e)) return parseInt(n[1], 16);
                if (n = $.exec(e)) return parseInt(n[1], 8);
                var n = parseFloat(e);
                return n == e ? n : void 0;
            }(n);
            return isNaN(e) && v("Invalid syntax: " + n), o || t || "n" != c() ? h("num", e) : h("bigint", n.toLowerCase() + u());
        }
        function g(e) {
            var n = u(!0, e);
            if ("0" <= n && n <= "7") return function(e) {
                var n = c();
                "0" <= n && n <= "7" && (e += u(!0))[0] <= "3" && "0" <= (n = c()) && n <= "7" && (e += u(!0));
                if ("0" === e) return "\0";
                0 < e.length && S.has_directive("use strict") && v("Legacy octal escape sequences are not allowed in strict mode");
                return String.fromCharCode(parseInt(e, 8));
            }(n);
            if ("u" == n) {
                var t = u(!0, e);
                if (n += t, "{" != t) n += u(!0, e) + u(!0, e) + u(!0, e); else for (;n += t = u(!0, e),
                "}" != t; );
            } else "x" == n && (n += u(!0, e) + u(!0, e));
            var i = br(n);
            return "string" != typeof i && v("Invalid escape sequence: \\" + n), i;
        }
        var b = e("Unterminated string constant", function(e) {
            for (var n = u(), t = ""; ;) {
                var i = u(!0, !0);
                if ("\\" == i) i = g(!0); else if (q[i]) v("Unterminated string constant"); else if (i == n) break;
                t += i;
            }
            var r = h("string", t);
            return r.quote = e, r;
        });
        function y(e) {
            var n, t = s.regex_allowed, i = function() {
                for (var e = s.text, n = s.pos; n < s.text.length; ++n) if (q[e[n]]) return n;
                return -1;
            }();
            return -1 == i ? (n = s.text.substr(s.pos), s.pos = s.text.length) : (n = s.text.substring(s.pos, i),
            s.pos = i), s.col = s.tokcol + (s.pos - s.tokpos), s.comments_before.push(h(e, n, !0)),
            s.regex_allowed = t, S;
        }
        var w = e("Unterminated multiline comment", function() {
            var e = s.regex_allowed, n = function(e, n) {
                if (e = s.text.indexOf(e, s.pos), n && -1 == e) throw L;
                return e;
            }("*/", !0), n = s.text.substring(s.pos, n).replace(/\r\n|\r|\u2028|\u2029/g, "\n");
            return l(n.length + 2), s.comments_before.push(h("comment2", n, !0)), s.regex_allowed = e,
            S;
        });
        function x() {
            for (var e, n, t = !1, i = !1, r = "#" == c() ? u() : ""; e = c(); ) if (t) "u" != e && v("Expecting UnicodeEscapeSequence -- uXXXX"),
            B(e = g()) || v("Unicode char: " + e.charCodeAt(0) + " is not valid in identifier"),
            r += e, t = !1; else if ("\\" == e) i = t = !0, u(); else {
                if (!B(e)) break;
                r += u();
            }
            return de[r] && i && (n = r.charCodeAt(0).toString(16).toUpperCase(), r = "\\u" + "0000".substr(n.length) + n + r.slice(1)),
            r;
        }
        var k = e("Unterminated regular expression", function(e) {
            for (var n, t = !1, i = !1; n = u(!0); ) if (q[n]) v("Unexpected line terminator"); else if (t) e += "\\" + n,
            t = !1; else if ("[" == n) i = !0, e += n; else if ("]" == n && i) i = !1, e += n; else {
                if ("/" == n && !i) break;
                "\\" == n ? t = !0 : e += n;
            }
            var r = x();
            try {
                var o = new RegExp(e, r);
                return o.raw_source = e, h("regexp", o);
            } catch (e) {
                v(e.message);
            }
        });
        function E(e) {
            return h("operator", function e(n) {
                if (!c()) return n;
                var t = n + c();
                return z[t] ? (u(), e(t)) : n;
            }(e || u()));
        }
        function e(n, t) {
            return function(e) {
                try {
                    return t(e);
                } catch (e) {
                    if (e !== L) throw e;
                    v(n);
                }
            };
        }
        function S(e) {
            if (null != e) return k(e);
            for (a && 0 == s.pos && p("#!") && (d(), l(2), y("comment5")); ;) {
                if (!function() {
                    for (;N[c()]; ) u();
                }(), d(), o) {
                    if (p("\x3c!--")) {
                        l(4), y("comment3");
                        continue;
                    }
                    if (p("--\x3e") && s.newline_before) {
                        l(3), y("comment4");
                        continue;
                    }
                }
                var n = c();
                if (!n) return h("eof");
                var t = n.charCodeAt(0);
                switch (t) {
                  case 34:
                  case 39:
                    return b(n);

                  case 46:
                    return function() {
                        u();
                        var e = c();
                        if ("." != e) return H(e.charCodeAt(0)) ? _(".") : h("punc", ".");
                        for (var n = "."; n += ".", u(), "." == c(); );
                        return h("operator", n);
                    }();

                  case 47:
                    var i = function() {
                        switch (u(), c()) {
                          case "/":
                            return u(), y("comment1");

                          case "*":
                            return u(), w();
                        }
                        return s.regex_allowed ? k("") : E("/");
                    }();
                    if (i === S) continue;
                    return i;
                }
                if (H(t)) return _();
                if (P[n]) return h("punc", u());
                if (p("=>")) return h("punc", u() + u());
                if (C[n]) return E();
                if (35 == t || 92 == t || !I[n]) return t = void 0, t = x(), f ? h("name", t) : A[t] ? h("atom", t) : de[t] ? z[t] ? h("operator", t) : h("keyword", t) : h("name", t);
                break;
            }
            v("Unexpected character '" + n + "'");
        }
        return S.context = function(e) {
            return s = e ? e : s;
        }, S.add_directive = function(e) {
            s.directive_stack[s.directive_stack.length - 1].push(e), s.directives[e] ? s.directives[e]++ : s.directives[e] = 1;
        }, S.push_directives_stack = function() {
            s.directive_stack.push([]);
        }, S.pop_directives_stack = function() {
            for (var e = s.directive_stack.pop(), n = e.length; 0 <= --n; ) s.directives[e[n]]--;
        }, S.has_directive = function(e) {
            return 0 < s.directives[e];
        }, S;
    }
    var ge = Bn("typeof void delete -- ++ ! ~ - +"), wr = Bn("-- ++"), be = Bn("= += -= /= *= %= **= >>= <<= >>>= &= |= ^= &&= ||= ??="), xr = function(e, n) {
        for (var t = 0; t < e.length; ) for (var i = e[t++], r = 0; r < i.length; r++) n[i[r]] = t;
        return n;
    }([ [ "??" ], [ "||" ], [ "&&" ], [ "|" ], [ "^" ], [ "&" ], [ "==", "===", "!=", "!==" ], [ "<", ">", "<=", ">=", "in", "instanceof" ], [ ">>", "<<", ">>>" ], [ "+", "-" ], [ "*", "/", "%" ], [ "**" ] ], {}), ye = Bn("atom bigint num regexp string");
    function kr(e, l) {
        l = oe(l, {
            bare_returns: !1,
            expression: !1,
            filename: null,
            html5_comments: !0,
            shebang: !0,
            strict: !1,
            toplevel: null
        }, !0);
        var h = {
            input: "string" == typeof e ? _e(e, l.filename, l.html5_comments, l.shebang) : e,
            in_async: !1,
            in_directives: !0,
            in_funarg: -1,
            in_function: 0,
            in_generator: !1,
            in_loop: 0,
            labels: [],
            peeked: null,
            prev: null,
            token: null
        };
        function v(e, n) {
            return me(h.token, e, n);
        }
        function p() {
            return h.peeked || (h.peeked = h.input());
        }
        function m() {
            return h.prev = h.token, h.peeked ? (h.token = h.peeked, h.peeked = null) : h.token = h.input(),
            h.in_directives = h.in_directives && ("string" == h.token.type || v("punc", ";")),
            h.token;
        }
        function _() {
            return h.prev;
        }
        function f(e, n, t, i) {
            var r = h.input.context();
            ve(e, r.filename, null != n ? n : r.tokline, null != t ? t : r.tokcol, null != i ? i : r.tokpos);
        }
        function a(e, n) {
            f(n, e.line, e.col);
        }
        function t(e, n) {
            return e + (void 0 === n ? "" : " «" + n + "»");
        }
        function g(e) {
            a(e = null == e ? h.token : e, "Unexpected token: " + t(e.type, e.value));
        }
        function d(e, n) {
            if (v(e, n)) return m();
            a(h.token, "Unexpected token: " + t(h.token.type, h.token.value) + ", expected: " + t(e, n));
        }
        function b(e) {
            return d("punc", e);
        }
        function s(e) {
            return e.nlb || !Ln(e.comments_before, function(e) {
                return !e.nlb;
            });
        }
        function c() {
            return !l.strict && (v("eof") || v("punc", "}") || s(h.token));
        }
        function y(e) {
            v("punc", ";") ? m() : e || c() || b(";");
        }
        function u() {
            b("(");
            var e = ie();
            return b(")"), e;
        }
        function n(i) {
            return function() {
                var e = h.token, n = i.apply(null, arguments), t = _();
                return n.start = e, n.end = t, n;
            };
        }
        function w() {
            (v("operator", "/") || v("operator", "/=")) && (h.peeked = null, h.token = h.input(h.token.value.substr(1)));
        }
        h.token = m();
        var x = n(function() {
            switch (w(), h.token.type) {
              case "string":
                var e = h.in_directives, n = ie();
                return e && (n instanceof rr ? (o = n.start.raw.slice(1, -1), h.input.add_directive(o),
                n.value = o) : h.in_directives = e = !1), y(), e ? new Kn(n) : new et({
                    body: n
                });

              case "num":
              case "bigint":
              case "regexp":
              case "operator":
              case "atom":
                return k();

              case "name":
                switch (h.token.value) {
                  case "async":
                    if (me(p(), "keyword", "function")) return m(), m(), v("operator", "*") ? (m(),
                    O(qt)) : O(zt);
                    break;

                  case "await":
                    if (h.in_async) return k();
                    break;

                  case "export":
                    return m(), function() {
                        if (v("operator", "*")) {
                            m();
                            var e = "*";
                            v("name", "as") && (m(), $() || d("name"), e = h.token.value, m()), d("name", "from");
                            var n = h.token;
                            return d("string"), y(), new ce({
                                aliases: [ e ],
                                keys: [ "*" ],
                                path: n.value,
                                quote: n.quote
                            });
                        }
                        if (v("punc", "{")) {
                            m();
                            for (var t = [], i = []; $(); ) {
                                var r = h.token;
                                m(), i.push(r), v("name", "as") ? (m(), $() || d("name"), t.push(h.token.value),
                                m()) : t.push(r.value), v("punc", "}") || b(",");
                            }
                            if (b("}"), v("name", "from")) {
                                m();
                                n = h.token;
                                return d("string"), y(), new ce({
                                    aliases: t,
                                    keys: i.map(function(e) {
                                        return e.value;
                                    }),
                                    path: n.value,
                                    quote: n.quote
                                });
                            }
                            return y(), new ci({
                                properties: i.map(function(e, n) {
                                    me(e, "name") || a(e, "Name expected");
                                    e = U(Ki, e);
                                    return e.alias = t[n], e;
                                })
                            });
                        }
                        if (v("keyword", "default")) {
                            m();
                            e = h.token, n = function() {
                                if (v("name", "async")) {
                                    if (me(p(), "keyword", "function")) return m(), m(), v("operator", "*") ? (m(),
                                    z(qt, O(At))) : z(zt, O(Tt));
                                } else if (v("keyword")) switch (h.token.value) {
                                  case "class":
                                    return m(), z(jt, T(Pt));

                                  case "function":
                                    return (m(), v("operator", "*")) ? (m(), z(Mt, O(Ot))) : z(Ct, O(Dt));
                                }
                            }();
                            return n ? (n.start = e, n.end = _()) : (w(), n = ie(), y()), new fi({
                                body: n
                            });
                        }
                        return new si({
                            body: q()
                        });
                    }();

                  case "import":
                    var t = p();
                    if ("punc" != t.type || !/^[(.]$/.test(t.value)) return m(), function() {
                        var e, n = null, t = W(Ri, !0), i = null;
                        if (t ? (t.key = "", v("punc", ",") && m()) : !v("string")) if (v("operator", "*")) m(),
                        d("name", "as"), (n = W(Ri)).key = "*"; else {
                            for (b("{"), i = []; $(); ) {
                                var r;
                                me(p(), "name", "as") ? (r = h.token.value, m(), m(), (e = W(Ri)).key = r) : (e = W(Ri)).key = e.name,
                                i.push(e), v("punc", "}") || b(",");
                            }
                            b("}");
                        }
                        (n || t || i) && d("name", "from");
                        var o = h.token;
                        return d("string"), y(), new ui({
                            all: n,
                            default: t,
                            path: o.value,
                            properties: i,
                            quote: o.quote
                        });
                    }();
                    break;

                  case "let":
                    if (F()) {
                        m();
                        var i = P();
                        return y(), i;
                    }
                    break;

                  case "yield":
                    if (h.in_generator) return k();
                }
                return (me(p(), "punc", ":") ? function() {
                    var n = W(le);
                    Ln(h.labels, function(e) {
                        return e.name != n.name;
                    }) || f("Label " + n.name + " defined twice");
                    b(":"), h.labels.push(n);
                    var e = x();
                    h.labels.pop(), e instanceof at || n.references.forEach(function(e) {
                        e instanceof Wt && a(e.label.start, "Continue label `" + n.name + "` must refer to IterationStatement");
                    });
                    return new ot({
                        body: e,
                        label: n
                    });
                } : k)();

              case "punc":
                switch (h.token.value) {
                  case "{":
                    return new rt({
                        start: h.token,
                        body: C(),
                        end: _()
                    });

                  case "[":
                  case "(":
                  case "`":
                    return k();

                  case ";":
                    return h.in_directives = !1, m(), new Qn();

                  default:
                    g();
                }

              case "keyword":
                switch (h.token.value) {
                  case "break":
                    return m(), E(Vt);

                  case "class":
                    return m(), T(jt);

                  case "const":
                    m();
                    i = j();
                    return y(), i;

                  case "continue":
                    return m(), E(Wt);

                  case "debugger":
                    return m(), y(), new Xn();

                  case "do":
                    m();
                    n = re(x);
                    d("keyword", "while");
                    var r = u();
                    return y(!0), new ft({
                        body: n,
                        condition: r
                    });

                  case "while":
                    return m(), new ct({
                        condition: u(),
                        body: re(x)
                    });

                  case "for":
                    return m(), function() {
                        var e = v("name", "await") && m();
                        b("(");
                        var n, t = null;
                        if ((e || !v("punc", ";")) && (t = v("keyword", "const") ? (m(), j(!0)) : v("name", "let") && F() ? (m(),
                        P(!0)) : v("keyword", "var") ? (m(), N(!0)) : ie(!0), e ? (d("name", "of"), n = dt) : v("operator", "in") ? (m(),
                        n = pt) : v("name", "of") && (m(), n = ae), n)) return t instanceof ti ? (1 < t.definitions.length && a(t.start, "Only one variable declaration allowed in for..in/of loop"),
                        n !== pt && t.definitions[0].value && a(t.definitions[0].value.start, "No initializers allowed in for..of loop")) : ee(t) || (t = ne(t)) instanceof Oi || a(t.start, "Invalid left-hand side in for..in/of loop"),
                        function(e, n) {
                            w();
                            var t = ie();
                            return b(")"), new e({
                                init: n,
                                object: t,
                                body: re(x)
                            });
                        }(n, t);
                        return function(e) {
                            b(";");
                            var n = v("punc", ";") ? null : ie();
                            b(";");
                            var t = v("punc", ")") ? null : ie();
                            return b(")"), new ut({
                                init: e,
                                condition: n,
                                step: t,
                                body: re(x)
                            });
                        }(t);
                    }();

                  case "function":
                    return (m(), v("operator", "*")) ? (m(), O(Mt)) : O(Ct);

                  case "if":
                    return m(), function() {
                        var e = u(), n = x(), t = null;
                        v("keyword", "else") && (m(), t = x());
                        return new Gt({
                            condition: e,
                            body: n,
                            alternative: t
                        });
                    }();

                  case "return":
                    0 != h.in_function || l.bare_returns || f("'return' outside of function"), m();
                    var o = null;
                    return v("punc", ";") ? m() : c() || (o = ie(), y()), new Bt({
                        value: o
                    });

                  case "switch":
                    return m(), new Jt({
                        expression: u(),
                        body: re(M)
                    });

                  case "throw":
                    m(), s(h.token) && f("Illegal newline after 'throw'");
                    o = ie();
                    return y(), new Lt({
                        value: o
                    });

                  case "try":
                    return m(), function() {
                        var e = C(), n = null, t = null;
                        {
                            var i;
                            v("keyword", "catch") && (r = h.token, m(), i = null, v("punc", "(") && (m(), i = G(Ji),
                            b(")")), n = new ei({
                                start: r,
                                argname: i,
                                body: C(),
                                end: _()
                            }));
                        }
                        {
                            var r;
                            v("keyword", "finally") && (r = h.token, m(), t = new ni({
                                start: r,
                                body: C(),
                                end: _()
                            }));
                        }
                        n || t || f("Missing catch/finally blocks");
                        return new Zt({
                            body: e,
                            bcatch: n,
                            bfinally: t
                        });
                    }();

                  case "var":
                    m();
                    i = N();
                    return y(), i;

                  case "with":
                    return h.input.has_directive("use strict") && f("Strict mode may not include a with statement"),
                    m(), new ht({
                        expression: u(),
                        body: x()
                    });
                }
            }
            g();
        });
        function k() {
            var e = ie();
            return y(), new et({
                body: e
            });
        }
        function E(e) {
            var n, t = null;
            null != (t = !c() ? W(pe, !0) : t) ? ((n = Cn(function(e) {
                return e.name == t.name;
            }, h.labels)) || a(t.start, "Undefined label " + t.name), t.thedef = n) : 0 == h.in_loop && f(e.TYPE + " not inside a loop or switch"),
            y();
            e = new e({
                label: t
            });
            return n && n.references.push(e), e;
        }
        function S(e) {
            if (v("name", e)) {
                e = p();
                if (e && !me(e, "operator", "=") && !("punc" == e.type && /^[(;}]$/.test(e.value) || s(e))) return m();
            }
        }
        function T(e) {
            var n = h.in_async, t = h.in_generator;
            h.input.push_directives_stack(), h.input.add_directive("use strict");
            var i = e === jt ? W(ue) : W(Gi, !0), r = null;
            v("keyword", "extends") && (m(), w(), r = I(!0)), b("{");
            for (var o = []; !v("punc", "}"); ) if (v("punc", ";")) m(); else {
                var a = h.token, s = !!S("static"), f = S("async");
                if (v("operator", "*")) {
                    m();
                    var c = v("name") && /^#/.test(h.token.value), u = L(), l = h.token, p = O(f ? At : Ot);
                    p.start = l, p.end = _(), o.push(new Ht({
                        start: a,
                        static: s,
                        private: c,
                        key: u,
                        value: p,
                        end: _()
                    }));
                } else {
                    c = v("name") && /^#/.test(h.token.value), u = L();
                    if (v("punc", "(")) {
                        l = h.token, p = O(f ? Tt : Dt);
                        p.start = l, p.end = _(), o.push(new Ht({
                            start: a,
                            static: s,
                            private: c,
                            key: u,
                            value: p,
                            end: _()
                        }));
                    } else {
                        f && g(f);
                        f = null;
                        if (v("operator", "=")) m(), h.in_async = !1, h.in_generator = !1, f = te(), h.in_generator = t,
                        h.in_async = n; else if (!v("punc", ";") && !v("punc", "}")) {
                            var d = null;
                            switch (u) {
                              case "get":
                                d = se;
                                break;

                              case "set":
                                d = fe;
                            }
                            if (d) {
                                o.push(new d({
                                    start: a,
                                    static: s,
                                    private: v("name") && /^#/.test(h.token.value),
                                    key: L(),
                                    value: R(),
                                    end: _()
                                }));
                                continue;
                            }
                        }
                        y(), o.push(new It({
                            start: a,
                            static: s,
                            private: c,
                            key: u,
                            value: f,
                            end: _()
                        }));
                    }
                }
            }
            return m(), h.input.pop_directives_stack(), h.in_generator = t, h.in_async = n,
            new e({
                extends: r,
                name: i,
                properties: o
            });
        }
        function A(e) {
            if (e instanceof Di) {
                var n = null;
                return e.elements[e.elements.length - 1] instanceof bi && (n = A(e.elements.pop().expression)),
                new $i({
                    start: e.start,
                    elements: e.elements.map(A),
                    rest: n,
                    end: e.end
                });
            }
            if (e instanceof Si) return new li({
                start: e.start,
                name: A(e.left),
                value: e.right,
                end: e.end
            });
            if (e instanceof li) return e.name = A(e.name), e;
            if (e instanceof $i) return e.elements = e.elements.map(A), e.rest && (e.rest = A(e.rest)),
            e;
            if (e instanceof qi) return e.properties.forEach(function(e) {
                e.value = A(e.value);
            }), e.rest && (e.rest = A(e.rest)), e;
            if (e instanceof lr) return e;
            if (e instanceof Ci) {
                n = null;
                return e.properties[e.properties.length - 1] instanceof bi && (n = A(e.properties.pop().expression)),
                new qi({
                    start: e.start,
                    properties: e.properties.map(function(e) {
                        return e instanceof Fi || a(e.start, "Invalid destructuring assignment"), new zi({
                            start: e.start,
                            key: e.key,
                            value: A(e.value),
                            end: e.end
                        });
                    }),
                    rest: n,
                    end: e.end
                });
            }
            return e instanceof Ui ? e : e instanceof Xi ? new Ui(e) : void a(e.start, "Invalid arrow parameter");
        }
        function D(e, n, t) {
            var i = h.in_async, r = h.in_generator;
            h.in_async = t, h.in_generator = !1;
            var o = h.in_funarg;
            h.in_funarg = h.in_function;
            var a, s = e.map(A), f = (f = e.rest || null) && A(f);
            h.in_funarg = o, b("=>");
            var c = h.in_loop, u = h.labels;
            ++h.in_function, h.in_directives = !0, h.input.push_directives_stack(), h.in_loop = 0,
            h.labels = [];
            e = v("punc", "{") ? (a = C(), null) : (a = [], w(), te()), o = h.input.has_directive("use strict");
            h.input.pop_directives_stack(), --h.in_function, h.in_loop = c, h.labels = u, h.in_generator = r,
            h.in_async = i;
            e = new (t ? St : Et)({
                start: n,
                argnames: s,
                rest: f,
                body: a,
                value: e,
                end: _()
            });
            return o && e.each_argname(V), e;
        }
        var O = function(e) {
            var n, t = h.in_async, i = h.in_generator;
            /Defun$/.test(e.TYPE) ? (n = W(Vi), h.in_async = /^Async/.test(e.TYPE), h.in_generator = /Generator/.test(e.TYPE)) : (h.in_async = /^Async/.test(e.TYPE),
            h.in_generator = /Generator/.test(e.TYPE), n = W(Wi, !0)), !n || e === gt || n instanceof Hi || g(_()),
            b("(");
            var r = h.in_funarg;
            h.in_funarg = h.in_function;
            var o = H(")", !l.strict, !1, function() {
                return J(Ui);
            });
            h.in_funarg = r;
            var a = h.in_loop, s = h.labels;
            ++h.in_function, h.in_directives = !0, h.input.push_directives_stack(), h.in_loop = 0,
            h.labels = [];
            var f = C(), r = h.input.has_directive("use strict");
            h.input.pop_directives_stack(), --h.in_function, h.in_loop = a, h.labels = s, h.in_generator = i,
            h.in_async = t;
            f = new e({
                name: n,
                argnames: o,
                rest: o.rest || null,
                body: f
            });
            return r && (n && V(n), f.each_argname(V)), f;
        };
        function $() {
            return v("name") || gr(h.token.value);
        }
        function z(e, n) {
            return n.name && ((n = new e(n)).name = new (e === jt ? ue : Vi)(n.name)), n;
        }
        var q = n(function() {
            if (v("name")) switch (h.token.value) {
              case "async":
                return (m(), d("keyword", "function"), v("operator", "*")) ? (m(), O(qt)) : O(zt);

              case "let":
                m();
                var e = P();
                return y(), e;
            } else if (v("keyword")) switch (h.token.value) {
              case "class":
                return m(), T(jt);

              case "const":
                m();
                e = j();
                return y(), e;

              case "function":
                return (m(), v("operator", "*")) ? (m(), O(Mt)) : O(Ct);

              case "var":
                m();
                e = N();
                return y(), e;
            }
            g();
        });
        function C() {
            b("{");
            for (var e = []; !v("punc", "}"); ) v("eof") && b("}"), e.push(x());
            return m(), e;
        }
        function M() {
            b("{");
            for (var e, n, t, i, r = []; !v("punc", "}"); ) v("eof") && b("}"), v("keyword", "case") ? (e && (e.end = _()),
            n = [], e = new Qt({
                start: (i = h.token, m(), i),
                expression: ie(),
                body: n
            }), r.push(e), b(":")) : v("keyword", "default") ? (e && (e.end = _()), t && f("More than one default clause in switch statement"),
            n = [], e = new Kt({
                start: (i = h.token, m(), b(":"), i),
                body: n
            }), r.push(e), t = e) : (n || g(), n.push(x()));
            return e && (e.end = _()), m(), r;
        }
        function i(e, n) {
            for (var t = []; ;) {
                var i = h.token, r = G(e), o = null;
                if (v("operator", "=") ? (m(), o = te(n)) : !n && (e === Yi || r instanceof Oi) && f("Missing initializer in declaration"),
                t.push(new ai({
                    start: i,
                    name: r,
                    value: o,
                    end: _()
                })), !v("punc", ",")) break;
                m();
            }
            return t;
        }
        function F() {
            var e = p();
            return me(e, "name") || me(e, "punc", "[") || me(e, "punc", "{");
        }
        var j = function(e) {
            return new ii({
                start: _(),
                definitions: i(Yi, e),
                end: _()
            });
        }, P = function(e) {
            return new ri({
                start: _(),
                definitions: i(Bi, e),
                end: _()
            });
        }, N = function(e) {
            return new oi({
                start: _(),
                definitions: i(Li, e),
                end: _()
            });
        };
        var I = function(e) {
            if (v("operator", "new")) return u = e, t = h.token, d("operator", "new"), (c = v("punc", ".") && me(p(), "name", "target") ? (m(),
            m(), new nr()) : (n = I(!1), c = v("punc", "(") ? (m(), H(")", !l.strict)) : [],
            new di({
                expression: n,
                args: c
            }))).start = t, c.end = _(), K(c, u);
            var n, t, i = h.token;
            if (v("punc")) {
                switch (i.value) {
                  case "`":
                    return K(X(null), e);

                  case "(":
                    if (m(), v("punc", ")")) return m(), D([], i);
                    var r = ie(!1, !0), o = i.comments_before.length;
                    [].unshift.apply(r.start.comments_before, i.comments_before), i.comments_before.length = 0,
                    i.comments_before = r.start.comments_before, 0 == (i.comments_before_length = o) && 0 < i.comments_before.length && ((a = i.comments_before[0]).nlb || (a.nlb = i.nlb,
                    i.nlb = !1)), i.comments_after = r.start.comments_after, r.start = i, b(")");
                    var a = _();
                    return a.comments_before = r.end.comments_before, a.comments_after.forEach(function(e) {
                        r.end.comments_after.push(e), e.nlb && (h.token.nlb = !0);
                    }), a.comments_after.length = 0, a.comments_after = r.end.comments_after, r.end = a,
                    v("punc", "=>") ? D(r instanceof hi ? r.expressions : [ r ], i) : K(r, e);

                  case "[":
                    return K(Y(), e);

                  case "{":
                    return K(B(), e);
                }
                g();
            }
            if (v("keyword")) switch (i.value) {
              case "class":
                m();
                var s = T(Pt);
                return s.start = i, s.end = _(), K(s, e);

              case "function":
                return m(), (f = v("operator", "*") ? (m(), O(Ot)) : O(Dt)).start = i, f.end = _(),
                K(f, e);
            }
            if (v("name")) {
                var f, c = U(Xi, i);
                if (m(), "async" == c.name) {
                    if (v("keyword", "function")) return m(), (f = v("operator", "*") ? (m(), O(At)) : O(Tt)).start = i,
                    f.end = _(), K(f, e);
                    if (v("name") && me(p(), "punc", "=>")) return i = h.token, c = U(Xi, i), m(), D([ c ], i, !0);
                    if (v("punc", "(")) {
                        var u = K(c, e);
                        if (!v("punc", "=>")) return u;
                        u = u.args;
                        return u[u.length - 1] instanceof bi && (u.rest = u.pop().expression), D(u, i, !0);
                    }
                }
                return v("punc", "=>") ? D([ c ], i) : K(c, e);
            }
            if (ye[h.token.type]) return K(function() {
                var e, n = h.token, t = n.value;
                switch (n.type) {
                  case "num":
                    isFinite(t) ? e = new or({
                        value: t
                    }) : (e = new pr(), t < 0 && (e = new wi({
                        operator: "-",
                        expression: e
                    })));
                    break;

                  case "bigint":
                    e = new ar({
                        value: t
                    });
                    break;

                  case "string":
                    e = new rr({
                        value: t,
                        quote: n.quote
                    });
                    break;

                  case "regexp":
                    e = new sr({
                        value: t
                    });
                    break;

                  case "atom":
                    switch (t) {
                      case "false":
                        e = new hr();
                        break;

                      case "true":
                        e = new vr();
                        break;

                      case "null":
                        e = new fr();
                        break;

                      default:
                        g();
                    }
                    break;

                  default:
                    g();
                }
                return m(), e.start = e.end = n, e;
            }(), e);
            g();
        };
        function H(e, n, t, i) {
            i = i || te;
            for (var r = !0, o = []; !v("punc", e) && (r ? r = !1 : b(","), !n || !v("punc", e)); ) if (t && v("punc", ",")) o.push(new lr({
                start: h.token,
                end: h.token
            })); else if (v("operator", "...")) {
                if (i !== te) {
                    m(), o.rest = i(), o.rest instanceof li && a(o.rest.start, "Invalid rest parameter");
                    break;
                }
                o.push(new bi({
                    start: h.token,
                    expression: (m(), i()),
                    end: _()
                }));
            } else o.push(i());
            return b(e), o;
        }
        var Y = n(function() {
            return b("["), new Di({
                elements: H("]", !l.strict, !0)
            });
        }), R = n(function() {
            return O(gt);
        }), B = n(function() {
            b("{");
            for (var e = !0, n = []; !v("punc", "}") && (e ? e = !1 : b(","), l.strict || !v("punc", "}")); ) {
                var t = h.token;
                if (v("operator", "*")) {
                    m();
                    var i = L(), r = h.token, o = O(Ot);
                    o.start = r, o.end = _(), n.push(new ji({
                        start: t,
                        key: i,
                        value: o,
                        end: _()
                    }));
                } else if (v("operator", "...")) m(), n.push(new bi({
                    start: t,
                    expression: te(),
                    end: _()
                })); else if (me(p(), "operator", "=")) {
                    o = W(Xi);
                    m(), n.push(new Fi({
                        start: t,
                        key: t.value,
                        value: new Si({
                            start: t,
                            left: o,
                            operator: "=",
                            right: te(),
                            end: _()
                        }),
                        end: _()
                    }));
                } else if (me(p(), "punc", ",") || me(p(), "punc", "}")) n.push(new Fi({
                    start: t,
                    key: t.value,
                    value: W(Xi),
                    end: _()
                })); else {
                    i = L();
                    if (v("punc", "(")) {
                        var a = h.token;
                        (f = O(Dt)).start = a, f.end = _(), n.push(new ji({
                            start: t,
                            key: i,
                            value: f,
                            end: _()
                        }));
                    } else if (v("punc", ":")) m(), n.push(new Fi({
                        start: t,
                        key: i,
                        value: te(),
                        end: _()
                    })); else {
                        if ("name" == t.type) switch (i) {
                          case "async":
                            var s = v("operator", "*") && m();
                            i = L();
                            var f, a = h.token;
                            (f = O(s ? At : Tt)).start = a, f.end = _(), n.push(new ji({
                                start: t,
                                key: i,
                                value: f,
                                end: _()
                            }));
                            continue;

                          case "get":
                            n.push(new Ni({
                                start: t,
                                key: L(),
                                value: R(),
                                end: _()
                            }));
                            continue;

                          case "set":
                            n.push(new Pi({
                                start: t,
                                key: L(),
                                value: R(),
                                end: _()
                            }));
                            continue;
                        }
                        g();
                    }
                }
            }
            return m(), new Ci({
                properties: n
            });
        });
        function L() {
            var e = h.token;
            switch (e.type) {
              case "operator":
                de[e.value] || g();

              case "num":
              case "string":
              case "name":
              case "keyword":
              case "atom":
                return m(), "" + e.value;

              case "punc":
                b("[");
                var n = te();
                return b("]"), n;

              default:
                g();
            }
        }
        function U(e, n) {
            var t = n.value;
            switch (t) {
              case "await":
                h.in_async && g(n);
                break;

              case "super":
                e = Zi;
                break;

              case "this":
                e = er;
                break;

              case "yield":
                h.in_generator && g(n);
            }
            return new e({
                name: "" + t,
                start: n,
                end: n
            });
        }
        function V(e) {
            "arguments" != e.name && "eval" != e.name && "let" != e.name || a(e.start, "Unexpected " + e.name + " in strict mode");
        }
        function W(e, n) {
            if (!v("name")) return n || f("Name expected"), null;
            e = U(e, h.token);
            return h.input.has_directive("use strict") && e instanceof Hi && V(e), m(), e;
        }
        function G(e) {
            var n = h.token;
            if (v("punc", "[")) {
                m();
                var t = H("]", !l.strict, !0, function() {
                    return J(e);
                });
                return new $i({
                    start: n,
                    elements: t,
                    rest: t.rest || null,
                    end: _()
                });
            }
            if (v("punc", "{")) {
                m();
                for (var i = !0, r = [], o = null; !v("punc", "}") && (i ? i = !1 : b(","), l.strict || !v("punc", "}")); ) {
                    var a = h.token;
                    if (v("punc", "[") || me(p(), "punc", ":")) {
                        var s = L();
                        b(":"), r.push(new zi({
                            start: a,
                            key: s,
                            value: J(e),
                            end: _()
                        }));
                    } else {
                        if (v("operator", "...")) {
                            m(), o = G(e);
                            break;
                        }
                        s = W(e);
                        v("operator", "=") && (m(), s = new li({
                            start: s.start,
                            name: s,
                            value: te(),
                            end: _()
                        })), r.push(new zi({
                            start: a,
                            key: a.value,
                            value: s,
                            end: _()
                        }));
                    }
                }
                return b("}"), new qi({
                    start: n,
                    properties: r,
                    rest: o,
                    end: _()
                });
            }
            return W(e);
        }
        function J(e) {
            var n = h.token, e = G(e);
            return v("operator", "=") ? (m(), new li({
                start: n,
                name: e,
                value: te(),
                end: _()
            })) : e;
        }
        function X(e) {
            for (var n = e ? e.start : h.token, t = h.input.context().read_template, i = [], r = []; t(i); ) m(),
            r.push(ie()), v("punc", "}") || g();
            return m(), new tr({
                start: n,
                expressions: r,
                strings: i,
                tag: e,
                end: _()
            });
        }
        function K(e, n) {
            for (var t = e.start, i = null; ;) if (v("operator", "?") && me(p(), "punc", ".") && (m(),
            m(), i = e), v("punc", "[")) {
                m();
                var r = ie();
                b("]"), e = new gi({
                    start: t,
                    optional: i === e,
                    expression: e,
                    property: r,
                    end: _()
                });
            } else if (n && v("punc", "(")) m(), e = new pi({
                start: t,
                optional: i === e,
                expression: e,
                args: H(")", !l.strict),
                end: _()
            }); else if (i === e || v("punc", ".")) i !== e && m(), e = new _i({
                start: t,
                optional: i === e,
                expression: e,
                property: (r = void 0, r = h.token.value, d("name"), r),
                end: _()
            }); else {
                if (!v("punc", "`")) break;
                i && f("Invalid template on optional chain"), e = X(e);
            }
            if (i && (e.terminal = !0), e instanceof pi && !e.pure) for (var o = (t = e.start).comments_before, a = Vn(t, "comments_before_length") ? t.comments_before_length : o.length; 0 <= --a; ) {
                var s = /[@#]__PURE__/.exec(o[a].value);
                if (s) {
                    e.pure = s[0];
                    break;
                }
            }
            return e;
        }
        function o(e) {
            var n = h.token;
            if (h.in_async && v("name", "await")) return h.in_funarg === h.in_function && f("Invalid use of await in function argument"),
            h.input.context().regex_allowed = !0, m(), new Ti({
                start: n,
                expression: o(e),
                end: _()
            });
            if (h.in_generator && v("name", "yield")) {
                h.in_funarg === h.in_function && f("Invalid use of yield in function argument"),
                h.input.context().regex_allowed = !0, m();
                var t = null, i = !1;
                return v("operator", "*") ? (m(), t = te(e), i = !0) : (v("punc") ? he[h.token.value] : c()) || (t = te(e)),
                new Ai({
                    start: n,
                    expression: t,
                    nested: i,
                    end: _()
                });
            }
            if (v("operator") && ge[n.value]) {
                m(), w();
                e = Q(wi, n, o(e));
                return e.start = n, e.end = _(), e;
            }
            for (var r = I(!0); v("operator") && wr[h.token.value] && !s(h.token); ) (r = Q(xi, h.token, r)).start = n,
            r.end = h.token, m();
            return r;
        }
        function Q(e, n, t) {
            var i = n.value;
            switch (i) {
              case "++":
              case "--":
                ee(t) || a(n, "Invalid use of " + i + " operator");
                break;

              case "delete":
                t instanceof Xi && h.input.has_directive("use strict") && a(t.start, "Calling delete on expression not allowed in strict mode");
            }
            return new e({
                operator: i,
                expression: t
            });
        }
        var Z = function(e, n, t) {
            var i = v("operator") ? h.token.value : null, r = null != (i = "in" == i && t ? null : i) ? xr[i] : null;
            if (null != r && n < r) {
                m();
                r = Z(o(t), "**" == i ? r - 1 : r, t);
                return Z(new ki({
                    start: e.start,
                    left: e,
                    operator: i,
                    right: r,
                    end: r.end
                }), n, t);
            }
            return e;
        };
        var r = function(e) {
            var n = h.token, t = Z(o(i = e), 0, i);
            if (v("operator", "?")) {
                m();
                var i = te();
                return b(":"), new Ei({
                    start: n,
                    condition: t,
                    consequent: i,
                    alternative: te(e),
                    end: _()
                });
            }
            return t;
        };
        function ee(e) {
            return e instanceof mi && !e.optional || e instanceof Xi;
        }
        function ne(e) {
            if (e instanceof Di) {
                var n = null;
                if (e.elements[e.elements.length - 1] instanceof bi && !((n = ne(e.elements.pop().expression)) instanceof Oi || ee(n))) return e;
                var t = e.elements.map(ne);
                return Ln(t, function(e) {
                    return e instanceof li || e instanceof Oi || e instanceof lr || ee(e);
                }) ? new $i({
                    start: e.start,
                    elements: t,
                    rest: n,
                    end: e.end
                }) : e;
            }
            if (e instanceof Si) {
                t = ne(e.left);
                return t instanceof Oi || ee(t) ? new li({
                    start: e.start,
                    name: t,
                    value: e.right,
                    end: e.end
                }) : e;
            }
            if (!(e instanceof Ci)) return e;
            n = null;
            if (e.properties[e.properties.length - 1] instanceof bi && !((n = ne(e.properties.pop().expression)) instanceof Oi || ee(n))) return e;
            for (var i = [], r = 0; r < e.properties.length; r++) {
                var o = e.properties[r];
                if (!(o instanceof Fi)) return e;
                var a = ne(o.value);
                if (!(a instanceof li || a instanceof Oi || ee(a))) return e;
                i.push(new zi({
                    start: o.start,
                    key: o.key,
                    value: a,
                    end: o.end
                }));
            }
            return new qi({
                start: e.start,
                properties: i,
                rest: n,
                end: e.end
            });
        }
        function te(e) {
            var n = h.token, t = r(e), i = h.token.value;
            if (v("operator") && be[i]) {
                if (ee(t) || "=" == i && (t = ne(t)) instanceof Oi) return m(), new Si({
                    start: n,
                    left: t,
                    operator: i,
                    right: te(e),
                    end: _()
                });
                f("Invalid assignment");
            }
            return t;
        }
        function ie(e, n) {
            for (var t = h.token, i = []; ;) {
                if (n && v("operator", "...")) {
                    m(), i.rest = G(Ui);
                    break;
                }
                if (i.push(te(e)), !v("punc", ",")) break;
                if (m(), n && v("punc", ")") && me(p(), "punc", "=>")) break;
            }
            return 1 != i.length || i.rest ? new hi({
                start: t,
                expressions: i,
                end: _()
            }) : i[0];
        }
        function re(e) {
            ++h.in_loop;
            e = e();
            return --h.in_loop, e;
        }
        if (l.expression) {
            w();
            e = ie();
            return d("eof"), e;
        }
        return function() {
            var e = h.token, n = [];
            for (h.input.push_directives_stack(); !v("eof"); ) n.push(x());
            h.input.pop_directives_stack();
            var t = _() || e, i = l.toplevel;
            return i ? (i.body = i.body.concat(n), i.end = t) : i = new mt({
                start: e,
                body: n,
                end: t
            }), i;
        }();
    }
    function v(e, n, t, i) {
        this.eliminated = 0, this.exported = !1, this.global = !1, this.id = e, this.init = i,
        this.mangled_name = null, this.name = t.name, this.orig = [ t ], this.references = [],
        this.replaced = 0, this.scope = n, this.undeclared = !1;
    }
    v.prototype = {
        forEach: function(e) {
            this.orig.forEach(e), this.references.forEach(e);
        },
        mangle: function(e) {
            var n, t = e.cache && e.cache.props;
            this.global && t && t.has(this.name) ? this.mangled_name = t.get(this.name) : this.mangled_name || this.unmangleable(e) || (n = this.redefined(),
            this.mangled_name = n ? n.mangled_name || n.name : function(e, i) {
                var n, t = e.scope, r = m(t, i), o = t.cname_holes, a = Object.create(null), s = [ t ];
                e.forEach(function(e) {
                    var n = e.scope;
                    do {
                        if (!(s.indexOf(n) < 0)) break;
                        for (var t in m(n, i)) a[t] = !0;
                    } while (s.push(n), n = n.parent_scope);
                });
                for (var f = 0; f < o.length; f++) if (n = S(o[f]), !a[n]) return o.splice(f, 1),
                r[n] = !0, n;
                for (;;) if (n = S(++t.cname), !(r[n] || j[n] || i.reserved.has[n])) {
                    if (!a[n]) break;
                    o.push(t.cname);
                }
                return r[n] = !0, n;
            }(this, e), this.global && t && t.set(this.name, this.mangled_name));
        },
        redefined: function() {
            var e = this.defun;
            if (e) {
                var n = this.name, e = e.variables.get(n) || e instanceof mt && e.globals.get(n) || this.orig[0] instanceof Yi && Cn(function(e) {
                    return e.name == n;
                }, e.enclosed);
                return e && e !== this ? e.redefined() || e : void 0;
            }
        },
        unmangleable: function(e) {
            return this.global && !e.toplevel || this.exported || this.undeclared || !e.eval && this.scope.pinned() || e.keep_fnames && (this.orig[0] instanceof Gi || this.orig[0] instanceof ue || this.orig[0] instanceof Vi || this.orig[0] instanceof Wi);
        }
    };
    var Er = Bn("delete ++ --");
    function Sr(e, n) {
        return n instanceof Si ? n.left === e && e : n instanceof li ? n.name === e && e : n instanceof Oi || n instanceof zi ? e : n instanceof lt ? n.init === e && e : n instanceof yi ? Er[n.operator] && n.expression : void 0;
    }
    function d(e, n) {
        e.enclosed = [], e.parent_scope = n, e.functions = new Un(), e.variables = new Un(),
        n && (e.make_def = n.make_def);
    }
    function h(e, n) {
        d(e, n), e.uses_eval = !1, e.uses_with = !1;
    }
    function m(e, n) {
        var t, i = e.names_in_use;
        return i || (e.cname = -1, e.cname_holes = [], e.names_in_use = i = Object.create(null),
        t = n.cache && n.cache.props, e.enclosed.forEach(function(e) {
            e.unmangleable(n) && (i[e.name] = !0), e.global && t && t.has(e.name) && (i[t.get(e.name)] = !0);
        })), i;
    }
    function b(e) {
        return e = oe(e, {
            eval: !1,
            ie: !1,
            keep_fnames: !1,
            reserved: [],
            toplevel: !1,
            v8: !1,
            webkit: !1
        }), Array.isArray(e.reserved) || (e.reserved = []), Hn(e.reserved, "arguments"),
        e.reserved.has = Bn(e.reserved), e;
    }
    mt.DEFMETHOD("figure_out_scope", function(u) {
        u = oe(u, {
            cache: null,
            ie: !1
        });
        var l = this, s = null, f = !1, t = 0, c = l.parent_scope = null, p = new mr(function(i, e) {
            if (i instanceof jt) {
                var n = f;
                return f = p.parent() instanceof si, i.name.walk(p), f = n, o(function() {
                    i.extends && i.extends.walk(p), i.properties.forEach(function(e) {
                        e.walk(p);
                    });
                }), !0;
            }
            if (i instanceof ti) {
                n = f;
                return f = p.parent() instanceof si, e(), f = n, !0;
            }
            if (i instanceof $t) {
                n = f;
                return f = p.parent() instanceof si, i.name.walk(p), f = n, o(function() {
                    i.argnames.forEach(function(e) {
                        e.walk(p);
                    }), i.rest && i.rest.walk(p), tt(i, p);
                }), !0;
            }
            if (i instanceof Xt) return i.init_vars(c), e(), !0;
            if (i instanceof Zt) return o(function() {
                tt(i, p);
            }), i.bcatch && i.bcatch.walk(p), i.bfinally && i.bfinally.walk(p), !0;
            if (i instanceof ht) {
                for (var t = c; !(t = t.resolve()).uses_with && (t.uses_with = !0, t = t.parent_scope); );
                return o(e), !0;
            }
            if (i instanceof nt) return o(e), !0;
            var r;
            function o(e) {
                i.init_vars(c);
                var n = s, t = c;
                i instanceof vt && (s = i), c = i, e(), c = t, s = n;
            }
            function a(e, n) {
                e !== n && (i.mark_enclosed(u), n = n.find_variable(i.name), i.thedef !== n && ((i.thedef = n).orig.push(i),
                i.mark_enclosed(u)));
            }
            i instanceof Ii && (i.scope = c), i instanceof le && ((i.thedef = i).references = []),
            i instanceof Ji ? c.def_variable(i).defun = s : i instanceof Yi ? ((r = c.def_variable(i)).defun = s,
            f && (r.exported = !0)) : i instanceof Vi ? (r = s.def_function(i, p.parent()),
            f && (r.exported = !0), a(s, c)) : i instanceof Ui ? (s.def_variable(i), a(s, c)) : i instanceof Wi ? (r = s.def_function(i, "arguments" == i.name ? void 0 : s),
            u.ie && (r.defun = s.parent_scope.resolve())) : i instanceof Bi ? (r = c.def_variable(i),
            f && (r.exported = !0)) : i instanceof Li && (r = s.def_variable(i, i instanceof Ri ? void 0 : null),
            f && (r.exported = !0), a(s, c));
        });
        l.make_def = function(e, n) {
            return new v(++t, this, e, n);
        }, l.walk(p), l.globals = new Un();
        var d = [], p = new mr(function(e) {
            if (e instanceof ei) return e.argname instanceof Oi ? (d.push(e), e.argname.walk(p),
            d.pop(), tt(e, p), !0) : void 0;
            if (e instanceof _t) return d.push(e), e.argnames.forEach(function(e) {
                e.walk(p);
            }), e.rest && e.rest.walk(p), d.pop(), kt(e, p), !0;
            if (e instanceof Ut) return e.label && e.label.thedef.references.push(e), !0;
            if (e instanceof Hi) {
                var n, t = e.definition();
                if (t.preinit = t.references.length, e instanceof Ji) {
                    if (n = t.redefined()) for (var i = e.scope; i && (Hn(i.enclosed, n), i !== n.scope); i = i.parent_scope);
                } else e instanceof Yi && (n = t.redefined()) && (n.const_redefs = !0);
                return "arguments" != e.name ? !0 : ((r = e instanceof Li && p.parent()) instanceof ai && !r.value || (a = e.scope.resolve().find_variable("arguments")) && h(a) && (a.scope.uses_arguments = 3),
                !0);
            }
            if (e instanceof Xi) {
                for (var r, o = e.name, a = e.scope.find_variable(o), s = d.length; 0 < s && a && !((s = d.lastIndexOf(a.scope, s - 1)) < 0); ) {
                    var f = a.orig[0];
                    if (f instanceof Ji || f instanceof Ui || f instanceof Wi) {
                        e.in_arg = !0;
                        break;
                    }
                    a = a.scope.parent_scope.find_variable(o);
                }
                if (a ? "arguments" == o && h(a) && (Sr(e, r = p.parent()) ? a.scope.uses_arguments = 3 : a.scope.uses_arguments < 2 && !(r instanceof mi && r.expression === e) ? a.scope.uses_arguments = 2 : a.scope.uses_arguments || (a.scope.uses_arguments = !0)) : a = l.def_global(e),
                "eval" == o) if ("Call" == (r = p.parent()).TYPE && r.expression === e) for (i = e.scope; !(i = i.resolve()).uses_eval && (i.uses_eval = !0,
                i = i.parent_scope); ); else a.undeclared && (l.uses_eval = !0);
                if (a.init instanceof $t && a.scope !== a.init.name.scope) {
                    var c = e.scope;
                    do {
                        if (c === a.init.name.scope) break;
                    } while (c = c.parent_scope);
                    c || (a.init = void 0);
                }
                return e.thedef = a, e.reference(u), !0;
            }
        });
        function h(e) {
            return e.orig[0] instanceof Ui && !(e.orig[1] instanceof Ui || e.orig[2] instanceof Ui) && !yt(e.scope);
        }
        function i(e, n) {
            var t = e.name, i = e.thedef;
            if (Ln(i.orig, function(e) {
                return !(e instanceof Yi || e instanceof Bi);
            })) {
                var r, o = n.find_variable(t);
                return (o ? (r = o.redefined()) && (o = r) : o = l.globals.get(t), o ? o.orig.push(e) : o = n.def_variable(e),
                o.undeclared && l.variables.set(t, o), "arguments" == t && h(i) && e instanceof Wi) ? 1 : (i.defun = o.scope,
                i.forEach(function(e) {
                    e.redef = i, e.thedef = o, e.reference(u);
                }), 1);
            }
        }
        l.walk(p), u.ie && l.walk(new mr(function(e) {
            if (e instanceof Ji) {
                var n = e.thedef.defun;
                return i(e, n = n.name instanceof Wi && n.name.name == e.name ? n.parent_scope.resolve() : n),
                !0;
            }
            if (e instanceof Wi) {
                n = e.thedef;
                return i(e, e.scope.parent_scope.resolve()) ? void 0 !== e.thedef.init ? e.thedef.init = !1 : n.init && (e.thedef.init = n.init) : delete n.defun,
                !0;
            }
        }));
    }), mt.DEFMETHOD("def_global", function(e) {
        var n = this.globals, t = e.name;
        if (n.has(t)) return n.get(t);
        e = this.make_def(e);
        return e.undeclared = !0, e.global = !0, n.set(t, e), e;
    }), nt.DEFMETHOD("init_vars", function(e) {
        d(this, e);
    }), vt.DEFMETHOD("init_vars", function(e) {
        h(this, e);
    }), Et.DEFMETHOD("init_vars", function(e) {
        return h(this, e), this;
    }), St.DEFMETHOD("init_vars", function(e) {
        h(this, e);
    }), _t.DEFMETHOD("init_vars", function(e) {
        return h(this, e), this.uses_arguments = !1, this.def_variable(new Ui({
            name: "arguments",
            start: this.start,
            end: this.end
        })), this;
    }), Ii.DEFMETHOD("mark_enclosed", function(e) {
        for (var n = this.definition(), t = this.scope; t && (Hn(t.enclosed, n), e ? e.keep_fnames && t.functions.each(function(e) {
            Hn(n.scope.enclosed, e);
        }) : delete t._var_names, t !== n.scope); t = t.parent_scope);
    }), Ii.DEFMETHOD("reference", function(e) {
        this.definition().references.push(this), this.mark_enclosed(e);
    }), nt.DEFMETHOD("find_variable", function(e) {
        return this.variables.get(e) || this.parent_scope && this.parent_scope.find_variable(e);
    }), nt.DEFMETHOD("def_function", function(e, n) {
        var t = this.def_variable(e, n);
        return (!t.init || t.init instanceof $t) && (t.init = n), this.functions.set(e.name, t),
        t;
    }), nt.DEFMETHOD("def_variable", function(e, n) {
        var t = this.variables.get(e.name);
        return t ? (t.orig.push(e), t.init instanceof bt && (t.init = n)) : (t = this.make_def(e, n),
        this.variables.set(e.name, t), t.global = !this.parent_scope), e.thedef = t;
    }), Ii.DEFMETHOD("unmangleable", function(e) {
        var n = this.definition();
        return !n || n.unmangleable(e);
    }), le.DEFMETHOD("unmangleable", Fn), Ii.DEFMETHOD("definition", function() {
        return this.thedef;
    }), mt.DEFMETHOD("mangle_names", function(o) {
        o = b(o);
        var n, r = -1;
        o.cache && o.cache.props && (n = m(this, o), o.cache.props.each(function(e) {
            n[e] = !0;
        }));
        var a = [], s = new mr(function(n, e) {
            if (n instanceof ot) {
                var t = r;
                return e(), o.v8 && function(e) {
                    var n, t = 0;
                    for (;n = e.parent(t++); ) {
                        if (n instanceof it) return n instanceof mt && !o.toplevel;
                        if (n instanceof ot) return !0;
                    }
                }(s) || (r = t), !0;
            }
            var i;
            if (n instanceof nt) return o.webkit && n instanceof at && n.init instanceof ri && n.init.definitions.forEach(function(e) {
                e.name.match_symbol(function(e) {
                    var n, t, i;
                    e instanceof Bi && (n = e.definition(), t = e.scope.parent_scope, i = t.def_variable(e),
                    e.thedef = n, t.to_mangle.push(i), n.redefined = function() {
                        return i;
                    });
                });
            }, !0), n.to_mangle = [], n.variables.each(function(e) {
                !function(n) {
                    var e = n.orig[0], t = n.redefined();
                    if (!t) {
                        if (!(e instanceof Yi)) return !1;
                        var i = n.scope.resolve();
                        if (n.scope === i) return !1;
                        if (n.scope.parent_scope.find_variable(e.name)) return !1;
                        t = i.def_variable(e), i.to_mangle.push(t);
                    }
                    a.push(n), n.references.forEach(r), (e instanceof Ji || e instanceof Yi) && r(e);
                    return !0;
                    function r(e) {
                        e.thedef = t, e.reference(o), e.thedef = n;
                    }
                }(e) && n.to_mangle.push(e);
            }), e(), o.cache && n instanceof mt && n.globals.each(f), n instanceof Ct && s.has_directive("use asm") && ((e = new Xi(n.name)).scope = n,
            e.reference(o)), n.to_mangle.forEach(f), !0;
            if (n instanceof le) {
                for (;i = S(++r), j[i]; );
                return n.mangled_name = i, !0;
            }
        });
        function f(e) {
            o.reserved.has[e.name] || e.mangle(o);
        }
        this.walk(s), a.forEach(f);
    }), mt.DEFMETHOD("find_colliding_names", function(t) {
        var i = t.cache && t.cache.props, n = Object.create(j);
        return t.reserved.forEach(r), this.globals.each(o), this.walk(new mr(function(e) {
            e instanceof nt && e.variables.each(o);
        })), n;
        function r(e) {
            n[e] = !0;
        }
        function o(e) {
            var n = e.name;
            if (e.global && i && i.has(n)) n = i.get(n); else if (!e.unmangleable(t)) return;
            r(n);
        }
    }), mt.DEFMETHOD("expand_names", function(i) {
        S.reset(), S.sort(), i = b(i);
        var r = this.find_colliding_names(i), o = 0;
        function n(n) {
            var e, t;
            n.global && i.cache || n.unmangleable(i) || i.reserved.has[n.name] || (e = n.redefined(),
            t = e ? e.rename || e.name : function() {
                for (var e; e = S(o++), r[e]; );
                return e;
            }(), n.rename = t, n.forEach(function(e) {
                e.definition() === n && (e.name = t);
            }));
        }
        this.globals.each(n), this.walk(new mr(function(e) {
            e instanceof nt && e.variables.each(n);
        }));
    }), Gn.DEFMETHOD("tail_node", Pn), hi.DEFMETHOD("tail_node", function() {
        return this.expressions[this.expressions.length - 1];
    }), mt.DEFMETHOD("compute_char_frequency", function(e) {
        e = b(e), S.reset();
        var n = Ii.prototype.add_source_map;
        try {
            Ii.prototype.add_source_map = function() {
                this.unmangleable(e) || S.consider(this.name, -1);
            }, e.properties && (_i.prototype.add_source_map = function() {
                S.consider(this.property, -1);
            }, gi.prototype.add_source_map = function() {
                !function e(n) {
                    n instanceof rr ? S.consider(n.value, -1) : n instanceof Ei ? (e(n.consequent),
                    e(n.alternative)) : n instanceof hi && e(n.tail_node());
                }(this.property);
            }), S.consider(this.print_to_string(), 1);
        } finally {
            Ii.prototype.add_source_map = n, delete _i.prototype.add_source_map, delete gi.prototype.add_source_map;
        }
        S.sort();
    });
    var y, w, x, k, E, S = (y = Object.create(null), k = U("0123456789"), E = U("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_"),
    G.consider = function(e, n) {
        for (var t = e.length; 0 <= --t; ) x[e[t]] += n;
    }, G.sort = function() {
        w = E.sort(W).concat(k).sort(W);
    }, (G.reset = V)(), G);
    function U(e) {
        for (var n = [], t = 0; t < e.length; t++) {
            var i = e[t];
            n.push(i), y[i] = -.01 * t;
        }
        return n;
    }
    function V() {
        w = null, x = Object.create(y);
    }
    function W(e, n) {
        return x[n] - x[e];
    }
    function G(e) {
        var n = E[e % 54];
        for (e = Math.floor(e / 54); 0 <= --e; e >>= 6) n += w[63 & e];
        return n;
    }
    function Tr(e, n) {
        if (!(this instanceof Tr)) return new Tr(e, n);
        _r.call(this, this.before, this.after), this.options = oe(e, {
            annotations: !n,
            arguments: !n,
            arrows: !n,
            assignments: !n,
            awaits: !n,
            booleans: !n,
            collapse_vars: !n,
            comparisons: !n,
            conditionals: !n,
            dead_code: !n,
            default_values: !n,
            directives: !n,
            drop_console: !1,
            drop_debugger: !n,
            evaluate: !n,
            expression: !1,
            functions: !n,
            global_defs: !1,
            hoist_exports: !n,
            hoist_funs: !1,
            hoist_props: !n,
            hoist_vars: !1,
            ie: !1,
            if_return: !n,
            imports: !n,
            inline: !n,
            join_vars: !n,
            keep_fargs: n,
            keep_fnames: !1,
            keep_infinity: !1,
            loops: !n,
            merge_vars: !n,
            negate_iife: !n,
            objects: !n,
            optional_chains: !n,
            passes: 1,
            properties: !n,
            pure_funcs: null,
            pure_getters: !n && "strict",
            reduce_funcs: !n,
            reduce_vars: !n,
            rests: !n,
            sequences: !n,
            side_effects: !n,
            spreads: !n,
            strings: !n,
            switches: !n,
            templates: !n,
            top_retain: null,
            toplevel: !(!e || !e.top_retain),
            typeofs: !n,
            unsafe: !1,
            unsafe_comps: !1,
            unsafe_Function: !1,
            unsafe_math: !1,
            unsafe_proto: !1,
            unsafe_regexp: !1,
            unsafe_undefined: !1,
            unused: !n,
            varify: !n,
            webkit: !1,
            yields: !n
        }, !0);
        n = this.options.evaluate;
        this.eval_threshold = /eager/.test(n) ? 1 / 0 : +n;
        var t = this.options.global_defs;
        if ("object" == typeof t) for (var i in t) /^@/.test(i) && Vn(t, i) && (t[i.slice(1)] = kr(t[i], {
            expression: !0
        }));
        !0 === this.options.inline && (this.options.inline = 3), this.drop_fargs = this.options.keep_fargs ? Fn : function(e, n) {
            if (e.length_read) return !1;
            var t = e.name;
            if (!t) return n && "Call" == n.TYPE && n.expression === e;
            if (t.fixed_value() !== e) return !1;
            t = t.definition();
            if (t.direct_access) return !1;
            t = t.escaped;
            return t && 1 != t.depth;
        };
        var r = this.options.pure_funcs;
        "function" == typeof r ? this.pure_funcs = r : "string" == typeof r ? this.pure_funcs = function(e) {
            var n;
            return e instanceof pi ? n = e.expression : e instanceof tr && (n = e.tag), !(n && r === n.print_to_string());
        } : Array.isArray(r) ? this.pure_funcs = function(e) {
            var n;
            return e instanceof pi ? n = e.expression : e instanceof tr && (n = e.tag), !(n && qn(n.print_to_string(), r));
        } : this.pure_funcs = jn;
        n = this.options.sequences;
        this.sequences_limit = 1 == n ? 800 : 0 | n;
        var o = this.options.top_retain;
        o instanceof RegExp ? this.top_retain = function(e) {
            return o.test(e.name);
        } : "function" == typeof o ? this.top_retain = o : o && ("string" == typeof o && (o = o.split(/,/)),
        this.top_retain = function(e) {
            return qn(e.name, o);
        });
        n = this.options.toplevel;
        this.toplevel = "string" == typeof n ? {
            funcs: /funcs/.test(n),
            vars: /vars/.test(n)
        } : {
            funcs: n,
            vars: n
        };
    }
    function J(e) {
        return "comment2" == e.type && /@preserve|@license|@cc_on/i.test(e.value);
    }
    function Ar(f) {
        f = oe(f, {
            annotations: !1,
            ascii_only: !1,
            beautify: !1,
            braces: !1,
            comments: !1,
            galio: !1,
            ie: !1,
            indent_level: 4,
            indent_start: 0,
            inline_script: !0,
            keep_quoted_props: !1,
            max_line_len: !1,
            preamble: null,
            preserve_line: !1,
            quote_keys: !1,
            quote_style: 0,
            semicolons: !0,
            shebang: !0,
            source_map: null,
            v8: !1,
            webkit: !1,
            width: 80,
            wrap_iife: !1
        }, !0);
        var n, c = Fn;
        f.comments && (n = f.comments, "string" == typeof f.comments && /^\/.*\/[a-zA-Z]*$/.test(f.comments) && (N = f.comments.lastIndexOf("/"),
        n = new RegExp(f.comments.substr(1, N - 1), f.comments.substr(N + 1))), c = n instanceof RegExp ? function(e) {
            return "comment5" != e.type && n.test(e.value);
        } : "function" == typeof n ? function(e) {
            return "comment5" != e.type && n(this, e);
        } : "some" === n ? J : jn);
        var i, r, o, a, s, t, u, l = 0, p = 1, d = 0, h = f.indent_start, v = 0, m = !0, _ = f.source_map && [], g = !1, b = !1, y = -1;
        function e() {
            s = a = !1, t = [];
            var e = u;
            return u = i = "", e;
        }
        e();
        var w = f.ascii_only ? function(e, t) {
            return (e = t ? e.replace(/[\ud800-\udbff][\udc00-\udfff]/g, function(e) {
                return "\\u{" + (e.charCodeAt(0) - 55232 << 10 | e.charCodeAt(1) - 56320).toString(16) + "}";
            }) : e).replace(/[\u0000-\u001f\u007f-\uffff]/g, function(e) {
                var n = e.charCodeAt(0).toString(16);
                if (n.length <= 2 && !t) {
                    for (;n.length < 2; ) n = "0" + n;
                    return "\\x" + n;
                }
                for (;n.length < 4; ) n = "0" + n;
                return "\\u" + n;
            });
        } : function(e) {
            for (var n, t = "", i = 0, r = 0; i < e.length; i++) {
                var o = e.charCodeAt(i);
                if (55296 <= (n = o) && n <= 56319) {
                    if (R(e.charCodeAt(i + 1))) {
                        i++;
                        continue;
                    }
                } else if (!R(o)) continue;
                t += e.slice(r, i) + "\\u" + o.toString(16), r = i + 1;
            }
            return 0 == r ? e : t + e.slice(r);
        };
        function x(e) {
            return "'" + e.replace(/\x27/g, "\\'") + "'";
        }
        function k(e) {
            return '"' + e.replace(/\x22/g, '\\"') + '"';
        }
        var E = [ null, x, k, function(e, n) {
            return ("'" == n ? x : k)(e);
        } ][f.quote_style] || function(e, n, t, i) {
            return (i < t ? x : k)(e);
        };
        function S(t, e) {
            var i = 0, r = 0;
            return t = t.replace(/[\\\b\f\n\r\v\t\x22\x27\u2028\u2029\0\ufeff]/g, function(e, n) {
                switch (e) {
                  case '"':
                    return ++i, '"';

                  case "'":
                    return ++r, "'";

                  case "\\":
                    return "\\\\";

                  case "\n":
                    return "\\n";

                  case "\r":
                    return "\\r";

                  case "\t":
                    return "\\t";

                  case "\b":
                    return "\\b";

                  case "\f":
                    return "\\f";

                  case "\v":
                    return f.ie ? "\\x0B" : "\\v";

                  case "\u2028":
                    return "\\u2028";

                  case "\u2029":
                    return "\\u2029";

                  case "\ufeff":
                    return "\\ufeff";

                  case "\0":
                    return /[0-9]/.test(t.charAt(n + 1)) ? "\\x00" : "\\0";
                }
                return e;
            }), E(w(t), e, i, r);
        }
        var T = _ ? function(n, t) {
            _.forEach(function(e) {
                e.line += n, e.col += t;
            });
        } : Mn, A = _ ? function() {
            _.forEach(function(e) {
                f.source_map.add(e.token.file, e.line, e.col, e.token.line, e.token.col, e.name || "name" != e.token.type ? e.name : e.token.value);
            }), _ = [];
        } : Mn;
        function D(e) {
            var n = u.lastIndexOf("\n");
            v < n && (v = n);
            var t = u.slice(0, v), n = u.slice(v);
            for (T(e, n.length - l), p += e, d += e, l = n.length, u = t; e--; ) u += "\n";
            u += n;
        }
        var O = f.max_line_len ? function() {
            m ? l > f.max_line_len && Gn.warn("Output exceeds {max_line_len} characters", f) : (l > f.max_line_len && D(1),
            m = !0, A());
        } : Mn, $ = Bn("( [ + * / - , ."), z = f.beautify || f.comments || f.max_line_len || f.preserve_line || f.shebang || !f.semicolons || f.source_map || f.width ? function(e) {
            var n = e.charAt(0);
            g && n && (g = !1, "\n" != n && (z("\n"), C())), b && n && (b = !1, /[\s;})]/.test(n) || q()),
            y = -1;
            var t = i.slice(-1);
            s && (s = !1, (":" == t && "}" == n || (!n || ";}".indexOf(n) < 0) && ";" != t) && (f.semicolons || $[n] ? (u += ";",
            l++, d++) : (O(), u += "\n", d++, p++, l = 0, /^\s+$/.test(e) && (s = !0)), f.beautify || (a = !1))),
            a && ((B(t) && (B(n) || "\\" == n) || "/" == n && n == t || ("+" == n || "-" == n) && n == i || "--" == e && "!" == i || "in" == e && "/" == t || "--" == i && ">" == n) && (u += " ",
            l++, d++), "<" == t && "!" == e || (a = !1)), o && (_.push({
                token: o,
                name: r,
                line: p,
                col: l
            }), o = !1, m && A()), u += e, d += e.length;
            n = e.split(/\r?\n/), t = n.length - 1;
            p += t, l += n[0].length, 0 < t && (O(), l = n[t].length), i = e;
        } : function(e) {
            var n = e.charAt(0), t = i.slice(-1);
            s && (s = !1, (":" == t && "}" == n || (!n || ";}".indexOf(n) < 0) && ";" != t) && (u += ";",
            a = !1)), a && ((B(t) && (B(n) || "\\" == n) || "/" == n && n == t || ("+" == n || "-" == n) && n == i || "--" == e && "!" == i || "in" == e && "/" == t || "--" == i && ">" == n) && (u += " "),
            "<" == t && "!" == e || (a = !1)), u += e, i = e;
        }, q = f.beautify ? function() {
            z(" ");
        } : function() {
            a = !0;
        }, C = f.beautify ? function(e) {
            g && z("\n"), z(function e(n, t) {
                if (t <= 0) return "";
                if (1 == t) return n;
                var i = e(n, t >> 1);
                return i += i, 1 & t ? i + n : i;
            }(" ", e ? h - (f.indent_level >> 1) : h));
        } : Mn, M = f.beautify ? function(e) {
            var n = h;
            h += f.indent_level, e(), h = n;
        } : function(e) {
            e();
        }, F = f.max_line_len || f.preserve_line ? function() {
            O(), v = u.length, m = !1;
        } : Mn, j = f.beautify ? function() {
            if (y < 0) return z("\n");
            "\n" != u[y] && (u = u.slice(0, y) + "\n" + u.slice(y), d++, p++), y++;
        } : F, P = f.beautify ? function() {
            z(";");
        } : function() {
            s = !0;
        };
        var N = _ ? function(e, n) {
            o = e, r = n;
        } : Mn;
        function I(e, n) {
            g || (!e.nlb || !n && (e = u.lastIndexOf("\n"), /^ *$/.test(u.slice(e + 1))) ? n && (b = !0) : g = !0);
        }
        function H(e) {
            var n = e.value.replace(/[@#]__PURE__/g, " ");
            return (!/^\s*$/.test(n) || /^\s*$/.test(e.value)) && (/comment[134]/.test(e.type) ? (z("//" + n),
            g = !0) : "comment2" == e.type && z("/*" + n + "*/"), 1);
        }
        return {
            get: function() {
                return m || O(), u;
            },
            reset: e,
            indent: C,
            should_break: f.width ? function() {
                return l - h >= f.width;
            } : Fn,
            has_parens: function() {
                return "(" == i.slice(-1);
            },
            newline: j,
            print: z,
            space: q,
            comma: function() {
                F(), z(","), F(), q();
            },
            colon: function() {
                z(":"), q();
            },
            last: function() {
                return i;
            },
            semicolon: P,
            force_semicolon: function() {
                s && z(";"), z(";");
            },
            to_utf8: w,
            print_name: function(e) {
                z(w(e.toString(), !0));
            },
            print_string: f.inline_script ? function(e, n) {
                e = S(e, n).replace(/<\x2f(script)([>\/\t\n\f\r ])/gi, "<\\/$1$2"), z(e.replace(/\x3c!--/g, "\\x3c!--").replace(/--\x3e/g, "--\\x3e"));
            } : function(e, n) {
                z(S(e, n));
            },
            with_indent: M,
            with_block: function(e) {
                z("{"), j(), M(e), C(), z("}");
            },
            with_parens: function(e) {
                z("("), F(), e(), F(), z(")");
            },
            with_square: function(e) {
                z("["), F(), e(), F(), z("]");
            },
            add_mapping: N,
            option: function(e) {
                return f[e];
            },
            prepend_comments: f.comments || f.shebang ? function(e) {
                var t, i = this;
                e instanceof Rt ? t = e.value : e instanceof Ai && (t = e.expression);
                var r, n, o = (o = s(e)) || [];
                t && ((r = new mr(function(e) {
                    if (n = e, !((t = r.parent()) instanceof ki ? t.left === n : "Call" == t.TYPE ? t.expression === n : t instanceof Ei ? t.condition === n : t instanceof _i ? t.expression === n : t instanceof Rt || (t instanceof hi ? t.expressions[0] === n : t instanceof gi ? t.expression === n : t instanceof xi || t instanceof Ai))) return !0;
                    var n, t, e = s(e);
                    e && (o = o.concat(e));
                })).push(e), t.walk(r)), 0 == d && (0 < o.length && f.shebang && "comment5" == o[0].type && (z("#!" + o.shift().value + "\n"),
                C()), (n = f.preamble) && z(n.replace(/\r\n?|[\n\u2028\u2029]|\s*$/g, "\n"))), o = o.filter(c, e);
                var a = !1;
                function s(e) {
                    var n = e.start;
                    if (!n) {
                        if (!t) return;
                        e.start = n = new Y();
                    }
                    e = n.comments_before;
                    if (!e) {
                        if (!t) return;
                        n.comments_before = e = [];
                    }
                    if (e._dumped !== i) return e._dumped = i, e;
                }
                o.forEach(function(e, n) {
                    I(e, n), H(e) && (a = !0);
                }), a && I(e.start, !0);
            } : Mn,
            append_comments: f.comments ? function(e, t) {
                var n, i = e.end;
                !i || (n = i[t ? "comments_before" : "comments_after"]) && n._dumped !== this && (e instanceof Jn || Ln(n, function(e) {
                    return !/comment[134]/.test(e.type);
                })) && (n._dumped = this, i = u.length, n.filter(c, e).forEach(function(e, n) {
                    I(e, n || !t), H(e);
                }), u.length > i && (y = i));
            } : Mn,
            push_node: function(e) {
                t.push(e);
            },
            pop_node: f.preserve_line ? function() {
                var e = t.pop();
                e.start && e.start.line > p && D(e.start.line - p);
            } : function() {
                t.pop();
            },
            parent: function(e) {
                return t[t.length - 2 - (e || 0)];
            }
        };
    }
    t(Tr.prototype = new _r(), {
        option: function(e) {
            return this.options[e];
        },
        exposed: function(e) {
            if (e.exported) return !0;
            if (e.undeclared) return !0;
            if (!(e.global || e.scope.resolve() instanceof mt)) return !1;
            var n = this.toplevel;
            return !Ln(e.orig, function(e) {
                return n[e instanceof Vi ? "funcs" : "vars"];
            });
        },
        compress: function(e) {
            (e = e.resolve_defines(this)).hoist_exports(this), this.option("expression") && e.process_expression(!0);
            for (var n = +this.options.passes || 1, t = 1 / 0, i = !1, r = {
                ie: this.option("ie")
            }, o = 0; o < n; o++) if (e.figure_out_scope(r), (0 < o || this.option("reduce_vars")) && e.reset_opt_flags(this),
            e = e.transform(this), 1 < n) {
                var a = 0;
                if (e.walk(new mr(function() {
                    a++;
                })), Gn.info("pass {pass}: last_count: {min_count}, count: {count}", {
                    pass: o,
                    min_count: t,
                    count: a
                }), a < t) t = a, i = !1; else {
                    if (i) break;
                    i = !0;
                }
            }
            return this.option("expression") && e.process_expression(!1), e;
        },
        before: function(e, n, t) {
            if (e._squeezed) return e;
            var i = e instanceof vt;
            i && (e.hoist_properties(this), e.hoist_declarations(this), e.process_boolean_returns(this)),
            n(e, this), n(e, this);
            var r = e.optimize(this);
            return !i || r !== e || this.has_directive("use asm") || r.pinned() || (r.merge_variables(this),
            r.drop_unused(this), n(r, this)), r === e && (r._squeezed = !0), r;
        }
    }), function(e) {
        function l(e, n) {
            var t;
            if (!((i = n.get_property()) instanceof Gn)) {
                if (e instanceof Di) {
                    n = e.elements;
                    if ("length" == i) return X(n.length, e);
                    "number" == typeof i && i in n && (t = n[i]);
                } else if (e instanceof _t) {
                    if ("length" == i) return e.length_read = !0, X(e.argnames.length, e);
                } else if (e instanceof Ci) for (var i = "" + i, r = e.properties, o = r.length; 0 <= --o; ) {
                    if (!zn(r[o])) return;
                    t || r[o].key !== i || (t = r[o].value);
                }
                return t instanceof Xi && t.fixed_value() || t;
            }
        }
        function ce(e, n, t, i, r, o, a) {
            var s = n.parent(r);
            if (!(e.option("unsafe") && s instanceof _i && (c = i, f = s.property, c instanceof dr ? fe.Boolean[f] : c instanceof or ? fe.Number[f] : c instanceof rr ? fe.String[f] : "valueOf" != f && (c instanceof Di ? fe.Array[f] : c instanceof _t ? fe.Function[f] : c instanceof Ci ? fe.Object[f] : c instanceof sr && (fe.RegExp[f] && !c.value.global))))) {
                var f, c = Sr(t, s);
                if (c) return c;
                if (s instanceof Di) return ce(e, n, s, s, r + 1);
                if (s instanceof ki) return we[s.operator] ? ce(e, n, s, s, r + 1) : void 0;
                if (s instanceof pi) return !o && s.expression === t && !s.is_expr_pure(e) && (!(i instanceof bt) || !(s instanceof di) && i.contains_this());
                if (s instanceof Ei) return s.condition === t ? void 0 : ce(e, n, s, s, r + 1);
                if (s instanceof lt) return s.init === t;
                if (s instanceof Fi) {
                    if (s.value !== t) return;
                    var u = n.parent(r + 1);
                    return ce(e, n, u, u, r + 2);
                }
                if (s instanceof mi) {
                    if (s.expression !== t) return;
                    u = l(i, s);
                    return (!o || a) && ce(e, n, s, u, r + 1);
                }
                return s instanceof hi && s.tail_node() === t ? ce(e, n, s, i, r + 1, o, a) : void 0;
            }
        }
        function D(e) {
            return e instanceof Ft || e instanceof _t;
        }
        function c(e) {
            return e instanceof Ft || e instanceof Ct || e instanceof Dt;
        }
        function ue(e) {
            return "arguments" == e.name && e.scope.uses_arguments;
        }
        function le(e) {
            return e.orig[0] instanceof Ui || e.orig[1] instanceof Ui;
        }
        function y(e, n) {
            do {
                if (e === n) return;
                if (n instanceof vt) return 1;
            } while (n = n.parent_scope);
        }
        function pe(e, n, t) {
            var i = e.definition();
            return (!e.in_arg || !le(i)) && Ln(i.orig, function(e) {
                return e instanceof Yi || e instanceof Bi ? n && cn(n, e) : !(t && e instanceof Wi);
            });
        }
        function de(e, n, t, i) {
            return i instanceof Si ? "=" == i.operator && i.right === t : i instanceof pi ? i.expression !== t || i instanceof di : i instanceof Rt ? i.value === t && n.resolve() !== e.scope.resolve() : i instanceof ai && i.value === t;
        }
        e(Gn, function(e, n) {
            return e;
        }), Gn.DEFMETHOD("equivalent_to", function(e) {
            return this.TYPE == e.TYPE && this.print_to_string() == e.print_to_string();
        }), mt.DEFMETHOD("hoist_exports", function(e) {
            if (e.option("hoist_exports")) {
                for (var n = this.body, t = [], i = 0; i < n.length; i++) {
                    var r = n[i];
                    r instanceof si ? (n[i] = r = r.body, r instanceof ti ? r.definitions.forEach(function(e) {
                        e.name.match_symbol(o, !0);
                    }) : o(r.name)) : r instanceof ci && (n.splice(i--, 1), [].push.apply(t, r.properties));
                }
                t.length && n.push(ve(ci, this, {
                    properties: t
                }));
            }
            function o(e) {
                e instanceof Hi && ((e = ve(Ki, e, e)).alias = e.name, t.push(e));
            }
        }), vt.DEFMETHOD("process_expression", function(i, r) {
            var o = this, a = new _r(function(e) {
                if (i && e instanceof et) return r ? r(e) : ve(Bt, e, {
                    value: e.body
                });
                if (!i && e instanceof Bt) return r ? r(e) : ve(et, e, {
                    body: e.value || ve(wi, e, {
                        operator: "void",
                        expression: ve(or, e, {
                            value: 0
                        })
                    })
                });
                if (e instanceof it) {
                    if (e instanceof _t) {
                        if (e !== o) return e;
                    } else if ("awaits" === i && e instanceof Zt && e.bfinally) return e;
                    for (var n = e.body.length; 0 <= --n; ) {
                        var t = e.body[n];
                        if (!N(t, !0)) {
                            e.body[n] = t.transform(a);
                            break;
                        }
                    }
                } else e instanceof Gt ? (e.body = e.body.transform(a), e.alternative && (e.alternative = e.alternative.transform(a))) : e instanceof ht && (e.body = e.body.transform(a));
                return e;
            });
            o.transform(a);
        });
        var p = /^(0|[1-9][0-9]*)$/;
        function o(e, n, t) {
            t.assignments = 0, t.bool_fn = 0, t.cross_loop = !1, t.direct_access = !1, t.escaped = [],
            t.fixed = !t.const_redefs && !t.scope.pinned() && !n.exposed(t) && !(t.init instanceof bt && t.init !== t.scope) && t.init,
            t.reassigned = 0, t.recursive_refs = 0, t.references = [], t.should_replace = void 0,
            t.single_use = void 0;
        }
        function a(e, n, t) {
            t.variables.each(function(e) {
                o(0, n, e);
            });
        }
        function d(t, i, r) {
            r.fn_defs = [], r.variables.each(function(e) {
                o(0, i, e);
                var n = e.init;
                n instanceof $t && (r.fn_defs.push(n), n.safe_ids = null), null === e.fixed ? (e.safe_ids = t.safe_ids,
                g(t, e)) : e.fixed && (t.loop_ids[e.id] = t.in_loop, g(t, e));
            }), r.may_call_this = function() {
                r.may_call_this = r.contains_this() ? jn : Fn;
            }, r.uses_arguments && r.each_argname(function(e) {
                e.definition().last_ref = !1;
            }), i.option("ie") && r.variables.each(function(e) {
                var n = e.orig[0].definition();
                n !== e && (n.fixed = !1);
            });
        }
        function s(e, n) {
            var t = e.fn_scanning;
            (e.fn_scanning = n).walk(e), e.fn_scanning = t;
        }
        function f(t, i) {
            i.enclosed.forEach(function(e) {
                var n;
                i.variables.get(e.name) !== e && (w(t, e) || (e.single_use = !1, (n = "function" == typeof (n = e.fixed) ? n() : n) instanceof _t && Vn(n, "safe_ids") || (e.fixed = !1)));
            });
        }
        function h(e, n, t) {
            var i, r;
            !Vn(t, "safe_ids") || !1 !== (i = t.safe_ids) && (t.parent_scope.resolve().may_call_this === jn ? qn(t, e.fn_visited) && f(e, t) : i ? (r = qn(t, e.fn_visited),
            i === e.safe_ids ? r || s(e, t) : r ? f(e, t) : t.safe_ids = !1) : e.fn_scanning && e.fn_scanning !== n.scope.resolve() ? t.safe_ids = !1 : (t.safe_ids = e.safe_ids,
            s(e, t)));
        }
        function v(n, e) {
            var t = e.fn_defs, i = e.may_call_this === jn ? t : t.filter(function(e) {
                return !1 === e.safe_ids || (e.safe_ids = n.safe_ids, s(n, e), !1);
            });
            _(n), i.forEach(function(e) {
                e.safe_ids = n.safe_ids, s(n, e);
            }), t.forEach(function(e) {
                delete e.safe_ids;
            }), delete e.fn_defs, delete e.may_call_this;
        }
        function m(e) {
            e.safe_ids = Object.create(e.safe_ids);
        }
        function _(e) {
            e.safe_ids = Object.getPrototypeOf(e.safe_ids);
        }
        function g(e, n) {
            e.safe_ids[n.id] = {};
        }
        function b(e, n) {
            e.references.push(n), !1 !== e.last_ref && (e.last_ref = n);
        }
        function w(e, n) {
            if ("m" == n.single_use) return !1;
            var t = e.safe_ids[n.id];
            return t ? (Vn(e.safe_ids, n.id) || (t.read = !(!t.read || t.read === e.safe_ids) || e.safe_ids),
            null == n.fixed ? !ue(n) && ((!n.global || "arguments" != n.name) && (e.loop_ids[n.id] = null,
            n.fixed = ve(ur, n.orig[0]), !0)) : !t.assign || t.assign === e.safe_ids) : n.fixed instanceof $t;
        }
        function x(e, n, t) {
            if (!t) {
                if (le(n) && n.scope.uses_arguments && !e.has_directive("use strict")) return;
                if (!Ln(n.orig, function(e) {
                    return !(e instanceof Yi);
                })) return;
            }
            if (void 0 === n.fixed) return t || Ln(n.orig, function(e) {
                return !(e instanceof Bi);
            });
            if (!1 !== n.fixed) {
                var i = e.safe_ids[n.id];
                if (n.safe_ids) return n.safe_ids[n.id] = !1, delete n.safe_ids, null === n.fixed || Vn(e.safe_ids, n.id) && !i.read;
                if (!Vn(e.safe_ids, n.id)) {
                    if (!i) return;
                    if (i.read) {
                        t = e.find_parent(nt);
                        if (t instanceof Ft) return;
                        if (n.scope.resolve() !== t.resolve()) return;
                    }
                    i.assign = !(!i.assign || i.assign === e.safe_ids) || e.safe_ids;
                }
                if (null != n.fixed && i.read) {
                    if (i.read !== e.safe_ids) return;
                    if (e.loop_ids[n.id] !== e.in_loop) return;
                }
                return w(e, n) && Ln(n.orig, function(e) {
                    return !(e instanceof Wi);
                });
            }
        }
        function k(e, n) {
            var t = ve(Xi, e, e);
            return t.fixed = n || ve(ur, e), t;
        }
        function E(e) {
            if (!e) return !1;
            if (e instanceof Si) {
                var n = e.operator;
                return "=" == n ? E(e.right) : !we[n.slice(0, -1)];
            }
            return e instanceof hi ? E(e.tail_node()) : e.is_constant() || D(e) || e instanceof Qi;
        }
        function S(e, n, t, i, r, o, a) {
            var s, f = e.parent(o);
            if (!r || !r.is_constant()) {
                if (de(n, t, i, f)) return n.escaped.push(f), !(1 < a) || r && r.is_constant_expression(t) || (a = 1),
                (!n.escaped.depth || n.escaped.depth > a) && (n.escaped.depth = a), void (n.scope.resolve() !== t.resolve() && (n.escaped.cross_scope = !0));
                if (s = i, (c = f) instanceof Di || (c instanceof ki ? we[c.operator] : c instanceof Ei ? c.condition !== s : c instanceof hi ? c.tail_node() === s : c instanceof bi)) S(e, n, t, f, f, o + 1, a); else if (f instanceof Fi && f.value === i) {
                    var c = e.parent(o + 1);
                    S(e, n, t, c, c, o + 2, a);
                } else if (f instanceof mi && f.expression === i && (S(e, n, t, f, r = l(r, f), o + 1, a + 1),
                r)) return;
                0 < o || f instanceof pi && f.expression === i || f instanceof hi && f.tail_node() !== i || f instanceof et || f instanceof yi && !Er[f.operator] || (n.direct_access = !0);
            }
        }
        function T(e) {
            var n;
            e instanceof gi && ((n = e.expression) instanceof Xi && (!ue(n = n.definition()) || ((e = (e = e.property).is_constant() ? e.value : e) instanceof Gn || p.test(e)) && (n.reassigned++,
            (e instanceof Gn ? n.scope.argnames : [ n.scope.argnames[e] ]).forEach(function(e) {
                e instanceof Ui && (e.definition().fixed = !1);
            }))));
        }
        function A(o, t, e, a, n) {
            var s = new mr(function(i) {
                if (i instanceof li) return O(i), m(o), i.value.walk(o), _(o), (r = a) && (a = function() {
                    var e, n = r();
                    return ye(n, t) || void 0 === (e = tn(t, n, !0)) ? J(i, [ n, i.value ]) : e instanceof Gn ? i : n;
                }), i.name.walk(s), a = r, !0;
                if (i instanceof $i) {
                    O(i);
                    var r = a;
                    return i.elements.forEach(function(e, n) {
                        return e instanceof lr ? O(e) : (r && (a = function() {
                            return ve(gi, e, {
                                expression: r(),
                                property: ve(or, e, {
                                    value: n
                                })
                            });
                        }), void e.walk(s));
                    }), i.rest && (r && (a = t.option("rests") && function() {
                        var e = r();
                        return e instanceof Di ? ve(Di, i, {
                            elements: e.elements.slice(i.elements.length)
                        }) : i;
                    }), i.rest.walk(s)), a = r, !0;
                }
                if (i instanceof qi) {
                    O(i);
                    r = a;
                    return i.properties.forEach(function(t) {
                        O(t), t.key instanceof Gn && (m(o), t.key.walk(o), _(o)), r && (a = function() {
                            var e = t.key, n = gi;
                            return "string" == typeof e && (gr(e) ? n = _i : e = X(e, t)), ve(n, t, {
                                expression: r(),
                                property: e
                            });
                        }), t.value.walk(s);
                    }), i.rest && (a = !1, i.rest.walk(s)), a = r, !0;
                }
                return n(i, a, function() {
                    for (var e = o.stack.length, n = 0, t = s.stack.length - 1; n < t; n++) o.stack.push(s.stack[n]);
                    i.walk(o), o.stack.length = e;
                }), !0;
            });
            e.walk(s);
        }
        function u(i, e, r) {
            var o = this;
            o.inlined = !1;
            var a = i.parent(), n = wt(o) || xt(o), t = !1;
            o.walk(new mr(function(e) {
                return n ? t = !0 : e instanceof Bt ? n = !0 : e instanceof vt && e !== o || void 0;
            })), t && m(i), d(i, r, o);
            var s = !o.uses_arguments || i.has_directive("use strict");
            o.argnames.forEach(function(n, e) {
                var t = a.args[e];
                A(i, r, n, function() {
                    var e = o.argnames.indexOf(n), e = e < 0 ? t : a.args[e];
                    return (e = e instanceof hi && e.expressions.length < 2 ? e.expressions[0] : e) || ve(ur, a);
                }, u);
            });
            var f = o.rest;
            f && A(i, r, f, r.option("rests") && function() {
                return o.rest === f ? ve(Di, o, {
                    elements: a.args.slice(o.argnames.length)
                }) : f;
            }, u), kt(o, i);
            var c = i.safe_ids;
            return v(i, o), t || (i.safe_ids = c), !0;
            function u(e, n) {
                var t = e.definition();
                n && s && void 0 === t.fixed ? (g(i, t), i.loop_ids[t.id] = i.in_loop, t.fixed = n,
                t.fixed.assigns = [ e ]) : t.fixed = !1;
            }
        }
        function O(e) {
            e._squeezed = !1, e._optimized = !1, delete e.fixed, e instanceof vt && delete e._var_names;
        }
        function n(t, i) {
            return this.transform(new _r(function(e, n) {
                return e instanceof li ? ((e = e.clone()).name = e.name.transform(this), e) : e instanceof Oi ? (n(e = e.clone(), this),
                e) : e instanceof zi ? ((e = e.clone()).value = e.value.transform(this), e) : e.convert_symbol(t, i);
            }));
        }
        function t(e, n) {
            e = ve(e, this, this);
            return n(e, this), e;
        }
        function i(n, t) {
            var i = new mr(function(e) {
                return e instanceof li ? (e.value.walk(t), e.name.walk(i), !0) : e instanceof zi ? (e.key instanceof Gn && e.key.walk(t),
                e.value.walk(i), !0) : n(e);
            });
            this.walk(i);
        }
        function r(e) {
            return e(this);
        }
        function $(n, t) {
            var i = !1, r = new mr(function(e) {
                return !!i || (e instanceof li ? t ? (e.name.walk(r), !0) : i = !0 : e instanceof zi ? !t && e.key instanceof Gn ? i = !0 : (e.value.walk(r),
                !0) : n(e) ? i = !0 : void 0);
            });
            return this.walk(r), i;
        }
        function z(e) {
            return e instanceof qt || e instanceof At;
        }
        function W(e) {
            for (var n, t = 0; n = e.parent(t++); ) if (n.variables) return n;
        }
        (se = function(e, n) {
            e.DEFMETHOD("reduce_vars", n);
        })(Gn, Mn), se(Si, function(o, e, n) {
            var a = this, s = a.left, f = a.right, t = s instanceof Xi && s.definition(), i = t || s instanceof Oi;
            switch (a.operator) {
              case "=":
                return s.equivalent_to(f) && !s.has_side_effects(n) ? (f.walk(o), function e(n) {
                    {
                        var t;
                        n instanceof _i ? e(n.expression) : n instanceof gi ? (e(n.expression), n.property.walk(o)) : n instanceof Xi ? (b(t = n.definition(), n),
                        t.fixed && (n.fixed = t.fixed, n.fixed.assigns ? n.fixed.assigns.push(a) : n.fixed.assigns = [ a ])) : n.walk(o);
                    }
                }(s), a.__drop = !0) : t && f instanceof bt ? (u(), f.parent_scope.resolve().fn_defs.push(f),
                f.safe_ids = null, t.fixed && a.write_only || h(o, t, f), !0) : i ? (f.walk(o),
                u(), !0) : void T(s);

              case "&&=":
              case "||=":
              case "??=":
                return s.walk(o), m(o), i ? (f.walk(o), u()) : (T(s), f.walk(o)), _(o), !0;

              default:
                if (!i) return void T(s);
                t.assignments++;
                var r = t.fixed;
                if (ce(n, o, a, a, 0)) return void (t.fixed = !1);
                var c = w(o, t);
                return f.walk(o), c && !s.in_arg && x(o, t) ? (b(t, s), g(o, t), t.single_use && (t.single_use = !1),
                s.fixed = t.fixed = function() {
                    return ve(ki, a, {
                        operator: a.operator.slice(0, -1),
                        left: k(s, r),
                        right: a.right
                    });
                }, s.fixed.assigns = r && r.assigns ? r.assigns.slice() : [], s.fixed.assigns.push(a)) : (s.walk(o),
                t.fixed = !1), !0;
            }
            function u() {
                var e = t && xn(o, t), r = ce(n, o, a, f, 0, E(f), e);
                A(o, n, s, function() {
                    return a.right;
                }, function(e, n, t) {
                    if (!(e instanceof Xi)) return T(e), void t();
                    var i = e.definition();
                    i.assignments++, n && !r && !e.in_arg && x(o, i) ? (b(i, e), g(o, i), (s instanceof Oi || 1 == i.orig.length && i.orig[0] instanceof Vi) && (i.single_use = !1),
                    o.loop_ids[i.id] = o.in_loop, S(o, i, e.scope, a, f, 0, 1), e.fixed = i.fixed = n,
                    e.fixed.assigns = [ a ]) : (t(), i.fixed = !1);
                });
            }
        }), se(ki, function(e) {
            if (we[this.operator]) return this.left.walk(e), m(e), this.right.walk(e), _(e),
            !0;
        }), se(nt, function(e, n, t) {
            a(0, t, this);
        }), se(pi, function(n, e) {
            var t = this, i = t.expression;
            if (i instanceof bt) {
                var r = _e(t);
                return t.args.forEach(function(e) {
                    e.walk(n), e instanceof bi && (r = !1);
                }), r && (i.reduce_vars = u), i.walk(n), r && delete i.reduce_vars, !0;
            }
            "Call" == t.TYPE && n.in_boolean_context() && (i instanceof Xi ? i.definition().bool_fn++ : i instanceof Si && "=" == i.operator && i.left instanceof Xi && i.left.definition().bool_fn++),
            i.walk(n);
            var o = t.optional;
            o && m(n), t.args.forEach(function(e) {
                e.walk(n);
            }), o && _(n);
            o = i instanceof Xi && i.fixed_value();
            return o instanceof _t ? h(n, i.definition(), o) : n.find_parent(vt).may_call_this(),
            !0;
        }), se(Ft, function(n, e, t) {
            var i = this;
            a(0, t, i), i.extends && i.extends.walk(n);
            var r, o = i.properties.filter(function(e) {
                return O(e), e.key instanceof Gn && e.key.walk(n), e.value;
            });
            return i.name && (r = i.name.definition(), ((t = n.parent()) instanceof si || t instanceof fi) && (r.single_use = !1),
            x(n, r, !0) ? (g(n, r), n.loop_ids[r.id] = n.in_loop, r.fixed = function() {
                return i;
            }, r.fixed.assigns = [ i ], an(r) || (r.single_use = !1)) : r.fixed = !1), o.forEach(function(e) {
                !e.static || e instanceof It && e.value.contains_this() ? (m(n), e.value.walk(n),
                _(n)) : e.value.walk(n);
            }), !0;
        }), se(Ei, function(e) {
            return this.condition.walk(e), m(e), this.consequent.walk(e), _(e), m(e), this.alternative.walk(e),
            _(e), !0;
        }), se(li, function(e) {
            return this.name.walk(e), m(e), this.value.walk(e), _(e), !0;
        }), se(ft, function(e) {
            var n = e.in_loop;
            return e.in_loop = this, m(e), this.body.walk(e), en(this, e.parent()) && (_(e),
            m(e)), this.condition.walk(e), _(e), e.in_loop = n, !0;
        }), se(ut, function(e, n, t) {
            var i = this;
            a(0, t, i), i.init && i.init.walk(e);
            t = e.in_loop;
            return e.in_loop = i, m(e), i.condition && i.condition.walk(e), i.body.walk(e),
            i.step && (en(i, e.parent()) && (_(e), m(e)), i.step.walk(e)), _(e), e.in_loop = t,
            !0;
        }), se(lt, function(e, n, t) {
            var i = this;
            a(0, t, i), i.object.walk(e);
            var r = e.in_loop;
            e.in_loop = i, m(e);
            t = i.init;
            return t instanceof ti ? t.definitions[0].name.mark_symbol(function(e) {
                e instanceof Hi && ((e = e.definition()).assignments++, e.fixed = !1);
            }, e) : t instanceof Oi || t instanceof Xi ? t.mark_symbol(function(e) {
                var n;
                e instanceof Xi && (b(n = e.definition(), e), n.assignments++, e.is_immutable() || (n.fixed = !1));
            }, e) : t.walk(e), i.body.walk(e), _(e), e.in_loop = r, !0;
        }), se(Gt, function(e) {
            return this.condition.walk(e), m(e), this.body.walk(e), _(e), this.alternative && (m(e),
            this.alternative.walk(e), _(e)), !0;
        }), se(ot, function(e) {
            return m(e), this.body.walk(e), _(e), !0;
        }), se(_t, function(e, n, t) {
            var i = this;
            return Vn(i, "safe_ids") && i.safe_ids !== e.safe_ids || Hn(e.fn_visited, i) && (i.inlined = !1,
            m(e), d(e, t, i), n(), v(e, i), i.name && S(e, i.name.definition(), i, i.name, i, 0, 1)),
            !0;
        }), se($t, function(e, n, t) {
            var i = this, r = i.name.definition(), o = e.parent();
            return (o instanceof si || o instanceof fi) && (r.single_use = !1), Vn(i, "safe_ids") && i.safe_ids !== e.safe_ids || Hn(e.fn_visited, i) && (i.inlined = !1,
            m(e), d(e, t, i), n(), v(e, i)), !0;
        }), se(gi, function(e) {
            if (this.optional) return this.expression.walk(e), m(e), this.property.walk(e),
            _(e), !0;
        }), se(Jt, function(n, e, t) {
            a(0, t, this), this.expression.walk(n);
            var i = !0;
            return this.body.forEach(function(e) {
                e instanceof Kt || (e.expression.walk(n), i && (i = !1, m(n)));
            }), i || _(n), tt(this, n), !0;
        }), se(Xt, function(e) {
            return m(e), tt(this, e), _(e), !0;
        }), se(Ji, function() {
            this.definition().fixed = !1;
        }), se(Ri, function() {
            this.definition().fixed = !1;
        }), se(Xi, function(t, e, n) {
            var i = this.definition();
            b(i, this), 1 == i.references.length && !i.fixed && i.orig[0] instanceof Vi && (t.loop_ids[i.id] = t.in_loop);
            var r, o, a = xn(t, i);
            a && a.enclosed.forEach(function(e) {
                var n;
                i !== e && (e.scope.resolve() === a || (n = e.fixed && e.fixed.assigns) && (n[n.length - 1] instanceof ai || (e = t.safe_ids[e.id]) && (e.assign = !0)));
            }), !1 === i.fixed ? (o = i.redefined()) && y(i.scope, this.scope) && (o.single_use = !1) : void 0 !== i.fixed && w(t, i) ? i.fixed && (this.in_arg && i.orig[0] instanceof Wi && (this.fixed = i.scope),
            r = this.fixed_value(), a ? i.recursive_refs++ : !r || (o = i, !n.option("unused") || o.scope.pinned() || !1 === o.single_use || o.references.length - o.recursive_refs != 1 || le(o) && o.scope.uses_arguments) ? i.single_use = !1 : (i.in_loop = t.loop_ids[i.id] !== t.in_loop,
            i.single_use = D(r) && !r.pinned() && (!i.in_loop || t.parent() instanceof pi) || !i.in_loop && i.scope === this.scope.resolve() && r.is_constant_expression()),
            ce(n, t, this, r, 0, E(r), a) && (i.single_use ? i.single_use = "m" : i.fixed = !1),
            i.fixed && t.loop_ids[i.id] !== t.in_loop && (i.cross_loop = !0), S(t, i, this.scope, this, r, 0, 1)) : i.fixed = !1,
            this.fixed || (this.fixed = i.fixed), r instanceof _t && !((n = t.parent()) instanceof pi && n.expression === this) && h(t, i, r);
        }), se(tr, function(n, e) {
            var t = this.tag;
            if (t) {
                if (t instanceof bt) return this.expressions.forEach(function(e) {
                    e.walk(n);
                }), t.walk(n), !0;
                t.walk(n), this.expressions.forEach(function(e) {
                    e.walk(n);
                });
                var i = t instanceof Xi && t.fixed_value();
                return i instanceof _t ? h(n, t.definition(), i) : n.find_parent(vt).may_call_this(),
                !0;
            }
        }), se(mt, function(e, n, t) {
            return this.globals.each(function(e) {
                o(0, t, e);
            }), m(e), d(e, t, this), n(), v(e, this), !0;
        }), se(Zt, function(e, n, t) {
            var i = this;
            return a(0, t, i), m(e), tt(i, e), _(e), i.bcatch && (m(e), i.bcatch.walk(e), _(e)),
            i.bfinally && i.bfinally.walk(e), !0;
        }), se(yi, function(e, n) {
            var t = this;
            if (wr[t.operator]) {
                var i = t.expression;
                if (i instanceof Xi) {
                    var r = i.definition();
                    r.assignments++;
                    var o = r.fixed;
                    return w(e, r) && !i.in_arg && x(e, r) ? (b(r, i), g(e, r), r.single_use && (r.single_use = !1),
                    r.fixed = function() {
                        return ve(ki, t, {
                            operator: t.operator.slice(0, -1),
                            left: ve(wi, t, {
                                operator: "+",
                                expression: k(i, o)
                            }),
                            right: ve(or, t, {
                                value: 1
                            })
                        });
                    }, r.fixed.assigns = o && o.assigns ? o.assigns.slice() : [], r.fixed.assigns.push(t),
                    t instanceof wi ? i.fixed = r.fixed : (i.fixed = function() {
                        return ve(wi, t, {
                            operator: "+",
                            expression: k(i, o)
                        });
                    }, i.fixed.assigns = o && o.assigns)) : (i.walk(e), r.fixed = !1), !0;
                }
                T(i);
            }
        }), se(ai, function(i, e, n) {
            var t, r = this, o = r.value;
            return o instanceof bt && r.name instanceof Hi ? (a(), o.parent_scope.resolve().fn_defs.push(o),
            o.safe_ids = null, (t = r.name.definition()).fixed || h(i, t, o)) : o ? (o.walk(i),
            a()) : i.parent() instanceof ri && a(), !0;
            function a() {
                A(i, n, r.name, function() {
                    return r.value || ve(ur, r);
                }, function(e, n) {
                    var t = e.definition();
                    n && x(i, t, !0) ? (g(i, t), i.loop_ids[t.id] = i.in_loop, t.fixed = n, t.fixed.assigns = [ r ],
                    (e instanceof Yi && t.redefined() || !pe(e) && !an(t)) && (t.single_use = !1)) : t.fixed = !1;
                });
            }
        }), se(ct, function(e, n) {
            var t = e.in_loop;
            return e.in_loop = this, m(e), n(), _(e), e.in_loop = t, !0;
        }), mt.DEFMETHOD("reset_opt_flags", function(t) {
            var i = new mr(t.option("reduce_vars") ? function(e, n) {
                return O(e), e.reduce_vars(i, n, t);
            } : O);
            i.fn_scanning = null, i.fn_visited = [], i.in_loop = null, i.loop_ids = Object.create(null),
            i.safe_ids = Object.create(null), this.walk(i);
        }), Ii.DEFMETHOD("fixed_value", function() {
            var e = this.definition().fixed;
            return e && ((e = this.fixed ? this.fixed : e) instanceof Gn ? e : e());
        }), Xi.DEFMETHOD("is_immutable", function() {
            var e = this.redef || this.definition();
            return 1 == e.orig.length && e.orig[0] instanceof Wi;
        }), Gn.DEFMETHOD("convert_symbol", Mn), li.DEFMETHOD("convert_symbol", n), Oi.DEFMETHOD("convert_symbol", n),
        Hi.DEFMETHOD("convert_symbol", t), Xi.DEFMETHOD("convert_symbol", t), li.DEFMETHOD("mark_symbol", i),
        Oi.DEFMETHOD("mark_symbol", i), Hi.DEFMETHOD("mark_symbol", r), Xi.DEFMETHOD("mark_symbol", r),
        Gn.DEFMETHOD("match_symbol", function(e) {
            return e(this);
        }), li.DEFMETHOD("match_symbol", $), Oi.DEFMETHOD("match_symbol", $);
        var G = Bn("Infinity NaN undefined");
        function he(e, n) {
            if (e instanceof Qi) return !0;
            if (e instanceof mi) {
                if ("__proto__" === e.property) return !0;
                if ((e = e.expression) instanceof Xi) {
                    if (e.is_immutable()) return !1;
                    e = e.fixed_value();
                }
                return e ? !!e.tail_node().is_constant() || he(e, n) : !0;
            }
            if (e instanceof Xi) {
                if (e.is_immutable()) return !0;
                e = e.definition();
                return n.exposed(e) && G[e.name];
            }
            return !1;
        }
        function ve(e, n, t) {
            return t = t || {}, n && (t.start || (t.start = n.start), t.end || (t.end = n.end)),
            new e(t);
        }
        function J(e, n) {
            return 1 == n.length ? n[0] : ve(hi, e, {
                expressions: n.reduce(q, [])
            });
        }
        function X(e, n) {
            switch (typeof e) {
              case "string":
                return ve(rr, n, {
                    value: e
                });

              case "number":
                return isNaN(e) ? ve(cr, n) : isFinite(e) ? 1 / e < 0 ? ve(wi, n, {
                    operator: "-",
                    expression: ve(or, n, {
                        value: -e
                    })
                }) : ve(or, n, {
                    value: e
                }) : e < 0 ? ve(wi, n, {
                    operator: "-",
                    expression: ve(pr, n)
                }) : ve(pr, n);

              case "boolean":
                return ve(e ? vr : hr, n);

              case "undefined":
                return ve(ur, n);

              default:
                if (null === e) return ve(fr, n, {
                    value: null
                });
                if (e instanceof RegExp) return ve(sr, n, {
                    value: e
                });
                throw new Error(Yn("Can't handle constant of type: {type}", {
                    type: typeof e
                }));
            }
        }
        function K(e, n) {
            return n instanceof mi || ge(n) && "eval" == n.name;
        }
        function me(e, n, t, i) {
            var r = !1;
            return "Call" == n.TYPE ? r = n.expression === t && K(0, i) : n instanceof tr ? r = n.tag === t && K(0, i) : n instanceof wi && (r = "delete" == n.operator || "typeof" == n.operator && ge(i)),
            r ? J(t, [ ve(or, t, {
                value: 0
            }), i ]) : i;
        }
        function q(e, n) {
            return n instanceof hi ? e.push.apply(e, n.expressions) : e.push(n), e;
        }
        function C(e) {
            return e instanceof ii || e instanceof jt || e instanceof ri;
        }
        function M(e) {
            if (e instanceof $t) {
                var n = e.name.definition(), t = e.name.scope;
                return n.scope === t || Ln(n.references, function(e) {
                    var n = e.scope;
                    do {
                        if (n === t) return 1;
                    } while (n = n.parent_scope);
                });
            }
            return !C(e);
        }
        function F(e) {
            if (null === e) return [];
            if (e instanceof rt) return Ln(e.body, M) ? e.body : [ e ];
            if (e instanceof Qn) return [];
            if (Zn(e)) return [ e ];
            throw new Error("Can't convert thing to statement array");
        }
        function Q(e) {
            return null === e || (e instanceof Qn || e instanceof rt && 0 == e.body.length);
        }
        function j(e) {
            return Ln(e.body, function(e) {
                return Q(e) || e instanceof Ct || e instanceof oi && ee(e);
            });
        }
        function P(e) {
            return e instanceof at && e.body instanceof rt ? e.body : e;
        }
        function Z(e) {
            if ("Call" != e.TYPE) return !1;
            for (;(e = e.expression) instanceof mi; );
            return e instanceof bt ? !yt(e) : Z(e);
        }
        function _e(e) {
            var n = e.expression;
            if (n.name) return !1;
            if (!(e instanceof di)) return !0;
            var t = !1;
            return n.walk(new mr(function(e) {
                return !!t || (e instanceof nr ? t = !0 : e instanceof vt && e !== n || void 0);
            })), !t;
        }
        function ge(e) {
            return e instanceof Xi && e.definition().undeclared;
        }
        var be = Bn("Array Boolean clearInterval clearTimeout console Date decodeURI decodeURIComponent encodeURI encodeURIComponent Error escape eval EvalError Function isFinite isNaN JSON Map Math Number parseFloat parseInt RangeError ReferenceError RegExp Object Set setInterval setTimeout String SyntaxError TypeError unescape URIError WeakMap WeakSet");
        function ee(e) {
            return Ln(e.definitions, function(e) {
                return !e.value;
            });
        }
        function N(e, n) {
            return e instanceof jt ? n && !e.extends && Ln(e.properties, function(e) {
                return !(e.key instanceof Gn) && !(e instanceof It && e.static && e.value);
            }) : e instanceof ti ? (n || e instanceof oi) && ee(e) : e instanceof si || e instanceof fi ? N(e.body, n) : e instanceof $t;
        }
        function I(e, n) {
            var t = e.lastIndexOf(n);
            if (t < 0) return !1;
            for (;++t < e.length; ) if (!N(e[t], !0)) return !1;
            return !0;
        }
        function H(e, c) {
            var oe, ae, se;
            !function() {
                var e = c.self(), n = 0;
                do {
                    if (e instanceof ei) c.parent(n).bfinally && ((ae = ae || {}).bfinally = !0), n++; else if (e instanceof ni) n++; else if (e instanceof at) oe = !0; else {
                        if (e instanceof vt) {
                            se = e;
                            break;
                        }
                        e instanceof Zt && (ae = ae || {}, e.bcatch && (ae.bcatch = !0), e.bfinally && (ae.bfinally = !0));
                    }
                } while (e = c.parent(n++));
            }();
            for (var fe, n = 10; fe = !1, function e(n) {
                var t = [];
                for (var i = 0; i < n.length; ) {
                    var r = n[i];
                    if (r instanceof rt && Ln(r.body, M)) fe = !0, e(r.body), [].splice.apply(n, [ i, 1 ].concat(r.body)),
                    i += r.body.length; else {
                        if (r instanceof Kn) {
                            if (qn(r.value, t)) {
                                fe = !0, n.splice(i, 1);
                                continue;
                            }
                            t.push(r.value);
                        }
                        r instanceof Qn ? (fe = !0, n.splice(i, 1)) : i++;
                    }
                }
            }(e), c.option("dead_code") && function(n, t) {
                for (var e, i = t.self(), r = 0, o = 0, a = n.length; r < a; r++) {
                    var s, f = n[r];
                    if (!(f instanceof Ut) || P(s = t.loopcontrol_target(f)) !== i || f instanceof Vt && s instanceof at ? n[o++] = f : f.label && Rn(f.label.thedef.references, f),
                    Me(f)) {
                        e = n.slice(r + 1);
                        break;
                    }
                }
                n.length = o, fe = o != a, e && e.forEach(function(e) {
                    Y(t, e, n);
                });
            }(e, c), c.option("if_return") && function(i, r) {
                for (var o = r.self(), e = r.parent(), t = v(function(e) {
                    return e instanceof _t;
                }), n = t && e && "Call" == e.TYPE, a = function(e) {
                    for (var n = 0, t = e.length; 0 <= --t; ) {
                        var i = e[t];
                        if (i instanceof Gt && i.body instanceof Bt && 1 < ++n) return !0;
                    }
                    return !1;
                }(i), s = i.length; 0 <= --s; ) {
                    var f = i[s], c = w(s), u = i[c];
                    if (t && !u && f instanceof Bt) {
                        if (!f.value) {
                            fe = !0, i.splice(s, 1);
                            continue;
                        }
                        var l = f.value.tail_node();
                        if (l instanceof wi && "void" == l.operator) {
                            fe = !0, l === f.value ? d = l.expression : (d = f.value.clone()).expressions[d.length - 1] = l.expression,
                            i[s] = ve(et, f, {
                                body: d
                            });
                            continue;
                        }
                    }
                    if (f instanceof Gt) {
                        var p = Me(f.body);
                        if (g(p)) {
                            p.label && Rn(p.label.thedef.references, p), fe = !0, (f = f.clone()).condition = f.condition.negate(r);
                            var d = y(f.body, p);
                            f.body = ve(rt, f, {
                                body: F(f.alternative).concat(b())
                            }), f.alternative = ve(rt, f, {
                                body: d
                            }), i[s] = f, i[s] = f.transform(r);
                            continue;
                        }
                        if (p && !f.alternative && f.body instanceof rt && u instanceof Yt) {
                            var h = f.condition.negate(r);
                            if (h.print_to_string().length <= f.condition.print_to_string().length) {
                                fe = !0, (f = f.clone()).condition = h, i[c] = f.body, f.body = u, i[s] = f, i[s] = f.transform(r);
                                continue;
                            }
                        }
                        var h = Me(f.alternative);
                        if (g(h)) {
                            h.label && Rn(h.label.thedef.references, h), fe = !0, (f = f.clone()).body = ve(rt, f.body, {
                                body: F(f.body).concat(b())
                            });
                            d = y(f.alternative, h);
                            f.alternative = ve(rt, f.alternative, {
                                body: d
                            }), i[s] = f, i[s] = f.transform(r);
                            continue;
                        }
                        r.option("typeofs") && (p && !h && nn(f.condition, null, ve(rt, o, {
                            body: i.slice(s + 1)
                        })), !p && h && nn(f.condition, ve(rt, o, {
                            body: i.slice(s + 1)
                        })));
                    }
                    f instanceof Gt && f.body instanceof Bt && (p = f.body.value, h = f.body.in_bool || u instanceof Bt && u.in_bool,
                    p || f.alternative || !(t && !u || u instanceof Bt && !u.value) ? !f.alternative && u instanceof Bt ? (fe = !0,
                    (f = f.clone()).alternative = u, i.splice(s, 1, f.transform(r)), i.splice(c, 1)) : f.alternative || u || !t || !(h || p && a) ? (p = i[function(e) {
                        for (var n = e; 0 <= --n && N(i[n]); );
                        return n;
                    }(s)], r.option("sequences") && t && !f.alternative && (!p && n || p instanceof Gt && p.body instanceof Bt) && w(c) == i.length && u instanceof et && (fe = !0,
                    (f = f.clone()).alternative = ve(rt, u, {
                        body: [ u, ve(Bt, u, {
                            value: null
                        }) ]
                    }), i.splice(s, 1, f.transform(r)), i.splice(c, 1))) : (fe = !0, (f = f.clone()).alternative = ve(Bt, f, {
                        value: null
                    }), i.splice(s, 1, f.transform(r))) : (fe = !0, i[s] = ve(et, f.condition, {
                        body: f.condition
                    })));
                }
                function v(e) {
                    var n, t = o, i = 0;
                    do {
                        do {
                            if (e(t)) return !0;
                        } while ((t = r.parent(i++)) instanceof Gt && (n = t));
                    } while ((t instanceof rt || t instanceof vt) && I(t.body, n));
                }
                function m(n) {
                    return v(function(e) {
                        return e === n;
                    });
                }
                function _(e) {
                    if (e instanceof Bt) return t && (!(n = e.value) || n instanceof wi && "void" == n.operator);
                    if (e instanceof Ut) {
                        var n = r.loopcontrol_target(e);
                        return e instanceof Wt ? m(P(n)) : !(n instanceof at) && m(n);
                    }
                }
                function g(e) {
                    if (_(e)) {
                        for (var n = i.length; --n > s; ) {
                            var t = i[n];
                            if (t instanceof jt) {
                                if (t.name.definition().preinit) return;
                            } else if ((t instanceof ii || t instanceof ri) && !Ln(t.definitions, function(e) {
                                return !e.name.match_symbol(function(e) {
                                    return e instanceof Hi && e.definition().preinit;
                                });
                            })) return;
                        }
                        return 1;
                    }
                }
                function b() {
                    var n = [], t = !1, e = i.splice(s + 1).filter(function(e) {
                        return e instanceof $t ? (n.push(e), !1) : (C(e) && (t = !0), !0);
                    });
                    return [].push.apply(t ? e : i, n), e;
                }
                function y(e, n) {
                    for (var t, e = F(e), i = e; (t = i[i.length - 1]) !== n; ) i = t.body;
                    return i.pop(), n.value && i.push(ve(et, n.value, {
                        body: n.value.expression
                    })), e;
                }
                function w(e) {
                    for (var n = e + 1; n < i.length && N(i[n]); n++);
                    return n;
                }
            }(e, c), 0 < c.sequences_limit && (function(n, e) {
                if (!(n.length < 2)) {
                    for (var t = [], i = 0, r = 0, o = n.length; r < o; r++) {
                        var a, s = n[r];
                        s instanceof et ? (t.length >= e.sequences_limit && f(), a = s.body, (a = 0 < t.length ? a.drop_side_effect_free(e) : a) && q(t, a)) : (N(s) || f(),
                        n[i++] = s);
                    }
                    f(), (n.length = i) != o && (fe = !0);
                }
                function f() {
                    var e;
                    t.length && (e = J(t[0], t), n[i++] = ve(et, e, {
                        body: e
                    }), t = []);
                }
            }(e, c), function(e, n) {
                function t(e) {
                    r--, fe = !0;
                    var n = i.body;
                    return J(n, [ n, e ]);
                }
                for (var i, r = 0, o = 0; o < e.length; o++) {
                    var a, s = e[o];
                    if (i && (s instanceof Rt ? !s.value && z(se) || (s.value = t(s.value || ve(ur, s)).optimize(n)) : s instanceof ut ? s.init instanceof ti || (a = !1,
                    i.body.walk(new mr(function(e) {
                        return !!(a || e instanceof vt) || (e instanceof ki && "in" == e.operator ? a = !0 : void 0);
                    })), a || (s.init ? s.init = t(s.init) : (s.init = i.body, r--, fe = !0))) : s instanceof pt ? C(s.init) || (s.object = t(s.object)) : s instanceof Gt ? s.condition = t(s.condition) : (s instanceof Jt || s instanceof ht) && (s.expression = t(s.expression))),
                    n.option("conditionals") && s instanceof Gt) {
                        var f = [], c = p(s.body, f), u = p(s.alternative, f);
                        if (!1 !== c && !1 !== u && 0 < f.length) {
                            var l = f.length;
                            f.push(ve(Gt, s, {
                                condition: s.condition,
                                body: c || ve(Qn, s.body),
                                alternative: u
                            })), f.unshift(r, 1), [].splice.apply(e, f), o += l, r += l + 1, fe = !(i = null);
                            continue;
                        }
                    }
                    e[r++] = s, i = s instanceof et ? s : null;
                }
                e.length = r;
            }(e, c)), c.option("join_vars") && function(e) {
                for (var r, n = 0, t = -1; n < e.length; n++) {
                    var i, o, a = e[n], s = e[t];
                    if (a instanceof ti) s && s.TYPE == a.TYPE ? (s.definitions = s.definitions.concat(a.definitions),
                    fe = !0) : r && r.TYPE == a.TYPE && ee(a) ? (r.definitions = r.definitions.concat(a.definitions),
                    fe = !0) : a instanceof oi ? ((o = d(s, a)) ? (o.length && (s.body = J(s, o), t++),
                    fe = !0) : t++, e[t] = r = a) : e[++t] = a; else {
                        if (a instanceof Rt) a.value = f(a.value); else if (a instanceof ut) if (o = l(s, a.init)) fe = !0,
                        a.init = o.length ? J(a.init, o) : null; else {
                            if (s instanceof oi && (!a.init || a.init.TYPE == s.TYPE)) {
                                a.init && (s.definitions = s.definitions.concat(a.init.definitions)), r = a.init = s,
                                e[t] = c(a), fe = !0;
                                continue;
                            }
                            if (r && a.init && r.TYPE == a.init.TYPE && ee(a.init)) r.definitions = r.definitions.concat(a.init.definitions),
                            a.init = null, fe = !0; else if (a.init instanceof oi && (r = a.init, o = d(s, a.init))) {
                                if (fe = !0, 0 == o.length) {
                                    e[t] = c(a);
                                    continue;
                                }
                                s.body = J(s, o);
                            }
                        } else if (a instanceof lt) r && r.TYPE == a.init.TYPE && (i = r.definitions.slice(),
                        a.init = a.init.definitions[0].name.convert_symbol(Xi, function(e, n) {
                            i.push(ve(ai, n, {
                                name: n,
                                value: null
                            })), n.definition().references.push(e);
                        }), r.definitions = i, fe = !0), a.object = f(a.object); else if (a instanceof Gt) a.condition = f(a.condition); else if (a instanceof et) {
                            if (o = l(s, a.body)) {
                                if (fe = !0, !o.length) continue;
                                a.body = J(a.body, o);
                            }
                        } else (a instanceof Jt || a instanceof ht) && (a.expression = f(a.expression));
                        e[++t] = r ? c(a) : a;
                    }
                }
                function f(e) {
                    var n = l(s, e, 1);
                    if (!n) return e;
                    fe = !0;
                    var t = e.tail_node();
                    return n[n.length - 1] !== t && n.push(t.left), J(e, n);
                }
                function c(e) {
                    return e.transform(new _r(function(e, n, t) {
                        if (e instanceof ti) {
                            if (r === e) return e;
                            if (r.TYPE != e.TYPE) return e;
                            var i = this.parent();
                            return i instanceof lt && i.init === e ? e : ee(e) ? (r.definitions = r.definitions.concat(e.definitions),
                            fe = !0, i instanceof ut && i.init === e ? null : t ? In.skip : ve(Qn, e)) : e;
                        }
                        return !(e instanceof si) && !(e instanceof vt) && Zn(e) ? void 0 : e;
                    }));
                }
                e.length = t + 1;
            }(e), c.option("collapse_vars") && function(o, p) {
                if (se.pinned()) return;
                var d, i, a, s = Object.create(null), h = [], f = Object.create(null), c = o.length, u = new _r(function(e, n) {
                    if (P) return e;
                    if (!j) return e !== l[v] ? e : ++v < l.length ? R(e, u) : (j = !0, (y = (b ? X : W)(e, 0)) === e && (P = !0),
                    e);
                    var t = u.parent();
                    if (function(e, n) {
                        if (e === C) return !0;
                        if (n instanceof ut && e !== n.init) return !0;
                        if (e instanceof Si) return "=" != e.operator && x.equivalent_to(e.left);
                        if (e instanceof pi) return x instanceof mi && (!!x.equivalent_to(e.expression) && !(C instanceof bt && !C.contains_this()));
                        if (e instanceof Ft) return !p.has_directive("use strict");
                        if (e instanceof Xn) return !0;
                        if (e instanceof Ct) return T && x.name === e.name.name;
                        if (e instanceof zi) return e.key instanceof Gn;
                        if (e instanceof st) return !0;
                        if (e instanceof Ut) return !0;
                        if (e instanceof Xi) {
                            if (e.is_declared(p)) {
                                if (e.fixed_value()) return !1;
                                if (pe(e)) return !(n instanceof mi && n.expression === e) && ue(e.definition());
                            } else if (B(e, n)) return !1;
                            return F ? S = !1 : !0;
                        }
                        return e instanceof Zt || e instanceof ht;
                    }(e, t)) return P = !0, e;
                    if (!w && L(e, t) && (w = t), e.single_use && t instanceof ai && t.value === e) return e;
                    if (!(e instanceof Hi) && (E && x.equivalent_to(e) || S && (i = S(e, this)))) {
                        if (!I || w && (i || !q || !F)) return i || b || (P = !0), e;
                        if (Sr(e, t)) return b && !i && (g = !0), e;
                        if (b) return w && 0 == _ && (_ = a - N), i || N++, e;
                        if (N++, fe = P = !0, Gn.info("Collapsing {node} [{file}:{line},{col}]", {
                            node: e,
                            file: e.start.file,
                            line: e.start.line,
                            col: e.start.col
                        }), "Binary" == m.TYPE) return ve(Si, m, {
                            operator: "=",
                            left: m.right.left,
                            right: ve(Ei, m, {
                                condition: "&&" == m.operator ? m.left : m.left.negate(p),
                                consequent: m.right.right,
                                alternative: e
                            })
                        });
                        if (m instanceof xi) return x instanceof Xi && (x.definition().fixed = !1), ve(wi, m, m);
                        if (m instanceof ai) {
                            var i = m.name.definition();
                            return i.references.length - i.replaced != 1 || p.exposed(i) ? ve(Si, m, {
                                operator: "=",
                                left: ve(Xi, m.name, m.name),
                                right: m.value
                            }) : (i.replaced++, me(0, t, e, m.value));
                        }
                        for (var r = m; r.write_only && (r.write_only = !1, r instanceof Si); ) r = r.right;
                        return m;
                    }
                    if ((U(e, t) || A(e)) && (y = e) instanceof vt && (P = !0), e instanceof gt) {
                        var o = I;
                        return I = !1, n(e, u), I = o, Y(e);
                    }
                    if (e instanceof Oi) {
                        o = I;
                        return I = !1, n(e, u), I = o, Y(e);
                    }
                    if (e instanceof li) {
                        e.name = e.name.transform(u);
                        o = I;
                        return I = !1, e.value = e.value.transform(u), I = o, Y(e);
                    }
                    if (!(e instanceof nt) || e instanceof vt || e.variables && e.variables.all(function(e) {
                        return !z.has(e.name);
                    })) return R(e, u);
                    o = I;
                    return I = !1, R(e, u) || n(e, u), I = o, Y(e);
                }, Y), r = new _r(function(e) {
                    if (P) return e;
                    if (!j) {
                        if (e !== l[v]) return e;
                        switch (v++, l.length - v) {
                          case 0:
                            if (j = !0, g) return e;
                            if (e !== m) return e;
                            if (e instanceof ai) return e;
                            H.replaced++;
                            var n = r.parent();
                            return n instanceof hi && n.tail_node() !== e ? (b.replaced++, In.skip) : C;

                          case 1:
                            if (!g && e.body === m) return j = !0, H.replaced++, b.replaced++, null;

                          default:
                            return R(e, r);
                        }
                    }
                    if (e instanceof Xi && e.definition() === H) {
                        if (Sr(e, r.parent())) return e;
                        --N || (P = !0);
                        var t = C.clone();
                        return (t.scope = e.scope, t.reference(), N == _) ? (P = !0, ve(Si, m, {
                            operator: "=",
                            left: e,
                            right: t
                        })) : (H.replaced++, t);
                    }
                    return e instanceof Kt || e instanceof vt ? e : void 0;
                }, te);
                for (;0 <= --c; ) {
                    0 == c && p.option("unused") && function() {
                        var e, n, r = p.self();
                        if (r instanceof bt && !xt(r) && !r.uses_arguments && !r.pinned() && (e = p.parent()) instanceof pi && e.expression === r && _e(e) && Ln(e.args, function(e) {
                            return !(e instanceof bi);
                        })) {
                            var o = p.has_directive("use strict");
                            o && !qn(o, r.body) && (o = !1);
                            for (var a = wt(r) ? function(e) {
                                return e instanceof Ii && "await" == e.name;
                            } : function(e) {
                                return e instanceof Ti && !t.find_parent(vt);
                            }, s = null, t = new mr(function(e, n) {
                                if (!l) return !0;
                                if (a(e) || e instanceof Ai) return !(l = null);
                                if (e instanceof Qi && (o || !s)) return !(l = null);
                                if (e instanceof Xi && r.variables.has(e.name)) {
                                    var t = e.definition().scope;
                                    if (t !== se) for (;t = t.parent_scope; ) if (t === se) return !0;
                                    l = null;
                                }
                                if (e instanceof vt && !yt(e)) {
                                    var i = s;
                                    return s = e, n(), s = i, !0;
                                }
                            }), i = (d = e.args.slice()).length, f = Object.create(null), c = r.argnames.length; 0 <= --c; ) {
                                var u = r.argnames[c], l = d[c];
                                if (u instanceof li && (n = u.value, u = u.name, d[i + c] = n), u instanceof Oi) {
                                    if (!function n(e, t) {
                                        if (!t) return !(e instanceof Ii);
                                        if (e instanceof li) return t.has_side_effects(p) || e.value.has_side_effects(p) || n(e.name, ye(t) && e.value);
                                        if (e instanceof Oi) return !(!e.rest || !n(e.rest)) || (e instanceof $i ? !(t instanceof Di || t.is_string(p)) || !Ln(e.elements, function(e) {
                                            return !n(e);
                                        }) : e instanceof qi ? !t.is_defined(p) || !Ln(e.properties, function(e) {
                                            return !(e instanceof Gn && e.has_side_effects(p)) && !n(e.value);
                                        }) : void 0);
                                    }(u, l)) continue;
                                    h.length = 0;
                                    break;
                                }
                                u.name in f || (f[u.name] = !0, (l = n ? !l || ye(l) ? n : null : l) || n ? l instanceof _t && l.pinned() ? l = null : l && l.walk(t) : l = ve(ur, u).transform(p),
                                l && ((u = ve(ai, u, {
                                    name: u,
                                    value: l
                                })).name_index = c, u.arg_index = n ? i + c : c, h.unshift([ u ])));
                            }
                        }
                    }();
                    var l = [];
                    for (V(o[c]); 0 < h.length; ) {
                        l = h.pop();
                        var v = 0, m = l[l.length - 1], _ = -1, g = !1, b = null, y = null, w = null, x = function(n) {
                            if (n instanceof Si) {
                                var t = n.left;
                                if ("=" != n.operator) return t;
                                if (!(t instanceof Xi)) return t;
                                var e = t.definition();
                                return se.uses_arguments && le(e) ? t : (p.exposed(e) || (a = Z(e), e.fixed && t.fixed && ((i = e.references.filter(function(e) {
                                    return e.fixed === t.fixed;
                                }).length - 1) < a && (a = i, _ = 0)), Q(n.right)), t);
                            }
                            if (n instanceof ki) return n.right.left;
                            if (n instanceof yi) return n.expression;
                            if (n instanceof ai) {
                                e = (t = n.name).definition();
                                if (!e.const_redefs && (qn(t, e.orig) && (!se.uses_arguments || !le(e)))) {
                                    var i = e.orig.length - e.eliminated - (f[e.name] || 0);
                                    return a = Z(e), e.fixed && (a = Math.min(a, e.references.filter(function(e) {
                                        if (!e.fixed) return !0;
                                        if (!e.fixed.assigns) return !0;
                                        e = e.fixed.assigns[0];
                                        return e === t || ee(e) === n.value;
                                    }).length)), 1 < i && !(t instanceof Ui) ? (Q(n.value), ve(Xi, t, t)) : Q(n.value) || 1 == a && !p.exposed(e) ? ve(Xi, t, t) : void 0;
                                }
                            } else;
                        }(m), k = x && x.has_side_effects(p), E = x && !k && !he(x, p), S = function(n) {
                            if (!(n instanceof Si && n.right.single_use)) {
                                for (var t, i = Object.create(null), e = new mr(function(e) {
                                    e instanceof Xi && (i[e.definition().id] = !0);
                                }); n instanceof Si && "=" == n.operator; ) n.left.walk(e), n = n.right;
                                if (n instanceof Qi) return o;
                                if (n instanceof Xi) {
                                    var r = n.evaluate(p);
                                    return r === n ? o : ne(r, o);
                                }
                                if (n.is_truthy()) return ne(!0, Fn);
                                if (n.is_constant()) {
                                    r = n.evaluate(p);
                                    if (!(r instanceof Gn)) return ne(r, o);
                                }
                                return x instanceof Xi ? !!function e(n) {
                                    if (n instanceof Di) return !1;
                                    if (n instanceof ki && we[n.operator]) return e(n.left) && e(n.right);
                                    if (n instanceof pi) return !1;
                                    if (n instanceof Ei) return e(n.consequent) && e(n.alternative);
                                    if (n instanceof Ci) return !1;
                                    return !n.has_side_effects(p);
                                }(n) && (n.walk(new mr(function(e) {
                                    if (t) return !0;
                                    e instanceof Xi && i[e.definition().id] && (t = !0);
                                })), !t && o) : !1;
                            }
                            function o(e) {
                                return n.equivalent_to(e);
                            }
                        }(m);
                        if (E || S) {
                            var T = m.name instanceof Ui, A = Fn;
                            if (m.may_throw(p)) {
                                if (T && wt(se)) continue;
                                A = ae ? function(e) {
                                    return e.has_side_effects(p);
                                } : t;
                            }
                            var D = !1, O = !1, $ = !0, z = function(i) {
                                var r = new Un();
                                i instanceof ai && (i.name.definition().fixed || ($ = !1), r.add(i.name.name, x));
                                var o = se.uses_arguments && !p.has_directive("use strict"), a = se instanceof mt, s = new mr(function(e) {
                                    var n, t;
                                    e instanceof Xi ? (t = e.fixed_value()) || ((n = (t = e).definition()).undeclared || !n.assignments && n.escaped && !n.escaped.cross_scope || !de(n, e.scope, e, s.parent()) && kn(n) || ($ = !1)) : e instanceof Qi && (t = e),
                                    t && r.add(e.name, ce(p, s, e, t, 0)), o && e instanceof gi && (se.each_argname(function(e) {
                                        p.option("reduce_vars") && !e.definition().assignments || (e.definition().fixed || ($ = !1),
                                        r.add(e.name, !0));
                                    }), o = !1), a && ("Call" == e.TYPE ? O || ((t = e.expression) instanceof mi || t instanceof bt && !t.contains_this() || (O = !0)) : e instanceof mi && function e(n) {
                                        if (n instanceof Xi && !(n = n.fixed_value())) return !0;
                                        if (n instanceof Si) return "=" == n.operator && e(n.right);
                                        return n instanceof mi || n instanceof Qi;
                                    }(e.expression) && (e !== x || i instanceof yi ? D = !0 : O = !0));
                                });
                                return i.walk(s), r;
                            }(m), q = function(e) {
                                var n = vi(e);
                                return n instanceof Xi && n.definition().scope.resolve() === se && !(oe && (z.has(n.name) && z.get(n.name)[0] !== e || m instanceof yi || m instanceof Si && "=" != m.operator));
                            }(x), C = ee(m);
                            k = k || !(m instanceof yi) && C.has_side_effects(p);
                            var M = ae || !q ? function(e) {
                                return e instanceof Oi;
                            } : Fn, F = function(e) {
                                if (e instanceof yi) return !1;
                                if (k) return !1;
                                if (b) return !0;
                                if (!(x instanceof Xi)) return !1;
                                var n;
                                if (e instanceof ai) n = 1; else {
                                    if ("=" != e.operator) return !1;
                                    n = 2;
                                }
                                e = x.definition();
                                return e.references.length - e.replaced == n;
                            }(m), j = T, P = !1, N = 0, I = !d || !j;
                            if (!I) {
                                for (var e = m.arg_index + 1; !P && e < d.length; e++) d[e] && d[e].transform(u);
                                I = !0;
                            }
                            for (var n = c; !P && n < o.length; n++) o[n].transform(u);
                            if (b) {
                                if (!N || N + g < a) {
                                    h.push(l), i = !0;
                                    continue;
                                }
                                N == _ && (g = !0);
                                var H = x.definition();
                                P = !1, v = 0, j = T;
                                for (n = c; !P && n < o.length; n++) o[n].transform(r) || o.splice(n--, 1);
                                N = m instanceof ai && m === l[l.length - 1] && H.references.length == H.replaced && !p.exposed(H),
                                b.last_ref = !1, b.single_use = !1, fe = !0;
                            }
                            N && !function(e) {
                                var n = e.name_index;
                                if (0 <= n) {
                                    var t = se.argnames[n];
                                    return t instanceof li ? (t.value = ve(or, t, {
                                        value: 0
                                    }), t.name.definition().fixed = !1) : (e = p.parent().args)[n] && (e[n] = ve(or, e[n], {
                                        value: 0
                                    }), t.definition().fixed = !1), !0;
                                }
                                var i = l.length - 1;
                                l[i - 1].body === l[i] && i--;
                                var r = new _r(function(e, n, t) {
                                    return j || e !== l[v] ? e : ++v <= i ? R(e, r) : (j = !0, e instanceof ai ? (f[e.name.name] = (f[e.name.name] || 0) + 1,
                                    b && b.replaced++, (e = e.clone()).value = null, e) : t ? In.skip : null);
                                }, te);
                                return j = P = !1, v = 0, o[c].transform(r);
                            }(m) && o.splice(c, 1);
                        }
                    }
                }
                function Y(e) {
                    return P || (y === e && (P = !0), w === e && (w = null)), e;
                }
                function R(e, n) {
                    if (!(e instanceof nt)) return e instanceof Nt && !e.static ? (e.key instanceof Gn && (e.key = e.key.transform(n)),
                    e) : void 0;
                    if (e instanceof vt) return e;
                    if (e instanceof lt) return e.object = e.object.transform(n), P = !0, e;
                    if (e instanceof Jt) {
                        e.expression = e.expression.transform(n);
                        for (var t = 0; !P && t < e.body.length; t++) {
                            var i = e.body[t];
                            if (i instanceof Qt) {
                                if (!j) {
                                    if (i !== l[v]) continue;
                                    v++;
                                }
                                if (i.expression = i.expression.transform(n), !F) break;
                                S = !1;
                            }
                        }
                        return P = !0, e;
                    }
                }
                function B(e, n) {
                    return n instanceof Si ? "=" == n.operator && n.left === e : n instanceof li ? n.name === e : n instanceof $i || n instanceof zi && n.value === e;
                }
                function L(e, n) {
                    return n instanceof Si ? n.left !== e && we[n.operator.slice(0, -1)] : n instanceof ki ? n.left !== e && we[n.operator] : n instanceof pi ? n.optional && n.expression !== e : n instanceof Qt ? n.expression !== e : n instanceof Ei || n instanceof Gt ? n.condition !== e : n instanceof gi && (n.optional && n.expression !== e);
                }
                function U(e, n) {
                    if (e instanceof Ti) return 1;
                    if ("Binary" == e.TYPE) return "in" == e.operator && !bn(e.right);
                    if (e instanceof pi) {
                        var t = e.expression;
                        if (t instanceof Xi && (f = t.definition(), t = t.fixed_value()), !(t instanceof _t)) return !e.is_expr_pure(p);
                        if (f && xn(p, f, t)) return 1;
                        if (t.collapse_scanning) return;
                        t.collapse_scanning = !0;
                        var i = I;
                        I = !1;
                        var r = y, o = w;
                        if (Ln(t.argnames, function(e) {
                            if (e instanceof li) {
                                if (e.value.transform(u), P) return;
                                e = e.name;
                            }
                            return !(e instanceof Oi);
                        })) if (yt(t) && t.value) t.value.transform(u); else for (var a = 0; !P && a < t.body.length; a++) {
                            var s = t.body[a];
                            if (s instanceof Bt) {
                                s.value && s.value.transform(u);
                                break;
                            }
                            s.transform(u);
                        } else P = !0;
                        return (w = o, y = r, I = i, delete t.collapse_scanning, P) ? (P = !1, 1) : void 0;
                    }
                    if (e instanceof Rt) {
                        if (ae) {
                            if (ae.bfinally) return 1;
                            if (ae.bcatch && e instanceof Lt) return 1;
                        }
                        return k || x instanceof mi || re(x);
                    }
                    if (e instanceof Dt) return p.option("ie") && e.name && z.has(e.name.name);
                    if (e instanceof Qi) return ie(e);
                    if (e instanceof mi) {
                        if (k) return 1;
                        i = e.expression;
                        if (i instanceof Xi && ue(i.definition())) return 1;
                        if (p.option("unsafe")) {
                            if (ge(i) && be[i.name]) return;
                            if (ke(i)) return;
                        }
                        return $ ? !b && ((ae || !q) && (!e.optional && i.may_throw_on_access(p))) : 1;
                    }
                    if (e instanceof bi) return 1;
                    if (e instanceof Xi) {
                        if (ie(e)) return !B(e, n);
                        if (k && re(e)) return 1;
                        var f = e.definition();
                        return (ae || f.scope.resolve() !== se) && !pe(e);
                    }
                    if (e instanceof tr) return !e.is_expr_pure(p);
                    if (e instanceof ai) return M(e.name) || (e.value || n instanceof ri) && e.name.match_symbol(function(e) {
                        return e instanceof Hi && (z.has(e.name) || k && re(e));
                    }, !0);
                    if (e instanceof Ai) return 1;
                    e = Sr(e.left, e);
                    return e && (e instanceof mi || (M(e) || e.match_symbol(function(e) {
                        return e instanceof Xi && (z.has(e.name) || D && p.exposed(e.definition()));
                    }, !0)));
                }
                function V(e, n) {
                    var t, i, r;
                    l.push(e), e instanceof Di ? e.elements.forEach(function(e) {
                        V(e, n);
                    }) : e instanceof Si ? ((t = e.left) instanceof Oi || h.push(l.slice()), V(t), V(e.right),
                    t instanceof Xi && "=" == e.operator && (s[t.name] = (s[t.name] || 0) + 1)) : e instanceof Ti ? V(e.expression, n) : e instanceof ki ? (r = we[e.operator],
                    n && r && "??" != e.operator && e.right instanceof Si && "=" == e.right.operator && !(e.right.left instanceof Oi) && h.push(l.slice()),
                    V(e.left, !r && n), V(e.right, n)) : e instanceof pi ? (V(e.expression), e.args.forEach(V)) : e instanceof Qt ? V(e.expression) : e instanceof Ei ? (V(e.condition),
                    V(e.consequent, n), V(e.alternative, n)) : e instanceof ti ? e.definitions.forEach(V) : e instanceof _i ? V(e.expression) : e instanceof st ? (V(e.condition),
                    e.body instanceof it || V(e.body)) : e instanceof Rt ? e.value && V(e.value) : e instanceof ut ? (e.init && V(e.init, !0),
                    e.condition && V(e.condition), e.step && V(e.step, !0), e.body instanceof it || V(e.body)) : e instanceof lt ? (V(e.object),
                    e.body instanceof it || V(e.body)) : e instanceof Gt ? (V(e.condition), e.body instanceof it || V(e.body),
                    !e.alternative || e.alternative instanceof it || V(e.alternative)) : e instanceof Ci ? e.properties.forEach(function(e) {
                        l.push(e), e.key instanceof Gn && V(e.key), e instanceof Fi && V(e.value, n), l.pop();
                    }) : e instanceof hi ? (i = e.expressions.length - (n ? 0 : 1), e.expressions.forEach(function(e, n) {
                        V(e, n < i);
                    })) : e instanceof et ? V(e.body, !0) : e instanceof bi ? V(e.expression) : e instanceof gi ? (V(e.expression),
                    V(e.property)) : e instanceof Jt ? (V(e.expression), e.body.forEach(V)) : e instanceof yi ? wr[e.operator] ? h.push(l.slice()) : V(e.expression) : e instanceof ai ? (e.name instanceof Li && (e.value ? (r = e.name.definition()).references.length > r.replaced && h.push(l.slice()) : f[e.name.name] = (f[e.name.name] || 0) + 1),
                    e.value && V(e.value)) : e instanceof Ai && e.expression && V(e.expression), l.pop();
                }
                function W(e, n) {
                    var t = u.parent(n);
                    return t instanceof Di || t instanceof Si || t instanceof Ti || t instanceof ki || t instanceof pi || t instanceof Qt || t instanceof Ei ? e : t instanceof ti ? K(t, n + 1) : t instanceof Rt || t instanceof Gt || t instanceof at || t instanceof Mi || t instanceof mi ? e : t instanceof hi ? (t.tail_node() === e ? W : K)(t, n + 1) : t instanceof et ? K(t, n + 1) : t instanceof bi || t instanceof Jt || t instanceof yi || t instanceof ai || t instanceof Ai ? e : null;
                }
                function G(e, n, t) {
                    for (var i; i = e, (e = u.parent(++t)) instanceof Si && e.operator.slice(0, -1) == n || e instanceof ki && e.operator == n; );
                    return i;
                }
                function J(e, n, t, i, r) {
                    var o = I;
                    I = !1;
                    var a = y, s = w, f = u.stack;
                    return u.stack = [ i ], e.transform(u), u.stack = f, w = s, y = a, I = o, P ? (P = !1,
                    t) : n(i, r + 1);
                }
                function X(e, n) {
                    var t = u.parent(n);
                    if (t instanceof Di) return X(t, n + 1);
                    if (t instanceof Si) return A(t) || t.left.match_symbol(function(e) {
                        return e instanceof Xi && (x.name == e.name || b.name == e.name);
                    }) ? e : t.left !== e && we[i = t.operator.slice(0, -1)] ? G(t, i, n) : X(t, n + 1);
                    if (t instanceof ki) return t.left !== e && we[i = t.operator] ? G(t, i, n) : X(t, n + 1);
                    if (t instanceof pi) return t;
                    if (t instanceof Qt) return t.expression !== e ? e : X(t, n + 1);
                    if (t instanceof Ei) return t.condition !== e ? e : X(t, n + 1);
                    if (t instanceof ti) return K(t, n + 1);
                    if (t instanceof ft) return e;
                    if (t instanceof Rt) return K(t, n + 1);
                    if (t instanceof ut) return t.init !== e && t.condition !== e ? e : X(t, n + 1);
                    if (t instanceof lt) return t.init !== e ? e : X(t, n + 1);
                    if (t instanceof Gt) return t.condition !== e ? e : X(t, n + 1);
                    if (t instanceof Mi) {
                        var i = u.parent(n + 1);
                        return Ln(i.properties, function(e) {
                            return e instanceof Fi;
                        }) ? X(i, n + 2) : i;
                    }
                    return t instanceof mi ? t.expression === e ? X(t, n + 1) : e : t instanceof hi ? (t.tail_node() === e ? X : K)(t, n + 1) : t instanceof et ? K(t, n + 1) : t instanceof bi ? X(t, n + 1) : t instanceof Jt ? t.expression !== e ? e : X(t, n + 1) : t instanceof yi ? "delete" == t.operator ? e : X(t, n + 1) : t instanceof ai ? t.name.match_symbol(function(e) {
                        return e instanceof Hi && (x.name == e.name || b.name == e.name);
                    }) ? e : X(t, n + 1) : t instanceof ct ? t.condition !== e ? e : X(t, n + 1) : t instanceof Ai ? X(t, n + 1) : null;
                }
                function K(n, t) {
                    var i = u.parent(t);
                    if (U(n, i)) return n;
                    if (L(n, i)) return n;
                    if (i instanceof Di) return K(i, t + 1);
                    if (i instanceof Si) return r(i.left);
                    if (i instanceof Ti) return n;
                    if (i instanceof ki) return K(i, t + 1);
                    if (i instanceof pi) return K(i, t + 1);
                    if (i instanceof Qt) return K(i, t + 1);
                    if (i instanceof Ei) return K(i, t + 1);
                    if (i instanceof ti) return K(i, t + 1);
                    if (i instanceof Rt) return K(i, t + 1);
                    if (i instanceof Gt) return K(i, t + 1);
                    if (i instanceof at) return n;
                    if (i instanceof Mi) {
                        var e = u.parent(t + 1);
                        return Ln(e.properties, function(e) {
                            return e instanceof Fi;
                        }) ? K(e, t + 2) : e;
                    }
                    if (i instanceof mi) {
                        e = i.expression;
                        return e === n ? K(i, t + 1) : J(e, K, n, i, t);
                    }
                    return i instanceof hi || i instanceof et ? K(i, t + 1) : i instanceof bi ? n : i instanceof Jt || i instanceof yi ? K(i, t + 1) : i instanceof ai ? r(i.name) : i instanceof Ai ? n : null;
                    function r(e) {
                        return A(i) ? n : e !== n && e instanceof Oi ? J(e, K, n, i, t) : K(i, t + 1);
                    }
                }
                function Q(e) {
                    if (i) i = !1; else if (!(a < 1)) {
                        var n = e instanceof Si && "=" == e.operator ? e.left : e;
                        if (n instanceof Xi) {
                            var t = n.definition();
                            if (!t.undeclared && !ue(t)) {
                                if (n !== e) {
                                    if (he(n, p)) return;
                                    if (t.references.length - t.replaced < 2) return;
                                    e = m.clone();
                                    e[e instanceof Si ? "right" : "value"] = n, 0 <= m.name_index && (e.name_index = m.name_index,
                                    e.arg_index = m.arg_index), m = e;
                                }
                                return b = t;
                            }
                        }
                    }
                }
                function Z(e) {
                    return e.references.length - e.replaced - (s[e.name] || 0);
                }
                function ee(e) {
                    if (e instanceof Si) return e.right;
                    if (e instanceof ki) {
                        var n = e.clone();
                        return n.right = e.right.right, n;
                    }
                    return e instanceof ai ? e.value : void 0;
                }
                function ne(t, i) {
                    return function(e, n) {
                        if (n.in_boolean_context()) {
                            if (t && e.is_truthy() && !e.has_side_effects(p)) return !0;
                            if (e.is_constant()) {
                                n = e.evaluate(p);
                                if (!(n instanceof Gn)) return !n == !t;
                            }
                        }
                        return i(e);
                    };
                }
                function te(e) {
                    if (e instanceof hi) switch (e.expressions.length) {
                      case 0:
                        return null;

                      case 1:
                        return me(0, this.parent(), e, e.expressions[0]);
                    }
                }
                function ie(e) {
                    e = z.get(e.name);
                    if (e && !Ln(e, function(e) {
                        return !e;
                    })) return e[0] !== x || void (S = !1);
                }
                function re(e) {
                    e = e.definition();
                    return !(1 == e.orig.length && e.orig[0] instanceof Vi) && (e.scope.resolve() !== se || (!(!O || !p.exposed(e)) || !Ln(e.references, function(e) {
                        return e.scope.resolve() === se;
                    })));
                }
                function t(e, n) {
                    if (e instanceof Si) return t(e.left, !0);
                    if (e instanceof yi) return t(e.expression, !0);
                    if (e instanceof ai) return e.value && t(e.value);
                    if (n) {
                        if (e instanceof _i) return t(e.expression, !0);
                        if (e instanceof gi) return t(e.expression, !0);
                        if (e instanceof Xi) return e.definition().scope.resolve() !== se;
                    }
                    return !1;
                }
            }(e, c), fe && 0 < n--; );
            return e;
            function p(e, n) {
                if (!(e instanceof rt)) return e;
                for (var t = null, i = 0; i < e.body.length; i++) {
                    var r = e.body[i];
                    if (r instanceof oi && ee(r)) n.push(r); else {
                        if (t || C(r)) return !1;
                        t = r;
                    }
                }
                return t;
            }
            function u(e) {
                return e instanceof Si ? [ e ] : e instanceof hi ? e.expressions.slice() : void 0;
            }
            function l(e, n, t) {
                var i = u(n);
                if (i) {
                    for (var r = !1, o = i.length - 1; 0 <= --o; ) {
                        var a, s = i[o];
                        s instanceof Si && "=" == s.operator && s.left instanceof Xi && (a = i.slice(o + 1),
                        v(s.left, s.right, a) && (r = !0, i = i.slice(0, o + 1).concat(a)));
                    }
                    if (e instanceof ti) {
                        t = t || 0;
                        for (o = e.definitions.length; 0 <= --o; ) {
                            var f = e.definitions[o];
                            if (f.value) {
                                v(f.name, f.value, i) && (r = !0), function(e, n, t) {
                                    if (c.option("conditionals") && !(e.name instanceof Oi)) {
                                        for (var i = !1, r = e.name.definition(); n.length > t; ) {
                                            var o = hn(c, r, e.value, n[0]);
                                            if (!o) break;
                                            e.value = o, n.shift(), i = !0;
                                        }
                                        return i;
                                    }
                                }(f, i, t) && (r = !0);
                                break;
                            }
                        }
                        e instanceof oi && h(e.definitions, i, t) && (r = !0);
                    }
                    return r && i;
                }
            }
            function d(e, n) {
                if (e instanceof et && !ee(n)) {
                    var t = u(e.body);
                    if (t) {
                        e = [];
                        if (h(e, t.reverse(), 0)) return n.definitions = e.reverse().concat(n.definitions),
                        t.reverse();
                    }
                }
            }
            function h(e, n, t) {
                for (var i = !1; n.length > t; ) {
                    var r = n[0];
                    if (!(r instanceof Si)) break;
                    if ("=" != r.operator) break;
                    var o = r.left;
                    if (!(o instanceof Xi)) break;
                    if (ge(o)) break;
                    if (o.scope.resolve() !== se) break;
                    var a = o.definition();
                    if (a.scope !== se) break;
                    if (a.orig.length > a.eliminated + 1) break;
                    if ("SymbolVar" != a.orig[0].TYPE) break;
                    o = ve(Li, o, o);
                    e.push(ve(ai, r, {
                        name: o,
                        value: r.right
                    })), a.orig.push(o), a.replaced++, n.shift(), i = !0;
                }
                return i;
            }
            function v(e, n, t) {
                if (n instanceof Ci) {
                    var i = !1;
                    do {
                        var r = t[0];
                        if (!(r instanceof Si)) break;
                        if ("=" != r.operator) break;
                        if (!(r.left instanceof mi)) break;
                        var o = r.left.expression;
                        if (!(o instanceof Xi)) break;
                        if (e.name != o.name) break;
                        if (!r.right.is_constant_expression(se)) break;
                        var a = r.left.property;
                        if ((a = a instanceof Gn ? a.evaluate(c) : a) instanceof Gn) break;
                        o = "__proto__" == (a = "" + a) || c.has_directive("use strict") ? function(e) {
                            e = e.key;
                            return "string" == typeof e && e != a && "__proto__" != e;
                        } : function(e) {
                            var n = e.key;
                            return e instanceof Ni || e instanceof Pi ? "string" == typeof n && n != a : "__proto__" !== n;
                        };
                    } while (Ln(n.properties, o) && (n.properties.push(ve(Fi, r, {
                        key: a,
                        value: r.right
                    })), t.shift(), i = !0, t.length));
                    return i;
                }
            }
        }
        function Y(i, r, o) {
            var a, s = !1;
            function f(e) {
                a ? (a.push(e), M(e) || (a.required = !0)) : o.push(e);
            }
            r.walk(new mr(function(e, n) {
                if (e instanceof jt) return e.extends = null, e.properties = [], f(e), !0;
                if (e instanceof ti) {
                    var t = [];
                    return e.remove_initializers(i, t) && Gn.warn("Dropping initialization in unreachable code [{file}:{line},{col}]", e.start),
                    0 < t.length && (e.definitions = t, f(e)), !0;
                }
                if (e instanceof $t) return f(e), !0;
                if (e instanceof vt) return !0;
                if (e instanceof nt) {
                    t = a;
                    return a = [], n(), a.required ? o.push(ve(rt, r, {
                        body: a
                    })) : a.length && [].push.apply(o, a), a = t, !0;
                }
                e instanceof Ut || (s = !0);
            })), s && Gn.warn("Dropping unreachable code [{file}:{line},{col}]", r.start);
        }
        function ye(e, n) {
            return e.is_undefined || e instanceof ur || e instanceof wi && "void" == e.operator && !(n && e.expression.has_side_effects(n));
        }
        function R(e, n, t) {
            switch (e) {
              case "-":
                return n.is_negative_zero() && (!(t instanceof ir) || 0 == t.value);

              case "&&":
              case "||":
                return n.is_negative_zero() || t.is_negative_zero();

              case "*":
              case "/":
              case "%":
              case "**":
                return !0;

              default:
                return !1;
            }
        }
        function B(e, n) {
            return n || /strict/.test(e.option("pure_getters"));
        }
        function L(e, n, t) {
            switch (n) {
              case "&&":
                return t.left.is_defined(e) && t.right.is_defined(e);

              case "||":
                return t.left.is_truthy() || t.right.is_defined(e);

              case "??":
                return t.left.is_defined(e) || t.right.is_defined(e);

              default:
                return !0;
            }
        }
        Xi.DEFMETHOD("is_declared", function(e) {
            return this.defined || !this.definition().undeclared || e.option("unsafe") && be[this.name];
        }), (se = function(e, n) {
            e.DEFMETHOD("is_truthy", n);
        })(Gn, Fn), se(Di, jn), se(Si, function() {
            return "=" == this.operator && this.right.is_truthy();
        }), se(_t, jn), se(Ci, jn), se(sr, jn), se(hi, function() {
            return this.tail_node().is_truthy();
        }), se(Xi, function() {
            var e = this.fixed_value();
            if (!e) return !1;
            this.is_truthy = Fn;
            e = e.is_truthy();
            return delete this.is_truthy, e;
        }), (se = function(e, n) {
            e.DEFMETHOD("is_negative_zero", n);
        })(Gn, jn), se(Di, Fn), se(Si, function() {
            var e = this.operator;
            return "=" == e ? this.right.is_negative_zero() : R(e.slice(0, -1), this.left, this.right);
        }), se(ki, function() {
            return R(this.operator, this.left, this.right);
        }), se(ir, function() {
            return 0 == this.value && 1 / this.value < 0;
        }), se(_t, Fn), se(Ci, Fn), se(sr, Fn), se(hi, function() {
            return this.tail_node().is_negative_zero();
        }), se(Xi, function() {
            var e = this.fixed_value();
            if (!e) return !0;
            this.is_negative_zero = jn;
            e = e.is_negative_zero();
            return delete this.is_negative_zero, e;
        }), se(wi, function() {
            return "+" == this.operator && this.expression.is_negative_zero() || "-" == this.operator;
        }), se = function(e, n) {
            e.DEFMETHOD("_dot_throw", n);
        }, Gn.DEFMETHOD("may_throw_on_access", function(e, n) {
            return !e.option("pure_getters") || this._dot_throw(e, n);
        }), se(Gn, B), se(Di, Fn), se(Si, function(e) {
            var n = this.operator, t = this.left, i = this.right;
            return "=" != n ? we[n.slice(0, -1)] && (t._dot_throw(e) || i._dot_throw(e)) : !!i._dot_throw(e) && (!(t instanceof Xi) || (!(i instanceof ki && "||" == i.operator && t.name == i.left.name) || i.right._dot_throw(e)));
        }), se(ki, function(e) {
            return we[this.operator] && (this.left._dot_throw(e) || this.right._dot_throw(e));
        }), se(Ft, Fn), se(Ei, function(e) {
            return this.consequent._dot_throw(e) || this.alternative._dot_throw(e);
        }), se(ir, Fn), se(_i, function(e, n) {
            if (!B(e, n)) return !1;
            n = this.expression;
            return n instanceof Xi && (n = n.fixed_value()), !("prototype" == this.property && D(n));
        }), se(_t, Fn), se(fr, jn), se(Ci, function(n, t) {
            return B(n, t) && !Ln(this.properties, function(e) {
                return e instanceof Fi && ("__proto__" !== e.key || !e.value._dot_throw(n, t));
            });
        }), se(Qi, function(e, n) {
            return B(e, n) && !this.scope.resolve().new;
        }), se(hi, function(e) {
            return this.tail_node()._dot_throw(e);
        }), se(Xi, function(e, n) {
            if (this.is_undefined) return !0;
            if (!B(e, n)) return !1;
            if (ge(this) && this.is_declared(e)) return !1;
            if (this.is_immutable()) return !1;
            n = this.definition();
            if (ue(n) && !n.scope.rest && Ln(n.scope.argnames, function(e) {
                return e instanceof Ui;
            })) return 2 < n.scope.uses_arguments;
            n = this.fixed_value();
            return !n || (this._dot_throw = jn, n._dot_throw(e) ? (delete this._dot_throw, !0) : (this._dot_throw = Fn,
            !1));
        }), se(wi, function() {
            return "void" == this.operator;
        }), se(xi, Fn), se(ur, jn), (se = function(e, n) {
            e.DEFMETHOD("is_defined", n);
        })(Gn, Fn), se(Di, jn), se(Si, function(e) {
            var n = this.operator;
            return "=" == n ? this.right.is_defined(e) : L(e, n.slice(0, -1), this);
        }), se(ki, function(e) {
            return L(e, this.operator, this);
        }), se(Ei, function(e) {
            return this.consequent.is_defined(e) && this.alternative.is_defined(e);
        }), se(ir, jn), se(lr, Fn), se(_t, jn), se(Ci, jn), se(hi, function(e) {
            return this.tail_node().is_defined(e);
        }), se(Xi, function(e) {
            if (this.is_undefined) return !1;
            if (ge(this) && this.is_declared(e)) return !0;
            if (this.is_immutable()) return !0;
            var n = this.fixed_value();
            if (!n) return !1;
            this.is_defined = Fn;
            e = n.is_defined(e);
            return delete this.is_defined, e;
        }), se(wi, function() {
            return "void" != this.operator;
        }), se(xi, jn), se(ur, Fn), function(e) {
            e(Gn, Fn), e(Si, function(e) {
                return "=" == this.operator && this.right.is_boolean(e);
            });
            var n = Bn("in instanceof == != === !== < <= >= >");
            e(ki, function(e) {
                return n[this.operator] || we[this.operator] && this.left.is_boolean(e) && this.right.is_boolean(e);
            }), e(dr, jn);
            var t = Bn("every hasOwnProperty isPrototypeOf propertyIsEnumerable some");
            e(pi, function(e) {
                if (!e.option("unsafe")) return !1;
                e = this.expression;
                return e instanceof _i && (t[e.property] || "test" == e.property && e.expression instanceof sr);
            }), e(Ei, function(e) {
                return this.consequent.is_boolean(e) && this.alternative.is_boolean(e);
            }), e(di, Fn), e(hi, function(e) {
                return this.tail_node().is_boolean(e);
            }), e(Xi, function(e) {
                var n = this.fixed_value();
                if (!n) return !1;
                this.is_boolean = Fn;
                e = n.is_boolean(e);
                return delete this.is_boolean, e;
            });
            var i = Bn("! delete");
            e(wi, function() {
                return i[this.operator];
            });
        }(function(e, n) {
            e.DEFMETHOD("is_boolean", n);
        }), function(e) {
            e(Gn, Fn);
            var n = Bn("- * / % ** & | ^ << >> >>>");
            e(Si, function(e) {
                return n[this.operator.slice(0, -1)] || "=" == this.operator && this.right.is_number(e);
            }), e(ki, function(e) {
                return !!n[this.operator] || "+" == this.operator && ((this.left.is_boolean(e) || this.left.is_number(e)) && (this.right.is_boolean(e) || this.right.is_number(e)));
            });
            var t = Bn([ "charCodeAt", "getDate", "getDay", "getFullYear", "getHours", "getMilliseconds", "getMinutes", "getMonth", "getSeconds", "getTime", "getTimezoneOffset", "getUTCDate", "getUTCDay", "getUTCFullYear", "getUTCHours", "getUTCMilliseconds", "getUTCMinutes", "getUTCMonth", "getUTCSeconds", "getYear", "indexOf", "lastIndexOf", "localeCompare", "push", "search", "setDate", "setFullYear", "setHours", "setMilliseconds", "setMinutes", "setMonth", "setSeconds", "setTime", "setUTCDate", "setUTCFullYear", "setUTCHours", "setUTCMilliseconds", "setUTCMinutes", "setUTCMonth", "setUTCSeconds", "setYear", "toExponential", "toFixed", "toPrecision" ]);
            e(pi, function(e) {
                if (!e.option("unsafe")) return !1;
                e = this.expression;
                return e instanceof _i && (t[e.property] || ge(e.expression) && "Math" == e.expression.name);
            }), e(Ei, function(e) {
                return this.consequent.is_number(e) && this.alternative.is_number(e);
            }), e(di, Fn), e(or, jn), e(hi, function(e) {
                return this.tail_node().is_number(e);
            }), e(Xi, function(e) {
                var n = this.fixed_value();
                if (!n) return !1;
                this.is_number = Fn;
                e = n.is_number(e);
                return delete this.is_number, e;
            });
            var i = Bn("+ - ~ ++ --");
            e(yi, function() {
                return i[this.operator];
            });
        }(function(e, n) {
            e.DEFMETHOD("is_number", n);
        }), function(e) {
            e(Gn, Fn), e(Si, function(e) {
                switch (this.operator) {
                  case "+=":
                    if (this.left.is_string(e)) return !0;

                  case "=":
                    return this.right.is_string(e);
                }
            }), e(ki, function(e) {
                return "+" == this.operator && (this.left.is_string(e) || this.right.is_string(e));
            });
            var n = Bn([ "charAt", "substr", "substring", "toLowerCase", "toString", "toUpperCase", "trim" ]);
            e(pi, function(e) {
                if (!e.option("unsafe")) return !1;
                e = this.expression;
                return e instanceof _i && n[e.property];
            }), e(Ei, function(e) {
                return this.consequent.is_string(e) && this.alternative.is_string(e);
            }), e(hi, function(e) {
                return this.tail_node().is_string(e);
            }), e(rr, jn), e(Xi, function(e) {
                var n = this.fixed_value();
                if (!n) return !1;
                this.is_string = Fn;
                e = n.is_string(e);
                return delete this.is_string, e;
            }), e(tr, function(e) {
                return !this.tag || En(e, this.tag);
            }), e(wi, function() {
                return "typeof" == this.operator;
            });
        }(function(e, n) {
            e.DEFMETHOD("is_string", n);
        });
        var we = Bn("&& || ??");
        function U(e) {
            Gn.warn("global_defs {node} redefined [{file}:{line},{col}]", {
                node: e,
                file: e.start.file,
                line: e.start.line,
                col: e.start.col
            });
        }
        function ne(e, n, t) {
            return n.print_to_string().length - e.print_to_string().length < (t || 0) ? n : e;
        }
        function V(e, n, t) {
            return ne(ve(et, e, {
                body: e
            }), ve(et, n, {
                body: n
            }), t).body;
        }
        function te(e, n, t, i) {
            return (Wn(e) ? V : ne)(n, t, i);
        }
        function ie(n) {
            var t = Object.create(null);
            return Object.keys(n).forEach(function(e) {
                t[e] = Bn(n[e]);
            }), t;
        }
        function re(e) {
            for (var n = 0; n < e.length; n++) {
                var t = e[n];
                if (!(t instanceof Kn)) return t;
            }
        }
        function oe() {
            return this.value ? ve(Bt, this.value, {
                value: this.value
            }) : re(this.body);
        }
        function ae(e, n) {
            var t = n.evaluate(e);
            return t === n ? n : te(e, n, X(t, n).optimize(e), e.eval_threshold);
        }
        se = function(e, n) {
            e.DEFMETHOD("_find_defs", n);
        }, mt.DEFMETHOD("resolve_defines", function(o) {
            return o.option("global_defs") ? (this.figure_out_scope({
                ie: o.option("ie")
            }), this.transform(new _r(function(e) {
                var n = e._find_defs(o, "");
                if (n) {
                    for (var t, i = 0, r = e; (t = this.parent(i++)) && t instanceof mi && t.expression === r; ) r = t;
                    if (!Sr(r, t)) return n;
                    U(e);
                }
            }))) : this;
        }), se(Gn, Mn), se(_i, function(e, n) {
            return this.expression._find_defs(e, "." + this.property + n);
        }), se(Hi, function(e) {
            this.definition().global && Vn(e.option("global_defs"), this.name) && U(this);
        }), se(Xi, function(e, n) {
            if (this.definition().global) {
                e = e.option("global_defs"), n = this.name + n;
                return Vn(e, n) ? function n(e, t) {
                    if (e instanceof Gn) return e.clone(!0);
                    if (Array.isArray(e)) return ve(Di, t, {
                        elements: e.map(function(e) {
                            return n(e, t);
                        })
                    });
                    if (e && "object" == typeof e) {
                        var i, r = [];
                        for (i in e) Vn(e, i) && r.push(ve(Fi, t, {
                            key: i,
                            value: n(e[i], t)
                        }));
                        return ve(Ci, t, {
                            properties: r
                        });
                    }
                    return X(e, t);
                }(e[n], this) : void 0;
            }
        }), Et.DEFMETHOD("first_statement", oe), St.DEFMETHOD("first_statement", oe), _t.DEFMETHOD("first_statement", function() {
            return re(this.body);
        }), _t.DEFMETHOD("length", function() {
            for (var e = this.argnames, n = 0; n < e.length && !(e[n] instanceof li); n++);
            return n;
        });
        var se = [ "constructor", "toString", "valueOf" ], fe = ie({
            Array: [ "indexOf", "join", "lastIndexOf", "slice" ].concat(se),
            Boolean: se,
            Function: se,
            Number: [ "toExponential", "toFixed", "toPrecision" ].concat(se),
            Object: se,
            RegExp: [ "exec", "test" ].concat(se),
            String: [ "charAt", "charCodeAt", "concat", "indexOf", "italics", "lastIndexOf", "match", "replace", "search", "slice", "split", "substr", "substring", "toLowerCase", "toUpperCase", "trim" ].concat(se)
        }), xe = ie({
            Array: [ "isArray" ],
            Math: [ "abs", "acos", "asin", "atan", "ceil", "cos", "exp", "floor", "log", "round", "sin", "sqrt", "tan", "atan2", "pow", "max", "min" ],
            Number: [ "isFinite", "isNaN" ],
            Object: [ "create", "getOwnPropertyDescriptor", "getOwnPropertyNames", "getPrototypeOf", "isExtensible", "isFrozen", "isSealed", "keys" ],
            String: [ "fromCharCode", "raw" ]
        });
        function ke(e) {
            if (e instanceof _i) {
                var n = e.expression;
                if (ge(n)) {
                    var t = xe[n.name];
                    return t && (t[e.property] || "Math" == n.name && "random" == e.property);
                }
            }
        }
        function Ee(e) {
            return ve(wi, e, {
                operator: "!",
                expression: e
            });
        }
        function Se(e, n, t) {
            e = Ee(e);
            if (t) {
                t = ve(et, n, {
                    body: n
                });
                return ne(e, t) === t ? n : e;
            }
            return ne(e, n);
        }
        !function(e) {
            e(Gn, Fn), e(ir, jn), e(sr, Fn);
            var n = Bn("! ~ - + void");
            e(wi, function() {
                return n[this.operator] && this.expression instanceof ir;
            });
        }(function(e, n) {
            e.DEFMETHOD("is_constant", n);
        }), function(e) {
            Gn.DEFMETHOD("evaluate", function(e, n) {
                if (!e.option("evaluate")) return this;
                var t = [], e = this._eval(e, n, t, 1);
                return t.forEach(function(e) {
                    delete e._eval;
                }), !n && e && !(e instanceof RegExp) && ("function" == typeof e || "object" == typeof e) ? this : e;
            });
            var d = new mr(function(e) {
                e instanceof Si && f(e.left), e instanceof yi && wr[e.operator] && f(e.expression);
            });
            function f(e) {
                e instanceof $i ? e.elements.forEach(f) : e instanceof qi ? e.properties.forEach(function(e) {
                    f(e.value);
                }) : e instanceof mi ? f(e.expression) : e instanceof Xi && e.definition().references.forEach(function(e) {
                    delete e._eval;
                });
            }
            e(Jn, function() {
                throw new Error(Yn("Cannot evaluate a statement [{file}:{line},{col}]", this.start));
            }), e(gt, Pn), e(ar, Pn), e(Ft, Pn), e(Gn, Pn), e(ir, function() {
                return this.value;
            }), e(Si, function(e, n, t, i) {
                var r = this.left;
                if (!n) {
                    if (!(r instanceof Xi)) return this;
                    if (!Vn(r, "_eval")) {
                        if (!r.fixed) return this;
                        var o = r.definition();
                        if (!o.fixed) return this;
                        if (o.undeclared) return this;
                        if (o.last_ref !== r) return this;
                        if ("m" == o.single_use) return this;
                    }
                }
                o = this.operator, o = !Vn(r, "_eval") && r instanceof Xi && r.fixed && r.definition().fixed ? r : "=" == o ? this.right : ve(ki, this, {
                    operator: o.slice(0, -1),
                    left: r,
                    right: this.right
                });
                r.walk(d);
                i = o._eval(e, n, t, i);
                return "object" == typeof i ? this : (f(r), i);
            }), e(hi, function(e, n, t, i) {
                if (!n) return this;
                for (var r = this.expressions, o = 0, a = r.length - 1; o < a; o++) r[o].walk(d);
                var s = r[a], i = s._eval(e, n, t, i);
                return i === s ? this : i;
            }), e(_t, function(e) {
                if (e.option("unsafe")) {
                    e = function() {};
                    return e.node = this, e.toString = function() {
                        return "function(){}";
                    }, e;
                }
                return this;
            }), e(Di, function(e, n, t, i) {
                if (e.option("unsafe")) {
                    for (var r = [], o = 0; o < this.elements.length; o++) {
                        var a = this.elements[o];
                        if (a instanceof lr) return this;
                        var s = a._eval(e, n, t, i);
                        if (a === s) return this;
                        r.push(s);
                    }
                    return r;
                }
                return this;
            });
            var c = Bn("__proto__ toString valueOf");
            e(Ci, function(e, n, t, i) {
                if (e.option("unsafe")) {
                    for (var r = {}, o = 0; o < this.properties.length; o++) {
                        var a = this.properties[o];
                        if (!(a instanceof Fi)) return this;
                        var s = a.key;
                        if (s instanceof Gn && (s = s._eval(e, n, t, i)) === a.key) return this;
                        if (c[s]) return this;
                        if (r[s] = a.value._eval(e, n, t, i), r[s] === a.value) return this;
                    }
                    return r;
                }
                return this;
            });
            var u = Bn("! typeof void");
            e(wi, function(e, n, t, i) {
                var r = this.expression, o = this.operator;
                if (e.option("typeofs") && "typeof" == o && (r instanceof _t || r instanceof Xi && r.fixed_value() instanceof _t)) return "function";
                var a = r instanceof Xi && r.definition();
                u[o] || a && a.fixed || i++, r.walk(d);
                var s = r._eval(e, n, t, i);
                if (s === r) return n && "void" == o ? void 0 : this;
                switch (o) {
                  case "!":
                    return !s;

                  case "typeof":
                    return s instanceof RegExp ? this : typeof s;

                  case "void":
                    return;

                  case "~":
                    return ~s;

                  case "-":
                    return -s;

                  case "+":
                    return +s;

                  case "++":
                  case "--":
                    if (!a) return this;
                    if (!n) {
                        if (a.undeclared) return this;
                        if (a.last_ref !== r) return this;
                    }
                    return Vn(r, "_eval") && (s = +(o[0] + 1) + +s), f(r), s;
                }
                return this;
            }), e(xi, function(e, n, t, i) {
                var r = this.expression;
                if (r instanceof Xi) {
                    if (!Vn(r, "_eval")) {
                        if (!r.fixed) return this;
                        if (!n) {
                            var o = r.definition();
                            if (!o.fixed) return this;
                            if (o.undeclared) return this;
                            if (o.last_ref !== r) return this;
                        }
                    }
                } else if (!n) return this;
                r instanceof Xi && r.definition().fixed || i++, r.walk(d);
                i = r._eval(e, n, t, i);
                return i === r ? this : (f(r), +i);
            });
            var l = Bn("&& || === !==");
            e(ki, function(e, n, t, i) {
                l[this.operator] || i++;
                var r = this.left._eval(e, n, t, i);
                if (r === this.left) return this;
                if (this.operator == (r ? "||" : "&&")) return r;
                var o, a = this.right._eval(e, n && !(r && "object" == typeof r), t, i);
                if (a === this.right) return this;
                switch (this.operator) {
                  case "&&":
                    o = r && a;
                    break;

                  case "||":
                    o = r || a;
                    break;

                  case "??":
                    o = null == r ? a : r;
                    break;

                  case "|":
                    o = r | a;
                    break;

                  case "&":
                    o = r & a;
                    break;

                  case "^":
                    o = r ^ a;
                    break;

                  case "+":
                    o = r + a;
                    break;

                  case "-":
                    o = r - a;
                    break;

                  case "*":
                    o = r * a;
                    break;

                  case "/":
                    o = r / a;
                    break;

                  case "%":
                    o = r % a;
                    break;

                  case "<<":
                    o = r << a;
                    break;

                  case ">>":
                    o = r >> a;
                    break;

                  case ">>>":
                    o = r >>> a;
                    break;

                  case "==":
                    o = r == a;
                    break;

                  case "===":
                    o = r === a;
                    break;

                  case "!=":
                    o = r != a;
                    break;

                  case "!==":
                    o = r !== a;
                    break;

                  case "<":
                    o = r < a;
                    break;

                  case "<=":
                    o = r <= a;
                    break;

                  case ">":
                    o = a < r;
                    break;

                  case ">=":
                    o = a <= r;
                    break;

                  case "**":
                    o = Math.pow(r, a);
                    break;

                  case "in":
                    if (a && "object" == typeof a && Vn(a, r)) {
                        o = !0;
                        break;
                    }

                  default:
                    return this;
                }
                if (isNaN(o)) return e.find_parent(ht) ? this : o;
                if (e.option("unsafe_math") && !n && o && "number" == typeof o && ("+" == this.operator || "-" == this.operator)) {
                    n = Math.max(0, s(r), s(a));
                    if (n < 16) return +o.toFixed(n);
                }
                return o;
                function s(e) {
                    e = /(\.[0-9]*)?(e.+)?$/.exec(+e);
                    return (e[1] || ".").length - 1 - (e[2] || "").slice(1);
                }
            }), e(Ei, function(e, n, t, i) {
                var r = this.condition._eval(e, n, t, i);
                if (r === this.condition) return this;
                r = r ? this.consequent : this.alternative, i = r._eval(e, n, t, i);
                return i === r ? this : i;
            }), e(Xi, function(e, n, t, i) {
                var r, o = this.fixed_value();
                if (!o) return this;
                if (Vn(o, "_eval")) r = o._eval(); else {
                    if (this._eval = Pn, r = o._eval(e, n, t, i), delete this._eval, r === o) return this;
                    o._eval = function() {
                        return r;
                    }, t.push(o);
                }
                return r && "object" == typeof r && !function(n, e) {
                    var t = n.definition().escaped;
                    switch (t.length) {
                      case 0:
                        return 1;

                      case 1:
                        var i = !1;
                        return t[0].walk(new mr(function(e) {
                            return !!i || (e === n ? i = !0 : e instanceof vt || void 0);
                        })), i;

                      default:
                        return e <= t.depth;
                    }
                }(this, i) ? this : r;
            });
            var h = {
                Array: Array,
                Math: Math,
                Number: Number,
                Object: Object,
                String: String
            }, s = ie({
                Math: [ "E", "LN10", "LN2", "LOG2E", "LOG10E", "PI", "SQRT1_2", "SQRT2" ],
                Number: [ "MAX_VALUE", "MIN_VALUE", "NaN", "NEGATIVE_INFINITY", "POSITIVE_INFINITY" ]
            }), p = Bn("global ignoreCase multiline source");
            function v(e, n, t, i, r) {
                for (var o = [], a = 0; a < e.length; a++) {
                    var s = e[a], f = s._eval(n, t, i, r);
                    if (s === f) return;
                    o.push(f);
                }
                return o;
            }
            e(mi, function(e, n, t, i) {
                if (e.option("unsafe")) {
                    var r, o = this.expression;
                    if (!ge(o) && (null == (r = o._eval(e, n, t, i + 1)) || r === o)) return this;
                    var a = this.property;
                    if (a instanceof Gn && (a = a._eval(e, n, t, i)) === this.property) return this;
                    if (void 0 === r) {
                        i = s[o.name];
                        if (!i || !i[a]) return this;
                        r = h[o.name];
                    } else if (r instanceof RegExp) {
                        if (!p[a]) return this;
                    } else if ("object" == typeof r) {
                        if (!Vn(r, a)) return this;
                    } else if ("function" == typeof r) switch (a) {
                      case "name":
                        return r.node.name ? r.node.name.name : "";

                      case "length":
                        return r.node.length();

                      default:
                        return this;
                    }
                    return r[a];
                }
                return this;
            }), e(pi, function(i, r, o, a) {
                var e = this.expression, n = e instanceof Xi ? e.fixed_value() : e;
                if (n instanceof Et || n instanceof Ct || n instanceof Dt) {
                    if (n.evaluating) return this;
                    if (n.name && 0 < n.name.definition().recursive_refs) return this;
                    if (this.is_expr_pure(i)) return this;
                    var s = v(this.args, i, r, o, a);
                    if (!Ln(n.argnames, function(e, n) {
                        if (e instanceof li) {
                            if (!s) return;
                            if (void 0 === s[n]) {
                                var t = e.value._eval(i, r, o, a);
                                if (t === e.value) return;
                                s[n] = t;
                            }
                            e = e.name;
                        }
                        return !(e instanceof Oi);
                    })) return this;
                    if (n.rest instanceof Oi) return this;
                    if (!s && !r) return this;
                    var t = n.first_statement();
                    if (!(t instanceof Bt)) {
                        if (r) {
                            n.walk(d);
                            var f = !1;
                            if (n.evaluating = !0, tt(n, new mr(function(e) {
                                return !!f || (e instanceof Bt ? (e.value && void 0 !== e.value._eval(i, !0, o, a) && (f = !0),
                                !0) : e instanceof vt && e !== n || void 0);
                            })), delete n.evaluating, !f) return;
                        }
                        return this;
                    }
                    if (!(u = t.value)) return;
                    var c = [];
                    return s && (!Ln(n.argnames, function(e, n) {
                        return p(e, s[n]);
                    }) || n.rest && !p(n.rest, s.slice(n.argnames.length))) && !r || (r && n.argnames.forEach(function(e) {
                        e instanceof li && e.value.walk(d);
                    }), n.evaluating = !0, u = u._eval(i, r, o, a), delete n.evaluating), c.forEach(function(e) {
                        delete e._eval;
                    }), u === t.value ? this : u;
                }
                if (i.option("unsafe") && e instanceof mi) {
                    var u, t = e.property;
                    if (t instanceof Gn && (t = t._eval(i, r, o, a)) === e.property) return this;
                    e = e.expression;
                    if (ge(e)) {
                        var l = xe[e.name];
                        if (!l || !l[t]) return this;
                        u = h[e.name];
                    } else {
                        if (null == (u = e._eval(i, r, o, a + 1)) || u === e) return this;
                        l = fe[u.constructor.name];
                        if (!l || !l[t]) return this;
                        if (u instanceof RegExp && u.global && !(e instanceof sr)) return this;
                    }
                    if (!(s = v(this.args, i, r, o, a))) return this;
                    if ("replace" == t && "function" == typeof s[1]) return this;
                    try {
                        return u[t].apply(u, s);
                    } catch (e) {
                        Gn.warn("Error evaluating {code} [{file}:{line},{col}]", {
                            code: this,
                            file: this.start.file,
                            line: this.start.line,
                            col: this.start.col
                        });
                    } finally {
                        u instanceof RegExp && (u.lastIndex = 0);
                    }
                }
                return this;
                function p(e, n) {
                    var t = (e = e instanceof li ? e.name : e).definition();
                    if (t.orig[t.orig.length - 1] !== e) return !1;
                    var i = n;
                    return t.references.forEach(function(e) {
                        e._eval = function() {
                            return i;
                        }, c.push(e);
                    }), !0;
                }
            }), e(di, Pn), e(tr, function(e, n, t, i) {
                if (!e.option("templates")) return this;
                if (this.tag) {
                    if (!En(e, this.tag)) return this;
                    f = function(e) {
                        return e;
                    };
                }
                var r = v(this.expressions, e, n, t, i);
                if (!r) return this;
                for (var o = !1, a = f(this.strings[0]), s = 0; s < r.length; s++) a += r[s] + f(this.strings[s + 1]);
                return o ? (this._eval = Pn, this) : a;
                function f(e) {
                    return "string" != typeof (e = Sn(e)) && (o = !0), e;
                }
            });
        }(function(e, n) {
            e.DEFMETHOD("_eval", n);
        }), (se = function(e, t) {
            e.DEFMETHOD("negate", function(e, n) {
                return t.call(this, e, n);
            });
        })(Gn, function() {
            return Ee(this);
        }), se(Jn, function() {
            throw new Error("Cannot negate a statement");
        }), se(ki, function(e, n) {
            var t = this.clone(), i = this.operator;
            if (e.option("unsafe_comps")) switch (i) {
              case "<=":
                return t.operator = ">", t;

              case "<":
                return t.operator = ">=", t;

              case ">=":
                return t.operator = "<", t;

              case ">":
                return t.operator = "<=", t;
            }
            switch (i) {
              case "==":
                return t.operator = "!=", t;

              case "!=":
                return t.operator = "==", t;

              case "===":
                return t.operator = "!==", t;

              case "!==":
                return t.operator = "===", t;

              case "&&":
                return t.operator = "||", t.left = t.left.negate(e, n), t.right = t.right.negate(e),
                Se(this, t, n);

              case "||":
                return t.operator = "&&", t.left = t.left.negate(e, n), t.right = t.right.negate(e),
                Se(this, t, n);
            }
            return Ee(this);
        }), se(Pt, function() {
            return Ee(this);
        }), se(Ei, function(e, n) {
            var t = this.clone();
            return t.consequent = t.consequent.negate(e), t.alternative = t.alternative.negate(e),
            Se(this, t, n);
        }), se(bt, function() {
            return Ee(this);
        }), se(hi, function(e) {
            var n = this.expressions.slice();
            return n.push(n.pop().negate(e)), J(this, n);
        }), se(wi, function() {
            return "!" == this.operator ? this.expression : Ee(this);
        });
        var Te = Bn("Boolean decodeURI decodeURIComponent Date encodeURI encodeURIComponent Error escape EvalError isFinite isNaN Number Object parseFloat parseInt RangeError ReferenceError String SyntaxError TypeError unescape URIError"), Ae = Bn("Map Set WeakMap WeakSet");
        function De(e) {
            for (;(e = e.tail_node()) instanceof Xi; ) if (!(e = e.fixed_value())) return !0;
            return !(e instanceof Di || "Binary" == e.TYPE && !we[e.operator] || e instanceof ir || e instanceof _t || e instanceof Ci && Ln(e.properties, function(e) {
                return !(e instanceof Ni || e instanceof bi);
            }) || e instanceof Qi || e instanceof yi);
        }
        function Oe(e, n, t) {
            return !Ln(e, t ? function(e) {
                return e instanceof bi ? !t(e, n) : !e.has_side_effects(n);
            } : function(e) {
                return !e.has_side_effects(n);
            });
        }
        function $e(e, n) {
            return !e.expression.is_string(n) || e.expression.has_side_effects(n);
        }
        function ze(e, n) {
            for (var t = e.length; 0 <= --t; ) if (e[t].may_throw(n)) return !0;
            return !1;
        }
        function qe(e, n) {
            return !!e.may_throw(n) || (!((e = e instanceof Xi ? e.fixed_value() : e) instanceof _t) || (!!ze(e.argnames, n) || (!!ze(e.body, n) || yt(e) && e.value && e.value.may_throw(n))));
        }
        function Ce(e, n) {
            for (var t = e.length; 0 <= --t; ) if (!e[t].is_constant_expression(n)) return !1;
            return !0;
        }
        function Me(e) {
            return e && e.aborts();
        }
        function Fe() {
            var e = this.body.length;
            return 0 < e && Me(this.body[e - 1]);
        }
        pi.DEFMETHOD("is_expr_pure", function(e) {
            if (e.option("unsafe")) {
                var n = this.expression;
                if (ge(n)) {
                    if (Te[n.name]) return !0;
                    if (this instanceof di && Ae[n.name]) return !0;
                }
                if (ke(n)) return !0;
            }
            return e.option("annotations") && this.pure || !e.pure_funcs(this);
        }), tr.DEFMETHOD("is_expr_pure", function(e) {
            var n = this.tag;
            if (!n) return !0;
            if (e.option("unsafe")) {
                if (ge(n) && Te[n.name]) return !0;
                if (n instanceof _i && ge(n.expression)) {
                    var t = xe[n.expression.name];
                    return t && (t[n.property] || "Math" == n.expression.name && "random" == n.property);
                }
            }
            return !e.pure_funcs(this);
        }), Gn.DEFMETHOD("is_call_pure", Fn), pi.DEFMETHOD("is_call_pure", function(e) {
            if (!e.option("unsafe")) return !1;
            var n = this.expression;
            if (!(n instanceof _i)) return !1;
            var t, i = n.expression, r = n.property;
            if (i instanceof Di) t = fe.Array; else if (i.is_boolean(e)) t = fe.Boolean; else if (i.is_number(e)) t = fe.Number; else if (i instanceof sr) t = fe.RegExp; else if (i.is_string(e)) {
                if (t = fe.String, "replace" == r) {
                    i = this.args[1];
                    if (i && !i.is_string(e)) return !1;
                }
            } else n.may_throw_on_access(e) || (t = fe.Object);
            return t && t[r];
        }), (se = function(e, n) {
            e.DEFMETHOD("has_side_effects", n);
        })(Gn, jn), se(Di, function(e) {
            return Oe(this.elements, e, $e);
        }), se(Si, function(e) {
            var n = this.left;
            if (!(n instanceof mi)) return !0;
            var t = n.expression;
            return !(t instanceof Qi) || !t.scope.resolve().new || n instanceof gi && n.property.has_side_effects(e) || this.right.has_side_effects(e);
        }), se(ki, function(e) {
            return this.left.has_side_effects(e) || this.right.has_side_effects(e) || "in" == this.operator && !bn(this.right);
        }), se(it, function(e) {
            return Oe(this.body, e);
        }), se(pi, function(e) {
            return !(this.is_expr_pure(e) || this.is_call_pure(e) && !this.expression.has_side_effects(e)) || Oe(this.args, e, $e);
        }), se(Qt, function(e) {
            return this.expression.has_side_effects(e) || Oe(this.body, e);
        }), se(Ft, function(e) {
            var n = this.extends;
            return !(!n || c(n = n instanceof Xi ? n.fixed_value() : n)) || Oe(this.properties, e);
        }), se(Nt, function(e) {
            return this.key instanceof Gn && this.key.has_side_effects(e) || this.static && this.value && this.value.has_side_effects(e);
        }), se(Ei, function(e) {
            return this.condition.has_side_effects(e) || this.consequent.has_side_effects(e) || this.alternative.has_side_effects(e);
        }), se(ir, Fn), se(ti, function(e) {
            return Oe(this.definitions, e);
        }), se($i, function(e) {
            return Oe(this.elements, e);
        }), se(zi, function(e) {
            return this.key instanceof Gn && this.key.has_side_effects(e) || this.value.has_side_effects(e);
        }), se(qi, function(e) {
            return Oe(this.properties, e);
        }), se(_i, function(e) {
            return !this.optional && this.expression.may_throw_on_access(e) || this.expression.has_side_effects(e);
        }), se(Qn, Fn), se(Gt, function(e) {
            return this.condition.has_side_effects(e) || this.body && this.body.has_side_effects(e) || this.alternative && this.alternative.has_side_effects(e);
        }), se(ot, function(e) {
            return this.body.has_side_effects(e);
        }), se(_t, Fn), se(Ci, function(e) {
            return Oe(this.properties, e, function(e, n) {
                e = e.expression;
                return De(e) || e.has_side_effects(n);
            });
        }), se(Qi, Fn), se(Mi, function(e) {
            return this.key instanceof Gn && this.key.has_side_effects(e) || this.value.has_side_effects(e);
        }), se(hi, function(e) {
            return Oe(this.expressions, e);
        }), se(et, function(e) {
            return this.body.has_side_effects(e);
        }), se(gi, function(e) {
            return !this.optional && this.expression.may_throw_on_access(e) || this.expression.has_side_effects(e) || this.property.has_side_effects(e);
        }), se(Jt, function(e) {
            return this.expression.has_side_effects(e) || Oe(this.body, e);
        }), se(Hi, Fn), se(Xi, function(e) {
            return !this.is_declared(e) || !pe(this, e);
        }), se(tr, function(e) {
            return !this.is_expr_pure(e) || Oe(this.expressions, e);
        }), se(Zt, function(e) {
            return Oe(this.body, e) || this.bcatch && this.bcatch.has_side_effects(e) || this.bfinally && this.bfinally.has_side_effects(e);
        }), se(yi, function(e) {
            return Er[this.operator] || this.expression.has_side_effects(e);
        }), se(ai, function() {
            return this.value;
        }), (se = function(e, n) {
            e.DEFMETHOD("may_throw", n);
        })(Gn, jn), se(ir, Fn), se(Oi, jn), se(Qn, Fn), se(_t, Fn), se(Qi, Fn), se(Hi, Fn),
        se(Di, function(e) {
            return ze(this.elements, e);
        }), se(Si, function(e) {
            return !!this.right.may_throw(e) || !(!e.has_directive("use strict") && "=" == this.operator && this.left instanceof Xi) && this.left.may_throw(e);
        }), se(ki, function(e) {
            return this.left.may_throw(e) || this.right.may_throw(e) || "in" == this.operator && !bn(this.right);
        }), se(it, function(e) {
            return ze(this.body, e);
        }), se(pi, function(e) {
            if (ze(this.args, e)) return !0;
            if (this.is_expr_pure(e)) return !1;
            this.may_throw = jn;
            e = qe(this.expression, e);
            return delete this.may_throw, e;
        }), se(Qt, function(e) {
            return this.expression.may_throw(e) || ze(this.body, e);
        }), se(Ei, function(e) {
            return this.condition.may_throw(e) || this.consequent.may_throw(e) || this.alternative.may_throw(e);
        }), se(li, function(e) {
            return this.name.may_throw(e) || this.value && this.value.may_throw(e);
        }), se(ti, function(e) {
            return ze(this.definitions, e);
        }), se(_i, function(e) {
            return !this.optional && this.expression.may_throw_on_access(e) || this.expression.may_throw(e);
        }), se(Gt, function(e) {
            return this.condition.may_throw(e) || this.body && this.body.may_throw(e) || this.alternative && this.alternative.may_throw(e);
        }), se(ot, function(e) {
            return this.body.may_throw(e);
        }), se(Ci, function(e) {
            return ze(this.properties, e);
        }), se(Mi, function(e) {
            return this.value.may_throw(e) || this.key instanceof Gn && this.key.may_throw(e);
        }), se(Bt, function(e) {
            return this.value && this.value.may_throw(e);
        }), se(hi, function(e) {
            return ze(this.expressions, e);
        }), se(et, function(e) {
            return this.body.may_throw(e);
        }), se(gi, function(e) {
            return !this.optional && this.expression.may_throw_on_access(e) || this.expression.may_throw(e) || this.property.may_throw(e);
        }), se(Jt, function(e) {
            return this.expression.may_throw(e) || ze(this.body, e);
        }), se(Xi, function(e) {
            return !this.is_declared(e) || !pe(this, e);
        }), se(tr, function(e) {
            if (ze(this.expressions, e)) return !0;
            if (this.is_expr_pure(e)) return !1;
            if (!this.tag) return !1;
            this.may_throw = jn;
            e = qe(this.tag, e);
            return delete this.may_throw, e;
        }), se(Zt, function(e) {
            return (this.bcatch ? this.bcatch.may_throw(e) : ze(this.body, e)) || this.bfinally && this.bfinally.may_throw(e);
        }), se(yi, function(e) {
            return this.expression.may_throw(e) && !("typeof" == this.operator && this.expression instanceof Xi);
        }), se(ai, function(e) {
            return this.name.may_throw(e) || this.value && this.value.may_throw(e);
        }), (se = function(e, n) {
            e.DEFMETHOD("is_constant_expression", n);
        })(Gn, Fn), se(Di, function(e) {
            return Ce(this.elements, e);
        }), se(ki, function(e) {
            return this.left.is_constant_expression(e) && this.right.is_constant_expression(e) && ("in" != this.operator || bn(this.right));
        }), se(Ft, function(e) {
            var n = this.extends;
            return !(n && !c(n)) && Ce(this.properties, e);
        }), se(Nt, function(e) {
            return "string" == typeof this.key && (!this.value || this.value.is_constant_expression(e));
        }), se(ir, jn), se(_t, function(i) {
            var r = this, o = !0, a = [];
            return r.walk(new mr(function(e, n) {
                if (!o) return !0;
                if (e instanceof nt) return e === r ? void 0 : (a.push(e), n(), a.pop(), !0);
                if (e instanceof Xi) {
                    if (r.inlined || e.redef) return !(o = !1);
                    if (r.variables.has(e.name)) return !0;
                    var t = e.definition();
                    if (qn(t.scope, a)) return !0;
                    if (i && !t.redefined()) {
                        n = i.find_variable(e.name);
                        if (n ? n === t : t.undeclared) return o = "f", !0;
                    }
                    return !(o = !1);
                }
                return e instanceof Qi ? (yt(r) && Ln(a, function(e) {
                    return !(e instanceof vt) || yt(e);
                }) && (o = !1), !0) : void 0;
            })), o;
        }), se(Ci, function(e) {
            return Ce(this.properties, e);
        }), se(Mi, function(e) {
            return "string" == typeof this.key && this.value.is_constant_expression(e);
        }), se(yi, function(e) {
            return this.expression.is_constant_expression(e);
        }), (se = function(e, n) {
            e.DEFMETHOD("aborts", n);
        })(Jn, Nn), se(Yt, Pn), se(rt, Fe), se(Xt, Fe), se(Gt, function() {
            return this.alternative && Me(this.body) && Me(this.alternative) && this;
        });
        var je = Bn([ "use asm", "use strict" ]);
        function Pe(e, n, t) {
            switch (e.body.length) {
              case 0:
                return t ? In.skip : ve(Qn, e);

              case 1:
                var i = e.body[0];
                return M(i) ? n instanceof at && i instanceof $t ? e : i : e;
            }
            return e;
        }
        function Ne(e, n) {
            n.option("rests") && (e.uses_arguments || e.rest instanceof $i && n.drop_fargs(e, n.parent()) && (e.argnames = e.argnames.concat(e.rest.elements),
            e.rest = e.rest.rest));
        }
        function Ie(e, n) {
            if (!n.option("arrows")) return e;
            Ne(e, n);
            var t = H(e.value ? [ e.first_statement() ] : e.body, n);
            switch (t.length) {
              case 1:
                var i = t[0];
                if (i instanceof Bt) {
                    e.body.length = 0, e.value = i.value;
                    break;
                }

              default:
                e.body = t, e.value = null;
            }
            return e;
        }
        e(Kn, function(e, n) {
            return !n.option("directives") || je[e.value] && n.has_directive(e.value) === e ? e : ve(Qn, e);
        }), e(Xn, function(e, n) {
            return n.option("drop_debugger") ? ve(Qn, e) : e;
        }), e(ot, function(e, n) {
            return n.option("dead_code") && e.body instanceof Vt && n.loopcontrol_target(e.body) === e.body ? ve(Qn, e) : n.option("unused") && 0 == e.label.references.length ? e.body : e;
        }), e(Ut, function(e, n) {
            if (!n.option("dead_code")) return e;
            var t, i = e.label;
            return i && (t = n.loopcontrol_target(e), e.label = null, n.loopcontrol_target(e) === t ? Rn(i.thedef.references, e) : e.label = i),
            e;
        }), e(it, function(e, n) {
            return e.body = H(e.body, n), e;
        }), e(rt, function(e, n) {
            return e.body = H(e.body, n), Pe(e, n.parent());
        }), e(_t, function(e, n) {
            return Ne(e, n), e.body = H(e.body, n), e;
        }), e(Et, Ie), e(St, Ie), e(Dt, function(n, e) {
            Ne(n, e), n.body = H(n.body, e);
            var t = e.parent();
            if (e.option("inline")) for (var i = 0; i < n.body.length; i++) {
                var r = n.body[i];
                if (!(r instanceof Kn)) {
                    if (r instanceof Bt) {
                        if (i != n.body.length - 1) break;
                        var o = r.value;
                        if (!o || "Call" != o.TYPE) break;
                        if (o.is_expr_pure(e)) break;
                        var a = o.expression;
                        if (a instanceof Xi) {
                            if (n.name && n.name.definition() === a.definition()) break;
                            a = a.fixed_value();
                        }
                        if (!(a instanceof Ct || a instanceof Dt)) break;
                        if (a.rest) break;
                        if (a.uses_arguments) break;
                        if (a === o.expression) {
                            if (a.parent_scope !== n) break;
                            if (!Ln(a.enclosed, function(e) {
                                return e.scope !== n;
                            })) break;
                        }
                        if (a.name && (t instanceof Ht || t instanceof ji) && t.value === e.self()) break;
                        if (a.contains_this()) break;
                        var s = a.argnames.length;
                        if (0 < s && e.option("inline") < 2) break;
                        if (s > n.argnames.length) break;
                        if (!Ln(n.argnames, function(e) {
                            return e instanceof Ui;
                        })) break;
                        if (!Ln(o.args, function(e) {
                            return !(e instanceof bi);
                        })) break;
                        for (var f = 0; f < s; f++) {
                            var c = o.args[f];
                            if (!(c instanceof Xi)) break;
                            if (c.definition() !== n.argnames[f].definition()) break;
                        }
                        if (f < s) break;
                        for (;f < o.args.length && !o.args[f].has_side_effects(e); f++);
                        if (f < o.args.length) break;
                        if (s < n.argnames.length && !e.drop_fargs(n, t)) {
                            if (!e.drop_fargs(a, o)) break;
                            for (;a.argnames.push(a.make_var(Ui, a, "argument_" + s)), ++s < n.argnames.length; );
                        }
                        return o.expression;
                    }
                    break;
                }
            }
            return n;
        });
        var He = Bn("arguments await yield");
        function Ye(e, n) {
            for (var t = n.length; 0 <= --t; ) n[t] || (n[t] = ve(lr, e));
        }
        function Re(e, n) {
            var t = ve(Pt, e, e);
            return t.name = n ? null : ve(Gi, e.name, e.name), t;
        }
        function Be(e, n) {
            var t;
            switch (e.CTOR) {
              case zt:
                t = Tt;
                break;

              case qt:
                t = At;
                break;

              case Ct:
                t = Dt;
                break;

              case Mt:
                t = Ot;
            }
            var i = ve(t, e, e);
            return i.name = n ? null : ve(Wi, e.name, e.name), i;
        }
        function Le(n, t) {
            n.walk(new mr(function(e) {
                return e instanceof Bt ? (t(e), !0) : e instanceof vt && e !== n || void 0;
            }));
        }
        function Ue(e) {
            var n = Object.create(null);
            return Le(e, function(e) {
                e = e.value;
                (e = e && e.tail_node()) instanceof Xi && (e = e.definition().id, n[e] = (n[e] || 0) + 1);
            }), n;
        }
        function Ve(e, n, t) {
            return e.bool_fn + (n[e.id] || 0) === e.references.length - e.replaced && !t.exposed(e);
        }
        function We(e, i) {
            Le(e, function(e) {
                e.in_bool = !0;
                var n, t = e.value;
                t && ((n = tn(i, t)) ? n instanceof Gn || (t = t.drop_side_effect_free(i), e.value = t ? J(e.value, [ t, ve(or, e.value, {
                    value: 1
                }) ]) : ve(or, e.value, {
                    value: 1
                })) : (t = t.drop_side_effect_free(i), e.value = t ? J(e.value, [ t, ve(or, e.value, {
                    value: 0
                }) ]) : null));
            });
        }
        function Ge(e, n) {
            if (!e.name || !n.option("ie")) return 1;
            e = e.name.definition();
            return !n.exposed(e) && Ln(e.references, function(e) {
                return !(e instanceof Xi);
            });
        }
        function Je(e, n, t, i) {
            for (var r = e.length, o = [], a = !1, s = 0; s < r; s++) {
                var f = e[s], c = i && f instanceof bi ? i(f, n, t) : f.drop_side_effect_free(n, t);
                c !== f && (a = !0), c && (o.push(c), t = !1);
            }
            return o.length ? a ? o : e : null;
        }
        function Xe(e, n, t) {
            var i = e.expression;
            return i.is_string(n) ? i.drop_side_effect_free(n, t) : e;
        }
        function Ke(e) {
            return e instanceof bi ? ve(Di, e, {
                elements: [ e ]
            }) : e;
        }
        function Qe(o, n) {
            var e, t = yt(n), i = wt(n), r = !1;
            if (t && o.option("arrows") ? n.value ? i && !yn(o, n.value) || (n.value = n.value.drop_side_effect_free(o)) : r = !0 : (n instanceof Tt || n instanceof Dt) && (r = !n.name || (e = n.name.definition()).references.length == e.replaced),
            r && (n.process_expression(!1, function(e) {
                var n = e.value;
                if (n) {
                    if (i && !yn(o, n)) return e;
                    n = n.drop_side_effect_free(o, !0);
                }
                return n ? ve(et, e, {
                    body: n
                }) : ve(Qn, e);
            }), Le(n, function(e) {
                var n = e.value;
                n && (i && !yn(o, n) || (e.value = n.drop_side_effect_free(o)));
            })), i && o.option("awaits")) {
                r && n.process_expression("awaits", function(e) {
                    var n = e.body;
                    if (n instanceof Ti) {
                        if (yn(o, n.expression)) {
                            if (!(n = n.expression.drop_side_effect_free(o, !0))) return ve(Qn, e);
                            e.body = n;
                        }
                    } else if (n instanceof hi) {
                        for (var t = n.expressions, i = t.length; 0 <= --i; ) {
                            var r = t[i];
                            if (!(r instanceof Ti)) break;
                            if (!yn(o, r.expression)) break;
                            if (t[i] = r.expression.drop_side_effect_free(o)) break;
                        }
                        switch (i) {
                          case -1:
                            return ve(Qn, e);

                          case 0:
                            e.body = t[0];
                            break;

                          default:
                            t.length = i + 1;
                        }
                    }
                    return e;
                });
                var a, s = !r && n.name || t && n.value && !yn(o, n.value), f = new mr(function(e) {
                    return !!s || (f.parent() === n && e.may_throw(o) || e instanceof Ti || e instanceof dt ? s = !0 : e instanceof Bt ? e.value && !yn(o, e.value) ? s = !0 : void 0 : e instanceof vt && e !== n || void 0);
                });
                if (n.walk(f), !s) {
                    switch (n.CTOR) {
                      case St:
                        a = Et;
                        break;

                      case Tt:
                        a = Dt;
                        break;

                      case At:
                        a = Ot;
                    }
                    return ve(a, n, n);
                }
            }
            return r && n.clone();
        }
        function Ze(e, n, t) {
            for (var i = [], r = [], o = e.properties, a = 0; a < o.length; a++) {
                var s = o[a];
                if (s.key instanceof Gn && i.push(s.key), s.static && s.value && s instanceof It && s.value.has_side_effects(n)) {
                    if (s.value.contains_this()) return e;
                    r.push(s.value);
                }
            }
            var f = e.extends;
            if (f && ((f = !c(f = f instanceof Xi ? f.fixed_value() : f)) || i.unshift(e.extends)),
            i = Je(i, n, t), r = Je(r, n, t = i ? !1 : t), !i) {
                if (!f && !r) return null;
                i = [];
            }
            return f && ((f = Re(e, !0)).properties = [], i.length && f.properties.push(ve(Ht, e, {
                key: J(e, i),
                value: ve(Dt, e, {
                    argnames: [],
                    body: []
                }).init_vars(f)
            })), i = [ f ]), r && i.push(ve(pi, e, {
                expression: ve(Et, e, {
                    argnames: [],
                    body: [],
                    value: J(e, r)
                }).init_vars(e.parent_scope),
                args: []
            })), J(e, i);
        }
        function en(n, e, t) {
            t = t || Ut;
            var i = !1, r = new mr(function(e) {
                return !!(i || e instanceof vt) || (e instanceof t && r.loopcontrol_target(e) === n ? i = !0 : void 0);
            });
            return e instanceof ot && r.push(e), r.push(n), n.body.walk(r), i;
        }
        function nn(e, n, t) {
            if (e instanceof ki) if (e.left instanceof rr) {
                if (e.right instanceof wi && "typeof" == e.right.operator) {
                    var i = e.right.expression;
                    if (ge(i)) {
                        var r, o, a, s = "undefined" == e.left.value;
                        switch (e.operator) {
                          case "==":
                            r = s ? t : n;
                            break;

                          case "!=":
                            r = s ? n : t;
                            break;

                          default:
                            return;
                        }
                        r && (o = i.definition(), a = new mr(function(e) {
                            if (e instanceof vt) {
                                var n = a.parent();
                                return n instanceof pi && n.expression === e ? void 0 : !0;
                            }
                            e instanceof Xi && e.definition() === o && (e.defined = !0);
                        }), r.walk(a));
                    }
                }
            } else switch (e.operator) {
              case "&&":
                nn(e.left, n), nn(e.right, n);
                break;

              case "||":
                nn(f(e.left), t), nn(f(e.right), t);
            }
            function f(e) {
                if (e instanceof ki) switch (e.operator) {
                  case "==":
                    return (e = e.clone()).operator = "!=", e;

                  case "!=":
                    return (e = e.clone()).operator = "==", e;
                }
            }
        }
        function tn(e, n, t) {
            return !!n.truthy || !(n.falsy && !t) && (!!n.is_truthy() || n.evaluate(e, !0));
        }
        function rn(e, n) {
            var t, i = 0, r = !1, o = e.self();
            if (!Zn(o)) for (;;) {
                if (t = o, (o = e.parent(i++)) instanceof ki) {
                    var a = o.operator;
                    if (!we[a]) return;
                    var s = o.left;
                    if (s === t) continue;
                    if (f(s)) switch (a) {
                      case "&&":
                        n[r ? "falsy" : "truthy"] = !0;
                        break;

                      case "||":
                      case "??":
                        n[r ? "truthy" : "falsy"] = !0;
                    }
                } else if (o instanceof Ei) {
                    a = o.condition;
                    if (a === t) continue;
                    if (f(a)) switch (t) {
                      case o.consequent:
                        n[r ? "falsy" : "truthy"] = !0;
                        break;

                      case o.alternative:
                        n[r ? "truthy" : "falsy"] = !0;
                    }
                } else {
                    if (o instanceof Rt) break;
                    if (o instanceof Gt) break;
                    if (o instanceof hi) {
                        if (o.expressions[0] === t) continue;
                    } else if (o instanceof et) break;
                }
                return;
            }
            for (;;) {
                if (t = o, (o = e.parent(i++)) instanceof rt) {
                    if (o.body[0] === t) continue;
                } else if (o instanceof Gt && f(o.condition)) switch (t) {
                  case o.body:
                    n[r ? "falsy" : "truthy"] = !0;
                    break;

                  case o.alternative:
                    n[r ? "truthy" : "falsy"] = !0;
                }
                return;
            }
            function f(e) {
                return n.equivalent_to(e) || e instanceof wi && ("!" == e.operator && (n.equivalent_to(e.expression) && (r = !0)));
            }
        }
        function on(r) {
            return function(n, t) {
                var i = !1;
                return this.definitions.forEach(function(e) {
                    e.value && (i = !0), e.name.match_symbol(function(e) {
                        e instanceof Hi && t.push(ve(ai, e, {
                            name: e,
                            value: r(n, e)
                        }));
                    }, !0);
                }), i;
            };
        }
        function an(e) {
            return "arguments" != e.name && e.orig.length < (e.orig[0] instanceof Wi ? 3 : 2);
        }
        function sn(e, n) {
            if (e.exposed(n)) return !0;
            for (var t = n.scope.resolve(), i = n.scope; i !== t; ) if ((i = i.parent_scope).var_names()[n.name]) return !0;
        }
        function fn(e) {
            return ve(oi, e, {
                definitions: e.definitions.map(function(e) {
                    return ve(ai, e, {
                        name: e.name.convert_symbol(Li, function(e, n) {
                            var t = e.definition();
                            t.orig[t.orig.indexOf(n)] = e;
                            e = t.scope.resolve();
                            t.scope !== e && ((t.scope = e).variables.set(t.name, t), e.enclosed.push(t), e.var_names()[t.name] = !0);
                        }),
                        value: e.value
                    });
                })
            });
        }
        function cn(e, n) {
            if (!n.fixed_value()) return !1;
            n = n.definition();
            return an(n) && kn(n) && !sn(e, n);
        }
        function un(e, n) {
            return n.option("varify") && Ln(e.definitions, function(e) {
                return !e.name.match_symbol(function(e) {
                    if (e instanceof Hi) return !cn(n, e);
                }, !0);
            }) ? fn(e) : e;
        }
        function ln(e, n) {
            if (n.option("optional_chains") && e.terminal) do {
                var t = e.expression;
                if (e.optional) {
                    var i = tn(n, t, !0);
                    if (null == i) return ve(wi, e, {
                        operator: "void",
                        expression: t
                    }).optimize(n);
                    i instanceof Gn || (e.optional = !1);
                }
            } while (("Call" == (e = t).TYPE || e instanceof mi) && !e.terminal);
        }
        function pn(e) {
            var n = e.expression;
            if (!(n instanceof hi)) return e;
            var t = n.expressions.slice(), n = e.clone();
            return n.expression = t.pop(), t.push(n), J(e, t);
        }
        function dn(e, t, n) {
            var i = e.expression, r = i instanceof Xi ? i.fixed_value() : i;
            if (r instanceof _t && (!r.uses_arguments && !r.pinned() && !(n && n.indexOf(r) < 0) && Ln(s = e.args, function(e) {
                return !(e instanceof bi);
            }))) {
                var o = r.argnames, i = r === i && !r.name;
                if (r.rest) {
                    if (!i || !t.option("rests")) return;
                    for (var a = o.length, s = s.slice(0, a); s.length < a; ) s.push(ve(ur, e).optimize(t));
                    s.push(ve(Di, e, {
                        elements: e.args.slice(a)
                    })), o = o.concat(r.rest), r.rest = null;
                } else s = s.slice(), o = o.slice();
                for (var f = 0, c = 0, u = i && t.option("default_values"), l = i && t.drop_fargs(r, e) ? function(e, n) {
                    return !e || (e instanceof $i ? 0 == e.elements.length && !e.rest && n instanceof Di : e instanceof qi ? 0 == e.properties.length && !e.rest && n && !n.may_throw_on_access(t) : e.__unused);
                } : Fn, p = [], d = 0; d < s.length; d++) {
                    var h = o[d];
                    if (u && h instanceof li && s[d].is_defined(t) && (o[d] = h = h.name), !h || "__unused" in h) {
                        var v = s[d].drop_side_effect_free(t);
                        if (l(h)) {
                            h && o.splice(d, 1), s.splice(d, 1), v && p.push(v), d--;
                            continue;
                        }
                        if (v) p.push(v), s[f++] = J(e, p), p = []; else if (h) {
                            if (!p.length) {
                                s[f++] = ve(or, s[d], {
                                    value: 0
                                });
                                continue;
                            }
                            s[f++] = J(e, p), p = [];
                        }
                    } else {
                        if (l(h, s[d])) {
                            v = s[d].drop_side_effect_free(t);
                            o.splice(d, 1), s.splice(d, 1), v && p.push(v), d--;
                            continue;
                        }
                        p.push(s[d]), s[f++] = J(e, p), p = [];
                    }
                    c = f;
                }
                for (;d < o.length; d++) l(o[d]) && o.splice(d--, 1);
                r.argnames = o, s.length = c, e.args = s, p.length && (r = J(e, p), s.push(s.length < o.length ? ve(wi, e, {
                    operator: "void",
                    expression: r
                }) : r));
            }
        }
        function hn(t, i, e, n) {
            if (n instanceof ki && ("&&" == n.operator || "||" == n.operator) && n.right instanceof Si && "=" == n.right.operator && n.right.left instanceof Xi && n.right.left.definition() === i && !e.has_side_effects(t) && r(n.left) && r(n.right.right)) return i.replaced++,
            "&&" == n.operator ? ve(Ei, n, {
                condition: n.left,
                consequent: n.right.right,
                alternative: e
            }) : ve(Ei, n, {
                condition: n.left,
                consequent: e,
                alternative: n.right.right
            });
            function r(e) {
                if (!e.has_side_effects(t)) {
                    var n = !1;
                    return e.walk(new mr(function(e) {
                        return !!n || (e instanceof Xi && e.definition() === i ? n = !0 : void 0);
                    })), !n;
                }
            }
        }
        vt.DEFMETHOD("merge_variables", function(l) {
            if (l.option("merge_vars")) {
                var p, d, h = {}, v = this, a = [], s = [], f = 0, m = new Un(), _ = Object.create(null), c = Object.create(null), g = new mr(function(i, e) {
                    if (i instanceof Si) {
                        var n = i.left, t = i.right;
                        if (n instanceof Oi) {
                            t.walk(g);
                            var r = new mr(function(e) {
                                if (!(e instanceof Oi)) return e instanceof li ? (x(), e.value.walk(g), k(), e.name.walk(r)) : e instanceof zi ? e.key instanceof Gn ? (x(),
                                (h.block = e).key.walk(g), e.value.walk(r), k()) : e.value.walk(r) : e instanceof Xi ? E(e) : e.walk(g),
                                !0;
                            });
                            return n.walk(r), !0;
                        }
                        return we[i.operator.slice(0, -1)] ? (n.walk(g), x(), t.walk(g), n instanceof Xi && E(n),
                        k(), !0) : n instanceof Xi ? ("=" != i.operator && E(n, !0), t.walk(g), E(n), !0) : void 0;
                    }
                    if (i instanceof ki) return we[i.operator] ? (i.left.walk(g), x(), i.right.walk(g),
                    k(), !0) : void 0;
                    var o, a;
                    if (i instanceof Vt) return (o = g.loopcontrol_target(i)) instanceof at || S(o),
                    !0;
                    if (i instanceof pi) {
                        n = (f = i.expression).tail_node();
                        return D(n) ? (f !== n && f.expressions.slice(0, -1).forEach(function(e) {
                            e.walk(g);
                        }), i.args.forEach(function(e) {
                            e.walk(g);
                        }), n.walk(g), !0) : (e(), u(f));
                    }
                    if (i instanceof Ei) return i.condition.walk(g), x(), i.consequent.walk(g), k(),
                    x(), i.alternative.walk(g), k(), !0;
                    if (i instanceof Wt) return (o = g.loopcontrol_target(i)) instanceof ft && S(o),
                    !0;
                    if (i instanceof ft) {
                        x(), h.block = i, h.loop = !0;
                        var s = h;
                        return i.body.walk(g), h.inserted === i && (h = s), i.condition.walk(g), k(), !0;
                    }
                    if (i instanceof ut) return i.init && i.init.walk(g), x(), h.block = i, h.loop = !0,
                    i.condition && i.condition.walk(g), i.body.walk(g), i.step && i.step.walk(g), k(),
                    !0;
                    if (i instanceof lt) return i.object.walk(g), x(), h.block = i, h.loop = !0, i.init.walk(g),
                    i.body.walk(g), k(), !0;
                    if (i instanceof Gt) return i.condition.walk(g), x(), i.body.walk(g), k(), i.alternative && (x(),
                    i.alternative.walk(g), k()), !0;
                    if (i instanceof ot) {
                        x(), h.block = i;
                        s = h;
                        return i.body.walk(g), h.inserted === i && (h = s), k(), !0;
                    }
                    if (i instanceof vt) return x(), (h.block = i) === v && (d = h), i instanceof _t && (i.name && (_[i.name.definition().id] = !1),
                    r = i.uses_arguments && !g.has_directive("use strict") ? function(e) {
                        e instanceof Ui && (_[e.definition().id] = !1);
                    } : function(e) {
                        e instanceof Ui && E(e);
                    }, a = new mr(function(e) {
                        if (e instanceof Hi && (_[e.definition().id] = !1), e instanceof Xi) {
                            var n = e.definition(), t = i.variables.get(e.name);
                            return t && (t === n || n.undeclared || i.parent_scope.find_variable(e.name) === n) ? (_[n.id] = !1,
                            _[t.id] = !1) : (t = h, k(), E(e, !0), h = t), !0;
                        }
                    }), i.argnames.forEach(function(e) {
                        e.mark_symbol(r, a);
                    }), i.rest && i.rest.mark_symbol(r, a)), kt(i, g), k(), !0;
                    if (i instanceof gi) {
                        var f = i.expression;
                        return i.optional ? (f.walk(g), x(), i.property.walk(g), k()) : e(), u(f);
                    }
                    if (i instanceof Jt) {
                        i.expression.walk(g);
                        s = h;
                        return i.body.forEach(function(e) {
                            e instanceof Kt || (e.expression.walk(g), s === h && x());
                        }), h = s, i.body.forEach(function(e) {
                            x(), h.block = i;
                            var n = h;
                            tt(e, g), h.inserted === i && (h = n), k();
                        }), !0;
                    }
                    if (i instanceof Yi || i instanceof Bi) return !(_[i.definition().id] = !1);
                    if (i instanceof Xi) return E(i, !0), !0;
                    if (i instanceof Zt) {
                        f = p, s = h;
                        return tt(p = i, g), h = s, i.bcatch && (i.bcatch.argname && i.bcatch.argname.mark_symbol(function(e) {
                            e instanceof Ji && (e = e.definition(), _[e.id] = !1, (e = e.redefined()) && (_[e.id] = !1));
                        }, g), i.bfinally || (p = f) ? tt(i.bcatch, g) : (x(), tt(i.bcatch, g), k())), p = f,
                        h = s, i.bfinally && i.bfinally.walk(g), !0;
                    }
                    if (i instanceof yi) {
                        if (!wr[i.operator]) return;
                        var c = i.expression;
                        return c instanceof Xi ? (E(c, !0), !0) : void 0;
                    }
                    if (i instanceof ai) {
                        c = i.value;
                        return c ? c.walk(g) : c = h.block instanceof lt && h.block.init === g.parent(),
                        i.name.mark_symbol(c ? function(e) {
                            if (e instanceof Hi) return e instanceof Li ? E(e) : _[e.definition().id] = !1,
                            !0;
                        } : function(e) {
                            if (e instanceof Hi) {
                                var n = e.definition().id;
                                return e instanceof Li ? n in _ ? _[n] && _[n].push(e) : m.add(n, e) : _[n] = !1,
                                !0;
                            }
                        }, g), !0;
                    }
                    return i instanceof ct ? (x(), h.block = i, h.loop = !0, e(), k(), !0) : void 0;
                    function u(e) {
                        return !l.option("ie") || (e = vi(e)) instanceof Xi && e.walk(g), !0;
                    }
                });
                g.directives = Object.create(l.directives), v.walk(g);
                for (var e = Object.create(null); a.length && s.length; ) {
                    var n = a.pop(), t = n.definition;
                    if (t.id in c && _[t.id]) {
                        for (var i = {
                            start: _[t.id].start
                        }; t.id in e; ) t = e[t.id];
                        i.end = _[t.id].end;
                        var r = [];
                        do {
                            var o = s.pop();
                            if (o && !(o.index > n.index)) {
                                var u = o.definition.id, b = _[u];
                                if (b) {
                                    if (i.start.block === b.start.block && A(i, b) && (!i.start.loop && kn(t) || A(b, i)) && (!l.option("webkit") || le(t) === le(o.definition)) && Ln(b, function(e) {
                                        return e.scope.find_variable(t.name) === t;
                                    })) {
                                        var y = [], w = [];
                                        b.forEach(function(e) {
                                            e.thedef = t, e.name = t.name, (e instanceof Xi ? w : y).push(e);
                                        }), t.orig = y.concat(t.orig), t.references = w.concat(t.references), t.fixed = o.definition.fixed && t.fixed,
                                        e[u] = t;
                                        break;
                                    }
                                    r.unshift(o);
                                }
                            }
                        } while (s.length);
                        r.length && (s = s.concat(r));
                    }
                }
            }
            function x() {
                h = Object.create(h);
            }
            function k() {
                h = Object.getPrototypeOf(h);
            }
            function E(e, n) {
                var t, i, r = e.definition(), o = h;
                if (p && (x(), o = h, k()), r.id in _) {
                    if (!(i = _[r.id])) return;
                    if (i.start.block !== o.block) return _[r.id] = !1;
                    if (i.push(e), i.end = o, r.id in c) s[c[r.id]] = null; else if (!n) return;
                } else {
                    if ((t = v.variables.get(r.name)) !== r) return t && d === o && (_[t.id] = !1),
                    _[r.id] = !1;
                    if (l.exposed(r) || He[e.name]) return _[r.id] = !1;
                    if ((i = m.get(r.id) || []).push(e), _[r.id] = i, !n) return i.start = o, a.push({
                        index: f++,
                        definition: r
                    });
                    if (o.block !== v) return _[r.id] = !1;
                    i.start = d;
                }
                c[r.id] = s.length, s.push({
                    index: f++,
                    definition: r
                });
            }
            function S(e) {
                for (var n = []; ;) {
                    if (Vn(h, "block")) {
                        var t = h.block;
                        if ((t = t instanceof ot ? t.body : t) === e) break;
                    }
                    n.push(h), k();
                }
                for (h.inserted = h.block, x(); n.length; ) {
                    var i = n.pop();
                    x(), Vn(i, "block") && (h.block = i.block), Vn(i, "loop") && (h.loop = i.loop);
                }
            }
            function T(e, n) {
                return e === n || e.isPrototypeOf(n);
            }
            function A(e, n) {
                return T(e.start, e.end) || T(e.start, n.start);
            }
        }), vt.DEFMETHOD("drop_unused", function(S) {
            if (S.option("unused")) {
                var T = this, A = !(T instanceof mt) || S.toplevel.funcs, D = !(T instanceof mt) || S.toplevel.vars, O = /keep_assign/.test(S.option("unused")) ? Fn : function(e, n) {
                    var t, i = !1;
                    if (e instanceof Si ? !e.write_only && "=" != e.operator || (t = r(e.left, n)) : e instanceof yi && e.write_only && (t = r(e.expression, n)),
                    t instanceof Xi) {
                        n = t.definition();
                        if (!o[n.id] && !S.exposed(n) && pe(t, S, i)) return t;
                    }
                    function r(e, n) {
                        if (e instanceof mi) {
                            var t = e.expression;
                            if (!t.may_throw_on_access(S, !0)) return i = !0, n && e instanceof gi && n.unshift(e.property),
                            r(t, n);
                        } else if (e instanceof Si && "=" == e.operator) {
                            e.write_only = "p";
                            t = r(e.right);
                            return n ? (n.assign = e, t instanceof Xi ? t : e.left) : t;
                        }
                        return e;
                    }
                }, $ = Object.create(null), o = Object.create(null), c = function(e) {
                    return (c = function e(n, t, i) {
                        var r = S.parent(t);
                        if (!r) return i;
                        n = r instanceof _t && qn(n, r.argnames);
                        return e(r, t + 1, n ? function(e) {
                            var n = i(e);
                            if (n) return n;
                            if (n = r.variables.get(e)) {
                                e = n.orig[0];
                                if (e instanceof Ui || e instanceof Wi) return n;
                            }
                        } : r.variables ? function(e) {
                            return i(e) || r.variables.get(e);
                        } : i);
                    }(T, 0, Mn))(e);
                }, z = Object.create(null), u = [], q = Object.create(null), l = Object.create(null), p = Object.create(null), C = Object.create(null);
                T instanceof mt && S.top_retain && T.variables.each(function(e) {
                    !S.top_retain(e) || e.id in q || (q[e.id] = !0, u.push(e));
                });
                var d = new Un(), h = new Un(), M = this;
                (v = new mr(function(s, e) {
                    if (s instanceof _t && s.uses_arguments && !v.has_directive("use strict") && s.each_argname(function(e) {
                        e = e.definition();
                        e.id in q || (q[e.id] = !0, u.push(e));
                    }), s !== T) {
                        if (M === T) {
                            if (s instanceof jt) {
                                var t = s.name.definition();
                                A && !t.exported || t.id in q || (q[t.id] = !0, u.push(t)), s.extends && s.extends.walk(v);
                                var i = !1;
                                return v.parent() instanceof fi && (i = !0, o[t.id] = !0), s.properties.forEach(function(e) {
                                    var n;
                                    e.key instanceof Gn && e.key.walk(v), e.value && (i || e instanceof It && e.static ? (n = M,
                                    M = s, e.value.walk(v), M = n) : h.add(t.id, e.value));
                                }), !0;
                            }
                            if (s instanceof $t) {
                                t = s.name.definition();
                                if (A && !t.exported || t.id in q || (q[t.id] = !0, u.push(t)), h.add(t.id, s),
                                !(v.parent() instanceof fi)) return !0;
                                o[t.id] = !0;
                            }
                            if (s instanceof ti) return s.definitions.forEach(function(i) {
                                var r = i.value, o = r && (i.name instanceof Oi || r.has_side_effects(S)), a = o && "=" == r.tail_node().operator;
                                i.name.mark_symbol(function(e) {
                                    if (e instanceof Hi) {
                                        var n, t = e.definition();
                                        return C[t.id] = (C[t.id] || 0) + 1, s instanceof oi && t.orig[0] instanceof Ji && ((n = t.redefined()) && (C[n.id] = (C[n.id] || 0) + 1)),
                                        t.id in q || D && !t.exported && (s instanceof ii ? !t.redefined() : !t.const_redefs) && (s instanceof oi || an(t)) || (q[t.id] = !0,
                                        u.push(t)), r && (o ? a && g(t, e, p[t.id]) : h.add(t.id, r), d.add(t.id, i)), !0;
                                    }
                                }, v), o && r.walk(v);
                            }), !0;
                            if (s instanceof Ui) {
                                t = s.definition();
                                return C[t.id] = (C[t.id] || 0) + 1, d.add(t.id, s), !0;
                            }
                            if (s instanceof Ri) return (t = s.definition()).id in q || D && an(t) || (q[t.id] = !0,
                            u.push(t)), !0;
                        }
                        return r(s, e, !0);
                    }
                })).directives = Object.create(S.directives), T.walk(v);
                var F = S.option("keep_fnames") ? Fn : S.option("ie") ? function(e) {
                    return !S.exposed(e) && e.references.length == e.replaced;
                } : function(e) {
                    return !(e.id in q) || !(e.orig.length - e.eliminated < 2) && (e.orig[1] instanceof Ui || Ln(e.references, function(e) {
                        return !e.in_arg;
                    }));
                };
                S.option("ie") && h.each(function(e, n) {
                    n in q || e.forEach(function(e) {
                        e.walk(new mr(function(e) {
                            return e instanceof Dt && e.name && !F(e.name.definition()) ? (e.walk(v), !0) : e instanceof vt || void 0;
                        }));
                    });
                });
                for (var v = new mr(r), e = 0; e < u.length; e++) {
                    var n = h.get(u[e].id);
                    n && n.forEach(function(e) {
                        e.walk(v);
                    });
                }
                Object.keys($).forEach(function(e) {
                    var n, t = $[e];
                    t ? (t = t.reduce(function(n, e) {
                        return e.forEach(function(e) {
                            Hn(n, e);
                        }), n;
                    }, []), n = (d.get(e) || []).filter(function(n) {
                        return Cn(n instanceof yi ? function(e) {
                            return e === n;
                        } : function(e) {
                            return e === n || !(e instanceof yi) && i(e) === i(n);
                        }, t);
                    }), t.length == n.length ? $[e] = n : delete $[e]) : delete $[e];
                });
                var j = [], P = [], N = [], I = [], H = new _r(function(i) {
                    if (i instanceof li) return w(H, i);
                    if (i instanceof Oi && i.rest && (i.rest = i.rest.transform(H)), i instanceof $i) {
                        for (var e = !i.rest, n = i.elements.length; 0 <= --n; ) {
                            var t = i.elements[n].transform(H);
                            t ? (i.elements[n] = t, e = !1) : e ? i.elements.pop() : i.elements[n] = ve(lr, i.elements[n]);
                        }
                        return i;
                    }
                    if (i instanceof qi) {
                        var r = [];
                        return i.properties.forEach(function(e) {
                            var n, t = !1;
                            e.key instanceof Gn && (e.key = e.key.transform(Y), t = e.key.has_side_effects(S)),
                            (t || i.rest) && ((n = e.value) instanceof li ? n.name : n) instanceof Hi ? (e.value = e.value.transform(Y),
                            r.push(e)) : (n = !(n = e.value.transform(H)) && i.rest ? e.value instanceof $i ? ve($i, e.value, {
                                elements: []
                            }) : ve(qi, e.value, {
                                properties: []
                            }) : n) && (e.value = n, r.push(e));
                        }), i.properties = r, i;
                    }
                    return i instanceof Hi ? i.definition().id in q ? i : null : void 0;
                }), Y = new _r(function(d, n, e) {
                    var t, i, r, h = Y.parent();
                    if (D) {
                        var o, a, s = [], f = O(d, s);
                        if (f) {
                            if (a = d, i = (t = f).definition(), (!(r = q[i.id]) || a[a instanceof Si ? "left" : "expression"] === t && (r === t && i.references.length - i.replaced == 1 || U(i, a) < 0)) && (d instanceof Si && (o = V(d),
                            !0 === d.write_only && (o = o.drop_side_effect_free(S))), o = o || ve(or, d, {
                                value: 0
                            })), o) switch (!s.assign || (a = s.assign.drop_side_effect_free(S)) && (a.write_only = !0,
                            s.unshift(a)), h instanceof hi && h.tail_node() !== d && !o.has_side_effects(S) || s.push(o),
                            s.length) {
                              case 0:
                                return In.skip;

                              case 1:
                                return me(0, h, d, s[0].transform(Y));

                              default:
                                return J(d, s.map(function(e) {
                                    return e.transform(Y);
                                }));
                            }
                        } else if (d instanceof xi && d.expression instanceof Xi && U(d.expression.definition(), d) < 0) return ve(wi, d, {
                            operator: "+",
                            expression: d.expression
                        });
                    }
                    if (d instanceof pi && N.push(d), M === T) {
                        if (A && d !== T && d instanceof jt) {
                            var c = d.name.definition();
                            if (!(c.id in q)) return (R(d.name, "Dropping unused class {name}"), c.eliminated++,
                            n(d, Y), h instanceof fi) ? Re(d, !0) : (k = (k = d.drop_side_effect_free(S, !0)) === d ? Re(d, !0) : k) ? ve(et, d, {
                                body: k
                            }) : e ? In.skip : ve(Qn, d);
                        }
                        if (d instanceof Pt && d.name && F(d.name.definition()) && P.push(d), d instanceof _t) {
                            if (A && d !== T && d instanceof $t) if (!((c = d.name.definition()).id in q)) return R(d.name, "Dropping unused function {name}"),
                            c.eliminated++, h instanceof fi ? (E(), Be(d, !0)) : e ? In.skip : ve(Qn, d);
                            if (d instanceof bt && d.name && F(d.name.definition()) && P.push(d), !(d instanceof gt)) {
                                d.rest && ((o = d.rest.transform(H)) instanceof Oi && !o.rest && (!d.uses_arguments || Y.has_directive("use strict")) && (o instanceof $i ? 0 == o.elements.length && (o = null) : 0 == o.properties.length && (o = null)),
                                d.rest = o);
                                for (var u = d.argnames, l = S.drop_fargs(d, h) && !d.rest, p = l ? -1 : d.length(), v = u.length; 0 <= --v; ) (f = u[v]) instanceof Ui ? (c = f.definition()).id in q ? (l = !1,
                                U(c, f) < 0 && (f.__unused = null)) : l ? (R(f, "Dropping unused function argument {name}"),
                                u.pop()) : f.__unused = !0 : f.transform(H) ? l = !1 : l ? (R(f.name, "Dropping unused default argument {name}"),
                                u.pop()) : p < v ? (R(f.name, "Dropping unused default argument assignment {name}"),
                                f.name.__unused = !0, u[v] = f.name) : (R(f.name, "Dropping unused default argument value {name}"),
                                f.value = ve(or, f, {
                                    value: 0
                                }));
                                I.push(d);
                            }
                        }
                        if (d instanceof ei && d.argname instanceof Oi && d.argname.transform(H), d instanceof ti && !(h instanceof lt && h.init === d)) {
                            var m = [], _ = [], g = [], b = [], y = 0, w = d instanceof oi;
                            switch (d.definitions.forEach(function(e) {
                                e.value && (e.value = e.value.transform(Y));
                                var n = e.value;
                                if (e.name instanceof Oi) {
                                    var t = W(e.name, n, function(e) {
                                        return !D || e.definition().id in q || l(e) || w && !pe(e) ? e : null;
                                    }, !0);
                                    t.name ? (e = ve(ai, e, {
                                        name: t.name,
                                        value: n = t.value
                                    }), p()) : t.value && b.push(t.value);
                                } else {
                                    var i, r, o, a, s, f = e.name.definition(), c = w ? pe(e.name) : an(f);
                                    if (!c || !D || f.id in q) if (n && U(f, e) < 0 && ((n = n.drop_side_effect_free(S)) && (Gn.warn("Side effects in last use of variable {name} [{file}:{line},{col}]", B(e.name)),
                                    b.push(n)), n = null, j.push(e)), n || d instanceof ri) if (S.option("functions") && !S.option("ie") && c && 1 == C[f.id] && 0 == f.assignments && n instanceof bt && !ue(f) && !yt(n) && (a = n,
                                    0 == (s = f.references).length ? a === e.name.fixed_value() : Ln(s, function(e) {
                                        return a === e.fixed_value();
                                    })) && (o = n, w && !S.has_directive("use strict") && o instanceof Dt ? h instanceof it || h instanceof ut && h.init === d || h instanceof Gt : h instanceof vt) && !1 !== (i = function(t, i) {
                                        if (!t.name) return null;
                                        var r, e = t.name.definition();
                                        if (1 < e.orig.length) return null;
                                        if (0 < e.assignments) return !1;
                                        if (e.name == i) return e;
                                        switch (i) {
                                          case "await":
                                            r = wt;
                                            break;

                                          case "yield":
                                            r = xt;
                                        }
                                        return Ln(e.references, function(e) {
                                            var n = e.scope;
                                            if (n.find_variable(i) === f) {
                                                if (r) do {
                                                    if (n = n.resolve(), r(n)) return;
                                                } while (n !== t && (n = n.parent_scope));
                                                return 1;
                                            }
                                        }) && e;
                                    }(n, e.name.name))) {
                                        switch (Gn.warn("Declaring {name} as function [{file}:{line},{col}]", B(e.name)),
                                        n.CTOR) {
                                          case Tt:
                                            r = zt;
                                            break;

                                          case At:
                                            r = qt;
                                            break;

                                          case Dt:
                                            r = Ct;
                                            break;

                                          case Ot:
                                            r = Mt;
                                        }
                                        t = ve(r, e, n);
                                        t.name = ve(Vi, e.name, e.name);
                                        var u = e.name.scope.resolve().def_function(t.name);
                                        i && i.forEach(function(e) {
                                            e.name = u.name, e.thedef = u, e.reference();
                                        }), m.push(t);
                                    } else c && 1 < C[f.id] && !(h instanceof si) && f.orig.indexOf(e.name) > f.eliminated && (C[f.id]--,
                                    y++), p(); else h instanceof si ? p() : c && 1 < C[f.id] ? (Gn.info("Dropping declaration of variable {name} [{file}:{line},{col}]", B(e.name)),
                                    C[f.id]--, f.eliminated++) : _.push(e); else l(e.name) ? ((n = n && n.drop_side_effect_free(S)) && b.push(n),
                                    1 < C[f.id] ? (Gn.warn("Dropping duplicated declaration of variable {name} [{file}:{line},{col}]", B(e.name)),
                                    C[f.id]--, f.eliminated++) : (e.value = null, _.push(e))) : ((n = n && !n.single_use && n.drop_side_effect_free(S)) ? (Gn.warn("Side effects in initialization of unused variable {name} [{file}:{line},{col}]", B(e.name)),
                                    b.push(n)) : R(e.name, "Dropping unused variable {name}"), f.eliminated++);
                                }
                                function l(e) {
                                    var n = e.definition();
                                    return n.orig[0] instanceof Ji && n.scope.resolve() === e.scope.resolve();
                                }
                                function p() {
                                    0 < b.length && (0 == g.length ? m.push(ve(et, d, {
                                        body: J(d, b)
                                    })) : n ? (b.push(n), e.value = J(n, b)) : e.value = ve(wi, e, {
                                        operator: "void",
                                        expression: J(e, b)
                                    }), b = []), g.push(e);
                                }
                            }), _.length) {
                              case 0:
                                if (0 == g.length) break;
                                if (g.length == y) {
                                    [].unshift.apply(b, g.map(function(e) {
                                        Gn.info("Dropping duplicated definition of variable {name} [{file}:{line},{col}]", B(e.name));
                                        var n = e.name.definition(), t = ve(Xi, e.name, e.name);
                                        n.references.push(t);
                                        t = ve(Si, e, {
                                            operator: "=",
                                            left: t,
                                            right: e.value
                                        }), e = U(n, e);
                                        return 0 <= e && ($[n.id][e] = t), n.eliminated++, t;
                                    }));
                                    break;
                                }

                              case 1:
                                if (0 == g.length) {
                                    var x = _[0].name.definition().id;
                                    if (x in z) {
                                        d.definitions = _, z[x].init = d;
                                        break;
                                    }
                                }

                              default:
                                d.definitions = _.concat(g), m.push(d);
                            }
                            return 0 < b.length && m.push(ve(et, d, {
                                body: J(d, b)
                            })), L(m, d, e);
                        }
                        if (d instanceof Si) return (n(d, Y), d.left instanceof Oi) ? (k = W(d.left, d.right, function(e) {
                            return e;
                        }, !0 === d.write_only)).name ? ve(Si, d, {
                            operator: d.operator,
                            left: k.name,
                            right: k.value
                        }) : k.value || (h instanceof hi && h.tail_node() !== d ? In.skip : ve(or, d, {
                            value: 0
                        })) : d;
                        if (d instanceof ot && d.body instanceof ut) {
                            if (n(d, Y), d.body instanceof rt) {
                                var k = d.body;
                                return d.body = k.body.pop(), k.body.push(d), e ? In.splice(k.body) : k;
                            }
                            return d;
                        }
                        return d instanceof vt ? (E(), d) : d instanceof Ri ? !S.option("imports") || d.definition().id in q ? d : e ? In.skip : null : void 0;
                    }
                    function E() {
                        var e = M;
                        n(M = d, Y), M = e;
                    }
                }, function(e, n) {
                    if (e instanceof rt) return Pe(e, Y.parent(), n);
                    if (e instanceof ut) return e.init instanceof rt && (r = e.init, e.init = r.body.pop(),
                    r.body.push(e)), e.init instanceof Ct ? ((r = r || ve(rt, e, {
                        body: [ e ]
                    })).body.splice(-1, 0, e.init), e.init = null) : e.init instanceof et ? e.init = e.init.body : Q(e.init) && (e.init = null),
                    r ? n ? In.splice(r.body) : r : e;
                    if (e instanceof pt) {
                        if (!D || !S.option("loops")) return;
                        if (!Q(e.body)) return;
                        var t = b(e);
                        if (!t) return;
                        var i = t.definition();
                        if (i.id in q) return;
                        R(t, "Dropping unused loop variable {name}"), z[i.id] === e && delete z[i.id];
                        var r = [], t = e.object.drop_side_effect_free(S);
                        return t && (Gn.warn("Side effects in object of for-in loop [{file}:{line},{col}]", t.start),
                        r.push(ve(et, e, {
                            body: t
                        }))), e.init instanceof ti && i.orig[0] instanceof Ji && r.push(e.init), L(r, e, n);
                    }
                    return e instanceof ui ? (e.properties && 0 == e.properties.length && (e.properties = null),
                    e) : e instanceof hi && !(1 < e.expressions.length) ? me(0, Y.parent(), e, e.expressions[0]) : void 0;
                });
                Y.push(S.parent()), T.transform(Y), T instanceof _t && 1 == T.body.length && T.body[0] instanceof Kn && "use strict" == T.body[0].value && (T.body.length = 0),
                j.forEach(function(e) {
                    e.value = null;
                }), P.forEach(function(e) {
                    e.name = null;
                }), N.forEach(function(e) {
                    dn(e, S, I);
                });
            }
            function R(e, n) {
                Gn[0 < e.definition().references.length ? "info" : "warn"](n + " [{file}:{line},{col}]", B(e));
            }
            function B(e) {
                return {
                    name: e.name,
                    file: e.start.file,
                    line: e.start.line,
                    col: e.start.col
                };
            }
            function i(e) {
                return e[e instanceof Si ? "right" : "value"];
            }
            function L(e, n, t) {
                switch (e.length) {
                  case 0:
                    return t ? In.skip : ve(Qn, n);

                  case 1:
                    return e[0];

                  default:
                    return t ? In.splice(e) : ve(rt, n, {
                        body: e
                    });
                }
            }
            function m(e, n) {
                return e.scope.resolve() === T && (e.fixed && n.fixed || ($[e.id] = !1), !1 !== $[e.id]);
            }
            function _(e, n) {
                $[e.id] || ($[e.id] = []), n.fixed.assigns && Hn($[e.id], n.fixed.assigns);
            }
            function U(e, n) {
                e = $[e.id];
                return e && e.indexOf(n);
            }
            function g(e, n, t) {
                e.id in q || (n && t ? (q[e.id] = n, u.push(e)) : (l[e.id] = n, p[e.id] = t));
            }
            function V(e) {
                var n = e.right;
                if (!e.write_only) return n;
                if (!(n instanceof ki && we[n.operator])) return n;
                if (!(n.left instanceof Xi)) return n;
                if (!(e.left instanceof Xi)) return n;
                e = e.left.definition();
                return n.left.definition() !== e || n.right.has_side_effects(S) ? n : (m(e, n.left) && _(e, n.left),
                n.right);
            }
            function b(e) {
                var n = e.init;
                if (n instanceof ti) return (n = n.definitions[0].name) instanceof Hi && n;
                for (;n instanceof mi; ) n = n.expression.tail_node();
                return n instanceof Xi ? n : void 0;
            }
            function r(e, n, t) {
                e instanceof Si && e.left instanceof Xi && (i = e.left.definition()).scope.resolve() === T && d.add(i.id, e),
                e instanceof yi && e.expression instanceof Xi && (i = e.expression.definition()).scope.resolve() === T && d.add(i.id, e);
                var i, r = [], o = O(e, r);
                if (o && ((f = o.definition()).scope.resolve() === T || T.variables.get(o.name) === f) && (!ue(f) || Ln(T.argnames, function(e) {
                    return !e.match_symbol(function(e) {
                        if (e instanceof Ui) {
                            e = e.definition();
                            return e.references.length > e.replaced;
                        }
                    }, !0);
                }))) {
                    if ("p" === e.write_only && e.right.may_throw_on_access(S, !0)) return;
                    var a, s = r.assign;
                    return s && (s.write_only = !0, s.walk(v)), r.forEach(function(e) {
                        e.walk(v);
                    }), e instanceof Si && (s = V(e), r = !1, t && !0 === e.write_only && !s.has_side_effects(S) ? h.add(f.id, s) : (s.walk(v),
                    r = "=" == s.tail_node().operator), e.left === o ? e.write_only && !r || g(f, o, p[f.id]) : (a = o.fixed_value()) && a.is_constant() || g(f, l[f.id], !0)),
                    m(f, o) && Sr(o, e) !== o && _(f, o), !0;
                }
                if (e instanceof pt) {
                    if (e.init instanceof Xi && M === T && ((a = e.init.definition().id) in z || (z[a] = e)),
                    !D || !S.option("loops")) return;
                    if (!Q(e.body)) return;
                    if (e.init.has_side_effects(S)) return;
                    if (!(o = b(e))) return;
                    if ((i = o.definition()).scope.resolve() !== T) {
                        o = c(o.name);
                        if (o === i || o && o.redefined() === i) return;
                    }
                    return e.object.walk(v), !0;
                }
                if (e instanceof Xi) return (f = e.definition()).id in q || (q[f.id] = !0, u.push(f)),
                y(f.scope, e.scope) && (!(i = f.redefined()) || i.id in q || (q[i.id] = !0, u.push(i))),
                m(f, e) && _(f, e), !0;
                if (e instanceof vt) {
                    var f = M;
                    return M = e, n(), M = f, !0;
                }
            }
            function w(e, n) {
                if (n.value = n.value.transform(Y), !n.name.transform(e)) {
                    if (n.name instanceof Oi) return null;
                    e = n.value.drop_side_effect_free(S);
                    if (!e) return null;
                    R(n.name, "Side effects in default value of unused variable {name}"), n.name.__unused = null,
                    n.value = e;
                }
                return n;
            }
            function W(e, v, m, _) {
                var g = new _r(function(r) {
                    if (r instanceof li) {
                        if (!(S.option("default_values") && v && v.is_defined(S))) {
                            var e = _;
                            _ = !1;
                            var n = w(g, r);
                            return _ = e, !n && _ && v && (v = v.drop_side_effect_free(S)), n;
                        }
                        r = r.name;
                    }
                    if (r instanceof $i) {
                        var e = _, t = v;
                        v instanceof Xi && (_ = !1, v = v.fixed_value());
                        var i = v instanceof Di && v.elements, o = [], a = _ && [], s = 0;
                        if (r.elements.forEach(function(e, n) {
                            (v = i && i[n]) instanceof lr ? v = null : v instanceof bi && (_ && (a.length = s,
                            Ye(t, a), [].push.apply(a, i.slice(n)), t.elements = a), v = i = !1), (e = e.transform(g)) && (o[s] = e),
                            _ && v && (a[s] = v), !e && !v && _ && i || s++;
                        }), v = i && ve(Di, t, {
                            elements: i.slice(r.elements.length)
                        }), r.rest && (n = _, _ = !1, r.rest = r.rest.transform(S.option("rests") ? g : Y),
                        _ = n, r.rest && (o.length = s)), _ && (v = (v = v && !r.rest ? v.drop_side_effect_free(S) : v) instanceof Di ? v.elements : v instanceof hi ? v.expressions : v && [ v ]) && v.length && (a.length = s,
                        [].push.apply(a, v)), v = t, _ = e, i && a && (Ye(v, a), v.elements = a), !r.rest && (v instanceof Di || v && v.is_string(S))) switch (o.length) {
                          case 0:
                            return _ && (v = v.drop_side_effect_free(S)), null;

                          case 1:
                            if (!_) break;
                            var f = o[0];
                            if (!(f instanceof Ii)) break;
                            return v = ve(gi, r, {
                                expression: v,
                                property: ve(or, r, {
                                    value: 0
                                })
                            }), f;
                        }
                        return Ye(r, o), r.elements = o, r;
                    }
                    if (r instanceof qi) {
                        var c, u, e = _, t = v;
                        v instanceof Xi && (_ = !1, v = v.fixed_value()), v instanceof Ci && (c = [], u = Object.create(null),
                        v.properties.forEach(function(e, n) {
                            if (e instanceof bi) return u = !1;
                            var t = e.key;
                            (t = t instanceof Gn ? t.evaluate(S, !0) : t) instanceof Gn ? u = !1 : !u || e instanceof Pi || (u[t] = e),
                            c[n] = t;
                        })), r.rest && (v = !1, r.rest = r.rest.transform(S.option("rests") ? g : Y));
                        var l = Object.create(null), p = _ && Object.create(null), d = [];
                        if (r.properties.map(function(e) {
                            var n = e.key;
                            return n instanceof Gn && (e.key = n = n.transform(Y), n = n.evaluate(S, !0)), n instanceof Gn ? p = !1 : l[n] = !(n in l),
                            n;
                        }).forEach(function(e, n) {
                            var t, i = r.properties[n];
                            e instanceof Gn ? (v = _ = !1, t = i.value.transform(g) || y(i.value)) : (_ = p && l[e],
                            (!(n = u && u[e]) || (v = n.value) instanceof gt) && (v = !1), (t = i.value.transform(g)) ? p && (p[e] = !1) : ((r.rest || b(i)) && (t = y(i.value)),
                            !p || e in p || (n ? (p[e] = n, null === v && (u[e] = b(n) && ve(Fi, n, {
                                key: n.key,
                                value: ve(or, n, {
                                    value: 0
                                })
                            }))) : p[e] = !0)), v && (n.value = v)), t && (i.value = t, d.push(i));
                        }), v = t, _ = e, p && c && (v.properties = In(v.properties, function(e, n) {
                            if (e instanceof bi) return e;
                            var t = c[n];
                            if (t instanceof Gn) return e;
                            if (t in p) {
                                n = p[t];
                                if (!n) return e;
                                if (n === e) return u[t] || In.skip;
                            } else if (r.rest) return e;
                            t = e.value.drop_side_effect_free(S);
                            return t ? (e.value = t, e) : b(e) ? ve(Fi, e, {
                                key: e.key,
                                value: ve(or, e, {
                                    value: 0
                                })
                            }) : In.skip;
                        })), v && !r.rest) switch (d.length) {
                          case 0:
                            if (v.may_throw_on_access(S, !0)) break;
                            return _ && (v = v.drop_side_effect_free(S)), null;

                          case 1:
                            if (!_) break;
                            var h = d[0];
                            if (h.key instanceof Gn) break;
                            if (!(h.value instanceof Ii)) break;
                            return v = ve(gi, r, {
                                expression: v,
                                property: X(h.key, h)
                            }), h.value;
                        }
                        return r.properties = d, r;
                    }
                    return !(r = r instanceof lr ? null : m(r)) && _ && v && (v = v.drop_side_effect_free(S)),
                    r;
                });
                return {
                    name: e.transform(g),
                    value: v
                };
                function b(e) {
                    return e.key instanceof Gn && e.key.has_side_effects(S);
                }
                function y(e) {
                    return e instanceof li ? y(e.name) : e instanceof Oi ? (null === v ? v = ve(or, e, {
                        value: 0
                    }) : v && (!0 === v.tail_node().write_only || v.may_throw_on_access(S, !0)) && (v = ve(Di, e, {
                        elements: v instanceof hi ? v.expressions : [ v ]
                    })), ve(qi, e, {
                        properties: []
                    })) : (e.__unused = null, e);
                }
            }
        }), vt.DEFMETHOD("hoist_declarations", function(a) {
            var s, f, c, n, u, l, p, d, h, v, m;
            a.has_directive("use asm") || (s = a.option("hoist_funs"), f = a.option("hoist_vars"),
            c = this, f && (n = 0, c.walk(new mr(function(e) {
                return 1 < n || (e instanceof si || (e instanceof vt && e !== c || (e instanceof oi ? (n++,
                !0) : void 0)));
            })), n <= 1 && (f = !1)), (s || f) && (u = Object.create(null), l = [], p = [],
            d = new Un(), h = 0, v = new _r(function(e, n, t) {
                if (e !== c) {
                    if (e instanceof Kn) return l.push(e), t ? In.skip : ve(Qn, e);
                    var i;
                    if (e instanceof $t) return s ? (i = v.parent()) instanceof si || i instanceof fi || i !== c && a.has_directive("use strict") ? e : (p.push(e),
                    t ? In.skip : ve(Qn, e)) : e;
                    if (e instanceof oi) {
                        if (!f) return e;
                        if ((i = v.parent()) instanceof si) return e;
                        if (!Ln(e.definitions, function(e) {
                            e = e.name;
                            return e instanceof Li && !u[e.name] && c.find_variable(e.name) === e.definition();
                        })) return e;
                        e.definitions.forEach(function(e) {
                            d.set(e.name.name, e), ++h;
                        });
                        var r = e.to_assignments();
                        if (i instanceof lt && i.init === e) {
                            if (r) return r;
                            var o = e.definitions[0].name;
                            return ve(Xi, o, o);
                        }
                        return i instanceof ut && i.init === e ? r : r ? ve(et, e, {
                            body: r
                        }) : t ? In.skip : ve(Qn, e);
                    }
                    return e instanceof vt ? e : e instanceof Yi ? (u[e.name] = !0, e) : void 0;
                }
            }), c.transform(v), 0 < h && (m = [], c instanceof _t && c.each_argname(function(e) {
                d.del(e.name);
            }), d.each(function(e, n) {
                (e = e.clone()).value = null, m.push(e), d.set(n, e);
            }), 0 < m.length && (function e(n) {
                for (;n.length; ) {
                    var t = n[0];
                    if (t instanceof et) {
                        var i, r, o, a = t.body;
                        if (a instanceof Si && "=" == a.operator && (i = a.left) instanceof Ii && d.has(i.name)) {
                            if ((o = d.get(i.name)).value) break;
                            var s = a.right;
                            s instanceof hi && (s = s.clone()), o.value = s, Rn(m, o), m.push(o), n.shift();
                            continue;
                        }
                        if (a instanceof hi && (r = a.expressions[0]) instanceof Si && "=" == r.operator && (i = r.left) instanceof Ii && d.has(i.name)) {
                            if ((o = d.get(i.name)).value) break;
                            o.value = r.right, Rn(m, o), m.push(o), t.body = J(a, a.expressions.slice(1));
                            continue;
                        }
                    }
                    if (t instanceof Qn) n.shift(); else {
                        if (!(t instanceof rt) || e(t.body)) break;
                        n.shift();
                    }
                }
                return n.length;
            }(c.body), m = ve(oi, c, {
                definitions: m
            }), p.push(m))), c.body = l.concat(p, c.body)));
        }), vt.DEFMETHOD("process_boolean_returns", Mn), Ct.DEFMETHOD("process_boolean_returns", function(e) {
            var n;
            e.option("booleans") && (n = Ue(this), Ve(this.name.definition(), n, e) && (e.parent() instanceof fi || We(this, e)));
        }), Dt.DEFMETHOD("process_boolean_returns", function(e) {
            if (e.option("booleans")) {
                var n = Ue(this);
                if (!this.name || Ve(this.name.definition(), n, e)) {
                    var t = e.parent();
                    if (t instanceof Si) {
                        if ("=" != t.operator) return;
                        if (!((i = t.left) instanceof Xi)) return;
                        if (!Ve(i.definition(), n, e)) return;
                    } else if (t instanceof pi && t.expression !== this) {
                        var i, r = t.expression;
                        if (!((r = r instanceof Xi ? r.fixed_value() : r) instanceof _t)) return;
                        if (r.uses_arguments || r.pinned()) return;
                        if ((i = (i = r.argnames[t.args.indexOf(this)]) instanceof li ? i.name : i) instanceof Ui && !Ve(i.definition(), n, e)) return;
                    } else {
                        if ("Call" != t.TYPE) return;
                        e.pop();
                        t = e.in_boolean_context();
                        if (e.push(this), !t) return;
                    }
                    We(this, e);
                }
            }
        }), nt.DEFMETHOD("var_names", function() {
            var t = this._var_names;
            return t || (this._var_names = t = Object.create(null), this.enclosed.forEach(function(e) {
                t[e.name] = !0;
            }), this.variables.each(function(e, n) {
                t[n] = !0;
            })), t;
        }), vt.DEFMETHOD("make_var", function(e, n, t) {
            var i = [ this ];
            n instanceof Hi && n.definition().references.forEach(function(e) {
                var n = e.scope;
                if (!qn(n, i)) for (;Hn(i, n), (n = n.parent_scope) && n !== this; );
            });
            for (var r = t = t.replace(/(?:^[^a-z_$]|[^a-z0-9_$])/gi, "_"), o = 0; !Ln(i, function(e) {
                return !e.var_names()[r];
            }); o++) r = t + "$" + o;
            var n = ve(e, n, {
                name: r,
                scope: this
            }), a = this.def_variable(n);
            return i.forEach(function(e) {
                e.enclosed.push(a), e.var_names()[r] = !0;
            }), n;
        }), vt.DEFMETHOD("hoist_properties", function(r) {
            var s, o, f;
            function c(e, n, t) {
                if (e instanceof Ii) {
                    var i = e.definition();
                    return i.assignments == t ? !i.direct_access && (1 != i.escaped.depth && (i.references.length - i.replaced != t && (!i.single_use && (!o(i) && (e.fixed_value() === n && (n instanceof Ci && 0 < n.properties.length && Ln(n.properties, zn) && Ln(i.references, function(e) {
                        return e.fixed_value() === n;
                    }) && pe(e, r))))))) : void 0;
                }
            }
            r.option("hoist_props") && !r.has_directive("use asm") && (o = (s = this) instanceof mt && r.top_retain || Fn,
            f = Object.create(null), s.transform(new _r(function(t, e) {
                if (t instanceof Si) {
                    if ("=" != t.operator) return;
                    if (!t.write_only) return;
                    if (!c(t.left, t.right, 1)) return;
                    e(t, this);
                    var i = new Un(), r = [], o = [];
                    return t.right.properties.forEach(function(e) {
                        var n = a(Li, t.left, e.key);
                        o.push(ve(ai, t, {
                            name: n,
                            value: null
                        }));
                        n = ve(Xi, t, {
                            name: n.name,
                            scope: s,
                            thedef: n.definition()
                        });
                        n.reference(), r.push(ve(Si, t, {
                            operator: "=",
                            left: n,
                            right: e.value
                        }));
                    }), f[t.left.definition().id] = i, s.body.splice(s.body.indexOf(this.stack[1]) + 1, 0, ve(oi, t, {
                        definitions: o
                    })), J(t, r);
                }
                if (t instanceof vt) return t === s ? void 0 : t;
                if (t instanceof ai && c(t.name, t.value, 0)) {
                    e(t, this);
                    var i = new Un(), n = [];
                    return t.value.properties.forEach(function(e) {
                        n.push(ve(ai, t, {
                            name: a(t.name.CTOR, t.name, e.key),
                            value: e.value
                        }));
                    }), f[t.name.definition().id] = i, In.splice(n);
                }
                function a(e, n, t) {
                    n = s.make_var(e, n, n.name + "_" + t);
                    return i.set(t, n.definition()), n;
                }
            })), s.transform(new _r(function(e, n) {
                if (e instanceof mi) {
                    if (!(e.expression instanceof Xi)) return;
                    var t = f[e.expression.definition().id];
                    if (!t) return;
                    t = t.get(e.get_property()), t = ve(Xi, e, {
                        name: t.name,
                        scope: e.expression.scope,
                        thedef: t
                    });
                    return t.reference(), t;
                }
                if (e instanceof Xi && e.definition().id in f) return ve(Ci, e, {
                    properties: []
                });
            })));
        }), (se = function(e, n) {
            e.DEFMETHOD("drop_side_effect_free", n);
        })(Gn, Pn), se(gt, Nn), se(Di, function(e, n) {
            n = Je(this.elements, e, n, Xe);
            return n ? n === this.elements && Ln(n, function(e) {
                return e instanceof bi;
            }) ? this : J(this, n.map(Ke)) : null;
        }), se(Si, function(e) {
            var n = this.left;
            if (n instanceof mi) {
                var t = n.expression;
                if (t.may_throw_on_access(e, !0)) return this;
                if (e.has_directive("use strict") && t.is_constant()) return this;
            }
            if (n.has_side_effects(e)) return this;
            t = this.right;
            return !we[this.operator.slice(0, -1)] && (this.write_only = !0, vi(n).is_constant_expression(e.find_parent(vt))) ? t.drop_side_effect_free(e) : this;
        }), se(Ti, function(e) {
            if (!e.option("awaits")) return this;
            var n = this.expression;
            if (!yn(e, n)) return this;
            var t = this.clone();
            return t.expression = n.drop_side_effect_free(e) || ve(or, this, {
                value: 0
            }), t;
        }), se(ki, function(e, n) {
            var t = this.left, i = this.right, r = this.operator;
            if ("in" == r && !bn(i)) return (o = t.drop_side_effect_free(e, n)) === t ? this : ((s = this.clone()).left = o || ve(or, t, {
                value: 0
            }), s);
            var o, a = i.drop_side_effect_free(e, n);
            if (!a) return t.drop_side_effect_free(e, n);
            if (we[r] && a.has_side_effects(e)) {
                var s = this;
                if (a !== i && ((s = s.clone()).right = a.drop_side_effect_free(e)), "??" == r) return s;
                r = ve(ki, this, {
                    operator: "&&" == r ? "||" : "&&",
                    left: t.negate(e, n),
                    right: s.right
                });
                return (n ? V : ne)(s, r);
            }
            return (o = t.drop_side_effect_free(e, n)) ? (a = a.drop_side_effect_free(e)) ? J(this, [ o, a ]) : o : a;
        }), se(pi, function(e, n) {
            var t = this;
            if (t.is_expr_pure(e)) {
                t.pure && Gn.warn("Dropping __PURE__ call [{file}:{line},{col}]", t.start);
                var i = Je(t.args, e, n, Xe);
                return i && J(t, i.map(Ke));
            }
            var r = t.expression;
            if (t.is_call_pure(e)) return (a = t.args.slice()).unshift(r.expression), (a = Je(a, e, n, Xe)) && J(t, a.map(Ke));
            if (e.option("yields") && xt(r)) {
                i = t.clone();
                i.expression = ve(Dt, r, r), i.expression.body = [];
                var o = i.transform(e);
                if (o !== i) return o.drop_side_effect_free(e, n);
            }
            o = Qe(e, r);
            if (o && ((t = t.clone()).expression = o, r._squeezed && (t.expression._squeezed = !0)),
            t instanceof di) {
                var a, o = r;
                if ((o = o instanceof Xi ? o.fixed_value() : o) instanceof _t) {
                    if (function(e, n) {
                        e.new = !0;
                        var t = Ln(e.body, function(e) {
                            return !e.has_side_effects(n);
                        }) && Ln(e.argnames, function(e) {
                            return !e.match_symbol(Fn);
                        }) && !(e.rest && e.rest.match_symbol(Fn));
                        return delete e.new, t;
                    }(o, e)) return (a = t.args.slice()).unshift(r), (a = Je(a, e, n, Xe)) && J(t, a.map(Ke));
                    o.contains_this() || (t = ve(pi, t, t));
                }
            }
            return t.call_only = !0, t;
        }), se(Pt, function(e, n) {
            var t = this.name;
            return t && t.fixed_value() !== this && 0 < t.definition().references.length ? this : Ze(this, e, n);
        }), se(Ei, function(e) {
            var n, t, i = this.consequent.drop_side_effect_free(e), r = this.alternative.drop_side_effect_free(e);
            return i === this.consequent && r === this.alternative ? this : (e.option("ie") && (n = [],
            i instanceof Dt && (n.push(i), i = null), r instanceof Dt && (n.push(r), r = null)),
            i ? r ? ((t = this.clone()).consequent = i, t.alternative = r) : t = ve(ki, this, {
                operator: "&&",
                left: this.condition,
                right: i
            }) : t = r ? ve(ki, this, {
                operator: "||",
                left: this.condition,
                right: r
            }) : this.condition.drop_side_effect_free(e), e.option("ie") ? (t && n.push(t),
            0 == n.length ? null : J(this, n)) : t);
        }), se(ir, Nn), se(jt, function(e, n) {
            return Ze(this, e, n);
        }), se(_i, function(e, n) {
            var t = this.expression;
            return !this.optional && t.may_throw_on_access(e) ? this : t.drop_side_effect_free(e, n);
        }), se(Dt, function(e) {
            return Ge(this, e) ? null : this;
        }), se(bt, Nn), se(Ci, function(e, n) {
            var t = [];
            this.properties.forEach(function(e) {
                e instanceof bi ? t.push(e) : (e.key instanceof Gn && t.push(e.key), t.push(e.value));
            });
            n = Je(t, e, n, function(e, n, t) {
                var i = e.expression;
                return De(i) ? e : i.drop_side_effect_free(n, t);
            });
            return n ? n !== t || Ln(n, function(e) {
                return !(e instanceof bi);
            }) ? J(this, n.map(function(e) {
                return e instanceof bi ? ve(Ci, e, {
                    properties: [ e ]
                }) : e;
            })) : this : null;
        }), se(Qi, Nn), se(hi, function(e, n) {
            var t = Je(this.expressions, e, n);
            if (!t) return null;
            var i, r, o, a = t.length - 1, s = t[a];
            return e.option("awaits") && 0 < a && s instanceof Ti && s.expression.is_constant() && (t = t.slice(0, -1),
            s.expression = t[--a], t[a] = s), e.option("conditionals") && 0 < a && (i = t[a - 1]) instanceof Si && "=" == i.operator && (o = i.left) instanceof Xi && (r = hn(e, o.definition(), i.right, s)) && ((i = i.clone()).right = r,
            (t = t.slice(0, -2)).push(i.drop_side_effect_free(e, n))), t === this.expressions ? this : J(this, t);
        }), se(gi, function(e, n) {
            var t = this.expression, i = this.property;
            if (t.may_throw_on_access(e)) {
                if (!this.optional) return this;
                if (i.has_side_effects(e)) {
                    if (!(i = i.drop_side_effect_free(e))) return t.drop_side_effect_free(e, n);
                    var r = this.clone();
                    return r.property = i, r;
                }
            }
            return (t = t.drop_side_effect_free(e, n)) ? (i = i.drop_side_effect_free(e)) ? J(this, [ t, i ]) : t : i.drop_side_effect_free(e, n);
        }), se(Xi, function(e) {
            return this.is_declared(e) && pe(this, e) ? null : this;
        }), se(tr, function(e, n) {
            var t = this;
            if (t.is_expr_pure(e)) {
                var i = t.expressions;
                return 0 == i.length ? null : J(t, i).drop_side_effect_free(e, n);
            }
            n = t.tag, e = Qe(e, n);
            return e && ((t = t.clone()).tag = e, n._squeezed && (t.tag._squeezed = !0)), t;
        }), se(yi, function(e, n) {
            var t = this.expression;
            if (Er[this.operator]) return this.write_only = !t.has_side_effects(e), this;
            if ("typeof" == this.operator && t instanceof Xi && pe(t, e)) return null;
            var i = t.drop_side_effect_free(e, n);
            return n && i && Z(i) ? i === t && "!" == this.operator ? this : i.negate(e, n) : i;
        }), e(et, function(e, n) {
            if (n.option("side_effects")) {
                var t = e.body, n = t.drop_side_effect_free(n, !0);
                if (!n) return Gn.warn("Dropping side-effect-free statement [{file}:{line},{col}]", e.start),
                ve(Qn, e);
                if (n !== t) return ve(et, e, {
                    body: n
                });
            }
            return e;
        }), e(ct, function(e, n) {
            return n.option("loops") ? ve(ut, e, e).optimize(n) : e;
        }), e(ft, function(t, e) {
            if (!e.option("loops")) return t;
            var n = tn(e, t.condition);
            if (!(n instanceof Gn)) {
                if (n && !en(t, e.parent(), Wt)) return ve(ut, t, {
                    body: ve(rt, t.body, {
                        body: [ t.body, ve(et, t.condition, {
                            body: t.condition
                        }) ]
                    })
                }).optimize(e);
                if (!en(t, e.parent())) return ve(rt, t.body, {
                    body: [ t.body, ve(et, t.condition, {
                        body: t.condition
                    }) ]
                }).optimize(e);
            }
            if (t.body instanceof rt && !en(t, e.parent(), Wt)) {
                for (var i = t.body.body, r = i.length; 0 <= --r; ) {
                    var o = i[r];
                    if (o instanceof Gt && !o.alternative && o.body instanceof Vt && e.loopcontrol_target(o.body) === t) {
                        if (a(o.condition)) break;
                        t.condition = ve(ki, t, {
                            operator: "&&",
                            left: o.condition.negate(e),
                            right: t.condition
                        }), i.splice(r, 1);
                    } else if (o instanceof et) {
                        if (a(o.body)) break;
                        t.condition = J(t, [ o.body, t.condition ]), i.splice(r, 1);
                    } else if (!N(o, !0)) break;
                }
                t.body = Pe(t.body, e.parent());
            }
            return t.body instanceof Qn ? ve(ut, t, t).optimize(e) : t.body instanceof et ? ve(ut, t, {
                condition: J(t.condition, [ t.body.body, t.condition ]),
                body: ve(Qn, t)
            }).optimize(e) : t;
            function a(e) {
                var n = !1;
                return e.walk(new mr(function(e) {
                    return !!n || (e instanceof Xi ? (qn(e.definition(), t.enclosed) || (n = !0), !0) : void 0);
                })), n;
            }
        }), e(ut, function(e, n) {
            if (!n.option("loops")) return e;
            if (n.option("side_effects") && (e.init && (e.init = e.init.drop_side_effect_free(n)),
            e.step && (e.step = e.step.drop_side_effect_free(n))), e.condition) {
                var t = tn(n, e.condition);
                if (t) t instanceof Gn || (e.body = ve(rt, e.body, {
                    body: [ ve(et, e.condition, {
                        body: e.condition
                    }), e.body ]
                }), e.condition = null); else if (n.option("dead_code")) {
                    t = [];
                    return Zn(e.init) ? t.push(e.init) : e.init && t.push(ve(et, e.init, {
                        body: e.init
                    })), t.push(ve(et, e.condition, {
                        body: e.condition
                    })), Y(n, e.body, t), ve(rt, e, {
                        body: t
                    }).optimize(n);
                }
            }
            return function n(t, i) {
                var e = a(t.body);
                if (i.option("dead_code") && (e instanceof Vt || e instanceof Wt && s(e) || e instanceof Rt)) {
                    var r = [];
                    Zn(t.init) ? r.push(t.init) : t.init && r.push(ve(et, t.init, {
                        body: t.init
                    }));
                    var o = s(e) || e instanceof Rt;
                    return t.condition && o ? r.push(ve(Gt, t, {
                        condition: t.condition,
                        body: e,
                        alternative: null
                    })) : t.condition ? r.push(ve(et, t.condition, {
                        body: t.condition
                    })) : o && r.push(e), Y(i, t.body, r), ve(rt, t, {
                        body: r
                    });
                }
                if (e instanceof Gt) {
                    if ((o = a(e.body)) instanceof Vt && !s(o)) return t.condition ? t.condition = ve(ki, t.condition, {
                        left: t.condition,
                        operator: "&&",
                        right: e.condition.negate(i)
                    }) : t.condition = e.condition.negate(i), r = F(e.alternative), Y(i, e.body, r),
                    f(r);
                    if ((o = a(e.alternative)) instanceof Vt && !s(o)) return t.condition ? t.condition = ve(ki, t.condition, {
                        left: t.condition,
                        operator: "&&",
                        right: e.condition
                    }) : t.condition = e.condition, r = F(e.body), Y(i, e.alternative, r), f(r);
                }
                return t;
                function a(e) {
                    return e instanceof rt ? e.body[0] : e;
                }
                function s(e) {
                    return i.loopcontrol_target(e) !== i.self();
                }
                function f(e) {
                    return t.body instanceof rt ? (t.body = t.body.clone(), t.body.body = e.concat(t.body.body.slice(1)),
                    t.body = t.body.transform(i)) : t.body = ve(rt, t.body, {
                        body: e
                    }).transform(i), n(t, i);
                }
            }(e, n);
        }), e(lt, function(e, n) {
            var t;
            return n.option("varify") && C(e.init) && (((t = e.init.definitions[0].name) instanceof Oi || t instanceof Bi) && !t.match_symbol(function(e) {
                if (e instanceof Hi) {
                    e = e.definition();
                    return !kn(e) || sn(n, e);
                }
            }, !0) && (e.init = fn(e.init))), e;
        }), e(Gt, function(e, f) {
            if (Q(e.alternative) && (e.alternative = null), !f.option("conditionals")) return e;
            if (f.option("booleans") && !e.condition.has_side_effects(f) && rn(f, e.condition),
            f.option("dead_code")) {
                var n = tn(f, e.condition);
                if (!n) {
                    Gn.warn("Condition always false [{file}:{line},{col}]", e.condition.start);
                    var t = [ ve(et, e.condition, {
                        body: e.condition
                    }) ];
                    return Y(f, e.body, t), e.alternative && t.push(e.alternative), ve(rt, e, {
                        body: t
                    }).optimize(f);
                }
                if (!(n instanceof Gn)) {
                    Gn.warn("Condition always true [{file}:{line},{col}]", e.condition.start);
                    t = [ ve(et, e.condition, {
                        body: e.condition
                    }), e.body ];
                    return e.alternative && Y(f, e.alternative, t), ve(rt, e, {
                        body: t
                    }).optimize(f);
                }
            }
            var i = e.condition.negate(f), r = e.condition.print_to_string().length, o = i.print_to_string().length, a = o < r;
            e.alternative && a && (a = !1, e.condition = i, u = e.body, e.body = e.alternative || ve(Qn, e),
            e.alternative = u);
            var t = [], s = [], c = [], n = p(e.body, t, s, c), u = p(e.alternative, t, s, c);
            if (n && u) return 0 < s.length && t.push(ve(oi, e, {
                definitions: s
            })), 0 == n.length ? t.push(ve(et, e.condition, {
                body: 0 < u.length ? ve(ki, e, {
                    operator: "||",
                    left: e.condition,
                    right: J(e.alternative, u)
                }).transform(f) : e.condition.clone()
            }).optimize(f)) : 0 == u.length ? (r === o && !a && e.condition instanceof ki && "||" == e.condition.operator && (a = !0),
            t.push(ve(et, e, {
                body: ve(ki, e, {
                    operator: a ? "||" : "&&",
                    left: a ? i : e.condition,
                    right: J(e.body, n)
                }).transform(f)
            }).optimize(f))) : t.push(ve(et, e, {
                body: ve(Ei, e, {
                    condition: e.condition,
                    consequent: J(e.body, n),
                    alternative: J(e.alternative, u)
                })
            }).optimize(f)), c.forEach(function(e) {
                e.definition().references.push(e);
            }), ve(rt, e, {
                body: t
            }).optimize(f);
            if ((e = Q(e.body) ? ve(Gt, e, {
                condition: i,
                body: e.alternative,
                alternative: null
            }) : e).body instanceof Rt && e.alternative instanceof Rt && e.body.TYPE == e.alternative.TYPE) {
                var l = ve(e.body.CTOR, e, {
                    value: ve(Ei, e, {
                        condition: e.condition,
                        consequent: e.body.value || ve(ur, e.body).transform(f),
                        alternative: e.alternative.value || ve(ur, e.alternative).transform(f)
                    })
                });
                return l instanceof Bt && (l.in_bool = e.body.in_bool || e.alternative.in_bool),
                l;
            }
            if (Me((e = e.body instanceof Gt && !e.body.alternative && !e.alternative ? ve(Gt, e, {
                condition: ve(ki, e.condition, {
                    operator: "&&",
                    left: e.condition,
                    right: e.body.condition
                }),
                body: e.body.body,
                alternative: null
            }) : e).body) && e.alternative) {
                l = e.alternative;
                return e.alternative = null, ve(rt, e, {
                    body: [ e, l ]
                }).optimize(f);
            }
            if (Me(e.alternative)) {
                t = e.body;
                return e.body = e.alternative, e.condition = a ? i : e.condition.negate(f), e.alternative = null,
                ve(rt, e, {
                    body: [ e, t ]
                }).optimize(f);
            }
            return f.option("typeofs") && nn(e.condition, e.body, e.alternative), e;
            function p(e, n, t, i) {
                if (null == e) return [];
                if (e instanceof rt) {
                    for (var r = [], o = 0; o < e.body.length; o++) {
                        var a = e.body[o];
                        if (a instanceof $t) n.push(a); else if (!(a instanceof Qn)) if (a instanceof et) {
                            if (!f.option("sequences") && 0 < r.length) return;
                            r.push(a.body);
                        } else {
                            if (!(a instanceof oi)) return;
                            if (!f.option("sequences") && 0 < r.length) return;
                            a.remove_initializers(f, t), a.definitions.forEach(s);
                        }
                    }
                    return r;
                }
                if (e instanceof $t) return n.push(e), [];
                if (e instanceof Qn) return [];
                if (e instanceof et) return [ e.body ];
                if (e instanceof oi) {
                    r = [];
                    return e.remove_initializers(f, t), e.definitions.forEach(s), r;
                }
                function s(e) {
                    e.value && r.push(ve(Si, e, {
                        operator: "=",
                        left: e.name.convert_symbol(Xi, function(e) {
                            i.push(e);
                        }),
                        right: e.value
                    }));
                }
            }
        }), e(Jt, function(i, t) {
            if (!t.option("switches")) return i;
            if (!t.option("dead_code")) return i;
            for (var e, n, r, o = [], a = [], s = [], f = 0, c = i.body.length; f < c; f++) {
                if ((e = i.body[f]) instanceof Kt) {
                    var u = o[o.length - 1];
                    if (n || y(e.body[0], t) && (!u || Me(u))) {
                        x(e, u);
                        continue;
                    }
                    n = e;
                } else {
                    var l = e.expression, p = ve(ki, i, {
                        operator: "===",
                        left: i.expression,
                        right: l
                    }).evaluate(t, !0);
                    if (!p) {
                        l.has_side_effects(t) && s.push(l), x(e, o[o.length - 1]);
                        continue;
                    }
                    if (!(p instanceof Gn)) for (n && (p = o.indexOf(n), o.splice(p, 1), x(n, o[p - 1]),
                    n = null), l.has_side_effects(t) ? r = e : n = e = ve(Kt, e, e); ++f < c; ) x(i.body[f], e);
                }
                if (c <= f + 1 || Me(e)) {
                    var d, u = o[o.length - 1], h = e.body;
                    if (Me(u)) switch (u.body.length - h.length) {
                      case 1:
                        if (!y(d = u.body[u.body.length - 1], t)) break;
                        h = h.concat(d);

                      case 0:
                        var v = ve(rt, u, u), m = ve(rt, e, {
                            body: h
                        });
                        v.equivalent_to(m) && (u.body = []);
                    }
                }
                s.length && (e instanceof Kt ? o.push(ve(Qt, i, {
                    expression: J(i, s),
                    body: []
                })) : (s.push(e.expression), e.expression = J(i, s)), s = []), o.push(e);
            }
            for (s.length && !r && o.push(ve(Qt, i, {
                expression: J(i, s),
                body: []
            })); e = o[o.length - 1]; ) {
                if (y(d = e.body[e.body.length - 1], t) && e.body.pop(), e === n) {
                    if (!j(e)) break;
                } else {
                    if (e.expression.has_side_effects(t)) break;
                    if (n) {
                        if (!j(n)) break;
                        if (o[o.length - 2] !== n) break;
                        n.body = n.body.concat(e.body), e.body = [];
                    } else if (!j(e)) break;
                }
                x(e), o.pop() === n && (n = null);
            }
            if (!e) return a.push(ve(et, i.expression, {
                body: i.expression
            })), s.length && a.push(ve(et, i, {
                body: J(i, s)
            })), ve(rt, i, {
                body: a
            }).optimize(t);
            if (e === n) for (;(e = o[o.length - 2]) && !(e instanceof Kt) && j(e); ) {
                if ((l = e.expression).has_side_effects(t)) {
                    if ((u = o[o.length - 3]) && !Me(u)) break;
                    n.body.unshift(ve(et, i, {
                        body: l
                    }));
                }
                x(e), o.splice(-2, 1);
            }
            if (o[0].body = a.concat(o[0].body), i.body = o, t.option("conditionals")) switch (o.length) {
              case 1:
                if (!w(o[0])) break;
                l = o[0].expression, h = o[0].body.slice();
                return o[0] !== n && o[0] !== r ? ve(Gt, i, {
                    condition: ve(ki, i, {
                        operator: "===",
                        left: i.expression,
                        right: l
                    }),
                    body: ve(rt, i, {
                        body: h
                    }),
                    alternative: null
                }).optimize(t) : (l && h.unshift(ve(et, l, {
                    body: l
                })), h.unshift(ve(et, i.expression, {
                    body: i.expression
                })), ve(rt, i, {
                    body: h
                }).optimize(t));

              case 2:
                if (!qn(n, o) || !w(o[1])) break;
                var _ = (h = o[0].body.slice()).length && y(h[h.length - 1], t);
                if (_ && h.pop(), !Ln(h, w)) break;
                var g = o[1].body.length && ve(rt, o[1], o[1]), b = ve(Gt, i, {
                    condition: ve(ki, i, o[0] === n ? {
                        operator: "!==",
                        left: i.expression,
                        right: o[1].expression
                    } : {
                        operator: "===",
                        left: i.expression,
                        right: o[0].expression
                    }),
                    body: ve(rt, o[0], {
                        body: h
                    }),
                    alternative: _ && g || null
                });
                return (b = !_ && g ? ve(rt, i, {
                    body: [ b, g ]
                }) : b).optimize(t);
            }
            return i;
            function y(e, n) {
                return e instanceof Vt && n.loopcontrol_target(e) === i;
            }
            function w(e) {
                var n = !1, t = new mr(function(e) {
                    if (n || e instanceof _t || e instanceof et) return !0;
                    y(e, t) && (n = !0);
                });
                return t.push(i), e.walk(t), !n;
            }
            function x(e, n) {
                n && !Me(n) ? n.body = n.body.concat(e.body) : Y(t, e, a);
            }
        }), e(Zt, function(e, n) {
            if (e.body = H(e.body, n), n.option("dead_code")) {
                if (j(e) && !(e.bcatch && e.bcatch.argname && e.bcatch.argname.match_symbol(function(e) {
                    return e instanceof Ji && !pe(e);
                }, !0))) {
                    var t = [];
                    return e.bcatch && (Y(n, e.bcatch, t), t.forEach(function(e) {
                        e instanceof oi && e.definitions.forEach(function(e) {
                            var n = e.name.definition().redefined();
                            n && (e.name = e.name.clone(), e.name.thedef = n);
                        });
                    })), t.unshift(ve(rt, e, e).optimize(n)), e.bfinally && t.push(ve(rt, e.bfinally, e.bfinally).optimize(n)),
                    ve(rt, e, {
                        body: t
                    }).optimize(n);
                }
                if (e.bfinally && j(e.bfinally)) {
                    t = ve(rt, e.bfinally, e.bfinally).optimize(n);
                    if (t = e.body.concat(t), !e.bcatch) return ve(rt, e, {
                        body: t
                    }).optimize(n);
                    e.body = t, e.bfinally = null;
                }
            }
            return e;
        }), ii.DEFMETHOD("remove_initializers", on(function(e, n) {
            return ve(ur, n).optimize(e);
        })), ri.DEFMETHOD("remove_initializers", on(Nn)), oi.DEFMETHOD("remove_initializers", on(Nn)),
        ti.DEFMETHOD("to_assignments", function() {
            var e = this.definitions.reduce(function(e, n) {
                var t, i, r = n.name.definition(), o = n.value;
                return o && (o instanceof hi && (o = o.clone()), t = ve(Xi, n.name, n.name), i = ve(Si, n, {
                    operator: "=",
                    left: t,
                    right: o
                }), e.push(i), t.fixed = function() {
                    return i.right;
                }, t.fixed.assigns = [ i ], r.references.forEach(function(e) {
                    e = e.fixed && e.fixed.assigns;
                    e && e[0] === n && (e[0] = i);
                }), r.references.push(t)), r.eliminated++, r.single_use = !1, e;
            }, []);
            return 0 == e.length ? null : J(this, e);
        }), e(ii, un), e(ri, un), e(pi, function(l, f) {
            var a = l.expression, e = ln(l, f);
            if (e) return e;
            if (f.option("sequences")) if (a instanceof mi) {
                if ((b = pn(a)) !== a) {
                    e = l.clone();
                    return e.expression = b.expressions.pop(), b.expressions.push(e), b.optimize(f);
                }
            } else if (!K(0, a.tail_node())) if ((b = pn(l)) !== l) return b.optimize(f);
            if (f.option("unused") && dn(l, f), f.option("unsafe")) if (ge(a)) switch (a.name) {
              case "Array":
                if (1 == l.args.length) {
                    if ((c = l.args[0]) instanceof or) try {
                        var n = c.value;
                        if (6 < n) break;
                        for (var t = Array(n), i = 0; i < n; i++) t[i] = ve(lr, l);
                        return ve(Di, l, {
                            elements: t
                        });
                    } catch (e) {
                        Gn.warn("Invalid array length: {length} [{file}:{line},{col}]", {
                            length: n,
                            file: l.start.file,
                            line: l.start.line,
                            col: l.start.col
                        });
                        break;
                    }
                    if (!c.is_boolean(f) && !c.is_string(f)) break;
                }
                return ve(Di, l, {
                    elements: l.args
                });

              case "Object":
                if (0 == l.args.length) return ve(Ci, l, {
                    properties: []
                });
                break;

              case "String":
                if (0 == l.args.length) return ve(rr, l, {
                    value: ""
                });
                if (1 == l.args.length) return ve(ki, l, {
                    operator: "+",
                    left: ve(rr, l, {
                        value: ""
                    }),
                    right: l.args[0]
                }).optimize(f);
                break;

              case "Number":
                if (0 == l.args.length) return ve(or, l, {
                    value: 0
                });
                if (1 == l.args.length) return ve(wi, l, {
                    operator: "+",
                    expression: ve(ki, l, {
                        operator: "+",
                        left: ve(rr, l, {
                            value: ""
                        }),
                        right: l.args[0]
                    })
                }).optimize(f);
                break;

              case "Boolean":
                if (0 == l.args.length) return ve(hr, l).optimize(f);
                if (1 == l.args.length) return ve(wi, l, {
                    operator: "!",
                    expression: ve(wi, l, {
                        operator: "!",
                        expression: l.args[0]
                    })
                }).optimize(f);
                break;

              case "RegExp":
                var r = [];
                if (Ln(l.args, function(e) {
                    var n = e.evaluate(f);
                    return r.unshift(n), e !== n;
                })) try {
                    return te(f, l, ve(sr, l, {
                        value: RegExp.apply(RegExp, r)
                    }));
                } catch (e) {
                    Gn.warn("Error converting {expr} [{file}:{line},{col}]", {
                        expr: l,
                        file: l.start.file,
                        line: l.start.line,
                        col: l.start.col
                    });
                }
            } else if (a instanceof _i) switch (a.property) {
              case "toString":
                var o = a.expression;
                if (0 == l.args.length && !(o.may_throw_on_access(f) || o instanceof Zi)) return ve(ki, l, {
                    operator: "+",
                    left: ve(rr, l, {
                        value: ""
                    }),
                    right: o
                }).optimize(f);
                break;

              case "join":
                if (a.expression instanceof Di && l.args.length < 2) e: {
                    var s = l.args[0];
                    if (0 == a.expression.elements.length && !(s instanceof bi)) return s ? J(l, [ s, ve(rr, l, {
                        value: ""
                    }) ]).optimize(f) : ve(rr, l, {
                        value: ""
                    });
                    if (!(s && (s = s.evaluate(f)) instanceof Gn)) {
                        for (var c, t = [], u = [], i = 0; i < a.expression.elements.length; i++) {
                            var p = a.expression.elements[i];
                            if ((E = p.evaluate(f)) !== p) u.push(E); else {
                                if (p instanceof bi) break e;
                                0 < u.length && (t.push(ve(rr, l, {
                                    value: u.join(s)
                                })), u.length = 0), t.push(p);
                            }
                        }
                        return (0 < u.length && t.push(ve(rr, l, {
                            value: u.join(s)
                        })), 1 == t.length) ? t[0].is_string(f) ? t[0] : ve(ki, t[0], {
                            operator: "+",
                            left: ve(rr, l, {
                                value: ""
                            }),
                            right: t[0]
                        }) : "" == s ? (c = t[0].is_string(f) || t[1].is_string(f) ? t.shift() : ve(rr, l, {
                            value: ""
                        }), t.reduce(function(e, n) {
                            return ve(ki, n, {
                                operator: "+",
                                left: e,
                                right: n
                            });
                        }, c).optimize(f)) : ((M = l.clone()).expression = M.expression.clone(), M.expression.expression = M.expression.expression.clone(),
                        M.expression.expression.elements = t, te(f, l, M));
                    }
                }
                break;

              case "charAt":
                if (l.args.length < 2) return (M = ve(ki, l, {
                    operator: "||",
                    left: ve(gi, l, {
                        expression: a.expression,
                        property: l.args.length ? ve(ki, l.args[0], {
                            operator: "|",
                            left: ve(or, l, {
                                value: 0
                            }),
                            right: l.args[0]
                        }) : ve(or, l, {
                            value: 0
                        })
                    }).optimize(f),
                    right: ve(rr, l, {
                        value: ""
                    })
                })).is_string = jn, M.optimize(f);
                break;

              case "apply":
                if (2 == l.args.length && l.args[1] instanceof Di) return (z = l.args[1].elements.slice()).unshift(l.args[0]),
                ve(pi, l, {
                    expression: ve(_i, a, {
                        expression: a.expression,
                        property: "call"
                    }),
                    args: z
                }).optimize(f);
                break;

              case "call":
                o = a.expression;
                if ((o = o instanceof Xi ? o.fixed_value() : o) instanceof _t && !o.contains_this()) return (l.args.length ? J(this, [ l.args[0], ve(pi, l, {
                    expression: a.expression,
                    args: l.args.slice(1)
                }) ]) : ve(pi, l, {
                    expression: a.expression,
                    args: []
                })).optimize(f);
            }
            if (f.option("unsafe_Function") && ge(a) && "Function" == a.name) {
                if (0 == l.args.length) return ve(Dt, l, {
                    argnames: [],
                    body: []
                }).init_vars(a.scope);
                if (Ln(l.args, function(e) {
                    return e instanceof rr;
                })) try {
                    var d = kr(_ = "n(function(" + l.args.slice(0, -1).map(function(e) {
                        return e.value;
                    }).join() + "){" + l.args[l.args.length - 1].value + "})"), h = {
                        ie: f.option("ie")
                    };
                    d.figure_out_scope(h);
                    var v, m = new Tr(f.options);
                    (d = d.transform(m)).figure_out_scope(h), d.compute_char_frequency(h), d.mangle_names(h),
                    d.walk(new mr(function(e) {
                        return !!v || (e instanceof _t ? (v = e, !0) : void 0);
                    }));
                    var _ = Ar();
                    return rt.prototype._codegen.call(v, _), l.args = [ ve(rr, l, {
                        value: v.argnames.map(function(e) {
                            return e.print_to_string();
                        }).join()
                    }), ve(rr, l.args[l.args.length - 1], {
                        value: _.get().replace(/^\{|\}$/g, "")
                    }) ], l;
                } catch (e) {
                    if (!(e instanceof yr)) throw e;
                    Gn.warn("Error parsing code passed to new Function [{file}:{line},{col}]", l.args[l.args.length - 1].start),
                    Gn.warn(e.toString());
                }
            }
            var g = a instanceof Xi ? a.fixed_value() : a, b = f.parent(), y = f.self(), m = g instanceof _t && (!wt(g) || f.option("awaits") && b instanceof Ti) && (!xt(g) || f.option("yields") && y instanceof Ai && y.nested), h = m && g.first_statement(), w = 0, x = !1, k = !Ln(l.args, function(e) {
                return !(e instanceof bi);
            }), d = m && Ln(g.argnames, function(e, n) {
                if (1 == w && l.args[n] instanceof bi && (w = 2), e instanceof li) {
                    n = 1 == (w = w || 1) && l.args[n];
                    if (n && !ye(n) && (w = 2), j(e.value)) return;
                    e = e.name;
                }
                return !(e instanceof Oi && (x = !0, j(e)));
            }) && !(g.rest instanceof Oi && j(g.rest)), _ = d && f.option("inline") && !l.is_expr_pure(f);
            if (_ && h instanceof Bt) {
                var E = h.value;
                if (a === g && !g.name && (!E || E.is_constant_expression()) && H(g)) return J(l, N(E)).optimize(f);
            }
            if (m) {
                var S = !1;
                if (_ && !g.uses_arguments && !g.pinned() && !(g.name && g instanceof bt) && (a === g || !xn(f, C = a.definition(), g) && g.is_constant_expression(W(f))) && !k && (E = function(e) {
                    var n = g.body.length;
                    if (n < 2 && (e = R(e))) return e;
                    if (f.option("inline") < 3) return !1;
                    e = null;
                    for (var t = 0; t < n; t++) {
                        var i = g.body[t];
                        if (i instanceof oi) {
                            var r = S || !ee(i);
                            if (r && (S = !0, e)) return !1;
                        } else if (!(i instanceof zt || i instanceof Ct || i instanceof Qn)) {
                            if (e) return !1;
                            e = i;
                        }
                    }
                    return R(e);
                }(h)) && !g.contains_this()) {
                    var T, A, D, O, $ = a === g || C.single_use && C.references.length - C.replaced == 1;
                    if (function() {
                        if (!(w || x || S || g.rest) && !(f.option("inline") < 2 && g.argnames.length) && g.variables.all(function(e) {
                            return e.references.length - e.replaced < 2 && e.orig[0] instanceof Ui;
                        })) {
                            var i, r = !1, o = I(), a = [], s = !1;
                            if (E.walk(new mr(function(e, n) {
                                if (r) return !0;
                                if (!(e instanceof ki && we[e.operator] || e instanceof Ei)) {
                                    if (e instanceof vt) return r = !0;
                                    if (o && e instanceof Ii && o[e.name]) return r = !0;
                                    if (e instanceof Xi) {
                                        var t = e.definition();
                                        if (g.variables.get(e.name) !== t) return void (a = null);
                                        if (t.init instanceof $t) return r = !0;
                                        if (Sr(e, this.parent())) return r = !0;
                                        t = B(t);
                                        return (i < t || (i = t), a) ? void (s ? a = null : a.push(g.argnames[t])) : void 0;
                                    }
                                    return e.has_side_effects(f) ? (n(), s = !0) : void 0;
                                }
                                a = null;
                            })), !r) {
                                var e = l.args.length;
                                if (a && g.argnames.length >= e) {
                                    for (e = g.argnames.length; e-- > i && g.argnames[e] === a.pop(); );
                                    e++;
                                }
                                var n = s && !a && f.find_parent(vt);
                                return e <= i || Ln(l.args.slice(i, e), n ? function(e) {
                                    return e.is_constant_expression(n);
                                } : function(e) {
                                    return !e.has_side_effects(f);
                                });
                            }
                        }
                    }()) {
                        var z = l.args.slice(), q = [];
                        z.push(E.clone(!0).transform(new _r(function(e) {
                            if (e instanceof Xi) {
                                var n = e.definition();
                                if (g.variables.get(e.name) !== n) return q.push(e), e;
                                var t = B(n), n = z[t];
                                if (!n) return ve(ur, l);
                                z[t] = null;
                                t = this.parent();
                                return t ? me(0, t, e, n) : n;
                            }
                        })));
                        var C = g.inlined;
                        a !== g && (g.inlined = !0);
                        var M = J(l, z.filter(function(e) {
                            return e;
                        })).optimize(f);
                        if (g.inlined = C, M = me(0, b, y, M), $ || ne(M, l) === M) return q.forEach(function(e) {
                            e.scope = a === g ? g.parent_scope : a.scope, e.reference();
                            e = e.definition();
                            $ && e.replaced++, e.single_use = !1;
                        }), M;
                        M.has_side_effects(f) || (l.drop_side_effect_free = function(e, n) {
                            var t = this.args.slice();
                            return t.unshift(this.expression), J(this, t).drop_side_effect_free(e, n);
                        });
                    }
                    if ($ && function() {
                        var e, n = Object.create(null), t = 0;
                        O = y;
                        do {
                            if (O.variables && O.variables.each(function(e) {
                                n[e.name] = !0;
                            }), e = O, (O = f.parent(t++)) instanceof st) D = []; else if (O instanceof ut) O.init !== e && (D = []); else if (O instanceof lt) O.init !== e && O.object !== e && (D = []); else if (O instanceof Xi && O.fixed_value() instanceof vt) return !1;
                        } while (!(O instanceof vt));
                        if (!(A = O.body.indexOf(e) + 1)) return !1;
                        if (!H(g)) return !1;
                        var i = a !== g || g.parent_scope.resolve() === O;
                        O instanceof mt && (f.toplevel.vars ? n.arguments = !0 : i = !1);
                        var r = f.option("inline");
                        if (T = Object.create(n), !function(n, t, i) {
                            var r = !1;
                            return g.each_argname(function(e) {
                                if (!r && !e.__unused) {
                                    if (!i || L(n, e.name)) return r = !0;
                                    t[e.name] = !0, D && D.push(e.definition());
                                }
                            }), !r;
                        }(n, T, 2 <= r && i)) return !1;
                        var o = Object.create(T);
                        return !!function(n, e, t) {
                            for (var i = 0; i < g.body.length; i++) {
                                var r = g.body[i];
                                if (r instanceof $t) {
                                    if (!t || L(e, r.name.name)) return !1;
                                    if (!Ln(r.enclosed, function(e) {
                                        return e.scope === r || !n[e.name];
                                    })) return !1;
                                    D && D.push(r.name.definition());
                                } else if (r instanceof oi) {
                                    if (!t) return !1;
                                    for (var o = r.definitions.length; 0 <= --o; ) {
                                        var a = r.definitions[o].name;
                                        if (L(n, a.name)) return !1;
                                        D && D.push(a.definition());
                                    }
                                }
                            }
                            return !0;
                        }(n, o, 3 <= r && i) && (!D || 0 == D.length || !An(g, D));
                    }()) {
                        g._squeezed = !0, a !== g && (g.parent_scope = a.scope);
                        M = J(l, function() {
                            var e = [], n = [];
                            (1 < w || x || g.rest ? function(i, r) {
                                function n(e, n) {
                                    var t = n.definition();
                                    t.references.push(e);
                                    n = ve(Li, n, n);
                                    t.orig.push(n), U(i, r, n);
                                }
                                r.push(ve(Si, l, {
                                    operator: "=",
                                    left: ve($i, l, {
                                        elements: g.argnames.map(function(e) {
                                            return e.__unused ? ve(lr, e) : e.convert_symbol(Xi, n);
                                        }),
                                        rest: g.rest && g.rest.convert_symbol(Xi, n)
                                    }),
                                    right: ve(Di, l, {
                                        elements: l.args.slice()
                                    })
                                }));
                            } : function(e, n) {
                                for (var t = g.argnames.length, i = l.args.length; --i >= t; ) n.push(l.args[i]);
                                var r, o = [];
                                for (i = t; 0 <= --i; ) {
                                    var a = g.argnames[i];
                                    r = a instanceof li ? (o.push(a), a.name) : a;
                                    var s, f = l.args[i];
                                    r.__unused || O.var_names()[r.name] ? f && n.push(f) : (s = ve(Li, r, r), r.definition().orig.push(s),
                                    "__unused" in r ? (U(e, n, s), f && n.push(f)) : (!f && D && a === r && (f = ve(ur, l)),
                                    U(e, n, s, f)));
                                }
                                for (e.reverse(), n.reverse(), i = o.length; 0 <= --i; ) {
                                    var c, u = o[i];
                                    "__unused" in u.name ? n.push(u.value) : (c = ve(Xi, u.name, u.name), u.name.definition().references.push(c),
                                    n.push(ve(Si, u, {
                                        operator: "=",
                                        left: c,
                                        right: u.value
                                    })));
                                }
                            })(e, n);
                            var t = function(e, n) {
                                for (var t = [ A, 0 ], i = [], r = [], o = [], a = 0; a < g.body.length; a++) {
                                    var s = g.body[a];
                                    if (s instanceof $t) D ? ((p = ve(Li, s.name, V(s.name))).definition().orig.push(p),
                                    U(e, n, p, Be(s, !0))) : (c = s.name.definition(), O.functions.set(c.name, c), O.variables.set(c.name, c),
                                    O.enclosed.push(c), O.var_names()[c.name] = !0, t.push(s)); else if (s instanceof oi) for (var f = 0; f < s.definitions.length; f++) {
                                        var c, u, l = s.definitions[f], p = V(l.name);
                                        U(i, r, p, l.value), D && !Vn(T, p.name) && (c = g.variables.get(p.name), u = ve(Xi, p, p),
                                        c.references.push(u), o.push(ve(Si, l, {
                                            operator: "=",
                                            left: u,
                                            right: ve(ur, p)
                                        })));
                                    }
                                }
                                return [].push.apply(e, i), [].push.apply(n, o), [].push.apply(n, r), t;
                            }(e, n);
                            n.push(E), e.length && t.push(ve(oi, g, {
                                definitions: e
                            }));
                            return [].splice.apply(O.body, t), g.enclosed.forEach(function(e) {
                                O.var_names()[e.name] || (O.enclosed.push(e), O.var_names()[e.name] = !0);
                            }), n;
                        }()).optimize(f);
                        return me(0, b, y, M);
                    }
                }
                if (f.option("side_effects") && d && Ln(g.body, Q) && (g === a ? Ge(g, f) : !w && !x && !g.rest) && (!yt(g) || !g.value) && H(g)) return J(l, N()).optimize(f);
            }
            if (f.option("drop_console") && a instanceof mi) {
                for (var F = a.expression; F.expression; ) F = F.expression;
                if (ge(F) && "console" == F.name) return ve(ur, l).optimize(f);
            }
            return f.option("negate_iife") && b instanceof et && Z(y) ? l.negate(f, !0) : ae(f, l);
            function j(e) {
                var n = !1;
                return e.walk(new mr(function(e) {
                    return !!n || (e instanceof Xi && g.variables.get(e.name) === e.definition() ? n = !0 : void 0);
                })), n;
            }
            function P(e) {
                return ve(_i, e, {
                    expression: ve(Di, e, {
                        elements: []
                    }),
                    property: "e"
                });
            }
            function N(e) {
                var a, t, n = l.args.slice(), i = 1 < w || x || g.rest;
                return (i || k) && (n = [ ve(Di, l, {
                    elements: n
                }) ]), i ? (a = new _r(function(i, e) {
                    if (i instanceof li) return ve(li, i, {
                        name: i.name.transform(a) || P(i),
                        value: i.value
                    });
                    if (i instanceof $i) {
                        var t = [];
                        return i.elements.forEach(function(e, n) {
                            (e = e.transform(a)) && (t[n] = e);
                        }), Ye(i, t), ve($i, i, {
                            elements: t
                        });
                    }
                    if (i instanceof qi) {
                        var r = [], o = [];
                        return i.properties.forEach(function(e) {
                            var n = e.key, t = e.value.transform(a);
                            t ? (o.length && (n instanceof Gn || (n = X(n, e)), o.push(n), n = J(i, o), o = []),
                            r.push(ve(zi, e, {
                                key: n,
                                value: t
                            }))) : n instanceof Gn && o.push(n);
                        }), o.length && r.push(ve(zi, i, {
                            key: J(i, o),
                            value: P(i)
                        })), ve(qi, i, {
                            properties: r
                        });
                    }
                    return i instanceof Ui ? null : void 0;
                }), t = [], g.argnames.forEach(function(e, n) {
                    (e = e.transform(a)) && (t[n] = e);
                }), (i = g.rest && g.rest.transform(a)) && (t.length = g.argnames.length), Ye(g, t),
                n[0] = ve(Si, l, {
                    operator: "=",
                    left: ve($i, g, {
                        elements: t,
                        rest: i
                    }),
                    right: n[0]
                })) : g.argnames.forEach(function(e) {
                    e instanceof li && n.push(e.value);
                }), n.push(e || ve(ur, l)), n;
            }
            function I() {
                var e = [], n = O || f.find_parent(vt);
                return wt(n) && e.push("await"), xt(n) && e.push("yield"), e.length && Bn(e);
            }
            function H(e) {
                var t = I();
                if (!t) return 1;
                var i = !0, r = new mr(function(e) {
                    if (!i) return !0;
                    if (e instanceof vt) {
                        if (e === g) return;
                        if (yt(e)) for (var n = 0; i && n < e.argnames.length; n++) e.argnames[n].walk(r); else e instanceof $t && t[e.name.name] && (i = !1);
                        return !0;
                    }
                    e instanceof Ii && t[e.name] && e !== g.name && (i = !1);
                });
                return e.walk(r), i;
            }
            function Y() {
                return l.call_only ? ve(or, l, {
                    value: 0
                }) : ve(ur, l);
            }
            function R(e) {
                return e ? e instanceof Bt ? e.value || Y() : e instanceof et ? l.call_only ? e.body : ve(wi, e, {
                    operator: "void",
                    expression: e.body
                }) : void 0 : Y();
            }
            function B(e) {
                for (var n = g.argnames.length; 0 <= --n; ) if (g.argnames[n].definition() === e) return n;
            }
            function L(e, n) {
                return e[n] || G[n] || O.var_names()[n];
            }
            function U(e, n, t, i) {
                var r = t.definition();
                O.var_names()[t.name] || (O.var_names()[t.name] = !0, e.push(ve(ai, t, {
                    name: t,
                    value: null
                }))), O.variables.set(t.name, r), O.enclosed.push(r), i && (t = ve(Xi, t, t), r.references.push(t),
                n.push(ve(Si, l, {
                    operator: "=",
                    left: t,
                    right: i
                })));
            }
            function V(e) {
                var n = e.definition().redefined();
                return n && ((e = e.clone()).thedef = n), e;
            }
        }), e(di, function(e, n) {
            if (n.option("sequences")) {
                var t = pn(e);
                if (t !== e) return t.optimize(n);
            }
            if (n.option("unused") && dn(e, n), n.option("unsafe")) {
                t = e.expression;
                if (ge(t)) switch (t.name) {
                  case "Object":
                  case "RegExp":
                  case "Function":
                  case "Error":
                  case "Array":
                    return ve(pi, e, e).transform(n);
                }
            }
            return e;
        }), e(hi, function(e, o) {
            var a = function() {
                if (!o.option("side_effects")) return e.expressions;
                var t = [], i = Wn(o), r = e.expressions.length - 1;
                return e.expressions.forEach(function(e, n) {
                    (e = n < r ? e.drop_side_effect_free(o, i) : e) && (q(t, e), i = !1);
                }), t;
            }(), s = a.length - 1;
            return function() {
                for (var e = 1; e < s; e++) {
                    var n = a[e - 1], t = f(n);
                    if (t) {
                        var i = a[e];
                        if (o.option("conditionals")) {
                            var r = hn(o, t, n.right, i);
                            if (r) {
                                n.right = r, a.splice(e--, 1), s--;
                                continue;
                            }
                        }
                        o.option("dead_code") && f(i) === t && i.right.is_constant_expression(t.scope.resolve()) && (a[--e] = n.right);
                    }
                }
            }(), function() {
                if (o.option("side_effects")) {
                    for (;0 < s && ye(a[s], o); ) s--;
                    s < a.length - 1 && (a[s] = ve(wi, e, {
                        operator: "void",
                        expression: a[s]
                    }), a.length = s + 1);
                }
            }(), 0 == s ? (e = me(0, o.parent(), o.self(), a[0])) instanceof hi ? e : e.optimize(o) : (e.expressions = a,
            e);
            function f(e) {
                return e instanceof Si && "=" == e.operator && e.left instanceof Xi && e.left.definition();
            }
        }), e(xi, function(e, n) {
            if (n.option("sequences")) {
                var t = pn(e);
                if (t !== e) return t.optimize(n);
            }
            return ae(n, e);
        });
        var vn = Bn("+ -"), mn = Bn("* / %");
        e(wi, function(e, n) {
            var t = e.operator, i = e.expression;
            if (n.option("evaluate") && "delete" == t && !a(i)) return J(e, [ i, ve(vr, e) ]).optimize(n);
            if (n.option("sequences") && function() {
                switch (t) {
                  case "delete":
                    return !a(i.tail_node());

                  case "typeof":
                    return !ge(i.tail_node());

                  default:
                    return !0;
                }
            }()) {
                var r = pn(e);
                if (r !== e) return r.optimize(n);
            }
            if (n.option("side_effects") && "void" == t) return (i = i.drop_side_effect_free(n)) ? (e.expression = i,
            e) : ve(ur, e).optimize(n);
            if (n.option("booleans")) {
                if ("!" == t && i.is_truthy()) return J(e, [ i, ve(hr, e) ]).optimize(n);
                if (n.in_boolean_context()) switch (t) {
                  case "!":
                    if (i instanceof wi && "!" == i.operator) return i.expression;
                    i instanceof ki && (e = te(n, e, i.negate(n, Wn(n))));
                    break;

                  case "typeof":
                    Gn.warn("Boolean expression always true [{file}:{line},{col}]", e.start);
                    var o = [ ve(vr, e) ];
                    return i instanceof Xi && pe(i, n) || o.unshift(i), J(e, o).optimize(n);
                }
            }
            return "-" == t && i instanceof pr && (i = i.transform(n)), n.option("evaluate") && i instanceof ki && vn[t] && mn[i.operator] && (i.left.is_constant() || !i.right.has_side_effects(n)) ? ve(ki, e, {
                operator: i.operator,
                left: ve(wi, i.left, {
                    operator: t,
                    expression: i.left
                }),
                right: i.right
            }) : "-" == t && (i instanceof or || i instanceof pr) ? e : ae(n, e);
            function a(e) {
                return e instanceof pr || e instanceof cr || e instanceof nr || e instanceof mi || e instanceof Xi || e instanceof ur;
            }
        }), e(Ti, function(e, n) {
            if (!n.option("awaits")) return e;
            if (n.option("sequences")) {
                var t = pn(e);
                if (t !== e) return t.optimize(n);
            }
            if (n.option("side_effects")) {
                var i = e.expression;
                if (i instanceof Ti) return i.optimize(n);
                if (i instanceof wi) {
                    if (i.expression instanceof Ti) return i.optimize(n);
                    if ("void" == i.operator) return ve(wi, e, {
                        operator: "void",
                        expression: ve(Ti, e, {
                            expression: i.expression
                        })
                    }).optimize(n);
                }
                for (var r, o = 0, a = e; r = n.parent(o++); a = r) {
                    if (yt(r)) {
                        if (r.value === a) return i.optimize(n);
                    } else if (r instanceof Bt) {
                        var s = !0;
                        do {
                            if (a = r, (r = n.parent(o++)) instanceof Zt && (r.bfinally || r.bcatch) !== a) {
                                s = !1;
                                break;
                            }
                        } while (r && !(r instanceof vt));
                        if (s) return i.optimize(n);
                    } else if (r instanceof hi && r.tail_node() === a) continue;
                    break;
                }
            }
            return e;
        }), e(Ai, function(e, n) {
            if (!n.option("yields")) return e;
            if (n.option("sequences")) {
                var t = pn(e);
                if (t !== e) return t.optimize(n);
            }
            t = e.expression;
            if (e.nested && "Call" == t.TYPE) {
                n = t.clone().optimize(n);
                if ("Call" != n.TYPE) return n;
            }
            return e;
        }), ki.DEFMETHOD("lift_sequences", function(e) {
            if (this.left instanceof mi) {
                if (!(this.left.expression instanceof hi)) return this;
                var n = this.left.expression.expressions.slice();
                return (t = this.clone()).left = t.left.clone(), t.left.expression = n.pop(), n.push(t),
                J(this, n);
            }
            if (this.left instanceof hi) {
                n = this.left.expressions.slice();
                return (t = this.clone()).left = n.pop(), n.push(t), J(this, n);
            }
            if (this.right instanceof hi) {
                if (this.left.has_side_effects(e)) return this;
                for (var t, i = "=" == this.operator && this.left instanceof Xi, r = (n = this.right.expressions).length - 1, o = 0; o < r && (i || !n[o].has_side_effects(e)); o++);
                if (o == r) return n = n.slice(), (t = this.clone()).right = n.pop(), n.push(t),
                J(this, n);
                if (0 < o) return (t = this.clone()).right = J(this.right, n.slice(o)), (n = n.slice(0, o)).push(t),
                J(this, n);
            }
            return this;
        });
        var _n = Bn("indexOf lastIndexOf"), gn = Bn("== === != !== * & | ^");
        function bn(e) {
            return e instanceof Si ? "=" == e.operator && bn(e.right) : e instanceof hi ? bn(e.tail_node()) : e instanceof Xi ? bn(e.fixed_value()) : e instanceof Di || e instanceof Ft || e instanceof _t || e instanceof di || e instanceof Ci;
        }
        function yn(e, n) {
            if (n.is_constant()) return !0;
            if (n instanceof Si) return "=" != n.operator || yn(e, n.right);
            if (n instanceof ki) return !we[n.operator] || yn(e, n.left) && yn(e, n.right);
            if (n instanceof Ei) return yn(e, n.consequent) && yn(e, n.alternative);
            if (n instanceof hi) return yn(e, n.tail_node());
            if (n instanceof Xi) {
                var t = n.fixed_value();
                return t && yn(e, t);
            }
            return n instanceof tr ? !n.tag || En(e, n.tag) : n instanceof yi || void 0;
        }
        function wn(e, n) {
            return n instanceof _i ? wn(e, n.expression) : n instanceof gi ? wn(e, n.expression) && wn(e, n.property) : n instanceof Ii || !n.has_side_effects(e);
        }
        function xn(e, n, t) {
            var i = 0, r = e.self();
            do {
                if (r === t) return r;
                if (D(r) && r.name && r.name.definition() === n) return r;
            } while (r = e.parent(i++));
        }
        function kn(e) {
            var n = e.scope.resolve();
            return Ln(e.references, function(e) {
                return n === e.scope.resolve();
            });
        }
        function En(e, n) {
            return e.option("unsafe") && n instanceof _i && "raw" == n.property && ge(n.expression) && "String" == n.expression.name;
        }
        function Sn(e) {
            var t = !1;
            if (e = e.replace(/\\(u\{[^{}]*\}?|u[\s\S]{0,4}|x[\s\S]{0,2}|[0-9]+|[\s\S])/g, function(e, n) {
                n = br(n);
                if ("string" == typeof n) return n;
                t = !0;
            }), !t) return e;
        }
        function Tn(e, n) {
            return e instanceof Xi || e.TYPE === n.TYPE;
        }
        function An(t, n) {
            var i = !1, r = new mr(function(e) {
                return !!i || (e instanceof Xi && qn(e.definition(), n) ? i = !0 : void 0);
            }), o = new mr(function(e) {
                if (i) return !0;
                if (e instanceof _t && e !== t) {
                    if (!(e.name || wt(e) || xt(e))) {
                        var n = o.parent();
                        if (n instanceof pi && n.expression === e) return;
                    }
                    return e.walk(r), !0;
                }
            });
            return t.walk(o), i;
        }
        e(ki, function(t, a) {
            function n() {
                return t.left.is_constant() || t.right.is_constant() || !t.left.has_side_effects(a) && !t.right.has_side_effects(a);
            }
            function e(e) {
                n() && (e && (t.operator = e), e = t.left, t.left = t.right, t.right = e);
            }
            function i() {
                var e = t.right;
                t.left = ve(ki, t, {
                    operator: t.operator,
                    left: t.left,
                    right: e.left,
                    start: t.left.start,
                    end: e.left.end
                }), t.right = e.right, t.left = t.left.transform(a);
            }
            if (!gn[t.operator] || !t.right.is_constant() || t.left.is_constant() || t.left instanceof ki && xr[t.left.operator] >= xr[t.operator] || e(),
            a.option("sequences")) {
                var r = t.lift_sequences(a);
                if (r !== t) return r.optimize(a);
            }
            if (a.option("assignments") && we[t.operator]) {
                var o = t.right;
                if (t.left instanceof Xi && o instanceof Si && "=" == o.operator && t.left.equivalent_to(o.left)) return t.right = o.right,
                o.right = t, o;
            }
            if (a.option("comparisons")) switch (t.operator) {
              case "===":
              case "!==":
                if (ye(t.left, a) && t.right.is_defined(a)) return Gn.warn("Expression always defined [{file}:{line},{col}]", t.start),
                J(t, [ t.right, ve("===" == t.operator ? hr : vr, t) ]).optimize(a);
                var s = !0;
                (t.left.is_string(a) && t.right.is_string(a) || t.left.is_number(a) && t.right.is_number(a) || t.left.is_boolean(a) && t.right.is_boolean(a) || wn(a, t.left) && t.left.equivalent_to(t.right)) && (t.operator = t.operator.slice(0, 2));

              case "==":
              case "!=":
                if (!s && ye(t.left, a)) t.left = ve(fr, t.left); else if (a.option("typeofs") && t.left instanceof rr && "undefined" == t.left.value && t.right instanceof wi && "typeof" == t.right.operator) {
                    var f = t.right.expression;
                    (f instanceof Xi ? !f.is_declared(a) : f instanceof mi && a.option("ie")) || (t.right = f,
                    t.left = ve(ur, t.left).optimize(a), 2 == t.operator.length && (t.operator += "="));
                } else if (t.left instanceof Xi && t.right instanceof Xi && t.left.definition() === t.right.definition() && bn(t.left)) return ve("=" == t.operator[0] ? vr : hr, t).optimize(a);
                break;

              case "&&":
              case "||":
                if ((d = (d = t.left).operator == t.operator ? d.right : d) instanceof ki && d.operator == ("&&" == t.operator ? "!==" : "===") && t.right instanceof ki && d.operator == t.right.operator && (ye(d.left, a) && t.right.left instanceof fr || d.left instanceof fr && ye(t.right.left, a)) && !d.right.has_side_effects(a) && d.right.equivalent_to(t.right.right)) {
                    f = ve(ki, t, {
                        operator: d.operator.slice(0, -1),
                        left: ve(fr, t),
                        right: d.right
                    });
                    return f = d !== t.left ? ve(ki, t, {
                        operator: t.operator,
                        left: t.left.left,
                        right: f
                    }) : f;
                }
            }
            var c, u, l = !1, p = a.parent();
            if (a.option("booleans")) {
                var d = t.left;
                if (we[t.operator] && !d.has_side_effects(a)) {
                    if (d.equivalent_to(t.right)) return me(0, p, a.self(), d).optimize(a);
                    rn(a, d);
                }
                l = a.in_boolean_context();
            }
            if (l) switch (t.operator) {
              case "+":
                var h = t.left.evaluate(a), v = t.right.evaluate(a);
                if (h && "string" == typeof h) return Gn.warn("+ in boolean context always true [{file}:{line},{col}]", t.start),
                J(t, [ t.right, ve(vr, t) ]).optimize(a);
                if (v && "string" == typeof v) return Gn.warn("+ in boolean context always true [{file}:{line},{col}]", t.start),
                J(t, [ t.left, ve(vr, t) ]).optimize(a);
                break;

              case "==":
                if (t.left instanceof rr && "" == t.left.value && t.right.is_string(a)) return ve(wi, t, {
                    operator: "!",
                    expression: t.right
                }).optimize(a);
                break;

              case "!=":
                if (t.left instanceof rr && "" == t.left.value && t.right.is_string(a)) return t.right.optimize(a);
            }
            if (a.option("comparisons") && t.is_boolean(a)) {
                if (!(p instanceof ki) || p instanceof Si) {
                    o = te(a, t, ve(wi, t, {
                        operator: "!",
                        expression: t.negate(a, Wn(a))
                    }));
                    if (o !== t) return o;
                }
                switch (t.operator) {
                  case ">":
                    e("<");
                    break;

                  case ">=":
                    e("<=");
                }
            }
            if (a.option("conditionals") && we[t.operator] && t.right instanceof ki && t.operator == t.right.operator && i(),
            a.option("strings") && "+" == t.operator) {
                if (t.right instanceof rr && "" == t.right.value && t.left.is_string(a)) return t.left.optimize(a);
                if (t.left instanceof rr && "" == t.left.value && t.right.is_string(a)) return t.right.optimize(a);
                if (t.left instanceof ki && "+" == t.left.operator && t.left.left instanceof rr && "" == t.left.left.value && t.right.is_string(a) && (t.left.right.is_constant() || !t.right.has_side_effects(a))) return t.left = t.left.right,
                t.optimize(a);
                t.right instanceof ki && t.operator == t.right.operator && (t.left.is_string(a) && t.right.is_string(a) || t.right.left.is_string(a) && (t.left.is_constant() || !t.right.right.has_side_effects(a))) && i();
            }
            if (a.option("evaluate")) {
                var m, _ = !0;
                switch (t.operator) {
                  case "&&":
                    if (!(h = tn(a, t.left))) return Gn.warn("Condition left of && always false [{file}:{line},{col}]", t.start),
                    me(0, p, a.self(), t.left).optimize(a);
                    if (!(h instanceof Gn)) return Gn.warn("Condition left of && always true [{file}:{line},{col}]", t.start),
                    J(t, [ t.left, t.right ]).optimize(a);
                    if (v = t.right.evaluate(a)) {
                        if (!(v instanceof Gn) && (l || "&&" == p.operator && p.left === a.self())) return Gn.warn("Dropping side-effect-free && [{file}:{line},{col}]", t.start),
                        t.left.optimize(a);
                    } else {
                        if (l) return Gn.warn("Boolean && always false [{file}:{line},{col}]", t.start),
                        J(t, [ t.left, ve(hr, t) ]).optimize(a);
                        t.falsy = !0;
                    }
                    if ("||" == t.left.operator) if (!(b = tn(a, t.left.right))) return ve(Ei, t, {
                        condition: t.left.left,
                        consequent: t.right,
                        alternative: t.left.right
                    }).optimize(a);
                    break;

                  case "??":
                    var g = !0;

                  case "||":
                    var b, h = tn(a, t.left, g);
                    if (g ? null == h : !h) return Gn.warn("Condition left of {operator} always {value} [{file}:{line},{col}]", {
                        operator: t.operator,
                        value: g ? "nulish" : "false",
                        file: t.start.file,
                        line: t.start.line,
                        col: t.start.col
                    }), J(t, [ t.left, t.right ]).optimize(a);
                    if (!(h instanceof Gn)) return Gn.warn("Condition left of {operator} always {value} [{file}:{line},{col}]", {
                        operator: t.operator,
                        value: g ? "defined" : "true",
                        file: t.start.file,
                        line: t.start.line,
                        col: t.start.col
                    }), me(0, p, a.self(), t.left).optimize(a);
                    if (v = t.right.evaluate(a)) {
                        if (!(g || v instanceof Gn)) {
                            if (l) return Gn.warn("Boolean || always true [{file}:{line},{col}]", t.start),
                            J(t, [ t.left, ve(vr, t) ]).optimize(a);
                            t.truthy = !0;
                        }
                    } else if (l || "||" == p.operator && p.left === a.self()) return Gn.warn("Dropping side-effect-free {operator} [{file}:{line},{col}]", {
                        operator: t.operator,
                        file: t.start.file,
                        line: t.start.line,
                        col: t.start.col
                    }), t.left.optimize(a);
                    if (!g && "&&" == t.left.operator) if ((b = tn(a, t.left.right)) && !(b instanceof Gn)) return ve(Ei, t, {
                        condition: t.left.left,
                        consequent: t.left.right,
                        alternative: t.right
                    }).optimize(a);
                    break;

                  case "+":
                    if ((t = (t = t.left instanceof ir && t.right instanceof ki && "+" == t.right.operator && t.right.left instanceof ir && t.right.is_string(a) ? ve(ki, t, {
                        operator: "+",
                        left: ve(rr, t.left, {
                            value: "" + t.left.value + t.right.left.value,
                            start: t.left.start,
                            end: t.right.left.end
                        }),
                        right: t.right.right
                    }) : t).right instanceof ir && t.left instanceof ki && "+" == t.left.operator && t.left.right instanceof ir && t.left.is_string(a) ? ve(ki, t, {
                        operator: "+",
                        left: t.left.left,
                        right: ve(rr, t.right, {
                            value: "" + t.left.right.value + t.right.value,
                            start: t.left.right.start,
                            end: t.right.end
                        })
                    }) : t).right instanceof wi && "-" == t.right.operator && t.left.is_number(a)) {
                        t = ve(ki, t, {
                            operator: "-",
                            left: t.left,
                            right: t.right.expression
                        });
                        break;
                    }
                    if (t.left instanceof wi && "-" == t.left.operator && n() && t.right.is_number(a)) {
                        t = ve(ki, t, {
                            operator: "-",
                            left: t.right,
                            right: t.left.expression
                        });
                        break;
                    }
                    if (a.option("unsafe_math") && t.left instanceof ki && xr[t.left.operator] == xr[t.operator] && t.right.is_constant() && (t.right.is_boolean(a) || t.right.is_number(a)) && t.left.is_number(a) && !t.left.right.is_constant() && (t.left.left.is_boolean(a) || t.left.left.is_number(a))) {
                        t = ve(ki, t, {
                            operator: t.left.operator,
                            left: ve(ki, t, {
                                operator: t.operator,
                                left: t.right,
                                right: t.left.left
                            }),
                            right: t.left.right
                        });
                        break;
                    }

                  case "-":
                    if (t.right instanceof wi && "-" == t.right.operator && t.left.is_number(a) && t.right.expression.is_number(a)) {
                        t = ve(ki, t, {
                            operator: "+",
                            left: t.left,
                            right: t.right.expression
                        });
                        break;
                    }

                  case "*":
                  case "/":
                    _ = a.option("unsafe_math"), "+" != t.operator && [ "left", "right" ].forEach(function(e) {
                        var n = t[e];
                        n instanceof wi && "+" == n.operator && (((n = n.expression).is_boolean(a) || n.is_number(a) || n.is_string(a)) && (t[e] = n));
                    });

                  case "&":
                  case "|":
                  case "^":
                    if ("-" == t.operator || "/" == t.operator || !t.left.is_boolean(a) && !t.left.is_number(a) || !t.right.is_boolean(a) && !t.right.is_number(a) || !n() || t.left instanceof ki && t.left.operator != t.operator && xr[t.left.operator] >= xr[t.operator] || (m = ve(ki, t, {
                        operator: t.operator,
                        left: t.right,
                        right: t.left
                    }), t = t.right instanceof ir && !(t.left instanceof ir) ? te(a, m, t) : te(a, t, m)),
                    !_ || !t.is_number(a)) break;
                    !(t.right instanceof ki && "%" != t.right.operator && xr[t.right.operator] == xr[t.operator] && t.right.is_number(a) && ("+" != t.operator || t.right.left.is_boolean(a) || t.right.left.is_number(a))) || "-" == t.operator && t.left.is_negative_zero() || !t.right.left.is_constant_expression() && t.right.right.has_side_effects(a) || (c = t.right.right,
                    u = !1, c.walk(new mr(function(e) {
                        if (u) return !0;
                        if (e instanceof Si) {
                            if (e.left instanceof mi) return u = !0;
                        } else if (e instanceof yi && Er[e.operator] && e.expression instanceof mi) return u = !0;
                    })), u) || "+" != (t = ve(ki, t, {
                        operator: k(t.operator, t.right.operator),
                        left: ve(ki, t.left, {
                            operator: t.operator,
                            left: t.left,
                            right: t.right.left,
                            start: t.left.start,
                            end: t.right.left.end
                        }),
                        right: t.right.right
                    })).operator || t.right.is_boolean(a) || t.right.is_number(a) || (t.right = ve(wi, t.right, {
                        operator: "+",
                        expression: t.right
                    })), t.right instanceof ir && t.left instanceof ki && "%" != t.left.operator && xr[t.left.operator] == xr[t.operator] && t.left.is_number(a) && (t.left.left instanceof ir ? (d = E(t.left, t.operator, t.left.left, t.right, t.left.left.start, t.right.end),
                    t = E(t, t.left.operator, ae(a, d), t.left.right)) : t.left.right instanceof ir && (m = k(t.left.operator, t.operator),
                    !(m = ae(a, E(t.left, m, t.left.right, t.right))).is_constant() || "-" == t.left.operator && 0 != t.right.value && 0 == +m.value && t.left.left.is_negative_zero() || (t = E(t, t.left.operator, t.left.left, m))));
                }
                if (!(p instanceof wi && "delete" == p.operator)) {
                    if (t.left instanceof or && !t.right.is_constant()) switch (t.operator) {
                      case "+":
                        if (0 == t.left.value) {
                            if (t.right.is_boolean(a)) return ve(wi, t, {
                                operator: "+",
                                expression: t.right
                            }).optimize(a);
                            if (t.right.is_number(a) && !t.right.is_negative_zero()) return t.right;
                        }
                        break;

                      case "*":
                        if (1 == t.left.value) return t.right.is_number(a) ? t.right : ve(wi, t, {
                            operator: "+",
                            expression: t.right
                        }).optimize(a);
                    }
                    if (t.right instanceof or && !t.left.is_constant()) switch (t.operator) {
                      case "+":
                        if (0 == t.right.value) {
                            if (t.left.is_boolean(a)) return ve(wi, t, {
                                operator: "+",
                                expression: t.left
                            }).optimize(a);
                            if (t.left.is_number(a) && !t.left.is_negative_zero()) return t.left;
                        }
                        break;

                      case "-":
                        if (0 == t.right.value) return t.left.is_number(a) ? t.left : ve(wi, t, {
                            operator: "+",
                            expression: t.left
                        }).optimize(a);
                        break;

                      case "/":
                        if (1 == t.right.value) return t.left.is_number(a) ? t.left : ve(wi, t, {
                            operator: "+",
                            expression: t.left
                        }).optimize(a);
                    }
                }
            }
            if (a.option("typeofs")) switch (t.operator) {
              case "&&":
                nn(t.left, t.right, null);
                break;

              case "||":
                nn(t.left, null, t.right);
            }
            if (a.option("unsafe")) {
                var y = S(t.right);
                if (l && y && ("==" == t.operator || "!=" == t.operator) && t.left instanceof or && 0 == t.left.value) return ("==" == t.operator ? ve(wi, t, {
                    operator: "!",
                    expression: t.right
                }) : t.right).optimize(a);
                var w = S(t.left);
                if (a.option("comparisons") && function() {
                    switch (t.operator) {
                      case "<=":
                        return y && t.left instanceof or && 0 == t.left.value;

                      case "<":
                        if (w && t.right instanceof or && 0 == t.right.value) return !0;

                      case "==":
                      case "!=":
                        return y ? t.left instanceof or && -1 == t.left.value || t.left instanceof wi && "-" == t.left.operator && t.left.expression instanceof or && 1 == t.left.expression.value : !1;
                    }
                }()) {
                    var x = ve(wi, t, {
                        operator: "!",
                        expression: ve(wi, t, {
                            operator: "~",
                            expression: w ? t.left : t.right
                        })
                    });
                    switch (t.operator) {
                      case "<":
                        if (w) break;

                      case "<=":
                      case "!=":
                        x = ve(wi, t, {
                            operator: "!",
                            expression: x
                        });
                    }
                    return x.optimize(a);
                }
            }
            return ae(a, t);
            function k(e, n) {
                switch (e) {
                  case "-":
                    return "+" == n ? "-" : "+";

                  case "/":
                    return "*" == n ? "/" : "*";

                  default:
                    return n;
                }
            }
            function E(e, n, t, i, r, o) {
                return "+" == n && (t.is_boolean(a) || t.is_number(a) || (t = ve(wi, t, {
                    operator: "+",
                    expression: t
                })), i.is_boolean(a) || i.is_number(a) || (i = ve(wi, i, {
                    operator: "+",
                    expression: i
                }))), ve(ki, e, {
                    operator: n,
                    left: t,
                    right: i,
                    start: r,
                    end: o
                });
            }
            function S(e) {
                return "Call" == e.TYPE && e.expression instanceof _i && _n[e.expression.property];
            }
        }), e(Ki, function(e) {
            return e;
        }), e(Xi, function(e, n) {
            if (!n.option("ie") && ge(e) && (!e.scope.resolve().uses_with || !n.find_parent(ht))) switch (e.name) {
              case "undefined":
                return ve(ur, e).optimize(n);

              case "NaN":
                return ve(cr, e).optimize(n);

              case "Infinity":
                return ve(pr, e).optimize(n);
            }
            var t = n.parent();
            if (n.option("reduce_vars") && Sr(n.self(), t) !== n.self()) {
                var i, r, o, a, s = e.definition(), f = e.fixed_value(), t = s.single_use && !(t instanceof pi && t.is_expr_pure(n));
                if (t) if (D(f)) {
                    if (s.scope === e.scope.resolve() && !s.in_loop || n.option("reduce_funcs") && 1 != s.escaped.depth && !f.inlined) if (xn(n, s, f)) t = !1; else if (f.name && f.name.definition() !== s) t = !1; else if (f.parent_scope !== e.scope || le(s)) {
                        if ("f" == (t = f.is_constant_expression(e.scope))) for (var c = e.scope; (c instanceof $t || c instanceof bt) && (c.inlined = !0),
                        c = c.parent_scope; );
                    } else (f.name && ("await" == f.name.name && wt(f) || "yield" == f.name.name && xt(f)) || f.has_side_effects(n) || n.option("ie") && f instanceof Ft) && (t = !1); else t = !1;
                    t && (f.parent_scope = e.scope);
                } else (!f || 0 < s.recursive_refs || !f.is_constant_expression() || f.drop_side_effect_free(n)) && (t = !1);
                if (t) return s.single_use = !1, f._squeezed = !0, f.single_use = !0, D(f = (f = f instanceof jt ? Re(f) : f) instanceof $t ? Be(f) : f) && (c = e.scope.resolve(),
                f.enclosed.forEach(function(e) {
                    f.variables.has(e.name) || c.var_names()[e.name] || (c.enclosed.push(e), c.var_names()[e.name] = !0);
                })), 0 < s.recursive_refs ? (i = (d = f.clone(!0)).name.definition(), r = d.variables.get(d.name.name),
                o = r && r.orig[0], l = d instanceof Ft ? (a = "def_function", Gi) : (a = "def_variable",
                Wi), o instanceof l || (((o = ve(l, d.name, d.name)).scope = d).name = o, (r = d[a](o)).recursive_refs = s.recursive_refs),
                d.walk(new mr(function(e) {
                    var n, t;
                    e instanceof Hi ? e !== o && ((n = e.definition()).orig.push(e), n.eliminated++) : e instanceof Xi && ((n = e.definition()) === i ? e.thedef = n = r : (n.single_use = !1,
                    D(t = e.fixed_value()) && t.name && t.name.definition() === n && n.scope === t.name.scope && f.variables.get(t.name.name) === n && (t.name = t.name.clone(),
                    e.thedef = n = d.variables.get(t.name.name) || d[a](t.name))), n.references.push(e));
                }))) : (f instanceof vt ? (n.push(f), d = f.optimize(n), n.pop()) : d = f.optimize(n),
                d = d.transform(new _r(function(e, n) {
                    return e instanceof vt || n(e = e.clone(), this), e;
                }))), s.replaced++, d;
                var u, l, p, d, t = e.fixed !== s.fixed;
                if (f && (t || !1 !== s.should_replace)) if (f instanceof er ? !le(s) && kn(s) && (u = f) : (p = f.evaluate(n, !0)) !== f && "function" != typeof p && (null === p || "object" != typeof p || n.option("unsafe_regexp") && p instanceof RegExp && !s.cross_loop && kn(s)) && (u = X(p, f)),
                u) if (t || void 0 !== s.should_replace || (l = u.optimize(n).print_to_string().length,
                h(f) || (l = Math.min(l, f.print_to_string().length)), p = s.name.length, n.option("unused") && !n.exposed(s) && (p += (p + 2 + l) / (s.references.length - s.replaced - s.assignments)),
                p = l - Math.floor(p), s.should_replace = p < n.eval_threshold), t || s.should_replace) return h(f) ? (d = u.optimize(n)) === u && (d = d.clone(!0)) : (d = ne(u.optimize(n), f)) !== u && d !== f || (d = d.clone(!0)),
                s.replaced++, d;
            }
            return e;
            function h(e) {
                var n;
                return e.walk(new mr(function(e) {
                    if (n = e instanceof Xi ? !0 : n) return !0;
                })), n;
            }
        }), e(tr, function(e, t) {
            if (!t.option("templates")) return e;
            var i = e.tag;
            if (!i || En(t, i)) {
                for (var n, r = [], o = [], a = 0; a < e.strings.length; a++) {
                    var s, f = e.strings[a];
                    if (i || (s = Sn(f)) && (f = d(s)), 0 < a) {
                        var c = e.expressions[a - 1], u = function(e) {
                            var n = e.evaluate(t);
                            if (n !== e && !(i && /\r|\\|`/.test(n) || (n = d("" + n)).length > e.print_to_string().length + "${}".length)) return n;
                        }(c);
                        if (u) {
                            var l, u = o[o.length - 1] + u + f;
                            if (i || typeof (l = Sn(u)) == n) {
                                o[o.length - 1] = l ? d(l) : u;
                                continue;
                            }
                        }
                        r.push(c);
                    }
                    o.push(f), i || (n = typeof s);
                }
                if (!i && 1 < o.length) {
                    if ("" == o[o.length - 1]) return ve(ki, e, {
                        operator: "+",
                        left: ve(tr, e, {
                            expressions: r.slice(0, -1),
                            strings: o.slice(0, -1),
                            tag: i
                        }).transform(t),
                        right: r[r.length - 1]
                    }).optimize(t);
                    if ("" == o[0]) {
                        for (var p = ve(ki, e, {
                            operator: "+",
                            left: ve(rr, e, {
                                value: ""
                            }),
                            right: r[0]
                        }), a = 1; "" == o[a] && a < r.length; a++) p = ve(ki, e, {
                            operator: "+",
                            left: p,
                            right: r[a]
                        });
                        return te(t, e, ve(ki, e, {
                            operator: "+",
                            left: p.transform(t),
                            right: ve(tr, e, {
                                expressions: r.slice(a),
                                strings: o.slice(a),
                                tag: i
                            }).transform(t)
                        }).optimize(t));
                    }
                }
                e.expressions = r, e.strings = o;
            }
            return ae(t, e);
            function d(e) {
                return e.replace(/\r|\\|`|\${/g, function(e) {
                    return "\\" + ("\r" == e ? "r" : e);
                });
            }
        }), e(ur, function(e, n) {
            if (n.option("unsafe_undefined")) {
                var t = W(n).find_variable("undefined");
                if (t) {
                    t = ve(Xi, e, {
                        name: "undefined",
                        scope: t.scope,
                        thedef: t
                    });
                    return t.is_undefined = !0, t;
                }
            }
            n = Sr(n.self(), n.parent());
            return n && Tn(n, e) ? e : ve(wi, e, {
                operator: "void",
                expression: ve(or, e, {
                    value: 0
                })
            });
        }), e(pr, function(e, n) {
            var t = Sr(n.self(), n.parent());
            return (!t || !Tn(t, e)) && (!n.option("keep_infinity") || t || W(n).find_variable("Infinity")) ? ve(ki, e, {
                operator: "/",
                left: ve(or, e, {
                    value: 1
                }),
                right: ve(or, e, {
                    value: 0
                })
            }) : e;
        }), e(cr, function(e, n) {
            var t = Sr(n.self(), n.parent());
            return (!t || !Tn(t, e)) && (t || W(n).find_variable("NaN")) ? ve(ki, e, {
                operator: "/",
                left: ve(or, e, {
                    value: 0
                }),
                right: ve(or, e, {
                    value: 0
                })
            }) : e;
        });
        var Dn = Bn("+ - * / % >> << >>> | ^ &"), On = Bn("* | ^ &");
        function $n(e, n) {
            if (e) {
                var t = n.parent();
                return "Call" != t.TYPE ? 1 : t.expression !== n.self() || (!(e instanceof Xi) || (e = e.fixed_value())) && (e instanceof _t && !e.contains_this());
            }
        }
        function zn(e) {
            return e instanceof Fi && "string" == typeof e.key && !(e instanceof ji && e.value.contains_super());
        }
        e(Si, function(o, a) {
            if (a.option("dead_code")) if (o.left instanceof mi) {
                if ("=" == o.operator) {
                    if (o.__drop) {
                        var e = [ o.left.expression ];
                        return o.left instanceof gi && e.push(o.left.property), e.push(o.right), J(o, e).optimize(a);
                    }
                    if (o.left.equivalent_to(o.right) && !o.left.has_side_effects(a)) return o.right;
                    e = o.left.expression;
                    if (e instanceof _t || !a.has_directive("use strict") && e instanceof ir && !e.may_throw_on_access(a)) return o.left instanceof _i ? o.right : J(o, [ o.left.property, o.right ]).optimize(a);
                }
            } else if (o.left instanceof Xi && pe(o.left, a)) {
                if ("=" == o.operator && o.left.equivalent_to(o.right) && !((c = a.parent()) instanceof wi && "delete" == c.operator)) return o.right;
                if (o.left.is_immutable()) return h();
                var n, t, i = o.left.definition(), s = i.scope.resolve(), r = s === a.find_parent(_t), f = 0, c = a.self();
                if (!s.uses_arguments || !le(i) || a.has_directive("use strict")) do {
                    if (n = c, (c = a.parent(f++)) instanceof Si) {
                        if (c.left instanceof Xi && c.left.definition() === i) {
                            if (d(f, c)) break;
                            return h(i);
                        }
                        if (c.left.match_symbol(function(e) {
                            if (e instanceof mi) return !0;
                        })) break;
                    } else {
                        if (c instanceof Rt) {
                            if (!r) break;
                            if (d(f, c)) break;
                            if (An(s, [ i ])) break;
                            return h(i);
                        }
                        if (c instanceof et) {
                            if (!r) break;
                            if (An(s, [ i ])) break;
                            do {
                                if (t = c, (c = a.parent(f++)) === s && I(c.body, t)) return h(i);
                            } while (u = t, (l = c) instanceof rt || l instanceof ei || l instanceof ni ? I(l.body, u) : l instanceof Gt ? l.body === u || l.alternative === u : l instanceof Zt ? l.bfinally ? l.bfinally === u : l.bcatch === u : void 0);
                            break;
                        }
                        if (c instanceof ai && c.name instanceof Hi && c.name.definition() === i) {
                            if (d(f, c)) break;
                            return h(i);
                        }
                    }
                } while (function(e, n) {
                    if (n instanceof ki) return n.right === e || n.right.is_constant_expression(s);
                    if (n instanceof Ei) return n.condition !== e || n.consequent.is_constant_expression(s) && n.alternative.is_constant_expression(s);
                    if (n instanceof hi) {
                        var t = n.expressions, i = t.indexOf(e);
                        if (i < 0) return !1;
                        for (var r = t.length; --r > i; ) if (!t[r].is_constant_expression(s)) return !1;
                        return !0;
                    }
                    if (n instanceof wi) return !0;
                }(n, c));
            }
            var u, l;
            if (a.option("sequences")) {
                var p = o.lift_sequences(a);
                if (p !== o) return p.optimize(a);
            }
            if (a.option("assignments")) {
                if ("=" == o.operator && o.left instanceof Xi && o.right instanceof ki) {
                    if (o.right.left instanceof Xi && o.right.left.name == o.left.name && Dn[o.right.operator]) return ve(Si, o, {
                        operator: o.right.operator + "=",
                        left: o.left,
                        right: o.right.right
                    });
                    if (o.right.right instanceof Xi && o.right.right.name == o.left.name && On[o.right.operator] && !o.right.left.has_side_effects(a)) return ve(Si, o, {
                        operator: o.right.operator + "=",
                        left: o.left,
                        right: o.right.left
                    });
                }
                if (("-=" == o.operator || "+=" == o.operator && (o.left.is_boolean(a) || o.left.is_number(a))) && o.right instanceof or && 1 == o.right.value) {
                    p = o.operator.slice(0, -1);
                    return ve(wi, o, {
                        operator: p + p,
                        expression: o.left
                    });
                }
            }
            return ae(a, o);
            function d(e, n) {
                var t = o.right;
                o.right = ve(fr, t);
                var i, r = n.may_throw(a);
                for (o.right = t; i = a.parent(e++); n = i) {
                    if (i === s) return;
                    if (i instanceof Zt) {
                        if (i.bfinally && i.bfinally !== n) return 1;
                        if (r && i.bcatch && i.bcatch !== n) return 1;
                    }
                }
            }
            function h(e) {
                return e && (e.fixed = !1), ("=" != o.operator ? ve(ki, o, {
                    operator: o.operator.slice(0, -1),
                    left: o.left,
                    right: o.right
                }) : me(0, a.parent(), o, o.right)).optimize(a);
            }
        }), e(Ei, function(r, n) {
            if (n.option("sequences") && r.condition instanceof hi) {
                var e = r.condition.expressions.slice();
                return r.condition = e.pop(), e.push(r), J(r, e);
            }
            if (!n.option("conditionals")) return r;
            var o = r.condition;
            if (n.option("booleans") && !o.has_side_effects(n) && rn(n, o), !(o = tn(n, o))) return Gn.warn("Condition always false [{file}:{line},{col}]", r.start),
            J(r, [ r.condition, r.alternative ]).optimize(n);
            if (!(o instanceof Gn)) return Gn.warn("Condition always true [{file}:{line},{col}]", r.start),
            J(r, [ r.condition, r.consequent ]).optimize(n);
            var t = o.negate(n, Wn(n));
            te(n, o, t) === t && (r = ve(Ei, r, {
                condition: t,
                consequent: r.alternative,
                alternative: r.consequent
            }), t = o, o = r.condition);
            var i = r.consequent, a = r.alternative;
            if (wn(n, o)) {
                if (o.equivalent_to(i)) return ve(ki, r, {
                    operator: "||",
                    left: o,
                    right: a
                }).optimize(n);
                if (o.equivalent_to(a)) return ve(ki, r, {
                    operator: "&&",
                    left: o,
                    right: i
                }).optimize(n);
            }
            var s = i.tail_node();
            if (s instanceof Si) {
                var f = "=" == s.operator, e = f ? a.tail_node() : a;
                if ((f || i === s) && e instanceof Si && s.operator == e.operator && s.left.equivalent_to(e.left) && (f && s.left instanceof Xi || !o.has_side_effects(n) && m(i) && m(a))) return ve(Si, r, {
                    operator: s.operator,
                    left: s.left,
                    right: ve(Ei, r, {
                        condition: o,
                        consequent: _(i),
                        alternative: _(a)
                    })
                });
            }
            if (i.equivalent_to(a)) return J(r, [ o, i ]).optimize(n);
            var c, f = function e(n, t, i) {
                if (!v(n, t)) return !i && ve(Ei, r, {
                    condition: o,
                    consequent: n,
                    alternative: t
                });
                i = n.clone();
                i.expression = e(n.expression, t.expression);
                return i;
            }(i, a, !0);
            if (f) return f;
            if (i instanceof pi && a.TYPE == i.TYPE && 0 <= (c = h(i, a)) && i.expression.equivalent_to(a.expression) && !o.has_side_effects(n) && !i.expression.has_side_effects(n)) {
                s = i.clone(), f = i.args[c];
                return s.args[c] = f instanceof bi ? ve(bi, r, {
                    expression: ve(Ei, r, {
                        condition: o,
                        consequent: f.expression,
                        alternative: a.args[c].expression
                    })
                }) : ve(Ei, r, {
                    condition: o,
                    consequent: f,
                    alternative: a.args[c]
                }), s;
            }
            if (i instanceof Ei && i.alternative.equivalent_to(a)) return ve(Ei, r, {
                condition: ve(ki, r, {
                    left: o,
                    operator: "&&",
                    right: i.condition
                }),
                consequent: i.consequent,
                alternative: a
            });
            if (i instanceof Ei && i.consequent.equivalent_to(a)) return ve(Ei, r, {
                condition: ve(ki, r, {
                    left: t,
                    operator: "||",
                    right: i.condition
                }),
                consequent: a,
                alternative: i.alternative
            });
            if (a instanceof Ei && i.equivalent_to(a.consequent)) return ve(Ei, r, {
                condition: ve(ki, r, {
                    left: o,
                    operator: "||",
                    right: a.condition
                }),
                consequent: i,
                alternative: a.alternative
            });
            if (a instanceof Ei && i.equivalent_to(a.alternative)) return ve(Ei, r, {
                condition: ve(ki, r, {
                    left: t,
                    operator: "&&",
                    right: a.condition
                }),
                consequent: a.consequent,
                alternative: i
            });
            if ((i instanceof hi || a instanceof hi) && i.tail_node().equivalent_to(a.tail_node())) return J(r, [ ve(Ei, r, {
                condition: o,
                consequent: g(i),
                alternative: g(a)
            }), i.tail_node() ]).optimize(n);
            if (i instanceof ki && "&&" == i.operator && i.right.equivalent_to(a)) return ve(ki, r, {
                operator: "&&",
                left: ve(ki, r, {
                    operator: "||",
                    left: t,
                    right: i.left
                }),
                right: a
            }).optimize(n);
            if (i instanceof ki && "||" == i.operator && i.right.equivalent_to(a)) return ve(ki, r, {
                operator: "||",
                left: ve(ki, r, {
                    operator: "&&",
                    left: o,
                    right: i.left
                }),
                right: a
            }).optimize(n);
            if (a instanceof ki && "&&" == a.operator && a.right.equivalent_to(i)) return ve(ki, r, {
                operator: "&&",
                left: ve(ki, r, {
                    operator: "||",
                    left: o,
                    right: a.left
                }),
                right: i
            }).optimize(n);
            if (a instanceof ki && "||" == a.operator && a.right.equivalent_to(i)) return ve(ki, r, {
                operator: "||",
                left: ve(ki, r, {
                    operator: "&&",
                    left: t,
                    right: a.left
                }),
                right: i
            }).optimize(n);
            var u = n.option("booleans") && n.in_boolean_context();
            return p(i) ? d(a) ? l(o) : ve(ki, r, {
                operator: "||",
                left: l(o),
                right: a
            }) : d(i) ? p(a) ? l(o.negate(n)) : ve(ki, r, {
                operator: "&&",
                left: l(o.negate(n)),
                right: a
            }) : p(a) ? ve(ki, r, {
                operator: "||",
                left: l(o.negate(n)),
                right: i
            }) : d(a) ? ve(ki, r, {
                operator: "&&",
                left: l(o),
                right: i
            }) : (n.option("typeofs") && nn(o, i, a), r);
            function l(e) {
                return e.is_boolean(n) ? e : ve(wi, e, {
                    operator: "!",
                    expression: e.negate(n)
                });
            }
            function p(e) {
                return e instanceof vr || u && e instanceof ir && e.value || e instanceof wi && "!" == e.operator && e.expression instanceof ir && !e.expression.value;
            }
            function d(e) {
                return e instanceof hr || u && (e instanceof ir && !e.value || e instanceof wi && "void" == e.operator && !e.expression.has_side_effects(n)) || e instanceof wi && "!" == e.operator && e.expression instanceof ir && e.expression.value;
            }
            function h(e, n) {
                var t = e.args, i = n.args, r = t.length;
                if (r != i.length) return -2;
                for (var o = 0; o < r; o++) if (!t[o].equivalent_to(i[o])) {
                    if (t[o] instanceof bi != i[o] instanceof bi) return -3;
                    for (var a = o + 1; a < r; a++) if (!t[a].equivalent_to(i[a])) return -2;
                    return o;
                }
                return -1;
            }
            function v(e, n) {
                if (e.TYPE == n.TYPE && e.optional == n.optional) {
                    if (e instanceof pi) return -1 != h(e, n) ? void 0 : "Call" != e.TYPE || !(e.expression instanceof mi || n.expression instanceof mi) || v(e.expression, n.expression);
                    if (e instanceof mi) {
                        var t = e.property, i = n.property;
                        return (t instanceof Gn ? t.equivalent_to(i) : t == i) && !(e.expression instanceof Zi || n.expression instanceof Zi);
                    }
                }
            }
            function m(e) {
                return e === e.tail_node() || Ln(e.expressions.slice(0, -1), function(e) {
                    return !e.has_side_effects(n);
                });
            }
            function _(e) {
                if (!(e instanceof hi)) return e.right;
                var n = e.expressions.slice();
                return n.push(n.pop().right), J(e, n);
            }
            function g(e) {
                return e instanceof hi ? J(e, e.expressions.slice(0, -1)) : ve(or, e, {
                    value: 0
                });
            }
        }), e(dr, function(e, n) {
            if (!n.option("booleans")) return e;
            if (n.in_boolean_context()) return ve(or, e, {
                value: +e.value
            });
            n = n.parent();
            return n instanceof ki && ("==" == n.operator || "!=" == n.operator) ? (Gn.warn("Non-strict equality against boolean: {operator} {value} [{file}:{line},{col}]", {
                operator: n.operator,
                value: e.value,
                file: n.start.file,
                line: n.start.line,
                col: n.start.col
            }), ve(or, e, {
                value: +e.value
            })) : ve(wi, e, {
                operator: "!",
                expression: ve(or, e, {
                    value: 1 - e.value
                })
            });
        }), e(bi, function(e, n) {
            var t = e.expression;
            return n.option("spreads") && t instanceof Di && !(n.parent() instanceof Ci) ? In.splice(t.elements.map(function(e) {
                return e instanceof lr ? ve(ur, e).optimize(n) : e;
            })) : e;
        }), e(gi, function(e, t) {
            var n = e.expression, i = e.property, r = ln(e, t);
            if (r) return r;
            if (t.option("properties")) {
                var o = i.evaluate(t);
                if (o !== i) {
                    "string" == typeof o && ("undefined" == o ? o = void 0 : (m = parseFloat(o)).toString() == o && (o = m));
                    var i = e.property = ne(i, X(o, i).transform(t)), a = "" + o;
                    if (gr(a) && a.length <= i.print_to_string().length + 1) return ve(_i, e, {
                        optional: e.optional,
                        expression: n,
                        property: a
                    }).optimize(t);
                }
            }
            var s, f, c, u, l = t.parent(), r = Sr(t.self(), l);
            if (t.option("arguments") && n instanceof Xi && ue(s = n.definition()) && !n.in_arg && i instanceof or && Math.floor(h = i.value) == h && (f = s.scope) === function() {
                var e, n = 0;
                for (;e = t.parent(n++); ) if (e instanceof _t) {
                    if (e instanceof gt) return;
                    if (!yt(e)) return c = t.parent(n), e;
                }
            }() && f.uses_arguments < (r ? 2 : 3)) {
                l instanceof wi && "delete" == l.operator && (s.deleted || (s.deleted = []), s.deleted[h] = !0);
                var p = f.argnames[h];
                if (s.deleted && s.deleted[h]) p = null; else if (p) (!(p instanceof Ui && "await" != p.name && n.scope.find_variable(p.name) === (d = p.definition())) || (t.has_directive("use strict") || f.name || f.rest || !(c instanceof pi && h < c.args.length && Ln(c.args.slice(0, h + 1), function(e) {
                    return !(e instanceof bi);
                })) || !Ln(f.argnames, function(e) {
                    return e instanceof Ui;
                })) && (w() || d.assignments || 1 < d.orig.length)) && (p = null); else if ((r || !w()) && h < f.argnames.length + 5 && t.drop_fargs(f, c) && !f.rest) for (;h >= f.argnames.length; ) p = f.make_var(Ui, f, "argument_" + f.argnames.length),
                f.argnames.push(p);
                if (p && Cn(function(e) {
                    return e.name === p.name;
                }, f.argnames) === p) {
                    r && s.reassigned--;
                    var d = ve(Xi, e, p);
                    return d.reference(), delete p.__unused, d;
                }
            }
            if (r) return e;
            if (t.option("sequences") && "Call" != l.TYPE && !(l instanceof lt && l.init === e)) {
                l = pn(e);
                if (l !== e) return l.optimize(t);
            }
            if (o === i || (v = e.flatten_object(a, t)) && (n = e.expression = v.expression,
            i = e.property = v.property), t.option("properties") && t.option("side_effects") && i instanceof or && n instanceof Di && Ln(u = n.elements, function(e) {
                return !(e instanceof bi);
            })) {
                var h, v = u[h = i.value];
                if ($n(v, t)) {
                    for (var m, _ = v instanceof lr, g = !_, b = [], y = u.length; --y > h; ) (m = u[y].drop_side_effect_free(t)) && (b.unshift(m),
                    g && m.has_side_effects(t) && (g = !1));
                    for (g || b.unshift(v); 0 <= --y; ) (m = u[y].drop_side_effect_free(t)) ? b.unshift(m) : _ ? b.unshift(ve(lr, u[y])) : h--;
                    return g ? (b.push(v), J(e, b).optimize(t)) : ve(gi, e, {
                        expression: ve(Di, n, {
                            elements: b
                        }),
                        property: ve(or, i, {
                            value: h
                        })
                    });
                }
            }
            return ae(t, e);
            function w() {
                return !t.option("reduce_vars") || s.reassigned;
            }
        }), Et.DEFMETHOD("contains_super", Fn), St.DEFMETHOD("contains_super", Fn), _t.DEFMETHOD("contains_super", function() {
            var n, t = this;
            return t.walk(new mr(function(e) {
                return !!n || (e instanceof Zi ? n = !0 : e !== t && e instanceof vt && !yt(e) || void 0);
            })), n;
        }), $t.DEFMETHOD("contains_super", Fn), vt.DEFMETHOD("contains_super", Fn), Et.DEFMETHOD("contains_this", Fn),
        St.DEFMETHOD("contains_this", Fn), Gn.DEFMETHOD("contains_this", function() {
            var n, t = this;
            return t.walk(new mr(function(e) {
                return !!n || (e instanceof er ? n = !0 : e !== t && e instanceof vt && !yt(e) || void 0);
            })), n;
        }), mi.DEFMETHOD("flatten_object", function(e, n) {
            if (n.option("properties") && "__proto__" !== e) {
                var t = this.expression;
                if (t instanceof Ci) for (var i = t.properties, r = i.length; 0 <= --r; ) {
                    var o = i[r];
                    if (o.key === e) {
                        if (!Ln(i, zn)) break;
                        if (!$n(o.value, n)) break;
                        if (i = i.map(function(e) {
                            return e.value;
                        }), o instanceof ji && o.value instanceof Dt && !(n.parent() instanceof pi)) {
                            if (o.value.uses_arguments) break;
                            i[r] = ve(Et, o.value, o.value);
                        }
                        return ve(gi, this, {
                            expression: ve(Di, t, {
                                elements: i
                            }),
                            property: ve(or, this, {
                                value: r
                            })
                        });
                    }
                }
            }
        }), e(_i, function(e, n) {
            "arguments" != e.property && "caller" != e.property || Gn.warn("Function.prototype.{prop} not supported [{file}:{line},{col}]", {
                prop: e.property,
                file: e.start.file,
                line: e.start.line,
                col: e.start.col
            });
            var t = n.parent();
            if (Sr(n.self(), t)) return e;
            var i = ln(e, n);
            if (i) return i;
            if (n.option("sequences") && "Call" != t.TYPE && !(t instanceof lt && t.init === e)) {
                var r = pn(e);
                if (r !== e) return r.optimize(n);
            }
            if (n.option("unsafe_proto") && e.expression instanceof _i && "prototype" == e.expression.property) {
                var o = e.expression.expression;
                if (ge(o)) switch (o.name) {
                  case "Array":
                    e.expression = ve(Di, e.expression, {
                        elements: []
                    });
                    break;

                  case "Function":
                    e.expression = ve(Dt, e.expression, {
                        argnames: [],
                        body: []
                    }).init_vars(o.scope);
                    break;

                  case "Number":
                    e.expression = ve(or, e.expression, {
                        value: 0
                    });
                    break;

                  case "Object":
                    e.expression = ve(Ci, e.expression, {
                        properties: []
                    });
                    break;

                  case "RegExp":
                    e.expression = ve(sr, e.expression, {
                        value: /t/
                    });
                    break;

                  case "String":
                    e.expression = ve(rr, e.expression, {
                        value: ""
                    });
                }
            }
            r = e.flatten_object(e.property, n);
            return r ? r.optimize(n) : ae(n, e);
        }), e($i, function(e, n) {
            return n.option("rests") && e.rest instanceof $i ? ve($i, e, {
                elements: e.elements.concat(e.rest.elements),
                rest: e.rest.rest
            }) : e;
        }), e(zi, function(e, n) {
            var t;
            return !n.option("objects") || (t = e.key) instanceof Gn && (t = t.evaluate(n)) !== e.key && (e.key = "" + t),
            e;
        }), e(Ci, function(t, i) {
            if (!i.option("objects")) return t;
            var e, r = !1, o = !1, a = !1, s = i.has_directive("use strict"), f = new Un(), c = [];
            return t.properties.forEach(function(e) {
                if (!(e instanceof bi)) return l(e);
                o = !0;
                var n = e.expression;
                i.option("spreads") && n instanceof Ci && Ln(n.properties, function(e) {
                    return !(e instanceof Ni) && (!(e instanceof bi) && ("__proto__" !== e.key || (e instanceof Pi || !e.value.has_side_effects(i))));
                }) ? (r = !0, n.properties.forEach(function(e) {
                    var n = e.key, t = e instanceof Pi;
                    if ("__proto__" === n) {
                        if (!t) return;
                        n = X(n, e);
                    }
                    l(t ? ve(Fi, e, {
                        key: n,
                        value: ve(ur, e).optimize(i)
                    }) : e);
                })) : (a = !0, u(), c.push(e));
            }), u(), r ? (o && a && 1 == c.length && ((e = c[0]) instanceof Mi && e.key instanceof or && (e.key = "" + e.key.value)),
            ve(Ci, t, {
                properties: c
            })) : t;
            function u() {
                f.each(function(e) {
                    if (1 == e.length) return c.push(e[0]);
                    r = !0;
                    var n = s && !a && e.pop();
                    c.push(1 == e.length ? e[0] : ve(Fi, t, {
                        key: e[0].key,
                        value: J(t, e.map(function(e) {
                            return e.value;
                        }))
                    })), n && c.push(n);
                }), f = new Un();
            }
            function l(e) {
                var n = e.key;
                n instanceof Gn && (o = !0, (n = n.evaluate(i)) === e.key || "__proto__" === n ? a = !0 : n = e.key = "" + n),
                zn(e) ? (e.value.has_side_effects(i) && u(), f.add(n, e)) : (u(), c.push(e)), o && !a && "string" == typeof n && p.test(n) && (a = !0,
                (e = f.has(n) ? f.get(n)[0] : e).key = ve(or, e, {
                    value: +n
                }));
            }
        }), e(Bt, function(e, n) {
            return n.option("side_effects") && e.value && ye(e.value, n) && !z(n.find_parent(vt)) && (e.value = null),
            e;
        });
    }(function(e, n) {
        e.DEFMETHOD("optimize", function(e) {
            if (this._optimized) return this;
            if (e.has_directive("use asm")) return this;
            e = n(this, e);
            return e._optimized = !0, e;
        });
    }), function() {
        function e(e, n) {
            e.DEFMETHOD("_codegen", n);
        }
        var a = !1;
        Gn.DEFMETHOD("print", function(e, n) {
            var t = this;
            function i() {
                e.prepend_comments(t), t.add_source_map(e), t._codegen(e), e.append_comments(t);
            }
            e.push_node(t), n || t.needs_parens(e) ? e.with_parens(i) : i(), e.pop_node();
        });
        var n = Ar({
            inline_script: !1,
            shebang: !1,
            width: !1
        });
        function t(e, n) {
            e.DEFMETHOD("needs_parens", n);
        }
        function i(e) {
            var n = e.parent();
            return !e.has_parens() && Wn(e, !1, !0) ? this.name || !(n instanceof fi) : !!(e.option("webkit") && n instanceof mi && n.expression === this) || (!!(e.option("wrap_iife") && n instanceof pi && n.expression === this) || void 0);
        }
        function r(e) {
            return !e.has_parens() && Wn(e, !0);
        }
        function o(e) {
            e = e.parent();
            return e instanceof ki ? "**" == e.operator && e.left === this : e instanceof pi ? e.expression === this : e instanceof Ft || (e instanceof mi ? e.expression === this : e instanceof tr ? e.tag === this : void 0);
        }
        function s(e, n) {
            return !!e.terminal && ((n instanceof pi || n instanceof mi) && n.expression === e);
        }
        function f(e, n) {
            n = n.parent();
            return n instanceof Ti || (n instanceof ki ? !(n instanceof Si) : n instanceof pi ? n.expression === e : n instanceof Ft || (n instanceof Ei ? n.condition === e : n instanceof mi ? n.expression === e : n instanceof tr ? n.tag === e : n instanceof yi || void 0));
        }
        function c(e, t, i, n) {
            var r = e.length - 1, o = n, n = a;
            e.forEach(function(e, n) {
                o && (e instanceof Kn ? "use asm" == e.value && (a = !0) : e instanceof Qn || (e instanceof et && e.body instanceof rr && i.force_semicolon(),
                o = !1)), e instanceof Qn || (i.indent(), e.print(i), n == r && t || (i.newline(),
                t && i.newline()));
            }), a = n;
        }
        function u(e, n) {
            n.print("{"), n.with_indent(function() {
                n.append_comments(e, !0);
            }), n.print("}");
        }
        function l(e, n, t) {
            0 < e.body.length ? n.with_block(function() {
                c(e.body, !1, n, t);
            }) : u(e, n);
        }
        function p(t, i) {
            return function(e) {
                var n = this;
                e.print(t), e.space(), e.with_parens(function() {
                    n.init.print(e), e.space(), e.print(i), e.space(), n.object.print(e);
                }), $(n.body, e);
            };
        }
        function d(e, t) {
            t.with_parens(function() {
                e.argnames.forEach(function(e, n) {
                    n && t.comma(), e.print(t);
                }), e.rest && (e.argnames.length && t.comma(), t.print("..."), e.rest.print(t));
            });
        }
        function h(e, n) {
            1 == e.argnames.length && e.argnames[0] instanceof Ui && !e.rest ? e.argnames[0].print(n) : d(e, n),
            n.space(), n.print("=>"), n.space(), e.value ? e.value.print(n) : l(e, n, !0);
        }
        function v(e, n) {
            e.name && (n.space(), e.name.print(n)), d(e, n), n.space(), l(e, n, !0);
        }
        function m(e) {
            e.print("async"), e.space(), e.print("function"), v(this, e);
        }
        function _(e) {
            e.print("async"), e.space(), e.print("function*"), v(this, e);
        }
        function g(e) {
            e.print("function*"), v(this, e);
        }
        function b(e, n) {
            var t = e.value;
            wt(t) && (n.print("async"), n.space()), xt(t) && n.print("*"), A(e, n), v(e.value, n);
        }
        function y(t, i) {
            return function(e) {
                e.print(t);
                var n = this[i];
                n && (e.space(), n.print(e)), e.semicolon();
            };
        }
        function w(e, n) {
            n.newline(), e.body.forEach(function(e) {
                n.indent(), e.print(n), n.newline();
            });
        }
        function x(n) {
            return function(t) {
                t.print(n), t.space(), this.definitions.forEach(function(e, n) {
                    n && t.comma(), e.print(t);
                });
                var e = t.parent();
                e instanceof at && e.init === this || t.semicolon();
            };
        }
        function k(e, n, t) {
            var i = !1;
            t && e.walk(new mr(function(e) {
                return !!i || (e instanceof ki && "in" == e.operator ? i = !0 : e instanceof vt && (!yt(e) || !e.value) || void 0);
            })), e.print(n, i);
        }
        function E(e, n) {
            if (n.option("annotations") && e.pure) {
                var t, i = 0, r = e;
                do {
                    if (t = r, (r = n.parent(i++)) instanceof pi && r.expression === t) return;
                } while (r instanceof mi && r.expression === t);
                n.print("string" == typeof e.pure ? "/*" + e.pure + "*/" : "/*@__PURE__*/");
            }
        }
        function S(e, t) {
            (e.expression instanceof pi || e.expression instanceof _t) && t.add_mapping(e.start),
            t.with_parens(function() {
                e.args.forEach(function(e, n) {
                    n && t.comma(), e.print(t);
                });
            });
        }
        function T(e, t, i) {
            var n = e.properties;
            0 < n.length ? t.with_block(function() {
                n.forEach(function(e, n) {
                    n && (i || t.print(","), t.newline()), t.indent(), e.print(t);
                }), t.newline();
            }) : u(e, t);
        }
        function A(e, n) {
            var t = e.key;
            if (t instanceof Gn) return n.with_square(function() {
                t.print(n);
            });
            var i = e.start && e.start.quote;
            if (n.option("quote_keys") || i && n.option("keep_quoted_props")) n.print_string(t, i); else if ("" + +t == t && 0 <= t) n.print(q(t)); else if (e.private) n.print_name(t); else {
                if (j[t] ? !n.option("ie") : gr(t)) return n.print_name(t), t;
                n.print_string(t, i);
            }
        }
        function D(n) {
            return function(e) {
                this.static && (e.print("static"), e.space()), e.print(n), e.space(), A(this, e),
                v(this.value, e);
            };
        }
        function O(e) {
            var n = e.definition();
            return n && n.mangled_name || e.name;
        }
        function $(e, n) {
            n.option("braces") && !(e instanceof ii || e instanceof ri) ? C(e, n) : e instanceof Qn ? n.force_semicolon() : (n.space(),
            e.print(n));
        }
        function z(e, n) {
            return 0 < e.args.length || n.option("beautify");
        }
        function q(e) {
            var n, t, i = e.toString(10).replace(/^0\./, ".").replace("e+", "e"), r = [ i ];
            return Math.floor(e) === e && (e < 0 ? r.push("-0x" + (-e).toString(16).toLowerCase()) : r.push("0x" + e.toString(16).toLowerCase())),
            (n = /^\.0+/.exec(i)) ? (t = n[0].length, e = i.slice(t), r.push(e + "e-" + (e.length + t - 1))) : (n = /0+$/.exec(i)) ? (t = n[0].length,
            r.push(i.slice(0, -t) + "e" + t)) : (n = /^(\d)\.(\d+)e(-?\d+)$/.exec(i)) && r.push(n[1] + n[2] + "e" + (n[3] - n[2].length)),
            function(e) {
                for (var n = e[0], t = n.length, i = 1; i < e.length; ++i) e[i].length < t && (t = (n = e[i]).length);
                return n;
            }(r);
        }
        function C(e, n) {
            n.space(), e instanceof Qn ? u(e, n) : e instanceof rt ? e.print(n) : n.with_block(function() {
                n.indent(), e.print(n), n.newline();
            });
        }
        function M(e, n) {
            e.forEach(function(e) {
                e.DEFMETHOD("add_source_map", n);
            });
        }
        Gn.DEFMETHOD("print_to_string", function(e) {
            if (e) {
                e = Ar(e);
                return this.print(e), e.get();
            }
            return this.print(n), n.reset();
        }), t(Gn, Fn), t(Tt, i), t(At, i), t(Pt, i), t(Dt, i), t(Ot, i), t(Ci, r), t(Ti, o),
        t(yi, o), t(hi, function(e) {
            e = e.parent();
            return e instanceof Di || yt(e) && e.value === this || e instanceof Ti || e instanceof ki || e instanceof pi || e instanceof Ft || e instanceof Nt || e instanceof Ei || e instanceof li || e instanceof zi || e instanceof fi || e instanceof ae || e instanceof Mi || e instanceof mi && e.expression === this || e instanceof bi || e instanceof tr && e.tag === this || e instanceof yi || e instanceof ai || e instanceof Ai;
        }), t(ki, function(e) {
            var n = e.parent();
            if (n instanceof Ti) return !0;
            if (n instanceof ki) {
                var t = n.operator, i = xr[t], r = this.operator, e = xr[r];
                return e < i || "??" == t && ("&&" == r || "||" == r) || i == e && this === n["**" == t ? "left" : "right"];
            }
            return n instanceof pi ? n.expression === this : n instanceof Ft || (n instanceof mi ? n.expression === this : n instanceof tr ? n.tag === this : n instanceof yi || void 0);
        }), t(mi, function(e) {
            e = e.parent();
            return e instanceof di && e.expression === this && "Call" == vi(this).TYPE || s(this, e);
        }), t(pi, function(e) {
            var n = e.parent();
            if (n instanceof di) return n.expression === this;
            if (e.option("webkit") && this.expression instanceof Dt && n instanceof mi && n.expression === this) {
                e = e.parent(1);
                if (e instanceof Si && e.left === n) return !0;
            }
            return s(this, n);
        }), t(di, function(e) {
            if (z(this, e)) return !1;
            e = e.parent();
            return e instanceof pi ? e.expression === this : e instanceof mi || (e instanceof tr ? e.tag === this : void 0);
        }), t(or, function(e) {
            if (!e.option("galio")) return !1;
            e = e.parent();
            return e instanceof mi && e.expression === this && /^0/.test(q(this.value));
        }), t(Et, function(e) {
            return f(this, e);
        }), t(Si, function(e) {
            return !!f(this, e) || (e.option("v8") ? this.left instanceof Oi : this.left instanceof qi ? r(e) : void 0);
        }), t(St, function(e) {
            return f(this, e);
        }), t(Ei, function(e) {
            return f(this, e);
        }), t(Ai, function(e) {
            return f(this, e);
        }), e(Kn, function(e) {
            var n = this.quote, t = this.value;
            switch (e.option("quote_style")) {
              case 0:
              case 2:
                -1 == t.indexOf('"') && (n = '"');
                break;

              case 1:
                -1 == t.indexOf("'") && (n = "'");
            }
            e.print(n + t + n), e.semicolon();
        }), e(Xn, function(e) {
            e.print("debugger"), e.semicolon();
        }), e(mt, function(e) {
            c(this.body, !0, e, !0), e.print("");
        }), e(ot, function(e) {
            this.label.print(e), e.colon(), this.body.print(e);
        }), e(et, function(e) {
            this.body.print(e), e.semicolon();
        }), e(rt, function(e) {
            l(this, e);
        }), e(Qn, function(e) {
            e.semicolon();
        }), e(ft, function(e) {
            var n = this;
            e.print("do"), C(n.body, e), e.space(), e.print("while"), e.space(), e.with_parens(function() {
                n.condition.print(e);
            }), e.semicolon();
        }), e(ct, function(e) {
            var n = this;
            e.print("while"), e.space(), e.with_parens(function() {
                n.condition.print(e);
            }), $(n.body, e);
        }), e(ut, function(e) {
            var n = this;
            e.print("for"), e.space(), e.with_parens(function() {
                n.init ? (n.init instanceof ti ? n.init.print(e) : k(n.init, e, !0), e.print(";"),
                e.space()) : e.print(";"), n.condition ? (n.condition.print(e), e.print(";"), e.space()) : e.print(";"),
                n.step && n.step.print(e);
            }), $(n.body, e);
        }), e(dt, p("for await", "of")), e(pt, p("for", "in")), e(ae, p("for", "of")), e(ht, function(e) {
            var n = this;
            e.print("with"), e.space(), e.with_parens(function() {
                n.expression.print(e);
            }), $(n.body, e);
        }), e(si, function(e) {
            e.print("export"), e.space(), this.body.print(e);
        }), e(fi, function(e) {
            e.print("export"), e.space(), e.print("default"), e.space();
            var n = this.body;
            n.print(e), n instanceof Pt && !n.name || n instanceof jt || n instanceof $t || n instanceof bt && !n.name && !yt(n) || e.semicolon();
        }), e(ce, function(t) {
            var i = this;
            t.print("export"), t.space();
            var n = i.keys.length;
            function r(e) {
                var n = i.aliases[e], e = i.keys[e];
                t.print_name(e), n != e && (t.space(), t.print("as"), t.space(), t.print_name(n));
            }
            0 == n ? u(i, t) : "*" == i.keys[0] ? r(0) : t.with_block(function() {
                t.indent(), r(0);
                for (var e = 1; e < n; e++) t.print(","), t.newline(), t.indent(), r(e);
                t.newline();
            }), t.space(), t.print("from"), t.space(), t.print_string(i.path, i.quote), t.semicolon();
        }), e(ci, function(e) {
            e.print("export"), e.space(), T(this, e), e.semicolon();
        }), e(ui, function(e) {
            var n = this;
            e.print("import"), e.space(), n.default && n.default.print(e), n.all && (n.default && e.comma(),
            n.all.print(e)), n.properties && (n.default && e.comma(), T(n, e)), (n.all || n.default || n.properties) && (e.space(),
            e.print("from"), e.space()), e.print_string(n.path, n.quote), e.semicolon();
        }), e(Et, function(e) {
            h(this, e);
        }), e(St, function(e) {
            e.print("async"), e.space(), h(this, e);
        }), e(_t, function(e) {
            e.print("function"), v(this, e);
        }), e(zt, m), e(Tt, m), e(qt, _), e(At, _), e(Mt, g), e(Ot, g), e(Ft, function(e) {
            e.print("class"), this.name && (e.space(), this.name.print(e)), this.extends && (e.space(),
            e.print("extends"), e.space(), this.extends.print(e)), e.space(), T(this, e, !0);
        }), e(It, function(e) {
            this.static && (e.print("static"), e.space()), A(this, e), this.value && (e.space(),
            e.print("="), e.space(), this.value.print(e)), e.semicolon();
        }), e(se, D("get")), e(fe, D("set")), e(Ht, function(e) {
            this.static && (e.print("static"), e.space()), b(this, e);
        }), e(Bt, y("return", "value")), e(Lt, y("throw", "value")), e(Vt, y("break", "label")),
        e(Wt, y("continue", "label")), e(Gt, function(e) {
            var n = this;
            e.print("if"), e.space(), e.with_parens(function() {
                n.condition.print(e);
            }), n.alternative ? (function(e, n) {
                var t = e.body;
                if (n.option("braces") && !(t instanceof ii || t instanceof ri) || n.option("ie") && t instanceof ft) return C(t, n);
                if (!t) return n.force_semicolon();
                for (;;) if (t instanceof Gt) {
                    if (!t.alternative) return C(e.body, n);
                    t = t.alternative;
                } else {
                    if (!(t instanceof F)) break;
                    t = t.body;
                }
                $(e.body, n);
            }(n, e), e.space(), e.print("else"), n.alternative instanceof Gt ? (e.space(), n.alternative.print(e)) : $(n.alternative, e)) : $(n.body, e);
        }), e(Jt, function(t) {
            var e = this;
            t.print("switch"), t.space(), t.with_parens(function() {
                e.expression.print(t);
            }), t.space();
            var i = e.body.length - 1;
            i < 0 ? u(e, t) : t.with_block(function() {
                e.body.forEach(function(e, n) {
                    t.indent(!0), e.print(t), n < i && 0 < e.body.length && t.newline();
                });
            });
        }), e(Kt, function(e) {
            e.print("default:"), w(this, e);
        }), e(Qt, function(e) {
            e.print("case"), e.space(), this.expression.print(e), e.print(":"), w(this, e);
        }), e(Zt, function(e) {
            e.print("try"), e.space(), l(this, e), this.bcatch && (e.space(), this.bcatch.print(e)),
            this.bfinally && (e.space(), this.bfinally.print(e));
        }), e(ei, function(e) {
            var n = this;
            e.print("catch"), n.argname && (e.space(), e.with_parens(function() {
                n.argname.print(e);
            })), e.space(), l(n, e);
        }), e(ni, function(e) {
            e.print("finally"), e.space(), l(this, e);
        }), e(ii, x("const")), e(ri, x("let")), e(oi, x("var")), e(ai, function(e) {
            var n;
            this.name.print(e), this.value && (e.space(), e.print("="), e.space(), n = (n = e.parent(1)) instanceof ut || n instanceof lt,
            k(this.value, e, n));
        }), e(li, function(e) {
            this.name.print(e), e.space(), e.print("="), e.space(), this.value.print(e);
        }), e(pi, function(e) {
            E(this, e), this.expression.print(e), this.optional && e.print("?."), S(this, e);
        }), e(di, function(e) {
            E(this, e), e.print("new"), e.space(), this.expression.print(e), z(this, e) && S(this, e);
        }), e(hi, function(t) {
            this.expressions.forEach(function(e, n) {
                0 < n && (t.comma(), t.should_break() && (t.newline(), t.indent())), e.print(t);
            });
        }), e(_i, function(e) {
            var n = this.expression;
            n.print(e);
            var t = this.property;
            e.option("ie") && j[t] ? (e.print(this.optional ? "?.[" : "["), e.add_mapping(this.end),
            e.print_string(t), e.print("]")) : (n instanceof or && !/[ex.)]/i.test(e.last()) && e.print("."),
            e.print(this.optional ? "?." : "."), e.add_mapping(this.end), e.print_name(t));
        }), e(gi, function(e) {
            this.expression.print(e), e.print(this.optional ? "?.[" : "["), this.property.print(e),
            e.print("]");
        }), e(bi, function(e) {
            e.print("..."), this.expression.print(e);
        }), e(wi, function(e) {
            var n = this.operator, t = this.expression;
            e.print(n), (/^[a-z]/i.test(n) || /[+-]$/.test(n) && t instanceof wi && /^[+-]/.test(t.operator)) && e.space(),
            t.print(e);
        }), e(xi, function(e) {
            this.expression.print(e), e.print(this.operator);
        }), e(ki, function(e) {
            this.left.print(e), e.space(), e.print(this.operator), e.space(), this.right.print(e);
        }), e(Ei, function(e) {
            this.condition.print(e), e.space(), e.print("?"), e.space(), this.consequent.print(e),
            e.space(), e.colon(), this.alternative.print(e);
        }), e(Ti, function(e) {
            e.print("await"), e.space(), this.expression.print(e);
        }), e(Ai, function(e) {
            e.print(this.nested ? "yield*" : "yield"), this.expression && (e.space(), this.expression.print(e));
        }), e(Di, function(t) {
            var e = this.elements, i = e.length;
            t.with_square(0 < i ? function() {
                t.space(), e.forEach(function(e, n) {
                    n && t.comma(), e.print(t), n === i - 1 && e instanceof lr && t.comma();
                }), t.space();
            } : Mn);
        }), e($i, function(t) {
            var e = this.elements, n = e.length, i = this.rest;
            t.with_square(n || i ? function() {
                t.space(), e.forEach(function(e, n) {
                    n && t.comma(), e.print(t);
                }), i ? (n && t.comma(), t.print("..."), i.print(t)) : e[n - 1] instanceof lr && t.comma(),
                t.space();
            } : Mn);
        }), e(zi, function(e) {
            var n = A(this, e), t = this.value;
            if (n) if (t instanceof li) {
                if (t.name instanceof Ii && n == O(t.name)) return e.space(), e.print("="), e.space(),
                void t.value.print(e);
            } else if (t instanceof Ii && n == O(t)) return;
            e.colon(), t.print(e);
        }), e(qi, function(t) {
            var e = this.properties, n = e.length, i = this.rest;
            n || i ? t.with_block(function() {
                e.forEach(function(e, n) {
                    n && (t.print(","), t.newline()), t.indent(), e.print(t);
                }), i && (n && (t.print(","), t.newline()), t.indent(), t.print("..."), i.print(t)),
                t.newline();
            }) : u(this, t);
        }), e(Ci, function(e) {
            T(this, e);
        }), e(Fi, function(e) {
            A(this, e), e.colon(), this.value.print(e);
        }), e(ji, function(e) {
            b(this, e);
        }), e(Ni, D("get")), e(Pi, D("set")), e(Ii, function(e) {
            e.print_name(O(this));
        }), e(Ki, function(e) {
            var n = O(this);
            e.print_name(n);
            var t = this.alias;
            t != n && (e.space(), e.print("as"), e.space(), e.print_name(t));
        }), e(Ri, function(e) {
            var n = O(this), t = this.key;
            t && t != n && (e.print_name(t), e.space(), e.print("as"), e.space()), e.print_name(n);
        }), e(lr, Mn), e(tr, function(e) {
            this.tag && this.tag.print(e), e.print("`");
            for (var n = 0; n < this.expressions.length; n++) e.print(this.strings[n]), e.print("${"),
            this.expressions[n].print(e), e.print("}");
            e.print(this.strings[n]), e.print("`");
        }), e(ir, function(e) {
            e.print("" + this.value);
        }), e(rr, function(e) {
            e.print_string(this.value, this.quote);
        }), e(or, function(e) {
            var n = this.start;
            a && n && null != n.raw ? e.print(n.raw) : e.print(q(this.value));
        }), e(sr, function(e) {
            var n = this.value, t = n.toString(), i = t.lastIndexOf("/");
            n.raw_source ? t = "/" + n.raw_source + t.slice(i) : 1 == i ? t = "/(?:)" + t.slice(i) : t.indexOf("/", 1) < i && (t = "/" + t.slice(1, i).replace(/\\\\|[^/]?\//g, function(e) {
                return "\\" == e[0] ? e : e.slice(0, -1) + "\\/";
            }) + t.slice(i)), e.print(e.to_utf8(t).replace(/\\(?:\0(?![0-9])|[^\0])/g, function(e) {
                switch (e[1]) {
                  case "\n":
                    return "\\n";

                  case "\r":
                    return "\\r";

                  case "\t":
                    return "\t";

                  case "\b":
                    return "\b";

                  case "\f":
                    return "\f";

                  case "\0":
                    return "\0";

                  case "\v":
                    return "\v";

                  case "\u2028":
                    return "\\u2028";

                  case "\u2029":
                    return "\\u2029";

                  default:
                    return e;
                }
            }).replace(/[\n\r\u2028\u2029]/g, function(e) {
                switch (e) {
                  case "\n":
                    return "\\n";

                  case "\r":
                    return "\\r";

                  case "\u2028":
                    return "\\u2028";

                  case "\u2029":
                    return "\\u2029";
                }
            }));
            t = e.parent();
            t instanceof ki && /^in/.test(t.operator) && t.left === this && e.print(" ");
        }), M([ Gn, ot ], Mn), M([ Di, rt, ei, ir, Xn, ti, Oi, ni, Yt, _t, di, Ci, F, Ii, Jt, Xt, Zt ], function(e) {
            e.add_mapping(this.start);
        }), M([ Nt, zi, Mi ], function(e) {
            "string" == typeof this.key && e.add_mapping(this.start, this.key);
        });
    }();
    var X = e("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"), K = X.reduce(function(e, n, t) {
        return e[n] = t, e;
    }, Object.create(null));
    function Q(e) {
        var n = "";
        e = Math.abs(e) << 1 | e >>> 31;
        do {
            var t = 31 & e;
        } while ((e >>>= 5) && (t |= 32), n += X[t], e);
        return n;
    }
    function Z() {
        var n = Object.create(null), t = [];
        return t.index = function(e) {
            return Vn(n, e) || (n[e] = t.length, t.push(e)), n[e];
        }, t;
    }
    function ee(l) {
        var a, s = Z(), o = l.includeSources && Object.create(null), f = Z(), c = "";
        l.orig && Object.keys(l.orig).forEach(function(e) {
            var n = l.orig[e], t = [ 0, 0, 1, 0, 0 ];
            if (l.orig[e] = {
                names: n.names,
                mappings: n.mappings.split(/;/).map(function(e) {
                    return t[0] = 0, e.split(/,/).map(function(e) {
                        return t.slice(0, function(e, n) {
                            for (var t = 0, i = 0, r = 0, o = 0; r < n.length; r++) {
                                var a = K[n[r]];
                                t += (31 & a) << i, 32 & a ? i += 5 : (e[o++] += 1 & t ? 2147483648 | -(t >> 1) : t >> 1,
                                t = i = 0);
                            }
                            return o;
                        }(t, e));
                    });
                }),
                sources: n.sources
            }, o && n.sourcesContent) for (var i = 0; i < n.sources.length; i++) {
                var r = n.sourcesContent[i];
                r && (o[n.sources[i]] = r);
            }
        });
        var u = 1, p = 0, d = 0, h = 1, v = 0, m = 0;
        return {
            add: l.orig ? function(e, n, t, i, r, o) {
                var a = l.orig[e];
                if (a) {
                    var s, f = a.mappings[i - 1];
                    if (!f) return;
                    for (var c = 0; c < f.length; c++) {
                        var u = f[c][0];
                        if (u <= r && (s = f[c]), r <= u) break;
                    }
                    !s || s.length < 4 ? e = null : (e = a.sources[s[1]], i = s[2], r = s[3], 4 < s.length && (o = a.names[s[4]]));
                }
                _(e, n, t, i, r, o);
            } : _,
            setSourceContent: o ? function(e, n) {
                e in o || (o[e] = n);
            } : Mn,
            toString: function() {
                return JSON.stringify({
                    version: 3,
                    file: l.filename || void 0,
                    sourceRoot: l.root || void 0,
                    sources: s,
                    sourcesContent: o ? s.map(function(e) {
                        return o[e] || null;
                    }) : void 0,
                    names: f,
                    mappings: c
                });
            }
        };
        function _(e, n, t, i, r, o) {
            if (null != a || null != e) {
                if (a = e, u < n) for (p = 0; c += ";", ++u < n; ); else c && (c += ",");
                c += Q(t - p), p = t, null != e && (e = s.index(e), c += Q(e - d), d = e, c += Q(i - h),
                h = i, c += Q(r - v), v = r, l.names && null != o && (o = f.index(o), c += Q(o - m),
                m = o));
            }
        }
    }
    !function() {
        var i = {
            Program: function(e) {
                return new mt({
                    start: s(e),
                    end: f(e),
                    body: r(e.body.map(l))
                });
            },
            ArrowFunctionExpression: function(e) {
                var n = [], t = null;
                e.params.forEach(function(e) {
                    "RestElement" == e.type ? t = l(e.argument) : n.push(l(e));
                });
                var i = new (e.async ? St : Et)({
                    start: s(e),
                    end: f(e),
                    argnames: n,
                    rest: t
                }), e = l(e.body);
                return e instanceof rt ? (i.body = r(e.body), i.value = null) : (i.body = [], i.value = e),
                i;
            },
            FunctionDeclaration: function(e) {
                var n = e.async ? e.generator ? qt : zt : e.generator ? Mt : Ct, t = [], i = null;
                return e.params.forEach(function(e) {
                    "RestElement" == e.type ? i = l(e.argument) : t.push(l(e));
                }), new n({
                    start: s(e),
                    end: f(e),
                    name: l(e.id),
                    argnames: t,
                    rest: i,
                    body: r(l(e.body).body)
                });
            },
            FunctionExpression: function(e) {
                var n = e.async ? e.generator ? At : Tt : e.generator ? Ot : Dt, t = [], i = null;
                return e.params.forEach(function(e) {
                    "RestElement" == e.type ? i = l(e.argument) : t.push(l(e));
                }), new n({
                    start: s(e),
                    end: f(e),
                    name: l(e.id),
                    argnames: t,
                    rest: i,
                    body: r(l(e.body).body)
                });
            },
            ClassDeclaration: function(e) {
                return new jt({
                    start: s(e),
                    end: f(e),
                    name: l(e.id),
                    extends: l(e.superClass),
                    properties: e.body.body.map(l)
                });
            },
            ClassExpression: function(e) {
                return new Pt({
                    start: s(e),
                    end: f(e),
                    name: l(e.id),
                    extends: l(e.superClass),
                    properties: e.body.body.map(l)
                });
            },
            MethodDefinition: function(e) {
                var n = e.key, t = !1, n = e.computed ? l(n) : "PrivateIdentifier" == n.type ? (t = !0,
                "#" + n.name) : a(n), i = Ht, r = l(e.value);
                switch (e.kind) {
                  case "get":
                    i = se, r = new gt(r);
                    break;

                  case "set":
                    i = fe, r = new gt(r);
                }
                return new i({
                    start: s(e),
                    end: f(e),
                    key: n,
                    private: t,
                    static: e.static,
                    value: r
                });
            },
            PropertyDefinition: function(e) {
                var n = e.key, t = !1, n = e.computed ? l(n) : "PrivateIdentifier" == n.type ? (t = !0,
                "#" + n.name) : a(n);
                return new It({
                    start: s(e),
                    end: f(e),
                    key: n,
                    private: t,
                    static: e.static,
                    value: l(e.value)
                });
            },
            ForOfStatement: function(e) {
                return new (e.await ? dt : ae)({
                    start: s(e),
                    end: f(e),
                    init: l(e.left),
                    object: l(e.right),
                    body: l(e.body)
                });
            },
            TryStatement: function(e) {
                var n = e.handlers || [ e.handler ];
                if (1 < n.length || e.guardedHandlers && e.guardedHandlers.length) throw new Error("Multiple catch clauses are not supported.");
                return new Zt({
                    start: s(e),
                    end: f(e),
                    body: l(e.block).body,
                    bcatch: l(n[0]),
                    bfinally: e.finalizer ? new ni(l(e.finalizer)) : null
                });
            },
            Property: function(e) {
                var n = (e.computed ? l : a)(e.key), n = {
                    start: s(e),
                    end: f(e),
                    key: n,
                    value: l(e.value)
                };
                return "init" == e.kind ? new (e.method ? ji : Fi)(n) : (n.value = new gt(n.value),
                "get" == e.kind ? new Ni(n) : "set" == e.kind ? new Pi(n) : void 0);
            },
            ArrayExpression: function(e) {
                return new Di({
                    start: s(e),
                    end: f(e),
                    elements: e.elements.map(function(e) {
                        return null === e ? new lr() : l(e);
                    })
                });
            },
            ArrayPattern: function(e) {
                var n = [], t = null;
                return e.elements.forEach(function(e) {
                    null === e ? n.push(new lr()) : "RestElement" == e.type ? t = l(e.argument) : n.push(l(e));
                }), new $i({
                    start: s(e),
                    end: f(e),
                    elements: n,
                    rest: t
                });
            },
            ObjectPattern: function(e) {
                var n = [], t = null;
                return e.properties.forEach(function(e) {
                    "RestElement" == e.type ? t = l(e.argument) : n.push(new zi(l(e)));
                }), new qi({
                    start: s(e),
                    end: f(e),
                    properties: n,
                    rest: t
                });
            },
            MemberExpression: function(e) {
                return new (e.computed ? gi : _i)({
                    start: s(e),
                    end: f(e),
                    optional: e.optional,
                    expression: l(e.object),
                    property: e.computed ? l(e.property) : e.property.name
                });
            },
            MetaProperty: function(e) {
                var n = l(e.meta), t = a(e.property);
                return "new" == n.name && "target" == t ? new nr({
                    start: s(e),
                    end: f(e),
                    name: "new.target"
                }) : new _i({
                    start: s(e),
                    end: f(e),
                    expression: n,
                    property: t
                });
            },
            SwitchCase: function(e) {
                return new (e.test ? Qt : Kt)({
                    start: s(e),
                    end: f(e),
                    expression: l(e.test),
                    body: e.consequent.map(l)
                });
            },
            ExportAllDeclaration: function(e) {
                var n = e.exported ? a(e.exported) : "*";
                return new ce({
                    start: s(e),
                    end: f(e),
                    aliases: [ n ],
                    keys: [ "*" ],
                    path: e.source.value
                });
            },
            ExportDefaultDeclaration: function(e) {
                var n = l(e.declaration);
                if (!n.name) switch (n.CTOR) {
                  case zt:
                    n = new Tt(n);
                    break;

                  case qt:
                    n = new At(n);
                    break;

                  case jt:
                    n = new Pt(n);
                    break;

                  case Ct:
                    n = new Dt(n);
                    break;

                  case Mt:
                    n = new Ot(n);
                }
                return new fi({
                    start: s(e),
                    end: f(e),
                    body: n
                });
            },
            ExportNamedDeclaration: function(e) {
                if (e.declaration) return new si({
                    start: s(e),
                    end: f(e),
                    body: l(e.declaration)
                });
                if (e.source) {
                    var n = [], t = [];
                    return e.specifiers.forEach(function(e) {
                        n.push(a(e.exported)), t.push(a(e.local));
                    }), new ce({
                        start: s(e),
                        end: f(e),
                        aliases: n,
                        keys: t,
                        path: e.source.value
                    });
                }
                return new ci({
                    start: s(e),
                    end: f(e),
                    properties: e.specifiers.map(function(e) {
                        var n = new Ki(l(e.local));
                        return n.alias = a(e.exported), n;
                    })
                });
            },
            ImportDeclaration: function(e) {
                var t = null, i = null, r = null;
                return e.specifiers.forEach(function(e) {
                    var n = new Ri(l(e.local));
                    switch (e.type) {
                      case "ImportDefaultSpecifier":
                        (i = n).key = "";
                        break;

                      case "ImportNamespaceSpecifier":
                        (t = n).key = "*";
                        break;

                      default:
                        n.key = e.imported.name || syn.name, (r = r || []).push(n);
                    }
                }), new ui({
                    start: s(e),
                    end: f(e),
                    all: t,
                    default: i,
                    properties: r,
                    path: e.source.value
                });
            },
            ImportExpression: function(e) {
                var n = s(e), t = l(e.source);
                return new pi({
                    start: n,
                    end: f(e),
                    expression: new Xi({
                        start: n,
                        end: t.start,
                        name: "import"
                    }),
                    args: [ t ]
                });
            },
            VariableDeclaration: function(e) {
                return new ({
                    const: ii,
                    let: ri
                }[e.kind] || oi)({
                    start: s(e),
                    end: f(e),
                    definitions: e.declarations.map(l)
                });
            },
            Literal: function(e) {
                var n = {
                    start: s(e),
                    end: f(e)
                };
                if (e.bigint) return n.value = e.bigint.toLowerCase() + "n", new ar(n);
                var t = e.value;
                if (null === t) return new fr(n);
                var i = e.regex;
                if (i && i.pattern) return n.value = new RegExp(i.pattern, i.flags), n.value.raw_source = i.pattern,
                new sr(n);
                if (i) return n.value = e.regex && e.raw ? e.raw : t, new sr(n);
                switch (typeof t) {
                  case "string":
                    return n.value = t, new rr(n);

                  case "number":
                    if (isNaN(t)) return new cr(n);
                    var r, o = isFinite(t) ? (n.value = (r = 1 / t < 0) ? -t : t, new or(n)) : (r = t < 0,
                    new pr(n));
                    return r ? new wi({
                        start: n.start,
                        end: n.end,
                        operator: "-",
                        expression: o
                    }) : o;

                  case "boolean":
                    return new (t ? vr : hr)(n);
                }
            },
            TemplateLiteral: function(e) {
                return new tr({
                    start: s(e),
                    end: f(e),
                    expressions: e.expressions.map(l),
                    strings: e.quasis.map(function(e) {
                        return e.value.raw;
                    })
                });
            },
            TaggedTemplateExpression: function(e) {
                var n = l(e.quasi);
                return n.start = s(e), n.end = f(e), n.tag = l(e.tag), n;
            },
            Identifier: function(e) {
                for (var n, t = u.length - 1; "ArrayPattern" == (n = u[--t]).type || "AssignmentPattern" == n.type && n.left === u[t + 1] || "ObjectPattern" == n.type || "Property" == n.type && n.value === u[t + 1] || "VariableDeclarator" == n.type && n.id === u[t + 1]; );
                var i = Xi;
                switch (n.type) {
                  case "ArrowFunctionExpression":
                    n.body !== u[t + 1] && (i = Ui);
                    break;

                  case "BreakStatement":
                  case "ContinueStatement":
                    i = pe;
                    break;

                  case "CatchClause":
                    i = Ji;
                    break;

                  case "ClassDeclaration":
                    n.id === u[t + 1] && (i = ue);
                    break;

                  case "ClassExpression":
                    n.id === u[t + 1] && (i = Gi);
                    break;

                  case "FunctionDeclaration":
                    i = n.id === u[t + 1] ? Vi : Ui;
                    break;

                  case "FunctionExpression":
                    i = n.id === u[t + 1] ? Wi : Ui;
                    break;

                  case "LabeledStatement":
                    i = le;
                    break;

                  case "VariableDeclaration":
                    i = {
                        const: Yi,
                        let: Bi
                    }[n.kind] || Li;
                }
                return new i({
                    start: s(e),
                    end: f(e),
                    name: e.name
                });
            },
            Super: function(e) {
                return new Zi({
                    start: s(e),
                    end: f(e),
                    name: "super"
                });
            },
            ThisExpression: function(e) {
                return new er({
                    start: s(e),
                    end: f(e),
                    name: "this"
                });
            },
            ParenthesizedExpression: function(e) {
                var n = l(e.expression);
                return n.start.parens || (n.start.parens = []), n.start.parens.push(s(e)), n.end.parens || (n.end.parens = []),
                n.end.parens.push(f(e)), n;
            },
            ChainExpression: function(e) {
                e = l(e.expression);
                return e.terminal = !0, e;
            }
        };
        function e(i) {
            return function(e) {
                var n = e.key instanceof Gn, t = n ? h(e.key) : e.private ? {
                    type: "PrivateIdentifier",
                    name: e.key.slice(1)
                } : {
                    type: "Literal",
                    value: e.key
                };
                return {
                    type: "MethodDefinition",
                    kind: i,
                    computed: n,
                    key: t,
                    static: e.static,
                    value: h(e.value)
                };
            };
        }
        function n(n) {
            return function(e) {
                return {
                    type: "ForOfStatement",
                    await: n,
                    left: h(e.init),
                    right: h(e.object),
                    body: h(e.body)
                };
            };
        }
        function t(e) {
            var n = e.value;
            return "number" == typeof n && (n < 0 || 0 === n && 1 / n < 0) ? {
                type: "UnaryExpression",
                operator: "-",
                prefix: !0,
                argument: {
                    type: "Literal",
                    value: -n,
                    raw: e.start.raw
                }
            } : {
                type: "Literal",
                value: n,
                raw: e.start.raw
            };
        }
        function r(e) {
            for (var n = 0; n < e.length; n++) {
                var t = e[n];
                if (!(t instanceof et)) break;
                var i = t.body;
                if (!(i instanceof rr)) break;
                if (t.start.pos !== i.start.pos) break;
                e[n] = new Kn(i);
            }
            return e;
        }
        function o(e) {
            if ("Literal" == e.type) return null != e.raw ? e.raw : e.value + "";
        }
        function s(e) {
            var n = e.loc, t = n && n.start, i = e.range;
            return new Y({
                file: n && n.source,
                line: t && t.line,
                col: t && t.column,
                pos: i ? i[0] : e.start,
                endline: t && t.line,
                endcol: t && t.column,
                endpos: i ? i[0] : e.start,
                raw: o(e)
            });
        }
        function f(e) {
            var n = e.loc, t = n && n.end, i = e.range;
            return new Y({
                file: n && n.source,
                line: t && t.line,
                col: t && t.column,
                pos: i ? i[1] : e.end,
                endline: t && t.line,
                endcol: t && t.column,
                endpos: i ? i[1] : e.end,
                raw: o(e)
            });
        }
        function a(e) {
            return "" + e["Identifier" == e.type ? "name" : "value"];
        }
        function c(e, n, t) {
            var o = [ "start: my_start_token(M)", "end: my_end_token(M)" ], a = [ "type: " + JSON.stringify(e) ];
            t && t.split(/\s*,\s*/).forEach(function(e) {
                var n = /([a-z0-9$_]+)(=|@|>|%)([a-z0-9$_]+)/i.exec(e);
                if (!n) throw new Error("Can't understand property map: " + e);
                var t = n[1], i = n[2], r = n[3];
                switch (i) {
                  case "@":
                    o.push(r + ": M." + t + ".map(from_moz)"), a.push(t + ": M." + r + ".map(to_moz)");
                    break;

                  case ">":
                    o.push(r + ": from_moz(M." + t + ")"), a.push(t + ": to_moz(M." + r + ")");
                    break;

                  case "=":
                    o.push(r + ": M." + t), a.push(t + ": M." + r);
                    break;

                  case "%":
                    o.push(r + ": from_moz(M." + t + ").body"), a.push(t + ": to_moz_block(M)");
                    break;

                  default:
                    throw new Error("Can't understand operator in propmap: " + e);
                }
            }), i[e] = new Function("U2", "my_start_token", "my_end_token", "from_moz", [ "return function From_Moz_" + e + "(M) {", "    return new U2.AST_" + n.TYPE + "({", o.join(",\n"), "    });", "};" ].join("\n"))(_, s, f, l),
            d(n, new Function("to_moz", "to_moz_block", "to_moz_scope", [ "return function To_Moz_" + e + "(M) {", "    return {", a.join(",\n"), "    };", "};" ].join("\n"))(h, v, m));
        }
        i.UpdateExpression = i.UnaryExpression = function(e) {
            return new (("prefix" in e ? e.prefix : "UnaryExpression" == e.type) ? wi : xi)({
                start: s(e),
                end: f(e),
                operator: e.operator,
                expression: l(e.argument)
            });
        }, c("EmptyStatement", Qn), c("ExpressionStatement", et, "expression>body"), c("BlockStatement", rt, "body@body"),
        c("IfStatement", Gt, "test>condition, consequent>body, alternate>alternative"),
        c("LabeledStatement", ot, "label>label, body>body"), c("BreakStatement", Vt, "label>label"),
        c("ContinueStatement", Wt, "label>label"), c("WithStatement", ht, "object>expression, body>body"),
        c("SwitchStatement", Jt, "discriminant>expression, cases@body"), c("ReturnStatement", Bt, "argument>value"),
        c("ThrowStatement", Lt, "argument>value"), c("WhileStatement", ct, "test>condition, body>body"),
        c("DoWhileStatement", ft, "test>condition, body>body"), c("ForStatement", ut, "init>init, test>condition, update>step, body>body"),
        c("ForInStatement", pt, "left>init, right>object, body>body"), c("DebuggerStatement", Xn),
        c("VariableDeclarator", ai, "id>name, init>value"), c("CatchClause", ei, "param>argname, body%body"),
        c("BinaryExpression", ki, "operator=operator, left>left, right>right"), c("LogicalExpression", ki, "operator=operator, left>left, right>right"),
        c("AssignmentExpression", Si, "operator=operator, left>left, right>right"), c("AssignmentPattern", li, "left>name, right>value"),
        c("ConditionalExpression", Ei, "test>condition, consequent>consequent, alternate>alternative"),
        c("NewExpression", di, "callee>expression, arguments@args, pure=pure"), c("CallExpression", pi, "callee>expression, arguments@args, optional=optional, pure=pure"),
        c("SequenceExpression", hi, "expressions@expressions"), c("SpreadElement", bi, "argument>expression"),
        c("ObjectExpression", Ci, "properties@properties"), c("AwaitExpression", Ti, "argument>expression"),
        c("YieldExpression", Ai, "argument>expression, delegate=nested"), d(mt, function(e) {
            return m("Program", e);
        }), d($t, function(e) {
            var n = e.argnames.map(h);
            return e.rest && n.push({
                type: "RestElement",
                argument: h(e.rest)
            }), {
                type: "FunctionDeclaration",
                id: h(e.name),
                async: wt(e),
                generator: xt(e),
                params: n,
                body: m("BlockStatement", e)
            };
        }), d(_t, function(e) {
            var n = e.argnames.map(h);
            return e.rest && n.push({
                type: "RestElement",
                argument: h(e.rest)
            }), yt(e) ? {
                type: "ArrowFunctionExpression",
                async: wt(e),
                params: n,
                body: e.value ? h(e.value) : m("BlockStatement", e)
            } : {
                type: "FunctionExpression",
                id: h(e.name),
                async: wt(e),
                generator: xt(e),
                params: n,
                body: m("BlockStatement", e)
            };
        }), d(jt, function(e) {
            return {
                type: "ClassDeclaration",
                id: h(e.name),
                superClass: h(e.extends),
                body: {
                    type: "ClassBody",
                    body: e.properties.map(h)
                }
            };
        }), d(Pt, function(e) {
            return {
                type: "ClassExpression",
                id: h(e.name),
                superClass: h(e.extends),
                body: {
                    type: "ClassBody",
                    body: e.properties.map(h)
                }
            };
        }), d(se, e("get")), d(fe, e("set")), d(Ht, e("method")), d(It, function(e) {
            var n = e.key instanceof Gn;
            return {
                type: "PropertyDefinition",
                computed: n,
                key: n ? h(e.key) : e.private ? {
                    type: "PrivateIdentifier",
                    name: e.key.slice(1)
                } : {
                    type: "Literal",
                    value: e.key
                },
                static: e.static,
                value: h(e.value)
            };
        }), d(dt, n(!0)), d(ae, n(!1)), d(Kn, function(e) {
            return {
                type: "ExpressionStatement",
                expression: p(e, {
                    type: "Literal",
                    value: e.value
                })
            };
        }), d(Xt, function(e) {
            return {
                type: "SwitchCase",
                test: h(e.expression),
                consequent: e.body.map(h)
            };
        }), d(Zt, function(e) {
            return {
                type: "TryStatement",
                block: v(e),
                handler: h(e.bcatch),
                guardedHandlers: [],
                finalizer: h(e.bfinally)
            };
        }), d(ei, function(e) {
            return {
                type: "CatchClause",
                param: h(e.argname),
                guard: null,
                body: v(e)
            };
        }), d(si, function(e) {
            return {
                type: "ExportNamedDeclaration",
                declaration: h(e.body)
            };
        }), d(fi, function(e) {
            return {
                type: "ExportDefaultDeclaration",
                declaration: h(e.body)
            };
        }), d(ce, function(e) {
            if ("*" == e.keys[0]) return {
                type: "ExportAllDeclaration",
                exported: "*" == e.aliases[0] ? null : {
                    type: "Identifier",
                    name: e.aliases[0]
                },
                source: {
                    type: "Literal",
                    value: e.path
                }
            };
            for (var n = [], t = 0; t < e.aliases.length; t++) n.push({
                type: "ExportSpecifier",
                exported: {
                    type: "Identifier",
                    name: e.aliases[t]
                },
                local: {
                    type: "Identifier",
                    name: e.keys[t]
                }
            });
            return {
                type: "ExportNamedDeclaration",
                specifiers: n,
                source: {
                    type: "Literal",
                    value: e.path
                }
            };
        }), d(ci, function(e) {
            return {
                type: "ExportNamedDeclaration",
                specifiers: e.properties.map(function(e) {
                    return {
                        type: "ExportSpecifier",
                        local: h(e),
                        exported: {
                            type: "Identifier",
                            name: e.alias
                        }
                    };
                })
            };
        }), d(ui, function(e) {
            var n = e.properties ? e.properties.map(function(e) {
                return {
                    type: "ImportSpecifier",
                    local: h(e),
                    imported: {
                        type: "Identifier",
                        name: e.key
                    }
                };
            }) : [];
            return e.all && n.unshift({
                type: "ImportNamespaceSpecifier",
                local: h(e.all)
            }), e.default && n.unshift({
                type: "ImportDefaultSpecifier",
                local: h(e.default)
            }), {
                type: "ImportDeclaration",
                specifiers: n,
                source: {
                    type: "Literal",
                    value: e.path
                }
            };
        }), d(ti, function(e) {
            return {
                type: "VariableDeclaration",
                kind: e.TYPE.toLowerCase(),
                declarations: e.definitions.map(h)
            };
        }), d(mi, function(e) {
            var n = e instanceof gi, n = {
                type: "MemberExpression",
                object: h(e.expression),
                computed: n,
                optional: e.optional,
                property: n ? h(e.property) : {
                    type: "Identifier",
                    name: e.property
                }
            };
            return e.terminal ? {
                type: "ChainExpression",
                expression: n
            } : n;
        }), d(yi, function(e) {
            return {
                type: "++" == e.operator || "--" == e.operator ? "UpdateExpression" : "UnaryExpression",
                operator: e.operator,
                prefix: e instanceof wi,
                argument: h(e.expression)
            };
        }), d(ki, function(e) {
            return {
                type: "&&" == e.operator || "||" == e.operator ? "LogicalExpression" : "BinaryExpression",
                left: h(e.left),
                operator: e.operator,
                right: h(e.right)
            };
        }), d(Di, function(e) {
            return {
                type: "ArrayExpression",
                elements: e.elements.map(h)
            };
        }), d($i, function(e) {
            var n = e.elements.map(h);
            return e.rest && n.push({
                type: "RestElement",
                argument: h(e.rest)
            }), {
                type: "ArrayPattern",
                elements: n
            };
        }), d(zi, function(e) {
            var n = e.key instanceof Gn;
            return {
                type: "Property",
                kind: "init",
                computed: n,
                key: n ? h(e.key) : {
                    type: "Literal",
                    value: e.key
                },
                value: h(e.value)
            };
        }), d(qi, function(e) {
            var n = e.properties.map(h);
            return e.rest && n.push({
                type: "RestElement",
                argument: h(e.rest)
            }), {
                type: "ObjectPattern",
                properties: n
            };
        }), d(Mi, function(e) {
            var n, t = e.key instanceof Gn, i = t ? h(e.key) : {
                type: "Literal",
                value: e.key
            };
            return e instanceof Fi ? n = "init" : e instanceof Ni ? n = "get" : e instanceof Pi && (n = "set"),
            {
                type: "Property",
                kind: n,
                computed: t,
                method: e instanceof ji,
                key: i,
                value: h(e.value)
            };
        }), d(Ii, function(e) {
            var n = e.definition();
            return {
                type: "Identifier",
                name: n && n.mangled_name || e.name
            };
        }), d(Zi, function() {
            return {
                type: "Super"
            };
        }), d(er, function() {
            return {
                type: "ThisExpression"
            };
        }), d(nr, function() {
            return {
                type: "MetaProperty",
                meta: {
                    type: "Identifier",
                    name: "new"
                },
                property: {
                    type: "Identifier",
                    name: "target"
                }
            };
        }), d(sr, function(e) {
            var n = e.value.toString().match(/[gimuy]*$/)[0], t = "/" + e.value.raw_source + "/" + n;
            return {
                type: "Literal",
                value: t,
                raw: t,
                regex: {
                    pattern: e.value.raw_source,
                    flags: n
                }
            };
        }), d(ar, function(e) {
            e = e.value;
            return {
                type: "Literal",
                bigint: e.slice(0, -1),
                raw: e
            };
        }), d(dr, t), d(ir, t), d(fr, t), d(g, function(e) {
            return {
                type: "Identifier",
                name: String(e.value)
            };
        }), d(tr, function(e) {
            var t = e.strings.length - 1, n = {
                type: "TemplateLiteral",
                expressions: e.expressions.map(h),
                quasis: e.strings.map(function(e, n) {
                    return {
                        type: "TemplateElement",
                        tail: n == t,
                        value: {
                            raw: e
                        }
                    };
                })
            };
            return e.tag ? {
                type: "TaggedTemplateExpression",
                tag: h(e.tag),
                quasi: n
            } : n;
        }), it.DEFMETHOD("to_mozilla_ast", rt.prototype.to_mozilla_ast), lr.DEFMETHOD("to_mozilla_ast", Nn),
        Gn.DEFMETHOD("to_mozilla_ast", function() {
            throw new Error("Cannot convert AST_" + this.TYPE);
        });
        var u = null;
        function l(e) {
            u.push(e);
            var n = null;
            if (e) {
                if (!Vn(i, e.type)) throw new Error("Unsupported type: " + e.type);
                n = i[e.type](e);
            }
            return u.pop(), n;
        }
        function p(e, n) {
            var t = e.start, e = e.end;
            return null != t.pos && null != e.endpos && (n.range = [ t.pos, e.endpos ]), t.line && (n.loc = {
                start: {
                    line: t.line,
                    column: t.col
                },
                end: e.endline ? {
                    line: e.endline,
                    column: e.endcol
                } : null
            }, t.file && (n.loc.source = t.file)), n;
        }
        function d(e, n) {
            e.DEFMETHOD("to_mozilla_ast", function() {
                return p(this, n(this));
            });
        }
        function h(e) {
            return null != e ? e.to_mozilla_ast() : null;
        }
        function v(e) {
            return {
                type: "BlockStatement",
                body: e.body.map(h)
            };
        }
        function m(e, n) {
            var t = n.body.map(h);
            return n.body[0] instanceof et && n.body[0].body instanceof rr && t.unshift(h(new Qn(n.body[0]))),
            {
                type: e,
                body: t
            };
        }
        Gn.from_mozilla_ast = function(e) {
            var n = u;
            u = [];
            e = l(e);
            return u = n, e.walk(new mr(function(e) {
                if (e instanceof pe) {
                    for (var n, t, i = 0; (n = this.parent(i)) && !(n instanceof vt); i++) if (n instanceof ot && n.label.name == e.name) {
                        e.thedef = n.label;
                        break;
                    }
                    e.thedef || (t = e.start, ve("Undefined label " + e.name, t.file, t.line, t.col, t.pos));
                }
            })), e;
        };
    }();
    var ne, te, ie, re = (ne = [], [ "null", "true", "false", "Infinity", "-Infinity", "undefined" ].forEach(we),
    [ Array, Boolean, Date, Error, Function, Math, Number, Object, RegExp, String ].forEach(function(e) {
        Object.getOwnPropertyNames(e).map(we), e.prototype && (Object.getOwnPropertyNames(new e()).map(we),
        Object.getOwnPropertyNames(e.prototype).map(we));
    }), Bn(ne));
    function we(e) {
        ne.push(e);
    }
    function xe(e, n) {
        e instanceof Ei ? (xe(e.consequent, n), xe(e.alternative, n)) : e instanceof hi ? xe(e.tail_node(), n) : e instanceof rr && n(e.value);
    }
    function ke(n) {
        try {
            return JSON.parse(n);
        } catch (e) {
            throw new Error("invalid input source map: " + n);
        }
    }
    function Ee(n, t, e) {
        e.forEach(function(e) {
            t[e] && ("object" != typeof t[e] && (t[e] = {}), n in t[e] || (t[e][n] = t[n]));
        });
    }
    function Se(e) {
        e && ("props" in e ? e.props instanceof Un || (e.props = Un.fromObject(e.props)) : e.props = new Un());
    }
    function Te(e) {
        return {
            props: e.props.toObject()
        };
    }
    ie = "undefined" == typeof Buffer ? (te = atob, btoa) : void 0 === Buffer.alloc ? (te = function(e) {
        return new Buffer(e, "base64").toString();
    }, function(e) {
        return new Buffer(e).toString("base64");
    }) : (te = function(e) {
        return Buffer.from(e, "base64").toString();
    }, function(e) {
        return Buffer.from(e).toString("base64");
    }), _.Dictionary = Un, _.is_statement = Zn, _.List = In, _.minify = function(i, r) {
        try {
            (r = oe(r, {
                annotations: void 0,
                compress: {},
                enclose: !1,
                ie: !1,
                ie8: !1,
                keep_fnames: !1,
                mangle: {},
                nameCache: null,
                output: {},
                parse: {},
                rename: void 0,
                sourceMap: !1,
                timings: !1,
                toplevel: !1,
                v8: !1,
                validate: !1,
                warnings: !1,
                webkit: !1,
                wrap: !1
            }, !0)).validate && Gn.enable_validation();
            var e, n = r.timings && {
                start: Date.now()
            };
            void 0 === r.rename && (r.rename = r.compress && r.mangle), void 0 !== r.annotations && Ee("annotations", r, [ "compress", "output" ]),
            r.ie8 && (r.ie = r.ie || r.ie8), r.ie && Ee("ie", r, [ "compress", "mangle", "output" ]),
            r.keep_fnames && Ee("keep_fnames", r, [ "compress", "mangle" ]), r.toplevel && Ee("toplevel", r, [ "compress", "mangle" ]),
            r.v8 && Ee("v8", r, [ "mangle", "output" ]), r.webkit && Ee("webkit", r, [ "compress", "mangle", "output" ]),
            r.mangle && (r.mangle = oe(r.mangle, {
                cache: r.nameCache && (r.nameCache.vars || {}),
                eval: !1,
                ie: !1,
                keep_fnames: !1,
                properties: !1,
                reserved: [],
                toplevel: !1,
                v8: !1,
                webkit: !1
            }, !0), r.mangle.properties && ("object" != typeof r.mangle.properties && (r.mangle.properties = {}),
            r.mangle.properties.keep_quoted && (e = r.mangle.properties.reserved, Array.isArray(e) || (e = []),
            r.mangle.properties.reserved = e), !r.nameCache || "cache" in r.mangle.properties || (r.mangle.properties.cache = r.nameCache.props || {})),
            Se(r.mangle.cache), Se(r.mangle.properties.cache)), r.sourceMap && (r.sourceMap = oe(r.sourceMap, {
                content: null,
                filename: null,
                includeSources: !1,
                names: !0,
                root: null,
                url: null
            }, !0));
            var o, t = [];
            if (r.warnings && Gn.log_function(function(e) {
                t.push(e);
            }, "verbose" == r.warnings), n && (n.parse = Date.now()), i instanceof mt) o = i; else {
                "string" == typeof i && (i = [ i ]), r.parse = r.parse || {}, r.parse.toplevel = null;
                var a, s = r.sourceMap && r.sourceMap.content;
                for (u in (s = "string" == typeof s && "inline" != s ? ke(s) : s) && (r.sourceMap.orig = Object.create(null)),
                i) Vn(i, u) && (r.parse.filename = u, r.parse.toplevel = o = kr(i[u], r.parse),
                "inline" == s ? (a = function(e, n) {
                    for (var t = n.end.comments_after, i = t.length; 0 <= --i; ) {
                        var r = t[i];
                        if ("comment1" != r.type) break;
                        r = /^# ([^\s=]+)=(\S+)\s*$/.exec(r.value);
                        if (!r) break;
                        if ("sourceMappingURL" == r[1]) {
                            if (!(r = /^data:application\/json(;.*?)?;base64,(\S+)$/.exec(r[2]))) break;
                            return te(r[2]);
                        }
                    }
                    Gn.warn("inline source map not found: {name}", {
                        name: e
                    });
                }(u, o)) && (r.sourceMap.orig[u] = ke(a)) : s && (r.sourceMap.orig[u] = s));
            }
            e && (h = e, o.walk(new mr(function(e) {
                e instanceof Nt || e instanceof Mi ? e.start && e.start.quote && d(e.key) : e instanceof gi && xe(e.property, d);
            }))), [ "enclose", "wrap" ].forEach(function(e) {
                var n, t = r[e];
                t && (n = o.print_to_string().slice(0, -1), o = o[e](t), i[o.start.file] = o.print_to_string().replace(n, ""));
            }), r.validate && o.validate_ast(), n && (n.rename = Date.now()), r.rename && (o.figure_out_scope(r.mangle),
            o.expand_names(r.mangle)), n && (n.compress = Date.now()), r.compress && (o = new Tr(r.compress).compress(o),
            r.validate && o.validate_ast()), n && (n.scope = Date.now()), r.mangle && o.figure_out_scope(r.mangle),
            n && (n.mangle = Date.now()), r.mangle && (o.compute_char_frequency(r.mangle), o.mangle_names(r.mangle)),
            n && (n.properties = Date.now()), r.mangle && r.mangle.properties && function(e, t) {
                t = oe(t, {
                    builtins: !1,
                    cache: null,
                    debug: !1,
                    keep_quoted: !1,
                    regex: null,
                    reserved: null
                }, !0);
                var n = Object.create(t.builtins ? null : re);
                Array.isArray(t.reserved) && t.reserved.forEach(function(e) {
                    n[e] = !0;
                });
                var i, r = -1;
                t.cache ? (i = t.cache.props).each(function(e) {
                    n[e] = !0;
                }) : i = new Un();
                var o, a = t.regex, s = !1 !== t.debug;
                s && (o = !0 === t.debug ? "" : t.debug);
                var f = Object.create(null), c = Object.create(n);
                function u(e) {
                    return !c[e] && !/^-?[0-9]+(\.[0-9]+)?(e[+-][0-9]+)?$/.test(e);
                }
                function l(e) {
                    return !n[e] && ((!a || a.test(e)) && (i.has(e) || f[e]));
                }
                function p(e) {
                    u(e) && (f[e] = !0), l(e) || (c[e] = !0);
                }
                function d(e) {
                    if (!l(e)) return e;
                    var n, t = i.get(e);
                    if (!t) {
                        if (!s || u(n = "_$" + e + "$" + o + "_") && (t = n), !t) for (;!u(t = S(++r)); );
                        /^#/.test(e) && (t = "#" + t), i.set(e, t);
                    }
                    return t;
                }
                function h(e) {
                    e instanceof hi ? h(e.expressions.tail_node()) : e instanceof rr ? e.value = d(e.value) : e instanceof Ei && (h(e.consequent),
                    h(e.alternative));
                }
                e.walk(new mr(function(e) {
                    if (e instanceof ki) "in" == e.operator && xe(e.left, p); else if ("Call" == e.TYPE) {
                        var n = e.expression;
                        if (n instanceof _i) switch (n.property) {
                          case "defineProperty":
                          case "getOwnPropertyDescriptor":
                            if (e.args.length < 2) break;
                            if (!((n = n.expression) instanceof Xi)) break;
                            if ("Object" != n.name) break;
                            if (!n.definition().undeclared) break;
                            xe(e.args[1], p);
                            break;

                          case "hasOwnProperty":
                            if (e.args.length < 1) break;
                            xe(e.args[0], p);
                        }
                    } else e instanceof Nt ? "string" == typeof e.key && p(e.key) : e instanceof _i ? p(e.property) : e instanceof Mi ? "string" == typeof e.key && p(e.key) : e instanceof gi && xe(e.property, p);
                })), e.walk(new mr(function(e) {
                    if (e instanceof ki) "in" == e.operator && h(e.left); else if ("Call" == e.TYPE) {
                        var n = e.expression;
                        if (n instanceof _i) switch (n.property) {
                          case "defineProperty":
                          case "getOwnPropertyDescriptor":
                            if (e.args.length < 2) break;
                            if (!((n = n.expression) instanceof Xi)) break;
                            if ("Object" != n.name) break;
                            if (!n.definition().undeclared) break;
                            h(e.args[1]);
                            break;

                          case "hasOwnProperty":
                            if (e.args.length < 1) break;
                            h(e.args[0]);
                        }
                    } else e instanceof Nt ? "string" == typeof e.key && (e.key = d(e.key)) : e instanceof _i ? e.property = d(e.property) : e instanceof Mi ? "string" == typeof e.key && (e.key = d(e.key)) : e instanceof gi && (t.keep_quoted || h(e.property));
                }));
            }(o, r.mangle.properties), n && (n.output = Date.now());
            var f = {}, c = oe(r.output, {
                ast: !1,
                code: !0
            });
            if (c.ast && (f.ast = o), c.code) {
                if (r.sourceMap && (c.source_map = ee(r.sourceMap), r.sourceMap.includeSources)) {
                    if (i instanceof mt) throw new Error("original source content unavailable");
                    for (var u in i) Vn(i, u) && c.source_map.setSourceContent(u, i[u]);
                }
                delete c.ast, delete c.code;
                var l, p = Ar(c);
                o.print(p), f.code = p.get(), r.sourceMap && (f.map = c.source_map.toString(), (l = r.sourceMap.url) && (f.code = f.code.replace(/\n\/\/# sourceMappingURL=\S+\s*$/, ""),
                f.code += "inline" == l ? "\n//# sourceMappingURL=data:application/json;charset=utf-8;base64," + ie(f.map) : "\n//# sourceMappingURL=" + l));
            }
            return r.nameCache && r.mangle && (r.mangle.cache && (r.nameCache.vars = Te(r.mangle.cache)),
            r.mangle.properties && r.mangle.properties.cache && (r.nameCache.props = Te(r.mangle.properties.cache))),
            n && (n.end = Date.now(), f.timings = {
                parse: .001 * (n.rename - n.parse),
                rename: .001 * (n.compress - n.rename),
                compress: .001 * (n.scope - n.compress),
                scope: .001 * (n.mangle - n.scope),
                mangle: .001 * (n.properties - n.mangle),
                properties: .001 * (n.output - n.properties),
                output: .001 * (n.end - n.output),
                total: .001 * (n.end - n.start)
            }), t.length && (f.warnings = t), f;
        } catch (e) {
            return {
                error: e
            };
        } finally {
            Gn.log_function(), Gn.disable_validation();
        }
        function d(e) {
            Hn(h, e);
        }
        var h;
    }, _.parse = kr, _.push_uniq = Hn, _.TreeTransformer = _r, _.TreeWalker = mr;
}(UglifyJS);
export default UglifyJS
