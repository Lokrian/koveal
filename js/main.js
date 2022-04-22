"use strict";

// Сюда передаются вопросы пользователя.
const questions = {
}
// Сюда передаются ответы на вопросы.
const answers = {
}
// Выдает приветствие.
const greetings = {
    user,
    testContainer: 'test',

    init() {
        this.renderGreetings();
    },
    // ... Рендер формы с именем ...
    renderGreetings() {
        let greetingsBlock = `<form id="form" action="">
                <h2>Пройди тест и найди своё идеальное платье от Koveal Boutique!</h2>
                <input type="text" id="form-input" name="name" placeholder="Имя" value>
                <div id="form-submit">Перейти к тесту</div>
        </form>`
        let testBlock = document.getElementById(this.testContainer);
        testBlock.insertAdjacentHTML("afterbegin", greetingsBlock);

        this.formValidate();     
    },
    // ... Валидация формы с именем ...
    formValidate() {
        const capitalize = (s) => {
            if (typeof s !== 'string') return ''
            return s.charAt(0).toUpperCase() + s.slice(1)
          }
        document.getElementById('form-submit').addEventListener('click', () => {
            if (document.getElementById('form-input').value) {
                this.user.setName(capitalize(document.getElementById('form-input').value.trim()))
                this.clearTestArea();
                renderTest.init(figureQuestions, figureAnswers);
            } else {
                document.getElementById('form-input').classList = 'form-invalid';
                document.getElementById('form-input').placeholder = 'Необходимо ввести имя';
                document.getElementById('form-input').addEventListener('focus', function() {
                    this.classList = '';
                })
            }
        })
    },
    clearTestArea() {
        document.getElementById('form').remove();
    }
}
// Рендерит тест.
const renderTest = {
    questions,
    answers,
    user,
    answer: 1,
    question: 1,
    testContainer: 'test',
    blockQuestion: document.querySelector('.question'),
    blockAnswers: document.querySelector('.answers'),
    init(userQuestions, userAnswers) {
        Object.assign(this.questions, userQuestions)
        Object.assign(this.answers, userAnswers)
        this.renderQuestion();
    },
    // ... Рендерит вопрос и вставляет его на страницу. ...
    renderQuestion() {
        this.blockQuestion.insertAdjacentHTML('beforeend', this.questions[`q${this.question}`]);
        $(this.blockQuestion).fadeIn(2500)
        this.renderAnswer();
    },
    // ... Рендерит ответ к вопросу. ...
    renderAnswer() {
        let arrButton = [];
        let buttonNumber = 0;
        // Добавляет в массив arrButton кнопки с ответами
        for (let i in this.answers[`a${this.answer}`]) {
                arrButton.push(`<button class="answer-button" data-button-number=${i} value="${this.answers[`a${this.answer}`][i]}">${this.answers[`a${this.answer}`][i]}</button>`);
            }
        for (buttonNumber in arrButton) {
            this.blockAnswers.insertAdjacentHTML('beforeend', arrButton[buttonNumber])
        }
        this.fadeInButtons(arrButton);
        this.createButtonsListener();
    },
    // ... Добавляет кнопкам эффект "Появления" ...
    fadeInButtons(arrButton) {
        let i = 0
        let fadeTime = 500;
        while (i < arrButton.length) {
            $(`.answer-button:nth-child(${i + 1})`).fadeIn(fadeTime);
            i++;
            fadeTime += 200;
        }
    },
    // ... Добавляет слушателя для кнопок ...
    createButtonsListener() {
        let buttons = document.querySelectorAll('.answer-button');
        for (let button of buttons) {
            button.addEventListener('click', event => {
                this.removeScreen();
                // .. branches.js ..
                if(this.user.figureType == null) {
                    correctBranch.init(event);
                } else if (this.user.contrastType == null){
                    correctContrast.init(event);
                } else {
                    setCorrectColor.init(event);
                }
            })
        }
    },
    // ... Удаляет старый вопрос. ...
    removeScreen() {
        this.blockQuestion.innerHTML = '';
        this.blockAnswers.innerHTML = '';
    },
    removeQuestionsAndAnswers() {
        this.question = 1;
        this.answer = 1;
        this.questions = {};
        this.answers = {};
    },
    renderDresses(block) {
        let loadDisplay = `
            <div class="load-display">
                <img class="load-display-img img-fluid" src="/img/logo.png" alt="">
            </div>
        `
        let container = document.querySelector('.test-block');
        container.insertAdjacentHTML('beforeend', loadDisplay);
        $('.load-display').fadeOut(1200);
        document.querySelector('.logo').style.width = '7%';
        document.querySelector('.logo').classList.add('final-logo');
        document.getElementById('test').remove()
        container.insertAdjacentHTML('afterbegin', block);  
    }
}


greetings.init();