var http = require("http");
var url = require("url");
var queryString = require("querystring");
// 파일을 읽을 수 있는 Api
var fs = require("fs");
// 파일의 MagincNumber 를 알 수 있는 APi
// 설치 방법 : npm install -g mime
var mime = require("mime")


// 주소(Rest Api) 요청의 형태
// http://localhost:8090/post?filePaht=/dir1/xxx.png
var server = http.createServer(function(req, res){

  // 1. 주소에서 명령어 = 서버 자원의 이름 또는 ID(URI) 를 꺼낸다
  var sampleUrl = url.parse(req.url);
  // 1-1. Path 분석
  // ? 나오기 전까지 모두 다 읽음
  // pathname : /post/~~~~
  var path = sampleUrl.pathname;
  // 1-2. / 단위로 Path 를 배열로 생성
  // cmds[0] = []
  // cmds[1] = [post]
  var cmds = path.split('/');

  // 2. Method 를 꺼낸다.
  // req.method == 'get'
  if(cmds[1] == 'getfile'){
    if(req.method == 'POST'){
      // ..... body 에 넘어온 filepath 를 꺼내온다.
    }else if(req.method == 'GET'){
      var query = queryString.parse(sampleUrl.query);
      // query {
      //  filepath : '~~~.mp4'
      //
      if(query.filepath){
        var filePath = query.filepath;
        var mtype = mime.getType(filePath); // 파일의 mime Type 을 알려준다.

        if(mtype == "video/mp4"){
          var count = 0;
          // 1. Stream 생성
          var stream = fs.createReadStream(filePath);
          // 2. Stream 전송 이벤트 등록

          // on ( Listener 와 동일 )
          // 데이터를 읽을 수 있는 최소 단위 를 CallBack 함수의 매개변수를 통해 전송된다.
          stream.on('data', function(fragment){
            console.log("count : " + count++);
            res.write(fragment);
          });
          // 3. Stream 완료 이벤트 등록
          stream.on('end', function(){
            console.log("Complete!!!!");
            res.end();
          });
          // 4. Stream 에러 이벤트 등록
          stream.on('error', function(error){
            res.end("error : " + error);
          });

        }else{
          // path 에 해당하는 파일을 읽는다.
          // Node,js 의 특징으로 파일을 읽거나 쓰는 Stream 처리를 Sub Thread 에서 실행된다.
          //          파일 경로, 인코딩(text만 UTF-8), 콜백 함수
          fs.readFile(filePath, function(error, data){
            if(error){
              res.writeHead(500, {'Content-type': 'text/html'});
              res.end("error : " + error);
            }else{
              res.writeHead(200, {'Content-type': mtype});
              res.end(data);
            }
          });
        }
      }else{
        // 파일이 없는 경우
      }
    }
  }else if(cmds[1] == 'html'){
    var filePath = path.substring(1);
    fs.readFile(filePath, function(error, data){
      if(error){
        res.writeHead(500, {'Content-type': 'text/html'});
        res.end("error : " + error);
      }else{
        res.writeHead(200, {'Content-type': mtype});
        res.end(data);
      }
    });
  }else{
    res.writeHead(404,{'Content-type':'text/html'});
    res.end("<h1>404 Page Not Found!</h1>")
  }
});

server.listen(8090,function(){
  console.log("Server is Running......................");
});
