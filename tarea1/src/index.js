/////////////
// imports //
/////////////
const fs = require("fs");
const _ = require('lodash');


//////////////////
// SubFunctions //
//////////////////
// General
const compose = (a, b) => c => a(b(c));
const pipe = functions => data => {
  return functions.reduce(
    (value, func) => func(value),
    data
  );
}

// For Text Input
const joinText = paragraphs => paragraphs.map(p => p.join("")).join("");
const joinPhrases = paragraphs => paragraphs.map(p => p.join("."));
const splitParagraphs = text => text.split("\n");
const splitPhrases = paragraphs => paragraphs.map(p => p.split("."));

const insertDot = (frase, limit, curr) => limit === curr
    ? frase + ".\n"
    : frase + ".";

const getParagraphs = function(text) {
  const textSplitter = compose(splitPhrases, splitParagraphs);
  const textSplitted = textSplitter(text);

  const popEmpty = splitted => _.dropRight(splitted, 1).map(p => _.dropRight(p, 1));
  const addDots = splitted => splitted.map(p => p.map((frase, i) => insertDot(frase, p.length - 1, i)))
  const cleanData = compose(addDots, popEmpty);

  return cleanData(textSplitted);
};

// a & d
const addSpace = (text, n, index) => index !== 0
    ? " ".repeat(n) + text
    : text;
const addSpaces = (paragraph, n) => paragraph.map((frases, i) => addSpace(frases, n, i));

// c
const cutParagraphs = n => paragraphs => paragraphs.map(p => cutWidth(n)(p));
const cutWidth = n => paragraph => paragraph.length > n
    ? sliceString(n)(paragraph)
    : paragraph;
const sliceString = n => paragraph => paragraph[n] !== ' '
    ? sliceString(n - 1)(paragraph)
    : paragraph.slice(0, n) + '\n';


///////////////
// Functions //
///////////////
// Cada frase debe comenzar con n espacios en blanco (después de un punto seguido)
const a = n => paragraphs => paragraphs.map(p => addSpaces(p, n));

// Cada párrafo debe estar separado por n líneas (después de un punto aparte)
const b = n => paragraphs => paragraphs.map(p => [...p.slice(0, -1), p.slice(-1) + "\n".repeat(n)]);

// El ancho del texto debe ser a lo más n (sin cortar palabras)
const c = n => pipe([joinPhrases, cutParagraphs(n), splitPhrases]);

// Cada párrafo debe tener n espacios de sangría
const d = n => paragraphs => paragraphs.map(p => [addSpace(p[0], n, 1), ...p.slice(1)]);

// se ignoran los párrafos que tienen menos de n frases
const e = n => paragraphs => paragraphs.filter(p => !(p.length < n));

// se ignoran los párrafos que tienen más de n frases
const f = n => paragraphs => paragraphs.filter(p => !(p.length > n));

// cada frase debe aparecer en párrafo aparte
const g = paragraphs => _.flatten(paragraphs)
                          .map(p => p.match(/\n/g) ? [p] : [p + "\n"]);

// solo las primeras n frases de cada párrafo
const h = n => paragraphs => paragraphs.map(p => n < p.length
    ? [...p.slice(0, n - 1), p[n - 1] + p[p.length - 1].match(/\n/g).join("")]
    : p.slice(0, n));


//////////
// main //
//////////
fs.readFile('text.txt', (err, data) => {
  const text = data.toString();
  const paragraphs = getParagraphs(text);

  console.log(b(3)(paragraphs));
  const operations = [h(10)];
  console.log(pipe([...operations, joinText])(paragraphs));
});
