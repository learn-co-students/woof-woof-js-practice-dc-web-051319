class PupController{
    // Initializes after the DOM is loaded
    static init(){
        console.log('2. Initialize');
        PupController.addPupToPupBar();
    }
    
    // Adds Pup to the Dog bar
    static addPupToPupBar(){
        console.log("Adding dog to Dob bar")
        const dogBar = document.getElementById("dog-bar")
        Adapter.getPups()
        .then(pupArray => {pupArray.forEach( 
            (pup) => { 
                const p = new Pup(pup)
                dogBar.append(p.spanElement());
            }
        )})
    }

    static showPup(pup){
        console.log("In show pup function");
        const dogDiv = document.getElementById("dog-info");
        dogDiv.innerHTML = ""
        dogDiv.append(pup.imgElement(), pup.h2Element(), pup.buttonElement())
    }

    static toggleDogBehavior(pup){
        debugger
    }



}

// console.log("5. Rendering Pups")
// let dogBar = document.getElementById("dog-bar")
// let span = document.createElement('span')
// span.innerText = `${this.name}`
// dogBar.append(span)
// dogBar.addEventListener('click', this.showPup(this))