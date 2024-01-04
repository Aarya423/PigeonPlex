let accountID = localStorage.getItem("accountID");
let signUp = localStorage.getItem("signUp");

document.addEventListener('DOMContentLoaded', loadData)

document.getElementById("cardExpiry").addEventListener('change', () => {console.log(document.getElementById("cardExpiry").value)});

document.getElementById("saveBtn").addEventListener('click', () => {
    if (signUp === "true"){
        const username = document.getElementById("username");
        const password = document.getElementById("password");
        const firstName = document.getElementById("firstName");
        const lastName = document.getElementById("lastName");
        const email = document.getElementById("email");
        const phone = document.getElementById("phoneNumber");
        const cardNumber = document.getElementById("cardNumber");
        const cardExpiration = document.getElementById("cardExpiry");
        const cvv = document.getElementById("cvv");

        const numTest = /^[0-9]+$/;
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (username.value === "" || password.value === "" || firstName.value === "" || lastName.value === "" || email.value === "" || phone.value === "" || cardNumber.value === "" || cardExpiration.value === "" || cvv.value === ""){
            swal("Empty Fields", "Please fill out all fields", "warning");
            return;
        }
        if (phone.value.length !== 10 || !numTest.test(phone.value)){
            swal("Invalid Phone Number", "Please enter a valid phone number", "warning");
            return;
        }
        if (cardNumber.value.length !== 16 || !numTest.test(cardNumber.value)){
            swal("Invalid Card Number", "Please enter a valid card number", "warning");
            return;
        }
        if (cvv.value.length !== 3 || !numTest.test(cvv.value)){
            swal("Invalid CVV", "Please enter a valid cvv", "warning");
            return;
        }
        if (password.value.length < 8){
            swal("Invalid Password", "Password must be at least 8 characters long", "warning");
            return;
        }
        if (!emailPattern.test(email.value)){
            swal("Invalid Email", "Please enter a valid email", "warning");
            return;
        }

        fetch(`/users/createUser/${username.value}/${password.value}/${firstName.value}/${lastName.value}/${email.value}/${phone.value}/${cardNumber.value}/${cardExpiration.value}/${cvv.value}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            swal("Account Created", "Your account information has been added to the database", "success");
            window.location.href = "/login"
        })
        .catch((error) => {
            console.log(error);
        })
    }
    else{
        const password = document.getElementById("password");
        const email = document.getElementById("email");
        const phone = document.getElementById("phoneNumber");
        const cardNumber = document.getElementById("cardNumber");
        const cardExpiration = document.getElementById("cardExpiry");
        const cvv = document.getElementById("cvv");

        const numTest = /^[0-9]+$/;
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (username.value === "" || password.value === "" || firstName.value === "" || lastName.value === "" || email.value === "" || phone.value === "" || cardNumber.value === "" || cardExpiration.value === "" || cvv.value === ""){
            swal("Empty Fields", "Please fill out all fields", "warning");
            return;
        }
        if (phone.value.length !== 10 || !numTest.test(phone.value)){
            swal("Invalid Phone Number", "Please enter a valid phone number", "warning");
            return;
        }
        if (cardNumber.value.length !== 16 || !numTest.test(cardNumber.value)){
            swal("Invalid Card Number", "Please enter a valid card number", "warning");
            return;
        }
        if (cvv.value.length !== 3 || !numTest.test(cvv.value)){
            swal("Invalid CVV", "Please enter a valid cvv", "warning");
            return;
        }
        if (password.value.length < 8){
            swal("Invalid Password", "Password must be at least 8 characters long", "warning");
            return;
        }
        if (!emailPattern.test(email.value)){
            swal("Invalid Email", "Please enter a valid email", "warning");
            return;
        }

        fetch(`/users/updateInfo/${accountID}/${password.value}/${email.value}/${phone.value}/${cardNumber.value}/${cardExpiration.value}/${cvv.value}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            loadData();
            swal("Account Updated", "Your account information has been updated", "success");
        })
        .catch((error) => {
            console.log(error);
        })
    }
})

document.getElementById("account").addEventListener('click', () => {
    localStorage.setItem("signUp", "false");
    window.location.href = "/account"
})

document.getElementById("logout").addEventListener('click', () => {
    window.location.href = "/login"
})

document.getElementById("logo").addEventListener('click', () => {
    window.location.href = "/homePage"
})

