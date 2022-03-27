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
let book1 = new Book("test1","katie",10,"romance",true,"Unrated");
let book2 = new Book("test2","bry",20,"teen",false,3);
let book3 = new Book("test3","josh",30,"children",true,2);
let book4 = new Book("test4","gio",30,"fantasy",true,1.5);


newCard(book1);
newCard(book2);
newCard(book3);
newCard(book4);


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

const removeChilds = (parent) => {
    while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
    }
};

function formSubmitted() {
    const form = document.querySelector("form");
    form.classList.add('hide');
    //Processing form information. Title should be 25 characters before introducing a box?
    let inputs = document.getElementById("form").elements;
    let pagecatcher = inputs[3].value;
    let ratingcatcher = inputs[5].value;
    console.log(inputs);
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
    //Rating
    if(inputs[5].value===""){
        ratingcatcher = "Unrated"
    }

    // let bookcard = document.createElement("div");
    // bookcard.classList.add("card");
    // bookcard.textContent = new Book(inputs[1].value,inputs[2].value,inputs[3].value,inputs[5].value).info();
    // container.appendChild(bookcard);

    newCard(new Book(inputs[1].value,inputs[2].value,pagecatcher,inputs[4].value,inputs[6].value,ratingcatcher));

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
    //child6
    let ratingdiv = document.createElement('div');


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

    if(Number.isInteger(Number(Book.pages))){
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
            let readParent = readbutton.parentNode;
            let currentRating = readParent.querySelector(".ratingdiv");
            console.log(currentRating);
            removeChilds(currentRating);
            let unrating = document.createElement('div');
            unrating.textContent = "Unrated";
            currentRating.appendChild(unrating);
            currentRating.style.color = "grey";

            readbutton.value = "false";
        }
        else{
            readbutton.textContent = "Read"
            readbutton.classList.remove('cardbuttonFalse');
            readbutton.classList.add('cardbuttonTrue');
            readbutton.value = "true";
        }
    });

    if(Book.rating === "Unrated"){
        ratingdiv.textContent = Book.rating;
        ratingdiv.classList.add('ratingdiv');
        ratingdiv.style.color = "grey";
    }
    else{
        let counter;
        ratingdiv.classList.add('ratingdiv');
        for(counter=0; counter < Book.rating; counter++){
            let starfilled = document.createElement('img');
            starfilled.src = 'stars/star.svg';
            ratingdiv.appendChild(starfilled);
        }
        if(Book.rating % 1 != 0){
            let starhalf = document.createElement('img');
            starhalf.src = 'stars/star-half.svg';
            ratingdiv.appendChild(starhalf);
            counter++;
        }
        for(counter; counter < 5; counter++) {
            let staroutline = document.createElement('img');
            staroutline.src= 'stars/star-outline.svg';
            ratingdiv.appendChild(staroutline);
        }

    }    

    bookcard.appendChild(titlediv);
    bookcard.appendChild(authordiv);
    bookcard.appendChild(pagediv);
    bookcard.appendChild(genrediv);

    bookcard.appendChild(ratingdiv);

    bookcard.appendChild(readbutton);
    bookcard.appendChild(cancelbutton);
    
    container.appendChild(bookcard);
}

const statusbutton = document.querySelector(".read");
const ratingbox = document.getElementById("rating");

statusbutton.addEventListener('click', function() {
    if(statusbutton.value === "true"){
        statusbutton.textContent = "Not Read"
        statusbutton.classList.remove('read');
        statusbutton.classList.add('notread');
        statusbutton.value = "false";
        ratingbox.type = "hidden";
        ratingbox.value = "";
    }
    else{
        statusbutton.textContent = "Read"
        statusbutton.classList.remove('notread');
        statusbutton.classList.add('read');
        statusbutton.value = "true";
        ratingbox.type = "number";
    }
});

