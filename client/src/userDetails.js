const searchParams = new URLSearchParams(location.search);
const id = parseInt(searchParams.get('id'));
if (!id) {
    location.href = '/login.html';
}

let user = null;
const postUrl = `http://localhost:3000/users/${id}`;

const findUser = () => {
    const request = new XMLHttpRequest()
    request.open('GET', './data/users.json');
    request.send();
    request.onload = () => {
        if (request.status != 200) {
            alert(`Error ${request.status}: ${request.statusText}`);
        } else {
            let users = JSON.parse(request.responseText).users;
            user = users.find(u => u.id === id).details;
            showUserDetails();
        }
    }
}

const showUserDetails = () => {
    document.getElementById('firstName').value = user.firstName;
    document.getElementById('lastName').value = user.lastName;
    document.getElementById('city').value = user.address.city;
    document.getElementById('street').value = user.address.street;
    document.getElementById('number').value = user.address.number;
    document.getElementById('phone').value = user.phone;
    document.getElementById('email').value = user.email;
    document.getElementById('hight').value = user.hight;
    document.getElementById('currentWeight').value = user.weight[user.weight.length - 1];
    let weights = "";
    for (let i = 0; i < user.weight.length-1; i++){
        weights += "<br/>" + user.weight[i];
    }
    document.getElementById('weightHistory').innerHTML = weights;
    document.getElementById('BMI').value = (user.weight[user.weight.length - 1] / (user.hight ** 2)).toFixed(2);
}

findUser();

const saveUser = () => {
    user.firstName = document.getElementById('firstName').value;
    user.lastName = document.getElementById('lastName').value;
    user.address.city = document.getElementById('city').value;
    user.address.street = document.getElementById('street').value;
    user.address.number = document.getElementById('number').value;
    user.phone = document.getElementById('phone').value;
    user.email = document.getElementById('email').value;
    user.hight = document.getElementById('hight').value;

    fetch(postUrl, {
        method: `PATCH`,
        body: JSON.stringify({
            'details': user,
        }),
        headers: { 'Content-type': `application/json; charset=UTF-8` },
    }).then((response) => {

        if (response.status !== 200 || response.status === undefined)
            alert(response.message)

        else
            findUser();
    })
}


const diary = () => {
    location.href = `/diary.html?id=${id}`;
}