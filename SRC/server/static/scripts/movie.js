let movieID = localStorage.getItem("movieID");
let accountID = localStorage.getItem("accountID");
const time = document.getElementById("time");
const display = document.getElementById("seatCount");

let seats = [];
let morningSeats = 0;
let afternoonSeats = 0;
let eveningSeats = 0;

document.getElementById("dateDropDown").addEventListener('click', () => {
    console.log(time);
    if (time.value === "10 A.M."){
        display.textContent = `Seats Available: ${morningSeats}`;
    }
    else if (time.value === "2 P.M."){
        display.textContent = `Seats Available: ${afternoonSeats}`;
    }
    else if (time.value === "7 P.M."){
        display.textContent = `Seats Available: ${eveningSeats}`;
    }
});

document.getElementById("time").addEventListener('click', () => {
    console.log("clicked");
    if (time.value === "10 A.M."){
        display.textContent = `Seats Available: ${morningSeats}`;
    }
    else if (time.value === "2 P.M."){
        display.textContent = `Seats Available: ${afternoonSeats}`;
    }
    else if (time.value === "7 P.M."){
        display.textContent = `Seats Available: ${eveningSeats}`;
    }
});

document.getElementById("logo").addEventListener('click', () => {
    window.location.href = "/homePage"
})

document.getElementById("account").addEventListener('click', () => {
    localStorage.setItem("signUp", "false");
    window.location.href = "/account"
})

document.getElementById("logout").addEventListener('click', () => {
    window.location.href = "/login"
})

document.getElementById("purchase").addEventListener('click', async () => {
    event.preventDefault();
    let selectedTime = document.getElementById("time").value;
    let tickets = document.getElementById("input").value;
    let date = document.getElementById("dateDropDown");
    console.log(date);
    console.log(date.value);
    let amount = tickets * 10;
    try {
        if (selectedTime === "10 A.M."){
            if (tickets > seats[1]){
                swal("Insufficient Seats", "Unfortunately there are not enough seats!", "error");
                return;
            }
            await fetch(`/purchases/buyTicket/${accountID}/${movieID}/${date.value}/morning/${amount}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.log(error);
            })
            
            await fetch(`/schedule/removeSeat/${movieID}/${amount}/${date.value}/morning`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                swal("Purchase Successful!", "The purchase was successful!", "success");
            })
            .catch((error) => {
                console.log(error);
            })
        }
        else if (selectedTime === "2 P.M."){
            if (tickets > seats[2]){
                swal("Insufficient Seats", "Unfortunately there are not enough seats!", "error");
                return;
            }
            await fetch(`/purchases/buyTicket/${accountID}/${movieID}/${date.value}/afternoon/${amount}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.log(error);
            })
            
            await fetch(`/schedule/removeSeat/${movieID}/${amount}/${date.value}/afternoon`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                swal("Purchase Successful!", "The purchase was successful!", "success");
            })
            .catch((error) => {
                console.log(error);
            })
        }
        else if (selectedTime === "7 P.M."){
            if (tickets > seats[3]){
                swal("Insufficient Seats", "Unfortunately there are not enough seats!", "error");
                return;
            }
            await fetch(`/purchases/buyTicket/${accountID}/${movieID}/${date.value}/evening/${amount}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.log(error);
            })
            
            await fetch(`/schedule/removeSeat/${movieID}/${amount}/${date.value}/evening`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                swal("Purchase Successful!", "The purchase was successful!", "success");
            })
            .catch((error) => {
                console.log(error);
            })
        }

        window.location.href = "/homePage";
    }
    catch (error) {
        console.log(error);
    }
})

let counter = 0;

function increment() {
  counter++;
}

function decrement() {
  counter--;
}

function get() {
  return counter;
}

const inc = document.getElementById("increment");
const input = document.getElementById("input");
const dec = document.getElementById("decrement");

inc.addEventListener("click", () => {
    if (time.value === "10 A.M."){
        if (input.value < morningSeats) {
            increment();
        }
    }
    else if (time.value === "2 P.M."){
        if (input.value < afternoonSeats) {
            increment();
        }
    }
    else if (time.value === "7 P.M."){
        if (input.value < eveningSeats) {
            increment();
        }
    }
    input.value = get();
});

dec.addEventListener("click", () => {
    if (input.value > 0) {
        decrement();
    }
    input.value = get();
});

document.addEventListener('DOMContentLoaded', loadData)

function loadData() {
    console.log(movieID);
    fetch(`/movies/info&Schedule/${movieID}`)
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        let title = document.getElementById("title");
        let description = document.getElementById("description");
        let img = document.getElementById("image");
        let cast = document.getElementById("cast");
        let director = document.getElementById("director");
        let duration = document.getElementById("duration");
        let genre = document.getElementById("genre");
        let rating = document.getElementById("rating");
        let trailer = document.getElementById("trailerLink");
        let datesDiv = document.getElementById("dates");
        title.textContent = `${data[0][0][1]}`;
        description.textContent = `${data[0][0][3]}`;
        img.src = data[0][0][2];
        cast.textContent = `${data[0][0][4]}`;
        director.textContent = `${data[0][0][5]}`;
        duration.textContent = `${data[0][0][6]}`;
        genre.textContent = `${data[0][0][7]}`;
        rating.textContent = `${data[0][0][8]}`;
        if (rating.textContent === "-1"){
            rating.textContent = "Not Rated";
        }
        trailer.href = `${data[0][0][9]}`;
        let date = document.createElement("h2");
        let dateAmount = data[0][0][10];
        let dateText = dateAmount.split(" ");
        let option = document.createElement("option");
        option.value = dateText[0];
        option.textContent = dateText[0];
        const select = document.getElementById("dateDropDown");
        select.appendChild(option);
        // seats.push(dateText[0]);
        // seats.push(data[0][0][11]);
        morningSeats = data[0][0][11];
        // seats.push(data[0][0][12]);
        afternoonSeats = data[0][0][12];
        // seats.push(data[0][0][13]);
        eveningSeats = data[0][0][13];

        if (time.value === "10 A.M."){
            display.textContent = `Seats Available: ${morningSeats}`;
        }
        else if (time.value === "2 P.M."){
            display.textContent = `Seats Available: ${afternoonSeats}`;
        }
        else if (time.value === "7 P.M."){
            display.textContent = `Seats Available: ${eveningSeats}`;
        }
        // date.textContent = `${dateText[0]}: Morning: ${data[0][0][11]}, Afternoon: ${data[0][0][12]}, Evening: ${data[0][0][13]}`;
        if (datesDiv.hasChildNodes()){
            datesDiv.removeChild(datesDiv.childNodes[0]);
        }
        // datesDiv.appendChild(date);
    })
    .catch((error) => {
        console.log(error);
    })
}