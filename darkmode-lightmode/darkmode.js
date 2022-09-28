document.addEventListener("DOMContentLoaded", function(){

    let switchElm = document.querySelector(".switch input")
    
    let setActiveStyleSheet = function(title){
        let css = `link[rel="alternate stylesheet"]`
        let styleSheets = document.querySelectorAll(css)
        styleSheets.forEach(sheet => sheet.disabled = true)
        let selector = `link[title="${title}"]`
        let activeSheet = document.querySelector(selector)
        activeSheet.disabled = false
        localStorage.setItem("theme", title);
    }
    
    let savedSheet = localStorage.getItem("theme")
    console.log(savedSheet) 
    
    if(savedSheet) {
        if(savedSheet == "dark"){
            switchElm.checked = true
        }
        setActiveStyleSheet(savedSheet)
   } else {
      setActiveStyleSheet("light")
    }
          
    switchElm.addEventListener("click", function(e){
        if(e.target.checked){
            setActiveStyleSheet("dark")
        } else {
            setActiveStyleSheet("light")
        }
    })
})