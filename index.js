/* FireBase Stuff & Browser module stuff*/
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js'
import { getDatabase, ref, push, onValue, remove } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js'



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
    // Create an array of snapshot entries (each entry is an array of an id[0] and a value[1])
    let todoArray = Object.entries(snapshot.val())
    // Append all values to toDoListEl
    todoArray.forEach(function(currentToDoEntry){
        appendinputValueToToDoListEl(currentToDoEntry[0], currentToDoEntry[1])
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

function appendinputValueToToDoListEl(inputId, inputValue){
    //toDoListEl.innerHTML += `<li id="${inputId}">${inputValue}</li>`

    // New variable to store the new HTML element
    let newEl = document.createElement("li")
    // Create exact path to the element in the database for the function to be able to find it
    let exactlocationInDatabase = ref(database, `toDoDatabase/${inputId}`)
    // Add value to the new element
    newEl.textContent = inputValue
    // Add event Listener to the new element so it can be deleted
    newEl.addEventListener("dblclick", function(){
        remove(exactlocationInDatabase)
    })

    // add line-through when clicked
    newEl.addEventListener("click", function(){
        this.classList.toggle("line-through")
    })

    // Append the new element to the list
    toDoListEl.append(newEl)
}



