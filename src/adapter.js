const PUPS_URL = "http://localhost:3000/pups"

export class Adapter {

  static getPups() {
    return fetch(PUPS_URL).then(promise => promise.json())
  }

  static filterPups() {
    return fetch(PUPS_URL).then(promise => promise.json())
  }

  static getPup(id) {
    return fetch(`${PUPS_URL}/${id}`).then(promise => promise.json())
  }

  static updatePupStatus(data) {
    return fetch(`${PUPS_URL}/${data.id}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    })
    .then(promise => promise.json())
  }

}