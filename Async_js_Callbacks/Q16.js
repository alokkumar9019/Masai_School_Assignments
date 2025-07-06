

function fetchUserData(callback){
    console.log("Fetching user data...");
    setTimeout(()=>{
        const mess="User data received";
        console.log(mess);
        callback();
    },1000)
}

function fetchUserPosts(callback){
    console.log("Fetching user posts...");
    setTimeout(()=>{
        const mess="User posts received";
        console.log(mess);
        callback();
    },1500)
}

fetchUserData(()=>{
    fetchUserPosts(()=>{
        console.log("All data loaded successfully!");
    })
})