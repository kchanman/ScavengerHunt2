document.addEventListener('DOMContentLoaded', () => {
  let solvedKeywords = [];
  let finalMessage = ["史","偉","庭",",","你","願","意","嫁","給","我","嗎","？"];
  let keywords = ["jaceisgoodatbowling","ilovethetto","polaris","towed","hotpot","rollerblade","haochi","artfulparks","holinesstotheLord","freebie","freebie2","thequestion"];
  let keywordToLetterIndex = [0,1,2,4,5,6,7,8,9,3,11,10]; // maps each keyword to a letter
  let blanks = finalMessage.map(_ => "_");
  const masterKeyword = "supermasterkey"; // fills everything

  showScreen('welcome-screen');
  updateBlanks();

  document.getElementById('start-btn').addEventListener('click', () => {
    showScreen('puzzle-screen');
    updateBlanks();
  });

  document.getElementById('restart-btn').addEventListener('click', () => {
    solvedKeywords = [];
    blanks = finalMessage.map(_ => "_");
    updateBlanks();
    document.getElementById('feedback').textContent = '';
    document.getElementById('answer').value = '';
    showScreen('welcome-screen');
  });

  document.getElementById('check-btn').addEventListener('click', () => {
    const input = document.getElementById('answer').value.trim().toLowerCase();
    const feedback = document.getElementById('feedback');

    if(input === "") {
      feedback.textContent = 'Please enter a keyword.';
      return;
    }

    if(input === masterKeyword.toLowerCase()) {
      blanks = [...finalMessage];
      updateBlanks();
      showScreen('winning-screen');
      return;
    }

    let keywordIndex = keywords.findIndex(k => k.toLowerCase() === input);

    if(keywordIndex === -1) {
      feedback.textContent = 'Not quite! Try again.';
    } else if(solvedKeywords.includes(keywordIndex)) {
      feedback.textContent = 'You already solved this one!';
    } else {
      const letterPos = keywordToLetterIndex[keywordIndex];
      blanks[letterPos] = finalMessage[letterPos];
      solvedKeywords.push(keywordIndex);
      updateBlanks();

      if(solvedKeywords.length >= keywords.length) {
        showScreen('winning-screen');
      } else {
        feedback.textContent = 'Correct! Keep going...';
      }
    }

    document.getElementById('answer').value = '';
  });

  function updateBlanks() {
    document.getElementById('blanks').textContent = blanks.join(' ');
  }

  function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
  }
});
