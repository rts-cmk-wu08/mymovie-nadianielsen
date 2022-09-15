document.addEventListener("DOMContentLoaded", function(){

    let params = new URLSearchParams(window.location.search)
    let id = params.get("id")
    console.log(id)

    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=75f15351c6119a96302b866663e596b0&language=en-US`)
    .then(response => response.json())
    .then(data => {
        console.log(data)

        let imgPathPopular = "https://image.tmdb.org/t/p/w500"

        let detailsPosters = document.createElement("div")
        detailsPosters.classList.add("poster__flex")
        detailsPosters.innerHTML = `
        <img src="${imgPathPopular + data.poster_path}" alt="">
        
        `
        document.body.append(detailsPosters)
    })

})