let ideas=[];
document.getElementById('submitIdea').addEventListener('click', ()=>{
    let title=document.getElementById('ideaTitle').value;
    let desc=document.getElementById('ideaDesc').value;

    if(!title || !desc){
        alert("Please fill in both fields.");
        return;
    }

    let newIdea={
        id:Date.now(),
        title,
        desc,
        votes:0
    };

    ideas.push(newIdea);

    document.getElementById('ideaTitle').value='';
    document.getElementById('ideaDesc').value='';
    renderIdeas();
});

function renderIdeas(){
    let container=document.getElementById('ideasContainer');
    container.innerHTML='';
    ideas.forEach(idea=>{
        let card=document.createElement('div');
        card.className='ideaCard';
        card.innerHTML=`
            <h3>${idea.title}</h3>
            <p>${idea.desc}</p>
            <p><strong>Votes:</strong>${idea.votes}</p>
            <button onclick="upvoteIdea(${idea.id})"> Upvote</button>
        `
        container.appendChild(card);
    })
}

function upvoteIdea(id){
    let idea=ideas.find(i=>i.id==id);
    if(idea){
        idea.votes+=1;
        renderIdeas();
    }
}