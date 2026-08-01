console.log("script.js loaded");

// =========================
// STICKY NAVBAR
// =========================

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    if (navbar) {
        if (window.scrollY > 80) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }
});

// =========================
// COUNTDOWN
// =========================

const weddingDate = new Date("2026-11-20T00:00:00").getTime();

console.log("Wedding date:", weddingDate);

function updateCountdown() {

    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) return;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (document.getElementById("days"))
        document.getElementById("days").textContent = days;

    if (document.getElementById("hours"))
        document.getElementById("hours").textContent = hours;

    if (document.getElementById("minutes"))
        document.getElementById("minutes").textContent = minutes;

    if (document.getElementById("seconds"))
        document.getElementById("seconds").textContent = seconds;

    console.log(
    document.getElementById("days"),
    document.getElementById("hours"),
    document.getElementById("minutes"),
    document.getElementById("seconds")
);
}

updateCountdown();
setInterval(updateCountdown, 1000);

// =========================
// RSVP FORM
// =========================

const form = document.getElementById("rsvpForm");

if (form) {

    form.addEventListener("submit", async function (e) {

        e.preventDefault();

        const submitBtn = form.querySelector("button[type='submit']");
        submitBtn.disabled = true;
        submitBtn.innerText = "Submitting...";

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

            if (successCard) {
                successCard.classList.add("show");
                successCard.scrollIntoView({
                    behavior: "smooth"
                });
            }

            form.reset();

        } catch (err) {

            console.error(err);

            alert("Something went wrong. Please try again.");

        }

        submitBtn.disabled = false;
        submitBtn.innerText = "Send RSVP";

    });

}