const filterPrice = document.getElementById("filterPrice");
const filterAge = document.getElementById("filterAge");
const segmentBtns = document.querySelectorAll(".segment-btn");

//========= Filter Price ============== 
if(filterPrice){

  filterPrice.addEventListener("change", async function(){

    const value = this.value;

    if(value === "low-high" || value === "high-low"){

      window.filterState.sort = value;
      window.filterState.price = "all";

    } else {

      window.filterState.price = value;
      window.filterState.sort = "default";

    }

    let url = `/api/profiles?page=1&province=${window.currentProvince}`;

    if(window.filterState.price !== "all"){

      url += `&price=${window.filterState.price}`;

    }

    if(window.filterState.sort !== "default"){

      url += `&sort=${window.filterState.sort}`;

    }

    console.log("Filter URL:", url);

    const res = await fetch(url);
    const data = await res.json();

    renderGrid(data.profiles);

  });

}


// ============= Filter Age =====================

if (filterAge) {

  filterAge.addEventListener("change", async function () {

    window.filterState.age = this.value;

    let url = `/api/profiles?page=1&province=${window.currentProvince}`;

    if (window.filterState.price !== "all") {

      url += `&price=${window.filterState.price}`;

    }

    if (window.filterState.sort !== "default") {

      url += `&sort=${window.filterState.sort}`;

    }

    if (window.filterState.age !== "all") {

      url += `&age=${window.filterState.age}`;

    }

    const res = await fetch(url);
    const data = await res.json();

    renderGrid(data.profiles);

  });

}

// ==========Filter Join ===================
segmentBtns.forEach(btn => {

  btn.addEventListener("click", async function () {

    segmentBtns.forEach(item =>
        item.classList.remove("active")
    );

    this.classList.add("active");

    window.filterState.time = this.dataset.value;

    let url = `/api/profiles?page=1&province=${window.currentProvince}`;

    if (window.filterState.price !== "all") {
        url += `&price=${window.filterState.price}`;
    }

    if (window.filterState.sort !== "default") {
        url += `&sort=${window.filterState.sort}`;
    }

    if (window.filterState.age !== "all") {
        url += `&age=${window.filterState.age}`;
    }

    if (window.filterState.time !== "default") {
        url += `&time=${window.filterState.time}`;
    }

    console.log("Filter URL:", url);

    const res = await fetch(url);
    const data = await res.json();

    renderGrid(data.profiles);

  });

});