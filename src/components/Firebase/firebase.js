import app from 'firebase/app'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyCZERBZVtk7kMyUtFF8gD_pwvBL_U85xhE",
    authDomain: "projet-solo-ynov.firebaseapp.com",
    databaseURL: "https://projet-solo-ynov.firebaseio.com",
    projectId: "projet-solo-ynov",
    storageBucket: "projet-solo-ynov.appspot.com",
    messagingSenderId: "618132601478",
    appId: "1:618132601478:web:ff2579189ba0a06b392f07"
};

class Firebase {
    constructor() {
        app.initializeApp(config)

        this.auth = app.auth()
    }

    // Inscription de l'utilisateur
    signup = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password)

    // Connexion de l'utilisateur
    login = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password)

    // Déconnexion de l'utilisateur
    disconnect = () => this.auth.signOut()

}

export default Firebase