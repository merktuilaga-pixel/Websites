
// OPAL HORIZON: INTERACTIVE FEATURES
// Hotel names, prices and ratings 

const hotels = [
    {
        name: "Opal Bay Hotel",
        city: "Cape Town",
        price: 1450,
        rating: 4.9,
        badge: "Guest favourite",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=85",
        description: "A stylish coastal-inspired stay with beautiful views and easy access to city attractions.",
        amenities: ["Pool", "Free Wi-Fi", "Breakfast"]
    },
    {
        name: "Horizon Grand",
        city: "Johannesburg",
        price: 1050,
        rating: 4.6,
        badge: "City escape",
        image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=900&q=85",
        description: "A modern city hotel suited to visitors looking for comfort and convenience.",
        amenities: ["Restaurant", "Wi-Fi", "Gym"]
    },
    {
        name: "Opal Sands Resort",
        city: "Durban",
        price: 1850,
        rating: 4.8,
        badge: "Coastal retreat",
        image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=900&q=85",
        description: "A relaxed resort-style stay inspired by warm weather and seaside getaways.",
        amenities: ["Pool", "Sea views", "Spa"]
    },
    {
        name: "Horizon Gardens",
        city: "Pretoria",
        price: 950,
        rating: 4.5,
        badge: "Great value",
        image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=900&q=85",
        description: "A welcoming hotel with a calm atmosphere for a comfortable city break.",
        amenities: ["Garden", "Wi-Fi", "Parking"]
    },
    {
        name: "Opal Valley Lodge",
        city: "Stellenbosch",
        price: 1300,
        rating: 4.7,
        badge: "Scenic stay",
        image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=900&q=85",
        description: "A nature-inspired lodge concept for travellers who enjoy peaceful surroundings.",
        amenities: ["Nature", "Breakfast", "Parking"]
    },
    {
        name: "Ocean Horizon Hotel",
        city: "Gqeberha (Port Elizabeth)",
        price: 1150,
        rating: 4.4,
        badge: "Ocean air",
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=900&q=85",
        description: "A relaxed coastal option for visitors exploring the Eastern Cape.",
        amenities: ["Pool", "Wi-Fi", "Restaurant"]
    },
    {
        name: "Opal Central Hotel",
        city: "Bloemfontein",
        price: 850,
        rating: 4.3,
        badge: "Budget friendly",
        image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=85",
        description: "A simple, affordable hotel concept for travellers seeking a convenient base.",
        amenities: ["Wi-Fi", "Parking", "Air conditioning"]
    },
    {
        name: "Horizon Forest Lodge",
        city: "Knysna",
        price: 1600,
        rating: 4.8,
        badge: "Nature retreat",
        image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=900&q=85",
        description: "A cosy lodge concept surrounded by the natural beauty of the Garden Route.",
        amenities: ["Nature", "Breakfast", "Garden"]
    },
    {
        name: "Opal City Suites",
        city: "Polokwane",
        price: 900,
        rating: 4.5,
        badge: "City comfort",
        image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=900&q=85",
        description: "Comfortable suite-style accommodation for visitors to Limpopo.",
        amenities: ["Wi-Fi", "Kitchenette", "Parking"]
    }
];

// Get the website elements
const hotelGrid = document.getElementById("hotelGrid");
const hotelSearch = document.getElementById("hotelSearch");
const priceFilter = document.getElementById("priceFilter");
const sortHotels = document.getElementById("sortHotels");
const resultsCount = document.getElementById("resultsCount");
const emptyState = document.getElementById("emptyState");

// Create a Google Maps search link for each hotel
function mapsSearchUrl(hotel) {
    return "https://www.google.com/maps/search/?api=1&query=" +
        encodeURIComponent(
            hotel.name + ", " + hotel.city + ", South Africa"
        );
}

// Create an embedded Google Maps link for the hotel details pop-up
function mapsEmbedUrl(hotel) {
    return "https://maps.google.com/maps?q=" +
        encodeURIComponent(
            hotel.name + ", " + hotel.city + ", South Africa"
        ) +
        "&output=embed";
}

