const currentPage= location.pathname
const menuItens = document.querySelectorAll("header .links a")

for (item of menuItens){
    if(currentPage.includes(item.getAttribute("href"))){
        item.classList.add("active")
    }
}

//lógica de como apresentar os núemeros de qual página está
let totalPages = 20,
    selectedPage = 15,
    pages = [],
    oldpage

for (let currentPage = 1; currentPage <= totalPages; currentPage++){

    const firstAndLastPage = currentPage == 1 || currentPage == totalPages
    const pagesAfterSelectedPage = currentPage <= selectedPage + 2
    const pagesBeforeSelectedPag = currentPage>= selectedPage - 2

    if(firstAndLastPage || pagesBeforeSelectedPag && pagesAfterSelectedPage){
        pages.push(currentPage)


        oldpage = currentPage
    }
}

console.log(pages)