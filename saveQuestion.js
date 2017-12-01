
  var fs = require('fs');
  var path = require('path');

//把获取到数据存到data.txt
function saveData (dataPause,url) {

    var content = "";
if(dataPause.content.length > 0) {
    for (var i = 0; i < dataPause.content.length; i++) {
        content = content + "####A:" + dataPause.content[i] + "\n";
    }

    var data = "@@@@\n####Q:" + dataPause.topic + "####\n" + content;
    fs.appendFile(path.join(__dirname, 'data.txt'), data, function (err) {
        if (err) throw err;
        console.log("Export Account Success!");
    });
    fs.appendFile(path.join(__dirname, 'url.txt'), url + "\n", function (err) {
        if (err) throw err;
        console.log("Export Account Success!");
    });


}
}

module.exports = saveData;