export class Pup {
  constructor(pup) {
    this.id = pup.id
    this.name = pup.name
    this.isGoodDog = pup.isGoodDog
    this.image = pup.image
  }

  showPup() {
    const pupDiv = document.createElement('div')
    pupDiv.dataset.id = this.id
    pupDiv.dataset.goodDog = this.isGoodDog

    const img = document.createElement('img')
    img.src = this.image

    const h2 = document.createElement('h2')
    h2.innerText = this.name

    const button = document.createElement('button')
    button.classList.add('toggle')
    this.isGoodDog ? button.innerText = "Good Dog!" : button.innerText = "Bad Dog!"
    
    pupDiv.append(img, h2, button)

    return pupDiv
  }
  
}