document.addEventListener("DOMContentLoaded", function(){

    let params = new URLSearchParams(window.location.search)
    let id = params.get("id")
    console.log(id)
    
    let detailsPosters = document.createElement("header")
    detailsPosters.classList.add("header__flex")
    detailsPosters.innerHTML = `
    <a href="index.html" class="link__arrow"><i class="fa-solid fa-arrow-left-long arrow__left"></i></a> 
    <label class="switch">
    <input type="checkbox">
    <span class="slider round"></span>
    </label>
    `
    document.body.append(detailsPosters)

    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=75f15351c6119a96302b866663e596b0&language=en-US`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        
        let imgPathPopular = "https://image.tmdb.org/t/p/w500"

        let postersImgDetails = document.createElement("div")
        postersImgDetails.innerHTML = `
            <img class="poster__img" src="${imgPathPopular + data.poster_path}" alt="">
        `

        detailsPosters.append(postersImgDetails)

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
            castHeadline.classList.add("castheading__flex")
            castHeadline.innerHTML = `
            <button class="seemore__btn mulish__font">See more</button>
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

    // En anden måde af at lave en darkmode. Fik hjælp til det af en klassekammerat, men forstår godt hvad der sker i det. 

    // function lightDarkMode() {
    //     let body = document.body

    //     const mainDarkMode = document.querySelector(".main__detailswhitebox")
    //     console.log(mainDarkMode)

    //     mainDarkMode.classList.toggle("darkmode")

    //     const voteIMDB = document.querySelectorAll(".vote__imdb") 

    //     voteIMDB.forEach((elm) => {
    //         // console.log(voteIMBD)
    //         elm.classList.toggle("darkmode")
    //     })

    //     const bookMarkDarkMode = document.querySelector(".bookmark")
    //     console.log(bookMarkDarkMode)

    //     bookMarkDarkMode.classList.toggle("darkmode")

    //     const seeMoreBtn = document.querySelectorAll(".seemore__btn")
        
    //     seeMoreBtn.forEach((elm) => {
    //         console.log(seeMoreBtn)
    //         elm.classList.toggle("seemore__btn__darkmode")
    //     })
    // }

    // setTimeout(() => {
    //     let switchBtn = document.querySelector(".switch")

    //     switchBtn.addEventListener("mousedown", lightDarkMode)


    // }, 500)

    // mainDarkMode.addEventListener("click", (e) => {
    //     if (e.target.classList.contains("switch")) {
    //         if (localStorage.getItem(e.target.dataset.class)) {
    //             localStorage.removeItem(e.target.dataset.class)
    //             e.target.classList.remove("darkmode")
    //         }else{
    //             localStorage.setItem(e.target.dataset.class, "true")
    //             e.target.classList.add("light")
    //         }
    //     }
    // })

})