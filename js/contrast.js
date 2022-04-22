"use strict";

const contrast = {
    userArrOfAnswers: [],
    userCont: null,
    init(arr) {
        this.userArrOfAnswers = arr;
        this.setContrast();
    },
    // Принимает варианты ответов и проверяет их на совпадения с массивом ответов юзера.
    // Если вариант совпал, возвращает true.
    check(arrB) {
        let a = 0;
        let status = null;
        arrB.forEach(element => {
            let i = 0;
            let notTrue = 0;
            a = 0;
            element.forEach(el => {
                if (typeof(el) == 'object') {
                    for(let o = 0; o < el.length; o++) {
                        if (el[o] == this.userArrOfAnswers[i]) {
                            a++;
                        }
                    }
                } else {
                    if (el == this.userArrOfAnswers[i]) {
                        a++;
                    } else {
                        notTrue++;
                    }
                }
                i++;             
            })
            if (a == 3) {
                return status = true;
            }
        })
        return status;  
    },
    // Инициализирует варианты ответа. И запускает функцию проверки совпадений.
    setContrast() {
        let contr = [['a', ['b', 'c'], 'c'],
                    ['b', 'c', 'c'],
                    ['c', 'a', ['a', 'b', 'c']],
                    ['c', 'b', 'c'],
                    ['a', 'c', ['a', 'b', 'c']],];
        let mdle = [
                    ['a', 'b', ['a', 'b']],
                    ['b', 'a', ['b', 'c']],
                    ['c', 'b', ['a', 'b']],
                    ['b', 'c', ['a', 'b']]
        ]
        let low = [
                    ['a', 'a', ['a', 'b', 'c']],
                    ['b', 'b', ['a', 'b', 'c']],
                    ['c', 'c', ['a', 'b', 'c']],
                    ['b', 'a', 'a']
        ]
        // Check возвращает true или false.
        if(this.check(contr)) {
            this.userCont = 'Высокий';
        } else if (this.check(mdle)) {
            this.userCont = 'Средний';
        } else if (this.check(low)) {
            this.userCont = 'Низкий';
        }
    },
    // Принимает массив ответов юзера. Возвращает тип контраста.
    getCont(arr) {
        this.init(arr);
        return this.userCont;
    }
}

const correctContrast = {
    user,
    contrast,
    renderTest,
    event: null,
    questionNumber: 0,
    firstQuestionValue: null,
    secondQuestionValue: null,
    thirdQuestionValue: null,
    // Выбирает правильный вопрос с помощью questionNumber.
    init(event) {
        this.event = event;
        switch (this.questionNumber) {
            case 0:
                this.firstQuestion();
                break;
            case 1:
                this.secondQuestion();
                break;
            case 2:
                this.thirdQuestion();
                break;
            default:
                console.log('Ошибка');
                break;
        }
    },
    // В зависимости от ответа, устанавливается буква ответа [a, b, c] в переменную в соответствии с вопросом.
    firstQuestion() {
        if (this.event.target.value === 'Светлый') {
            this.firstQuestionValue = 'a';
            this.renderTest.question = 2;
            this.renderTest.answer = 2;
            this.questionNumber++;
            this.renderTest.renderQuestion();
        } else if (this.event.target.value === 'Среднего оттенка') {
            this.firstQuestionValue = 'b';
            this.renderTest.question = 2;
            this.renderTest.answer = 2;
            this.questionNumber++;
            this.renderTest.renderQuestion();
        } else {
            this.firstQuestionValue = 'c';
            this.renderTest.question = 2;
            this.renderTest.answer = 2;
            this.questionNumber++;
            this.renderTest.renderQuestion();
        }
    },
    secondQuestion() {
        if (this.event.target.value === 'Очень светлая') {
            this.secondQuestionValue = 'a';
            this.renderTest.question = 3;
            this.renderTest.answer = 3;
            this.questionNumber++;
            this.renderTest.renderQuestion();
        } else if (this.event.target.value === 'Немного загорелая') {
            this.secondQuestionValue = 'b';
            this.renderTest.question = 3;
            this.renderTest.answer = 3;
            this.questionNumber++;
            this.renderTest.renderQuestion();
        } else {
            this.secondQuestionValue = 'c';
            this.renderTest.question = 3;
            this.renderTest.answer = 3;
            this.questionNumber++;
            this.renderTest.renderQuestion();
        }
    },
    thirdQuestion() {
        if (this.event.target.value === 'Нюдовый/не ношу') {
            this.thirdQuestionValue = 'a';
        } else if (this.event.target.value === 'Немного яркий') {
            this.thirdQuestionValue = 'b';
        } else {
            this.thirdQuestionValue = 'c';
        }
        this.createArrOfAnswers();
        
    },
    // Создается массив с ответами в виде букв [a, b, c].
    createArrOfAnswers() {
        let arrOfUserAnswers = [];
        arrOfUserAnswers.push(this.firstQuestionValue, this.secondQuestionValue, this.thirdQuestionValue);
        this.findCorrectContrast(arrOfUserAnswers);
    },
    // В переменную type устанавливает ответ из contrast.getCont и из этой переменной устанавливает тип контраста.
    findCorrectContrast(userType) {
        let type = this.contrast.getCont(userType);
        this.user.setContrast(type);
        this.renderTest.removeQuestionsAndAnswers();
        this.renderTest.init(colorQuestions, colorAnswers);
    },
}