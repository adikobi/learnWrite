// app.js

const words = [
  { word: "אבא", emoji: "👨‍🦰" },
  { word: "אמא", emoji: "👩" },
  { word: "טיפה", emoji: "💧" },
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
  { word: "ים", emoji: "🌊" },
  { word: "שמלה", emoji: "👗" },
  { word: "כיסא", emoji: "🪑" },
  { word: "מיטה", emoji: "🛏️" },
  { word: "דגל", emoji: "🏳️" },
  { word: "עין", emoji: "👁️" },
  { word: "פה", emoji: "👄" },
  { word: "יד", emoji: "🤚" },
  { word: "רגל", emoji: "🦶" },
  { word: "אף", emoji: "👃" },
  { word: "לב", emoji: "❤️" },
  { word: "שן", emoji: "🦷" },
  { word: "אוזן", emoji: "👂" },
  { word: "עוגה", emoji: "🍰" },
  { word: "גלידה", emoji: "🍦" },
  { word: "ביצה", emoji: "🥚" },
  { word: "עגבניה", emoji: "🍅" },
  { word: "מלפפון", emoji: "🥒" },
  { word: "בננה", emoji: "🍌" },
  { word: "ענבים", emoji: "🍇" },
  { word: "תות", emoji: "🍓" },
  { word: "רכבת", emoji: "🚆" },
  { word: "מטוס", emoji: "✈️" },
  { word: "אוטו", emoji: "🚗" },
  { word: "אופניים", emoji: "🚲" },
  { word: "סירה", emoji: "⛵" },
  { word: "כובע", emoji: "🎩" },
  { word: "מעיל", emoji: "🧥" },
  { word: "חולצה", emoji: "👕" },
  { word: "מכנסיים", emoji: "👖" },
  { word: "גרב", emoji: "🧦" },
  { word: "נעל", emoji: "👟" },
  { word: "עכבר", emoji: "🐭" },
  { word: "אריה", emoji: "🦁" },
  { word: "פיל", emoji: "🐘" },
  { word: "גמל", emoji: "🐫" },
  { word: "כבשה", emoji: "🐑" },
  { word: "פרה", emoji: "🐄" },
  { word: "תרנגול", emoji: "🐓" },
  { word: "תרנגולת", emoji: "🐔" },
  { word: "ברווז", emoji: "🦆" },
  { word: "סוס", emoji: "🐎" },
  { word: "חמור", emoji: "🐴" },
  { word: "שועל", emoji: "🦊" },
  { word: "דבורה", emoji: "🐝" },
  { word: "פרפר", emoji: "🦋" },
  { word: "ציפור", emoji: "🐦" },
  { word: "ינשוף", emoji: "🦉" },
  { word: "צב", emoji: "🐢" },
  { word: "נחש", emoji: "🐍" },
  { word: "צפרדע", emoji: "🐸" },
  { word: "עכביש", emoji: "🕷️" },
  { word: "שמש", emoji: "☀️" },
  { word: "גשם", emoji: "🌧️" },
  { word: "שלג", emoji: "❄️" },
  { word: "רוח", emoji: "💨" },
  { word: "קשת", emoji: "🌈" },
  { word: "כוכב", emoji: "⭐" },
  { word: "ענן", emoji: "☁️" },
  { word: "חום", emoji: "🤎" },
  { word: "כחול", emoji: "🔵" },
  { word: "אדום", emoji: "🔴" },
  { word: "צהוב", emoji: "🟡" },
  { word: "ירוק", emoji: "🟢" },
  { word: "שחור", emoji: "⚫" },
  { word: "לבן", emoji: "⚪" },
  { word: "סגול", emoji: "🟣" },
  { word: "כתום", emoji: "🟠" },
  { word: "שמח", emoji: "😃" },
  { word: "עצוב", emoji: "😢" },
  { word: "פחד", emoji: "😱" },
  { word: "אהבה", emoji: "😍" },
  { word: "חיבוק", emoji: "🤗" },
  { word: "יונה", emoji: "🕊️" },
  { word: "משפחה", emoji: "👨‍👩‍👧‍👦" }
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
let currFlag = 0;


function preloadImages(callback) {
  let loadedImages = 0;
  const imageEntries = Object.entries(letterMap);
  const totalImages = imageEntries.length;

  if (totalImages === 0) {
    callback();
    return;
  }

  imageEntries.forEach(([ltr, num]) => {
    const img = new Image();
    img.src = `./letters/${num}.png`;
    img.onload = () => {
      loadedImages++;
      letterImages[ltr] = img;
      if (loadedImages === totalImages) {
        callback();
      }
    };
    img.onerror = () => {
      // Handle error if needed, maybe count it as loaded
      loadedImages++;
      console.error(`Failed to load image for letter: ${ltr}`);
      if (loadedImages === totalImages) {
        callback();
      }
    };
  });
}

window.addEventListener('load', () => {
  const minSplashTime = 3000; // Minimum splash screen time: 3 seconds
  const maxSplashTime = 8000; // Maximum splash screen time: 8 seconds
  const startTime = Date.now();
  let splashHidden = false;

  function hideSplashScreen() {
    if (splashHidden) return;
    splashHidden = true;

    const splashScreen = document.getElementById('splash-screen');
    const gameRoot = document.getElementById('game-root');

    splashScreen.style.opacity = '0';
    // Wait for the fade-out transition to finish before hiding it
    setTimeout(() => {
      splashScreen.style.display = 'none';
      gameRoot.style.display = 'block';
      renderGame();
    }, 1000); // This should match the CSS transition duration
  }

  // Set a maximum timeout
  setTimeout(hideSplashScreen, maxSplashTime);

  preloadImages(() => {
    const elapsedTime = Date.now() - startTime;
    const remainingTime = Math.max(0, minSplashTime - elapsedTime);

    setTimeout(hideSplashScreen, remainingTime);
  });
});


function speakWord(word) {
  console.log("inside speak word");
  window.speechSynthesis.cancel();

  const isAndroid = /Android/i.test(navigator.userAgent);

  const utter = new window.SpeechSynthesisUtterance(word);
  utter.lang = "he-IL";
  // בחר קול עברי אם קיים
  const voices = window.speechSynthesis.getVoices();
  const hebrewVoice = voices.find(v => v.lang === "he-IL");
  if (hebrewVoice) utter.voice = hebrewVoice;
  window.speechSynthesis.speak(utter);
  console.log("done speak word");

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

  emojiBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent
    speakWord(wordObj.word);
  });



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
    // 1 מתוך 4 תהיה האות הנכונה, השאר רנדומלי
    let ltr;

    if (currFlag % 4 === 0) {
      ltr = correctLetter;
    } else {
      const allLetters = Object.keys(letterMap);
      do {
        ltr = allLetters[Math.floor(Math.random() * allLetters.length)];
      } while (ltr === correctLetter);
    }

    currFlag +=1;
    return {
      letter: ltr,
      x: Math.random() * 300 + 20,
      y: -60,
      speed: Math.random() * 0.5 + 0.5, // Slower fall
      rotation: Math.random() * 180 - 90, // Start with a random rotation
      rotationSpeed: (Math.random() - 0.5) * 2, // Rotate left or right
      horizontalWave: Math.random() * Math.PI * 2,
      horizontalAmplitude: Math.random() * 20 + 10
    };
  }

  function animateFallingLetters(correctLetter) {
    const fallArea = document.querySelector('.letter-fall-area');
    if (!fallArea) return;

    fallArea.innerHTML = '';

    fallingLetters.forEach((obj, idx) => {
      // Update position and rotation
      obj.y += obj.speed;
      obj.rotation += obj.rotationSpeed;
      obj.horizontalWave += 0.03; // Wobble speed
      const horizontalOffset = Math.sin(obj.horizontalWave) * obj.horizontalAmplitude;

      const ltrDiv = document.createElement('img');
      ltrDiv.src = letterImages[obj.letter].src;
      ltrDiv.className = 'letter-falling';
      ltrDiv.style.left = `${obj.x + horizontalOffset}px`;
      ltrDiv.style.top = `${obj.y}px`;
      ltrDiv.style.transform = `rotate(${obj.rotation}deg)`;
      ltrDiv.alt = obj.letter;

      addPointerDown(ltrDiv, (e) => {
          userAnswer[0] = obj.letter;
          stopFallingAnimation();
          renderGame();
      });
      fallArea.appendChild(ltrDiv);
    });

    // Remove letters that are off-screen and add new ones
    for (let i = fallingLetters.length - 1; i >= 0; i--) {
      if (fallingLetters[i].y > 400) { // Area height
        fallingLetters.splice(i, 1);
        fallingLetters.push(createFallingLetter(correctLetter));
      }
    }

    // Continue animation if no letter has been selected
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
  const effect = document.getElementById('effect');
  if (type === 'success') {
    // Use confetti for success
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.6 }
    });
    effect.innerHTML = "כל הכבוד!";
    effect.className = "show success";
    setTimeout(() => {
      effect.className = "";
      effect.innerHTML = "";
    }, 1500);
  } else if (type === 'fail') {
    effect.innerHTML = "נסו שוב... 😢";
    effect.className = "show fail";
    document.getElementById('game-root').classList.add('shake');
    setTimeout(() => {
      effect.className = "";
      effect.innerHTML = "";
      document.getElementById('game-root').classList.remove('shake');
    }, 1200);
  }
}