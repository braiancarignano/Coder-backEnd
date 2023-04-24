const login = document
  .querySelector("#login")
  .addEventListener("click", async (e) => {
    e.preventDefault();
    const username = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    try {
      console.log(username, password);
      const response = await fetch("http://localhost:8080/api/sessions/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();
      if (data.message === "success") {
        window.location.href = "/";
      } else {
        alert("usuario no encontrado");
      }
    } catch (error) {
      alert(
        "Los datos ingresados son incorrectos. Compruebalos y vuelve a intentar."
      );
    }
  });

const redirectRegister = document
  .querySelector("#register")
  .addEventListener("click", async (e) => {
    window.location.href = "/register";
  });
