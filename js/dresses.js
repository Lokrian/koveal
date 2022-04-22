"use strict";
let url = 'js/dresses/dresses.json'

const getGoodsRequest = {
    userAns: [],
    init(userAnswers) {
        this.userAns = userAnswers;
        this.setRequest()
    },
    setRequest() {
        let request = new XMLHttpRequest();
        request.open('GET', url);
        request.responseType = 'json';
        request.send();
        
        request.onload = function() {
            let bdAnswer = request.response;
            bdAnswer.forEach(element => {
                new Dress(element)
            });
            results.renderDressBlock();
        
        }
    }
    
}

class Dress {
    constructor(params) {
        Object.assign(this, params)
        this.coincResult = 0;
        this.coincFigure();
        this.coincColor();
        this.coincContrast();
        console.log(this.coincResult);

        results.count(this.coincResult, this.name ,this.img, this.url);
    }
    coincFigure() {
        if (typeof(this.figureType) == 'object') {
            this.figureType.forEach(element => {
                if (element == getGoodsRequest.userAns[0]) {
                    this.coincResult += 4;
                } 
            });
        } else {
            if (this.figureType == getGoodsRequest.userAns[0]) {
                this.coincResult += 4;
            }
        }
    }
    coincColor() {
        if (this.color == getGoodsRequest.userAns[2]) {
            this.coincResult++;
        }
    }
    coincContrast() {
        if (this.contrast == getGoodsRequest.userAns[1]) {
            this.coincResult += 2;
        } else if (this.contrast == 'Средний' && getGoodsRequest.userAns[1] == 'Высокий') {
            this.coincResult += 1.5;
        } else if (this.contrast == 'Средний' && getGoodsRequest.userAns[1] == 'Низкий') {
            this.coincResult += 1.5;
        } else if (this.contrast == 'Высокий' && getGoodsRequest.userAns[1] == 'Низкий') {
            this.coincResult += 1;
        }
    }
    
}

const results = {
    firstDr: ['name', 'img', 0, 'url'],
    secondDr: ['name', 'img', 0, 'url'],
    thirdDr: ['name', 'img', 0, 'url'],
    user,

    count(num, name, img, url) {
        if (num > this.firstDr[2]) {
            this.checkOthersValues(this.firstDr[0], this.firstDr[1], this.firstDr[2], this.firstDr[3]);
            this.firstDr[2] = num;
            this.firstDr[0] = name;
            this.firstDr[1] = img;
            this.firstDr[3] = url;
        } else if (num > this.secondDr[2]) {
            this.checkOthersValues(this.secondDr[0], this.secondDr[1], this.secondDr[2], this.secondDr[3]);
            this.secondDr[2] = num;
            this.secondDr[0] = name;
            this.secondDr[1] = img;
            this.secondDr[3] = url;
        } else if (num > this.thirdDr[2]) {
            this.thirdDr[2] = num;
            this.thirdDr[0] = name;
            this.thirdDr[1] = img;
            this.thirdDr[3] = url;
        }
    },
    checkOthersValues(name, img, value, url) {
        if (value > this.secondDr[2]) {
            this.secondDr[2] = value;
            this.secondDr[0] = name;
            this.secondDr[1] = img;
            this.secondDr[3] = url;

        } else if (value > this.thirdDr[2]) {
            this.thirdDr[2] = value;
            this.thirdDr[0] = name;
            this.thirdDr[1] = img;
            this.thirdDr[3] = url;
        }
    },
    renderDressBlock() {
        let block = `
        <div class="final">
            <div class="form-title">
                <h5>${this.user.getName()}, поздравляем Вас с завершением теста!</h5>
                <ul>
                    <li>Тип фигуры: ${this.user.getFigureType().toLowerCase()}</li>
                    <li>Уровень контрасности: ${this.user.getContrastType().toLowerCase()}</li>
                    <li>Оттенок: ${this.user.getColorType().toLowerCase()}</li>
                </ul>
                <p>Идеальные платья для Вас от Koveal Boutique:</p>
            </div>
            <div class="owl-carousel owl-theme final-form row" id="final-form">
                <a href="${this.firstDr[3]}" class="item dress">
                    <img class="img-fluid final-form-img" src="${this.firstDr[1]}" alt="">
                    <p class="title final-form-title final-form-img">${this.firstDr[0]}</p>
                </a>
                <a href="${this.secondDr[3]}" class="item dress">
                    <img class="img-fluid final-form-img" src="${this.secondDr[1]}" alt="">
                    <p class="title final-form-title final-form-img">${this.secondDr[0]}</p>
                </a>
                <a href="${this.thirdDr[3]}" class="item dress">
                    <img class="img-fluid final-form-img" src="${this.thirdDr[1]}" alt="">
                    <p class="title final-form-title final-form-img">${this.thirdDr[0]}</p>
                </a>
            </div>
            <div class="test-contacts">
                <a target="_blank" href="https://instagram.com/koveal.club" class="instagram">
                    <img src="/img/logo_instagram.png" alt="">
                </a>
                <a href="https://wa.me/+79253292913" class="whatsapp">
                    <img src="/img/logo_whatsapp.png" alt="">
                </a>
            </div>
        </div>
        `
        renderTest.renderDresses(block)
        if (window.screen.width < 1200) {
            $('.owl-carousel').owlCarousel({
                items: 1,
                center: true,
                // responsive:{
                //     1200:{
                //         items:2,
                //         margin: -150,
                //         dots: true,
                //     }
                // }
            })
        } else {
            let block = document.getElementById('final-form');
            block.classList = '';
            $('.final-form-img').animate({
                marginLeft: "0"
            }, 2300)
            setTimeout(() => {
                $('.dress').addClass('dress-hover');
            }, 2300)
        }
        
        console.log(this.firstDr, this.secondDr, this.thirdDr);
    }
}

