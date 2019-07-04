class Dog{
    
    constructor(dog){
        
        this.id = dog.id
        this.name = dog.name
        this.isGoodDog = dog.isGoodDog
        this.image = dog.image
        
       


    }

    

    static getPups(){
             fetch('http://localhost:3000/pups')
            .then(resp => resp.json())
            .then(dogs => {
                dogs.forEach(dog => { 
                  let d = new Dog(dog)
                  d.putSpanToDOM()
            })
        })
    }

     putSpanToDOM(){
        
       let div = document.getElementById("dog-bar")
        let span = document.createElement('span')
        span.classList.add(`${this.isGoodDog}`)
        span.innerText = this.name
        span.addEventListener('click', () => pupInfo.grabInfo(this))
        div.appendChild(span)
       
    }

    h2(){
    let h2 = document.createElement('h2')
    h2.innerText = this.name 
        return h2
    }

    img(){
        let img = document.createElement('img')
        img.src = this.image
        return img
    }

    btn(){
        let btn = document.createElement('button')
        btn.innerText = this.isGoodDog ? "Good Dog" : "Bad Dog"
        btn.addEventListener("click", (e) => Button.toggle(this, e))
        return btn
    }

    hidden(){
        let input = document.createElement('input')
        input.setAttribute('type', 'hidden')
        input.setAttribute("id", `${this.id}`)
        input.setAttribute("value", `${this.isGoodDog}`)
        return input
    }

    static getFilter(){
        let goodDogFilter = document.getElementById("good-dog-filter")
        return goodDogFilter.addEventListener("click", (e) => Filter.toggle(e))
        
    }
    
}