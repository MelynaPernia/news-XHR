const form = document.getElementById('search-form');
const searchField = document.getElementById('search-keyword');
const responseContainer = document.getElementById('response-container');
const btnXHR = document.getElementById('submit-btn-XHR');
const btnFetch = document.getElementById('submit-btn-fetch');
let searchForText;

btnXHR.addEventListener('click', function(e){    
    e.preventDefault();
    console.log(e.target);
    responseContainer.innerHTML='';
    searchForText = searchField.value;
    getNews();    
})

btnFetch.addEventListener('click', function(e){
    e.preventDefault();
    responseContainer.innerHTML='';
    searchForText = searchField.value;
    const uri = `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchForText}&api-key=30c7889e37354746a462fceeffc60785`;
    console.log(uri);
    fetch(uri)
    .then(function(response){
        console.log(response);
        return response.json();
    })
    .then(function(data){
        console.log(data.response.docs[0]);
        const article = data.response.docs[0];
        const title = article.headline.main;
        const snippet = article.snippet;
        let li = document.createElement('li');
        li.className = 'articleClass';
        li.innerText =snippet;
        responseContainer.appendChild(li);

    })
    .catch(function(error){
        console.log(error)
    });       
})

function getNews() {
    const articleRequest = new XMLHttpRequest();
    articleRequest.onreadystatechange = function () {
    if (articleRequest.readyState == 4 && articleRequest.status == 200) {
        
        articleRequest.onload = addNews;
        articleRequest.onerror = handleError;   
    } 
    };
    articleRequest.open('GET',`http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchForText}&api-key=30c7889e37354746a462fceeffc60785`);
    articleRequest.send();
}

function handleError() {
    console.log('Se ha presentado un error');
}

function addNews() {
    const data = JSON.parse(this.responseText);
    const article = data.response.docs[0];
    const title = article.headline.main;
    const snippet = article.snippet;
    let li = document.createElement('li');
    li.className = 'articleClass';
    li.innerText = snippet;
    responseContainer.appendChild(li);

}