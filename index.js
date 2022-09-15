document.addEventListener("DOMContentLoaded", function(){
    
    let params = new URLSearchParams(window.location.search)
    let id = params.get("id")
    
    let imgPath = "https://image.tmdb.org/t/p/original/"
    let myKey = "75f15351c6119a96302b866663e596b0"
    
    let flexContainer = document.querySelector(".flex__container")
    
    let flexContainer2 = document.querySelector(".flex__container2")
    
    let flexContainerMoviesScrollX = document.querySelector(".flex__container__moviesscrollx")
    
    let popularHeading = document.querySelector(".flex__popularheading")  

    let footer = document.querySelector(".footer")

    fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=75f15351c6119a96302b866663e596b0&language=en-US&page=1`)
    .then(response => response.json())
    .then(data => {
        console.log(data)


            let myMovies = document.createElement("div")
            
            myMovies.innerHTML = `
            <h1 class="mymovies__heading">MyMovies</h1>
            <!-- <button>switch</button> -->
            `

            flexContainer.append(myMovies)

            let nowShowing = document.createElement("div")
            nowShowing.innerHTML = `
                
                <h2 class="nowshowing__heading">Now Showing <button class="seemore__btn">See more</button></h2>
                `

                flexContainer2.append(nowShowing)

            let popularFlex = document.createElement("div")
            popularFlex.innerHTML = `
            <h2 class="popular__heading">Popular <button class="seemore__btn__popular seemore__btn mulish__font">See more</button></h2>
            `

            popularHeading.append(popularFlex)


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
      
    })

    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=75f15351c6119a96302b866663e596b0&language=en-US&page=1`)
    .then(response => response.json())
    .then(data =>{
        console.log(data)

        let flexContainerPopular = document.querySelector(".flex__container__popularposter")

        let imgPathPopular = "https://image.tmdb.org/t/p/w500"

        data.results.forEach(result =>{
            // console.log(result)
            fetch(`https://api.themoviedb.org/3/movie/${result.id}?api_key=75f15351c6119a96302b866663e596b0&language=en-US`)
            .then(response => response.json())
            .then(data => {
             console.log(data)

            data.genres.forEach((genre, index) => {
                if (index < 2) {
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

        footer.append(footerNavigation)
    })
})