// app.js

const words = [
  { word: "אבא", emoji: "👨‍🦰" },
  { word: "אמא", emoji: "👩" },
  { word: "מים", emoji: "💧" },
  { word: "פרח", emoji: "🌸" },
  { word: "חתול", emoji: "🐱" },
  { word: "כלב", emoji: "🐶" },
  { word: "ספר", emoji: "📖" },
  { word: "דג", emoji: "🐟" },
  { word: "עץ", emoji: "🌳" },
  { word: "שמש", emoji: "☀️" },
  { word: "ירח", emoji: "🌙" },
  { word: "כדור", emoji: "⚽" },
  { word: "לחם", emoji: "🍞" },
  { word: "דבש", emoji: "🍯" },
  { word: "אור", emoji: "💡" },
  { word: "חלב", emoji: "🥛" },
  { word: "דוב", emoji: "🐻" },
  { word: "תפוח", emoji: "🍎" },
  { word: "גזר", emoji: "🥕" },
  { word: "ים", emoji: "🌊" }
];

const letterMap = {
  "א": 1, "ב": 2, "ג": 3, "ד": 4, "ה": 5, "ו": 6, "ז": 7, "ח": 8, "ט": 9, "י": 10,
  "כ": 11, "ל": 12, "מ": 13, "נ": 14, "ס": 15, "ע": 16, "פ": 17, "צ": 18, "ק": 19,
  "ר": 20, "ש": 21, "ת": 22, "ך": 23, "ם": 24, "ן": 25, "ץ": 26, "ף": 27
};

let currentWordIndex = 0;
let userAnswer = [];
let fallingLetters = [];
let animationFrameId = null;
const letterImages = {};

Object.entries(letterMap).forEach(([ltr, num]) => {
    const img = new Image();
    img.src = `./letters/${num}.png`;
    letterImages[ltr] = img;
  });


function speakWord(word) {
  window.speechSynthesis.cancel();
  const utter = new window.SpeechSynthesisUtterance(word);
  utter.lang = "he-IL";
  // בחר קול עברי אם קיים
  const voices = window.speechSynthesis.getVoices();
  const hebrewVoice = voices.find(v => v.lang === "he-IL");
  if (hebrewVoice) utter.voice = hebrewVoice;
  window.speechSynthesis.speak(utter);
}

