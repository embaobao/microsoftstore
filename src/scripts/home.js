import dao from "./model/dataEngine.js";
import render from "./model/renderEngine.js";

class HomePager {
    constructor() {
        console.log("欢迎来到 EMB microsoft store   首页 ，Loading initialize...");

        // public
        // this.signinButton = $(".login-box");
        // this.signinMenuPanel = $(".login-content");
        // this.loginA = $(".login-btn");
        // this.logintip = $(".logintip");
        // this.hasLoginA = $(".haslogin");
        // this.textLoginName = $(".textLoginName");

        this.toTopButton = $(".Global_ScrollToTop");
        this.productRecommend = $(".product-recommend");
        this.initialize();
    }
    async initialize() {

        //渲染视图
        await render("navgoods");
        await render("recomend");
        await render("surface");
        await render("office");
        await render("xbox");
        await render("hard");

        this.lazyloadImgs = $(".img .lazyloaded");
        //生成视图缓存 实现无视觉懒加载预处理
        this.imgCachLoaded();
       
        // // pubblic
        // //绑定事件
        // //登录容器的事件
        // this.signinButton.on("click", $.proxy(this.showSigninMenuPanel, this));
        // // 登录连接的按钮
        // this.hasLoginA.on("click", $.proxy(this.exiteLogin, this));



        // 回到顶部
        this.toTopButton.on("click", $.proxy(this.toTopClickHandler, this));

        //隐藏回到顶部按钮
        this.toTopButton.hide();

        // 获取可视窗体的高度
        this.cHeight = document.documentElement.clientHeight;

        // windows 的 滚动事件绑定
        $(window).scroll(() => {
            let nowScrollTop = $("body,html").scrollTop();
            //回到顶部
            this.toTopViewHandler(nowScrollTop);
            // 懒加载显示
            // this.showLazyLoad(nowScrollTop);
        });

        console.log("Render HOME Pager success!");
    }


    // 图片缓存 
    lazyLoad(loadImg, url) {
        let img = new Image();
        img.onload = function () {
            loadImg.src = img.src;
            loadImg.style.opacity = "1";
        }
        img.src = url;
    }
    //加载 图片缓存 
    imgCachLoaded() {
        // 懒加载元素
        $.each(this.lazyloadImgs, (index, img) => {
            this.lazyLoad(img, img.attr("data-src"));
        });
    }


    //显示回到顶部和隐藏回到顶部
    toTopViewHandler(scrollTop) {
        let top = this.productRecommend.offset().top;
        if (scrollTop > (top - this.cHeight)) {
            this.toTopButton.show();
        } else {
            this.toTopButton.hide();
        }
    }
    // 回到顶部 点击事件
    toTopClickHandler() {
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