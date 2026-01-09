
// Initial Data: Load from Local Storage OR use defaults if empty
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
  { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
  { text: "In the middle of difficulty lies opportunity.", category: "Inspiration" }
];

const quoteDisplay = document.getElementById("quoteDisplay");
const addQuoteContainer = document.getElementById("addQuoteContainer");

/**
 * Step 1: PERSISTENCE
 * Save the current quotes array to Local Storage
 */
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

function showRandomQuote() {
  if (quotes.length === 0) {
    quoteDisplay.innerHTML = "No quotes available. Add some!";
    return;
  }
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  quoteDisplay.innerHTML = `"${quote.text}" — <strong>${quote.category}</strong>`;
  
  // Optional: Session Storage to remember the last viewed quote
  sessionStorage.setItem('lastQuote', JSON.stringify(quote));
}

/**
 * Step 2: EXPORT (JSON)
 */
function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2); // Indented for readability
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement("a");
  link.href = url;
  link.download = "quotes.json";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url); // Clean up memory
}

/**
 * Step 2: IMPORT (JSON)
 */
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
    try {
      const importedQuotes = JSON.parse(event.target.result);
      // Logic: Merge new quotes into existing ones
      quotes.push(...importedQuotes);
      saveQuotes();
      showRandomQuote();
      alert('Quotes imported and saved to Local Storage!');
    } catch (e) {
      alert('Error: Invalid JSON file.');
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

// Logic to add a new quote
function addQuote() {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();

  if (text && category) {
    quotes.push({ text, category });
    saveQuotes(); // Persistence!
    showRandomQuote();
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
  }
}

// UI Initialization
function createAddQuoteForm() {
  addQuoteContainer.innerHTML = `
    <div style="margin-top:20px;">
        <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
        <input id="newQuoteCategory" type="text" placeholder="Enter category" />
        <button onclick="addQuote()">Add Quote</button>
    </div>
  `;
}

document.getElementById("newQuote").addEventListener("click", showRandomQuote);

// Start
createAddQuoteForm();
showRandomQuote();