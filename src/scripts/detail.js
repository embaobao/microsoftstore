import dao from "./model/dataEngine.js";
import render from "./model/renderEngine.js";

class DetailPager {
    constructor() {
        this.goodsId = Number(window.location.hash.replace("#", ""));
        this.goods = {};
        this.gosName_e = $("#gosName");
        this.goseMarketPrice_e = $(".price .marketPrice");
        this.gosePrice_e = $(".price .current b");
        this.rankCommetNum_e = $(".rank .num");
        this.addCart_e = $(".buy .add2cart ");
        this.tip_e = $(".tips font")
        this.pic_e = $("#productImg");
        this.initialize();
    }
    initialize() {
        if (dao.cach()) {
            dao.cach(item => item.id === this.goodsId ? this.goods = item : "");
        }
        console.log(this.goods);
        this.goods ? this.render() : alert("数据加载失败！");
        this.addCart_e.on("click", $.proxy(this.addCart, this))
    }

    render() {
        const gos = this.goods;
        this.gosName_e.html(gos.name);
        this.addCart_e.attr("data-id", gos.id);
        this.goseMarketPrice_e.html(gos.price);
        this.gosePrice_e.html(gos.price);
        this.pic_e.attr("src", gos.img);
        this.rankCommetNum_e.html("(" + (60 + Math.round(Math.random() * 100)) + "条评论)");
    }

    addCart(evt) {
        let e = evt || window.event;
        let target = e.target || e.srcElement;
        let id = $(target).attr("data-id");
        let car = dao.db("shopcart");
        let hasGoods = false;
        car.forEach(item => {
            if (item.id == id) {
                item.count++;
                hasGoods = true;
            }
        });

        hasGoods ? dao.db("shopcart", car) : dao.db("shopcart", {
            id,
            count: 1
        });
        location.href = "./shopcart.html";

    }

}

export default function () {
    return new DetailPager();
}