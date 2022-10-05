let header = function() {
    let element = document.createElement("header")
    element.classList.add("header")

    element.innerHTML = `
    <div class="header__flex">
    <label class="switch">
    <input type="checkbox">
    <span class="slider round"></span>
    </label>
    <h1 class="mymovies__heading">MyMovies</h1>
    </div>
    `

    return element
}

export default header