import dao from "./model/dataEngine.js";
import render from "./model/renderEngine.js";

class HomePager {
    constructor() {

        console.log("欢迎来到首页");
        console.log("Loading initialize...");

        this.initialize();
    }
    initialize() {
        render("recomend");
        render("surface");
        render("office");
        render("xbox");
        render("hard");
        console.log("Render Pager success!");
    }
}


export default function () { 
    return new HomePager();
} 