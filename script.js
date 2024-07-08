function alertButton () {
    alert("button clicked!");
}

const button = document.querySelector('button');

button.addEventListener('click', alertButton);

