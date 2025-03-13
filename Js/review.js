document.addEventListener("DOMContentLoaded", function () {
  const slider = document.getElementById("testimonialSlider");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const progressContainer = document.getElementById("sliderProgress");

  let cards = [];

  const getVisibleCardCount = () => {
    if (window.innerWidth < 576) return 1;
    if (window.innerWidth < 992) return 2;
    return 3;
  };

  const calculatePageCount = () => {
    return Math.ceil(cards.length / getVisibleCardCount());
  };

  const calculateScrollWidth = () => {
    if (!cards.length) return 0;
    const cardStyle = window.getComputedStyle(cards[0]);
    const cardWidth = cards[0].offsetWidth;
    const cardMarginRight = parseInt(cardStyle.marginRight) || 20;
    return (cardWidth + cardMarginRight) * getVisibleCardCount();
  };

  const scrollToPage = (pageIndex) => {
    const scrollWidth = calculateScrollWidth();
    slider.scrollTo({
      left: pageIndex * scrollWidth,
      behavior: "smooth",
    });
  };

  const createProgressDots = () => {
    progressContainer.innerHTML = "";
    const pageCount = calculatePageCount();

    for (let i = 0; i < pageCount; i++) {
      const dot = document.createElement("div");
      dot.classList.add("progress-dot");
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => {
        scrollToPage(i);
        updateProgressDots();
      });
      progressContainer.appendChild(dot);
    }
  };

  const updateProgressDots = () => {
    const dots = progressContainer.querySelectorAll(".progress-dot");
    const scrollWidth = calculateScrollWidth();
    const activePage = Math.round(slider.scrollLeft / scrollWidth);

    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === activePage);
    });
  };

  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  };

  const handleScroll = debounce(() => {
    updateProgressDots();
  }, 100);

  nextBtn.addEventListener("click", () => {
    slider.scrollBy({ left: calculateScrollWidth(), behavior: "smooth" });
    setTimeout(updateProgressDots, 300);
  });

  prevBtn.addEventListener("click", () => {
    slider.scrollBy({ left: -calculateScrollWidth(), behavior: "smooth" });
    setTimeout(updateProgressDots, 300);
  });

  let startX, scrollLeft;
  slider.addEventListener(
    "touchstart",
    (e) => {
      startX = e.touches[0].pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    },
    { passive: true }
  );

  slider.addEventListener(
    "touchmove",
    (e) => {
      if (!startX) return;
      const x = e.touches[0].pageX - slider.offsetLeft;
      const walk = (x - startX) * 2;
      slider.scrollLeft = scrollLeft - walk;
    },
    { passive: true }
  );

  slider.addEventListener(
    "touchend",
    () => {
      startX = null;
      setTimeout(updateProgressDots, 300);
    },
    { passive: true }
  );

  slider.addEventListener("scroll", handleScroll, { passive: true });

  window.addEventListener(
    "resize",
    () => {
      createProgressDots();
      updateProgressDots();
    },
    { passive: true }
  );

  function reviewCard() {
    fetch("../data/review.json")
      .then((response) => response.json())
      .then((data) => {
        slider.innerHTML = data
          .map(
            (item) => `
                  <section class="testimonial-card">
                      <div class="rating">
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                      </div>
                      <div class="customer-info">
                          <span class="customer-name">${item.name}</span>
                          <span class="verified"><i class="fas fa-check-circle"></i></span>
                      </div>
                      <p class="testimonial-text">${item.review}</p>
                  </section>
              `
          )
          .join("");

        cards = slider.querySelectorAll(".testimonial-card");
        createProgressDots();
        updateProgressDots();
      })
      .catch((error) => console.error("Error loading reviews:", error));
  }

  reviewCard();
});