// Display the hotels on the webpage
function renderHotels() {
    const query = hotelSearch.value.trim().toLowerCase();

    const maxPrice = priceFilter.value === "all"
        ? Infinity
        : Number(priceFilter.value);

    let visibleHotels = hotels.filter(hotel => {
        const matchesSearch =
            (hotel.name + " " + hotel.city)
                .toLowerCase()
                .includes(query);

        return matchesSearch && hotel.price <= maxPrice;
    });

    // Sort the hotel results
    switch (sortHotels.value) {
        case "price-low":
            visibleHotels.sort((a, b) => a.price - b.price);
            break;

        case "price-high":
            visibleHotels.sort((a, b) => b.price - a.price);
            break;

        case "rating":
            visibleHotels.sort((a, b) => b.rating - a.rating);
            break;

        case "name":
            visibleHotels.sort((a, b) =>
                a.name.localeCompare(b.name)
            );
            break;
    }

    // Generate each hotel card
    hotelGrid.innerHTML = visibleHotels.map(hotel => {
        const originalIndex = hotels.indexOf(hotel);

        return `
            <article class="hotel-card">
                <div class="hotel-image-wrap">
                    <img
                        src="${hotel.image}"
                        alt="${hotel.name} in ${hotel.city}"
                        loading="lazy"
                    >
                    <span class="hotel-badge">${hotel.badge}</span>
                </div>

                <div class="hotel-content">
                    <p class="hotel-location">
                        ⌖ ${hotel.city}, South Africa
                    </p>

                    <div class="hotel-title-row">
                        <h3>${hotel.name}</h3>
                        <span class="rating"
                            aria-label="Rating ${hotel.rating} out of 5">
                            ★ ${hotel.rating.toFixed(1)}
                        </span>
                    </div>

                    <p class="hotel-description">
                        ${hotel.description}
                    </p>

                    <div class="amenities">
                        ${hotel.amenities.map(item =>
                            `<span>${item}</span>`
                        ).join("")}
                    </div>

                    <div class="hotel-footer">
                        <div class="price">
                            R${hotel.price.toLocaleString("en-ZA")}
                            <small>per night </small>
                        </div>

                        <div class="hotel-actions">
                            <button
                                class="small-button"
                                type="button"
                                data-details="${originalIndex}">
                                Hotel Details
                            </button>

                            <a
                                class="small-button primary"
                                href="${mapsSearchUrl(hotel)}"
                                target="_blank"
                                rel="noopener noreferrer">
                                Book / View Map ↗
                            </a>
                        </div>
                    </div>
                </div>
            </article>
        `;
    }).join("");

    resultsCount.textContent =
        `Showing ${visibleHotels.length} of ${hotels.length} hotels`;

    emptyState.hidden = visibleHotels.length !== 0;
}

// Search and filtering events
hotelSearch.addEventListener("input", renderHotels);
priceFilter.addEventListener("change", renderHotels);
sortHotels.addEventListener("change", renderHotels);

// Reset the search, price and sorting controls
document.getElementById("clearSearch").addEventListener("click", () => {
    hotelSearch.value = "";
    priceFilter.value = "all";
    sortHotels.value = "featured";
    renderHotels();
});

// Hotel details pop-up and Google Maps
const hotelModal = document.getElementById("hotelModal");
const modalBody = document.getElementById("modalBody");
const closeHotelModal = document.getElementById("closeHotelModal");

hotelGrid.addEventListener("click", event => {
    const detailsButton = event.target.closest("[data-details]");

    if (!detailsButton) return;

    const hotel = hotels[Number(detailsButton.dataset.details)];

    if (!hotel) return;

    modalBody.innerHTML = `
        <p class="eyebrow">HOTEL DETAILS</p>

        <h2 id="modalTitle">${hotel.name}</h2>

        <p>
            ⌖ ${hotel.city}, South Africa ·
            ★ ${hotel.rating.toFixed(1)} rating
        </p>

        <p>${hotel.description}</p>

        <p>
            <strong></strong>
            R${hotel.price.toLocaleString("en-ZA")} per night
        </p>

        <iframe
            class="modal-map"
            title="Google Maps location for ${hotel.name}"
            src="${mapsEmbedUrl(hotel)}"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade">
        </iframe>

        <div class="modal-actions">
            <a
                class="button button-gold"
                href="${mapsSearchUrl(hotel)}"
                target="_blank"
                rel="noopener noreferrer">
                Open Google Maps ↗
            </a>

            <button
                class="button button-navy"
                type="button"
                id="modalDone">
                Close details
            </button>
        </div>
    `;

    hotelModal.hidden = false;
    document.body.style.overflow = "hidden";

    document.getElementById("modalDone")
        .addEventListener("click", closeModal);

    closeHotelModal.focus();
});

