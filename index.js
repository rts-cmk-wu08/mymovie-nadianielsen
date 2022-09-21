document.addEventListener("DOMContentLoaded", function(){
    
    let params = new URLSearchParams(window.location.search)
    let id = params.get("id")
    
    let imgPath = "https://image.tmdb.org/t/p/original/"
    let myKey = "75f15351c6119a96302b866663e596b0"
        
    let wrapperElm = document.querySelector(".wrapper")

    const headerIndex = document.createElement("header")
    wrapperElm.append(headerIndex)

    const mainIndex = document.createElement("main")
    mainIndex.classList.add("main")
    wrapperElm.append(mainIndex)

    const footerIndex = document.createElement("footer")
    footerIndex.classList.add("footer")
    wrapperElm.append(footerIndex)
        
    fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=75f15351c6119a96302b866663e596b0&language=en-US&page=1`)
    .then(response => response.json())
    .then(data => {
        console.log(data)


        let myMoviesHeader = document.createElement("div")
        myMoviesHeader.innerHTML = `
        <div class="header__flex">
        <label class="switch">
        <input type="checkbox">
        <span class="slider round"></span>
        </label>
        <h1 class="mymovies__heading">MyMovies</h1>
        </div>
        `
            headerIndex.append(myMoviesHeader)

            let nowShowingHeading = document.createElement("div")
            nowShowingHeading.classList.add("nowshowing__flex")
            nowShowingHeading.innerHTML = `
                <div class="nowshowing__flex">
                <h2 class="nowshowing__heading">Now Showing <button class="seemore__btn">See more</button></h2>
                </div>
                `

                mainIndex.append(nowShowingHeading)

            const flexContainerMoviesScrollX = document.createElement("div")
            flexContainerMoviesScrollX.classList.add("flex__container__moviesscrollx")
            mainIndex.append(flexContainerMoviesScrollX)

            data.results.forEach(result => {
                let movies = document.createElement("a")
                movies.classList.add("titles__textdecoration")
                movies.setAttribute("href", `details.html?id=${result.id}` )
                movies.innerHTML = `
                <img class="posters__firstpage" src="${imgPath + result.poster_path}" alt="">
                <p class="movies__titles mulish__font">${result.title}</p>
                <p class="vote__imdb mulish__font"><i class="fa-sharp fa-solid fa-star fa__star"></i> ${result.vote_average}/10 IMDb</p>
                `

                flexContainerMoviesScrollX.append(movies)
            })
      
            const flexContainerPopularHeading = document.createElement("div")
            flexContainerPopularHeading.classList.add("flex__popularheading")
            mainIndex.append(flexContainerPopularHeading)

            let popularFlex = document.createElement("div")
            popularFlex.innerHTML = `
            <h2 class="popular__heading">Popular <button class="seemore__btn__popular seemore__btn mulish__font">See more</button></h2>
            `

            flexContainerPopularHeading.append(popularFlex)
    })

    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=75f15351c6119a96302b866663e596b0&language=en-US&page=1`)
    .then(response => response.json())
    .then(data =>{
        console.log(data)

        const flexContainerPopular = document.createElement("div")
        flexContainerPopular.classList.add("flex__container__popularposter")
        mainIndex.append(flexContainerPopular)

        let imgPathPopular = "https://image.tmdb.org/t/p/w500"

        data.results.forEach(result =>{
            // console.log(result)
            fetch(`https://api.themoviedb.org/3/movie/${result.id}?api_key=75f15351c6119a96302b866663e596b0&language=en-US`)
            .then(response => response.json())
            .then(data => {
             console.log(data)

            data.genres.forEach((genre, index) => {
                if (index < 3) {
                    let genreP = document.createElement("p")
                    genreP.innerHTML = `
                    <div class="genres__flex">
                    <p class="genres mulish__font">${genre.name}</p>
                    </div>
                    `
               
                    popularMovies.append(genreP)
                    
                } else {
                    return
                }
            })
            
        }) 
            let popularMovies = document.createElement("a")
            popularMovies.classList.add("titles__textdecoration")
            popularMovies.setAttribute("href", `details.html?id=${result.id}`)
            popularMovies.innerHTML = `
            <img class="popular__poster__path" src="${imgPathPopular + result.poster_path}" alt="">
            <p class="populartitle__movies mulish__font">${result.title}</p>
            <p class="mulish__font imdb__popular"><i class="fa-sharp fa-solid fa-star fa__starpopular"></i> ${result.vote_average}/10 IMDb</p>

            `
            

            flexContainerPopular.append(popularMovies)
        })

        let footerNavigation = document.createElement("nav")
        footerNavigation.classList.add("nav__flex")
        footerNavigation.innerHTML = `
        <a class="footer__icons" href="index.html"><i class="fa-solid fa-film fa-2x"></i></a>
        <a class="footer__icons" href="index.html"><i class="fa-solid fa-ticket-simple fa-2x ticket__icon"></i></a>  
        <a class="footer__icons" href="index.html"><i class="fa-regular fa-bookmark fa-2x"></i></a>  

        `

        footerIndex.append(footerNavigation)
    })
})