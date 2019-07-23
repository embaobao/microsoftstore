import dao from "./dataEngine.js";
import conf from "../config/cofig.js"
'use strict';
class RenderEngine {
    constructor(data, type, template, remotedata) {
        this.template = conf.template[template];
        this.data = data;
        this.html = "";
        this.initailize(data, type);
        return this;
    }
    initailize(data, type) {
       
    }
  

    render() {

    }


    Parser(template, data) {
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

export default function (data, type) {
    return new RenderEngine(data, type);
};