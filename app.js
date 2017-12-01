/**
 * Created by nayonglin on 17/3/24.
 */

var https = require('https');
var cheerio = require('cheerio');
var path = require('path');
var iconv = require("iconv-lite");
var questionSingle = require('./questionSingle.js');
var articleSingle = require('./articleSingle.js');
//%E6%AF%8D%E5%A9%B4

//程序执行入口
var offset = 0;
var search = encodeURIComponent("创业");

var urlPause = "https://www.zhihu.com";
setInterval(function () {
    var url = "https://www.zhihu.com/r/search?q=" + search + "&correction=1&type=content&offset=" + offset;
    getData(url);
    offset += 10;
    console.log(offset);
}, 5000);



//传入url，获取数据
function getData(x) {

    //向传入的地址x发送一次get请求
    https.get(x, function (res) {
        var length=0;
        var arr=[];
        var qa = {

        }

        //错误处理
        if (res.statusCode !== 200) {
            getData(url);
        }

        //res.setEncoding('utf-8');   //防中文乱码

        //监听获取数据
        res.on('data', function (chunk){
            arr.push(chunk);
            length+=chunk.length;
        });

        //获取数据结束，执行end
        res.on('end', function () {
            var regp = /\\\"/g;   //匹配\"
            var regp2 = /\\\//g;  // 匹配\/
            var data = Buffer.concat(arr,length);
            var change_data = iconv.decode(data,'utf8');
                change_data = change_data.replace(regp, "\""); //替换\"
            change_data = change_data.replace(regp2, "/");     //替换\/
              //  console.log(change_data);
            var $ = cheerio.load(change_data);     //用cheerio模块解析html

            var $topic = $(".js-title-link");//text().replace(/<[^>]+>/g, "");    //获得标题
                $topic.each(function () {
                    var $this = $(this);
                    var url = $this.attr("href");
                    var topic = $this.text();
                        topic = unescape(topic.replace(/\\u/g, "%u"));  //unicode解码
                    var regp = /https/;  //匹配https，用于检测是不是专栏

                    if(regp.test(url)){      //如果是专栏
                           articleSingle(url, topic);
                    } else {    //如果是问答类
                          // url = urlPause + url;  //构造成绝对路径
                           questionSingle(url, topic);
                    }

                })

        });

    });

}

