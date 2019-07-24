import dao from "./model/dataEngine.js";
import render from "./model/renderEngine.js";
class Shopcart {

    constructor() {

        this.goodslistBox = $("#cartList");
        this.cartsNum = $(".topic .h-l");
        this.priceNumber = $(".price-num");
        this.ini();
    }


    ini() {
        // 购物车加减;
        console.log("购物数据加载中");
        this.cartsNumBrash();
        this.renderList();
        this.goodslistBox.on("click", ".btn-reduce", $.proxy(this.reduceGoodsNum, this));
        this.goodslistBox.on("click", ".btn-add", $.proxy(this.addGoodsNum, this));
        this.goodslistBox.on("click", ".del", $.proxy(this.deleteShop, this));
        this.goodslistBox.on("input", ".cartsVal", $.proxy(this.putCount, this));
        console.log("加载完成！", this.cartsList());
    }

    renderList() {
        render("shopcart", this.cartsList());
    }

    cartsList() {
        let cartList = dao.db("shopcart");
        let cartShopList = [];
        dao.cach(
            gos => {
                cartList.forEach(item => {
                    if (gos.id == item.id) {
                        gos.count = item.count;
                        gos.priceNumber = Number(gos.price.replace(/(¥|,)/g, ""));
                        cartShopList.push(gos)
                    }
                });
            }
        );

        return cartShopList;
        console.log(cartShopList);
    }

    putCount(evt) {

        var e = evt || window.event;
        var target = e.target || e.srcElement;
        const id = $($(target).parents(".cart-item")[0]).attr("data-id");

        let count = $(target).val().toString().trim();
        if (isNaN(Number(count))) {
            count = 0;
        }
        if (count > 99) {
            count = 99;
        }

        $(target).val(count);

        var la = dao.db("shopcart");
        la.forEach(function (item, index) {
            if (item.id == id) {
                item.count = count;
                if (item.count <= 0) {
                    la.splice(index, 1);
                }
            }
        })
        dao.db("shopcart", la);
        this.cartsNumBrash();
        this.renderList();
    }
    deleteShop(evt) {
        var e = evt || window.event;
        var target = e.target || e.srcElement;
        const id = $($(target).parents(".cart-item")[0]).attr("data-id");
        var la = dao.db("shopcart");
        la.forEach(function (item, index) {
            if (item.id == id) {
                la.splice(index, 1);
                if (item.count <= 0) {
                    la.splice(index, 1);
                }
            }
        })
        dao.db("shopcart", la);
        this.cartsNumBrash();
        this.renderList();
    }



    cartsNumBrash() {
        let cartList = this.cartsList();
        let sum = cartList.reduce((a, b) => Number(a + Number(b.count)), 0);
        let total = cartList.reduce((a, b) => a + (b.count * b.priceNumber), 0);
        this.cartsNum.html(sum);
        this.priceNumber.html(total);
        return {
            sum,
            total
        }
    }

    reduceGoodsNum(evt) {

        var e = evt || window.event;
        var target = e.target || e.srcElement;

        const id = $($(target).parents(".cart-item")[0]).attr("data-id");
        var la = dao.db("shopcart");
        la.forEach(function (item, index) {
            if (item.id == id) {
                item.count--
                if (item.count <= 0) {
                    la.splice(index, 1);
                }
            }
        })
        dao.db("shopcart", la);
        this.cartsNumBrash();
        this.renderList();
    }
    addGoodsNum(evt) {

        var e = evt || window.event;
        var target = e.target || e.srcElement;
        const id = $($(target).parents(".cart-item")[0]).attr("data-id");

        var la = dao.db("shopcart");
        la.forEach(function (item, index) {
            if (item.id == id) {
                item.count++
                if (item.count <= 0) {
                    la.splice(index, 1);
                }
            }
        })
        dao.db("shopcart", la);
        this.cartsNumBrash();
        this.renderList();
    }

}




export default function () {
    return new Shopcart();
}









// 加载购物车视图
// this.carButton.on("click", (ev) => {
//     let e = ev || window.event;
//     let capatureE = e.target || e.srcElement;
//     $(capatureE.parentNode).addClass("active")
//         .siblings()
//         .removeClass("active");
//     this.renderList("cartslist");
// });
// 加载 商品列表视图
// this.goodslistBtn.on("click", (ev) => {
//     let e = ev || window.event;
//     let capatureE = e.target || e.srcElement;
//     $(capatureE.parentNode).addClass("active")
//         .siblings()
//         .removeClass("active");
//     this.renderList("goodslist");
// });
// this.carButton = $(".car-box");
// this.title = $(".content-title")
// this.goodslistBtn = $(".btn-goodslist");