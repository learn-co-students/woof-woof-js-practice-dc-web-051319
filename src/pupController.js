import {Pup} from './pup.js'
import {Adapter} from './adapter.js'

export class PupController {

  static init() {
    const filter = document.getElementById('good-dog-filter')
    filter.addEventListener('click', PupController.handleFilterPups)
    Adapter.getPups().then(PupController.renderPupNames)
  }

  static handleFilterPups() {
    Adapter.filterPups().then(PupController.filterPups)
  }

  static filterPups(pups) {
    const filter = document.getElementById('good-dog-filter')
    const dogBar = document.querySelector('#dog-bar')
    dogBar.innerHTML = ''

    if (filter.innerText == "Filter good dogs: OFF") {
      filter.innerText = "Filter good dogs: ON"
      pups.forEach(pup => {
        if (pup.isGoodDog) {
          const span = document.createElement('span')
          span.dataset.id = pup.id
          span.addEventListener('click', PupController.handleRenderPup)
          span.innerText = pup.name
          dogBar.appendChild(span)
        }
      })
      
    } else {
      filter.innerText = "Filter good dogs: OFF"
      PupController.renderPupNames(pups)
    }

    
  }

  static renderPupNames(pups) {
    const dogBar = document.querySelector('#dog-bar')
    dogBar.innerHTML = ''

    pups.forEach(pup => {
      const span = document.createElement('span')
      span.dataset.id = pup.id
      span.addEventListener('click', PupController.handleRenderPup)
      span.innerText = pup.name
      dogBar.appendChild(span)
    })
  }

  static handleRenderPup(e) {
    const id = e.target.dataset.id
    Adapter.getPup(id).then(PupController.renderPup)
  }

  static renderPup(pup) {
    const dogInfo = document.querySelector('#dog-info')
    dogInfo.innerHTML = ''
    dogInfo.append(new Pup(pup).showPup())
    const button = document.querySelector('.toggle')
    button.addEventListener('click', PupController.handleUpdatePup)
  }

  static handleUpdatePup(e) {
    const id = e.target.parentElement.dataset.id
    const goodStatus = e.target.parentElement.dataset.goodDog

    let isGoodDog
    goodStatus == "true" ? isGoodDog = true : isGoodDog = false

    const data = {
      id: id,
      isGoodDog: !isGoodDog
    }

    Adapter.updatePupStatus(data).then(PupController.updatePup)
  }

  static updatePup(data) {
    const button = document.querySelector('.toggle')
    document.querySelector('[data-good-dog]').dataset.goodDog = data.isGoodDog
    data.isGoodDog ? button.innerText = "Good Dog!" : button.innerText = "Bad Dog!"
  }

}