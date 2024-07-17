const API_KEY = `ttbqhfhfh3691231001`
let mdBookList = [];
let bestBookList = [];
let newBookList = [];


// 국내도서
function getBookData (){
  // 신간
  var newBookUrl = `http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=${API_KEY}&QueryType=ItemNewAll&MaxResults=6&start=1&SearchTarget=Book&output=js&Version=20131101&callback=newBookDisplay`

  // 베스트셀러
  var bestBookUrl = `http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=${API_KEY}&QueryType=Bestseller&MaxResults=4&start=1&SearchTarget=Book&output=js&Version=20131101&callback=bestBookDisplay&CategoryId=53476`
  
  // 편집자 추전
  var mdBookUrl = `http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=${API_KEY}&QueryType=ItemEditorChoice&MaxResults=4&start=1&SearchTarget=Book&output=js&Version=20131101&callback=mdBookDisplay&CategoryId=3060`


  // AJAX 요청
  // 신간
  $.ajax({
    url: newBookUrl,
    jsonp: "newBookDisplay",
    dataType: "jsonp"
  });
  // 베스트셀러
  $.ajax({
    url: bestBookUrl,
    jsonp: "bestBookDisplay",
    dataType: "jsonp"
  });
  // 편집자 추천
  $.ajax({
    url: mdBookUrl,
    jsonp: "mdBookDisplay",
    dataType: "jsonp"
  });
}

getBookData();


// 신간 display 함수
function newBookDisplay(success) {
  console.log("new 전체 데이터", success);
  newBookList = success.item;
  //console.log("md추천", bestBookList);
  newBookRender();
}


// 신간 render 함수
function newBookRender (){
  let newBookHTML = ``;
  newBookHTML = newBookList.map(book => `
    <div class="book__item ">
      <span class="book__img"><img class="bookImgSize" src=${book.cover} /></span>
      <dl class="book__text">
          <dt>${book.title}</dt>
          <dd>${book.author} / ${book.publisher}</dd>
      </dl>
    </div>`).join('');

  document.getElementById('book_list--roll').innerHTML = newBookHTML;
}


// 베스트셀러 display 함수
function bestBookDisplay(success) {
  console.log("best 전체 데이터", success);
  bestBookList = success.item;
  //console.log("md추천", bestBookList);
  bestBookRender();
}


// 베스트셀러 render 함수
function bestBookRender (){
  let bestBookHTML = ``;
  bestBookHTML = bestBookList.map(book => `
    <div class="book__item">
      <div class="book__img"><img class="bookImgSize" src=${book.cover} /></div>
      <dl class="book__text">
          <dt>${book.title}</dt>
          <dd>${book.author} / ${book.publisher}</dd>
      </dl>
  </div>`).join('');

  document.getElementById('book__list').innerHTML = bestBookHTML;
}


// 편집자 추천 도서 display 함수
function mdBookDisplay(success) {
  console.log("md 전체 데이터", success);
  mdBookList = success.item;
  console.log("md추천", mdBookList);
  mdBookRender();
}

// 편집자 추천도서 render 함수
function mdBookRender (){
  let mdBookHTML = ``;
  mdBookHTML = mdBookList.map(book => `
    <div class="theme__item">
      <div class="theme__img"><img class="bookImgSize" src=${book.cover} /></div>
      <dl class="theme__text">
          <dt>${book.title}</dt>
          <dd>${book.author} | ${book.publisher} | ${book.pubDate}</dd>
          <dd>${book.description}</dd>
      </dl>
  </div>`).join('');

  document.getElementById('theme__list').innerHTML = mdBookHTML;
}

// 외국도서