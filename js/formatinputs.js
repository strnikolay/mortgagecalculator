import { priceFormatter, priceFormatterDecimals } from "./formatters.js";

const inputCost = document.querySelector('#input-cost');
const inputDownPayment = document.querySelector('#input-downpayment');
const inputTerm = document.querySelector('#input-term');
const form = document.querySelector('#form');
const totalCost = document.querySelector('#total-cost');
const totalMonthPayment = document.querySelector('#total-month-payment');


const cleavePriceSetting = {
    numeral: true,
    numeralThousandsGroupStyle: 'thousand',
    delimiter: ' ',
}

const cleaveCost = new Cleave (inputCost, cleavePriceSetting);
const cleaveDownPayment = new Cleave (inputDownPayment, cleavePriceSetting);
const cleaveTerm = new Cleave(inputTerm, cleavePriceSetting);

calcMortage();

form.addEventListener('input', function () {
    
    calcMortage();
})

function calcMortage() {
    const totalAmount = +cleaveCost.getRawValue() - cleaveDownPayment.getRawValue();
    
    totalCost.innerText = priceFormatter.format(totalAmount);

    const creditRate = document.querySelector('input[name="program"]:checked').value;
 
    const monthRate = (creditRate*100)/12;

    const years = +cleaveTerm.getRawValue();
    const months = years * 12;

    const monthPayment = (totalAmount * monthRate)/ (1-(1+monthRate) * (1-months));
 
    totalMonthPayment.innerText = priceFormatterDecimals.format(monthPayment);
    
}

var sliderCost = document.getElementById('slider-cost');

noUiSlider.create(sliderCost, {
    start: 400000,
    connect: 'lower',
    tooltips: true,
    step: 100000,
    range: {
        min:400000,
        max:100000000,
    },
});

var downpayment = document.getElementById('slider-downpayment');

noUiSlider.create(downpayment, {
    start: 15,
    connect: 'lower',
    tooltips: true,
    step: 1,
    range: {
        min:15,
        max:90,
    },
});

var term = document.getElementById('slider-term');

noUiSlider.create(term, {
    start: 12,
    connect: 'lower',
    tooltips: true,
    step: 1,
    range: {
        min:12,
        max:360,
    },
});