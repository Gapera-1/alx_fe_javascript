// Array of quote objects
let quotes = [
  { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
  { text: "In the middle of difficulty lies opportunity.", category: "Inspiration" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" }
];

// DOM references
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");
const addQuoteContainer = document.getElementById("addQuoteContainer");

// Function to display a random quote
function displayRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  quoteDisplay.innerHTML = `"${quote.text}" — <strong>${quote.category}</strong>`;
}

// Function to add a new quote
function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");

  const text = textInput.value.trim();
  const category = categoryInput.value.trim();

  if (text && category) {
    // Add to quotes array
    quotes.push({ text, category });

    // Update the DOM immediately
    quoteDisplay.innerHTML = `"${text}" — <strong>${category}</strong>`;

    // Clear inputs
    textInput.value = "";
    categoryInput.value = "";
  } else {
    alert("Please enter both quote and category.");
  }
}

// Function to create Add Quote form dynamically
function createAddQuoteForm() {
  // Create input for quote text
  const quoteInput = document.createElement("input");
  quoteInput.type = "text";
  quoteInput.id = "newQuoteText";
  quoteInput.placeholder = "Enter a new quote";

  // Create input for category
  const categoryInput = document.createElement("input");
  categoryInput.type = "text";
  categoryInput.id = "newQuoteCategory";
  categoryInput.placeholder = "Enter quote category";

  // Create Add Quote button
  const addBtn = document.createElement("button");
  addBtn.type = "button";
  addBtn.innerHTML = "Add Quote";

  // Add click listener
  addBtn.addEventListener("click", addQuote);

  // Append elements to the container
  addQuoteContainer.appendChild(quoteInput);
  addQuoteContainer.appendChild(categoryInput);
  addQuoteContainer.appendChild(addBtn);
}

// Event listener for Show New Quote button
newQuoteBtn.addEventListener("click", displayRandomQuote);

// Initialize the form
createAddQuoteForm();
