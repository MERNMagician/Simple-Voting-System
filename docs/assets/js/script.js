const buttons = Array.from(document.querySelectorAll(".btn"));
const signOut = document.querySelector("#signOut");
let voted = false;

buttons.forEach((button) => button.addEventListener('click',getCurrency));
signOut.addEventListener('click',logOut);

document.addEventListener('DOMContentLoaded', () => {
    countUsers();
    (getLogged()) ? voted = true : ""; (voted) ? disableButtons() : "";

    }
);

function getCurrency(event){
    const target = event.target.id; 
    handleVote(target);
    
}

function logOut(){
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, log me out!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
        }).then((result) => {
        if (result.isConfirmed) {
            swalWithBootstrapButtons.fire({
            title: "Success!",
            text: "You have been logged out successfully",
            icon: "success"
            }).then((result) => {
                result.isConfirmed ?  window.location = "/docs/index.html" : "";
            });
            
        } else if (
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "You choose to stay on page",
            icon: "success"
        });
        }
        });
    
}


function getLogged(){
    const getItems = localStorage.getItem("logged");
    const parsed = JSON.parse(getItems);

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
    let recentVotes = [];
    const newVote  = {
        currency:currency,
        vote:votes+1,
    }
    
    if(localStorage.getItem('Votes') != undefined){
        const getVotes = localStorage.getItem('Votes');
        const parseVotes = JSON.parse(getVotes);
        
    
        
        if(parseVotes.length != undefined){
            parseVotes.forEach((element) => {
                recentVotes.push(element);
                
            });
            
            recentVotes.push(newVote);
            localStorage.setItem('Votes',JSON.stringify(recentVotes));

        }else{
            recentVotes.push(parseVotes);
            recentVotes.push(newVote);
            localStorage.setItem('Votes',JSON.stringify(recentVotes));
        }

    }else{
        console.log('Else');
        localStorage.setItem('Votes',JSON.stringify(newVote));
    }

    

    
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

    updateStatus();
}


function countUsers(){
    const getUsers = localStorage.getItem("User");
    const parsedUsers = JSON.parse(getUsers);
    
    const userCount = parsedUsers.reduce((acc,item) => {
        acc++
        return  acc;
    },0);
    
    document.querySelector("#totalUsers").textContent = userCount;

    countVoted(parsedUsers);


}

function countVoted(users){

    if(users.length != undefined){
        const voted =   users.reduce((acc,user) => {
            
            if(user.voted == true){
                acc++;
        

            }
            return acc;
        },0)
            
        
        document.querySelector("#doneVote").textContent = voted;
    }else{
        document.querySelector("#doneVote").textContent = 1;
    }
    

}

function updateStatus(){
    const getItems = localStorage.getItem("logged");
    const parsed = JSON.parse(getItems);

    const updated = {
        email:parsed.email,
        password:parsed.password,
        voted:true,
    }

    localStorage.setItem("logged",JSON.stringify(updated));
    
    

}