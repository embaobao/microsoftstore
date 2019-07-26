function _(selecter) {
    var ele = null; //待返回的对象
    return (ele = document.querySelectorAll(selecter)).length === 1 ? ele[0] : ele;
    //如果查找出元素的个数是1个那么，就返回匹配的选择符的伪数组的第一个，否则就返回全部
}

Node.prototype._ = function (selector) {
    var e = null;
    return (e = this.querySelectorAll(selector)).length === 1 ? e[0] : e;
}

/**
 * 元素的 样式类删除
 */
Node.prototype.classRemove = function (className) {
    return this.className = this.className.replace(new RegExp("\S?" + className), "");
}

// 
/**
 * 元素的 样式类添加  
 *
 * @param{className 类名}
 * @param{ notJudge 是否判断存在 可否进行重复添加 }
 * @returns undefine
 */
Node.prototype.classAdd = function (className, notJudge) {
    var hasClassReg = new RegExp(className, "g")
    var isNotJudge = false;
    notJudge ? isNotJudge = notJudge : "";
    if (isNotJudge) {
        this.className += (" " + className);
    } else {
        hasClassReg.test(this.className) ? this.className = this.className.replace(hasClassReg, className) : this.className += (" " + className);
    }
}

Element.prototype.html = function (html) {
    if (!arguments[0]) return this.innerHTML;
    this.innerHTML = html;
}

Element.prototype.attr = function attr(key, val) {
    if (arguments.length > 1) //如果值为2个 则为设置
    {
        return this.setAttribute(key, val);
    } else {
        return this.getAttribute(key); //如果值为1个 则为获取
    }
}
class ViewPager {
    constructor(selector, option) {
        this.modeList = [
            "slide", "fade"
        ]
        // 轮播域
        this.domain = _(selector);
        // 轮播项配置
        this.config = Object.assign({
                mode: "slide",
                pagination: true,
                autoPlay: 2000,
                autohide: true
            },
            option
        )
        // 轮播视图组
        this.pager = _(".pager");
        this.views = _(".view");
        // 前进后退的按钮
        this.bt_next = _(".button-next");
        this.bt_prev = _(".button-prev");
        //页码容器
        this.pagination = _(".pagination");
        // 公共变量 轮播视图标识
        this.INDEX = 0;

        // 轮播计时器
        this.timer = null;
        this.ini();
    }

    ini() {
        //  初始化 轮播域 配置、环境 预处理 
        this.ConfigProcess.call(this);
        // 轮播域 事件绑定
        this.domain.addEventListener("click", this.domainClickHandler.bind(this));
        // 前进后退的按钮   事件绑定
        this.bt_prev.addEventListener("click", this.prevClickHandler.bind(this));
        this.bt_next.addEventListener("click", this.nextClickHandler.bind(this));

        // 处理轮播时的效果，关闭自动
        this.domain.addEventListener("mouseenter", this.stop.bind(this));
        this.domain.addEventListener("mouseleave", this.autoPlay.bind(this));
        console.log("ViewPager loading !!");
        //暴露全局变量
        window.__viewPager = this;
    }
    ConfigProcess() {
        var mode = this.config.mode;
        switch (mode) {
            case "fade":
                this.styleProcess.call(this, mode);
                break;
            case "slide":
                this.slideCloneView = this.views[0].cloneNode(true);
                this.pager.appendChild(this.slideCloneView);
                this.views = [].slice.call(this.views);
                this.views.push(this.slideCloneView);
                this.styleProcess.call(this, mode);
                break;
            default:

                break;
        }

        if (this.config.pagination) {
            var onClass = "pagination-vein-active"
            var html = "";
            for (var i = 0; i < this.views.length; i++) {
                var pagiVien = `<div class="pagination-vein" pg-index=${i}></div>`
                var pagiVienOn = `<div class="pagination-vein ${onClass}" pg-index=${i}></div>`
                var pagiVienHide = `<div class="pagination-vein hide" pg-index=${i}></div>`
                if (i === 0) {
                    html += pagiVienOn;
                } else if (mode === "slide" && i === this.views.length - 1) {
                    html += pagiVienHide;
                } else {
                    html += pagiVien;
                }
            }
            if (this.config.autoPlay) {
                this.autoPlay(this.config.autoPlay);
            }

            this.pagination.html(html);
            this.paginationViens = this.pagination._(".pagination-vein");
        }

    }

