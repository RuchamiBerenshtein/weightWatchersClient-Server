const searchParams = new URLSearchParams(location.search);
const id = parseInt(searchParams.get('id'));
if (!id) {
    location.href = '/login.html';
}

const url = new URL(`https://evening-everglades-98180.herokuapp.com/diary/${id}`);
const postUrl = new URL(`https://localhost:3000/diary/${id}`);

let userDaily;

let breakfastInputList = [];
let lunchInputList = [];
let dinnerInputList = [];
let snackInputList = [];

let breakfast = [];
let lunch = [];
let dinner = [];
let snack = [];

let td1;
let td2;
let td3;
let td4;

const blur = document.getElementById('toBlur');
const daily = document.getElementById('addDay');

const addDay = () => {
    blur.classList.add('blur');
    document.getElementById('date').value = formatDate();
    displayMealsMenu();
    daily.style.display = "block";
}

const editDay = (day) => {
    blur.classList.add('blur');
    daily.style.display = "block";
    document.getElementById('date').value = day.date;
    breakfast = [...day.breakfast];
    lunch = [...day.lunch];
    dinner = [...day.dinner];
    snack = [...day.snack];
    displayMealsMenu();
    displayFoodList(td1, breakfast, breakfastInputList);
    displayFoodList(td2, lunch, lunchInputList);
    displayFoodList(td3, dinner, dinnerInputList);
    displayFoodList(td4, snack, snackInputList);
}

const padTo2Digits = (num) => {
    return num.toString().padStart(2, '0');
}

const formatDate = (date = new Date()) => {
    return [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
    ].join('-');
}

const dailyMeals = async () => {
    try {
        const response = await fetch(url);
        if (response.status !== 200 || response.status === undefined)
            alert(response.message);

        else {
            userDaily = await response.json();
            debugger
            console.log(`response ${response.status}`);
            displayDiary();
        }
    }
    catch (error) {
        alert(`you have an error: ${error}`);
    }
}

const displayLi = (foodList) => {
    const ul = document.createElement('ul');
    foodList.forEach(food => {
        const li = document.createElement('li');
        ul.appendChild(li);
        li.innerHTML = food;
    })
    return ul;
}

const displayMealsMenu = () => {
    const tBody = document.getElementById('mealsMenu');

    let tr = tBody.insertRow();

    td1 = tr.insertCell(0);
    addInput(td1, breakfast, breakfastInputList, 0);

    td2 = tr.insertCell(1);
    addInput(td2, lunch, lunchInputList, 0);

    td3 = tr.insertCell(2);
    addInput(td3, dinner, dinnerInputList, 0);

    td4 = tr.insertCell(3);
    addInput(td4, snack, snackInputList, 0);
}

const displayFoodList = (td, mealList, mealInputList) => {
    let count = 1;
    mealList.forEach(food => {
        mealInputList[mealInputList.length - 1].value = food;
        addInput(td, mealList, mealInputList, count++)
    })
}

const addInput = (td, mealList, mealInputList, count) => {

    let button = document.createElement("INPUT");
    button.setAttribute("type", "text");
    button.setAttribute("placeholder", "food name");

    let foodInput = button.cloneNode(false);

    foodInput.setAttribute('class', ++count);
    foodInput.addEventListener('change', (event) => {
        if (parseInt(event.target.classList[0]) < mealInputList.length)
            mealList[parseInt(event.target.classList[0]) - 1] = (event.target.value);
        else {
            mealList.push(event.target.value);
            addInput(td, mealList, mealInputList, count);
        }
    });

    mealInputList.push(foodInput);
    td.appendChild(foodInput);
}

const saveDaily = async () => {
    blur.classList.remove('blur');
    daily.style.display = "none";

    const newDay = {
        "date": document.getElementById('date').value,
        "breakfast": breakfast.filter(food => food !== ""),
        "lunch": lunch.filter(food => food !== ""),
        "dinner": dinner.filter(food => food !== ""),
        "snack": snack.filter(food => food !== "")
    }
    let i
    for (i = 0; i < userDaily.diary.length && userDaily.diary[i].date !== newDay.date; i++);
    if (i === userDaily.diary.length) {
        userDaily.diary.push(newDay);
    }
    else {
        userDaily.diary[i] = newDay;;
    }
    try {
        debugger
        const response = await fetch(postUrl, {
            method: 'PUT',
            body: JSON.stringify(userDaily.diary),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':"https:/serverAddress"
            },
        })
        console.log("responses");
        if (response.status !== 200 || response.status === undefined) {
            const message = await response.json();
            alert(message);
        }

        else {
            dailyMeals();
        }
    }
    catch (error) {
        alert(`you have an error: ${error}`);
    }
    finally {
        resetArrays();
    }
}

const resetArrays = () => {
    debugger
    breakfastInputList = [];
    lunchInputList = [];
    dinnerInputList = [];
    snackInputList = [];

    breakfast = [];
    lunch = [];
    dinner = [];
    snack = [];
}

const displayDiary = () => {
    const tBody = document.getElementById('dailyMeals');
    tBody.innerHTML = '';
    const button = document.createElement('button');

    userDaily.diary.forEach(day => {

        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        let date = document.createTextNode(day.date);
        td1.appendChild(date);

        let td2 = tr.insertCell(1);
        td2.appendChild(displayLi(day.breakfast));

        let td3 = tr.insertCell(2);
        td3.appendChild(displayLi(day.lunch));

        let td4 = tr.insertCell(3);
        td4.appendChild(displayLi(day.dinner));

        let td5 = tr.insertCell(4);
        td5.appendChild(displayLi(day.snack));

        let editDayButton = button.cloneNode(false);
        editDayButton.innerText = 'Edit';
        editDayButton.addEventListener('click', (event) => editDay(day));
        let td6 = tr.insertCell(5);
        td6.appendChild(editDayButton);
    });
}

