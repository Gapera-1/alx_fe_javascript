// --- CONFIGURATION & STATE ---
const SERVER_URL = 'https://jsonplaceholder.typicode.com/posts';
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "In the middle of difficulty lies opportunity.", category: "Inspiration" },
    { text: "Health is the greatest wealth.", category: "Health" }
];

// --- CORE FUNCTIONS ---

/**
 * Saves current quotes array to Local Storage
 */
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

/**
 * populates the dropdown with unique categories from the quotes array
 */
function populateCategories() {
    const categoryFilter = document.getElementById("categoryFilter");
    const categories = [...new Set(quotes.map(q => q.category))];

    // Reset dropdown but keep "All"
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';

    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });

    // Restore last selected filter from local storage
    const lastFilter = localStorage.getItem('lastCategoryFilter');
    if (lastFilter) {
        categoryFilter.value = lastFilter;
    }
}

/**
 * Filters and displays a random quote
 */
function filterQuotes() {
    const selectedCategory = document.getElementById("categoryFilter").value;
    const quoteDisplay = document.getElementById("quoteDisplay");

    // Persist filter preference
    localStorage.setItem('lastCategoryFilter', selectedCategory);

    let filteredQuotes = quotes;
    if (selectedCategory !== "all") {
        filteredQuotes = quotes.filter(q => q.category === selectedCategory);
    }

    if (filteredQuotes.length > 0) {
        const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
        const quote = filteredQuotes[randomIndex];
        quoteDisplay.innerHTML = `"${quote.text}" <br><br><strong>— ${quote.category}</strong>`;
    } else {
        quoteDisplay.innerHTML = "No quotes available in this category.";
    }
}

/**
 * Adds a new quote and syncs to server
 */
async function addQuote() {
    const textInput = document.getElementById("newQuoteText");
    const categoryInput = document.getElementById("newQuoteCategory");

    const text = textInput.value.trim();
    const category = categoryInput.value.trim();

    if (text && category) {
        const newQuote = { text, category };
        quotes.push(newQuote);
        
        saveQuotes();
        populateCategories();
        filterQuotes();
        
        // Clear inputs
        textInput.value = "";
        categoryInput.value = "";

        // Simulated Server Post
        await postQuoteToServer(newQuote);
    } else {
        alert("Please fill in both fields.");
    }
}

/**
 * Creates the "Add Quote" form using DOM manipulation
 */
function createAddQuoteForm() {
    const container = document.getElementById("addQuoteContainer");
    
    const textInput = document.createElement("input");
    textInput.id = "newQuoteText";
    textInput.placeholder = "Enter quote text";
    textInput.style.width = "90%";

    const catInput = document.createElement("input");
    catInput.id = "newQuoteCategory";
    catInput.placeholder = "Enter category";

    const addBtn = document.createElement("button");
    addBtn.textContent = "Add Quote";
    addBtn.onclick = addQuote;

    container.appendChild(textInput);
    container.appendChild(catInput);
    container.appendChild(addBtn);
}

// --- JSON & SERVER SYNC FUNCTIONS ---

function exportToJsonFile() {
    const dataStr = JSON.stringify(quotes, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "vivi_quotes.json";
    link.click();
}

function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(e) {
        try {
            const imported = JSON.parse(e.target.result);
            quotes.push(...imported);
            saveQuotes();
            populateCategories();
            alert("Quotes imported successfully!");
        } catch (err) {
            alert("Invalid JSON file.");
        }
    };
    fileReader.readAsText(event.target.files[0]);
}

async function fetchQuotesFromServer() {
    try {
        showSyncStatus("Syncing with server...", "#ffc107");
        const response = await fetch(SERVER_URL);
        const data = await response.json();
        
        // Simulating data merge: using server titles as quotes
        const serverQuotes = data.slice(0, 3).map(post => ({
            text: post.title,
            category: "Server"
        }));

        // Conflict Resolution: Only add if text is unique
        let added = false;
        serverQuotes.forEach(sq => {
            if (!quotes.some(lq => lq.text === sq.text)) {
                quotes.push(sq);
                added = true;
            }
        });

        if (added) {
            saveQuotes();
            populateCategories();
            showSyncStatus("Data updated from server!", "#28a745");
        } else {
            showSyncStatus("Already up to date.", "#17a2b8");
        }
    } catch (err) {
        showSyncStatus("Sync failed. Check connection.", "#dc3545");
    }
}

async function postQuoteToServer(quote) {
    try {
        await fetch(SERVER_URL, {
            method: 'POST',
            body: JSON.stringify(quote),
            headers: { 'Content-type': 'application/json' }
        });
    } catch (e) { console.error("Server POST failed."); }
}

function showSyncStatus(msg, color) {
    const status = document.getElementById("syncStatus");
    status.textContent = msg;
    status.style.backgroundColor = color;
    status.style.color = "white";
    status.style.display = "block";
    setTimeout(() => { status.style.display = "none"; }, 3000);
}

// --- INITIALIZATION ---

document.getElementById("newQuote").addEventListener("click", filterQuotes);

createAddQuoteForm();
populateCategories();
filterQuotes();

// Periodically sync every 60 seconds
setInterval(fetchQuotesFromServer, 60000);
fetchQuotesFromServer(); // Initial sync