class Adapter{

    static getPups(){
        console.log('3. Fetching Pups')
        return fetch( "http://localhost:3000/pups")
        .then(response => response.json())
    }

    static patchPups(){


    }

}