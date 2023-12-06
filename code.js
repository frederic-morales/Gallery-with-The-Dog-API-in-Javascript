const API_URL_RANDOMS = 'https://api.thedogapi.com/v1/images/search?limit=3&api_key=live_xQIy8peowL7KxnUEI5CJ5MLOrj0RW3eYDFJtafjxbQvoc9gvrtNRAHCAug1jC0Bd'

const API_URL_FAVORITES = 'https://api.thedogapi.com/v1/favourites?limit=8&api_key=live_xQIy8peowL7KxnUEI5CJ5MLOrj0RW3eYDFJtafjxbQvoc9gvrtNRAHCAug1jC0Bd'

const buttonChange = document.getElementById('change-button')
const addFavoriteButton = document.getElementById('add-favorites-button')
const spanError = document.getElementById('error')

async function changeImage(){
    const res = await fetch(API_URL_RANDOMS)
    const data = await res.json()

    if (res.status !== 200) {
        spanError.innerHTML = `Hubo un error: ${res.status}`
    } else{
        const img1 = document.getElementById('img1')
        const img2 = document.getElementById('img2')
        const img3 = document.getElementById('img3')
        img1.src = data[0].url
        img2.src = data[1].url
        img3.src = data[2].url

        console.log(data);
    }
}

async function loadFavorites(){
    const res = await fetch(API_URL_FAVORITES)
    const data = await res.json()

    if(res.status !== 200){
        spanError.innerHTML = `Hubo un error: ${res.status}`
    } else{
        console.log("Todo perfecto bro");
    }

    console.log(data);
}

async function saveFavorites(){
    console.log("save")
    const res = await fetch(API_URL_FAVORITES, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            //'x-api-key': 'live_xQIy8peowL7KxnUEI5CJ5MLOrj0RW3eYDFJtafjxbQvoc9gvrtNRAHCAug1jC0Bd'
        },
        body: JSON.stringify({
            image_id: "-Lbz7P9jl"
        }),
    })
    if (res.status !== 200) {
        const data = await res.text();
        console.error("Error en la solicitud:", res.status, data);
        spanError.innerHTML = "Este es el error: " + data;
    } else {
        const data = await res.json();
        console.log(data);
    }
}


changeImage()
loadFavorites()
buttonChange.addEventListener("click", changeImage)


/*function changeImage(){
    fetch(API_URL)
    .then(res => res.json())
    .then(data => {
        const img = document.querySelector('img')
        img.src = data[0].url
    })
}*/