const clock = document.getElementById("clock");
const temperatureDisplay = document.getElementById("temperatureDisplay");
const tempButtons = document.getElementById("tempButtons");
const onOffButton = document.getElementById("onOffButton");
const buttonsSection = document.querySelector(".buttons");
const buttons = document.querySelectorAll(".button2:not(#onOffButton)");
const timerDisplay = document.getElementById("timerDisplay");
const alarmSound = document.getElementById("alarmSound");
const shoppingList = document.getElementById("shoppingList");
const shoppingListItems = document.getElementById("shoppingListItems");
const newItemInput = document.getElementById("newItem");

let is24HourFormat = true;
let temperature = Math.floor(Math.random() * 40) + 30;
let isCelsius = false;
let displayOn = false;
let timerActive = false;
let timerSeconds = 60;

function clockUpdate() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    if (!is24HourFormat) {
        hours = hours % 12 || 12;
    }

    const hoursString = String(hours).padStart(2, '0');
    clock.textContent = `${hoursString}:${minutes}:${seconds}`;
}

function updateTemperatureDisplay() {
    const unit = isCelsius ? "°C" : "°F";
    const displayTemp = isCelsius ? ((temperature - 32) * 5/9).toFixed(1) : temperature;
    temperatureDisplay.textContent = displayOn ? `${displayTemp} ${unit}` : "--";
}

function toggleTempUnit() {
    isCelsius = !isCelsius;
    updateTemperatureDisplay();
}

function increaseTemperature() {
    temperature += 1;
    updateTemperatureDisplay();
}

function decreaseTemperature() {
    temperature -= 1;
    updateTemperatureDisplay();
}

function toggleClockFormat() {
    is24HourFormat = !is24HourFormat;
    document.getElementById("clockButton").textContent = is24HourFormat 
        ? "Switch to 12-hour format" 
        : "Switch to 24-hour format";
    clockUpdate();
}

function toggleDisplay() {
    displayOn = !displayOn;
    onOffButton.textContent = displayOn ? "Turn Off" : "Turn On";

    buttonsSection.style.display = displayOn ? "block" : "none";
    tempButtons.style.visibility = displayOn ? "visible" : "hidden";
    shoppingList.style.display = displayOn ? "block" : "none";
    buttons.forEach(button => button.disabled = !displayOn);

    if (!displayOn) {
        temperatureDisplay.textContent = "--";
        const images = ["streamingImage", "browserImage", "fridgeImage", "weatherImage"];
        images.forEach(id => document.getElementById(id).style.display = "none");
    }

    updateTemperatureDisplay();
}

function streamingButton() {
    toggleImage("streamingImage");
}

function browserButton() {
    toggleImage("browserImage");
}

function insideViewButton() {
    toggleImage("fridgeImage");
}

function weatherButton() {
    toggleImage("weatherImage");
}

function toggleImage(imageId) {
    const image = document.getElementById(imageId);
    image.style.display = image.style.display === "none" ? "block" : "none";
}

function startMinuteTimer() {
    if (timerActive) return; 

    timerActive = true;
    timerDisplay.style.display = "block"; 
    let countdown = setInterval(function () {
        if (timerSeconds <= 0) {
            clearInterval(countdown);
            alarmSound.play();
            timerDisplay.textContent = "Time's up!";
            setTimeout(() => timerDisplay.style.display = "none", 3000);
            timerActive = false;
            timerSeconds = 60;
        } else {
            timerSeconds--;
            let minutes = Math.floor(timerSeconds / 60);
            let seconds = timerSeconds % 60;
            timerDisplay.textContent = `Timer: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }
    }, 1000);
}

function addItem() {
    const newItem = newItemInput.value.trim();
    if (newItem) {
        const listItem = document.createElement('li');
        listItem.textContent = newItem;
        shoppingListItems.appendChild(listItem);
        newItemInput.value = "";
    }
}

setInterval(clockUpdate, 1000);
clockUpdate();
updateTemperatureDisplay();
