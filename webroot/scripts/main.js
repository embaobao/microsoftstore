import dao from "./model/dataEngine.js"

class Main {
    constructor() {

        if ($) console.log("JQuery is  Loaded ...");
        else {
            throw Error("JQuery is not vaild！please check your url path or code!");
        }
        console.log("Loading initialize...");
        this.initialize();
    }
    initialize() {
        dao.done("recomend").then((result) => {
            console.log(result);
        });

        dao.done("surface").then((result) => {
            console.log(result);
        });


        dao.done("office").then((result) => {
            console.log(result);
        });


        dao.done("xbox").then((result) => {
            console.log(result);
        });


        dao.done("hard").then((result) => {
            console.log(result);
        });
    }

    

    data() {

    }


}

export default function () {
    return new Main(arguments);
};