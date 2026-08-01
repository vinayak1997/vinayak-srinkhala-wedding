console.log("script.js loaded");

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});

// =========================
// RSVP FORM SUBMISSION
// =========================

const form = document.getElementById("rsvpForm");

if (form) {

    form.addEventListener("submit", async function (e) {

        e.preventDefault();

        const submitBtn = form.querySelector("button[type='submit']");
        submitBtn.disabled = true;
        submitBtn.innerText = "Submitting...";

        // Collect selected events
        const selectedEvents = [];

        document
            .querySelectorAll("input[type='checkbox']:checked")
            .forEach(cb => selectedEvents.push(cb.value));

        const payload = {
            name: document.getElementById("name").value,
            mobile: document.getElementById("mobile").value,
            attending: document.getElementById("attending").value,
            guests: document.getElementById("guests").value,
            events: selectedEvents.join(", "),
            message: document.getElementById("message").value,
            userAgent: navigator.userAgent
        };

        try {

                const response = await fetch(
                    "https://script.google.com/macros/s/AKfycbyt_HkBt8rUbMth_Dok4F0Sa7F10RAoSzVWp2PMD2oWIueayD9nivBH3CbrW4nwkpbo/exec",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "text/plain;charset=utf-8"
                        },
                        body: JSON.stringify(payload)
                    }
                );

                if (!response.ok) {
                    throw new Error("Submission failed");
                }

                form.style.display = "none";

                const successCard = document.getElementById("successCard");

                successCard.classList.add("show");

                successCard.scrollIntoView({
                    behavior: "smooth"
                });

                form.reset();

            } catch (err) {

                console.error(err);

                alert("Something went wrong. Please try again.");

            }
        submitBtn.disabled = false;
        submitBtn.innerText = "Send RSVP";

    });

}