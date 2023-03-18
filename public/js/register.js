const register = document
  .querySelector("#register")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const first_name = document.querySelector("#first_name").value;
    const last_name = document.querySelector("#last_name").value;
    const password = document.querySelector("#password").value;
    const email = document.querySelector("#email").value;
    const age = document.querySelector("#age").value;

    try {
      const response = await fetch(
        "http://localhost:8080/api/sessions/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            first_name,
            last_name,
            email,
            password,
            age,
          }),
        }
      );

      if (response) {
        console.log(response);
        window.location.href = "/login";
      }
    } catch (error) {
      console.log(error);
    }
  });
