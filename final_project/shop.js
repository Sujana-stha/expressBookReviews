const axios = require('axios');

// Using async-await to get all books
async function fetchBooks() {
  try {
    const response = await axios.get('http://localhost:5000/');
    console.log('Books:', response.data);
    return response.data
  } catch (error) {
    console.error('Error fetching books:', error);
  }
}

fetchBooks();

async function getBookDetailsByIsbn(isbn) {
    try {
      const response = await axios.get(`http://localhost:5000/isbn/${isbn}`);
      console.log('Book Details:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching book details:', error);
    }
}
  
// Fetch details of book with ID 1
getBookDetailsByIsbn(1);

// book details based on author
async function getBookDetailsbyAuthor(author) {
    try {
      const response = await axios.get(`http://localhost:5000/author/${author}`);
      console.log('Book Details:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching book details:', error);
    }
}

getBookDetailsbyAuthor("Chinua Achebe")

//book details by title
async function getBookDetailsbyTitle(title) {
    try {
      const response = await axios.get(`http://localhost:5000/title/${title}`);
      console.log('Book Details:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching book details:', error);
    }
}

getBookDetailsbyTitle("Things Fall Apart")