let accountID = localStorage.getItem("accountID");

let movieID = 0;

const movieSearch = document.getElementById("movieSearch");
const movieDate = document.getElementById("movieDate");
const errorLabel = document.getElementById("error");

document.addEventListener('DOMContentLoaded', loadData)
document.getElementById("searchBtn").addEventListener('click', search)
document.getElementById("logo").addEventListener('click', loadData)
document.getElementById("account").addEventListener('click', () => {
    localStorage.setItem("signUp", "false");
    window.location.href = "/account"
})

document.getElementById("movieSearch").addEventListener('keydown', () => {
    errorLabel.textContent = "";
    movieDate.value = "";
    fetch(`/movies/searchMovieName/${movieSearch.value}`)
        .then((res) => res.json())
        .then((data) => {
            let displayUlOutput = document.getElementById("moviesListOutput");

            while (displayUlOutput.firstChild) {
                displayUlOutput.removeChild(displayUlOutput.firstChild);
            }

            const result = data[0];
            if (result.length === 0){
                errorLabel.textContent = "No results found";
            }
            for(let i = 0; i < result.length; i++){
                let li = document.createElement("li");
                li.className = "movie";
                let img = document.createElement("img");
                img.src = result[i][2];
                let h1 = document.createElement("h1");
                h1.className = result[i][0]; //ID Code
                h1.textContent = result[i][1]; // Movie Title
                li.appendChild(img);
                li.appendChild(h1);
                // Add a click event listener to each li
                li.addEventListener('click', function () {
                    // Access the information from the clicked li
                    const h1Class = li.querySelector('h1').className;
            
                    // Log the information to the console
                    console.log(`Clicked on: ${h1Class}`);
                    movieID = h1Class;
                    localStorage.setItem("movieID", movieID);
                    window.location.href = "/movie";
                });
                displayUlOutput.appendChild(li);
            }
        })
        .catch((err) => console.log(err));
});

document.getElementById("movieDate").addEventListener('input', () => {
    errorLabel.textContent = "";
    movieSearch.value = "";
});

document.getElementById("logout").addEventListener('click', () => {
    window.location.href = "/login"
})

function loadData() {
    fetch(`/movies`)
    .then((res) => res.json())
    .then((data) => {
        let displayUl = document.getElementById("moviesList");
        let displayUlOutput = document.getElementById("moviesListOutput");

        while (displayUl.firstChild) {
            displayUl.removeChild(displayUl.firstChild);
        }
        while (displayUlOutput.firstChild) {
            displayUlOutput.removeChild(displayUlOutput.firstChild);
        }

        for(let i = 0; i < 5; i++){
            let li = document.createElement("li");
            li.className = "movie";
            let img = document.createElement("img");
            img.src = data[0][i][2];
            let h1 = document.createElement("h1");
            h1.className = data[0][i][0];
            h1.textContent = data[0][i][1];
            li.appendChild(img);
            li.appendChild(h1);
            // Add a click event listener to each li
            li.addEventListener('click', function () {
                // Access the information from the clicked li
                const h1Class = li.querySelector('h1').className;
        
                // Log the information to the console
                console.log(`Clicked on: ${h1Class}`);
                movieID = h1Class;
                localStorage.setItem("movieID", movieID);
                window.location.href = "/movie";
            });
            displayUl.appendChild(li);
        }

        for(let i = 5; i < 25; i++){
            let li = document.createElement("li");
            li.className = "movie";
            let img = document.createElement("img");
            img.src = data[0][i][2];
            let h1 = document.createElement("h1");
            h1.className = data[0][i][0];
            h1.textContent = data[0][i][1];
            li.appendChild(img);
            li.appendChild(h1);
            // Add a click event listener to each li
            li.addEventListener('click', function () {
                // Access the information from the clicked li
                const h1Class = li.querySelector('h1').className;
        
                // Log the information to the console
                console.log(`Clicked on: ${h1Class}`);
                movieID = h1Class;
                localStorage.setItem("movieID", movieID);
                window.location.href = "/movie";
            });
            displayUlOutput.appendChild(li);
        }
    })
    .catch((err) => console.log(err));
}

function search() {
    let name = document.getElementById("movieSearch").value;
    let date = document.getElementById("movieDate").value;

    if (name === "" && date === ""){
        errorLabel.textContent = "Please enter a movie name or date";
    }
    else if(name !== "" && date === ""){
        fetch(`/movies/searchMovieName/${name}`)
        .then((res) => res.json())
        .then((data) => {
            let displayUlOutput = document.getElementById("moviesListOutput");

            while (displayUlOutput.firstChild) {
                displayUlOutput.removeChild(displayUlOutput.firstChild);
            }

            const result = data[0];
            if (result.length === 0){
                errorLabel.textContent = "No results found";
            }
            for(let i = 0; i < result.length; i++){
                let li = document.createElement("li");
                li.className = "movie";
                let img = document.createElement("img");
                img.src = result[i][2];
                let h1 = document.createElement("h1");
                h1.className = result[i][0]; //ID Code
                h1.textContent = result[i][1]; // Movie Title
                li.appendChild(img);
                li.appendChild(h1);
                // Add a click event listener to each li
                li.addEventListener('click', function () {
                    // Access the information from the clicked li
                    const h1Class = li.querySelector('h1').className;
            
                    // Log the information to the console
                    console.log(`Clicked on: ${h1Class}`);
                    movieID = h1Class;
                    localStorage.setItem("movieID", movieID);
                    window.location.href = "/movie";
                });
                displayUlOutput.appendChild(li);
            }
        })
        .catch((err) => console.log(err));
    }
    else if(name === "" && date !== ""){
        fetch(`/movies/getByDate/${date}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            let displayUlOutput = document.getElementById("moviesListOutput");

            while (displayUlOutput.firstChild) {
                displayUlOutput.removeChild(displayUlOutput.firstChild);
            }

            for(let i = 0; i < data.length; i++){
                let li = document.createElement("li");
                li.className = "movie";
                let img = document.createElement("img");
                img.src = data[i][2];
                let h1 = document.createElement("h1");
                h1.className = data[i][0];
                h1.textContent = data[i][1];
                li.appendChild(img);
                li.appendChild(h1);
                // Add a click event listener to each li
                li.addEventListener('click', function () {
                    // Access the information from the clicked li
                    const h1Class = li.querySelector('h1').className;
            
                    // Log the information to the console
                    console.log(`Clicked on: ${h1Class}`);
                    movieID = h1Class;
                    localStorage.setItem("movieID", movieID);
                    window.location.href = "/movie";
                });
                displayUlOutput.appendChild(li);
            }
        })
        .catch((err) => console.log(err));
    }
}