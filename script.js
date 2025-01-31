document.addEventListener("DOMContentLoaded",function(){
    
     const searchButton = document.getElementById("search-btn");
     const usernameInput = document.getElementById("user-input");
     const statsContainer = document.querySelector("stats-container");
     const easyProgressCircle = document.querySelector(".easy-progress");
     const mediumProgressCircle = document.querySelector(".medium-progress");
     const hardProgressCircle = document.querySelector(".hard-progress");
     const easyLabel = document.getElementById("easy-label");
     const mediumLabel = document.getElementById("medium-label");
     const hardLabel = document.getElementById("hard-label");
     const cardStatsContainer = document.querySelector(".stats-cards");
    //return yes or no based on regex
     function validateUsername(username){
        if(username.trim() === ""){
            alert("Username should not be empty");
            return false;
        }
        const regex = /^[a-zA-Z0-9_-]{1,15}$/;
        const isMatching = regex.test(username);
        if(!isMatching){
            alert("Invalid Username");
        }
        return isMatching;
     }
    async function fetchUsernameDetails(username){
      const url = `https://leetcode-stats-api.herokuapp.com/${username}`;
      try{
        searchButton.innerText = "searching..";
        searchButton.disabled = true;
        const response = await fetch(url);
        if(!response.ok){
            throw new Error(`unable to find username data`);
            
        }
        const data = await response.json();
        console.log("Logging data: ",data);
        displayUserData(data);
      }

      catch(error) {
        statsContainer.innerHTML = `<p>${error.message}</p>`
    }

      finally{
        searchButton.innerText = "search";
        searchButton.disabled = false;
      };
    }

    function updateProgress(solved, total, label, circle){
        const progressDegree = (solved/total)*100;
        circle.style.setProperty("--progress-degree", `${progressDegree}%` );
        label.textContent = `${solved}/${total}`;
    }

    function displayUserData(data){
        const totalsolved = data.totalSolved;
        const easysolved = data.easySolved;
        const hardsolved = data.hardSolved;
        const mediumsolved = data.mediumSolved;

        const totalquestion = data.totalQuestion;
        const totaleasy = data.totalEasy;
        const totalmedium = data.totalMedium;
        const totalhard = data.totalHard;

        const acceptanceRate = data.acceptanceRate;
        const ranking = data.ranking;
        const contributionPoints = data.contributionPoints;

        updateProgress(easysolved, totaleasy, easyLabel, easyProgressCircle);
        updateProgress(mediumsolved, totalmedium, mediumLabel, mediumProgressCircle);
        updateProgress(hardsolved, totalhard, hardLabel, hardProgressCircle);
    
        const cardsData = [        
             {label : "acceptanceRate", value: acceptanceRate},
             {label : "ranking", value: ranking},
             {label : "contributionPoints", value: contributionPoints},
           ];

        console.log("cards ka data",cardsData);
           
        cardStatsContainer.innerHTML = cardsData.map(
            data => 
                    `<div class="card">
                    <h4>${data.label}</h4>
                    <p>${data.value}</p>
                    </div>`
        ).join("")
       
} 
   

     searchButton.addEventListener('click', function(){
         const username = usernameInput.value;
         console.log(`logging username ${username}`);
        
         if(validateUsername(username)){
            fetchUsernameDetails(username);

         }
     })
})