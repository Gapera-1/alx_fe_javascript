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

/**
 * Step 2: Display a random quote
 * Function: showRandomQuote
 */
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  
  // Clear previous content and update
  quoteDisplay.innerHTML = `"${quote.text}" — <strong>${quote.category}</strong>`;
}

/**
 * Step 3: Add a new quote to the array and update the view
 */
function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");

  const text = textInput.value.trim();
  const category = categoryInput.value.trim();

  if (text && category) {
    // Add to quotes array
    quotes.push({ text, category });

    // Update the display immediately to show the new quote
    quoteDisplay.innerHTML = `"${text}" — <strong>${category}</strong>`;

    // Clear inputs
    textInput.value = "";
    categoryInput.value = "";
  } else {
    alert("Please enter both quote and category.");
  }
}

/**
 * Step 2 & 3: Create the Add Quote form dynamically
 * This demonstrates advanced DOM manipulation.
 */
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
  addBtn.textContent = "Add Quote";

  // Add click listener (Advanced: linking the logic to the dynamic button)
  addBtn.addEventListener("click", addQuote);

  // Append elements to the container in the DOM
  addQuoteContainer.appendChild(quoteInput);
  addQuoteContainer.appendChild(categoryInput);
  addQuoteContainer.appendChild(addBtn);
}

// Event listener for the "Show New Quote" button
newQuoteBtn.addEventListener("click", showRandomQuote);

// Initialize the application: show a quote and build the form
showRandomQuote();
createAddQuoteForm();