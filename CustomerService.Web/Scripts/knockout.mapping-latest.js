// Knockout Mapping plugin v1.0pre
// (c) 2011 Steven Sanderson, Roy Jacobs - http://knockoutjs.com/
// License: Ms-Pl (http://www.opensource.org/licenses/ms-pl.html)

ko.exportSymbol = function(q, u) {
    for (var i = q.split("."), r = window, o = 0; o < i.length - 1; o++)r = r[i[o]];
    r[i[i.length - 1]] = u
};
ko.exportProperty = function(q, u, i) { q[u] = i };
(function() {
    function q(a) {
        if (a && typeof a === "object" && a.constructor == (new Date).constructor)return"date";
        return typeof a
    }

    function u() {
        ko.dependentObservable = function(a, b, c) {
            c = c || {};
            c.deferEvaluation = true;
            a = new x(a, b, c);
            a.__ko_proto__ = x;
            return a
        }
    }

    function i(a, b, c, d, e, s) {
        var h = ko.utils.unwrapObservable(b) instanceof Array;
        if (ko.mapping.isMapped(a))c = ko.utils.unwrapObservable(a)[l];
        d = d || new A;
        if (d.get(b))return a;
        e = e || "";
        if (h) {
            s = [];
            var g = function(f) { return f };
            if (c[e] && c[e].key)g = c[e].key;
            if (!ko.isObservable(a)) {
                a =
                    ko.observableArray([]);
                a.mappedRemove = function(f) {
                    var j = typeof f == "function" ? f : function(k) { return k === g(f) };
                    return a.remove(function(k) { return j(g(k)) })
                };
                a.mappedRemoveAll = function(f) {
                    var j = v(f, g);
                    return a.remove(function(k) { return ko.utils.arrayIndexOf(j, g(k)) != -1 })
                };
                a.mappedDestroy = function(f) {
                    var j = typeof f == "function" ? f : function(k) { return k === g(f) };
                    return a.destroy(function(k) { return j(g(k)) })
                };
                a.mappedDestroyAll = function(f) {
                    var j = v(f, g);
                    return a.destroy(function(k) {
                        return ko.utils.arrayIndexOf(j,
                            g(k)) != -1
                    })
                };
                a.mappedIndexOf = function(f) {
                    var j = v(a(), g);
                    f = g(f);
                    return ko.utils.arrayIndexOf(j, f)
                }
            }
            h = v(ko.utils.unwrapObservable(a), g).sort();
            var p = v(b, g).sort();
            h = ko.utils.compareArrays(h, p);
            p = [];
            for (var y = 0, D = h.length; y < D; y++) {
                var t = h[y], m;
                switch (t.status) {
                case "added":
                    var n = o(ko.utils.unwrapObservable(b), t.value, g);
                    m = ko.utils.unwrapObservable(i(undefined, n, c, d, e, a));
                    n = ko.utils.arrayIndexOf(ko.utils.unwrapObservable(b), n);
                    p[n] = m;
                    break;
                case "retained":
                    n = o(ko.utils.unwrapObservable(b), t.value, g);
                    m =
                        o(a, t.value, g);
                    i(m, n, c, d, e, a);
                    n = ko.utils.arrayIndexOf(ko.utils.unwrapObservable(b), n);
                    p[n] = m;
                    break;
                case "deleted":
                    m = o(a, t.value, g)
                }
                s.push({ event: t.status, item: m })
            }
            a(p);
            c[e] && c[e].arrayChanged && ko.utils.arrayForEach(s, function(f) { c[e].arrayChanged(f.event, f.item) })
        } else if (z(b)) {
            if (!a)
                if (c[e] && c[e].create instanceof Function) {
                    u();
                    m = c[e].create({ data: b, parent: s });
                    ko.dependentObservable = x;
                    return m
                } else a = {};
            d.save(b, a);
            B(b, function(f) {
                var j = d.get(b[f]);
                a[f] = j ? j : i(a[f], b[f], c, d, f, a);
                c.mappedProperties[C(e,
                    b, f)] = true
            })
        } else
            switch (q(b)) {
            case "function":
                a = b;
                break;
            default:
                if (ko.isWriteableObservable(a))a(ko.utils.unwrapObservable(b));
                else a = ko.observable(ko.utils.unwrapObservable(b))
            }
        return a
    }

    function r(a, b) {
        var c;
        if (b)c = b(a);
        c || (c = a);
        return ko.utils.unwrapObservable(c)
    }

    function o(a, b, c) {
        a = ko.utils.arrayFilter(ko.utils.unwrapObservable(a), function(d) { return r(d, c) == b });
        if (a.length == 0)throw Error("When calling ko.update*, the key '" + b + "' was not found!");
        if (a.length > 1 && z(a[0]))
            throw Error("When calling ko.update*, the key '" +
                b + "' was not unique!");
        return a[0]
    }

    function v(a, b) { return ko.utils.arrayMap(ko.utils.unwrapObservable(a), function(c) { return b ? r(c, b) : c }) }

    function B(a, b) {
        if (a instanceof Array)for (var c = 0; c < a.length; c++)b(c);
        else for (c in a)b(c)
    }

    function z(a) { return q(a) == "object" && a !== null && a !== undefined }

    function C(a, b, c) {
        var d = a || "";
        if (b instanceof Array) {
            if (a)d += "[" + c + "]"
        } else {
            if (a)d += ".";
            d += c
        }
        return d
    }

    function A() {
        var a = [], b = [];
        this.save = function(c, d) {
            var e = ko.utils.arrayIndexOf(a, c);
            if (e >= 0)b[e] = d;
            else {
                a.push(c);
                b.push(d)
            }
        };
        this.get = function(c) {
            c = ko.utils.arrayIndexOf(a, c);
            return c >= 0 ? b[c] : undefined
        }
    }

    ko.mapping = {};
    var l = "__ko_mapping__", x = ko.dependentObservable, w = { include: ["_destroy"], ignore: [] };
    ko.mapping.fromJS = function(a, b, c) {
        if (arguments.length == 0)throw Error("When calling ko.fromJS, pass the object you want to convert.");
        var d = b;
        d = d || {};
        if (d.create instanceof Function || d.key instanceof Function || d.arrayChanged instanceof Function)d = { "": d };
        d.mappedProperties = {};
        b = d;
        d = i(c, a, b);
        d[l] = d[l] || {};
        d[l] = b;
        return d
    };
    ko.mapping.fromJSON = function(a, b) {
        var c = ko.utils.parseJson(a);
        return ko.mapping.fromJS(c, b)
    };
    ko.mapping.isMapped = function(a) { return(a = ko.utils.unwrapObservable(a)) && a[l] };
    ko.mapping.updateFromJS = function(a, b) {
        if (arguments.length < 2)throw Error("When calling ko.updateFromJS, pass: the object to update and the object you want to update from.");
        if (!a)throw Error("The object is undefined.");
        if (!a[l])throw Error("The object you are trying to update was not created by a 'fromJS' or 'fromJSON' mapping.");
        return i(a, b, a[l])
    };
    ko.mapping.updateFromJSON = function(a, b, c) {
        b = ko.utils.parseJson(b);
        return ko.mapping.updateFromJS(a, b, c)
    };
    ko.mapping.toJS = function(a, b) {
        if (arguments.length == 0)throw Error("When calling ko.mapping.toJS, pass the object you want to convert.");
        b = b || {};
        b.ignore = b.ignore || w.ignore;
        if (!(b.ignore instanceof Array))b.ignore = [b.ignore];
        b.include = b.include || w.include;
        if (!(b.include instanceof Array))b.include = [b.include];
        return ko.mapping.visitModel(a, function(c) { return ko.utils.unwrapObservable(c) },
            b)
    };
    ko.mapping.toJSON = function(a, b) {
        var c = ko.mapping.toJS(a, b);
        return ko.utils.stringifyJson(c)
    };
    ko.mapping.defaultOptions = function() {
        if (arguments.length > 0)w = arguments[0];
        else return w
    };
    ko.mapping.visitModel = function(a, b, c) {
        c = c || {};
        c.visitedObjects = c.visitedObjects || new A;
        var d, e = ko.utils.unwrapObservable(a);
        if (z(e)) {
            b(a, c.parentName);
            d = e instanceof Array ? [] : {}
        } else return b(a, c.parentName);
        c.visitedObjects.save(a, d);
        var s = c.parentName;
        B(e, function(h) {
            if (!(c.ignore && ko.utils.arrayIndexOf(c.ignore,
                h) != -1)) {
                var g = e[h];
                c.parentName = C(s, e, h);
                if (c.include && ko.utils.arrayIndexOf(c.include, h) === -1)if (e[l] && e[l].mappedProperties && !e[l].mappedProperties[h] && !(e instanceof Array))return;
                switch (q(ko.utils.unwrapObservable(g))) {
                case "object":
                case "undefined":
                    var p = c.visitedObjects.get(g);
                    d[h] = p !== undefined ? p : ko.mapping.visitModel(g, b, c);
                    break;
                default:
                    d[h] = b(g, c.parentName)
                }
            }
        });
        return d
    };
    ko.exportSymbol("ko.mapping", ko.mapping);
    ko.exportSymbol("ko.mapping.fromJS", ko.mapping.fromJS);
    ko.exportSymbol("ko.mapping.fromJSON",
        ko.mapping.fromJSON);
    ko.exportSymbol("ko.mapping.isMapped", ko.mapping.isMapped);
    ko.exportSymbol("ko.mapping.defaultOptions", ko.mapping.defaultOptions);
    ko.exportSymbol("ko.mapping.toJS", ko.mapping.toJS);
    ko.exportSymbol("ko.mapping.toJSON", ko.mapping.toJSON);
    ko.exportSymbol("ko.mapping.updateFromJS", ko.mapping.updateFromJS);
    ko.exportSymbol("ko.mapping.updateFromJSON", ko.mapping.updateFromJSON);
    ko.exportSymbol("ko.mapping.visitModel", ko.mapping.visitModel)
})();