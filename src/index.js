// write your code here
document.addEventListener('DOMContentLoaded', ()=>{
    let ramens
    ramenData().then(data => {
        ramens = data
        console.log(ramens)
        displayRamen(ramens)
        imageClick(ramens)
        newRamen(ramens)
    })
})

function ramenData(){
    return fetch('http://localhost:3000/ramens')
    .then(resp => resp.json())
    .then(data => data)
}

function displayRamen(ramens){
    const menu = document.querySelector('#ramen-menu')
    i=0
    ramens.forEach(ramen => {
        i++
        const img = ramen.image
        const imageTag = document.createElement('img')
        imageTag.id = i
        imageTag.setAttribute('src',img)
        menu.appendChild(imageTag)
    })
}

function imageClick(ramens) {
    const menu = document.querySelector('#ramen-menu')
    const detail = document.querySelector('#ramen-detail')
    const ratingTag = document.querySelector('#rating-display')
    const commentDisplay = document.querySelector('#comment-display')
    menu.addEventListener('click',(event)=>{
        const id = event.target.id
        const clickedPhoto = ramens.find(ramen => parseInt(ramen.id) === parseInt(id))
        if (clickedPhoto){
            detail.innerHTML = `
                <img class="detail-image" src="${clickedPhoto.image}" alt="${clickedPhoto.name}" />
                <h2 class="name">${clickedPhoto.name}</h2>
                <h3 class="restaurant">${clickedPhoto.restaurant}</h3>`
            const rating = clickedPhoto.rating
            const comment = clickedPhoto.comment
            ratingTag.textContent = rating
            commentDisplay.textContent = comment
        }
    })
}

function newRamen(ramens){
    const menu = document.querySelector('#ramen-menu')
    const form = document.querySelector('#new-ramen')
    const detail = document.querySelector('#ramen-detail')
    const ratingTag = document.querySelector('#rating-display')
    const commentDisplay = document.querySelector('#comment-display')
    form.addEventListener('submit', (e)=>{
        e.preventDefault()
        const name = document.querySelector('#new-name').value
        const restaurant = document.querySelector('#new-restaurant').value
        const image = document.querySelector('#new-image').value
        const imageTag = document.createElement('img')
        const ramenCount = ramens.length
        imageTag.id = parseInt(ramenCount+1)
        imageTag.setAttribute('src', image)
        const rating = document.querySelector('#new-rating').value
        const comment = document.querySelector('#new-comment').value
        menu.appendChild(imageTag)
        const newObj = 
            {
                "id": `${imageTag.id}`,
                "name": `${name}`,
                "restaurant": `${restaurant}`,
                "image": `${image}`,
                "rating": `${rating}`,
                "comment": `${comment}`
             }
        ramens.push(newObj)
        form.reset()
    })
}

