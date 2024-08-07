const DW_API_KEY = 'ttbsueyesi2317002';
let bookInfo = [];
let receivedISBN = '';

// URL에서 isbn 파라미터 추출
const urlParams = new URLSearchParams(window.location.search);
const isbn = decodeURIComponent(urlParams.get('isbn')); // 디코딩된 ISBN 값 사용
console.log(isbn);

if (isbn) {
    // ISBN 13자리와 10자리 추출
    const { isbn13, isbn10 } = getIsbn13And10(isbn);
    receivedISBN = isbn13 || isbn10;

    if (receivedISBN) {
        getDetailBookData();
    } else {
        console.error('No valid ISBN found');
        $('#bookInfo').html('<p>유효한 ISBN을 찾을 수 없습니다.</p>');
    }
}

// ISBN 문자열을 공백으로 나누어 13자리와 10자리 ISBN을 추출하는 함수
function getIsbn13And10(isbnString) {
    const isbnArray = isbnString.split(' ');
    const isbn13 = isbnArray.find(isbn => isbn.length === 13);
    const isbn10 = isbnArray.find(isbn => isbn.length === 10);
    return { isbn13, isbn10 };
}

// 책 정보를 가져오는 함수
function getDetailBookData() {
    const url = `http://www.aladin.co.kr/ttb/api/ItemLookUp.aspx?ttbkey=${DW_API_KEY}&itemIdType=ISBN&ItemId=${receivedISBN}&Cover=Big&output=js&Version=20131101&OptResult=ebookList,usedList,reviewList&callback=detailBookDisplay`;

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
    detailRender();
}

// 책 세부 정보를 렌더링하는 함수
function detailRender() {
    if (bookInfo.length === 0) {
        $('#bookInfo').html('<p>책 정보를 로드할 수 없습니다.</p>');
        return;
    }

    let detailBookImgHTML = bookInfo[0].cover;
    document.getElementById('detail-img').src = detailBookImgHTML;

    let detailBookTitle = bookInfo[0].title;
    document.getElementById('detail-info-title').textContent = detailBookTitle;

    let detailBookAuthor = bookInfo[0].author;
    document.getElementById('detail-info-author').textContent = detailBookAuthor;

    let detailBookCate = bookInfo[0].categoryName;
    document.getElementById('detail-info-cate').textContent = detailBookCate;

    let detailBookPage = bookInfo[0].subInfo.itemPage;
    document.getElementById('detail-info-page').textContent = detailBookPage;

    let detailBookOTitle = bookInfo[0].subInfo.originalTitle;
    document.getElementById('detail-info-otitle').textContent = detailBookOTitle;

    let detailBookPub = bookInfo[0].publisher;
    document.getElementById('detail-info-pub').textContent = detailBookPub;

    let detailISBN = bookInfo[0].isbn;
    document.getElementById('detail-info-isbn').textContent = detailISBN;

    let detailDate = bookInfo[0].isbn;
    document.getElementById('detail-info-isbn').textContent = detailISBN;

    let detailBookDesc = bookInfo[0].description;
    document.getElementById('detail-book-desc').textContent = detailBookDesc;

    let detailBookBuyBtnA = bookInfo[0].link;
    document.getElementById('detail-book-buy-btn-aladin').setAttribute('href', detailBookBuyBtnA);

    let detailTitleFind = detailBookTitle;
    let detailBookBuyBtnK = `https://search.kyobobook.co.kr/search?keyword=${detailTitleFind}&gbCode=TOT&target=total`;
    document.getElementById('detail-book-buy-btn-kyobo').setAttribute('href', detailBookBuyBtnK);

    let detailBookBuyBtnY = `https://www.yes24.com/Product/Search?domain=ALL&query=${detailTitleFind}`;
    document.getElementById('detail-book-buy-btn-yes24').setAttribute('href', detailBookBuyBtnY);
}
