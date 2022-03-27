let myLibrary = [];
const container = document.querySelector(".container");

function Book(title, author, pages, genre, read,rating) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.genre = genre;
  this.read = read;
  this.rating = rating;
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



//Should introduce a counter and book_id element so that I can find the books later on. I
//Could, for example, make the cards have the id with counter and use that to delete the cards
//I dont want anymore


// This is creating a few trial books to see if it works
let book1 = new Book("test1","katie",10,"romance",true,4);
let book2 = new Book("test2","bry",20,"teen",false,3);
let book3 = new Book("test3","josh",30,"children",true,2);
let book4 = new Book("test4","gio",30,"fantasy",true,1.5);
// let book5 = new Book("test5","bry",30,true);
// let book6 = new Book("test6","bry",30,true);
// let book7 = new Book("test7","bry",30,true);
// let book8 = new Book("test8","bry",30,true);
// let book9 = new Book("test9","bry",30,true);

// book1.addBookToLibrary();
// book2.addBookToLibrary();
// book3.addBookToLibrary();
// book4.addBookToLibrary();

newCard(book1);
newCard(book2);
newCard(book3);
newCard(book4);
// book5.addBookToLibrary();
// book6.addBookToLibrary();
// book7.addBookToLibrary();
// book8.addBookToLibrary();
// book9.addBookToLibrary();



// for(let i = 0; i < myLibrary.length;i++) {
//     let bookcard = document.createElement("div");
//     bookcard.classList.add("card");
//     bookcard.textContent = myLibrary[i].info();
//     container.appendChild(bookcard);
// }



//Form submission default action override
document.getElementById('form').addEventListener('submit', function(event){
    event.preventDefault();
    event.stopPropagation();
    formSubmitted();
});


//Cancel button functionality
document.querySelector(".cancel").addEventListener('click',function() {
    form.classList.add('hide');
    form.reset();
});


function formSubmitted() {
    const form = document.querySelector("form");
    form.classList.add('hide');
    //Processing form information. Title should be 25 characters before introducing a box?
    let inputs = document.getElementById("form").elements;
    let pagecatcher = inputs[3].value;
    // console.log(inputs);
    // Title handling
    if(inputs[1].value.length > 25) {
        inputs[1].value = inputs[1].value.substr(0,22) + "...";
    }
    // Author
    if(inputs[2].value === ""){
        inputs[2].value = "Unknown author"
    }    
    // Page count
    if(inputs[3].value === ""){
        // console.log("page statement set to unknown")
        pagecatcher = "Unknown page count";
    } 
    //Genre
    if(inputs[4].value === ""){
        inputs[4].value = "Unknown genre"
    }

    // let bookcard = document.createElement("div");
    // bookcard.classList.add("card");
    // bookcard.textContent = new Book(inputs[1].value,inputs[2].value,inputs[3].value,inputs[5].value).info();
    // container.appendChild(bookcard);

    newCard(new Book(inputs[1].value,inputs[2].value,pagecatcher,inputs[4].value,inputs[5].value));

    form.reset();

}

//New form created when the new book button is pressed, handled w/ innerhtml
function newForm() {
    const form = document.querySelector("form");
    form.classList.remove('hide');
}
function newCard(Book) {
    let bookcard = document.createElement("div");
    //child1
    let titlediv = document.createElement("div");
    //child2
    let authordiv = document.createElement("div");
    //child3
    let pagediv = document.createElement("div");
    //child4
    let genrediv = document.createElement("div");
    //child5
    let readbutton = document.createElement("button");

    //Absolute positioned child
    let cancelbutton = document.createElement("button");

    cancelbutton.type = "button";
    cancelbutton.classList.add('cardcancel');
    cancelbutton.textContent = "X";
    cancelbutton.addEventListener('click',function() {
        cancelbutton.parentNode.remove();
    });

    readbutton.type = "button";
    titlediv.classList.add('booktitle');
    bookcard.classList.add("card");
    readbutton.classList.add('cardbutton')
    titlediv.textContent = Book.title;
    authordiv.textContent = Book.author;
    genrediv.textContent = Book.genre;

    if(Number.isInteger(Book.pages)){
        pagediv.textContent = Book.pages + " pages";
    }
    else {
        pagediv.textContent = Book.pages;

    }
    readbutton.value = Book.read;
 


    if(readbutton.value === "true"){
        readbutton.classList.add('cardbuttonTrue');
        readbutton.textContent = "Read";
    }
    else{
        readbutton.classList.add('cardbuttonFalse');
        readbutton.textContent = "Not Read";

    }
    readbutton.addEventListener('click', function() {
        if(readbutton.value === "true"){
            readbutton.textContent = "Not Read"
            readbutton.classList.remove('cardbuttonTrue');
            readbutton.classList.add('cardbuttonFalse');
            readbutton.value = "false";
        }
        else{
            readbutton.textContent = "Read"
            readbutton.classList.remove('cardbuttonFalse');
            readbutton.classList.add('cardbuttonTrue');
            readbutton.value = "true";
        }
    });

    let staroutline = document.createElement('img');
    staroutline.src= 'stars/star-outline.svg';



    bookcard.appendChild(titlediv);
    bookcard.appendChild(authordiv);
    bookcard.appendChild(pagediv);
    bookcard.appendChild(genrediv);

    bookcard.appendChild(staroutline);

    bookcard.appendChild(readbutton);
    bookcard.appendChild(cancelbutton);
    
    container.appendChild(bookcard);
}

const statusbutton = document.querySelector(".read");
statusbutton.addEventListener('click', function() {
    if(statusbutton.value === "true"){
        statusbutton.textContent = "Not Read"
        statusbutton.classList.remove('read');
        statusbutton.classList.add('notread');
        statusbutton.value = "false";
    }
    else{
        statusbutton.textContent = "Read"
        statusbutton.classList.remove('notread');
        statusbutton.classList.add('read');
        statusbutton.value = "true";
    }
});

