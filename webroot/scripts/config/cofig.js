// 资源连接配置
let src = {
    loadimg: `https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563244462837&di=d361b540ec57ea7c054a94e5a403b835&imgtype=0&src=http%3A%2F%2Fphotocdn.sohu.com%2F20150605%2Fmp17826536_1433492197010_5.gif`
}

// 模板配置
let template = {
    navgoods: (item) => {
        let hot = item.hot ? ` <div class="tag"><span style="background-color: #e71224">${item.hot}</span></div>` : "";

        return `
            <li data-id="${item.id}" data-name="${item.name}">
                     <a href="#" title="${item.title}">
                         <div class="img">
                             <img data-src="${item.img}"
                                 alt="${item.title}"
                                  class="lazyloaded"
                                 src="${src.loadimg}">
                            ${hot}
                         </div>
                         <p>${item.desc}</p>
                         <span class="more">${item.name}</span>
                     </a>
                 </li>
            `
    },
    channel: (item) => {
        if (item.name === "guide") {
            return `
                      <li data-id="${item.id}" class="guide"
                            style="background-image:url('${item.img}')">
                            <div class="inner">
                                <p>${item.desc}</p>
                                <a href="${item.href}" class="viewmore" title="${item.title}">查看更多&gt;</a>
                            </div>
                        </li>
                    `
        }
        return `
                   <li data-id="${item.id} ">
                            <a class="inner" href="./detail.html#${item.id}" title="${item.title}">
                                <div class="img">
                                    <img data-src="${item.img}"
                                        alt="${item.title}"
                                        class="lazyloaded"
                                        src = "${src.loadimg}" >
                                </div>
                                <div class="desc">
                                    <h3 title="${item.title}">
                                       ${item.name}</h3>
                                    <p>${item.desc}</p>
                                    <div class="active">
                                        <div class="price">
                                            <span>
                                                售价：<strong>${item.price}</strong>
                                                &nbsp;起</span>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </li>
                    `
    },
    recomend: (item) => {
        return `
                <li data-id="${item.id}" data-name="${item.name}">
                      <a class="img" href="./detail.html#${item.id}" title="${item.title}">
                          <div class="img">
                              <img data-src="${item.img}"
                                  alt="${item.title}" 
                                  class="lazyloaded"
                                  src = "${src.loadimg}" >
                          </div>
                          <div class="name">
                              <h4 title="Surface Pro 6">${item.name}</h4>
                              <p>${item.desc}</p>
                          </div>
                          <div class="price">
                              <s></s>
                              <span> 售价： <strong>${item.price} </strong>
                                  &nbsp;起</span>
                          </div>
                      </a>
                  </li>
                `
    },
    shopcart: (item) => {
        return `
               <div class="cart-item" data-id="${item.id}">
            <div class="clearfix cart-item-tray">
                <div class="col-1">
                    <div class="img"><img
                            src="${item.img}"
                            alt=" ${item.title}"
                           class="product-img"></div>
                    <p class="del" data-id="${item.id}"><a href="#">删除商品</a></p>
                </div>
                <div class="col-right">
                    <div class="col-2 info">
                        <h2><a href="${item.href}">  ${item.name}</a></h2>
                        <p>${item.desc}</p>
                        <p></p>
                        <p></p>
                    </div>
                    <div class="col-4 price">
                        <p>${item.price}</p>
                        <p></p>
                    </div>
                    <div class="col-3 quantity clearfix">
                        <div class="countManger" data-id="${item.id}">
                            <span class="vector sub btn-reduce" name="sub">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    xmlns:xlink="http://www.w3.org/1999/xlink"
                                    xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" width="100%" height="100%"
                                    viewBox="0 0 250 25" version="1.1">
                                    <title>Rectangle 1 Copy 2</title>
                                    <desc>Created with Sketch.</desc>
                                    <defs></defs>
                                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"
                                        sketch:type="MSPage">
                                        <rect id="Rectangle-1-Copy-2" fill="#666666" sketch:type="MSShapeGroup" x="0"
                                            y="0" width="250" height="25">
                                        </rect>
                                    </g>
                                </svg>
                            </span>
                     
                            <input class="cartsVal" data-id="${item.id}" 
                            type="tel" value=" ${item.count}">
                            <span class="vector plus btn-add" name="plus">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                    xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" width="100%" height="100%"
                                    viewBox="0 0 250 251" version="1.1">                            
                                    <title>Rectangle 1 + Rectangle 1 Copy</title>
                                    <desc>Created with Sketch.</desc>
                                    <defs></defs>
                                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"
                                        sketch:type="MSPage">
                                        <g id="Rectangle-1-+-Rectangle-1-Copy" sketch:type="MSLayerGroup"
                                            fill="#666666">
                                            <rect id="Rectangle-1" sketch:type="MSShapeGroup" x="0" y="113" width="250"
                                                height="25"></rect>
                                            <rect id="Rectangle-1-Copy" sketch:type="MSShapeGroup"
                                                transform="translate(125.000000, 125.500000) rotate(-90.000000) translate(-125.000000, -125.500000) "
                                                x="0" y="113" width="250" height="25"></rect>
                                        </g>
                                    </g>
                                </svg>
                            </span>

                        </div>
                    </div>
                </div>
            </div>
        </div> `
    }
}


//导出数据配置
export default {
    data: {
        navgoods: {
            url: "/data.json",
            data: null,
            datapath: ["navgoods"],
            wrapper: "#navGoods",
            template: template.navgoods
        },
        recomend: {
            url: "/data.json",
            data: null,
            datapath: ["recomendGoods"],
            wrapper: "#recommend-list",
            template: template.recomend
        },
        surface: {
            url: "/data.json",
            data: null,
            datapath: ["surfaceChanels"],
            wrapper: "#channel-surface",
            template: template.channel
        },
        office: {
            url: "/data.json",
            data: null,
            datapath: ["officeChanels"],
            wrapper: "#channel-office",
            template: template.channel
        },
        xbox: {
            url: "/data.json",
            data: null,
            datapath: ["xboxChanels"],
            wrapper: "#channel-xbox",
            template: template.channel
        },
        hard: {
            url: "/data.json",
            data: null,
            datapath: ["hard"],
            wrapper: "#channel-hard",
            template: template.channel
        },
        shopcart: {
            wrapper: "#cartList",
            template: template.shopcart
        }

    }


}