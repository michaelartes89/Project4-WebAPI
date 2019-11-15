//wait until page is loaded
//document.addEventListener("DOMContentLoaded", function (event) {

    //create variables to target DOM elements

    var startBtn = document.getElementById("startButton");
    var startCard = document.getElementById("startingCard");
    var questCard = document.getElementById("questionCard");
    var timerDisplay = document.getElementById("timer");
    var alert = document.getElementById("alert");
    var footer = document.getElementById("footer");
    var scoreLink = document.getElementById("scoreLink");
    var scoreCard = document.getElementById("scoreCard");
    var highScoreList = document.getElementById("highScoreList");
    var instructions = document.getElementById("instructions");

    var questText = document.getElementById("questionPromt");
    var clearBtn = document.getElementById("clearBtn");
    var clearBTnArea = document.getElementById("clearBtnArea");


    //answer input
    var a = document.getElementById("AAnswer");
    var b = document.getElementById("BAnswer");
    var c = document.getElementById("CAnswer");
    var d = document.getElementById("DAnswer");

    //answer buttons
    var aBtn = document.getElementById("AAnswerBtn");
    var bBtn = document.getElementById("BAnswerBtn");
    var cBtn = document.getElementById("CAnswerBtn");
    var dBtn = document.getElementById("DAnswerBtn");

    var problemTime = 15;
    var penalty = 5;

    var iter = 0;
    var timer = 75;
    var endTime = 0;
    var correct = 0;
    var wrong = 0;
    var user = "";
    var score = 0;
    var newQuestions = questions;
    var scoreList = [];
    var maxScore = 0;
    var scoreShown = false;

    instructions.textContent = ("Your score is your number of correct anwsers times "+problemTime+"plus the time remaning. When you get a question wrong you lose"+penalty+"seconds from your time");

    // randomize array elements oder in place using Durstenfeld shuffle algorith (as seen in Alex's repo)

    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randonIndex;

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    //resets card to the next quetions 
    function setQuestions(index) {
        questText.textContent = questions[index].title;
        let choiceArray = questions[index].choices
        choiceArray = shuffle(choiceArray)

        a.textContent = choiceArray[0];
        b.textContent = choiceArray[1];
        c.textContent = choiceArray[2];
        d.textContent = choiceArray[3];

    }

    //adding eventlisteners to buttons

    startBtn.addEventListener("click", function() {
        startCard.style.display = "none";
        questCard.style.display = "block";
        beginGame();
    });

    // see scorelist

    scoreLink.addEventListener("click", function(event) {
        event.preventDefault();
        if (scoreShown) {
            scoreShown = false;
            scoreCard.style.display = "none";
        } else {
            scoreShow = true;
            scoreCard.style.display = "block";
        }
        scoreSet();
    });

    scoreCard.style.display = "none"; //set score to hidden by default 

    //clear saved scores
    clearBtn.addEventListener("click", function (event) {
        event.preventDefault();
        clearScores();

    });

    //assigns listeners to answer buttons
    var addBtns = document.getElementsByClassName("answerBtn");
    for (var i = 0; i < addBtns.length; i++) {
        addBtns[i].addEventListener("click", userChoice, false);
    }

    //run scoreSet in case there is saved data
    scoreSet();

    // this function checks to see if the answer the user selects is correct
    function userChoice(event) {
        event.preventDefault();

        let userAnswer = "";
        userAnswer = event.target.nextElementSibling.textContent;

        if (userAnswer === newQuestions[iter].anwser) {
            console.log("win");
            console.log(iter);
            correct++;
            footer.textContent = "Right!"

        } else {
            console.log("lose");
            console.log("iter");
            timer -= penalty;
            wrong++;
            if (wrong > 1) {
                questCard.classList.remove("shake");
                void questCard.offsetWidth
                questCard.classList.add("shake");


            } else { questCard.classList.add("shake"); }
                footer.textContent = "Wrong!"
            }
            if (iter < (newQuestions.length - 1)) {
                iter++;
                setQuestions(iter);

            } else if (iter === (newQuestions.length - 1)) {
                iter++;
            }


        }

        //build scorecard
        function scoreSet() {
            scoreList = JSON.parse(localStorage.getItem("scores") || "[]");
            for(var i = 0; i < scoreList.length; i++) {
                var scoreLI =document.createElement("li");
                scoreLI.innerText=`${i}: ${scoreList[i]}`
                highScoreList.append(scoreLI);
            }
        

           /* scoreList.sort(function (a, b) {
                return parseInt(b.score) - parseInt(a.score);
            });
            console.log(scoreList);

            if (scoreList.length === 0) {
                clearBtnArea.style.display = "none";
                alert.textContent = "Test your skills";
            } else {
                clearBtnArea.style.display = "block";
                maxScore = scoreList[0].score; 
                alert.textContent = "Previous high score: " + maxScore;

            }

            for (let j = 0; j < scoreList.length; j++) {
                var scoreDisp = scoreList[j].user + ": " + scoreList[j].score; 

                var li = document.createElement("li");
                li.textContent = scoreDisp; 
                highScoreList.appendChild(li);
                }
                */
            }

            //clear saved scores and local storage

            function clearScore() {
                scoreList = []; 
                localStorage.setItem("score", JSON.stringify(scoreList));
                scoreSet();
            }

            //ends game run, calculates and stores the score

            function endGame() {
                clearInterval(interval); 
                endTime = timer; 
                timer = 0; 
                timerDisp.textContent = timer; 
                console.log("wins" + correct + ", losses " + wrong + ", " + endTime);
                startCard.style.display = "block";
                questCard.style.display = "none";

                let highScore = (correct * problemTime + endTime);
                let userInput = prompt("Your score is correct * problemTime + endTime. Enter Your Initials:");
                if (userInput === null) {
                    userInput ==="???";
                }
                scoreList = JSON.parse(localStorage.getItem("score") || "[]");
                scoreList.push({ score: highScore, user: userInput });

                localStorage.setItem("scores",JSON.stringify(scorelist));
                scoreSet();

                footer.textContent = "Play Again...if you dare";
            }
            



        





        //starts the game 
        function beginGame() {
            correct = 0;
            wrong = 0;
            iter = 0;
            timer = questions.length * problemTime;

            questCard.classList.remove("shake");
            void questCard.offsetWidth;

            newQuestions = shuffle(newQuestions);

            setQuestions(iter);

            interval = setInterval(function () {

                timerDisplay.textContent = timer;
                timer--;

                if (timer < 0) {
                    endgame();
                } else if (iter >= newQuestions.length) {
                    endGame();
                }

            }, 1000);
        }

   // });

