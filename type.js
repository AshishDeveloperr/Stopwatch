function toggleDarkLight() {
  var body = document.getElementById("body");
  var currentClass = body.className;
  body.className = currentClass == "dark-mode" ? "light-mode" : "dark-mode";
}
const words = [" Check your nearest vaccination centers and slots availability ...",  " Check your nearest vaccination centers and slots availability ..." , " Check your nearest vaccination centers and slots availability ...",  " Check your nearest vaccination centers and slots availability ...", " Check your nearest vaccination centers and slots availability ...", " Check your nearest vaccination centers and slots availability ...", ],

  colors = ["blue", "green", "yellow", "red", "purple", "pink", "rainbow"],
  text = document.querySelector(".text");

// Generator (iterate from 0-3)
function* generator() {
  var index = 0;
  while (true) {
    yield index++;

    if (index > 6) {
      index = 0;
    }
  }
}

// Printing effect
function printChar(word) {
  let i = 0;
  text.innerHTML = "";
  text.classList.add(colors[words.indexOf(word)]);
  let id = setInterval(() => {
    if (i >= word.length) {
      deleteChar();
      clearInterval(id);
    } else {
      text.innerHTML += word[i];
      i++;
    }
  },100);
}

// Deleting effect
function deleteChar() {
  let word = text.innerHTML;
  let i = word.length - 1;
  let id = setInterval(() => {
    if (i >= 0) {
      text.innerHTML = text.innerHTML.substring(0, text.innerHTML.length - 1);
      i--;
    } else {
      text.classList.remove(colors[words.indexOf(word)]);
      printChar(words[gen.next().value]);
      clearInterval(id);
    }
  }, 70);
}

// Initializing generator
let gen = generator();

printChar(words[gen.next().value]);