// Close the hotel details pop-up
function closeModal() {
    hotelModal.hidden = true;
    document.body.style.overflow = "";
}

closeHotelModal.addEventListener("click", closeModal);

hotelModal.addEventListener("click", event => {
    if (event.target === hotelModal) {
        closeModal();
    }
});

// Mobile navigation menu
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));

    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );
});

mainNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        mainNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
    });
});

// Interactive tabs
const tabContent = {
    discover: {
        heading: "Discover places to stay",
        text: "Browse a selection of hotels and learn about their locations, prices and guest ratings."
    },
    compare: {
        heading: "Compare your options",
        text: "Use the search, price filter and sorting menu to compare nightly prices and ratings."
    },
    explore: {
        heading: "Explore each location",
        text: "Open hotel details to see an embedded map, or use the map link to explore the surrounding area in Google Maps."
    }
};

document.querySelectorAll(".tab-button").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelectorAll(".tab-button").forEach(tab => {
            tab.classList.remove("active");
            tab.setAttribute("aria-selected", "false");
        });

        button.classList.add("active");
        button.setAttribute("aria-selected", "true");

        const content = tabContent[button.dataset.tab];

        document.getElementById("tabPanel").innerHTML = `
            <h3>${content.heading}</h3>
            <p>${content.text}</p>
        `;
    });
});

// FAQ accordion
document.querySelectorAll(".accordion-trigger").forEach(button => {
    button.addEventListener("click", () => {
        const expanded =
            button.getAttribute("aria-expanded") === "true";

        const panel = button.parentElement.nextElementSibling;

        button.setAttribute("aria-expanded", String(!expanded));
        panel.hidden = expanded;
    });
});

// Interactive gallery lightbox
const galleryItems = Array.from(
    document.querySelectorAll(".gallery-item")
);

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");

let currentGalleryIndex = 0;

// Display the selected gallery image
function showGalleryImage(index) {
    currentGalleryIndex =
        (index + galleryItems.length) % galleryItems.length;

    const item = galleryItems[currentGalleryIndex];

    lightboxImage.src = item.dataset.full;
    lightboxImage.alt = item.dataset.alt;
    lightboxCaption.textContent = item.dataset.alt;
}

// Open the gallery when an image is clicked
galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => {
        showGalleryImage(index);

        lightbox.hidden = false;
        document.body.style.overflow = "hidden";

        document.getElementById("closeLightbox").focus();
    });
});

// Close the gallery lightbox
function closeGallery() {
    lightbox.hidden = true;
    document.body.style.overflow = "";
}

document.getElementById("closeLightbox")
    .addEventListener("click", closeGallery);

document.getElementById("lightboxPrev")
    .addEventListener("click", () => {
        showGalleryImage(currentGalleryIndex - 1);
    });

document.getElementById("lightboxNext")
    .addEventListener("click", () => {
        showGalleryImage(currentGalleryIndex + 1);
    });

lightbox.addEventListener("click", event => {
    if (event.target === lightbox) {
        closeGallery();
    }
});

// Keyboard controls for pop-ups and gallery navigation
document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        if (!hotelModal.hidden) closeModal();
        if (!lightbox.hidden) closeGallery();
    }

    if (!lightbox.hidden && event.key === "ArrowRight") {
        showGalleryImage(currentGalleryIndex + 1);
    }

    if (!lightbox.hidden && event.key === "ArrowLeft") {
        showGalleryImage(currentGalleryIndex - 1);
    }
});

// Display all nine hotels when the page loads
renderHotels();
