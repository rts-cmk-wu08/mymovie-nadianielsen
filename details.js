document.addEventListener("DOMContentLoaded", function(){

    let params = new URLSearchParams(window.location.search)
    let id = params.get("id")
    console.log(id)
    
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=75f15351c6119a96302b866663e596b0&language=en-US`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        
        let imgPathPopular = "https://image.tmdb.org/t/p/w500"
 
        let detailsPosters = document.createElement("header")
        detailsPosters.classList.add("header__flex")
        detailsPosters.innerHTML = `
        <a href="index.html" class="link__arrow"><i class="fa-solid fa-arrow-left-long arrow__left"></i></a> 
        <label class="switch">
        <input type="checkbox">
        <span class="slider round"></span>
        </label>
        <img class="poster__img" src="${imgPathPopular + data.poster_path}" alt="">
        `
        document.body.append(detailsPosters)
        
        let detailsMain = document.createElement("main")
        detailsMain.classList.add("main__detailswhitebox")
        detailsMain.innerHTML = `
        <div class="text__flex">
        <h1 class="titles__details mulish__font">${data.title}</h1>
        <i class="fa-regular fa-bookmark bookmark"></i>
        </div>
        <p class="mulish__font vote__imdb"><i class="fa-sharp fa-solid fa-star fa__star"></i> ${data.vote_average}/10 IMDb</p>
        `

        document.body.append(detailsMain)

        const flexContainerGenre = document.createElement("div")
        flexContainerGenre.classList.add("flexcontainer__genre")
        detailsMain.append(flexContainerGenre)
        
        data.genres.forEach(genre => {
            genreMain = document.createElement("div")
            genreMain.innerHTML = `
            <span class="genres mulish__font">${genre.name}</span>
            `
    
            flexContainerGenre.append(genreMain)
        })

        let hours = Math.floor(data.runtime / 60)

        let minutes = data.runtime % 60;

            let detailsDescription = document.createElement("div")
            detailsDescription.innerHTML = `
            <div class="length__language__release">
            <p class="mulish__font length__heading">Length</p>
            <p class="mulish__font language__heading">Language</p>
            <p class="mulish__font release__heading">Release date</p>
            </div>
            <div class="length__language__release">
            <p class="mulish__font runtime__movies">${hours + "h " + minutes + "min"}</p>
            <p class="spoken__language">${data.spoken_languages[0].name}</p>
            <p class="release__date__text">${data.release_date}</p>
            </div>
            <h2 class="description__heading">Description</h2>
            <p class="mulish__font overview__description">${data.overview}</p>
        `

        detailsMain.append(detailsDescription)

        let imgPathCast ="https://image.tmdb.org/t/p/original"
      
        fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=75f15351c6119a96302b866663e596b0&language=en-US`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            
            let castHeadline = document.createElement("div")
            castHeadline.innerHTML = `
            <h3 class="cast__heading">Cast</h3>
            `

            detailsMain.append(castHeadline)

            const flexContainerCast = document.createElement("div")
            flexContainerCast.classList.add("flexcontainer__cast")
            detailsMain.append(flexContainerCast)
    
            data.cast.forEach(casts => {
                let castsOfMovies = document.createElement("div")
                castsOfMovies.innerHTML = `
                <img class="profile__cast__picture" src="${imgPathCast + casts.profile_path}" alt="">
                <p class="mulish__font cast__names">${casts.name}</p>
                `
    
                flexContainerCast.append(castsOfMovies)
            })
        })


    })

 

})