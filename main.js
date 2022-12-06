let id=(idOfElem)=>{
   return document.getElementById(idOfElem);
}
let formElem = id("form");
let textInputElem = id('text-input');
let msgElem = id('msg');
let tasksElem = id('tasks');
let dateInputElem = id('date-input');
let textareaElem = id('textarea');
let saveElem = id('save');

formElem.addEventListener('submit', (e) => {
    e.preventDefault();
    formValidation();
});
let formValidation = () => {
    if (textInputElem.value === "") {
        msgElem.textContent = "*item title cannot be empty."
    }
    else {
        msgElem.textContent = "";
        storeData();
        saveElem.setAttribute("data-bs-dismiss", "modal")
        saveElem.click();
        (() => {
            saveElem.setAttribute("data-bs-dismiss", "")
        })
    }
}
let data = [{}];
let storeData = () => {
    data.push({
    text : textInputElem.value,
    date : dateInputElem.value,
    msg : textareaElem.value,
    });
    localStorage.setItem("data",JSON.stringify(data));
    addItems();
}

let addItems = () => {
    tasksElem.innerHTML="";
    data.map((val,i)=>{
        return (tasksElem.innerHTML += `
        <div id=${i}>
        <h5>${val.text}</h5>
        <h6>${val.date}</h6>
        <p>${val.msg}</p>
        <span class="options">
            <i onclick="updateItems(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
            <i onclick="deleteItems(this);addItems()" class="fas fa-trash"></i>
        </span>
    </div>   
    `)
    });
    resetForm();
}
let deleteItems = (e) => {
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id,1)
    localStorage.setItem("data",JSON.stringify(data));
}
let updateItems = (e) => {
    let parentElement = e.parentElement.parentElement;
    textInputElem.value = parentElement.children[0].innerHTML;
    dateInputElem.value = parentElement.children[1].innerHTML;
    textareaElem.value = parentElement.children[2].innerHTML;
    deleteItems(e);
}

let resetForm = () => {
    textInputElem.value = "";
    textareaElem.value = "";
    dateInputElem.value = "";
}
(()=>{
    data=JSON.parse(localStorage.getItem("data")) || [];
    addItems();
})()