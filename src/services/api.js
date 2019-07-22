const baseUrl = "http://localhost:3000";
const signInUrl = baseUrl + "/signin";

export function signin(username, password) {
  return fetch(signInUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username,
      password
    })
  }).then(response => response.json());
}

export function validate() {
  return fetch(baseUrl + "/validate", {
    headers: {
      Authorisation: localStorage.token
    }
  }).then(response => response.json());
}

export function createFavouriteBooks(bookId, userId) {
  return fetch(baseUrl + "/favourite_books", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      user_id: userId,
      book_id: bookId
    })
  }).then(response => response.json());
}

export default { signin, validate };
