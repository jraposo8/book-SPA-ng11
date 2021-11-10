import {Action, createSelector, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {AddBook, RemoveBook, SetLatestBookSearch, UpdateBookInformation} from './book.actions';
import {patch, append, removeItem, updateItem} from '@ngxs/store/operators';
import { IBook } from '../models/books.interface';
import { interceptBooksList, negateInCollection } from '../constants/pure-functions';

export interface BooksStateModel {
  booksCollection: IBook[];
  latestBookSearch: IBook[];
}

@State<BooksStateModel>({
  name: 'books',
  defaults: {
    booksCollection: [],
    latestBookSearch: [],
  },
})
@Injectable()
export class BooksState {

  @Selector()
  static getBooksCollection(state: BooksStateModel) {
    return state?.booksCollection;
  }

  @Selector()
  static getLatestBooksSearch(state: BooksStateModel) {
    return state?.latestBookSearch;
  }

  static isBookInCollection(id: string) {
    return createSelector([BooksState], (state: BooksStateModel) => {
      return state?.booksCollection?.some((book) => book.id === id) || false;
    });
  }

  static getBookInCollection(id: string) {
    return createSelector([BooksState], (state: BooksStateModel) => {
      return state?.booksCollection?.find((book) => book.id === id) || null;
    });
  }

  @Action(AddBook)
  AddBook(ctx: StateContext<BooksStateModel>, { book }: AddBook) {

    const latestBookSearch = negateInCollection(ctx.getState().latestBookSearch,book);

    ctx.setState(
        patch({
          booksCollection: append<IBook>([book]),
          latestBookSearch: latestBookSearch
        }),
    );
  }

  @Action(RemoveBook)
  RemoveBook(ctx: StateContext<BooksStateModel>, { book }: RemoveBook) {

    const latestBookSearch = negateInCollection(ctx.getState().latestBookSearch,book);

    ctx.setState(
        patch({
          booksCollection: removeItem<IBook>(collectionBook => collectionBook.id === book.id),
          latestBookSearch: latestBookSearch
        }),
    );
  }

  @Action(UpdateBookInformation)
  UpdateBookInformation(ctx: StateContext<BooksStateModel>, { book }: UpdateBookInformation) {
    ctx.setState(
        patch({
          booksCollection: updateItem<IBook>(collectionBook => collectionBook.id === book.id, book),
        }),
    );
  }

  @Action(SetLatestBookSearch)
  SetLatestBookSearch(ctx: StateContext<BooksStateModel>, { books }: SetLatestBookSearch) {

    const booksCollection = ctx.getState().booksCollection;
    const latestBookSearch = interceptBooksList(booksCollection,books);

    ctx.setState(
        patch({
          latestBookSearch: latestBookSearch,
        }),
    );
  }

  
}
