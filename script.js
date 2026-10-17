"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");
  const bookingForm = document.getElementById("bookingForm");
  const serviceSelect = document.getElementById("service");
  const preferredDate = document.getElementById("preferredDate");
  const formFeedback = document.getElementById("formFeedback");

  // Mobile navigation
  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
      );
    });

    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        mainNav.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
      }
    });
  }

  // Do not allow selecting a date in the past.
  if (preferredDate) {
    const today = new Date();
    const localToday = [
      today.getFullYear(),
      String(today.getMonth() + 1).padStart(2, "0"),
      String(today.getDate()).padStart(2, "0")
    ].join("-");

    preferredDate.min = localToday;
  }

  // Service buttons select the matching service in the enquiry form.
  document.querySelectorAll("[data-service]").forEach((button) => {
    button.addEventListener("click", () => {
      const service = button.getAttribute("data-service");

      if (serviceSelect) {
        serviceSelect.value = service;
      }

      if (formFeedback) {
        formFeedback.textContent = "";
      }

      const appointmentSection = document.getElementById("appointment");

      if (appointmentSection) {
        appointmentSection.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }

      if (serviceSelect) {
        serviceSelect.focus({ preventScroll: true });
      }
    });
  });

  // This is a front-end demonstration, not a real booking service.
  if (bookingForm && formFeedback) {
    bookingForm.addEventListener("submit", (event) => {
      event.preventDefault();
      formFeedback.textContent = "";

      if (!bookingForm.checkValidity()) {
        bookingForm.reportValidity();
        return;
      }

      const formData = new FormData(bookingForm);
      const customerName = String(formData.get("fullName") || "").trim();
      const service = String(formData.get("service") || "");
      const date = String(formData.get("preferredDate") || "");

      if (!customerName || !service || !date) {
        formFeedback.textContent = "Please complete the required fields.";
        return;
      }

      const [year, month, day] = date.split("-");
      const readableDate = new Date(
        Number(year),
        Number(month) - 1,
        Number(day)
      ).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric"
      });

      formFeedback.textContent =
        `Demo preview ready, ${customerName}. Your selected service is ${service} for ${readableDate}. No booking was sent or saved.`;
    });
  }
});
