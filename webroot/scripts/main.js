import homeview from "./home.js";
import detailview from "./detail.js";
import shopcartview from "./shopcart.js";
import signinview from "./login.js";
import activeview from "./active.js";
import dao from "./model/dataEngine.js";
class Main {
    constructor() {
        // jquery 检测
        if (!$) throw Error("JQuery is not vaild！please check your url path or code!");
        this.initialize();
    }

    public() {
        this.signinButton = $(".login-box");
        this.signinMenuPanel = $(".login-content");
        this.loginA = $(".login-btn");
        this.logintip = $(".logintip");
        this.hasLoginA = $(".haslogin");
        this.textLoginName = $(".textLoginName");
        // pubblic
        //绑定事件
        //登录容器的事件
        this.signinButton.on("click", $.proxy(this.showSigninMenuPanel, this));
        // 登录连接的按钮
        this.hasLoginA.on("click", $.proxy(this.exiteLogin, this));
        //验证登录
        this.vailLogin();
        console.log("加载公共处理模块完成！");
    }

    initialize() {
        let nowPath = window.location.pathname;
        let isIndex = nowPath.indexOf("index.html") > 0 || nowPath === "/views/";
        let isDetial = nowPath.indexOf("detail.html") > 0;
        let isShopCar = nowPath.indexOf("shopcart.html") > 0;
        let isLogin = nowPath.indexOf("signin.html") > 0;
        let isActive = nowPath.indexOf("active.html") > 0;
        let isPrvLog = nowPath.indexOf("login.html") > 0;
        if (isIndex) {
            homeview();
            this.public();
        }
        if (isPrvLog) {
            this.public();
        }
        if (isDetial) {
            detailview();

            this.public();
        }
        if (isShopCar) {
            shopcartview();
            this.public();
        }
        if (isLogin) {
            signinview();
        }
        if (isActive) {
            activeview();
            this.public();
        }

    }


    //显示 ,隐藏 登录菜单
    showSigninMenuPanel(ev) {
        this.signinButton.toggleClass("active");
        this.signinMenuPanel.toggle();
    }

    // 账户自验证 
    vailLogin() {
        let user = dao.user();
        if (user) {
            this.textLoginName.text(user.name);
            this.loginA.hide();
            this.logintip.attr("href", "./");
            this.logintip.html("<div>不是尊敬的" + user.name + "大人吗?</div>");
            this.hasLoginA.show();
            $.get("http://localhost/service/", user, function (res) {
                if (res.status !== "pass") {
                    dao.db("__user", []);
                }
            }, "json");
        } else {

        }

    }

    // 退出登录
    exiteLogin() {
        // 删除用户的数据
        dao.db("__user", []);
        // 页面刷新
        window.location.reload();
    }

}

export default function () {
    return new Main(arguments);
};