const QuoteView = require('./views/reviewView');
const Request = require('./services/request.js');

const quoteView = new ReviewView();
const request = new Request('http://localhost:3000/api/reviews');

const appStart = function(){

}

document.addEventListener('DOMContentLoaded', appStart);
