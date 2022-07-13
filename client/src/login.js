
const validation = () => {
    if (document.getElementById('email').value === "Admin@gmail.com") {
        location.href = "/index.html";
    }
    else {
        const request = new XMLHttpRequest()
        request.open('GET', './data/users.json');
        request.send();
        request.onload = () => {
            if (request.status != 200) {
                alert(`Error ${request.status}: ${request.statusText}`);
            } else {
                const users = JSON.parse(request.responseText).users;
                const user = users.find(user => user.details.email === document.getElementById('email').value);
                if (user)
                    location.href = `/userDetails.html?id=${user.id}`;
                else
                    alert("user is'nt defined")
            }
        }
    }
}

const toFoodPage = () => {
    location.href = "/food.html";
}
