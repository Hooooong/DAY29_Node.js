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

console.log(request.one);
console.log(request.sum());
