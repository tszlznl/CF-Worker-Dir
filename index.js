/**
 *  自定义网站配置 
 */
const config = {
  title: "自定义导航",                 //write your website title
  subtitle: "Cloudflare Workers Dir", //write your website subtitle
  logo_icon: "sitemap",               //select your logo by semantic-ui icon (you can get more msg in:https://semantic-ui.com/elements/icon.html)
  hitokoto: true,                     //use hitokoto or not
  search:true,                        //enable search function
  search_engine:[                     //choose search engine which you use
    {
      name:"百 度",
      template:"https://www.baidu.com/s?wd=$s"
    },
    {
      name:"谷 歌",
      template:"https://www.google.com/search?q=$s"
    },
    {
      name:"必 应",
      template:"https://www.bing.com/search?q=$s"
    },
    {
      name:"搜 狗",
      template:"https://www.sogou.com/web?query=$s"
    }
  ],
  selling_ads: true,                  //Selling your domain or not.(turning on may be helpful for selling this domain by showing some ads.)
  sell_info:{
    domain:"example.com",
    price:500,                        //domain price
    mon_unit:"yen sign",              //monetary unit 
    contact:[                         //how to contact you
      {
        type:"envelope",               //contact type ("weixin","qq","telegram plane","envelope" or "phone")
        content:"info@example.com"
      }
    ]                        
  },
  lists: [                            //Url list
    {
      name:"技术",
      icon:"code",
      list:[
        {
          url:"https://oschina.net/",
          name:"开源中国",
          desc:"程序员集散地"
        },
        {
          url:"https://v2ex.com",
          name:"V2EX",
          desc:"程序员集散地"
        },
        {
          url:"https://csdn.net/",
          name:"CSDN技术社区",
          desc:"程序员集散地"
        },
        {
          url:"https://github.com/",
          name:"Github",
          desc:"程序员集散地"
        },
      ]
    },
    {
      name:"学习",
      icon:"graduation cap",
      list:[
        {
          url:"https://w3school.com.cn/",
          name:"W3school在线教程",
          desc:"程序员集散地"
        },
        {
          url:"https://runoob.com/",
          name:"菜鸟教程",
          desc:"程序员集散地"
        },
        {
          url:"https://segmentfault.com/",
          name:"思否社区",
          desc:"程序员集散地"
        },
        {
          url:"https://jianshu.com/",
          name:"简书",
          desc:"程序员集散地"
        },
      ]
    }
  ]
}
const el = (tag, attrs, content) => `<${tag} ${attrs.join(" ")}>${content}</${tag}>`;

async function handleRequest(request) {
  const init = {
    headers: {
      'content-type': 'text/html;charset=UTF-8',
    },
  }
  return new Response(renderHTML(renderIndex(),config.selling_ads? renderSeller() :null), init);
}
addEventListener('fetch', event => {
  return event.respondWith(handleRequest(event.request))
})

/*通过分析链接 实时获取favicon
* @url 需要分析的Url地址
*/
// function getFavicon(url){
//   if(url.match(/https{0,1}:\/\//)){
//     //return "https://ui-avatars.com/api/?bold=true&size=36&background=0D8ABC&color=fff&rounded=true&name=" + url.split('//')[1];
//     return "https://www.google.cn/s2/favicons?sz=64&domain_url=" + url;
//   }else{
//     //return "https://ui-avatars.com/api/?bold=true&size=36&background=0D8ABC&color=fff&rounded=true&name=" + url;
//     return "https://www.google.cn/s2/favicons?sz=64&domain_url=http://" + url;
//   } 
// }

