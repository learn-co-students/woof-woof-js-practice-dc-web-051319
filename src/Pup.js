class Pup{
    constructor(pup){
        this.id = pup.id;
        this.name = pup.name;
        this.isGoodDog = pup.isGoodDog;
        this.image = pup.image
    }


    spanElement(){
        const span = document.createElement('span');
        span.innerText = this.name;
        span.addEventListener('click', ()=> {PupController.showPup(this)});
        return span
    }

    imgElement(){
        const img = document.createElement('img');
        img.setAttribute("src", this.image )
        return img
    }

    h2Element(){
        const h2 = document.createElement('h2')
        h2.innerText = this.name
        return h2
    }

    buttonElement(){
        const button = document.createElement('button')
        if(this.isGoodDog){
            button.innerText = "Good Dog!"
        }
        else{
            button.innerText = "Bad Dog"
        }
        button.addEventListener('click', () => {PupController.toggleDogBehavior(this)})
        return button

    }
}