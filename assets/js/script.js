'use strict';
 document.querySelector('.burger-btn').addEventListener('click', function() {
      this.classList.toggle('active');
      document.querySelector('.nav-menu').classList.toggle('active');
  });
  // Show More Trails button
  const showMoreBtn = document.getElementById("showMoreTrails");
  const hiddenTrails = document.querySelectorAll(".trail-card.hidden");

  if (showMoreBtn) {
    showMoreBtn.addEventListener("click", () => {
      hiddenTrails.forEach(card => card.classList.toggle("hidden"));
      showMoreBtn.textContent =
        showMoreBtn.textContent === "Show More Trails"
          ? "Show Less Trails"
          : "Show More Trails";
    });
  }
  // Fare Calculator
  const fareForm = document.getElementById("fareForm");
  const fareResult = document.getElementById("fareResult");

  if (fareForm) {
    fareForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const distance = parseFloat(document.getElementById("distance").value);
      const carType = document.getElementById("carType").value;

      let ratePerMile;

      switch (carType) {
        case "sedan":
          ratePerMile = 1.0; // $1 per mile
          break;
        case "suv":
          ratePerMile = 1.2; // $1.20 per mile
          break;
        case "truck":
          ratePerMile = 1.5; // $1.50 per mile
          break;
      }

      const totalFare = (distance * ratePerMile).toFixed(2);

      fareResult.textContent = `Estimated Fare: $${totalFare}`;
    });
  }
  const loadMoreBtn = document.getElementById("loadMoreBlogs");

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", () => {
      alert("Loading more blog posts soon...");
      // aici poți încărca articole noi dinamic mai târziu
    });
  }