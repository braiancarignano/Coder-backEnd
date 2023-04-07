const elementExists = (id) => document.getElementById(id) !== null;

function getCurrentURL() {
  return window.location.href;
}

function getParameters(currentURL) {
  const myParams = {};
  let urlString = currentURL;
  let paramString = urlString.split("?")[1];
  let queryString = new URLSearchParams(paramString);
  for (let pair of queryString.entries()) {
    myParams[pair[0]] = pair[1];
  }
  return myParams;
}

const convertParamsToQuery = (params) => {
  let query = "";
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const value = params[key];
      query += `${key}=${value}&`;
    }
  }
  return query;
};
const fetchProductsContainer = async () => {
  const url = getCurrentURL();
  const params = getParameters(url);
  const query = convertParamsToQuery(params);
  const response = await fetch(`http://localhost:8080/api/products?${query}`);
  const data = await response.json();
  console.log(data.result.payload);
  const myElement = document.getElementById("productsContainer");
  myElement.innerHTML = data.result.payload.map((product) => {
    return `
 <div class="w-64 bg-white border shadow-2xl rounded-xl m-6">
  <div class="h-56 rounded-t-xl bg-gray-300 flex flex-col justify-center bg-cover bg-center">
    <h2 class="absolute text-sm bg-blue-700 rounded-3xl text-white p-2 font-medium mt-52 ml-2">
      OFERTA
    </h2>
  </div>
  <div class="p-2 flex flex-col text-center items-center">
    <h3 class="text-blue-800 text-lg font-medium mt-2 uppercase">
      ${product.title}
    </h3>
    <h2 class="text-black-700 text-medium font-medium">${product.description}</h2>
    <h2 class="text-black-700 text-xs m-2">ID: ${product._id}</h2>
    <h3 class="text-blue-800 text-2xl font-semibold mt-3">$${product.price}</h3>
      <button class="my-4 py-2 px-8 font-semibold shadow-lg shadow-blue-700/50 bg-blue-700 text-white rounded-2xl hover:bg-indigo-600 active:bg-indigo-700 disabled:opacity-50 w-full flex items-center justify-center">
        AGREGAR AL CARRITO
      </button>
  </div>
</div>
            `;
  });
};
elementExists("productsContainer") && fetchProductsContainer();
