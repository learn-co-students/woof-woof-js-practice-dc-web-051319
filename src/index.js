const PUPSURL = "http://localhost:3000/pups/"

document.addEventListener("DOMContentLoaded",init);

function init(){
    populateDogBar();
    document.getElementById("good-dog-filter").addEventListener("click",filterHandler)
}

function populateDogBar(){
    fetch(PUPSURL)
    .then(res => res.json())
    .then(pups => {
        let filterButton = document.getElementById("good-dog-filter");
        if (filterButton.innerText==="Filter good dogs: ON"){
            document.getElementById("dog-bar").innerHTML="";
            let goodPups = pups.filter(goodPupFilter);
            goodPups.forEach(renderPup);
        }else{
        document.getElementById("dog-bar").innerHTML="";
        pups.forEach(renderPup)
        }
        
    });
}

function renderPup(pup){
    let dogBar = document.getElementById("dog-bar");
    let pupSpan = document.createElement("span");
        pupSpan.innerText = pup.name;
        pupSpan.dataset.pupId = pup.id;
        pupSpan.addEventListener("click", spanClickHandler);
    dogBar.append(pupSpan);
}

function spanClickHandler(e){
    fetch(PUPSURL+e.currentTarget.dataset.pupId)
    .then(res => res.json())
    .then(pup => renderExpanded(pup));
}    

function renderExpanded(pup){
    let dogDiv = document.getElementById("dog-info");
    dogDiv.innerHTML = "";
    dogDiv.innerHTML +=`
    <img src=${pup.image} />
    <h2>${pup.name}</h2>
    `;
    let dogButton = document.createElement("button");
    if (pup.isGoodDog){
        dogButton.innerText = "Good Dog!";
    }else{
        dogButton.innerText = "Bad Dog!";
    }
    dogButton.dataset.pupId = pup.id;
    dogButton.dataset.goodDog = pup.isGoodDog;
    dogButton.addEventListener("click",toggleGoodDog);
    dogDiv.append(dogButton);
}

function toggleGoodDog(e){
    let data;
    if (e.currentTarget.dataset.goodDog==="true"){
        data = {isGoodDog: false};
    }else{
        data = {isGoodDog: true};
    }
    fetch(PUPSURL+e.currentTarget.dataset.pupId,{
        method: "PATCH",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(updatedPup => dogStateUpdater(updatedPup))
}

function dogStateUpdater(updatedInfo){
    {
        console.log(updatedInfo);
        let dogButton = document.getElementById("dog-info").querySelector("button");
        if (updatedInfo.isGoodDog){
            dogButton.innerText = "Good Dog!"
        }else{
            dogButton.innerText = "Bad Dog!"
        }
        dogButton.dataset.goodDog = updatedInfo.isGoodDog;
    }
}

function filterHandler(){
    let filterButton = document.getElementById("good-dog-filter");
    if (filterButton.innerText==="Filter good dogs: OFF"){
        filterButton.innerText = "Filter good dogs: ON"
    }else{
        filterButton.innerText = "Filter good dogs: OFF"
    }
    console.log("Toggled Filter, current state", filterButton.innerText)
    populateDogBar();
}

function goodPupFilter(pup){
	return pup.isGoodDog === true;
}