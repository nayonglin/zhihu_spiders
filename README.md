# zhihu_spiders

项目功能：
  知乎搜索答案的快速爬取，具体效果只要你运行代码之后，打开目录下的data.txt和data2.txt就很清楚了。
  
使用步骤：
 1.代码下载到本地
 2.命令行进入到项目目录
 3.执行命令 npm install
 4.执行命令 node app

文件目录：
  app.js 主程序入口
  allAnswer.js 获得单个问题所有答案
  articleSingle.js 知乎专栏的处理
  questionSingle.js 构造当个页面所有答案的url
  saveArticle.js 保存专栏文章功能
  saveQuestion.js 保存问题和答案功能
  data.txt  保存问题和答案
  data2.txt 保存专栏文章
