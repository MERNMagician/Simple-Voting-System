const buttons = Array.from(document.querySelectorAll(".btn"));


let voted = false;
buttons.forEach((button) => button.addEventListener('click',getCurrency));
document.addEventListener('DOMContentLoaded', () =>
     { (getLogged()) ? voted = true : ""; (voted) ? disableButtons() : "" }
    
   );



function getCurrency(event){
    const target = event.target.id;
    handleVote(target);

    
}

function getLogged(){
    const getItems = localStorage.getItem("logged");
    const parsed = JSON.parse(getItems);

    console.log(parsed.voted);

    return parsed.voted;
}


function handleVote(currency){
    let votes = 0;
    if(!voted){
        if(localStorage.getItem(`${currency}`) != undefined){
            votes = getPreviousVote(currency);
            addVote(currency,votes);
            return;
        }else{
            addVote(currency,0);
        }
    }

}


function getPreviousVote(currency,votes){
    const getItems = localStorage.getItem(`${currency}`);
    const parsed = JSON.parse(getItems);

    return parsed.voteCount;

}

function addVote(currency,votes){
    const newVote = {
        currency:currency,
        voteCount:votes+1,
    }

    localStorage.setItem(`${currency}`,JSON.stringify(newVote));

    
    Swal.fire({
        title: "Voted Successfully!",
        icon: "success",
        draggable: true
    });
    
    voted = true;

    if(voted){
        disableButtons();
        updateVoted();

    }

}

function disableButtons(){
    buttons.forEach((button) => {
        button.innerHTML = "Done Voting";
        button.style.backgroundColor = "#E63946";
        button.style.color =  "white";
    })
}

function updateVoted(){
    const getItems = localStorage.getItem("User");
    const getLoggedIn = localStorage.getItem("logged");
    const parsed = JSON.parse(getItems);
    const logs = JSON.parse(getLoggedIn);

    const changed = parsed.map((user) => {
        if(user.email == logs.email && user.password == logs.password){
            user.voted = true;

        }
        return user;
    });

   localStorage.setItem("User",JSON.stringify(changed));
}