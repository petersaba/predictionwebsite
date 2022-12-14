// automatically call the function to fetch a new dog image when the page is loaded/reloaded
getRandomDog()

// store all paragraph elements in the page to change them based on user input
var paragraphs = document.getElementsByTagName("p")
var all_users = document.cookie.split("; ")
checkIdentification()

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
    paragraphs[0].innerText = "Your gender is: "
    if(genderObject.gender){
        paragraphs[0].innerHTML += "<span>" + genderObject.gender + "</span>"
    }else{
        paragraphs[0].innerHTML += "<span>unknown</span>"
    }
}

// same as the getGenderPrediction but for the 2nd paragraph
async function getAgePrediction(name){
    let response = await fetch("https://api.agify.io/?name=" + name)
    let ageObject = await response.json()
    paragraphs[1].innerText = "Your as is: "
    if(ageObject.age){
        paragraphs[1].innerHTML += "<span>" + ageObject.age + "</span>"
    }else{
        paragraphs[1].innerHTML += "<span>unknown</span>"
    }
}

// same as the getGenderPrediction but this time checking the length to display nationalities based on the number of nationalities given
async function getNationalityPrediction(name){
    let response = await fetch("https://api.nationalize.io/?name=" + name)
    let nationalityObject = await response.json()
    let countries = nationalityObject.country

    paragraphs[2].innerHTML = countries.length > 1 ? "Your nationalities are: " : "Your nationality is: "
    if(countries.length > 1){
        for(let i=0; i<2; i++){
            paragraphs[2].innerHTML += "<span>" + countries[i].country_id + "</span> "
        }
    }else if(countries.length == 1){
        paragraphs[2].innerHTML += "<span>" + countries[0].country_id + "</span> "
    }else{
        paragraphs[2].innerHTML += "<span>unknown</span>"
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

function checkIdentification(){
    let choice
    while (choice != "y" && choice !="n") {
        choice = prompt("Do you already have an account?(y/n)")
        if (choice == "y"){
            loginPage()
        }else if (choice == "n"){
            registrationPage()
        }
    }
    getUserIp()
}

// show prompt as long as the username is already chosen or is null or empty
function registrationPage(){
    let username = prompt("enter new username")
    let all_usernames = getAllUsernames()
    while(isInArray(username, all_usernames) || !username){
        username = prompt("username is not available enter a new one")
    }
    let password
    while(!password){
        password = prompt("enter new password")
    }
    document.cookie = username + "=" + password + "; expires= Thu, 28 Nov 2030 12:00:00; path=/"
}

function loginPage(){
    let username = prompt("enter your username")
    let password = prompt("enter your password")
    while(!isInArray(username + "=" + password, all_users)){
        username = prompt("wrong info rewrite your username")
        password = prompt("enter your password")
    }
}

function getAllUsernames(){
    let all_usernames = []
    let username
    for(let i =0; i<all_users.length; i++){
        username = all_users[i].split("=")[0]
        all_usernames.push(username)
    }
    return all_usernames
}

function isInArray(value, arr){
    for(let i=0; i<arr.length; i++){
        if(value == arr[i]){
            return true
        }
    }
    return false
}

// index = length-2 as the span will be the one before the last as the last is for the ip address
async function getRandomActivity(){
    let response = await axios.get('https://www.boredapi.com/api/activity')
    let activityObject = await response.data
    let allSpans = document.querySelectorAll("span")
    allSpans[allSpans.length-2].innerText = activityObject.activity
}

async function getUserIp(){
    let response = await axios.get("https://api.ipify.org/?format=json")
    let ipObject = await response.data
    document.getElementById("ipAddress").innerHTML ="Your public Ip address is: <span>" + ipObject.ip + "</span>"
}