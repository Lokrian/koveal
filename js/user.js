"use strict";

// Устанавливает параметры персоны.
const user = {
    name: null,
    figureType: null,
    contrastType: null,
    colorType: null,
    getAllTypesArr() {
        let allUserTypesArr = [];
        allUserTypesArr.push(this.figureType);
        allUserTypesArr.push(this.contrastType);
        allUserTypesArr.push(this.colorType);
        return allUserTypesArr;
    },
    setName(name) {
        this.name = name;
    },
    getName(name) {
        return this.name;
    },
    setFigureType(type) {
        this.figureType = type;
    },
    getFigureType() {
        return this.figureType;
    },
    setContrast(type) {
        this.contrastType = type;
    },
    getContrastType() {
        return this.contrastType;
    },
    setColorType(type) {
        this.colorType = type;
    },
    getColorType() {
        return this.colorType;
    }
}