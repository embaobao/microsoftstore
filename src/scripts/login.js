import dao from "./model/dataEngine.js";
// import render from "./model/renderEngine.js";
class SignIn {
    constructor(isExe = true) {
        if (isExe) {
            console.log("welcome emb MicroSoftStore, Join Us! initailize Loading ....");
            this.form = $("singinForm");
            this.namePanel = $("#namePanel");
            this.pwPanel = $("#pwPanel");
            this.idSave = $("#idsave");
            this.nameAlert = $("#nameAlert");
            this.pwAlert = $("#pwAlert");
            this.userName = $("#userName");
            this.userPw = $("#userPw");
            this.pwHeadertext = $("#pwHeadertext");
            this.nameHeadertext = $("#nameHeadertext");
            this.submitBtn = $("#submitBtn");
            this.submitpwBtn = $("#submitpwBtn");
            this.registerBtn = $("#registerBtn");
            this.cantAccessAccount = $("#cantAccessAccount");
            this.remeberPwd = $("#remeberPwd");
            this.unrecordpw = $("#wjmm");
            this.Type = "login";
            this.user = {};
            this.nameActionLinks = $(".action-links");
            this.initialize();
        }
    }



    initialize() {
        this.vailUser();
        this.userName.on("input", $.proxy(this.upData, this));
        this.userPw.on("input", $.proxy(this.upData, this));
        this.remeberPwd.on("click", $.proxy(this.upData, this));
        this.submitBtn.on("click", $.proxy(this.valiName, this));
        this.submitpwBtn.on("click", $.proxy(this.vailPassWord, this));
        this.registerBtn.on("click", $.proxy(this.register, this));
        this.cantAccessAccount.on("click", $.proxy(this.modefine, this));
        this.unrecordpw.on("click", $.proxy(this.modefine, this));
        console.log(" emm  success ....");
    }

    register() {
        this.Type = "register";
        this.nameHeadertext.text("创建一个用户");
        this.nameAlert.text("第一步 ： 写一个酷酷的 ID  然后： 点击下一步");
        this.pwHeadertext.text("输入自己的密码");
        this.pwAlert.text("第二步 ： 写一个别人都不知道的 密码  然后：点击注册");
        this.submitpwBtn.val("注册")
        this.nameActionLinks.hide();
    }
    modefine() {
        this.changePanel("");
        this.Type = "updata";
        this.nameHeadertext.text("查找账户");
        this.nameAlert.text("第一步 ： 输入自己拥有的 ID  然后： 点击下一步");
        this.pwHeadertext.text("输入记得住的密码");
        this.pwAlert.text("第二步 ： 写一个别人都不知道的 密码  然后： 点击修改");
        this.submitpwBtn.val("修改");
        this.nameActionLinks.hide();
    }
    upData() {
        this.getUser();
    }
    getUser(type, isGet = true) {
        if (isGet) {
            let name = this.userName.val()
            let pw = this.userPw.val()
            let remeber = this.remeberPwd.is(":checked");
            let user = {
                name,
                pw,
                remeber,
                type: (type ? type : this.Type)
            }
            console.log(user);
            this.user = user;
        }
        return this.user;
    }

    valiName() {
        this.nameAlert.text("正在验证...,请稍等...");
        this.vailRequire(res => {
            console.log(res);
            console.log(this.Type);
            switch (this.Type) {
                case "login":
                    if (res.status === "pass") {
                        this.nameAlert.text(res.msg);
                        setTimeout(() => this.nameAlert.text("准备好哦，要输入密码了..."), 1000);
                        setTimeout(() => this.changePanel(), 2000);
                    } else {
                        this.nameAlert.text(res.msg);
                    }
                    break;
                case "register":

                    if (res.status === "pass") {
                        this.nameAlert.text("ID 已存在了");
                    } else {
                        this.nameAlert.text(`从今天起 我把 你的名字 ：- ${this.user.name} 记在我的心中 -Mater ! `);
                        setTimeout(() => this.nameAlert.text("准备好哦，要输入密码了..."), 1000);
                        setTimeout(() => this.changePanel(), 2000);
                    }
                    break;
                default:
                    if (res.status === "pass") {
                        this.nameAlert.text(res.msg);
                        setTimeout(() => this.nameAlert.text("准备好哦，要修改密码了..."), 1000);
                        setTimeout(() => this.changePanel(), 2000);
                    } else {
                        this.nameAlert.text(res.msg);
                    }
                    break;
            }

        }, "vail");
    }

    vailPassWord() {
        this.pwAlert.text("正在验证密码信息...,请稍等...");
        this.vailRequire(
            res => {
                console.log(res);
                this.pwAlert.text(res.msg);
                if (res.status === "pass") {
                    if (this.user.remeber) {
                        this.user.type = "login";
                        this.user.time = Date.now();
                        dao.user(this.user);
                    }
                    setTimeout(() => this.nameAlert.text("我好了哦，我们去看看商品吧..."), 1000);
                    setTimeout(this.success, 2000);
                }

            }, this.Type
        )
    }


    changePanel(type = "pw") {
        if (type === "pw") {
            this.pwPanel.show();
            this.namePanel.hide();
        } else {
            this.pwPanel.hide();
            this.namePanel.show();
        }
    }


    vailRequire(cb, type, isGet = true, data) {
        this.getUser(type, isGet);
        $.get("http://localhost/service/", (data ? data : this.user), function (res) {
            cb(res);
            return res;
        }, "json");
    }


    vailUser() {
        this.nameAlert.text("正在查询登录状态请稍等...")
        let user = dao.user();

        if (user) {
            let t1 = setTimeout(() => {
                this.nameAlert.text("登录已存在 ，正在验证...");
                t1 = null;
            }, 1000)

            this.user = user,
                this.vailRequire(
                    res => {
                        if (res.status === "pass") {
                            let t2 = setTimeout(() => {
                                this.nameAlert.text("登录验证成功，请稍等..跳转中...");
                                setTimeout(() => {
                                    this.success();
                                }, 1000);
                                t2 = null;
                            }, 1000)
                        }

                    }, "login", false
                )
        } else {
            this.nameAlert.text("");
        }
    }

    success() {
        window.location.href = "./";
    }


}

export default function (isExe) {
    return new SignIn(isExe);
}