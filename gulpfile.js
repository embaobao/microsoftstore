let {
    path,
    serverConfig,
    pluginsConfig
} = require("./gulp.config.js");
let {
    devscript,
    devstyle,
    devhtml,
    devwatch,
    dev,
} = require("./gulp.dev");
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
        // 合并处理
        .pipe(plugins.concat("main.css"))
        //解析less
        // // .pipe(plugins.less())
        //解析Sass
        .pipe(plugins.sass().on("error", plugins.sass.logError))
        //清理,压缩css 
        .pipe(plugins.cleanCss())
        //重命名
        .pipe(plugins.rename({
            suffix: ".min"
        }))
        // 转存CSS
        .pipe(gulp.dest(path.style.dest))
        //改变后重新加载 
        .pipe(plugins.connect.reload());
}

function scripts() {
    // 找JS文件
    return gulp.src(path.script.src)
        // 合并处理
        .pipe(plugins.concat("main.js"))
        //解析ES6=>ES5
        .pipe(
            plugins.babel({
                // "presets": ["@babel/preset-env"]
                presets: ['@babel/env']
            })
        )
        .pipe(plugins.jshint())

        .pipe(plugins.jshint.reporter('default'))
        // 压缩js
        .pipe(plugins.uglify())
        //重命名
        .pipe(plugins.rename({
            suffix: ".min"
        }))
        // 转存js
        .pipe(gulp.dest(path.script.dest))
        //改变后重新加载 
        .pipe(plugins.connect.reload());
}

function htmls() {
    // 找html文件
    return gulp.src(path.html.src)
        .pipe(plugins.htmlmin({
            collapseWhitespace: true
        }))
        .pipe(
            plugins.include({
                prefix: '@@',
                basepath: '@file'
            })
        )
        // utf8 编码
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
        //服务器根目录
        root: serverConfig.root,
        // 服务器端口
        port: serverConfig.port,
        // 服务器改变源文件刷新
        livereload: serverConfig.livereload,
        //服务器代理配置
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

exports.style = styles;
exports.script = scripts;
exports.html = htmls;
exports.watch = watch;
exports.devstyle = devstyle;
exports.devscript = devscript;
exports.devwatch = devwatch;
exports.devhtml = devhtml;
exports.dev = dev;
exports.build = build;
exports.default = dev;

//gulp.parallel(styles), gulp.parallel(scripts)

// // 正常配置
// let cleanCss = require("gulp-clean-css");
// let rename = require("gulp-rename");
// let concat = require("gulp-concat");
// let uglify = require("gulp-uglify");
// let babel = require("gulp-babel");
// let sass = require("gulp-sass");
// const htmlmin = require('gulp-htmlmin');
// const jshint = require('gulp-jshint');
// let connect = require("gulp-connect");
// var less = require('gulp-less');