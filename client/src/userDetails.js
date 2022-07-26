const searchParams = new URLSearchParams(location.search);
const email = parseInt(searchParams.get('email'));
// if (!email) {
//     location.href = '/login.html';
// }

let user = null;
const Url = `http://localhost:3000/user/`+ email;

const findUser = () => {
   
    fetch(Url)
        .then(response => {
            if (response.ok && response.status == 200) {
                return response.json()
            }})
        .then(data => {
            if (data != "") {
                console.log(data, "data");
               user= data.details;
               showUserDetails();
            }
            else {
                alert("לא נמצא משתמש בשם זה:");
            }
        })
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
    document.getElementById('currentWeight').value = user.meetings[user.meetings.length - 1].weight;
    let weights = "";
    for (let i = 0; i < user.meetings.length-1; i++){
        weights += "<br/>" + user.meetings[i].weight;
    }
    document.getElementById('weightHistory').innerHTML = weights;
    document.getElementById('BMI').value = (user.meetings[user.meetings.length - 1].weight / (user.hight ** 2)).toFixed(2);
}

findUser();

const saveUser = () => {
    user.details.firstName = document.getElementById('firstName').value;
    user.details.lastName = document.getElementById('lastName').value;
    user.details.address.city = document.getElementById('city').value;
    user.details.address.street = document.getElementById('street').value;
    user.details.address.number = document.getElementById('number').value;
    user.details.phone = document.getElementById('phone').value;
    user.details.email = document.getElementById('email').value;
    user.details.hight = document.getElementById('hight').value;

    fetch(url, {
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