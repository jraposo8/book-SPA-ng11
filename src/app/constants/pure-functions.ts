import { IBook } from "../models/books.interface";

export const negateInCollection = (books: IBook[], book: IBook) => books.map((searchBook) => {
    if(searchBook.id === book.id) {
      return {
        ...searchBook,
        inCollection: !searchBook.inCollection
      }
    } else {
      return searchBook
    };
});

export const interceptBooksList = (booksCollection: IBook[], latestBookSearch: IBook[]) => latestBookSearch.map((book) =>  {
    if(booksCollection.some((collectionBook) => collectionBook.id === book.id)){
      return {
        ...book,
        inCollection: true,
      }
    } else {
      return book;
    }
}) 