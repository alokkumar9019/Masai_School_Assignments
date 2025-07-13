import { Book } from './books.js';
import { Member } from './member.js';
import { PremiumMember } from './premimumMember.js';

const book1 = new Book("1984", "George Orwell");
const book2 = new Book("The Great Gatsby", "F. Scott Fitzgerald");
const book3 = new Book("Moby Dick", "Herman Melville");
const book4 = new Book("Pride and Prejudice", "Jane Austen");
const book5 = new Book("To Kill a Mockingbird", "Harper Lee");
const book6 = new Book("Special Collections Vol.1", "Rare Author");

const alice = new Member("Alice");
const bob = new PremiumMember("Bob");

alice.borrowBook(book1);
alice.borrowBook(book2);
alice.borrowBook(book3);
alice.borrowBook(book4);  

bob.borrowBook(book1); 
bob.borrowBook(book4);
bob.borrowBook(book5);
bob.borrowBook(book6);
bob.borrowBook(book2); 
bob.borrowBook(book3); 
const borrowForAlice = alice.borrowBook.bind(alice);
borrowForAlice(book6); 
console.log("\nFinal Borrowed Books:");
console.log(`${alice.name}: ${alice.borrowedBooks}`);
console.log(`${bob.name}: ${bob.borrowedBooks}`);
