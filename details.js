document.addEventListener("DOMContentLoaded", function(){

    let params = new URLSearchParams(window.location.search)
    let name = params.get("name")
    console.log(name)

    fetch(`https://api.themoviedb.org/3/movie/550?api_key=75f15351c6119a96302b866663e596b0`)
    .then(response => response.json())
    .then(data => {
        console.log(data)


        
    })

})