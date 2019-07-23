class Main {
    constructor() {
        console.log("Loading initialize...");
        if ($) console.log("JQuery is  Loaded ...");
        else {
            throw Error("JQuery is not vaild！please check your url path or code!");
        }
        this.initialize();

    }
    initialize() {
        this.swiper();
    }

    swiper() {
       
    }
}

export default function () {
    return new Main(arguments);
};