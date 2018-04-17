var ReviewView = function(){
  this.reviews = [];
}

ReviewView.prototype.addQuote = function(quote) {
  this.quotes.push(quote);
  this.render(quote);
}

ReviewView.prototype.clear = function(quote) {
  this.quotes = [];
  const ul = document.querySelector('#quotes');
  ul.innerHTML = '';
}

ReviewView.prototype.render = function(review){
    const ul = document.querySelector('#reviews');
    const li = document.createElement('li');
    const text = document.createElement('p');
    text.innerText = `${review.name} - "${review.hotel}"`;
    li.appendChild(text);
    ul.appendChild(li);
}

 module.exports = QuoteView;
