//wait until page is loaded
document.addEventListener("DOMContentLoaded", function (event) {

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
    var a = document.getElementById("AAnwers");
    var b = document.getElementById("BAnwers");
    var c = document.getElementById("CAnwers");
    var d = document.getElementById("DAnwers");

    //answer buttons
    var aBtn = document.getElementById("AanswerBtn");
    var bBtn = document.getElementById("BanswerBtn");
    var cBtn = document.getElementById("DanswerBtn");
    var dBtn = document.getElementById("DanswerBtn");

    var probelmTime = 15;
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
    var scoreshown = false;

    instructions.textContent = ("Your score is your number of correct ansers times " + problemTime + "plus the time remaning. When you get a question wrong you lose" + penalty + "seconds from your time");

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
        questText.textContent = question[index].title;
        let choiceArray = questions[index].choices
        choiceArray = shuffle(choiceArray)

        a.textContent = choiceArray[0];
        b.textContent = choiceArray[1];
        c.textContent = choiceArray[2];
        d.textContent = choiceArray[3];

    }
    //adding eventlisteners to buttons

    startBtn.addEventListener("click", function () {
        startCard.style.display = "none";
        questCard.style.display = "block";
        beginGame();
    });

    // see scorelist

    scoreLink.addEventListener("click", function () {
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
    var addBtns = document.getElementsByClassName("asnwerBtn");
    for (var i = 0; i < addBtns.length; i++) {
        addBtns[i].addEventListener("click", userChoice, false);
    }

    //run scoreSet in case there is saved data
    scoreSet();

    // this function checks to see if the answer the user selects is correct
    function userChoice(event) {
        event.preventDefault();

        let userAnwer = "";
        userAnwer = event.target.nextElementSibling.textContent;

        if (userAnwer === newQuestions[iter].anwser) {
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
                void questCard.offsetWidthl
                questCard.classList.add("shake");


            } else {
                questCard.classList.add("shake");
                footer.textContent = "Wrong!"
            }
            if (iter < (newQuestions.length - 1)) {
                iter++;
                setQuestions(iter);

            } else if (iter === (newQUestions.length - 1)) {
                iter++;
            }


        }

        //build scorecard
        function scoreSet () {
            scoreList = JSON.parse(localStorage.getItem("scores") || "[]");
            highScoreList.innerHTML = "";
            console.log(scorelist);

            scoreList.sort(function (a,b) {
                return parseInt (b.score) -parseInt(a.score);
            });
            console.log(scoreList);

            if (scoreList.length ===0) {
                clearBTnArea.style.display = "none";
                alert.textContent = "Test your skills";
            } else {
                clearBTnArea.style.display = "block";
                maxScore = scoreList[0].score; 
                alert.textContent = "Previous high score: " + maxScore;

            }

            for (let j = 0; j < scoreList.length; j++) {
                var scoreDisp = scoreList[j]. user + ": " + scorelist[j].score; 

                var li = document.createElement("li");
                li.textContent = scoreDisp; 
                highScoreList.appendChild(li);
            }
            }

            //clear saved scores and local storage

            function clearScore() {
                scoreList = []; 
                localStorage.setItem("score", JSON.stringify(scoreList));
                scoreSet();
            }
            



        }





        //starts the game 
        function beginGame() {
            correct = 0;
            wrong = 0;
            iter = 0;
            timer = questions.length * probelmTime;

            setQuestions(iter);

            interval = setInterval(function () {

                timerDisp.textContent = timer;
                timer--;

                if (timer < 0) {
                    endgame();
                } else if (iter >= newQuestions.length) {
                    endGame();
                }
            }, 1000);

        });

