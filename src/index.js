document.addEventListener('DOMContentLoaded', init)
const URL = "http://localhost:3000/pups/"
const dogBar = document.getElementById("dog-bar")
const dogInfo = document.getElementById("dog-info")
const goodFilterBtn = document.getElementById("good-dog-filter")
goodFilterBtn.addEventListener("click", goodFilter)

function init() {
  getPuppers()
}

function getPuppers() {
  return fetch(URL)
  .then(resp => resp.json())
  .then(puppers => {
    puppers.forEach( pupper => {
      spanPuppers(pupper)
    })
  })
}

function getGoodPuppers() {
  return fetch(URL)
  .then( resp => resp.json())
  .then( puppers => {
    puppers.forEach( pupper => {
      if (pupper.isGoodDog == true) {
        spanPuppers(pupper)
      }
    })
  })
}

function spanPuppers(pupper) {
  let span = document.createElement("span")
  // span.setAttribute(`pupper-id`, pupper.id)
  span.dataset.pupperId = pupper.id
  span.innerText = pupper.name
  span.addEventListener("click",getPupper)
  dogBar.appendChild(span)
}

function getPupper(pupper) {
  let id = pupper.currentTarget.dataset.pupperId
  return fetch(URL + "/" + `${id}`)
  .then( resp => resp.json())
  .then( pupper => showPupper(pupper))
}

function showPupper(pupper) {
    console.log(pupper)
    dogInfo.innerHTML = ''
    let img = document.createElement("img")
    img.src = pupper.image
    let h2 = document.createElement("h2")
    h2.innerText = pupper.name
    let buttonGoodBad = document.createElement("button")
    if (pupper.isGoodDog) {
      buttonGoodBad.innerText = "Good Dog!"
    } else {
      buttonGoodBad.innerText = "Bad Dog!"
    }
    buttonGoodBad.dataset.pupperBtnId = pupper.id
    buttonGoodBad.dataset.isGood = pupper.isGoodDog
    buttonGoodBad.addEventListener("click", isGoodBad)
    dogInfo.appendChild(img)
    dogInfo.appendChild(h2)
    dogInfo.appendChild(buttonGoodBad)
}

function isGoodBad(event) {
  let id = event.target.dataset.pupperBtnId
  let isGoodDog = ""
  if (event.target.dataset.isGood == "true" ) {
    isGoodDog = false
  } else {
    isGoodDog = true
  }
  fetch(URL + "/" + `${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      isGoodDog
    })
  })
  .then(response => response.json())
  .then(value => {
    showPupper(value);
    if (goodFilterBtn.innerText == "Filter good dogs: ON") {
      dogBar.innerHTML = ""
      getGoodPuppers()
    } 
  })
}

function goodFilter(event) {
  console.log(event)
  dogBar.innerHTML = ""
  if (goodFilterBtn.innerText == "Filter good dogs: OFF") {

    goodFilterBtn.innerText = "Filter good dogs: ON"
    return getGoodPuppers()

  } else {

    goodFilterBtn.innerText = "Filter good dogs: OFF"
    return getPuppers()
  }
}


// function valueUpdate(value) {
//   let button = document.querySelector(`[data-pupper-btn-id='${value.id}']`)
//   if (value.isGoodDog) {
//     button.innerText = "Good Dog!"
//   } else {
//     button.innerText = "Bad Dog!"
//   }
// }
