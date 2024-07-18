const API_KEY = `ttbqhfhfh3691231001`
let mdBookList = [];
let bestBookList = [];
let newBookList = [];
let tabBtn = document.querySelectorAll('.tab__item');


// 문서의 모든 요소가 불러와진 후 실행되는 함수
// 메뉴별 화면 변경 함수
window.onload = function(){
  let menu = document.querySelectorAll('.nav__menu__item');
  console.log(menu);

  for (let i = 0; i < menu.length; i++){
    $('.nav__menu__item').eq(i).on('click', function(){
      $('.nav__menu__item').removeClass('active'); 
      $('.nav__menu__item').eq(i).addClass('active');
    });
  }

  menu.forEach(item => item.addEventListener('click', (event) => categoryBookRender(event)));
}



// 국내도서
// 최초 화면 렌더링
function getBookData (){
  // 신간
  let newBookUrl = `http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=${API_KEY}&QueryType=ItemNewAll&MaxResults=6&start=1&SearchTarget=Book&output=js&Version=20131101&callback=newBookDisplay`

  // 베스트셀러
  let bestBookUrl = `http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=${API_KEY}&QueryType=Bestseller&MaxResults=4&start=1&SearchTarget=Book&output=js&Version=20131101&callback=bestBookDisplay&CategoryId=53476`
  
  // 편집자 추전
  let mdBookUrl = `http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=${API_KEY}&QueryType=ItemEditorChoice&MaxResults=4&start=1&SearchTarget=Book&output=js&Version=20131101&callback=mdBookDisplay&CategoryId=3060`

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



// 화면 렌더링 함수
function menuBook (menu){
  let newBookUrl = `http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=${API_KEY}&QueryType=ItemNewAll&MaxResults=6&start=1&SearchTarget=${menu}&output=js&Version=20131101&callback=newBookDisplay`

    // 베스트셀러
    let bestBookUrl = `http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=${API_KEY}&QueryType=Bestseller&MaxResults=4&start=1&SearchTarget=${menu}&output=js&Version=20131101&callback=bestBookDisplay`
    
    // 편집자 추전
    let mdBookUrl = `http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=${API_KEY}&QueryType=Bestseller&MaxResults=4&start=2&SearchTarget=${menu}&output=js&Version=20131101&callback=mdBookDisplay`

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

// 메뉴별 화면 render 함수
function categoryBookRender(event){
  let menuCategory = event.target.textContent;
  //console.log(category);
  if (menuCategory == "국내도서"){
    getBookData();
  } else if (menuCategory == "외국도서"){
    let menu = "Foreign";
    menuBook(menu);
  } else if (menuCategory == "eBook"){
    let menu = "eBook";
    menuBook(menu);
  }
}











// 신간 display 함수
function newBookDisplay(success) {
  //console.log("new 전체 데이터", success);
  newBookList = success.item;
  //console.log("md추천", bestBookList);
  newBookRender();
}

// 신간 render 함수
function newBookRender (){
  let newBookHTML = ``;
  newBookHTML = newBookList.map(book => `
    <div class="book__item">
      <span class="book__img"><img class="bookImgSize" src=${book.cover} /></span>
      <dl class="book__text">
          <dt>${book.title}</dt>
          <dd>${book.author} / ${book.publisher}</dd>
      </dl>
    </div>`).join('');

  document.getElementById('book_list--roll').innerHTML = newBookHTML;
}





// 각 탭 버튼에 베스트셀러 랜더 함수 부착
tabBtn.forEach(item => item.addEventListener('click', (event) => getBestBookRender(event)));


// 베스트셀러 탭 메뉴 클릭 이벤트
for (let i = 0; i < tabBtn.length; i++){
  $('.tab__item').eq(i).on('click', function(){
    $('.tab__item').removeClass('tab__item--active'); 
    $('.tab__item').eq(i).addClass('tab__item--active');
  });
}


// 베스트셀러 display 함수
function bestBookDisplay(success) {
  //console.log("best 전체 데이터", success);
  bestBookList = success.item;
  //console.log("md추천", bestBookList);
  bestBookRender();
}


// 베스트셀러 render 함수
function bestBookRender (){
  let bestBookHTML = ``;
  bestBookHTML = bestBookList.map(book => `
    <div class="book__item tab__book__item tab__book__display__none show">
      <div class="book__img"><img class="bookImgSize" src=${book.cover} /></div>
      <dl class="book__text">
          <dt>${book.title}</dt>
          <dd>${book.author} / ${book.publisher}</dd>
      </dl>
  </div>`).join('');

  document.getElementById('book__list').innerHTML = bestBookHTML;
}


// 베스트셀러 파트 탭 메뉴 함수
function getBestBookRender (event){
  let category = event.target.textContent;
  if (category == '건강/취미'){
      let bestBookUrl = `http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=${API_KEY}&QueryType=Bestseller&MaxResults=4&start=1&SearchTarget=Book&output=js&Version=20131101&callback=bestBookDisplay&CategoryId=53476`

      // 베스트셀러
      $.ajax({
        url: bestBookUrl,
        jsonp: "bestBookDisplay",
        dataType: "jsonp"
      });
  } else if (category == '여행'){
      let bestBookUrl = `http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=${API_KEY}&QueryType=Bestseller&MaxResults=4&start=1&SearchTarget=Book&output=js&Version=20131101&callback=bestBookDisplay&CategoryId=51377`

      // 베스트셀러
      $.ajax({
        url: bestBookUrl,
        jsonp: "bestBookDisplay",
        dataType: "jsonp"
      });
  } else if (category == '인문학'){
    let bestBookUrl = `http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=${API_KEY}&QueryType=Bestseller&MaxResults=4&start=1&SearchTarget=Foreign&output=js&Version=20131101&callback=bestBookDisplay&CategoryId=656`

      // 베스트셀러
      $.ajax({
        url: bestBookUrl,
        jsonp: "bestBookDisplay",
        dataType: "jsonp"
      });
  }
}





// 편집자 추천 도서 display 함수
function mdBookDisplay(success) {
  //console.log("md 전체 데이터", success);
  mdBookList = success.item;
  //console.log("md추천", mdBookList);
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