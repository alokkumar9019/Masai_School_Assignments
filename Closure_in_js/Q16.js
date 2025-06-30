function createBankAccount(amount){
    let balance=amount;
    return {
        deposit: function(amount){
            balance+=amount;
            return balance;
        },
        withdraw: function(amount){
            if(balance<amount){
                console.log("Insufficient Balance");
            } else{
                balance-=amount;
            }
            return balance
        },
        getBalance: function(){
            return balance;
        },
        reset: function(){
            balance=amount;
            return balance;
        },
    }
}
const account = createBankAccount(100);

console.log(account.deposit(50));
console.log(account.withdraw(300));
console.log(account.getBalance()); 
console.log(account.reset()); 
