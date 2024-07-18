let currentPage = 1;
const resultsPerPage = 10;
const maxPagesToShow = 5;

document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query');
    if (query) {
        document.getElementById('searchTitle').textContent += `"${query}"에 관련된 책 리스트 입니다`;
        searchBooks(query);
    }
});

async function searchBooks(query) {
    const apiKey = 'ttbj01022761248001';
    const url = `https://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=${apiKey}&Query=${encodeURIComponent(query)}&QueryType=Title&MaxResults=${resultsPerPage}&start=${(currentPage - 1) * resultsPerPage + 1}&SearchTarget=Book&Sort=SalesPoint&output=JS&callback=searchBookDisplay&Version=20131101`;

    // JSONP 요청
    $.ajax({
        url: url,
        dataType: 'jsonp',
        jsonpCallback: "searchBookDisplay",
        success: function(response) {
            console.log("API Response:", response);
        },
        error: function(error) {
            console.error("API 호출 실패:", error);
        }
    });
}

// JSONP 콜백 함수
function searchBookDisplay(success) {
    console.log("displayResults", success);
    if (success && success.item) {
        const bestBookList = success.item;
        displayResults(bestBookList);
        displayPagination(success.totalResults);
    } else {
        console.error("데이터가 없습니다.");
    }
}

function displayResults(books) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Clear previous results

    if (books && books.length > 0) {
        books.forEach((book, index) => {
            const bookHTML = `
                <div class="theme__item">
                    <div class="theme__img">
                        <img class="bookImgSize" src="${book.cover}" alt="${book.title}" />
                    </div>
                    <dl class="theme__text">
                        <dt>${(currentPage - 1) * resultsPerPage + index + 1}. ${book.title}</dt>
                        <dd>${book.author} | ${book.publisher} | ${book.pubDate}</dd>
                        <dd>${book.description}</dd>
                        <dd>가격: ${book.priceStandard}원</dd>
                    </dl>
                </div>
            `;

            const bookDiv = document.createElement('div');
            bookDiv.classList.add('book');
            bookDiv.innerHTML = bookHTML;

            bookDiv.onclick = () => {
                alert(`상세보기: ${book.title}`);
            };

            resultsDiv.appendChild(bookDiv);
        });
    } else {
        resultsDiv.textContent = '검색 결과가 없습니다.';
    }
}

function displayPagination(totalResults) {
    const paginationDiv = document.getElementById('pagination');
    paginationDiv.innerHTML = ''; // Clear previous pagination

    const totalPages = Math.ceil(totalResults / resultsPerPage);
    const currentGroup = Math.ceil(currentPage / maxPagesToShow);

    const startPage = (currentGroup - 1) * maxPagesToShow + 1;
    const endPage = Math.min(currentGroup * maxPagesToShow, totalPages);

    if (currentGroup > 1) {
        const firstButton = createPaginationButton('<<', () => goToPage(1));
        const prevButton = createPaginationButton('<', () => goToPage(startPage - 1));
        paginationDiv.appendChild(firstButton);
        paginationDiv.appendChild(prevButton);
    }

    for (let i = startPage; i <= endPage; i++) {
        const pageButton = createPaginationButton(i, () => goToPage(i));
        if (i === currentPage) {
            pageButton.classList.add('active');
        }
        paginationDiv.appendChild(pageButton);
    }

    if (currentGroup < Math.ceil(totalPages / maxPagesToShow)) {
        const nextButton = createPaginationButton('>', () => goToPage(endPage + 1));
        const lastButton = createPaginationButton('>>', () => goToPage(totalPages));
        paginationDiv.appendChild(nextButton);
        paginationDiv.appendChild(lastButton);
    }
}

function createPaginationButton(text, onClick) {
    const button = document.createElement('button');
    button.textContent = text;
    button.onclick = () => {
        onClick();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    return button;
}

function goToPage(page) {
    currentPage = page;
    const query = new URLSearchParams(window.location.search).get('query');
    searchBooks(query);
}
