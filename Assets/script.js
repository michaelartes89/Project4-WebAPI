//wait until page is loaded
document.addEventListener("DOMContentLoaded", function(event) {

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

}