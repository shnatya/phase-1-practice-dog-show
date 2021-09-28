document.addEventListener('DOMContentLoaded', () => {
    fetch("http://localhost:3000/dogs")
    .then(res => res.json())
    .then(dogArray => dogArray.forEach(dogObj => renderDogObj(dogObj)))
})
function renderDogObj(dogObj) {
    debugger
    const tableBody = document.querySelector("#table-body")
    let tableRow = document.createElement("tr")   //????? how to grab the right button? i add id to each button
    tableRow.innerHTML = `  
        <td>${dogObj.name}</td>
        <td>${dogObj.breed}</td>
        <td>${dogObj.sex}</td>
        <td><button id = ${dogObj.id}>Edit dog ${dogObj.id}</button></td> 
    `
    tableBody.appendChild(tableRow)
    const editButton = document.getElementById(`${dogObj.id}`)
    editButton.addEventListener("click", () => {
        handleEditButton(dogObj)
    })
}
function handleEditButton(dogObj) {
    const form = document.querySelector("#dog-form");
    const inputArray = document.getElementsByTagName("input");
    inputArray[0].value = `${dogObj.name}`;            //copy info of a dog to a form
    inputArray[1].value = `${dogObj.breed}`;
    inputArray[2].value = `${dogObj.sex}`;
   
    //const inputName = document.getElementsByName("name") //return NodeList
    //const iB = document.querySelector('[name="breed"]') //grab input element by name "breed"
    
   form.addEventListener("submit", (event) => { //event will have all data for the dogObj beccause data will be in the input fields
       event.preventDefault();
       handleSubmit(event, `${dogObj.id}`)})
}
function handleSubmit(event, id) {
    //create an object to send to server
    debugger
    let updatedDogObj = { 
    name: event.target[0].value,
    breed: event.target[1].value,
    sex: event.target[2].value,
    }
    //send this obect to DB
    debugger
    fetch(`http://localhost:3000/dogs/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(updatedDogObj)
    })
    .then(res => console.log(res))
   // .then(data => console.log(data))
    debugger
    //render new DB to browser
    const tableBody = document.querySelector("#table-body")
    console.log(tableBody)
    debugger
    tableBody.innerHTML = " "
    fetch("http://localhost:3000/dogs")
    .then(res => res.json())
    .then(dogArray => dogArray.forEach(dogObj => renderDogObj(dogObj)))
}
    