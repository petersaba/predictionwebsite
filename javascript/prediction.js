// automatically call the function to fetch a new dog image when the page is loaded/reloaded
getRandomDog()
var paragraphs = document.getElementsByTagName("p")
getGenderPrediction("peter")
getAgePrediction("peter")
getNationalityPrediction('peter')

// fetch the random dog response from the api and insert the given url in the message attribute into the src attribute of the image tag
async function getRandomDog(){
    let response = await fetch("https://dog.ceo/api/breeds/image/random")
    let dogObject = await response.json()
    document.getElementById("dog_img").src = dogObject.message
}

async function getGenderPrediction(name){
    let response = await fetch("https://api.genderize.io?name=" + name)
    let genderObject = await response.json()
    paragraphs[0].innerHTML = "Your gender is: <span>" + genderObject.gender + "</span>"
}

async function getAgePrediction(name){
    let response = await fetch("https://api.agify.io/?name=" + name)
    let ageObject = await response.json()
    paragraphs[1].innerHTML = "Your age is: <span>" + ageObject.age + "</span>"
}

async function getNationalityPrediction(name){
    let response = await fetch("https://api.nationalize.io/?name=" + name)
    let nationalityObject = await response.json()
    let countries = nationalityObject.country

    paragraphs[2].innerHTML = countries.length > 1 ? "Your nationalities are: " : "Your nationality is: "
    for(let i=0; i<2; i++){
        paragraphs[2].innerHTML += "<span>" + countries[i].country_id + "</span> "
    }
}
    