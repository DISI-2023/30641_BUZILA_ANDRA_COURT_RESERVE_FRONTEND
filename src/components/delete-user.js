export const deleteUser = () => {
  let loggedUser = localStorage.getItem("loggedUser");
  if (loggedUser != null) {
    localStorage.removeItem("loggedUser");
  } else {
    alert("You are not logged in!");
  }
};
