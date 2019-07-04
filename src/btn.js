class Button{

    static toggle(stuff, e){
        e.preventDefault()
        let dog = e.target.innerText
        stuff.isGoodDog = !stuff.isGoodDog
          Button.editDog(stuff, e)
    }



    static editDog(stuff, e){
        fetch(`http://localhost:3000/pups/${stuff.id}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify({
                    isGoodDog: stuff.isGoodDog
                })
            })
            .then(response => response.json())
            .then(data => {
                if(data.isGoodDog === true){
                    e.target.innerText = "Good Dog"
                    
                }
                else{ 
                    e.target.innerText = "Bad Dog"
                    
                }
               
            })
            
        }


    }   