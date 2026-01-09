// Array of quotes
let quotes = [
  { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
  { text: "In the middle of difficulty lies opportunity.", category: "Inspiration" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" }
];

// Reference DOM elements
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");
const addQuoteContainer = document.getElementById("addQuoteContainer");

// Function to show a random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  quoteDisplay.textContent = `"${quote.text}" — ${quote.category}`;
}

// Function to create Add Quote Form dynamically
function createAddQuoteForm() {
  // Create form element
  const form = document.createElement("form");

  // Quote text input
  const quoteInput = document.createElement("input");
  quoteInput.type = "text";
  quoteInput.id = "newQuoteText";
  quoteInput.placeholder = "Enter a new quote";
  quoteInput.required = true;

  // Quote category input
  const categoryInput = document.createElement("input");
  categoryInput.type = "text";
  categoryInput.id = "newQuoteCategory";
  categoryInput.placeholder = "Enter quote category";
  categoryInput.required = true;

  // Add Quote button
  const addBtn = document.createElement("button");
  addBtn.type = "submit";
  addBtn.textContent = "Add Quote";

  // Append inputs and button to form
  form.appendChild(quoteInput);
  form.appendChild(categoryInput);
  form.appendChild(addBtn);

  // Handle form submission
  form.addEventListener("submit", function(event) {
    event.preventDefault(); // prevent page reload
    addQuote(quoteInput.value, categoryInput.value);
    form.reset(); // clear inputs
  });

  // Append form to container
  addQuoteContainer.appendChild(form);
}

// Function to add a new quote
function addQuote(text, category) {
  if (text && category) {
    quotes.push({ text, category });
    alert("Quote added successfully!");
  }
}

// Event listener for Show New Quote button
newQuoteBtn.addEventListener("click", showRandomQuote);

// Initialize form
createAddQuoteForm();
