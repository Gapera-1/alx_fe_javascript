let quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "In the middle of difficulty lies opportunity.", category: "Inspiration" },
    { text: "Health is the greatest gift.", category: "Health" }
];

/**
 * Step 2: Extract unique categories and populate the <select> menu
 */
function populateCategories() {
    const categoryFilter = document.getElementById("categoryFilter");
    
    // Extract unique categories using Set
    const categories = [...new Set(quotes.map(q => q.category))];

    // Preserve the "All Categories" option and reset the rest
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';

    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });

    // Step 2 (Persistence): Restore last selected filter from local storage
    const lastFilter = localStorage.getItem('lastCategoryFilter');
    if (lastFilter) {
        categoryFilter.value = lastFilter;
    }
}

/**
 * Step 2: Show quotes based on filter
 */
function filterQuotes() {
    const selectedCategory = document.getElementById("categoryFilter").value;
    const quoteDisplay = document.getElementById("quoteDisplay");

    // Save preference to local storage
    localStorage.setItem('lastCategoryFilter', selectedCategory);

    // Filter logic
    let filteredQuotes = quotes;
    if (selectedCategory !== "all") {
        filteredQuotes = quotes.filter(q => q.category === selectedCategory);
    }

    // Display a random quote from the filtered list
    if (filteredQuotes.length > 0) {
        const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
        const quote = filteredQuotes[randomIndex];
        quoteDisplay.innerHTML = `"${quote.text}" — <strong>${quote.category}</strong>`;
    } else {
        quoteDisplay.innerHTML = "No quotes found in this category.";
    }
}

/**
 * Step 3: Enhanced Add Quote (Updates categories in real-time)
 */
function addQuote() {
    const textInput = document.getElementById("newQuoteText");
    const categoryInput = document.getElementById("newQuoteCategory");

    if (textInput.value && categoryInput.value) {
        quotes.push({ text: textInput.value, category: categoryInput.value });
        
        // Save to Web Storage
        localStorage.setItem('quotes', JSON.stringify(quotes));

        // Update the dropdown so the new category appears immediately
        populateCategories();

        alert("Quote added successfully!");
        textInput.value = "";
        categoryInput.value = "";
    }
}

function createAddQuoteForm() {
    const container = document.getElementById("addQuoteContainer");
    container.innerHTML = `
        <hr>
        <h3>Add a New Quote</h3>
        <input id="newQuoteText" type="text" placeholder="Enter quote text" style="width: 100%"><br>
        <input id="newQuoteCategory" type="text" placeholder="Enter category"><br>
        <button onclick="addQuote()">Add Quote</button>
    `;
}

// Event Listeners & Init
document.getElementById("newQuote").addEventListener("click", filterQuotes);

// Start the app
createAddQuoteForm();
populateCategories(); // Fill the dropdown
filterQuotes();       // Display initial quote (honoring last filter)