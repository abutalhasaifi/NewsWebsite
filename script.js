const API_KEY="67bfdbeec0384af29edf92af427cad51";
/*  then we need api url where we hit api */
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () =>fetchNews("India")); // window load hogi fetchNews fucn call ho jayega

function reload()
{
    window.location.reload();
}
async function fetchNews(query)
{
    const res = await fetch(`${url}${query}&apikey=${API_KEY}`); // news come from server turant news milega nhi promise milega to wait krna hoga that's why await
    const data = await res.json();  // convert data to json formet returns promise that's why await
    console.log(data); // agar data aa gaya to print kr dega
    bindData(data.articles);
}

function bindData(articles)
{
    const cardsContainer= document.getElementById('cards-conatiner');
    const newsCardTemplate = document.getElementById('template-news-card');
    cardsContainer.innerHTML=""; // ooper agar 100 cards dale hein or aapne api call kr di to un 100 cards ke neeche aa jayenge cards jo hum nhi cahahte

    articles.forEach(article => {
        if(!article.urlToImage) return ; //kisi article me image nhi h to hum us article ko hi show nhi kr he
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone,article)
{
    const newsImg=cardClone.querySelector('#news-img');
    const newsTitle=cardClone.querySelector('#news-title');
    const newsSource=cardClone.querySelector('#news-source');
    const newsDesc=cardClone.querySelector('#news-desc');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone: "Asia/Jakarta"
    })
    
    newsSource.innerHTML = `${article.source.name} · ${date}`;

    // card pr click krne pr jis article se wo news uthai hai wahan pahunch jana h
    cardClone.firstElementChild.addEventListener("click",() =>{
        window.open(article.url, "blank");
    })
}

let curSelectedNav = null;
function onNavItemClick(id)
{
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav=navItem;
    curSelectedNav.classList.add('active');
}


const searchButton=document.getElementById('search-button');
const searchText=document.getElementById('search-text');

searchButton.addEventListener("click", ()=>
{
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove('active');
    curSelectedNav=null;
})