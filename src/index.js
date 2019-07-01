const PUPS_URL = 'http://127.0.0.1:3000/pups'

document.addEventListener('DOMContentLoaded', function(){
    getPups()
    goodDogFilter().addEventListener('click', filterPups)
})

// api 

// function getFilteredPups(){
//     fetch(PUPS_URL)
//     .then(resp => resp.json())
//     .then(pups => {
//         dogBar().innerHTML = ""
//         dogInfo().innerHTML = ""
//         pups = pups.filter(pup => pup.isGoodDog === true)
//         pups.forEach(pup => addPup(pup))
//         console.log(pups)
//     })
// }

function getPups(){
    fetch(PUPS_URL)
    .then(resp => resp.json())
    .then(pups => {
        dogBar().innerHTML = ""
        dogInfo().innerHTML = ""
        pups.forEach(pup => addPup(pup))
        console.log(pups)
    })
}

function getPupSummary(){
    fetch(`${PUPS_URL}/${event.target.id}`)
    .then(resp => resp.json())
    .then(pup => {
        dogInfo().innerHTML = ""
        displayPupSummary(pup)
    })
}

function patchIsGoodDog(){
    let pupId = event.target.dataset.pupId
    let pup = document.getElementById(pupId)
    let pupBool
    if (event.target.innerText === "Good Dog!") {
        pup.dataset.isGoodPup = true
        event.target.innerText = "Bad Dog!"
        pupBool = true
    } else {
        pup.dataset.isGoodPup = false
        event.target.innerText = "Good Dog!"
        pupBool = false
    }
    fetch(`${PUPS_URL}/${pupId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify({isGoodDog: pupBool})
    })
    .then(resp => resp.json())
    .then(pup => console.log(pup))
    
}

// modiify dom

function filterPups(event){
    let spans = dogBar().children
    if (event.target.innerText === "Filter good dogs: OFF"){
        for (let i = 0; i < spans.length; i++){
            if (spans[i].dataset.isGoodPup === 'false'){
                spans[i].style.display = 'none'
            }
        }
        event.target.innerText = "Filter good dogs: ON"
    } else {
        for (let i = 0; i < spans.length; i++){
            spans[i].style.display = 'flex'
        }
        event.target.innerText = "Filter good dogs: OFF"
    }
}

function addPup(pup){
    let span = document.createElement('span')
    span.dataset.isGoodPup = pup.isGoodDog
    span.innerText = pup.name
    span.id = pup.id
    span.addEventListener('click', getPupSummary)

    dogBar().appendChild(span)
}

function displayPupSummary(pup){
    let img = document.createElement('img')
    img.src = pup.image

    let h2 = document.createElement('h2')
    h2.innerText = pup.name 

    let btn = document.createElement('button')
    btn.addEventListener('click', patchIsGoodDog)
    btn.dataset.pupId = pup.id
    if (pup.isGoodDog === true) {
        btn.innerText = "Bad Dog!"    
    } else {
        btn.innerText = "Good Dog!"
    }

    dogInfo().append(img, h2, btn)
}

// selector

function dogBar(){
    return document.getElementById('dog-bar')
}

function dogInfo(){
    return document.getElementById('dog-info')
}

function goodDogFilter(){
    return document.getElementById('good-dog-filter')
}