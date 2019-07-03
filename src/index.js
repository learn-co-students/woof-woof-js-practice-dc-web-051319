


document.addEventListener("DOMContentLoaded",()=> {
  fetchPups()
  let filterButton = document.querySelector("#good-dog-filter")
  filterButton.addEventListener("click", ()=>{
    filterPups(event)
  })
})



function fetchPups(){
  console.log("lets display pups")
  fetch("http://localhost:3000/pups")
  .then(response => response.json() )
  .then(arrayOfPupsObjects => iterateThroughArrayOfPupsObjects(arrayOfPupsObjects))
}

function iterateThroughArrayOfPupsObjects(arrayOfPupsObjects){
  console.log("iterate through the array of pups objects")
  arrayOfPupsObjects.forEach((pupObject) => { addPupToDogBar(pupObject)})
}

function addPupToDogBar(pupObject){
  console.log("add pup to dog bar")
  let dogBar = document.querySelector("#dog-bar")
  let spanDogBar = document.createElement("span")
  spanDogBar.innerText = pupObject.name
  spanDogBar.dataset.spanId = pupObject.id

  dogBar.append(spanDogBar)
  //add eventlistern on click of pupObject
  spanDogBar.addEventListener("click",()=>{
    displayPupInfo(pupObject)
  })
}

function displayPupInfo(pupObject){

  console.log("dislay pup info")
  let pupInfoContainer = document.querySelector("#dog-info")
  pupInfoContainer.innerHTML = ""

  //pup Info elements
  let pupImage = document.createElement("img")
  pupImage.src = pupObject.image

  let pupHeaderName = document.createElement("h2")
  pupHeaderName = pupObject.name

  let pupToggleButton = document.createElement("button")
  pupToggleButton.dataset.buttonId = pupObject.id

  //add correct button text to button
  if(pupObject.isGoodDog == true){
    pupToggleButton.innerText = "Good Dog!"
  }else{
    pupToggleButton.innerText = "Bad Dog!"
  }
  //make a if elese function , make a patch request
  pupToggleButton.addEventListener("click", ()=>{
    buttonEvent(event)
  }

)
pupInfoContainer.append(pupImage,pupHeaderName,pupToggleButton)
}

function buttonEvent(event){
  console.log(event)
  let pupStatus
  let pupButtonID = event.currentTarget.dataset.buttonId

  let buttonDisplay = event.currentTarget.innerText
  if (buttonDisplay == "Good Dog!") {
    pupStatus = false
  }else{
    pupStatus = true
  }

  fetch(`http://localhost:3000/pups/${pupButtonID}`, {
    method: "PATCH",
    headers:{
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      isGoodDog: pupStatus
    })
  })
  .then(resp => resp.json() )
  .then(data =>  {
    console.log(data)
    if(data.isGoodDog){
      console.log("change to good dog")
      console.log(  document.getElementById("dog-info").querySelector("button"))
      document.getElementById("dog-info").querySelector("button").innerText = "Good Dog!";
    }else{
      console.log("change to bad dog")
      console.log(  document.getElementById("dog-info").querySelector("button"))
      document.getElementById("dog-info").querySelector("button").innerText = "Bad Dog!";
    }
  })
}



function filterPups(event){
  if(event.currentTarget.innerText == "Filter good dogs: OFF"){
    console.log("turn on")
    event.currentTarget.innerText = "Filter good dogs: ON"
    filterDisplay()
  }else if (event.currentTarget.innerText == "Filter good dogs: ON"){
    console.log("turn off")
    event.currentTarget.innerText = "Filter good dogs: OFF"
    document.querySelector("#dog-bar").innerHTML = ""
    fetchPups()
  }
}
function filterDisplay(){
  console.log("inside filter")
  document.querySelector("#dog-bar").innerHTML = ""

  //for each element in dogBar go into database and fetch its isGoodDog value and display if iterateThroughArrayOfPupsObjects
  fetchFilterPups()
}
function fetchFilterPups(){
  fetch("http://localhost:3000/pups")
  .then(response => response.json() )
  .then(arrayOfPupsObjects => iterateFilterThroughArrayOfPupsObjects(arrayOfPupsObjects))
}

function iterateFilterThroughArrayOfPupsObjects(arrayOfPupsObjects){
  let filterArray = []
  arrayOfPupsObjects.forEach((pupObject) => {
    if(pupObject.isGoodDog == true){

      filterArray.push(pupObject)
    }
  })
  // debugger
  addFilterPupToDogBar(filterArray)
}

function addFilterPupToDogBar(filterArray){
  filterArray.forEach((pupObject)=>{
    addPupToDogBar(pupObject)
  })

}
