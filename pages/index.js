function openForm() {
    document.querySelector('.popup').style.display = "block";
}

function closeForm() {
    document.querySelector('.popup').style.display = "none";
}

/* ещё варианты - classList.add('');
*classList.remove('');*/

let formElement = document.querySelector('.popup');
let nameInput = formElement.querySelector('.popup__author');
let jobInput = formElement.querySelector('.popup__position');
let addButton = document.querySelector('.popup__save');


function formSubmitHandler(evt) {
    evt.preventDefault();

    nameInput.value;
    jobInput.value;

    let paragraphName = document.querySelector('.profile__name');
    let paragraphJob = document.querySelector('.profile__position');

  paragraphName.textContent =  nameInput.value;
  paragraphJob.textContent = jobInput.value;
};

    formElement.addEventListener('submit', formSubmitHandler);

