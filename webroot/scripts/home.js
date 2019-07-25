import dao from "./model/dataEngine.js";
import render from "./model/renderEngine.js";

class HomePager {
    constructor() {
        console.log("欢迎来到 EMB microsoft store   首页");
        console.log("Loading initialize...");
        this.signinButton = $(".login-box");
        this.signinMenuPanel = $(".login-content");
        this.loginA = $(".login-btn");
        this.logintip = $(".logintip");
        this.hasLoginA = $(".haslogin");
        this.textLoginName = $(".textLoginName");
        this.toTopButton = $(".Global_ScrollToTop");
        this.productRecommend = $(".product-recommend");
        this.initialize();
    }
    initialize() {
        render("recomend");
        render("surface");
        render("office");
        render("xbox");
        render("hard");


        this.signinButton.on("click", $.proxy(this.showSigninMenuPanel, this));
        this.hasLoginA.on("click", $.proxy(this.exiteLogin, this));
        this.toTopButton.on("click", $.proxy(this.toTop, this));
        this.vailLogin();
        //隐藏回到东部按钮
        this.toTopButton.hide();
        let cHight = document.documentElement.clientHeight;

        $(window).scroll(() => {
            let offset = this.productRecommend.offset();
            let top = offset.top;
            let nowScrollTop = $("body,html").scrollTop();

            if (nowScrollTop > (top - cHight)) {
                this.toTopButton.show();

            } else {
                this.toTopButton.hide();
            }


        });

        console.log("Render HOME Pager success!");
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

    exiteLogin() {
        dao.db("__user", []);
        window.location.reload();
    }

    // 回到顶部
    toTop() {
        let speed = 100;
        let timer = setInterval(() => {
            speed += 10;
            let nowScrollTop = $("body,html").scrollTop();
            if (nowScrollTop <= 0) {
                clearInterval(timer);
            }
            $("body,html").scrollTop(nowScrollTop - speed);
        }, 10);

    }
}


export default function () {
    return new HomePager();
}