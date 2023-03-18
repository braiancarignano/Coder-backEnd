const elementExists = (id) => document.getElementById(id) !== null;

const fetchCartsContainer = async () => {
  const response = await fetch(`http://localhost:8080/api/carts`);
  const data = await response.json();
  console.log(data);

  const myElement = document.getElementById("cartsContainer");
  myElement.innerHTML = data.map((product) => {
    return `
    <div>${product._id}</div>
    <div>${product.products[0]}</div>
    `;
  });
};

elementExists("cartsContainer") && fetchCartsContainer();
