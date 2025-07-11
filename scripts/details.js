const queryParams = new URLSearchParams(location.search);
const id = queryParams.get("id");

const endpoint = "https://striveschool-api.herokuapp.com/api/product/" + id;

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
      throw new Error(
        "La chiamata al server non è andata a buon fine. Status code: " +
          res.status
      );
    }
  })
  .then((prod) => {
    document.getElementById("spinner").classList.add("d-none");
    document.getElementById("name").innerText = prod.name;
    document.getElementById("description").innerText = prod.description;
    document.getElementById("price").innerText = prod.price + "€";
    document.getElementById("brand").innerText = prod.brand;
    document.getElementById("imageUrl").setAttribute("src", prod.imageUrl);
  })

  .catch((err) => {
    document.getElementById("spinner").classList.add("d-none");
    document.getElementById("imageUrl").classList.add("d-none");
    document.getElementById("errorContainer").classList.remove("d-none");
    document.getElementById("errorMessage").innerText =
      "Non siamo riusciti a caricare i dettagli: la chiamata al server non è partita. " +
      err;
  });
