function createCounter(){
    let count=0;

    return {
        increment: function(){
            count++;
            return count;
        },
        reset: function(){
            count=0;
            return count;
        }
    }
}

const counter=createCounter();
console.log(counter.increment());
console.log(counter.increment());
console.log(counter.reset());