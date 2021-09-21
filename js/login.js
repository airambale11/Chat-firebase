
firebase.auth().onAuthStateChanged((user)=>{ /* La sesión no se cierra aún */
    if(user != null){
        window.location = "chat.html"
    }
})


/*el await nos dice que hasta que no realize lo que le sigue no puede continuar con las demas líneas */
async function login(){
    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL); /**que se quede la sesión de google iniciada */
    let provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithRedirect(provider); /*Indicarle que proveedor de cuentas vamos a tomar */
}