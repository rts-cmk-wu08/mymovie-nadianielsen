let imgPath = "https://image.tmdb.org/t/p/original/"

let mainPosters = function(result) {
    let element = document.createElement("a")
    element.classList.add("titles__textdecoration")
    element.setAttribute("href", `details.html?id=${result.id}` )

    element.innerHTML = `
        <img class="posters__firstpage" src="${imgPath + result.poster_path}" alt="">
        <p class="movies__titles mulish__font">${result.title}</p>
        <p class="vote__imdb mulish__font"><i class="fa-sharp fa-solid fa-star fa__star"></i> ${result.vote_average}/10 IMDb</p>
    `
    

    return element
}

export default mainPosters