console.log("soy el js");
const API_URL = 'https://api.thedogapi.com/v1/images/search?limit=3&api_key=live_xQIy8peowL7KxnUEI5CJ5MLOrj0RW3eYDFJtafjxbQvoc9gvrtNRAHCAug1jC0Bd'

const button = document.querySelector('button')

async function changeImage(){
    const res = await fetch(API_URL)
    const data = await res.json()

    const img1 = document.getElementById('img1')
    const img2 = document.getElementById('img2')
    const img3 = document.getElementById('img3')

    console.log(data);
    img1.src = data[0].url
    img2.src = data[1].url
    img3.src = data[2].url
}
changeImage()
document.addEventListener("click", changeImage)

/*function changeImage(){
    fetch(API_URL)
    .then(res => res.json())
    .then(data => {
        const img = document.querySelector('img')
        img.src = data[0].url
    })
}*/