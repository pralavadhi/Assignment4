// Dynamically adds student information
document.addEventListener("DOMContentLoaded", function() {
    var studentInfo = document.getElementById("student-info");
    studentInfo.innerHTML = "<p>Student ID: 1235300</p><p>Name: Pralav Adhikari</p>";

    fetchBestSellers();
});

// Now fetch best sellers lists from New York Times Books API
function fetchBestSellers() {
    const apiKey = "vnGIrbPJH4bL7wbyABtr5R8ve7npAQaY";
    const apiUrl = "https://api.nytimes.com/svc/books/v3/lists/2024-01-01/hardcover-fiction.json?api-key=" + apiKey;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            displayBestSellers(data.results);
        })
        .catch(error => {
            console.error("There was a problem fetching the best sellers lists:", error);
        });
}

// Now function to display best sellers list on the webpage
function displayBestSellers(lists) {
    var bestSellersList = document.getElementById("best-sellers-list");
    bestSellersList.innerHTML = "";

    // Now Check if lists is an object
    if (typeof lists === 'object' && lists !== null) {
        var li = document.createElement("li");
        li.innerHTML = `
            <div class="list-name">${lists.list_name}</div>
            <div class="updated">${lists.updated}</div>
            <ul>
                ${lists.books.map(book => `
                    <li>
                        <div class="book-title">${book.title}</div>
                        <div class="author">${book.author}</div>
                        <div class="rank">Rank: ${book.rank}</div>
                    </li>
                `).join('')}
            </ul>
        `;
        bestSellersList.appendChild(li);
    } else {
        console.error("Invalid data structure for best sellers list:", lists);
    }
}

