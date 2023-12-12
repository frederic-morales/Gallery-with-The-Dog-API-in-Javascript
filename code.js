const API_URL_RANDOMS = 'https://api.thedogapi.com/v1/images/search?limit=3&api_key=live_xQIy8peowL7KxnUEI5CJ5MLOrj0RW3eYDFJtafjxbQvoc9gvrtNRAHCAug1jC0Bd'

const API_URL_FAVORITES = 'https://api.thedogapi.com/v1/favourites?limit=50&api_key=live_xQIy8peowL7KxnUEI5CJ5MLOrj0RW3eYDFJtafjxbQvoc9gvrtNRAHCAug1jC0Bd'

const API_URL_FAVORITES_DELETE = (id) => `https://api.thedogapi.com/v1/favourites/${id}?api_key=live_xQIy8peowL7KxnUEI5CJ5MLOrj0RW3eYDFJtafjxbQvoc9gvrtNRAHCAug1jC0Bd`

const API_URL_UPLOAD = 'https://api.thedogapi.com/v1/images/upload'


const buttonChange = document.getElementById('change-button')
const addFavoriteButton = document.getElementById('add-favorites-button')
const previewIMG = document.createElement('img') // FOTO VISTA PREVIA AL SUBIR TU CHUCHO

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

        const btn1 = document.getElementById('btn-random1')
        const btn2 = document.getElementById('btn-random2')
        const btn3 = document.getElementById('btn-random3')

        btn1.addEventListener("click", () => {
            saveFavorites(data[0].id)
            //console.log("Soy saveFavorite btn1");
        })
        btn2.addEventListener("click", () => {
            saveFavorites(data[1].id)
            //console.log("Soy saveFavorite btn2");
        })
        btn3.addEventListener("click", () => {
            saveFavorites(data[2].id)
            //console.log("Soy saveFavorite btn3");
        })
    }
}

async function loadFavorites(){
    const res = await fetch(API_URL_FAVORITES)
    const data = await res.json()

    if(res.status !== 200){
        spanError.innerHTML = `Hubo un error: ${res.status}`
    } else{
        const section = document.getElementById('favorites-container')
        section.innerHTML = " "
        
        const h2 = document.createElement('h2')
        const h2Text = document.createTextNode('Favoritos')
        h2.appendChild(h2Text)
        section.appendChild(h2)

        data.forEach(dog => {
            const article = document.createElement('article')
            const div = document.createElement('div')
            const img = document.createElement('img')
            const btn = document.createElement('button')
            const btonText = document.createTextNode('Eliminar de favoritos')

            btn.addEventListener('click', () => deleteFromFavorites(dog.id))

            img.src = dog.image.url
            btn.appendChild(btonText)
            div.appendChild(img)
            article.appendChild(div)
            article.appendChild(btn)
            section.appendChild(article)

            article.classList.add('favorite-img-container')
            div.classList.add('img-container')


            //dog.image.url
        });
    }

    console.log(data);
}

async function saveFavorites(id){
    console.log("save")
    const res = await fetch(API_URL_FAVORITES, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            //'x-api-key': 'live_xQIy8peowL7KxnUEI5CJ5MLOrj0RW3eYDFJtafjxbQvoc9gvrtNRAHCAug1jC0Bd'
        },
        body: JSON.stringify({
            image_id: id
        }),
    })
    if (res.status !== 200) {
        const data = await res.json();
        console.error("Error en la solicitud:", res.status, data)
        spanError.innerHTML = "Este es el error: " + data
    } else {
        const data = await res.json()
        console.log(data)
        loadFavorites()
    }
}

async function deleteFromFavorites(id){
    const res = await fetch(API_URL_FAVORITES_DELETE(id), {
        method: 'DELETE'
    })

    if (res.status !== 200) {
        const data = await res.json();
        console.error("Error en la solicitud:", res.status, data)
        spanError.innerHTML = "Este es el error: " + data
    } else{
        console.log("liminacion exitosa");
        loadFavorites()
    }
}

async function uploadDogPhoto(){
    const form = document.getElementById('uploadingForm')
    const formData = new FormData(form)
    //console.log(formData.get('file'))

    const res = await fetch(API_URL_UPLOAD, {
        method: 'POST',
        headers: {
            //'Content-Type': 'multipart/form-data',
            'X-API-KEY': 'live_xQIy8peowL7KxnUEI5CJ5MLOrj0RW3eYDFJtafjxbQvoc9gvrtNRAHCAug1jC0Bd'
        },
        body: formData
    })


    if (res.status > 100 && res.status < 200 || res.status > 300) {
        const data = await res.json();
        console.error("Error en la solicitud:", res.status, data)
        console.log(data)
        spanError.innerHTML = "Este es el error: " + data
    } else{
        console.log("Foto subida exitosamente")
        const data = await res.json();
        console.log("estado:", res.status, data)
        const photoId = data.id
        saveFavorites(photoId)
        previewIMG.style.display = "none"
    }

}

changeImage()
loadFavorites()
buttonChange.addEventListener("click", changeImage)

const input = document.getElementById('file')
input.addEventListener('change', event => {
    //console.log(event.target.files[0].name)
    const divImg = document.getElementById('uploadingDog_previewIMG')
    divImg.appendChild(previewIMG)

    if (event.target.files[0]) {
        previewIMG.style.display = "block"
        const reader = new FileReader()
        reader.onload = () => previewIMG.src = reader.result
        reader.readAsDataURL(event.target.files[0])
    } else{
        log("hola bro soy else")
    }   
})


/*function changeImage(){
    fetch(API_URL)
    .then(res => res.json())
    .then(data => {
        const img = document.querySelector('img')
        img.src = data[0].url
    })
}*/