import { Member } from './member.js';

function PremiumMember(name) {
  Member.call(this, name); // call parent constructor
  this.specialCollectionAccess = true;
}

PremiumMember.prototype = Object.create(Member.prototype);
PremiumMember.prototype.constructor = PremiumMember;

PremiumMember.prototype.borrowBook = function (book) {
  if (this.borrowedBooks.length >= 5) {
    console.log(`${this.name} has already borrowed 5 books.`);
    return;
  }

  Member.prototype.borrowBook.call(this, book);
};

export { PremiumMember };
