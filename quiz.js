const questions = [
    {
        question: "Which state is also known as (fruit bowl) of India ?",
        answers : [
            {text: "Punjab", correct: false},
            {text: "Bihar", correct: false},
            {text: "Himachal pardesh", correct: true},
            {text: "Delhi", correct: false},
        ]
    },
    {
        question: "Which state is also known as land of rising Sun?",
        answers : [
            {text: "Arunanchal Pardesh", correct: true},
            {text: "Goa", correct: false},
            {text: "Gujarat", correct: false},
            {text: "West bengal", correct: false},
        ]
    },
    {
        question: "Who was the first person in India to receive The  Nobel prize ?",
        answers : [
            {text: "Mahatma Gandhi", correct: false},
            {text: "Milkha Singh", correct: false},
            {text: "Rabindranath Tagore", correct: true},
            {text: "Indra Gandhi", correct: false},
        ]
    },
    {
        question: "How Many language Does Indian Constitution recognise ?",
        answers : [
            {text: "24", correct: false},
            {text: "21", correct: false},
            {text: "22", correct: true},
            {text: "28", correct: false},
        ]
    }
];

 const questionElement  = document.getElementById("question");
 const answerButtons = document.getElementById("answer-buttons");
 const nextButton = document.getElementById("next-btn");

 let currentQuestionIndex =0;
 let score = 0;


 function startQuiz(){
    currentQuestionIndex= 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}


function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button=>{
        if(button.dataset.correct === "true"){
           button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
    nextButton.innerHTML = "Try Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex ++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();