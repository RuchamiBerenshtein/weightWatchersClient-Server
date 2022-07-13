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

// function option() {
//     const e = document.getElementById("selectSearch");
//     const type = e.value;
//     alert(type)
//     filterByType(type);
// }

const freeText = () => {
    document.getElementById("freeText").style.display = "block"
    document.getElementById("BMI").style.display = "none"
}

const BMI = () => {
    document.getElementById("freeText").style.display = "none"
    document.getElementById("BMI").style.display = "block"
}

const searchFreeText = () => {
    m.searchByFreeText();
}

function searchByBMI() {
    m.searchByBMI();
}
