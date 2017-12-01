/**
 * Created by nayonglin on 17/3/24.
 */

var https = require('https');
var saveData = require('./saveQuestion.js');

function allAnswer(url, topic) {

var option={
    hostname:'www.zhihu.com',
    path:'/api/v4/questions/' + url + '/answers?include=data%5B*%5D.is_normal%2Cadmin_closed_comment%2Creward_info%2Cis_collapsed%2Cannotation_action%2Cannotation_detail%2Ccollapse_reason%2Cis_sticky%2Ccollapsed_by%2Csuggest_edit%2Ccomment_count%2Ccan_comment%2Ccontent%2Ceditable_content%2Cvoteup_count%2Creshipment_settings%2Ccomment_permission%2Ccreated_time%2Cupdated_time%2Creview_info%2Cquestion%2Cexcerpt%2Crelationship.is_authorized%2Cis_author%2Cvoting%2Cis_thanked%2Cis_nothelp%2Cupvoted_followees%3Bdata%5B*%5D.mark_infos%5B*%5D.url%3Bdata%5B*%5D.author.follower_count%2Cbadge%5B%3F(type%3Dbest_answerer)%5D.topics&offset=0&limit=100&sort_by=default',

    headers:{
        'accept':"application/json, text/plain, */*",
        'Accept-Language':"zh-CN,zh;q=0.8",
        'Connection':"keep-alive",
        'authorization':"",
        'User-Agent':"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36"
    }
}

    getData(option);

//传入url，获取数据
function getData(x) {

    //向传入的地址x发送一次get请求
    https.get(x, function (res) {
        var html = "";
        var qa = {
         topic:'',
         content:[]
         };


        //监听获取数据
        res.on('data', function (chunk){
            html += chunk;
        });

        //获取数据结束，执行end
        res.on('end', function () {
              var  change_data = JSON.parse(unescape(html.replace(/\\u/g, "%u")));  //把响应文档unicode解码
              var length = change_data.data.length;  //保存数据长度
              qa.topic = topic;
              for(var i = 0; i < length; i++) {
                  var content = change_data.data[i].content;
                  qa.content.push(content.replace(/<[^>]+>/g, "")); //取出html标签
              }

              //保存数据到本地
              saveData(qa);

        });

    });

}
}
module.exports = allAnswer;