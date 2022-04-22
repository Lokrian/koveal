"use strict";

// Записывает тип фигуры.
const saveType = {
    type: null,
    renderTest,
    testContainer: 'test',
    user,
    init(type) {
        this.type = type;
        this.user.setFigureType(type);
        this.renderTest.removeQuestionsAndAnswers();
        this.renderTest.init(contrastQuestions, contrastAnswers);
    },
}
// Первая ветка.
const branchOne = {
    event: null,
    sandWatch: 0,
    triangle: 0,
    questionNumber: 0,
    renderTest,
    user,
    saveType,
    // Принимает событие и узнает какой вопрос отрендерить
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
            case 3:
                this.fourthQuestion();
                break;
            default:
                console.log('Ошибка');
        }
    },
    // С первого по четвертый вопрос:
    // Узнает ответ предыдущего вопроса и соответственно увеличивает значения нужных параметров.
    // Устанавливает нужный вопрос и ответ к нему, задает номер для рендера следующего вопроса,
    // Запускает рендер вопроса.
    firstQuestion() {
        switch (this.event.target.value) {
            case '25-35':
                this.sandWatch += 0.5;
                break;
            case 'больше 35':
                this.triangle += 0.5;
                break;
        }
        this.renderTest.question = 2;
        this.renderTest.answer = 2;
        this.questionNumber = 1;
        this.renderTest.renderQuestion();
    },
    secondQuestion() {
        if (this.event.target.value === 'Выраженные бедра') {
            this.triangle++;
        } else {
            this.sandWatch++;
        }
        this.renderTest.question = 4;
        this.renderTest.answer = 4;
        this.questionNumber = 2;
        this.renderTest.renderQuestion();
    },
    thirdQuestion() {
        if (this.event.target.value === 'Нижняя часть тела') {
            this.triangle++; 
        } else {
            this.sandWatch++;
        }
        this.renderTest.question = 5;
        this.renderTest.answer = 5;
        this.questionNumber = 3;
        this.renderTest.renderQuestion();
    },
    fourthQuestion() {
        if (this.event.target.value === 'Пропорционально во всех зонах') {
            this.sandWatch++; 
        } else {
            this.triangle++;
        }

        this.setType();

        
    },
    setType() {
        if (this.triangle > this.sandWatch) {
            this.saveType.init(`Треугольник`);
        } else if (this.sandWatch > this.triangle) {
            this.saveType.init(`Часы`);
        } else {
            this.saveType.init(`Наполовину часы, наполовину треугольник`);
        }
    }
}
// Вторая ветка.
const branchTwo = {
    event: null,
    rectangle: 0,
    reverseTriangle: 0,
    questionNumber: 0,
    renderTest,
    user,
    saveType,
    // Принимает событие и узнает какой вопрос отрендерить
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
            case 3:
                this.fourthQuestion();
                break;
            default:
                console.log('Ошибка');
        }
    },
    // С первого по четвертый вопрос:
    // Устанавливает нужный вопрос и ответ к нему, задает номер для рендера следующего вопроса,
    // Запускает рендер вопроса.
    firstQuestion() {
        this.renderTest.question = 3;
        this.renderTest.answer = 3;
        this.questionNumber = 1;
        this.renderTest.renderQuestion();
    },
    secondQuestion() {
        if (this.event.target.value === 'Выраженные плечи') {
            this.reverseTriangle++; 
        } else {
            this.rectangle++;
        }
        this.renderTest.question = 6;
        this.renderTest.answer = 6;
        this.questionNumber = 2;
        this.renderTest.renderQuestion();
    },
    thirdQuestion() {
        if (this.event.target.value === 'Достаточно выражен') {
            this.reverseTriangle++; 
        } else {
            this.rectangle++;
        }
        this.renderTest.question = 7;
        this.renderTest.answer = 7;
        this.questionNumber = 3;
        this.renderTest.renderQuestion();
    },
    fourthQuestion() {
        if (this.event.target.value === 'Верхняя часть: руки, грудь, живот, талия') {
            this.reverseTriangle++; 
        } else {
            this.rectangle++;
        }

        this.setType();
    },
    setType() {

        if (this.rectangle > this.reverseTriangle) {
            this.saveType.init(`Прямоугольник`)
        } else if (this.reverseTriangle > this.rectangle) {
            this.saveType.init(`Перевернутый треугольник`)
        } else {
            this.saveType.init(`Наполовину перевернутый треугольник, наполовину прямоугольник`);
        }
    } 
}
// Выбирает нужную ветку.
// firstBranchResult отвечает за конечный вопрос
const correctBranch = {
    event: null,
    renderTest,
    branchOne,
    branchTwo,
    firstBranchResult: 0,
    init(event) {
        this.event = event;
        if (this.firstBranchResult === 0) {
            this.findBranch();
        } else if(this.firstBranchResult === 1) {
            branchOne.init(this.event);
        } else if(this.firstBranchResult === 2) {
            branchTwo.init(this.event);
        }
        
    },
    findBranch() {
        if (this.event.target.value === '25-35' || this.event.target.value === 'больше 35') {
            branchOne.init(this.event);
            this.firstBranchResult = 1;
        } else if (this.event.target.value === 'меньше 25') {
            branchTwo.init(this.event);
            this.firstBranchResult = 2;
        }
    }
}

