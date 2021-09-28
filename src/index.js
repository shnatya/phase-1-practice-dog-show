document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector("#dog-form");
    addExtraInputInForm(form);          //add extra input element to keep there dog id
    
    form.addEventListener("submit", (event) => { //event will have all data for the dogObj beccause data will be in the input fields
        event.preventDefault();
        handleSubmit(event)
    })
    fetchRequest();
})
function addExtraInputInForm(form) {
    let idForm = document.createElement("input");      //add extra input element to keep there dog id
    idForm.type = "hidden";
    idForm.value = 0;
    form.appendChild(idForm);
}
function fetchRequest() {
    fetch("http://localhost:3000/dogs")
    .then(res => res.json())
    .then(dogArray => dogArray.forEach(dogObj => renderDogObj(dogObj)))
}
function renderDogObj(dogObj) {
    const tableBody = document.querySelector("#table-body");
    let tableRow = document.createElement("tr");  //????? how to grab the right button? i add id to each button
    tableRow.innerHTML = `  
        <td>${dogObj.name}</td>
        <td>${dogObj.breed}</td>
        <td>${dogObj.sex}</td>
        <td><button id = ${dogObj.id}>Edit dog ${dogObj.id}</button></td> 
    `
    tableBody.appendChild(tableRow);
    const editButton = document.getElementById(`${dogObj.id}`);
    editButton.addEventListener("click", () => {
        handleEditButton(dogObj)
    })
}
function handleEditButton(dogObj) {
    //const form = document.querySelector("#dog-form");
    const inputArray = document.getElementsByTagName("input");
    inputArray[0].value = `${dogObj.name}`;            //copy info of a dog to a form
    inputArray[1].value = `${dogObj.breed}`;
    inputArray[2].value = `${dogObj.sex}`;
    const idForm = inputArray[4];
    idForm.value = `${dogObj.id}` ; //save a dog id to in form hidden input to know what by id what dog's info was updated
}
function handleSubmit(event) {
    //create an object to send to server
    let updatedDogObj = { 
    name: event.target[0].value,
    breed: event.target[1].value,
    sex: event.target[2].value,
    id: event.target[4].value,
    }
    //send this obect to DB
    fetch(`http://localhost:3000/dogs/${updatedDogObj.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(updatedDogObj)
    })
    .then(res => console.log(res))

    //render new DB to browser
    const tableBody = document.querySelector("#table-body");
    tableBody.innerHTML = " ";

    fetchRequest();
}
    
