console.log('%c HI', 'color: firebrick')
document.addEventListener("DOMContentLoaded", () => {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    const breedUrl = "https://dog.ceo/api/breeds/list/all";
    
    const imageContainer = document.getElementById("dog-image-container");
    const breedList = document.getElementById("dog-breeds");
    const dropdown = document.getElementById("breed-dropdown");

    let breeds = []; // Store all breeds globally for filtering

    // Challenge 1: Fetch and display random dog images
    fetch(imgUrl)
        .then(response => response.json())
        .then(data => {
            data.message.forEach(imageUrl => {
                const img = document.createElement("img");
                img.src = imageUrl;
                img.alt = "A random dog";
                img.style.width = "200px";
                img.style.margin = "10px";
                imageContainer.appendChild(img);
            });
        })
        .catch(error => console.error("Error fetching images:", error));

    // Challenge 2: Fetch and display dog breeds
    fetch(breedUrl)
        .then(response => response.json())
        .then(data => {
            breeds = Object.keys(data.message);
            renderBreeds(breeds); // Display breeds initially
        })
        .catch(error => console.error("Error fetching breeds:", error));

    // Function to render breeds (Challenge 2 & 4)
    function renderBreeds(breedArray) {
        breedList.innerHTML = ""; // Clear previous list
        breedArray.forEach(breed => {
            const li = document.createElement("li");
            li.textContent = breed;
            li.style.cursor = "pointer"; // Indicate interactivity
            breedList.appendChild(li);

            // Challenge 3: Change font color on click
            li.addEventListener("click", () => {
                li.style.color = "blue"; // Change to your preferred color
            });
        });
    }

    // Challenge 4: Filter breeds based on dropdown selection
    dropdown.addEventListener("change", (event) => {
        const selectedLetter = event.target.value;
        const filteredBreeds = breeds.filter(breed => breed.startsWith(selectedLetter));
        renderBreeds(filteredBreeds);
    });
});
