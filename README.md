Android Programing
----------------------------------------------------
### 2017.10.24 24일차

#### 예제
____________________________________________________

#### 공부정리
____________________________________________________

##### __JavaScript__

- Object 설계 방법

  ```javascript
  // javascript Object 설계
  var request = {
    // 값
    one : "hello",
    two : 1,
    three : 5,
    // 기능
    sum : function(){
        return two+three;
    }
  };
  ```

##### __Node.js__

- URL 분석

  - 형식 (Object 형식으로 생성)

  ```javascript
  Url {
    protocol: null,
    slashes: null,
    auth: null,
    host: null,
    port: null,
    hostname: null,
    hash: null,
    search: '?id=root&pw=qwer1234',
    query: 'id=root&pw=qwer1234',
    pathname: '/screenshot/path',
    path: '/screenshot/path?id=root&pw=qwer1234',
    href: '/screenshot/path?id=root&pw=qwer1234' }
  ```

  - 사용

  ```javascript
  // url 모듈
  var u = require('url');
  // querystring 모듛
  var qs = require('querystring');

  var url = u.parse(request.url);
  // path 정보
  // /screenshot/path
  url.pathname;
  // query 정보
  // id=root&pw=qwer1234
  url.query;

  var queryString = qs.parse(url.query);
  queryString.id; // root
  queryString.pw; // qwer1234
  ```

- File 읽기

  - 모듈 설정

  ```javascript
  // fileStream 모듈
  // 파일을 읽을 수 있다.
  var fs = require("fs");
  ```

  - 사용 방법

  ```javascript
  // path 에 해당하는 파일을 읽는다.
  // Node,js 의 특징으로 파일을 읽거나 쓰는 Stream 처리를 Sub Thread 에서 실행된다.
  //           파일 경로, 인코딩, 콜백 함수
  fs.readFile(파일경로, 'UTF-8', function(error, data){
    var text = "";
    if(error){
      text = "서버 오류 : " + error;
    }else{
      // data에 읽은 파일의 정보들이 들어온다.
      text = data;
    }
    res.end(text);
  });
  ```

- Method 구별 방법

  ```javascript
  // GET, POST, DELETE, PUT 등이 온다.
  var method = request.method;

  // 대문자로 작성해야 한다.
  if(method == 'GET'){

  }else if(method == 'POST')
  ```

- File Type, 동영상 File 처리

  - 모듈 설정

  ```javascript
  // npm install -g mime
  // 으로 모듈을 설치해야 한다.
  var mime = require('mime');
  ```

  - 사용 방법

  ```javascript
  // url ? 뒤에 붙은 데이터를 object로 변환 : queryString.parse(url.query)
  // query 객체의 filepath 값 :
  var filePath = query.filepath;
  var mtype = mime.getType(filePath); // 파일의 mime Type 을 알려준다.

  // 동영상이라면
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
  }
  ```
