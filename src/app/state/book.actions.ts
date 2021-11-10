import { IBook } from "../models/books.interface";

export class AddBook {
  static readonly type = '[Books] AddBook';
  constructor(public book: IBook ) {}
}

export class RemoveBook {
  static readonly type = '[Books] RemoveBook';
  constructor(public book: IBook ) {}
}

export class UpdateBookInformation {
  static readonly type = '[Books] UpdateBookInformation';
  constructor(public book: IBook ) {}
}

export class SetLatestBookSearch {
  static readonly type = '[Books] SetLatestBookSearch';
  constructor(public books: IBook[] ) {}
}
