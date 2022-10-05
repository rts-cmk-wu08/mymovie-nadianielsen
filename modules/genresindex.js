let genresIndex = function(genre, index) {
    if (index < 5) {
    let element = document.createElement('div')
    element.classList.add('genres__box')
    element.innerHTML = `
        <p class="genres mulish__font">${genre.name}</p>
        
    `
    } else {
        return
    }
}
    export default genresIndex

    
    
