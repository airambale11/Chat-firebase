let messageInput = document.getElementById("message-input");
let messages = document.getElementById('messages');

let profileNameContainer = document.getElementById("profile-name");
let profilePictureContainer = document.getElementById("profile-picture");

let currentUser;
let database = firebase.database().ref();

firebase.auth().onAuthStateChanged((user)=>{ /* La sesión no se cierra aún */
    if(user == null){
        window.location = "index.html"
    }

    currentUser = user; 
    profilePictureContainer.src = user.photoURL;
    profileNameContainer.innerHTML = user.displayName;

})

database.child("chat").on("child_added",(newMessage)=>{
    let messageVal = newMessage.val();
    addMessage(
        messageVal.message,
        messageVal.username,
        messageVal.userId == currentUser.uid);
});

function sendMessage(event){
    event.preventDefault();
    database.child("chat").push({
        message : messageInput.value,
        userId : currentUser.uid,
        userName : currentUser.displayName
    })
    console.log("Mensaje enviado.");
    messageInput.value = "";
}

function addMessage(message, displayName, own){
    let div = document.createElement('div');

    let displayNameSpan = document.createElement('span');
    let messageSpan = document.createElement('span');

    displayNameSpan.innerHTML = displayName;
    displayNameSpan.classList.add("message-name")
    messageSpan.innerHTML = message;
    div.append(displayNameSpan);
    div.append(messageSpan);

    div.classList.add("message");

    if(own) div.classList.add("own");
   
    messages.appendChild(div);
}

function signOut(){
    firebase.auth().signOut();
}