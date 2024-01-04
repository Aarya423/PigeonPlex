let accountID = 0;

const login = document.getElementById("loginBtn");
const signUp = document.getElementById("signUpBtn");
const errorLabel = document.getElementById("error");

const uNameLabel = document.getElementById("uName");
const passwordLabel = document.getElementById("password");

uNameLabel.addEventListener("keydown", (event) => {
    errorLabel.textContent = "";
});

passwordLabel.addEventListener("keydown", (event) => {
    errorLabel.textContent = "";
});

login.addEventListener("click", () => {
    const uName = document.getElementById("uName");
    const password = document.getElementById("password");

    if (uName.value === "" || password.value === ""){
        errorLabel.textContent = "Please enter a username and password";
        uName.value = "";
        password.value = "";
        return;
    }

    console.log("test");
    fetch(`/account/${uName.value}/${password.value}`)
    .then((res) => res.json())
    .then((data) => {
        const id = data.id;
        if (id === "admin"){
            window.location.href = "/admin";
        }
        else if (id > 0){
            accountID = id;
            localStorage.setItem("accountID", accountID);
            window.location.href = "/homePage";
        }
        else {
            errorLabel.textContent = "Invalid username or password";
            uName.value = "";
            password.value = "";
        }
    })
    .catch((err) => console.log(err));
});

signUp.addEventListener("click", () => {
    localStorage.setItem("signUp", "true");
    window.location.href = "/account";
});