function getFavicon(url) {
  // 增强的URL验证正则表达式（这只是一个示例，根据实际情况可能需要更严格的验证）
  if (!/^https?:\/\/[^ "]+$/.test(url)) {
    console.error("Invalid URL"); // 在实践中，可能需要更复杂的错误处理策略
    return ""; // 返回一个空字符串或错误提示
  }

  // 确保URL始终以http://或https://开头
  //const protocol = url.startsWith("https") ? "https://" : "http://";
  const secureProtocol = "https://";

  // 使用条件运算符简化逻辑
  return `${secureProtocol}www.google.cn/s2/favicons?sz=64&domain_url=${encodeURIComponent(url)}`;
  //https://www.google.com/s2/favicons?domain=<url>&size=<size>
}


/** Render Functions
 *  渲染模块函数
 */

function renderIndex(){
  const footer = el('footer',[],el('div',['class="footer"'],'Powered by' + el('a',['class="ui label"','href="https://github.com/sleepwood/cf-worker-dir"','target="_blank"'],el('i',['class="github icon"'],"") + 'Cf-Worker-Dir') + ' &copy; Base on ' + el('a',['class="ui label"'],el('i',['class="balance scale icon"'],"") + 'MIT License')));
  return renderHeader() + renderMain() + footer;
}

function renderHeader(){
  const item = (template,name) => el('a',['class="item"',`data-url="${template}"`],name);

  var nav = el('div',['class="ui large secondary inverted menu"'],el('div',['class="item"'],el('p',['id="hitokoto"'],'条条大路通罗马')))
  var title = el('h1',['class="ui inverted header"'],el('i',[`class="${config.logo_icon} icon"`],"") + el('div',['class="content"'],config.title + el('div',['class="sub header"'],config.subtitle)));
  var menu = el('div',['id="sengine"','class="ui bottom attached tabular inverted secondary menu"'],el('div',['class="header item"'],'&nbsp;') + config.search_engine.map((link,key) =>{
    if(key == 0){
      return el('a',['class="active item"',`data-url="${link.template}"`],link.name);
    }else{
      return item(link.template,link.name);
    }
  }).join(""))
  var input = el('div',['class="ui left corner labeled right icon fluid large input"'],el('div',['class="ui left corner label"'],el('img',['id="search-fav"','class="left floated avatar ui image"','src="https://www.baidu.com/favicon.ico"'],"")) + el('input',['id="searchinput"','type="search"','placeholder="搜索你想要知道的……"','autocomplete="off"'],"") + el('i',['class="inverted circular search link icon"'],""));
  return el('header',[],el('div',['id="head"','class="ui inverted vertical masthead center aligned segment"'],(config.hitokoto ? el('div',['id="nav"','class="ui container"'],nav) : "") + el('div',['id="title"','class="ui text container"'],title + (config.search ? input + menu :"") + `${config.selling_ads ? '<div><a id="menubtn" class="red ui icon inverted button"><i class="heart icon"></i> 喜欢此域名 </a></div>' : ''}`)))
}

function renderMain() {
  var main = config.lists.map((item) => {
    const card = (url,name,desc)=> el('a',['class="card"',`href=${url}`,'target="_blank"'],el('div',['class="content"'],el('img',['class="left floated avatar ui image"',`src=${getFavicon(url)}`],"") + el('div',['class="header"'],name) + el('div',['class="meta"'],desc)));
    const divider = el('h4',['class="ui horizontal divider header"'],el('i',[`class="${item.icon} icon"`],"")+item.name);

    var content = el('div',['class="ui four stackable cards"'],item.list.map((link) =>{
      return card(link.url,link.name,link.desc);
    }).join(""));

    return el('div',['class="ui basic segment"'],divider + content);
  }).join("");
  
  return el('main',[],el('div',['class="ui container"'],main));
}

function renderSeller() {
  const item = (type,content) => el('div',['class="item"'],el('i',[`class="${type} icon"`],"") + el('div',['class="content"'],content));
  var title = el('h1',['class="ui yellow dividing header"'],el('i',['class="gem outline icon"'],"") + el('div',['class="content"'],config.sell_info.domain + ' 正在出售'));
  var action = el('div',['class="actions"'],el('div',['class="ui basic cancel inverted button"'],el('i',['class="reply icon"'],"") + '返回'));

  var contact = config.sell_info.contact.map((list) => {
    return item(list.type,list.content);
  }).join("");
  var column = el('div',['class="column"'],el('h3',['class="ui center aligned icon inverted header"'],el('i',['class="circular envelope open outline grey inverted icon"'],"") + '联系我') + el('div',['class="ui relaxed celled large list"'],contact));
  var price = el('div',['class="column"'],el('div',['class="ui large yellow statistic"'],el('div',['class="value"'],el('i',[`class="${config.sell_info.mon_unit} icon"`],"") + config.sell_info.price)));
  var content = el('div',['class="content"'],el('div',['class="ui basic segment"'],el('div',['class="ui two column stackable center aligned grid"'],el('div',['class="ui inverted vertical divider"'],'感兴趣？') + el('div',['class="middle aligned row"'],price + column))));

  return el('div',['id="seller"','class="ui basic modal"'],title + content + action);
}

function renderHTML(index,seller) {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>${config.title} - ${config.subtitle}</title>
      <link href="https://cdn.jsdelivr.net/npm/semantic-ui-css@2.4.1/semantic.min.css" rel="stylesheet">
      <link href="https://cdn.jsdelivr.net/gh/sleepwood/cf-worker-dir@0.1.1/style.css" rel="stylesheet">
      <link rel="shortcut icon" href="https://yanxuan.nosdn.127.net/56761fad551a0b988510a66af2840cea.png" />
      <link rel="bookmark" href="https://yanxuan.nosdn.127.net/56761fad551a0b988510a66af2840cea.png" type="image/x-icon"/>
      <script src="https://cdn.jsdelivr.net/npm/jquery@3.4.1/dist/jquery.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/semantic-ui-css@2.4.1/semantic.min.js"></script>
      <!-- first include any tsParticles plugin needed -->
      <script src="https://cdn.jsdelivr.net/npm/tsparticles/tsparticles.bundle.min.js"></script>

      <!-- then include jquery wrapper -->
      <script src="https://cdn.jsdelivr.net/npm/@tsparticles/jquery"></script>
  </head>
  <body>
    ${index}
    ${config.selling_ads ? seller : ''}
    <script src="https://v1.hitokoto.cn/?encode=js&select=%23hitokoto" defer></script>
    <script>
      $('#sengine a').on('click', function (e) {
        $('#sengine a.active').toggleClass('active');
        $(e.target).toggleClass('active');
        $('#search-fav').attr('src',$(e.target).data('url').match(`+/https{0,1}:\/\/\S+\//+`)[0] + '/favicon.ico') ;
      });
      $('.search').on('click', function (e) {
          var url = $('#sengine a.active').data('url');
          url = url.replace(`+/\$s/+`,$('#searchinput').val());
          window.open(url);
      });
      /* 鼠标聚焦时，回车事件 */
      $("#searchinput").bind("keypress", function(){
          if (event.keyCode == 13){
          // 触发需要调用的方法
          $(".search").click();
          }
      });
      $('#menubtn').on('click', function (e) {
          $('#seller').modal('show');
      });
    </script>
    <div id="tsparticles"></div>
    <script>
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      $(document).ready(async function () {
          await loadFull(tsParticles);

          $("#tsparticles")
              .particles()
              .init(
                  {
                      background: {
                          color: {
                              value: "#0d47a1",
                          },
                      },
                      fpsLimit: 120,
                      interactivity: {
                          events: {
                              onClick: {
                                  enable: true,
                                  mode: "push",
                              },
                              onHover: {
                                  enable: true,
                                  mode: "repulse",
                              },
                          },
                          modes: {
                              push: {
                                  quantity: 4,
                              },
                              repulse: {
                                  distance: 200,
                                  duration: 0.4,
                              },
                          },
                      },
                      particles: {
                          color: {
                              value: "#ffffff",
                          },
                          links: {
                              color: "#ffffff",
                              distance: 150,
                              enable: true,
                              opacity: 0.5,
                              width: 1,
                          },
                          move: {
                              direction: "none",
                              enable: true,
                              outModes: {
                                  default: "bounce",
                              },
                              random: false,
                              speed: 6,
                              straight: false,
                          },
                          number: {
                              density: {
                                  enable: true,
                              },
                              value: 80,
                          },
                          opacity: {
                              value: 0.5,
                          },
                          shape: {
                              type: "circle",
                          },
                          size: {
                              value: { min: 1, max: 5 },
                          },
                      },
                      detectRetina: true,
                  },
                  function (container) {
                      // container is the particles container where you can play/pause or stop/start.
                      // the container is already started, you don't need to start it manually.
                  },
              );

          // or

          $("#tsparticles")
              .particles()
              .ajax("particles.json", function (container) {
                  // container is the particles container where you can play/pause or stop/start.
                  // the container is already started, you don't need to start it manually.
              });
      });
    </script>
  </body>

  </html>`
}
