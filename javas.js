let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function() {
    if(this.read){
        return this.title + " by " + this.author + ", " + this.pages + " pages long, has been read";
    }
    else{
        return this.title + " by " + this.author + ", " + this.pages + " pages long, not read yet";
    }
}

Book.prototype.addBookToLibrary = function() {
    myLibrary.push(this);
}


// This is creating a few trial books to see if it works
let book1 = new Book("test1","bry",10,true);
let book2 = new Book("test2","bry",20,false);
let book3 = new Book("test3","bry",30,true);
let book4 = new Book("test4","bry",30,true);
let book5 = new Book("test5","bry",30,true);
let book6 = new Book("test6","bry",30,true);
let book7 = new Book("test7","bry",30,true);
let book8 = new Book("test8","bry",30,true);
let book9 = new Book("test9","bry",30,true);

book1.addBookToLibrary();
book2.addBookToLibrary();
book3.addBookToLibrary();
book4.addBookToLibrary();
book5.addBookToLibrary();
book6.addBookToLibrary();
book7.addBookToLibrary();
book8.addBookToLibrary();
book9.addBookToLibrary();


const container = document.querySelector(".container");
let readStatus = true;

for(let i = 0; i < myLibrary.length;i++) {
    let bookcard = document.createElement("div");
    bookcard.classList.add("card");
    bookcard.textContent = myLibrary[i].info();
    container.appendChild(bookcard);
}

document.getElementById('form').addEventListener('submit', function(event){
    event.preventDefault();
    event.stopPropagation();
    formSubmitted();
});



function formSubmitted() {
    const form = document.querySelector("form");
    form.classList.add('hide');
    //Processing form information
    let inputs = document.getElementById("form").elements;
    console.log(inputs);
    // Author
    if(inputs[1].value === ""){
        inputs[1].value = "Unknown1"
    }    
    // Page count
    if(inputs[2].value === ""){
        console.log("page statement set to unknown")
        inputs[2].value =99999;
        console.log(inputs[2].value);

        //input is number only, so it can only accept numbers as a value, not strings.
    } 
    //Genre
    if(inputs[3].value === ""){
        inputs[3].value = "Unknown3"
    }
    let bookcard = document.createElement("div");
    bookcard.classList.add("card");
    bookcard.textContent = new Book(inputs[0].value,inputs[1].value,inputs[2].value,inputs[4].value).info();
    container.appendChild(bookcard);
    // console.log(inputs[0].value);
    // console.log(inputs[1].value);
    // console.log(inputs[2].value);
    // console.log(inputs[3].value);




    form.reset();

}

//New form created when the new book button is pressed, handled w/ innerhtml
function newForm() {
    const form = document.querySelector("form");
    form.classList.remove('hide');
}

const statusbutton = document.querySelector(".read");
statusbutton.addEventListener('click', function() {
    if(readStatus){
        readStatus = false;
        statusbutton.textContent = "Not Read"
        statusbutton.classList.remove('read');
        statusbutton.classList.add('notread');
        statusbutton.value = "false";
    }
    else{
        readStatus = true;
        statusbutton.textContent = "Read"
        statusbutton.classList.remove('notread');
        statusbutton.classList.add('read');
        statusbutton.value = "true";
    }
})