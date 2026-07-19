let page = 1;


document.getElementById("loadMore").addEventListener("click", async () => {

  page++;

  const res = await fetch(
    `/api/profiles?page=${page}&province=${window.currentProvince}`
  );

  const data = await res.json();


  const grid=document.querySelector(".movie-grid");

  data.profiles.forEach(profile=>{

  grid.innerHTML += `<div class="movie-card">

    <div class="card-img-wrapper">

    <img src="${profile.images?.[0] || '/images/no-image.jpg'}">


    <span class="card-rating">
    <i class="fa-solid fa-phone"></i>
    ${profile.phone ? profile.phone.slice(0,-4)+"****":""}
    </span>


    <div class="card-play-btn">
    <i class="fa-solid fa-eye"></i>
    </div>


    </div>


    <div class="card-info">

    <h3 class="card-title">
    ${profile.title}
    </h3>


    <p class="card-meta">
    ${profile.price} • ${profile.location}
    </p>


    </div>

    </div>

    `;

  });


});