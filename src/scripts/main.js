import homeview from "./home.js"
import detailview from "./detail.js"
import shopcartview from "./shopcart.js"
import signinview from "./login.js"
class Main {
    constructor() {
        // jquery 检测
        if (!$) throw Error("JQuery is not vaild！please check your url path or code!");
        this.initialize();
    }

    initialize() {
        let nowPath = window.location.pathname;
        let isIndex = nowPath.indexOf("index.html") > 0 || nowPath === "/views/";
        let isDetial = nowPath.indexOf("detail.html") > 0;
        let isShopCar = nowPath.indexOf("shopcart.html") > 0;
        let isLogin = nowPath.indexOf("signin.html") > 0;

        if (isIndex) {
            homeview();
        }
        if (isDetial) {
            detailview();
        }
        if (isShopCar) {
            shopcartview();
        }
        if (isLogin) {
            signinview();
        }

    }

}

export default function () {
    return new Main(arguments);
};