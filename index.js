document.addEventListener("DOMContentLoaded", function(){

    let params = new URLSearchParams(window.location.search)
    let id = params.get("id")
    console.log(id)

    let imgPath = "https://image.tmdb.org/t/p/original/"
    let myKey = "75f15351c6119a96302b866663e596b0"

    let flexContainer = document.querySelector(".flex__container")

    let gridContainer = document.querySelector(".grid__container")

    fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=75f15351c6119a96302b866663e596b0&language=en-US&page=1`)
    .then(response => response.json())
    .then(data => {
        console.log(data)


            let hrefLink = document.createElement("div")
            hrefLink.innerHTML = `
            <h1 class="mymovies__heading">My movies</h1>
            `

            flexContainer.append(hrefLink)


            data.results.forEach(result => {
                let movies = document.createElement("div")
                movies.setAttribute("href", `detail.html?name=${result.name}` )
                movies.innerHTML = `
                <h2 class="nowshowing__heading">Now Showing</h2>
                <img class="posters__firstpage" src="${imgPath + result.poster_path}" alt="">
                <p>${result.title}</p>
                `

                gridContainer.append(movies)
            })
      
    })



})