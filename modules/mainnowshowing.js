let main = function() {
    let element = document.createElement("main")
    element.classList.add("main")

    element.innerHTML = `
        <div class="nowshowing__flex">
        <h2 class="nowshowing__heading">Now Showing</h2>
        <button class="seemore__btn">See more</button>
        </div>
    `
    

    return element
}

export default main