document.addEventListener('click', function(event) {
    if (event.target.matches('.refund-btn')) {
        console.log(event.target.id);
        fetch(`/purchases/refund/${event.target.id}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            loadData();
            swal("Refund Successful", "Your refund has been processed", "success");
        })
        .catch((error) => {
            console.log(error);
        })
    }
});

async function loadData() {
    // Get the current date
    const today = new Date();
    
    // Set the minimum value of the input to the current month and year
    const currentMonth = (today.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because getMonth() returns zero-based month
    const currentYear = today.getFullYear().toString();
    const minDate = `${currentYear}-${currentMonth}`;

    console.log(minDate);
    
    // Set the minimum attribute of the input
    document.getElementById('cardExpiry').min = minDate;
    document.getElementById('cardExpiry').value = minDate;

    if (signUp === "true"){
        const purchaseTitle = document.getElementById("purchaseDiv");
        const refundTitle = document.getElementById("refundDiv");
        purchaseTitle.style.display = "none";
        refundTitle.style.display = "none";

        const btn = document.getElementById("saveBtn");
        btn.textContent = "Sign Up!";

        const username = document.getElementById("username");
        const password = document.getElementById("password");
        const firstName = document.getElementById("firstName");
        const lastName = document.getElementById("lastName");
        const email = document.getElementById("email");
        const phone = document.getElementById("phoneNumber");
        const cardNumber = document.getElementById("cardNumber");
        const cardExpiration = document.getElementById("cardExpiry");
        const cvv = document.getElementById("cvv");

        username.value = "";
        password.value = "";
        firstName.value = "";
        lastName.value = "";
        email.value = "";
        phone.value = "";
        cardNumber.value = "";
        cardExpiration.value = "";
        cvv.value = "";
    }
     
    else{
        await fetch(`/users/getInfo/${accountID}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            const username = document.getElementById("username");
            const password = document.getElementById("password");
            const firstName = document.getElementById("firstName");
            const lastName = document.getElementById("lastName");
            const email = document.getElementById("email");
            const phone = document.getElementById("phoneNumber");
            const cardNumber = document.getElementById("cardNumber");
            const cardExpiration = document.getElementById("cardExpiry");
            const cvv = document.getElementById("cvv");
    
            username.value = data[0][1];
            username.disabled = true;
            password.value = data[0][2];
            firstName.value = data[0][3];
            firstName.disabled = true;
            lastName.value = data[0][4];
            lastName.disabled = true;
            email.value = data[0][5];
            phone.value = data[0][6];
            cardNumber.value = data[0][7];
            cardExpiration.value = data[0][8];
            cvv.value = data[0][9];
        })
        .catch((error) => {
            console.log(error);
        })

        await fetch(`/purchases/history/${accountID}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            
            const purchaseTable = document.getElementById("purchaseTable");
            while (purchaseTable.firstChild) {
                purchaseTable.removeChild(purchaseTable.firstChild);
            }
            for (let index of data[0]){
                console.log(index);
                let tr = document.createElement("tr");
                let td = document.createElement("td");
                let td2 = document.createElement("td");
                let td3 = document.createElement("td");
                let td4 = document.createElement("td");
                let td5 = document.createElement("td");
                let btn = document.createElement("button");
                btn.className = "refund-btn";
                btn.id = index[0];
                btn.textContent = "Refund";

                td.textContent = index[0];
                td2.textContent = index[3];
                td3.textContent = index[2];
                let date = index[1].split(" ");
                td4.textContent = date[0];
                td5.appendChild(btn);
                tr.appendChild(td);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
                tr.appendChild(td5);
                purchaseTable.appendChild(tr);
            }
        })
        .catch((error) => {
            console.log(error);
        })

        await fetch(`/refunds/${accountID}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            const refundList = document.getElementById("refundTable");
            while (refundList.firstChild) {
                refundList.removeChild(refundList.firstChild);
            }
            for (let index of data[0]){
                console.log(index);
                let tr = document.createElement("tr");
                let td = document.createElement("td");
                let td2 = document.createElement("td");
                let td3 = document.createElement("td");
                let td4 = document.createElement("td");

                td.textContent = index[0];
                td2.textContent = index[4];
                td3.textContent = index[3];
                let date = index[2].split(",");
                td4.textContent = date[0];
                tr.appendChild(td);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
                refundList.appendChild(tr);
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }
}