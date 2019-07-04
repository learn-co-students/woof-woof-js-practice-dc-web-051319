class pupInfo{

    static grabInfo(pup){
      let info = document.getElementById('dog-info')
        info.innerText = ""
      info.append(pup.img(), pup.h2(), pup.btn())
      
    }

    

}