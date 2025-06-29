function outerFunction() {
    const outerVar = "I am from outer scope";
    
    function innerFunction() {
      console.log(outerVar);
    }
  
    innerFunction();
  }
  
  outerFunction();
  