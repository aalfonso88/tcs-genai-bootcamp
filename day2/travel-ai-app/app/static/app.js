const form = document.getElementById("travel-form");
const results = document.getElementById("results");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const firstCity = document.getElementById("first-city").value;
    const secondCity = document.getElementById("second-city").value;
    const purpose = document.getElementById("purpose").value;

    const requestBody = {
        first_city: firstCity,
        second_city: secondCity,
        purpose: purpose
    };

    const formControls = form.querySelectorAll("input, select, button");

    formControls.forEach((control) => {
        control.disabled = true;
    });

    results.innerHTML = `
        <div class="loading" aria-label="Cargando recomendaciones">
            <span class="loading-dot"></span>
            <span class="loading-dot"></span>
            <span class="loading-dot"></span>
        </div>
    `;

    try {
        const response = await fetch("/api/recommendations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error("No fue posible obtener las recomendaciones.");
        }

        const data = await response.json();

        if (data.places.length === 0) {
            results.innerHTML = `
                <p>No fue posible identificar las ciudades ingresadas.</p>
            `;
            return;
        }

        results.innerHTML = `
            <h2>${data.title}</h2>
            <p>País: ${data.country_name}</p>
        `;

        data.places.forEach((place) => {
            const placeElement = document.createElement("article");

            const searchQuery = `${place.name}, ${place.city}, ${data.country_name}`;
            const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;

            placeElement.innerHTML = `
                <h3>${place.name}</h3>
                <p><strong>Ciudad:</strong> ${place.city}</p>
                <p>${place.description}</p>
                <p><strong>Destacados:</strong> ${place.highlights}</p>
                ${
                    place.suggestion
                        ? `<p><strong>Sugerencia:</strong> ${place.suggestion}</p>`
                        : ""
                }
                <a href="${searchUrl}" target="_blank" rel="noopener noreferrer">
                    Ver más
                </a>
            `;

            results.appendChild(placeElement);
        });

    } catch (error) {
        results.innerHTML = `
            <p>${error.message}</p>
        `;
    } finally {
        formControls.forEach((control) => {
            control.disabled = false;
        });
    }
    
});