class Filter{

    static toggle(e){
       let theBar = document.getElementById("dog-bar")
        e.preventDefault()
        if (e.target.dataset.filter === "false") {
            e.target.innerText =  "Filter good dogs: OFF"
            e.target.dataset.filter =  "true"
            theBar.innerHTML = ''
            Dog.getPups()
          } else {
              theBar.innerHTML = ''
            e.target.innerText = "Filter good dogs: ON"
            e.target.dataset.filter = "false"
            fetch('http://localhost:3000/pups')
                .then(response => response.json())
                .then(dogs => {
                    dogs.forEach( dog => {
                        if(dog.isGoodDog == true){
                            let d = new Dog(dog)
                            d.putSpanToDOM()}
                        }
                    )
                }) 
            }

          }
       
        

    



}