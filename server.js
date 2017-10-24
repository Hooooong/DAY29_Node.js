// 1. Server Module 가져오기
var http = require("http");
// url 을 쪼개는 모듈(split 내장)
var url = require("url");
// queryString 을 쪼개는 모듈(split 내장)
var queryString = require("querystring");

// 2. Server 생성하기
var server = http.createServer(function(req, res){
  // var url = req.url
  // res.write("url : "+ url);
  // res.write("count : " + fibo.count);
  // res.end("fibo (100) : " + fibo.run());

  // url 을 쪼개서 객체로 만들어준다.
  // 객체명 : parsedUrl
  var parsedUrl = url.parse(req.url);
  console.log(parsedUrl);

  // parsedUrl 의 query 에는 ? 뒤의 값들이 들어온다.
  // query 를 쪼개서 객체로 만들어준다.
  // 객체명 : parsedQuery
  var parsedQuery = queryString.parse(parsedUrl.query);
  console.log(parsedQuery);

  res.write(parsedUrl.search + "\n");
  res.write(parsedUrl.query+ "\n");
  res.end("aaa : "  + parsedQuery.aaa);
});


// 3. Server 실행하기 -> Port : 8090
server.listen(8090, function(){
  console.log("Server is Running.......");
});

var fibo = {
  count : 100,
  run : function(){
    result = "";
    prev = 0;
    result += prev + ",";
    next = 1;
    result += next + ",";
    for(i = 0 ; i<this.count; i++){
      sum = prev + next;
      result += sum+", ";
      prev = next;
      next = sum;
    }
    return result;
  }
};
