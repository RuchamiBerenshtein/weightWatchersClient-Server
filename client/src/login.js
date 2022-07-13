ד
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
            alert('hello to :' + JSON.stringify(data.details.firstName));
            location.href = `/userDetails.html?id=${data.id}`;
        });
}

const toFoodPage = () => {
    location.href = "/food.html";
}

