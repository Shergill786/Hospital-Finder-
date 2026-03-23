document.addEventListener("DOMContentLoaded", function () {
  const searchBtn = document.getElementById("searchBtn");
  const locationSelect = document.getElementById("locationSelect");

  if (searchBtn && locationSelect) {
    searchBtn.addEventListener("click", function () {
      const location = locationSelect.value;
      if (!location) {
        locationSelect.style.borderColor = "#dc2626";
        locationSelect.style.boxShadow = "0 0 0 3px rgba(220,38,38,0.15)";
        setTimeout(() => {
          locationSelect.style.borderColor = "";
          locationSelect.style.boxShadow = "";
        }, 2000);
        alert("Please select a city to search hospitals.");
        return;
      }
      window.location.href = "hospitals/" + location + ".html";
    });

    // Also allow Enter key
    locationSelect.addEventListener("keydown", function(e) {
      if (e.key === "Enter") searchBtn.click();
    });
  }

  // City cards click (already handled by <a> tags)
  // Animate hero stats counter
  const statNums = document.querySelectorAll(".hero-stat-num");
  statNums.forEach(el => {
    const text = el.textContent;
    if (text.includes("+") || /^\d/.test(text)) {
      const num = parseInt(text.replace(/\D/g, ""));
      if (!isNaN(num) && num > 0 && num < 100000) {
        let start = 0;
        const duration = 1500;
        const step = Math.ceil(num / (duration / 16));
        const timer = setInterval(() => {
          start += step;
          if (start >= num) { el.textContent = text; clearInterval(timer); }
          else { el.textContent = start + (text.includes("+") ? "+" : ""); }
        }, 16);
      }
    }
  });
});

@keyframes dotPulse {
  0%,
  100% {
    opacity:1;
  }
  50% {
    opacity:0.4;
  }
}

@keyframes emergencyPulse {
  0%,
  100% {
    box-shadow:0 0 0 0 rgba(220,38,38,0.4);
  }
  50% {
    box-shadow:0 0 0 16px rgba(220,38,38,0);
  }
}

@keyframes floatPulse {
  0%,
  100% {
    box-shadow:0 0 0 0 rgba(220,38,38,0.5);
  }
  70% {
    box-shadow:0 0 0 16px rgba(220,38,38,0);
  }
}

@media(max-width:900px) {
  nav ul {
    display:none;
  }
  div[style*="grid-template-columns:repeat(3"] {
    grid-template-columns:1fr 1fr!important;
  }
  div[style*="grid-template-columns:2fr 1fr 1fr 1fr"] {
    grid-template-columns:1fr 1fr!important;
  }
}

@media(max-width:600px) {
  .cities-grid {
    grid-template-columns:repeat(2,1fr)!important;
  }
  div[style*="grid-template-columns:repeat(3"] {
    grid-template-columns:1fr!important;
  }
}
