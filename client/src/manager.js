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

    getAll() {
        const request = new XMLHttpRequest()
        request.open('GET', './data/users.json');
        request.send();
        request.onload = () => {
            if (request.status != 200) {
                alert(`Error ${request.status}: ${request.statusText}`);
            } else {
                this.users = JSON.parse(request.responseText).users;
                this.displayUsers(this.users);
            }
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
            let textNodeBMI = document.createTextNode(user.weight[user.weight.length - 1] / (user.hight ** 2));
            if (user.weight.length > 1) {
                if (user.weight[user.weight.length - 1] / (user.hight ** 2) >= user.weight[user.weight.length - 2] / (user.hight ** 2)) {
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

    inputs = [];

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
            weight.setAttribute("value", user.weight[user.weight.length - 1]);
            this.inputs.push(weight);
            td2.appendChild(weight);
        })
    }

    saveMeet() {
        let i = 0;
        this.inputs.forEach(weight => {
            this.users[i].details.weight.push(weight.value);

debugger
            //הקריאה הזו לא עובדת היא מחזירה 404
            fetch(`http://localhost:3000/users/${this.users[i].id}/details`, {
                method: `PATCH`,
                body: JSON.stringify({
                    'weight': this.users.weight,
                }),
                headers: { 'Content-type': `application/json; charset=UTF-8` },
            }).then((response) => {
                debugger
                if (response.status !== 200 || response.status === undefined)
                    alert(response.message)

                else
                    alert(response.message)
            })
            i++;
        })
    }

    searchByFName() {
        let data = document.getElementById("fname").value;
        let filteredUser = this.users.filter(user => user.firstName.includes(data));
        this.displayUsers(filteredUser);
    }

    searchByLName() {
        let data = document.getElementById("lname").value;
        let filteredUser = this.users.filter(user => user.lastName.includes(data));
        this.displayUsers(filteredUser);
    }

    searchByBMI() {
        let minBMI = parseFloat(document.getElementById("minBMI").value);
        let maxBMI = parseFloat(document.getElementById("maxBMI").value);
        let filteredUser = this.users.filter(user =>
            user.weight[user.weight.length - 1] / user.hight ** 2 >= minBMI &&
            user.weight[user.weight.length - 1] / user.hight ** 2 <= maxBMI
        );
        this.displayUsers(filteredUser);
    };
}

const changePage = (id) => {
    // debugger
    location.href = `/userDetails.html?id=${id}`
}