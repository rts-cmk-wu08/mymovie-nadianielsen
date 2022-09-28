document.addEventListener("DOMContentLoaded", function(){

    let popularPage = 1

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
    
  
    
    fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=75f15351c6119a96302b866663e596b0&language=en-US&page=1`)
    .then(response => response.json())
    .then(data => {
        console.log(data)


            let nowShowingHeading = document.createElement("div")
            nowShowingHeading.innerHTML = `
                <div class="nowshowing__flex">
                <h2 class="nowshowing__heading">Now Showing</h2>
                <button class="seemore__btn">See more</button>
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
            <div class="popular__heading__flex">
            <h2 class="popular__heading">Popular</h2>
            <button class="seemore__btn mulish__font">See more</button>
            </div>
            `

            flexContainerPopularHeading.append(popularFlex)
    })


    function fetchPopular(page) {
        
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=75f15351c6119a96302b866663e596b0&language=en-US&page=${page}`)
        .then(response => response.json())
        .then(data =>{
            console.log(data)
    
            const flexContainerPopular = document.createElement("div")
            flexContainerPopular.classList.add("flex__container__popularposter")
            mainIndex.append(flexContainerPopular)
    
            let imgPathPopular = "https://image.tmdb.org/t/p/w500"
    
            data.results.forEach((result, index) => {
                // console.log(result)
                fetch(`https://api.themoviedb.org/3/movie/${result.id}?api_key=75f15351c6119a96302b866663e596b0&language=en-US`)
                .then(response => response.json())
                .then(data => {
                //  console.log(data)
    
                data.genres.forEach((genre, index) => {
                    if (index < 1) {
                        let genreP = document.createElement("div")
                        genreP.innerHTML = `
                        <p class="genres mulish__font">${genre.name}</p>
                        `
                   
                        popularMovies.append(genreP)
                        
                    } else {
                        return
                    }
                })
   
            })

                //https://image.tmdb.org/t/p/w500${result.poster_path}
    
                let popularMovies = document.createElement("a")
                popularMovies.classList.add("titles__textdecoration")
                popularMovies.setAttribute("href", `details.html?id=${result.id}`)
                popularMovies.innerHTML = `
                <!-- <img class="popular__poster__path" src="${imgPathPopular + result.poster_path}" alt=""> -->
                <img class="popular__poster__path" src="/image/placeholder.gif" alt="">
                <p class="populartitle__movies mulish__font">${result.title}</p>
                <p class="mulish__font imdb__popular"><i class="fa-sharp fa-solid fa-star fa__starpopular"></i> ${result.vote_average}/10 IMDb</p>
    
                `
                  if (index === 18) {
                    const intersectionObserver = new IntersectionObserver((entries) => {
                        if (entries[0].intersectionRatio <= 0) return;
    
                        popularPage++
                        fetchPopular(popularPage)
                        intersectionObserver.unobserve(popularMovies)
                    })
    
                    intersectionObserver.observe(popularMovies)
                }
    
                flexContainerPopular.append(popularMovies)


                let imgElm = popularMovies.querySelector(".popular__poster__path")
                console.log(imgElm)
    
                let posterImg = new Image()
                posterImg.src = `https://image.tmdb.org/t/p/w500${result.poster_path}`
    
                posterImg.onload = () => {
                    imgElm.src = posterImg.src
                }
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
    }

    fetchPopular(popularPage)


    // En anden måde af at lave en darkmode. Fik hjælp til det af en klassekammerat, men forstår godt hvad der sker i det. 

    // function lightDarkMode() {
        
    //     let body = document.body
    //     headerIndex.classList.toggle("darkmode")
    //     mainIndex.classList.toggle("darkmode")

    //     const footerBoxes = document.querySelector(".footer")
    //     const footerIcons = document.querySelectorAll(".footer__icons > i")

    //     footerIcons.forEach((elm) => {
    //         elm.classList.toggle("footer__icons__darkmode")
    //         console.log(footerIndex)

    //     })

    //     footerBoxes.classList.toggle("footer__background__black")

        
    //     const moviesTitles = document.querySelectorAll(".movies__titles")
       
    //     moviesTitles.forEach((elm) => {
    //         elm.classList.toggle("darkmode")

    //     })

    //     const voteIMDB = document.querySelectorAll(".vote__imdb") 

    //     voteIMDB.forEach((elm) => {
    //         // console.log(voteIMBD)
    //         elm.classList.toggle("darkmode")
    //     })

    //     const seeMoreBtn = document.querySelectorAll(".seemore__btn")
        
    //     seeMoreBtn.forEach((elm) => {
    //         console.log(seeMoreBtn)
    //         elm.classList.toggle("seemore__btn__darkmode")
    //     })

    //     const popularMoviesTitles = document.querySelectorAll(".populartitle__movies")

    //     popularMoviesTitles.forEach((elm) => {
    //         console.log(popularMoviesTitles)
    //         elm.classList.toggle("darkmode")
    //     })

    //     const voteIMDBPopular = document.querySelectorAll(".imdb__popular")

    //     voteIMDBPopular.forEach((elm) => {
    //         console.log(voteIMDBPopular)
    //         elm.classList.toggle("darkmode") 
    //     })
   
    // }

    // // tager mere tid om at sætte ting ind/i konsollen ligesom fetch - et godt par
    // setTimeout(() => {
    //     let switchBtn = document.querySelector(".switch")

    //     switchBtn.addEventListener("mousedown", lightDarkMode)


    // }, 500)

    // .addEventListener("click", (e) => {
    //     if (e.target.classList.contains("favorite__heart")) {
    //         if (localStorage.getItem(e.target.dataset.id)) {
    //             localStorage.removeItem(e.target.dataset.id)
    //             e.target.classList.remove("red")
    //         }else{
    //             localStorage.setItem(e.target.dataset.id, "true")
    //             e.target.classList.add("red")
    //         }
    //     }
    // })

})