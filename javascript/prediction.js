// automatically call the function to fetch a new dog image when the page is loaded/reloaded
getRandomDog()
// store all paragraph elements in the page to change them based on user input
var paragraphs = document.getElementsByTagName("p")


// fetch the random dog response from the api and insert the given url in the message attribute into the src attribute of the image tag
async function getRandomDog(){
    let response = await fetch("https://dog.ceo/api/breeds/image/random")
    let dogObject = await response.json()
    document.getElementById("dog_img").src = dogObject.message
}

// same as the getRandomDog function but this time adding the given data into the first paragraph of the page
async function getGenderPrediction(name){
    let response = await fetch("https://api.genderize.io?name=" + name)
    let genderObject = await response.json()
    paragraphs[0].innerHTML = "Your gender is: <span>" + genderObject.gender + "</span>"
}

// same as the getGenderPrediction but for the 2nd paragraph
async function getAgePrediction(name){
    let response = await fetch("https://api.agify.io/?name=" + name)
    let ageObject = await response.json()
    paragraphs[1].innerHTML = "Your age is: <span>" + ageObject.age + "</span>"
}

// same as the getGenderPrediction but this time checking the length to display nationalities based on the number of nationalities given
async function getNationalityPrediction(name){
    let response = await fetch("https://api.nationalize.io/?name=" + name)
    let nationalityObject = await response.json()
    let countries = nationalityObject.country

    paragraphs[2].innerHTML = countries.length > 1 ? "Your nationalities are: " : "Your nationality is: "
    for(let i=0; i<2; i++){
        paragraphs[2].innerHTML += "<span>" + countries[i].country_id + "</span> "
    }
}
    
// get the value eneterd by the user and pass it to the api related functions to retreive the necessary data
async function predict(){
    let name = document.getElementById("user_name").value
    if (name){
        await getGenderPrediction(name)
        await getAgePrediction(name)
        await getNationalityPrediction(name)
    }
}   