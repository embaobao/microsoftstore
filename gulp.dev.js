let {
    path,
    serverConfig,
    pluginsConfig
} = require("./gulp.config.js");

let gulp = require("gulp");
const plugins = require("gulp-load-plugins")({
    rename: pluginsConfig
});

let proxy = require("http-proxy-middleware");
plugins.sass.compiler = require("node-sass");


//处理CSS 的方法=> 找到CSS放进管道转存
function styles() {
    //找文件 
    return gulp.src(path.style.src)
        //解析Sass
        .pipe(plugins.sass().on("error", plugins.sass.logError))
        // 转存CSS
        .pipe(gulp.dest(path.style.dest))
        //改变后重新加载 
        .pipe(plugins.connect.reload());
}

function scripts() {
    // 找JS文件
    return gulp.src(path.script.src)
        //解析ES6=>ES5
        // .pipe(
        //     plugins.babel({
        //         // "presets": ["@babel/preset-env"]
        //         presets: ['@babel/env']
        //     })
        // )
        // 转存js
        .pipe(gulp.dest(path.script.dest))
        //改变后重新加载 
        .pipe(plugins.connect.reload());
}

function htmls() {
    // 找html文件
    return gulp.src( path.html.src)
        // .pipe(plugins.utf8Convert({
        //     encNotMatchHandle: function (notify) {
        //         console.log(notify + " 编码不正确，大人请速速修改！");
        //     }
        // }))
        // .pipe(plugins.encoding({
        //     to: "UTF8"
        // }))
        // 模板引擎解析
        .pipe(
            plugins.include({
                prefix: '@@',
                basepath: '@file'
            })
        )
        // // utf8 编码
        .pipe(plugins.utf8Convert({
            encNotMatchHandle: function (notify) {
                console.log(notify + " 编码不正确，大人请速速修改！");
            }
        }))
        // 转存HTMl
        .pipe(gulp.dest(path.html.dest))
        .pipe(plugins.connect.reload());
}

function watch() {
    //查看源文件的变化， 并作出相应 执行 
    //查看 style 源文件的变化 并执行styles
    gulp.watch(path.style.src, styles);
    //查看 script 源文件的变化 scriptscls
    gulp.watch(path.script.src, scripts);
    //查看 html 源文件的变化 htmls
    gulp.watch(path.html.src, htmls);
}

function setup() {
    plugins.connect.server({

        root: serverConfig.root,
        port: serverConfig.port,
        livereload: serverConfig.livereload,
        middleware: function () {
            let proxys = [];
            let proxyConfig = serverConfig.proxy;
            for (let attr in proxyConfig) {
                proxys.push(proxy(attr, proxyConfig[attr]));
            }
            return proxys;
        }
    });
}


let build = gulp.series(styles, scripts, htmls, gulp.parallel(setup, watch));



exports.devscript = scripts;
exports.devstyle = styles;
exports.devhtml = htmls;
exports.devwatch = watch;
exports.dev = build;
exports.default = build;



//gulp.parallel(styles), gulp.parallel(scripts)
// 原配置
// let {
//     path,
//     serverConfig
// } = require("./gulp.config.js");
// let gulp = require("gulp");
// let babel = require("gulp-babel");
// let sass = require("gulp-sass");
// let connect = require("gulp-connect");
// let proxy = require("http-proxy-middleware");
// sass.compiler = require("node-sass");