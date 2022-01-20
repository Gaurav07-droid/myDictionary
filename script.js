const parentEl = document.querySelector(".container");
const btnSearch = document.querySelector(".search-btn");
const input = document.querySelector(".input-search");
const message = document.querySelector(".message");
const form = document.querySelector(".myform");
const greetingMssg = document.querySelector(".greeting");

parentEl.style.opacity = 0;
greetingMssg.style.opacity = 0;

const getdictionary = async function (word) {
  try {
    // fetching api
    const res = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    if (!res.ok) alert(`sorry!could not found that word.Please try again `);

    //getting data
    const dataOld = await res.json();
    const data = dataOld[0];
    console.log(data);

    //markup
    genrateMarkup(data);
    greetingMssg.style.opacity = 0;
  } catch (err) {
    console.error(err);
  }
};

const genrateMarkup = function (data) {
  let markup = `
  <b><u>Word searched :- ${data.word}</u></b>
<br>
<div>
<ol>
<b><u>Origin</u></b> :- ${data.origin}<br>
<br><b><u>Phonetic</u></b> :- ${data.phonetic}<br>
<b><br><u>Part Of Speech</u></b> :- ${data.meanings[0].partOfSpeech}<br>
<b><br><u>Meaning</u></b> :- ${data.meanings[0].definitions[0].definition}<br>
<b><br><u>Sounding</u> :- <audio controls>
  <source src="${data.phonetics[0].audio}" type="audio/ogg">
</audio><br>  
</ol> 
</div>
 `;
  parentEl.insertAdjacentHTML("afterbegin", markup);
};

form.addEventListener("submit", function (e) {
  e.preventDefault();

  //checking condition
  if (!input.value) return;

  //changing opacity
  opacManager();

  //calling function
  getdictionary(`${input.value}`);

  //clearing fields
  parentEl.innerHTML = "";
  input.value = "";
});

const opacManager = function () {
  message.style.opacity = 0;
  parentEl.style.opacity = 100;
  greetingMssg.style.opacity = 100;
};
