import conf from "../config/cofig.js"

function Data() {};
$.extend(
    Data.prototype, {
        get: function (dataName) {
            if (conf.data[dataName].data !== null && conf.data[dataName].data instanceof Object && JSON.stringify(conf.data[dataName].data) !== "{}") {
                $.ajax(conf.data[dataName].url, {
                    data: conf.data[dataName].data
                });
            }
            return $.ajax(conf.data[dataName].url);
        },
        done: function (dataName) {
            return new Promise(function (resolve, reject) {
                if (conf.data[dataName].data !== null && conf.data[dataName].data instanceof Object && JSON.stringify(conf.data[dataName].data) !== "{}") {
                    $.ajax(conf.data[dataName].url, {
                        data: conf.data[dataName].data
                    }).then((res) => {
                        resolve(res);
                    });
                } else {
                    $.ajax(conf.data[dataName].url).then((res) => {

                        resolve(res);
                    });
                };
            }).then((res) => {
                let datacachs = [];
                for (const key in res) {
                    let item = res[key];
                    datacachs = datacachs.concat(item);
                }
                // console.log(datacachs);
                new Data().db("__cach", datacachs);
                let datapath = conf.data[dataName].datapath ? conf.data[dataName].datapath : [];
                datapath.forEach(attr => {
                    res = res[attr] ? res[attr] : res;
                    this.res = res;
                })

                return res
            });
        },
        db: function (key, val) {
            let v = localStorage.getItem(key);
            v ? "" : localStorage.setItem(key, "[]");
            v = JSON.parse(localStorage.getItem(key));
            if (arguments.length === 1) {
                return v;
            } else {
                if (val instanceof Array) {
                    localStorage.setItem(key, JSON.stringify(val));
                } else if (val && typeof val === "object") {
                    v.push(val)
                    v = JSON.stringify(v);
                    localStorage.setItem(key, v);
                }

            }
        },
        cach: function (fn) {
            let cachs = this.db("__cach");
            if (cachs && cachs instanceof Array) {
                fn ? cachs.forEach(fn):"";
            } else {
                return false;
            }
            return cachs;
        }
    }
)

export default new Data();