function renderGame() {
  const root = document.getElementById('game-root');
  root.innerHTML = '';
  const wordObj = words[currentWordIndex];

    // אם userAnswer לא באורך הנכון, אתחל אותו
  if (!userAnswer || userAnswer.length !== wordObj.word.length) {
        userAnswer = Array(wordObj.word.length).fill("");
    }

  // אימוג'י של המילה
  const emojiBtn = document.createElement('div');
  emojiBtn.className = 'word-image';
  emojiBtn.style.fontSize = '5em';
  emojiBtn.style.cursor = 'pointer';
  emojiBtn.textContent = wordObj.emoji;
  emojiBtn.title = "הקש להקראה";
  addPointerDown(emojiBtn, () => speakWord(wordObj.word));
  root.appendChild(emojiBtn);

  // שומרי מקום לאותיות
  const slots = document.createElement('div');
  slots.className = 'letter-slots';
  for (let i = 0; i < wordObj.word.length; i++) {
    const slot = document.createElement('div');
    slot.className = 'letter-slot';
    slot.textContent = userAnswer[i] || '';
    slot.onclick = () => {
      if (userAnswer[i]) {
        userAnswer[i] = '';
        renderGame();
      }
    };
    slots.appendChild(slot);
  }
  root.appendChild(slots);
  console.log("finish init");
  // בחירת אותיות
  const nextEmpty = userAnswer.findIndex(l => !l);
  console.log("nextEmpty", nextEmpty);

  if (nextEmpty === 0) {
    console.log("start falling letters");

    // אות ראשונה - אותיות "נופלות"
    const fallArea = document.createElement('div');
    fallArea.className = 'letter-fall-area';
    // בחר 4 אותיות רנדומליות + האות הנכונה
    // const correctLetter = wordObj.word[0];
    // const letters = [correctLetter];
    // while (letters.length < 4) {
    //   const allLetters = Object.keys(letterMap);
    //   const rand = allLetters[Math.floor(Math.random() * allLetters.length)];
    //   if (!letters.includes(rand)) letters.push(rand);
    // }
    // // ערבב
    // letters.sort(() => Math.random() - 0.5);
    // // "הנפלה" (פשוט מיקום רנדומלי)
    // letters.forEach((ltr, idx) => {
    //   const ltrDiv = document.createElement('img');
    //   ltrDiv.src = `./letters/${letterMap[ltr]}.png`;
    //   console.log(ltrDiv.src);
    //   ltrDiv.className = 'letter-falling';
    //   ltrDiv.style.left = `${20 + idx * 80}px`;
    //   ltrDiv.style.top = `${20 + Math.random() * 80}px`;
    //   ltrDiv.alt = ltr;
    //   ltrDiv.onclick = () => {
    //     userAnswer[0] = ltr;
    //     renderGame();
    //   };
    //   fallArea.appendChild(ltrDiv);
    // });
    root.appendChild(fallArea);
    startFallingLetters(wordObj.word[0]);

  } else if (nextEmpty !== -1) {
    stopFallingAnimation();

    // שאר האותיות - שלוש בחירות
    const choicesRow = document.createElement('div');
    choicesRow.className = 'choices-row';
    const correctLetter = wordObj.word[nextEmpty];
    const letters = [correctLetter];
    while (letters.length < 3) {
      const allLetters = Object.keys(letterMap);
      const rand = allLetters[Math.floor(Math.random() * allLetters.length)];
      if (!letters.includes(rand)) letters.push(rand);
    }
    letters.sort(() => Math.random() - 0.5);
    letters.forEach(ltr => {
      const ltrDiv = document.createElement('img');
      ltrDiv.src = letterImages[ltr].src; // במקום לטעון מחדש
    //   ltrDiv.src = `./letters/${letterMap[ltr]}.png`;
      ltrDiv.className = 'choice-letter';
      ltrDiv.alt = ltr;
      ltrDiv.onclick = () => {
        userAnswer[nextEmpty] = ltr;
        renderGame();
      };
      choicesRow.appendChild(ltrDiv);
    });
    root.appendChild(choicesRow);
  }

  // כפתור סיום
  if (userAnswer.length === wordObj.word.length && userAnswer.every(l => l)) {
    const finishBtn = document.createElement('button');
    finishBtn.className = 'finish-btn';
    finishBtn.textContent = 'סיימתי!';
    finishBtn.onclick = () => {
      if (userAnswer.join('') === wordObj.word) {
        showEffect('success');
        setTimeout(() => {
          // מילה רנדומלית חדשה
          let nextIndex;
          do {
            nextIndex = Math.floor(Math.random() * words.length);
          } while (nextIndex === currentWordIndex && words.length > 1);
          currentWordIndex = nextIndex;
          userAnswer = Array(words[currentWordIndex].word.length).fill("");
          renderGame();
        }, 1500);
      } else {
        showEffect('fail');
        setTimeout(() => {
          userAnswer = Array(wordObj.word.length).fill("");
          renderGame();
        }, 1200);
      }
    };
    root.appendChild(finishBtn);
  }



  function startFallingLetters(correctLetter) {
    fallingLetters = [];
    // נתחיל עם 2-3 אותיות בו זמנית
    for (let i = 0; i < 3; i++) {
      fallingLetters.push(createFallingLetter(correctLetter));
    }
    animateFallingLetters(correctLetter);
  }
  
  function createFallingLetter(correctLetter) {
    // 1 מתוך 3 תהיה האות הנכונה, השאר רנדומלי
    let ltr;
    if (fallingLetters.length === 0) {
      ltr = correctLetter;
    } else {
      const allLetters = Object.keys(letterMap);
      do {
        ltr = allLetters[Math.floor(Math.random() * allLetters.length)];
      } while (ltr === correctLetter);
    }
    return {
      letter: ltr,
      x: Math.random() * 300 + 20, // מיקום אופקי רנדומלי
      y: -60, // מתחיל מעל המסך
      speed: Math.random()  + 0.5 // מהירות רנדומלית
    };
  }
  
  function animateFallingLetters(correctLetter) {
    const fallArea = document.querySelector('.letter-fall-area');
    if (!fallArea) return;
  
    // נקה את האזור
    fallArea.innerHTML = '';
  
    // עדכן מיקום כל אות
    fallingLetters.forEach((obj, idx) => {
      obj.y += obj.speed;
      const ltrDiv = document.createElement('img');
       ltrDiv.src = letterImages[obj.letter].src; // במקום לטעון מחדש

    //   ltrDiv.src = `./letters/${letterMap[obj.letter]}.png`;
      ltrDiv.className = 'letter-falling';
      ltrDiv.style.left = `${obj.x}px`;
      ltrDiv.style.top = `${obj.y}px`;
      ltrDiv.alt = obj.letter;
      addPointerDown(ltrDiv, (e) => {
          userAnswer[0] = obj.letter;
          stopFallingAnimation();
          renderGame();
        
      });
      fallArea.appendChild(ltrDiv);
    });
  
    // הסר אותיות שיצאו מהמסך, והוסף חדשות
    for (let i = fallingLetters.length - 1; i >= 0; i--) {
      if (fallingLetters[i].y > 400) { // גובה האזור
        fallingLetters.splice(i, 1);
        fallingLetters.push(createFallingLetter(correctLetter));
      }
    }
  
    // המשך אנימציה אם לא נבחרה אות
    if (!userAnswer[0]) {
      animationFrameId = requestAnimationFrame(() => animateFallingLetters(correctLetter));
    }
  }
  
  function stopFallingAnimation() {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
  }

}

function addPointerDown(element, handler) {
  element.addEventListener('pointerdown', handler);
}

function showEffect(type) {
    console.log("show effect");
    
  const effect = document.getElementById('effect');
  if (type === 'success') {
    console.log("sucess");
    effect.innerHTML = "🎉🥳🎊";
    effect.className = "show";
    setTimeout(() => { effect.className = ""; effect.innerHTML = ""; }, 1500);
  } else if (type === 'fail') {
    effect.innerHTML = "😢";
    effect.className = "show";
    document.getElementById('game-root').classList.add('shake');
    setTimeout(() => {
      effect.className = "";
      effect.innerHTML = "";
      document.getElementById('game-root').classList.remove('shake');
    }, 1200);
  }
}

renderGame();