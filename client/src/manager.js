class Manager {

    constructor(id, firstName, lastName, address, phone, email) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = new Address(address.city, address.street, address.number);
        this.phone = phone;
        this.email = email;
        this.users = [];
    }

    inputs = [];

    async getAll() {
        const url = new URL('https://evening-everglades-98180.herokuapp.com/user');

        try{
            const response = await fetch(url);
            if (response.status !== 200 || response.status === undefined)
                alert(response.message);

            else{
                const users = await response.json();
                this.users = users;
                this.displayUsers(users);
            }
        }
        catch (error) {
            alert(`you have an error: ${error}`);
        }
    }

    displayUsers(users) {
        const tBody = document.getElementById('users');
        tBody.innerHTML = '';
        const button = document.createElement('button');
        users.forEach(user => {
            const id = user.id;
            user = user.details;
            let tr = tBody.insertRow();

            let td1 = tr.insertCell(0);
            let textNodeFirstName = document.createTextNode(user.firstName);
            td1.appendChild(textNodeFirstName);

            let td2 = tr.insertCell(1);
            let textNodeLastName = document.createTextNode(user.lastName);
            td2.appendChild(textNodeLastName);
            let td3 = tr.insertCell(2);
            const BMI = user.meetings[user.meetings.length - 1].weight / user.hight ** 2;
            let textNodeBMI = document.createTextNode(BMI.toFixed(2));
            if (user.meetings.length > 1) {
                if (BMI >= user.meetings[user.meetings.length - 2].weight / user.hight ** 2) {
                    tr.style.color = 'red';
                } else {
                    tr.style.color = 'green';
                }
            }
            td3.appendChild(textNodeBMI);

            let userDetails = button.cloneNode(false);
            userDetails.innerText = 'Details';
            userDetails.setAttribute('onclick', `changePage(${id})`);
            let td4 = tr.insertCell(3);
            td4.appendChild(userDetails);
        });
    }

    newMeeting() {
        const tBody = document.getElementById('newUsersWeight');
        tBody.innerHTML = "";
        this.users.forEach(user => {
            user = user.details;

            let tr = tBody.insertRow();

            let td1 = tr.insertCell(0);
            let textNodeName = document.createTextNode(user.firstName + " " + user.lastName);
            td1.appendChild(textNodeName);

            let td2 = tr.insertCell(1);
            let weight = document.createElement("INPUT");
            weight.setAttribute("type", "number");
            weight.setAttribute("step", 0.01);
            weight.setAttribute("value", user.meetings[user.meetings.length - 1].weight);
            this.inputs.push(weight);
            td2.appendChild(weight);
        })
    }

    async saveMeet() {
        let weights = [];
        this.inputs.forEach(weight => {
            weights.push(weight.value);
        })

        const url = new URL('http://evening-everglades-98180.herokuapp.com/meeting/');

        const response = await fetch(url, {
            method: `POST`,
            body: JSON.stringify({
                'date': document.getElementById('date').value,
                'weights': weights,
            }), headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        
        
            if (response.status !== 200 || response.status === undefined)
                alert(response.message);

            else
                alert("meeting saved successfully");

        this.getAll();
    }

    async searchByFreeText() {
        let text = document.getElementById("text").value;
        const url = new URL(`https://evening-everglades-98180.herokuapp.com/user/search?text=${text}`);
        try {

            let response = await fetch(url);
            if (response.status !== 200 || response.status === undefined)
                alert(response.message);

            else{
                const users = await response.json();
                this.displayUsers(users.filterUsers);
            }
        }
        catch (error) {
            alert(`you have an error: ${error}`);
        }
    }

    async searchByBMI() {
        let minBMI = parseFloat(document.getElementById("minBMI").value);
        let maxBMI = parseFloat(document.getElementById("maxBMI").value);

        const url = new URL(`https://evening-everglades-98180.herokuapp.com/user/search?minBMI=${minBMI}&maxBMI=${maxBMI}`);

        try {

            let response = await fetch(url);
            if (response.status !== 200 || response.status === undefined)
                alert(response.message);

            else{
                const users = await response.json();
                this.displayUsers(users.filterUsers);
            }
        }
        catch (error) {
            alert(`you have an error: ${error}`);
        }
    }
}

const changePage = (id) => {
    location.href = `/userDetails.html?id=${id}`
}