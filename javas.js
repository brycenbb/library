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
for(let i = 0; i < myLibrary.length;i++) {
    console.log("here");
    let bookcard = document.createElement("div");
    bookcard.classList.add("card");
    bookcard.textContent = myLibrary[i].info();
    container.appendChild(bookcard);
}

function formSubmitted() {
    console.log("I made it here wooooooo");
    const form = document.querySelector("form");
    form.classList.add('hide');

}

function newForm() {
    const form = document.querySelector("form");
    form.classList.remove('hide');
}