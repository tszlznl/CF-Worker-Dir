# CF-Worker-Dir

CF-Worker-Dir是一款适用于Cloudflare Worker平台上的云函数程序，可以使用它在一分钟内搭建属于自己的导航页面。CF-Worker-Dir提供丰富的自定义配置，同时它还可以预留了接口帮助你售出自己域名。如果你的域名还没有搭建网站，不如先利用CF-Worker-Dir让你的域名不再浪费。😉

🎉[演示地址](http://gethe.best/)

<details>
<summary>📷程序截图</summary>
<img src="https://i.loli.net/2020/02/14/ahU32dQxMct9ugX.png"/>
</details>

## 程序安装
### 快速安装
1. 在 [Cloudflare Worker](https://workers.cloudflare.com/) 管理页面创建一个新的 **Worker** 。
2. 在Worker编辑页面左边粘贴 `index.js` 中的代码。
3. 根据自身需要修改 `config` 的配置内容
### 进阶安装
> 如何绑定自己的域名
1. 根据上文快速安装完成，回到域名管理面板
2. 点击 `Workers` 进入Workers管理页面
3. 点击 `Add route` 设置新的路由
4. `Route` 可以输入自己想使用的子域名，如果在根域名上使用直接把当前域名输入即可，`Worker` 选择上文快速安装好的Worker
> `Route` 所使用的域名地址**必须已经解析好A记录**，如果没有能绑定的IP地址，可以输入8.8.8.8占位：）

## 系统配置

CF-Worker-Dir允许用户自定义导航页面，配置内容如下：
```
const config = {
  title: "自定义导航",                 //自定义网站标题
  subtitle: "Cloudflare Workers Nav", //自定义网站副标题
  logo_icon: "sitemap",               //选择网站logo icon 暂时只支持 (eg:https://semantic-ui.com/elements/icon.html)
  hitokoto: true,                     //开启 一言 插件
  search:true,                        //开启 搜索 功能  
  search_engine:[                     //搜索引擎列表
    {
      name:"百度一下",                   //搜索引擎名称
      template:"https://www.baidu.com/s?wd=$s"  //搜索引擎模板（含关键词$s）
    }
  ],
  selling_ads: true,                  //是否要开启网址推广
  sell_info:{
    domain:"example.com",             //当前域名
    price:500,                        //价格
    mon_unit:"yen sign",              //货币单位 (eg:https://semantic-ui.com/elements/icon.html#computers)
    contact:[                         //联系方式
      {
        type:"envelope",              //通讯工具 ("weixin","qq","telegram plane","envelope" or "phone")
        content:"info@example.com"    //号码/地址
      }
    ]                        
  },
  lists: [                            //网址信息
    {
      name:"技术",                    //网址类别
      icon:"code",                    //网址类别icon 暂时只支持 (eg:https://semantic-ui.com/elements/icon.html)
      list:[
        {
          url:"https://oschina.net/", //网站url
          name:"开源中国",             //网站名称
          desc:"领先的中文开源技术社区" //网站描述
        }
      ]
    }
  ]
}
```

## Todo
- [ ] 模块化
- [ ] 米表列表
- [ ] 插件化（倒计时/一言/小工具）  
- [ ] 国际化  

## Licence

MIT

使用 JavaScript 进行简单的密码保护
假设你没有服务器配置的访问权限，或者你想要一个更简单的解决方案，可以使用前端 JavaScript 来询问密码。
但是这种方法非常不安全，因为任何人都可以查看源代码，找到密码。这只适用于非常基本的保护以阻止无意的访问者。
  <head>
  <meta charset="UTF-8">
  <title>受保护的页面</title>
  <script>
    var password = prompt("请输入密码", "");
    if(password != "12345") {
      window.location.href = "access-denied.html"; // 重定向到其他页面
    }
  </script>
  </head>
  <body>
  <p>这是一个受密码保护的页面内容。</p>
  <!-- 你的受保护内容 -->
  </body>