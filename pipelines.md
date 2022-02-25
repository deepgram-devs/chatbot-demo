# default

## main
nlp.train

## onIntent(api.chucknorris)
// compiler=javascript
const something = request.get('http://api.icndb.com/jokes/random');
if (something && something.value && something.value.joke) {
  input.answer = something.value.joke;
}
## onIntent(api.catfact)
// compiler=javascript
const something = request.get('https://catfact.ninja/fact');
if (something && something.fact) {
  input.answer = something.fact;
}