    fadeHandler() {
        [].slice.call(this.views).forEach(element => {
            element.style.opacity = 0;
            element.style.transition = "all .6s";
        });
        this.views[this.INDEX].style.opacity = 1;
    }

    slideHandler() {

        if (this.INDEX === 0 && this.isNext) {
            this.pager.style.transition = "top .6s";
            this.pager.style.left = "0px";
            setTimeout(function () {
                this.pager.style.transition = "left .6s";
                var event = new Event("click", {
                    bubbles: true,
                    cancelable: true
                });
                this.bt_next.dispatchEvent(event);
            }.bind(this), 0);
        } else if (this.INDEX === this.views.length - 1 && !this.isNext) {
            this.pager.style.transition = "top .6s";
            this.pager.style.left = -(this.INDEX) * this.domain.offsetWidth + "px"
            setTimeout(function () {
                this.pager.style.transition = "left .6s";
                var event = new Event("click", {
                    bubbles: true,
                    cancelable: true
                });
                this.bt_prev.dispatchEvent(event);
            }.bind(this), 0);
        } else {
            this.pager.style.transition = "left .6s";
            this.pager.style.left = "0px";
            setTimeout(function () {
                this.pager.style.left = -this.INDEX * this.domain.offsetWidth + "px"
            }.bind(this), 0);
        }

    }

    styleProcess(mode) {

        this.modeList.forEach(element => {
            this.domain.classRemove(element + "-mode");
        });
        switch (mode) {
            case "fade":
                this.domain.classAdd(mode + "-mode");
                this.views[this.INDEX].classAdd(" view-on ");
                break;
            case "slide":
                this.slideCount = this.views.length;
                this.pager.style.width = this.domain.offsetWidth * this.slideCount + "px";
                [].slice.call(this.views).forEach(element => {
                    element.style.width = this.domain.offsetWidth + "px";
                });
                this.domain.classAdd(mode + "-mode");
                this.views[this.INDEX].classAdd(" view-on ");
                break;
            default:

                break;
        }

    }

    domainClickHandler(ev) {
        var e = ev || window.event;
        var capture = e.target || e.srcElement;
        if (capture.className.indexOf("pagination-vein") !== -1) {
            [].slice.call(this.paginationViens).forEach((element, index) => {
                element.classRemove("pagination-vein-active");
                if (capture === element) {
                    this.INDEX = element.attr("pg-index");
                }
            });
        }
        [].slice.call(this.paginationViens).forEach((element, index) => {
            element.classRemove("pagination-vein-active");
            if (element.attr("pg-index") === this.INDEX + "") {
                element.classAdd("pagination-vein-active");
                if (element.attr("pg-index") === this.views.length - 1 + "") {
                    this.paginationViens[0].classAdd("pagination-vein-active");
                }
            }
        });
        this[this.config.mode + "Handler"].call(this);
    }

    prevClickHandler() {
        this.isNext = false;
        this.INDEX <= 0 ? this.INDEX = this.views.length - 1 : this.INDEX--;
    }
    nextClickHandler() {
        this.isNext = true;
        this.INDEX >= this.views.length - 1 ? this.INDEX = 0 : this.INDEX++;
    }

    autoPlay() {
        let delay = this.config.autoPlay;
        clearInterval(this.timer);
        this.timer = setInterval(
            () => {
                var event = new Event("click", {
                    bubbles: true,
                    cancelable: true
                });
                this.bt_next.dispatchEvent(event);
            }, delay);
        if (this.config.autohide) {
            this.fadeOut(this.bt_prev);
            this.fadeOut(this.bt_next);
        }

    }

    stop() {
        if (this.config.autohide) {
            this.fadeIn(this.bt_prev);
            this.fadeIn(this.bt_next);
        }
        clearInterval(this.timer);
    }

    fadeOut(element) {
        element.style.transition = "all .8s";
        element.style.opacity = 1;
        let timer = setTimeout(() => {
            element.style.opacity = 0;
            timer = null;
        }, 0);
    }

    fadeIn(element) {
        element.style.transition = "all .8s";
        element.style.opacity = 0;
        let timer = setTimeout(() => {
            element.style.opacity = 1;
            timer = null;
        }, 0);
    }

}

export default function (selector, option) {
    return new ViewPager(selector, option);
}