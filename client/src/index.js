const a = new Address("street", "", 8);
const m = new Manager(1, "firstName", "lastName", a, 454567, "gh@gmail.com");

const onload = () => {
    m.getAll();
}

const addMeet = document.getElementById('addMeeting');
const toBlur = document.getElementById('toBlur');

const addMeeting = () => {
    m.newMeeting();
    document.getElementById('date').value = formatDate();
    toBlur.classList.add('blur');
    addMeet.style.display = "block";
}

const padTo2Digits = (num => {
    return num.toString().padStart(2, '0');
})

const formatDate = ((date = new Date()) => {
    return [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
    ].join('-');
})

const saveMeet = () => {
    toBlur.classList.remove('blur');
    addMeet.style.display = "none";

    m.saveMeet();
}

function option() {
    const e = document.getElementById("selectSearch");
    const type = e.value;
    alert(type)
    filterByType(type);
}

function filterByType(type) {

    if (type === "searchByFName") {
        document.getElementById("firstName").style.display = "block"
        document.getElementById("lastName").style.display = "none"
        document.getElementById("BMI").style.display = "none"
    }
    if (type === "searchByLName") {
        document.getElementById("lastName").style.display = "block"
        document.getElementById("firstName").style.display = "none"
        document.getElementById("BMI").style.display = "none"
    }
    if (type === "searchByBMI") {
        document.getElementById("BMI").style.display = "block"
        document.getElementById("firstName").style.display = "none"
        document.getElementById("lastName").style.display = "none"
    }
}

function searchByFName() {
    m.searchByFName();
}

function searchByLName() {
    m.searchByLName();
}

function searchByBMI() {
    m.searchByBMI();
}
