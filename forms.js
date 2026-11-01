
// OPAL HORIZON FORM FUNCTIONALITY

// Hotel prices per night
const hotelPrices = {
    "Opal Bay Hotel": 1450,
    "Horizon Grand": 1050,
    "Opal Sands Resort": 1850,
    "Horizon Gardens": 950,
    "Opal Valley Lodge": 1300,
    "Ocean Horizon Hotel": 1150,
    "Opal Central Hotel": 850,
    "Horizon Forest Lodge": 1600,
    "Opal City Suites": 900
};


 // Set the earliest selectable check-in date to today
const now = new Date();

const localToday = new Date(
    now.getTime() - now.getTimezoneOffset() * 60000
);

const today = localToday.toISOString().split("T")[0];

const checkIn = document.getElementById("checkIn");
const checkOut = document.getElementById("checkOut");

if (checkIn && checkOut) {
    checkIn.min = today;
    checkOut.min = today;

    checkIn.addEventListener("change", () => {
        if (checkIn.value) {
            const nextDay = new Date(
                checkIn.value + "T00:00:00"
            );

            nextDay.setDate(nextDay.getDate() + 1);

            const localNextDay = new Date(
                nextDay.getTime() -
                nextDay.getTimezoneOffset() * 60000
            );

            checkOut.min =
                localNextDay.toISOString().split("T")[0];

            if (
                checkOut.value &&
                checkOut.value < checkOut.min
            ) {
                checkOut.value = "";
            }
        }
    });
}




/* =========================================
   OPAL HORIZON FORM VALIDATION
   SIMULATED ASYNCHRONOUS SUBMISSION
========================================= */

// Display a message below a form
function showResponse(element, message, isError = false) {
    element.textContent = message;
    element.style.whiteSpace = "pre-line";
    element.style.color = isError ? "#c62828" : "#176b45";
}

// Validate all form fields using HTML5
function validateForm(form) {
    if (!form.checkValidity()) {
        form.reportValidity();
        return false;
    }

    return true;
}

// Simulate an asynchronous AJAX-style submission
function simulateAjaxSubmission() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                success: true,
                message: "Simulation completed successfully."
            });
        }, 1200);
    });
}

/* =========================================
   HOTEL ENQUIRY FORM
========================================= */

const enquiryForm = document.getElementById("enquiryForm");

if (enquiryForm) {
    enquiryForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const response = document.getElementById("enquiryResponse");

        // Step 1: Validate the form
        if (!validateForm(enquiryForm)) {
            showResponse(response, "Please complete all required fields.", true);
            return;
        }

        const hotel = document.getElementById("enquiryHotel").value;
        const customerName = document.getElementById("enquiryName").value;
        const guests = Number(document.getElementById("guests").value);

        const startDate = new Date(
            document.getElementById("checkIn").value + "T00:00:00"
        );

        const endDate = new Date(
            document.getElementById("checkOut").value + "T00:00:00"
        );

        // Step 2: Check that the dates are valid
        if (endDate <= startDate) {
            showResponse(
                response,
                "Check-out must be after check-in.",
                true
            );
            return;
        }

        // Step 3: Calculate the estimated hotel price
        const millisecondsPerDay = 1000 * 60 * 60 * 24;

        const nights = Math.round(
            (endDate - startDate) / millisecondsPerDay
        );

        const pricePerNight = hotelPrices[hotel];

        if (pricePerNight === undefined) {
            showResponse(response, "Please select a valid hotel.", true);
            return;
        }

        const totalPrice = nights * pricePerNight;

        // Step 4: Show a loading message
        const submitButton = enquiryForm.querySelector(
            'button[type="submit"]'
        );

        submitButton.disabled = true;

        showResponse(response, "Processing your enquiry...");

        try {
            // Step 5: Simulate asynchronous submission
            const result = await simulateAjaxSubmission();

            if (!result.success) {
                throw new Error("Simulation failed.");
            }

            // Step 6: Show the calculated result
            showResponse(
                response,
                "Enquiry Simulation Successful!\n\n" +
                "Thank you, " + customerName + ".\n" +
                "Hotel: " + hotel + "\n" +
                "Guests: " + guests + "\n" +
                "Number of nights: " + nights + "\n" +
                "Estimated total: R" +
                totalPrice.toLocaleString("en-ZA") + "\n\n" +
                "This was a demonstration only. " +
                "No booking or enquiry was sent."
            );

            enquiryForm.reset();

            checkIn.min = today;
            checkOut.min = today;

        } catch (error) {
            showResponse(
                response,
                "Something went wrong. Please try again.",
                true
            );

            console.error(error);

        } finally {
            submitButton.disabled = false;
        }
    });
}

/* =========================================
   CONTACT FORM
========================================= */

const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const response = document.getElementById("contactResponse");

        // Step 1: Validate the form
        if (!validateForm(contactForm)) {
            showResponse(response, "Please correct the form information.", true);
            return;
        }

        const name = document.getElementById("contactName").value;
        const type = document.getElementById("messageType").value;

        const submitButton = contactForm.querySelector(
            'button[type="submit"]'
        );

        submitButton.disabled = true;

        // Step 2: Show loading message
        showResponse(response, "Sending your message (simulation)...");

        try {
            // Step 3: Simulate asynchronous submission
            const result = await simulateAjaxSubmission();

            if (!result.success) {
                throw new Error("Simulation failed.");
            }

            // Step 4: Show confirmation
            showResponse(
                response,
                "Message Simulation Successful!\n\n" +
                "Thank you, " + name + ".\n" +
                "Message type: " + type + "\n\n" +
                "This was a demonstration only. " +
                "No email or message was actually sent."
            );

            contactForm.reset();

        } catch (error) {
            showResponse(
                response,
                "Unable to process the message. Please try again.",
                true
            );

            console.error(error);

        } finally {
            submitButton.disabled = false;
        }
    });
}
