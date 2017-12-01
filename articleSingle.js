var https = require('https');
var cheerio = require('cheerio');
var iconv = require("iconv-lite");
var path = require('path');
var fs = require('fs');
var saveArticle = require("./saveArticle");

function articleSingle(url ,topic) {
    https.get(url, function(res) {
        var length=0;
        var arr=[];
        var article = {
            topic: "",
            content:""
        };

        res.on('data', function (chunk){
            arr.push(chunk);
            length+=chunk.length;
        });

        //获取数据结束，执行end
        res.on('end', function () {
            var data = Buffer.concat(arr,length);
            var change_data = iconv.decode(data,'utf8');
            var $ = cheerio.load(change_data);         //用cheerio模块解析html
                article.topic = $("h1").text().replace(/<[^>]+>/g, "");     //获得标题
                article.content = $(".RichText.PostIndex-content.av-paddingSide.av-card").text().replace(/<[^>]+>/g, "");
                saveArticle(article,url);
        });
    });


}

module.exports = articleSingle;



