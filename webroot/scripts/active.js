import dao from "./model/dataEngine.js";
import render from "./model/renderEngine.js";
import viewPager from "./viewpager.plugins.js"
class ActivePager {

    constructor() {
        console.log("active pager initialize ...")
        this.toTopButton = $(".Global_ScrollToTop");
        //隐藏回到顶部按钮
        this.toTopButton.hide();
        this.surfaceMainList = $(".surfaceMainList");
        this.initialize();
    }
    initialize() {

        // windows 的 滚动事件绑定
        $(window).scroll(() => {
            let nowScrollTop = $("body,html").scrollTop();
            //回到顶部
            this.toTopViewHandler(nowScrollTop);
            // 懒加载显示
            // this.showLazyLoad(nowScrollTop);
        });

        // 回到顶部
        this.toTopButton.on("click", $.proxy(this.toTopClickHandler, this));

        this.viewpager();
    }

    // 轮播图
    viewpager() {
        viewPager(".viewpager");
    }


    //显示回到顶部和隐藏回到顶部
    toTopViewHandler(scrollTop) {
        let top = this.surfaceMainList.offset().top;
        if (scrollTop > top) {
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
    return new ActivePager();
}