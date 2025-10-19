// Step 1: Define an array of quote objects
let quotes = [
  { text: "The greatest wealth is health.", category: "Health" },
  { text: "Learning never exhausts the mind.", category: "Education" },
  { text: "Success is not final, failure is not fatal.", category: "Motivation" },
  { text: "In the middle of difficulty lies opportunity.", category: "Inspiration" }
];

// Step 2: Function to display a random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  // Find or create the display element
  let quoteDisplay = document.getElementById("quoteDisplay");
  if (!quoteDisplay) {
    quoteDisplay = document.createElement("div");
    quoteDisplay.id = "quoteDisplay";
    quoteDisplay.style.marginTop = "20px";
    quoteDisplay.style.padding = "10px";
    quoteDisplay.style.border = "1px solid #ccc";
    quoteDisplay.style.borderRadius = "8px";
    quoteDisplay.style.backgroundColor = "#f8f8f8";
    document.body.appendChild(quoteDisplay);
  }

  // Update the content
  quoteDisplay.innerHTML = `
    <p><strong>Quote:</strong> "${quote.text}"</p>
    <p><em>Category:</em> ${quote.category}</p>
  `;
}

// Step 3: Function to add a new quote
function addQuote() {
  const newQuoteText = document.getElementById("newQuoteText").value.trim();
  const newQuoteCategory = document.getElementById("newQuoteCategory").value.trim();

  if (newQuoteText === "" || newQuoteCategory === "") {
    alert("Please enter both quote text and category!");
    return;
  }

  // Add new quote object to the array
  quotes.push({ text: newQuoteText, category: newQuoteCategory });

  // Clear input fields
  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";

  alert("New quote added successfully!");
  showRandomQuote(); // show the newly added or random quote
}

// Step 4: Create button dynamically to show random quote
function createAddQuoteForm() {
  let button = document.createElement("button");
  button.textContent = "Show Random Quote";
  button.onclick = showRandomQuote;
  button.style.marginTop = "10px";
  document.body.appendChild(button);
}

// Initialize
document.addEventListener("DOMContentLoaded", createAddQuoteForm);
