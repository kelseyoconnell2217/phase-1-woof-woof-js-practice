const dogBar = document.getElementById('dog-bar')
const info = document.getElementById('dog-info')
const filter = document.getElementById('good-dog-filter')

filter.addEventListener('click', ()=>{
    if(filter.innerText === 'Filter good dogs: OFF'){
        filter.innerText = 'Filter good dogs: ON'
    }else if(filter.innerText === 'Filter good dogs: ON'){
        filter.innerText = 'Filter good dogs: OFF'
    };
    dogBar.innerHTML=''
    reFetch()
})
function reFetch(){
    fetch('http://localhost:3000/pups')
.then(resp => resp.json())
.then(response => response.map(object => filterDogs(object)))
}


fetch('http://localhost:3000/pups')
.then(resp => resp.json())
.then(response => response.map(object => filterDogs(object)))

function filterDogs(object){
    if(filter.innerText === 'Filter good dogs: OFF'){
    addDog(object)}
    else{
        if(object.isGoodDog === true){
            addDog(object)}
        }
    }


function addDog(doggo){
    
        let span = document.createElement('span')
        span.innerText = doggo.name
        span.id = doggo.id
        span.addEventListener('click', viewDog)
        dogBar.appendChild(span)
    
}

function viewDog(e){
    info.innerHTML=''
    let dogId= e.target.id
    fetch(`http://localhost:3000/pups/${dogId}`)
    .then(response => response.json())
    .then(resp => dogDetails(resp))
}
function dogDetails(clickedDog){
    let img = document.createElement('img')
    img.src=clickedDog.image
    img.id='dog-info img'
    info.appendChild(img)
    let dogName = document.createElement('h2')
    dogName.innerText = clickedDog.name
    info.appendChild(dogName)
    let goodButton = document.createElement('button')
    goodButton.className = 'goodButton'
    goodButton.id = clickedDog.id
    goodButton.innerText = convertGoodOrBad(clickedDog.isGoodDog)
    info.appendChild(goodButton)
    goodButton.addEventListener('click', patchDog)
}   

function convertGoodOrBad(isGood) {
    if(isGood){
        return 'Good Dog!'
    } else return 'Bad Dog!'
}

function patchDog(e){
    let parentNode = e.target.parentNode
    let dogId = parentNode.querySelector('.goodButton').id;
    let goodButton = parentNode.querySelector('.goodButton');
    console.log(goodButton.innerText === 'Good Dog!' ? false : true)
                
            
    fetch(`http://localhost:3000/pups/${dogId}`, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          method: "PATCH",
          body: JSON.stringify(
            {isGoodDog: goodButton.innerText === 'Good Dog!' ? false : true})
        })
        .then(resp => {
            if(resp.status >=200 && resp.status < 300){
                changeButton(goodButton)
            }
        })
    function changeButton(goodButton){
        (goodButton.innerText)
        if(goodButton.innerText === 'Good Dog!'){
            goodButton.innerText= 'Bad Dog!'
        }else{goodButton.innerText = 'Good Dog!'}
    }
    
    }

