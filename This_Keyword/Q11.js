let user = {
  username: "john_doe",
  showUsername: function() {
    console.log("Method:", this.username);
  }
};

function displayUsername() {
  console.log("Function:", this.username);
}

user.showUsername();      // Output: Method: john_doe
displayUsername();        // Output: Function: undefined (or window.username if in browser global scope)
