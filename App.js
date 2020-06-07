class Product {
  constructor(name, price, year) {
    this.name = name;
    this.price = price;
    this.year = year;
  }
}

class UI {
  // Add new Product.
  addProduct(product) {
    const productList = document.getElementById("product-list"); // Se accede a todo el div de ese id.
    const element = document.createElement("div"); // Crea un nuevo elemento HTML.

    // Se llena el elemento creado
    element.innerHTML = `
    <div class="card text-center mb-4">
      <div class="card-body">
        <strong>Name</strong>: ${product.name} - 
        <strong>Price</strong>: ${product.price} - 
        <strong>Year</strong>: ${product.year}
        <a href="#" class="btn btn-danger ml-2" name="delete">Delete</a>
      </div>
    </div>
    `;

    productList.appendChild(element);
  }

  resetForm() {
    document.getElementById("product-form").reset();
  }

  // Delete Product.
  deleteProduct(element) {
    if (element.name === "delete") {
      element.parentElement.parentElement.parentElement.remove();
      this.showMessage("Product Deleted Successfully.", "warning");
    }
  }

  // show Message in the DOM.
  showMessage(message, cssClass) {
    const divElement = document.createElement("div"); // Se crea un nuevo elemento DIV
    const contanier = document.querySelector(".container"); //Selecciona al DIV que tiene la clase 'container'
    const app = document.querySelector("#App"); // Selecciona elemento DIV que tiene el Id (#) 'App'.

    divElement.className = `alert alert-${cssClass} mt-1`; // Se agrega una clase al elemento DIV,
    divElement.appendChild(document.createTextNode(message)); // Agrega nodo de texto al DIV para mostrar mensaje.

    contanier.insertBefore(divElement, app); // Inserta el nuevo elemento (DIV) creado antes de 'App'.

    setTimeout(function () {
      document.querySelector(`.alert`).remove(); // Selecciona el elemento con la clase 'alert'
    }, 3000); // Se setea el tiempo en milisegundos.
  }
}

// DOM Events.

document
  .getElementById("product-form")
  .addEventListener("submit", function (e) {
    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const year = document.getElementById("year").value;
    const product = new Product(name, price, year);
    const ui = new UI();

    // Valida que existan datos en el formulario.
    if (name === "" || price === "" || year === "") {
      return ui.showMessage("Fill Fields.", "danger"); // Detiene la ejecución de la aplicación.
    }

    ui.addProduct(product);
    ui.resetForm();
    ui.showMessage(`Product '${product.name}' Added Successfully.`, "success");

    e.preventDefault();
  });

document.getElementById("product-list").addEventListener("click", function (e) {
  const ui = new UI();
  ui.deleteProduct(e.target);
});
