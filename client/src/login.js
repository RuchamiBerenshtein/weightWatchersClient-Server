function validation() {
    let user = {
        email: document.getElementById('email').value,
    };

    fetch('http://localhost:3000/account/', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(user),
    }).then(response => response.json())
        .then(data => {
            alert('hello to :' + data.user.details.firstName);
            if (data.user.details.email === 'Admin@gmail.com') {
                location.href = '/index.html';
            }
            else {
                location.href = `/userDetails.html?id=${data.user.id}`;
            }   
        });
}

const toFoodPage = () => {
    location.href = "/food.html";
}

