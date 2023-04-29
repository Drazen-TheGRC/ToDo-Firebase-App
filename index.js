const inputFieldEl = document.getElementById("input-field")
const toDoButtonEl = document.getElementById("add-button")

toDoButtonEl.addEventListener("click", function(){
    let inputValue = inputFieldEl.value
    console.log(inputValue)
})