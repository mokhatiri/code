// we have : Civilite, nom, prenom, birthdate, mail, mailconfirm, password, passwordconfirm
var Civilite, nom, prenom, birthdate, mail, mailconfirm, password, passwordconfirm;

// civilitee is a select element
// others are inputs
document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("civilite").addEventListener("change", function() {
        Civilite = this.value;
    })

    document.getElementById("nom").addEventListener("change", function() {
        nom = this.value;
    })

    document.getElementById("prenom").addEventListener("change", function() {
        prenom = this.value;
    })

    document.getElementById("mail").addEventListener("change", function() {
        mail = this.value;
    })

    document.getElementById("mailconfirm").addEventListener("change", function() {
        mailconfirm = this.value;
    })

    document.getElementById("password").addEventListener("change", function() {
        password = this.value;
    })

    document.getElementById("passwordConfirm").addEventListener("change", function() {
        passwordconfirm = this.value;
    })

    document.getElementById("birthdate").addEventListener("change", function() {
        birthdate = this.value;
    })

})


function checkValidation(event){
    event.preventDefault();
    if(Civilite == null || nom == null || prenom == null || birthdate == null || mail == null || mailconfirm == null || password == null || passwordconfirm == null){
        alert("Veuillez remplir tous les champs");
        return false;
    } 
    // look if nom is composed of only letters
    if(!(/^[a-zA-Z]+$/.test(nom))){
        alert("Veuillez entrer un nom valide");
        return false;
    }

    // look if prenom is composed of only letters
    if(!(/^[a-zA-Z]+$/.test(prenom))){
        alert("Veuillez entrer un prénom valide");
        return false;
    }

    // check for mail
    if(!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).test(mail)){
        alert("Veuillez entrer un mail valide");
        return false;
    }

    // check correspondance of mail
    if(mail != mailconfirm){
        alert("Les mails ne correspondent pas");
        return false;
    }

    // check for password
    if(password.length < 5 || password.length > 10){
        alert("Le mot de passe doit contenir entre 5 et 10 caractères");
        return false;
    }

    // check for password confirmation
    if(password != passwordconfirm){
        alert("Les mots de passe ne correspondent pas");
        return false;
    }

    // add it to the database
    
}