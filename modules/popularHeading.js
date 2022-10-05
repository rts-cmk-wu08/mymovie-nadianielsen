let imgPath = "https://image.tmdb.org/t/p/original/"

let popular = function() {
    let element = document.createElement("div")
   
    element.innerHTML = `
    <div class="popular__heading__flex">
    <h2 class="popular__heading">Popular</h2>
    <button class="seemore__btn mulish__font">See more</button>
    </div>
    `
   

    return element
}

export default popular