document.getElementById("searchBtn").addEventListener("click", () => {
  const word = document.getElementById("wordInput").value.trim();
  const resultDiv = document.getElementById("result");

  if (!word) {
    resultDiv.innerHTML = "<p>Please enter a word.</p>";
    return;
  }

  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(res => res.json())
    .then(data => {
      if (data.title === "No Definitions Found") {
        resultDiv.innerHTML = "<p>No results found.</p>";
        return;
      }

      const entry = data[0];
      let html = `<h2>${entry.word}</h2>`;

      if (entry.phonetics[0]?.text) {
        html += `<h3>${entry.phonetics[0].text}</h3>`;
      }

      entry.meanings.forEach(m => {
        html += `<h4>${m.partOfSpeech}</h4>`;
        m.definitions.forEach((d, i) => {
          html += `<p><strong>${i + 1}.</strong> ${d.definition}</p>`;
        });
      });

      resultDiv.innerHTML = html;
    })
    .catch(() => {
      resultDiv.innerHTML = "<p>Error fetching data.</p>";
    });
});
