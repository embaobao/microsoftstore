/** 导出路径配置
 * 路径配置描述
 */
module.exports.path = {
    style: {
        src: ["src/styles/**/*.css", "src/styles/**/*.sass", "src/styles/**/*.scss"],
        dest: "webroot/styles/"
    },
    script: {
        src: "src/scripts/**/*.js",
        dest: "webroot/scripts/"
    },
    html: {
        src: "src/**/*.html",
        dest: "webroot/"
    }
}




module.exports.pluginsConfig = {
    "gulp-clean-css": "cleanCss",
    "gulp-rename": "rename",
    "gulp-concat": "concat",
    "gulp-uglify": "uglify",
    "gulp-babel": "babel",
    "gulp-sass": "sass",
    "gulp-htmlmin": "htmlmin",
    "gulp-jshint": "jshint",
    "gulp-connect": "connect",
    "gulp-less": "less",
    "gulp-file-include": "include",
    "gulp-utf8-convert": "utf8Convert",
    "gulp-convert-encoding": "encoding"
}


/** 导出代理配置
 * 代理配置描述
 */
module.exports.serverConfig = {
    root: "./webroot",
    port: 8080,
    livereload: true,
    proxy: {
        "/baidu": {
            target: "https://www.baidu.com",
            changeOrigin: true,
            pathRewrite: {
                "^/baidu": ""
            }
        }
    }

}

// // 路径的配置对象描述 demo
// let path = {
//     styles: {
//         src: "src/styles/**/*.css",
//         dest: "webroot/styles/"
//     },
//     scripts: {
//         src: "src/scripts/**/*.js",
//         dest: "webroot/scripts/"
//     }
// }