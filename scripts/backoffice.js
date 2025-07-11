const form = document.getElementById("formMusic");
let endpoint = "https://striveschool-api.herokuapp.com/api/product";
const queryParams = new URLSearchParams(location.search);
const searchId = queryParams.get("id");
// console.log("searchId", searchId);

const modifyButton = document.getElementById("modify");
const deleteButton = document.getElementById("delete");
const saveButton = document.getElementById("save");
const backButton = document.getElementById("back");

backButton.addEventListener("click", () => location.assign("./homepage.html"));

let methodToUse;

if (searchId) {
  methodToUse = "PUT";
  endpoint += `/${searchId}`;
  modifyButton.classList.remove("d-none");
  deleteButton.classList.remove("d-none");
  saveButton.classList.add("d-none");

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
          "C'è stato un errore durante la chiamata al server, non siamo riusciti a caricare i dati del prodotto"
        );
      }
    })
    .then((prod) => {
      document.getElementById("nameMusic").value = prod.name;
      document.getElementById("author").value = prod.brand;
      document.getElementById("description").value = prod.description;
      document.getElementById("imageUrl").value = prod.imageUrl;
      document.getElementById("price").value = prod.price;
    })
    .catch((err) =>
      alert(
        "Non siamo riusciti a recuperare i dati del prodotto selezionato " + err
      )
    );
} else {
  methodToUse = "POST";
}

class Product {
  constructor(_name, _description, _brand, _imageUrl, _price) {
    this.name = _name;
    this.description = _description;
    this.brand = _brand;
    this.imageUrl = _imageUrl;
    this.price = _price;
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nameInput = document.getElementById("nameMusic");
  const authorInput = document.getElementById("author");
  const descriptionInput = document.getElementById("description");
  const imageUrlInput = document.getElementById("imageUrl");
  const priceInput = document.getElementById("price");

  const music = new Product(
    nameInput.value,
    descriptionInput.value,
    authorInput.value,
    imageUrlInput.value,
    priceInput.value
  );

  fetch(endpoint, {
    method: methodToUse,
    body: JSON.stringify(music),
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODcwYzQ2NDc4Y2RkZjAwMTU1ZDY3YTMiLCJpYXQiOjE3NTIyMjA3NzIsImV4cCI6MTc1MzQzMDM3Mn0.aps4Stj2AnXuaQyOjapUZvfSF2nL9WrlYcWeD7tpoDE",
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        alert("Operazione completata!");
        if (methodToUse === "POST") {
          nameInput.value = "";
          descriptionInput.value = "";
          priceInput.value = "";
          authorInput.value = "";
          imageUrlInput.value = "";
          document.getElementById("acceptConditions").checked = false;
        }
      } else {
        throw new Error(
          "C'è stato un errore durante il contatto con il server"
        );
      }
    })
    .catch((err) =>
      console.log("Non siamo riusciti a contattare il server", err)
    );
});

// Per eliminare un prodotto
deleteButton.addEventListener("click", () => {
  fetch(endpoint, {
    method: "DELETE",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODcwYzQ2NDc4Y2RkZjAwMTU1ZDY3YTMiLCJpYXQiOjE3NTIyMjA3NzIsImV4cCI6MTc1MzQzMDM3Mn0.aps4Stj2AnXuaQyOjapUZvfSF2nL9WrlYcWeD7tpoDE",
    },
  })
    .then((res) => {
      if (res.ok) {
        alert("Prodotto eliminato");
        location.assign("./homepage.html");
      } else {
        throw new Error(
          "C'è stato un problema nel contatto con il server, non siamo riusciti a cancellare il prodotto"
        );
      }
    })
    .catch((err) =>
      alert("Ci dispiace, non siamo riusciti a cancellare il prodotto " + err)
    );
});
