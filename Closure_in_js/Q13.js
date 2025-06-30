/* Create a closure that represents a bank account. Implement a function createBankAccount that initializes an account with a balance (input by the user) and returns methods to deposit, withdraw, and getBalance. Ensure that the balance cannot be accessed or modified directly from outside the closure.

deposit(amount): Increases the balance by the given amount.
withdraw(amount): Decreases the balance by the given amount, if there are sufficient funds.
getBalance(): Returns the current balance.*/

function createBankAccount(amount){
    let balance=amount;

    return {
        deposit: function(amount){
            balance+=amount;
            return balance;
        },
        withdraw: function(amount){
            balance-=amount;
            return balance
        },
        getBalance: function(){
            return balance;
        }
    }
}

const account = createBankAccount(100);

console.log(account.deposit(50));
console.log(account.withdraw(30));
console.log(account.getBalance()); 