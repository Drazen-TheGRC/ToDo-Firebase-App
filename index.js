/* FireBase Stuff & Browser module stuff*/
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js'
import { getDatabase, ref, push } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js'



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


/* App Stuff */ 

const inputFieldEl = document.getElementById("input-field")
const toDoButtonEl = document.getElementById("add-button")

toDoButtonEl.addEventListener("click", function(){
    let inputValue = inputFieldEl.value
    
    // Push input value to the db
    if(inputValue != ""){
        push(toDoDatabase, inputValue)
        console.log(inputValue + " added to the Firebase")
    }
    
    // Clear input field
    inputFieldEl.value = ""
})