var http = require("http");
var url = require("url");
var fs = require("fs");

var server = http.createServer(function(req, res){

  var sampleUrl = url.parse(req.url);
  var path = sampleUrl.pathname;

  res.writeHead(200, {'Content-type': 'text/html; charset=utf-8'});

  // path 에 해당하는 파일을 읽는다.
  // Node,js 의 특징으로 파일을 읽거나 쓰는 Stream 처리를 Sub Thread 에서 실행된다.
  //           파일 경로,         인코딩,  콜백 함수
  fs.readFile(path.substring(1), 'UTF-8', function(error, data){
    var text = "";
    if(error){
      text = "서버 오류 : " + error;
    }else{
      text = data;
    }
    res.end(text);
  });
});

server.listen(8090,function(){
  console.log("Server is Running......................");
});
