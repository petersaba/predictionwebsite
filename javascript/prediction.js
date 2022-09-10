// automatically call the function to fetch a new dog image when the page is loaded/reloaded
getRandomDog()


// fetch the random dog response from the api and insert the given url in the message attribute into the src attribute of the image tag
async function getRandomDog(){
    response = await fetch("https://dog.ceo/api/breeds/image/random")
    dogObject = await response.json()
    document.getElementById("dog_img").src = dogObject.message
}