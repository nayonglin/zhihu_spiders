var https = require('https');
var cheerio = require('cheerio');
var iconv = require("iconv-lite");
var path = require('path');
var fs = require('fs');
var saveData = require("./saveQuestion.js");
var allAnswer = require("./allAnswer.js");

function singleData(url ,topic) {
    var offset = url.replace("\/question\/", ""); //把传进来的url变成需要的数字

    allAnswer(offset, topic);


}

module.exports = singleData;



