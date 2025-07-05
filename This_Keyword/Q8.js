function personInfo(){
    console.log(this.name);
    console.log(this.age);
}

const person={
    name:"Alok Kumar Singh",
    age:23,
}

personInfo.call(person);