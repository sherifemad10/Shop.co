let newArrivalsContainer = document.querySelector(".new-arrivals-contant");
let topSellingContainer = document.querySelector(".topSelling-contant");

function newArrivals() {
  fetch("./data/prodects.json")
    .then((response) => response.json())
    .then((data) => {
      let arrivals = data.filter((product) => product.newArrivals === true);

      // console.log(arrivals);

      newArrivalsContainer.innerHTML = arrivals
        .slice(0, 4)
        .map(
          (item) => `
      <div class="new-arrivals-card">

          <figure class="prodect-img">
            <img src="${item.images[0].url}" alt=${item.name}
            loading="lazy"

            >
          </figure>
          <h3>${item.name}</h3>
          <div class="rating">
            <img src="./Images/${item.rate}.png" alt="${item.rate}-star">
            <span>${item.rate}/<span>5</span></span>
          </div>


          <div class="price">
            <span class="sale">$${item.price}</span>

            ${item.oldPrice ? `<del class="old">$${item.oldPrice}</del>` : ""}

              ${
                          item.discount
                            ? `<span class="discount">-${item.discount}%</span>`
                            : ""
                        }

            
          </div>
          

        </div>
      `
        )
        .join("");
    })
    .catch((error) => console.error("Error:", error));
}

newArrivals();

function topSelling() {
  fetch("./data/prodects.json")
    .then((response) => response.json())
    .then((data) => {
      let topSelling = data.filter((product) => product.topSelling === true);
      // console.log(topSelling)

      topSellingContainer.innerHTML = topSelling
        .slice(0, 4)
        .map(
          (item) => `
      <div class="new-arrivals-card">

          <figure class="prodect-img">
            <img src="${item.images[0].url}" alt=${item.name}
            loading="lazy"
            >
          </figure>
          <h3>${item.name}</h3>
          <div class="rating">
            <img src="./Images/${item.rate}.png" alt="${item.rate}-star">
            <span>${item.rate}/<span>5</span></span>
          </div>


          <div class="price">
            <span class="sale">$${item.price}</span>

            ${item.oldPrice ? `<del class="old">$${item.oldPrice}</del>` : ""}

                        ${
                          item.discount
                            ? `<span class="discount">-${item.discount}%</span>`
                            : ""
                        }

            
          </div>
          

        </div>
      `
        )
        .join("");
    })
    .catch((error) => console.error("Error:", error));
}

topSelling();
