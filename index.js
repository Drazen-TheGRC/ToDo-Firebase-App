/* FireBase Stuff & Browser module stuff*/
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js'
import { getDatabase, ref, push, onValue } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js'



/* My database */
const firebaseConfig = {
    databaseURL: "https://todo-c9874-default-rtdb.europe-west1.firebasedatabase.app/"
}


// Initialize Firebase
const app = initializeApp(firebaseConfig)
// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app)
// Referencing the database and creating a table in it
const toDoDatabase = ref(database, "toDoDatabase")

// Fetching data from the database
onValue(toDoDatabase, function(snapshot){
    // Clear toDoListEl
    clearToDoListEl()
    // Create an array of snapshot values
    let todoArray = Object.values(snapshot.val())
    // Append all values to toDoListEl
    todoArray.forEach(function(currentToDo){
        appendinputValueToToDoListEl(currentToDo)
    })
})

/* App Stuff */ 
const inputFieldEl = document.getElementById("input-field")
const toDoButtonEl = document.getElementById("add-button")
const toDoListEl = document.getElementById("todo-list")

// Button event listener 
toDoButtonEl.addEventListener("click", function(){
    // Push input field value to the database
    pushToDoIntoDatabase()
    // Clear input field
    clearInputFieldEl()
})


// My functions 
function clearInputFieldEl(){
    inputFieldEl.value = ""
}

function clearToDoListEl(){
    toDoListEl.innerHTML = ""
}

function pushToDoIntoDatabase(){
    // Getting and storing input field value
    let inputValue = inputFieldEl.value
    // If input value not empty we push the input value to the database
    if(inputValue != ""){
        push(toDoDatabase, inputValue)
        // console.log(inputValue + " added to the Firebase")
    }
}

function appendinputValueToToDoListEl(inputValue){
    toDoListEl.innerHTML += `<li>${inputValue}</li>`
}