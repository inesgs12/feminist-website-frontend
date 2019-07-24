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

export function createUser(username, password, firstName, lastName) {
  return fetch(baseUrl + "/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: username,
      password: password,
      first_name: firstName,
      last_name: lastName
    })
  }).then(resp => {
    if (resp.ok) {
      return resp.json();
    } else {
      throw new Error("Signup failed!");
    }
  });
}

export function createFavouriteBook(bookId, userId) {
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

export function deleteFavouriteBook(bookId, userId) {
  return fetch(baseUrl + "/favourite_books/" + bookId + "/" + userId, {
    method: "DELETE"
  });
}

export function createFavouriteAuthor(authorId, userId) {
  return fetch(baseUrl + "/favourite_authors", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      user_id: userId,
      author_id: authorId
    })
  }).then(response => response.json());
}

export function deleteFavouriteAuthor(authorId, userId) {
  return fetch(baseUrl + "/favourite_authors/" + authorId + "/" + userId, {
    method: "DELETE"
  });
}

export function createFavouriteTheory(theoryId, userId) {
  return fetch(baseUrl + "/favourite_theories", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      user_id: userId,
      theory_id: theoryId
    })
  }).then(response => response.json());
}

export function deleteFavouriteTheory(theoryId, userId) {
  return fetch(baseUrl + "/favourite_theories/" + theoryId + "/" + userId, {
    method: "DELETE"
  });
}

export default {
  signin,
  validate,
  createFavouriteBook,
  deleteFavouriteBook,
  createFavouriteAuthor,
  deleteFavouriteAuthor,
  createFavouriteTheory,
  deleteFavouriteTheory,
  createUser
};
