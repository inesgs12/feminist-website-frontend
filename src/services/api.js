const baseUrl = "http://localhost:3000";
const signInUrl = baseUrl + "/signin";
const booksUrl = "http://localhost:3000/books";
const authorsUrl = "http://localhost:3000/authors";
const theoriesUrl = "http://localhost:3000/theories";

function handleUserData(data) {
  localStorage.setItem("token", data.token);
  return data;
}

export function removeUser() {
  localStorage.removeItem("token");
}

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
  })
    .then(response => response.json())
    .then(handleUserData);
}

export function validate() {
  return fetch(baseUrl + "/validate", {
    headers: {
      Authorisation: localStorage.token
    }
  })
    .then(response => response.json())
    .then(handleUserData);
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
  })
    .then(resp => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("Signup failed!");
      }
    })
    .then(handleUserData);
}

export function getBooks() {
  return fetch(booksUrl).then(response => response.json());
}

export function getAuthors() {
  return fetch(authorsUrl).then(response => response.json());
}

export function getTheories() {
  return fetch(theoriesUrl).then(response => response.json());
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

export function createReview(bookId, userId, stars, comment) {
  return fetch(baseUrl + "/reviews", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      book_id: bookId,
      user_id: userId,
      star_rating: stars,
      comment: comment
    })
  }).then(response => response.json());
}

export function updateReview(bookId, userId, stars, comment, reviewId) {
  return fetch(baseUrl + "/reviews/" + reviewId, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      book_id: bookId,
      user_id: userId,
      star_rating: stars,
      comment: comment
    })
  }).then(response => response.json());
}

export function deleteReview(reviewId) {
  return fetch(baseUrl + "/reviews/" + reviewId, {
    method: "DELETE"
  });
}

export default {
  signin,
  validate,
  getBooks,
  getAuthors,
  getTheories,
  createFavouriteBook,
  deleteFavouriteBook,
  createFavouriteAuthor,
  deleteFavouriteAuthor,
  createFavouriteTheory,
  deleteFavouriteTheory,
  createUser,
  createReview,
  updateReview,
  deleteReview,
  removeUser
};
