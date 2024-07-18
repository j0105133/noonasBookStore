const API_KEY = `ttb02jw2356001`
let bookInfo = [];
let receivedISBN = '9788934942467';
function getDetailBookData (){
  var url = `http://www.aladin.co.kr/ttb/api/ItemLookUp.aspx?ttbkey=${API_KEY}&itemIdType=ISBN&ItemId=${receivedISBN}&Cover=Big&output=js&Version=20131101&OptResult=ebookList,usedList,reviewList&callback=detailBookDisplay`
// AJAX 요청을 보냅니다. getJSON() 함수는 알라딘 API 대용으로 사용불가.
  $.ajax({
    url: url,
    jsonp: "detailBookDisplay",
    dataType: "jsonp"
  });
}

// 콜백 함수
function detailBookDisplay(success) {
  console.log(success);
  console.log(success.item[0]);
  console.log(success.item[0].title);
  bookInfo = success.item;
  console.log("bookInfo", bookInfo);
  console.log("bookInfo[0]", bookInfo[0]);
  // render();
  detailRender();
}

getDetailBookData();

// function render (){
//   let bookHTML = ``;
//   bookHTML = bookInfo.map(book => `
//       <img src=${book.cover}>
//       <h4>${book.title}</h4>
//     `).join('');
//   document.getElementById('detail-board').innerHTML = bookHTML;
// }

function detailRender(){
  let detailBookImgHTML = ``;
  detailBookImgHTML = `<img src=${bookInfo[0].cover}>`;
  document.getElementById('detail-img').innerHTML = detailBookImgHTML;
  
  let detailBookTitle = `${bookInfo[0].title}`;
  document.getElementById('detail-info-title').textContent = detailBookTitle;

  let detailBookAuthor = `${bookInfo[0].author}`;
  document.getElementById('detail-info-author').textContent = detailBookAuthor;



}