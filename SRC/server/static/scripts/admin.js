document.getElementById("search-movie").addEventListener("click", () => {
    const movieName = document.getElementById("movie-title").value;
    console.log(movieName);
    
    fetch(`/movies/searchMovieName/${movieName}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const result = document.getElementById("movieSearchResult");
        while (result.hasChildNodes()) {
            result.removeChild(result.firstChild);
        }

        let output = data[0]
        for (let i = 0; i < output.length; i++) {
            let tr = document.createElement("tr");
            tr.className = "movieSearchResult";
            let td = document.createElement("td");
            let td2 = document.createElement("td");

            td.textContent = output[i][0];
            td.id = output[i][0];
            td2.textContent = output[i][1];
            td2.id = output[i][0];
            tr.appendChild(td);
            tr.appendChild(td2);
            result.appendChild(tr);
        }
    })
    .catch(error => console.log(error));
});

document.addEventListener('click', async function(event) {
    if (event.target.closest('tr')) {
        console.log(event.target);
        console.log(event.target.id);
        await fetch(`/movies/ticketsSold/${event.target.id}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            const result = document.getElementById("movieSalesResult");
            while (result.hasChildNodes()) {
                result.removeChild(result.firstChild);
            }
    
            let output = data[0]
            
            let tr = document.createElement("tr");
            tr.className = "movieSearchResult";
            let td = document.createElement("td");
            let td2 = document.createElement("td");

            td.textContent = output[0];
            td2.textContent = output[1];
            tr.appendChild(td);
            tr.appendChild(td2);
            result.appendChild(tr);
        })
        .catch((error) => {
            console.log(error);
        })

        await fetch(`/movies/users/${event.target.id}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            const result = document.getElementById("movieUserResult");
            while (result.hasChildNodes()) {
                result.removeChild(result.firstChild);
            }
    
            let output = data[0]
            for (let i = 0; i < output.length; i++) {
                let tr = document.createElement("tr");
                tr.className = "movieSearchResult";
                let td = document.createElement("td");
    
                td.textContent = output[i][0];
                td.id = output[i][0];
                tr.appendChild(td);
                result.appendChild(tr);
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }
});

document.getElementById("addMovie").addEventListener('click', () => {
    const movieGenre = document.getElementById("movie-genre");
    const movieName = document.getElementById("movieTitle");
    const movieDescription = document.getElementById("movie-description");
    const movieDirector = document.getElementById("movie-director");
    const movieActors = document.getElementById("movie-cast");
    const movieDuration = document.getElementById("movie-duration");
    const movieRating = document.getElementById("movie-rating");
    const movieTrailer = document.getElementById("movie-trailer");
    const movieImage = document.getElementById("movie-image");

    fetch(`/movies/addMovie/${movieName.value}/${movieImage.value}/${movieDescription.value}/${movieActors.value}/${movieDirector.value}/${movieDuration.value}/${movieGenre.value}/${movieRating.value}/${movieTrailer.value}`)
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        movieGenre.value = "";
        movieName.value = "";
        movieDescription.value = "";
        movieDirector.value = "";
        movieActors.value = "";
        movieDuration.value = "";
        movieRating.value = "";
        movieTrailer.value = "";
        movieImage.value = "";

        swal("Addition Successful", "Your movie has been added!", "success");
    })
    .catch((error) => {
        console.log(error);
    })
});

document.getElementById("add-schedule").addEventListener('click', () => {
    const movieID = document.getElementById("movie-id");
    const movieDate = document.getElementById("add-movie-date");

    fetch(`/movies/addSchedule/${movieID.value}/${movieDate.value}`)
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        movieID.value = "";
        movieDate.value = "";

        swal("Addition Successful", "Your movie schedule has been added!", "success");
    })
    .catch((error) => {
        console.log(error);
    })
});

document.getElementById("get-movie-id").addEventListener('click', () => {
    const input = document.getElementById("search-movie-id");
    fetch(`/movies/schedule/${input.value}`)
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        const result = document.getElementById("displaySchedule");
        while (result.hasChildNodes()) {
            result.removeChild(result.firstChild);
        }

        let output = data[0]
        console.log(output);
        for (let i = 0; i < output.length; i++) {
            console.log(output[i][0]);

            let tr = document.createElement("tr");
            let td2 = document.createElement("td");
            let td3 = document.createElement("td");
            td2.textContent = output[i][0];
            let date = output[i][1].split(" ");
            td3.textContent = date[0];
            tr.appendChild(td2);
            tr.appendChild(td3);
            result.appendChild(tr);
        }
    })
    .catch((error) => {
        console.log(error);
    })
});

document.getElementById("viewUsers").addEventListener('click', () => {
    fetch(`/users`)
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        const result = document.getElementById("usersOutput");
        while (result.hasChildNodes()) {
            result.removeChild(result.firstChild);
        }

        let output = data[0]
        console.log(output);
        for (let i = 0; i < output.length; i++) {
            console.log(output[i]);

            let tr = document.createElement("tr");
            let td = document.createElement("td");
            let td2 = document.createElement("td");
            let td3 = document.createElement("td");
            let td4 = document.createElement("td");
            let td5 = document.createElement("td");

            td.textContent = output[i][0];
            td2.textContent = output[i][1];
            td3.textContent = output[i][3];
            td4.textContent = output[i][4];
            td5.textContent = output[i][5];

            tr.appendChild(td);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tr.appendChild(td5);
            result.appendChild(tr);
        }
    })
    .catch((error) => {
        console.log(error);
    })
});

document.getElementById("delete-user").addEventListener('click', () => {
    const userID = document.getElementById("userName");
    
    fetch(`/admin/deleteUser/${userID.value}`)
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        userID.value = "";
        swal("Deletion Successful", "Your user has been deleted!", "success");
    })
    .catch((error) => {
        console.log(error);
    })
});
//////////////////////////////////////////////////////////
document.getElementById("deleteUsers").addEventListener('click', () => {
    fetch(`/admin/deleteInactiveUsers`)
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        swal("Deletion Successful", "All users have been deleted!", "success");
    })
    .catch((error) => {
        console.log(error);
    })
});

document.getElementById("addAnnouncement").addEventListener('click', () => {
    fetch(`/movies/increaseDuration`)
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        swal("Addition Successful", "Your announcement has been added!", "success");
    })
    .catch((error) => {
        console.log(error);
    })
});

document.getElementById("deleteAnnouncement").addEventListener('click', () => {
    fetch(`/movies/decreaseDuration`)
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        swal("Deletion Successful", "Your announcement has been deleted!", "success");
    })
    .catch((error) => {
        console.log(error);
    })
});

document.getElementById("logout").addEventListener('click', () => {
    window.location.href = "/login"
})