
var fs = require('fs');
var path = require('path');

//把获取到数据存到data.txt
function saveData (dataPause,url) {
if(dataPause.content !== "") {
    var data = "\n@@@@\n####" + dataPause.topic + "####\n" + dataPause.content;
    fs.appendFile(path.join(__dirname, 'data2.txt'), data, function (err) {
        if (err) throw err;
        console.log("Export Account Success!");
    });
    fs.appendFile(path.join(__dirname, 'url2.txt'), url + "\n", function (err) {
        if (err) throw err;
        console.log("Export Account Success!");
    });
}


}

module.exports = saveData;