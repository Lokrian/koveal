"use strict";

// Устанавливает тип цвета.
const setCorrectColor = {
    event: null,
    renderTest,
    user,
    cold: 0,
    warm: 0,
    answerResult: 0,
    // С помощью answerResult ищет необходимый вопрос.
    init(event) {
        this.event = event;
        switch (this.answerResult) {
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
    firstQuestion() {
        if(this.event.target.value == 'Теплый') {
            this.warm++;
        } else {
            this.cold++;
        }
        this.answerResult++;
        this.renderTest.question = 2;
        this.renderTest.answer = 2;
        this.renderTest.renderQuestion();
    },
    secondQuestion() {
        if(this.event.target.value == 'Теплый золотистый оттенок') {
            this.warm++;
        } else {
            this.cold++;
        }
        this.answerResult++;
        this.renderTest.question = 3;
        this.renderTest.answer = 3;
        this.renderTest.renderQuestion();
    },
    thirdQuestion() {
        if(this.event.target.value == 'Зеленый, карий') {
            this.warm++;
        } else {
            this.cold++;
        }
        if (this.cold > this.warm) {this.user.setColorType('Холодный');}else{this.user.setColorType('Теплый');}
        console.log(`Тип фигуры: ${this.user.getFigureType()}, тип контрастности: ${this.user.getContrastType()}, цветотип: ${this.user.getColorType()}`);
        getGoodsRequest.init(this.user.getAllTypesArr());
    }
}