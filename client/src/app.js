const QuoteView = require('./views/quoteView');
const Request = require('./services/request.js');

const quoteView = new QuoteView();
const request = new Request('http://localhost:3000/api/reviews');

const appStart = function(){

}

document.addEventListener('DOMContentLoaded', appStart);
