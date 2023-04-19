// Provides api url and my personal api key
const API_URL = "https://quizapi.io/api/v1/questions";
const API_KEY = "Sgp52u6S4HuKMEJRFjUJzBu7VgRxrailgBrwgxWo";

// initial quiz values
let questions = [];
let currentQuestion = 0;
let correctQuestions = 0;
// keeps track if the user has selected an answer or not
let chosenAnswer = false;

// selects html items that will be changed
const difficultyButtons = document.querySelector("#buttons");
const questionText = document.querySelector("#question");
const answers = document.querySelector("#answers");
const resultCounter = document.querySelector("#result");
const reminderText = document.querySelector("#reminder");
const correctText = document.querySelector("#correct");

difficultyButtons.addEventListener("click", (event) =>
{
	if (event.target.className === "dbutton")
	{
		difficultyButtons.style.display = "none";

		
		const url = `${API_URL}?apiKey=${API_KEY}&limit=10&difficulty=${event.target.value}`;
		
		fetch(url)
		.then((response) => response.json())
		.then((data) => {
			questions = data;
			currentQuestion = 0;
			showQuestion();
		});
	}
});

// displays the current question and all answers
function showQuestion() {
	const question = questions[currentQuestion];
	questionText.innerHTML = `<h2>${question.question}</h2>`;
	answers.innerHTML = "";
    // creates button for each possible answer
	for (let answer in question.answers)
	{
		if (question.answers[answer])
		{
			answers.innerHTML += `<button type="submit" name="answer" value="${answer}"> ${question.answers[answer]}</button>`;
			// answers.innerHTML += `<p><input type="radio" name="answer" value="${answer}"> ${question.answers[answer]}</p>`;
		}
	}
    // clears the result message or correct or incorrect
	resultCounter.innerHTML = "";
    // clears the next button reminder if it was selected
	reminder.innerHTML = "";
}

//shows that an answer was selected
answers.addEventListener("change", (event) => {
	chosenAnswer = true;
    // gets value of selected answer
	const selectedAnswer = event.target.value;
	const question = questions[currentQuestion];
    // object keys resorce mozilla Global_Objects/Object/keys
	const correctAnswer = Object.keys(question.answers).find(
		(answer) => question.answers[answer] === "True"
	);
    // if the answer is correct the CORRECT! prompt will be displayed and a number will be added to the count
	if (selectedAnswer === correctAnswer)
	{
		resultCounter.innerHTML = `<p class="result">CORRECT!</p>`;
		correctQuestions++;
	}
    // else INCORRECT! will be displayed and no count will be adjusted
	else
	{
		resultCounter.innerHTML = `<p class="result">INCORRECT.</p>`;
	}
    // changes the count and keeps the /10
	correctText.innerHTML = `${correctQuestions}/10`
});
//Event listener for the next button
const nextButton = document.querySelector("#nextbutton");
nextButton.addEventListener("click", () => {
	if (chosenAnswer)
	{
        chosenAnswer = false;
        // if there are more question to display it will move to the next
		if (currentQuestion < questions.length - 1)
		{
			currentQuestion++;
			showQuestion();
		}
		else
        // it will show the difficulty selector
		{
			difficultyButtons.style.display = "inline";
		}
	}
	else
    // this is if a user doesnt select an answer and clicks next. provides a prompt to select
	{
		if (questions.length != 0)
		{
			reminder.innerHTML = "Please select an answer before clicking 'Next'."
		}
	}
});

//Event listener for the reset button
const resetButton = document.querySelector("#resetbutton");
resetButton.addEventListener("click", () => {
	correctQuestions = 0;
	correctText.innerHTML = `${correctQuestions}/10`;
	// clears the question, answer and result sections
	questionText.innerHTML = "";
	answers.innerHTML = "";
	resultCounter.innerHTML = "";
	reminder.innerHTML = "";
	// clears the questions array
	questions = [];
	// displays the difficulty selector
	difficultyButtons.style.display = "inline";
});