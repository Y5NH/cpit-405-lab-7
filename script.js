let xhrbtn = document.getElementById("searcBtn");
let input = document.getElementById("term");
let apiKey = "IWRkr7hKlSF6MK9dzevvhVA4x5zBBd2R";
let searchresults = document.getElementById("searchresults");
let searcFetchbtn = document.getElementById("searcFetch");
let searcFetchAsyncAwait = document.getElementById("searcFetchAsyncAwait");



xhrbtn.addEventListener("click",function(){

    let q = input.value;
    getImgesUsingXHR(q);

})

searcFetchbtn.addEventListener("click", function(){
    let q = input.value;
    getImgesUsingFetch(q);

})

searcFetchAsyncAwait.addEventListener("click",function(){
    let q = input.value;
    getImgesUsingAsyncAwait(q);

})




function getImgesUsingXHR(q){
    //imges aaray
    let images = [];
    //sending an HTTP get using XHR

    let xhr = new XMLHttpRequest();
    let url = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + q;
    xhr.onreadystatechange = function (){
        if(xhr.readyState === 4 && xhr.status === 200){
            let resTxt = xhr.responseText;
            let resObj = JSON.parse(resTxt);

            for(let item of resObj.data){
                images.push(item.images.downsized_medium.url);
            }
            generatIMgElm(images);
        }

    }
    xhr.open("Get",url,true);
    xhr.send();
} 


function getImgesUsingFetch (q){
    let url = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + q;
    let images = [];

    fetch(url)
        .then((response) => {
            return response.json(); 

        })

        .then((resObj) => {
            for(let item of resObj.data){
                images.push(item.images.downsized_medium.url);
            }
            generatIMgElm(images);

        })

        .catch((e) => {
            console.log("error" ,e);
        })

}


async function  getImgesUsingAsyncAwait (q){
    let url = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + q;
    let images = [];
    let response = await fetch(url);
    let resObj = await response.json();
    for(let item of resObj.data){
        images.push(item.images.downsized_medium.url);
    }
    generatIMgElm(images);
}

function generatIMgElm(imgsurls){

    for(let imgUrl of imgsurls){
        let imgElment = document.createElement("img");
        imgElment.src= imgUrl;
        searchresults.appendChild(imgElment);

    }

}