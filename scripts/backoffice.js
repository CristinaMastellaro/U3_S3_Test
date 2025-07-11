const form = document.getElementById("formMusic");
let endpoint = "https://striveschool-api.herokuapp.com/api/product";
const queryParams = new URLSearchParams(location.search);
const searchId = queryParams.get("id");

const modifyButton = document.getElementById("modify");
const deleteButton = document.getElementById("delete");
const saveButton = document.getElementById("save");
const backButton = document.getElementById("back");

backButton.addEventListener("click", () => location.assign("./homepage.html"));

let methodToUse;

// Per distinguere la chiamata PUT dalla POST

if (searchId) {
  methodToUse = "PUT";
  endpoint += `/${searchId}`;
  modifyButton.classList.remove("d-none");
  deleteButton.classList.remove("d-none");
  saveButton.classList.add("d-none");

  // Per riempire il form con i valori già presenti

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
          "C'è stato un errore durante la chiamata al server, non siamo riusciti a caricare i dati del prodotto. Status code: " +
            res.status
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
    .catch((err) => {
      document.getElementById("errorContainer").classList.remove("d-none");
      document.getElementById("errorMessage").innerText =
        "Non siamo riusciti a recuperare i dati del prodotto selezionato. " +
        err;
    });
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

// // Funzione per modificare/creare un prodotto: verrà utilizzato più volte

const callPutOrPost = function () {
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
        if (methodToUse === "POST") {
          nameInput.value = "";
          descriptionInput.value = "";
          priceInput.value = "";
          authorInput.value = "";
          imageUrlInput.value = "";
          document.getElementById("acceptConditions").checked = false;
          document
            .getElementById("successContainer")
            .classList.remove("d-none");
          document.getElementById("successMessage").innerText =
            "Prodotto creato!";
          setTimeout(() => {
            document.getElementById("successContainer").classList.add("d-none");
          }, 5000);
        }
      } else {
        throw new Error(
          "C'è stato un errore durante il contatto con il server. Status code: " +
            res.status
        );
      }
    })
    .catch((err) => {
      document.getElementById("errorContainer").classList.remove("d-none");
      document.getElementById("errorMessage").innerText =
        "Non siamo riusciti a contattare il server. " + err;
    });
};

// Quando si submitta il form o si crea direttamente un nuovo prodotto oppure apparirà un messaggio di conferma per modificare.

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (methodToUse === "POST") {
    callPutOrPost();
  } else {
    document.getElementById("messageModify").classList.toggle("d-none");
  }
});

// Per eliminare un prodotto

deleteButton.addEventListener("click", () => {
  document.getElementById("messageDelete").classList.remove("d-none");
});

const doNotDelete = document.getElementById("doNotDelete");
const confirmDelete = document.getElementById("confirmDelete");

confirmDelete.addEventListener("click", () => {
  document.getElementById("messageDelete").classList.toggle("d-none");
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
          "C'è stato un problema nel contatto con il server, non siamo riusciti a cancellare il prodotto. Status code: " +
            res.status
        );
      }
    })
    .catch((err) => {
      document.getElementById("errorContainer").classList.remove("d-none");
      document.getElementById("errorMessage").innerText =
        "Ci dispiace, non siamo riusciti a cancellare il prodotto. " + err;
    });
});

doNotDelete.addEventListener("click", () => {
  document.getElementById("messageDelete").classList.toggle("d-none");
  document.getElementById("warningContainer").classList.remove("d-none");
  document.getElementById("warningMessage").innerText =
    "Il prodotto non è ancora stato eliminato";
  setTimeout(() => {
    document.getElementById("warningContainer").classList.add("d-none");
  }, 5000);
});

// Modificare un prodotto

const doNotModify = document.getElementById("doNotModify");
const confirmModify = document.getElementById("confirmModify");

confirmModify.addEventListener("click", () => {
  document.getElementById("messageModify").classList.toggle("d-none");
  callPutOrPost();
  document.getElementById("successContainer").classList.remove("d-none");
  document.getElementById("successMessage").innerText = "Prodotto modificato!";
  setTimeout(() => {
    document.getElementById("successContainer").classList.add("d-none");
  }, 5000);
});

doNotModify.addEventListener("click", () => {
  document.getElementById("messageModify").classList.toggle("d-none");
  document.getElementById("warningContainer").classList.remove("d-none");
  document.getElementById("warningMessage").innerText =
    "Prodotto non modificato";
  setTimeout(() => {
    document.getElementById("warningContainer").classList.add("d-none");
  }, 5000);
});
