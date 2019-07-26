import dao from "./dataEngine.js";
import conf from "../config/cofig.js"
'use strict';

function _(selecter) {
    var ele = null; //待返回的对象
    return (ele = document.querySelectorAll(selecter)).length === 1 ? ele[0] : ele;
    //如果查找出元素的个数是1个那么，就返回匹配的选择符的伪数组的第一个，否则就返回全部
}

class RenderEngine {
    constructor(type, data, template, wrapper) {

        this.html = "";
        if (type) {
            // 如果type 存在
            this.type = type;
            if (template) {
                // 如果模板存在 
                this.template = template;
            } else {
                // 不存在寻找配置模板
                let temp = conf.data[type]["template"] ? conf.data[type]["template"] : "";
                this.template = temp;
            }

            // 如果容器存在
            if (wrapper) {
                this.wrapper = _(wrapper);
            } else {
                // 不存在 寻找配置容器
                let wrapper = conf.data[type]["wrapper"] ? conf.data[type]["wrapper"] : "";
                if (!wrapper) throw "请给个选择器吧！";
                this.wrapper = _(wrapper);
            }


        }

        return this.initailize(type, data);

    }



    async initailize(type, data) {
        if (type) {
            // 如果数据存在
            if (data) {
                this.render(data);
            } else {
                // 不存在 获取配置数据
                let res = await dao.done(type);
                this.data = res;
                this.render(res);
                return this;
            }
            // 如果类型不存在
        } else {
            return this.templateEngine;
        }


    }
    render(data) {
        this.wrapper.innerHTML = this.templateEngine(this.template,
            data);
        return this;
    }

    templateEngine(fn, data) {
        let html = "";
        data = Array.from(data);
        data.forEach(item => {
            html += fn(item);
        });
        return html;
    }

    parserEngine(template, data, isLoop = true) {
        data = Array.from(data);
        isLoop ? template = `<%data.forEach(item =>{%>` + template + `<%});%>` : "";
        var html = "";
        var regExe = /<%[^=](.*?)%>/g;
        var regVar = /<%=(.*?)%>/g;
        var outExe = template.replace(regExe, `\`);$1 print(\``);
        outExe = outExe.replace(regVar, `\`); print($1); print(\``);
        outExe = `print(\`${outExe}\`)`;
        eval(outExe);

        function print(str) {
            html += str;
        }
        return html;
    }

}

export default function (type, data, template, wrapper) {
    // type, data, template, wrapper
    return new RenderEngine(type, data, template, wrapper);
};




// console.log(data);
//         // let loadimg = `https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563244462837&di=d361b540ec57ea7c054a94e5a403b835&imgtype=0&src=http%3A%2F%2Fphotocdn.sohu.com%2F20150605%2Fmp17826536_1433492197010_5.gif`;
// (item, ) => {
//     return `<div class="box">
//                           <div class ="box-img"
//                           style = "height:${ parseInt(235 / item.photo.width * item.photo.height)}px" >
//                                 <img src = "${loadimg}"
//                                 data-src = "${item.photo.path}"
//                                 alt = "" >
//                                 <u style = "height:${parseInt(235 / item.photo.width * item.photo.height)}px" > < /u>
//                           </div>
//                           <div class="box-detail">
//                                 <div class="title">
//                                       ${item.album.name}
//                                 </div>
//                           </div>
//                     </div>`
// }