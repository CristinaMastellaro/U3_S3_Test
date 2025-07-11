const rowCards = document.getElementById("rowCards");
const endpoint = "https://striveschool-api.herokuapp.com/api/product";

fetch(endpoint, {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODcwYzQ2NDc4Y2RkZjAwMTU1ZDY3YTMiLCJpYXQiOjE3NTIyMjA3NzIsImV4cCI6MTc1MzQzMDM3Mn0.aps4Stj2AnXuaQyOjapUZvfSF2nL9WrlYcWeD7tpoDE",
  },
})
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("C'è stato un errore nel contatto con il server");
    }
  })
  .then((prods) => {
    console.log(prods);
    document.getElementById("spinner").classList.add("d-none");
    prods.forEach((prod) => {
      rowCards.innerHTML += `
      <div class="col col-12 col-sm-6 col-md-4 col-lg-3">
      <div class="card d-flex flex-column justify-content-between">
  <img src="${prod.imageUrl}" class="card-img-top" alt="Cover" onclick="details('${prod._id}')">
  <div class="card-body flex-grow-1 d-flex flex-column justify-content-between">
  <div class="pb-3">  
  <h5 class="card-title" onclick="details('${prod._id}')">${prod.name}</h5>
    <p class="card-text mb-1" onclick="details('${prod._id}')">Artista: ${prod.brand}</p>
    <div class="mb-1" onclick="details('${prod._id}')">
    <p class="card-text mb-0">Descrizione:</p>
    <p class="card-text description">${prod.description}</p>
    </div>
    <p class="card-text" onclick="details('${prod._id}')">Prezzo: ${prod.price}€</p></div>
    <button class="btn btn-success" onclick="modify('${prod._id}')">Modifica</button>
  </div>
</div>
</div>`;
    });
  })
  .catch((err) => {
    document.getElementById("spinner").classList.add("d-none");
    document.getElementById("errorContainer").classList.remove("d-none");
    document.getElementById("errorMessage").innerText =
      "Non siamo riusciti a caricare i prodotti. " + err;
  });

const modify = (id) => location.assign(`./backoffice.html?id=${id}`);

const details = (id) => location.assign(`./details.html?id=${id}`);
