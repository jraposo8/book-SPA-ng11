import {
  HttpClient, HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, switchMap } from 'rxjs/operators';
import { IBook } from '../models/books.interface';
import { v4 as uuidv4 } from 'uuid';
import { Store } from '@ngxs/store';
import { SetLatestBookSearch } from '../state/book.actions';
import { EMPTY } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class GoogleBooksService {

  private readonly GOOGLE_API_URL = 'https://www.googleapis.com/books/v1/volumes?q=';
  private readonly MAX_RESULTS = 6;

  constructor(
    private httpClient: HttpClient,
    private store: Store,
    private snackBar: MatSnackBar,
  ) { }

  getGoogleBooks(bookTitle: string){
    return this.httpClient.get(`${this.GOOGLE_API_URL}${bookTitle}&maxResults=${this.MAX_RESULTS}`)
      .pipe(
        map((data: any) => this.parseGoogleBooks(data)), 
        switchMap((books) => this.store.dispatch(new SetLatestBookSearch(books))),
        catchError((error: HttpErrorResponse) => {
          this.snackBar.open(
              `Error while retrieving data from google API`,
              undefined,
              {
                duration: 3000,
                panelClass: ['red-snackbar'],
              },
          );
          return EMPTY;
        }),
      );
  } 

  parseGoogleBooks(data: any): IBook[] {
    return data?.items?.map((book) => { return {
      title: book?.volumeInfo?.title || '',
      description: book?.volumeInfo?.description || '',
      imageSource: book?.volumeInfo?.imageLinks?.thumbnail || 'https://i.imgur.com/oM3MdAi.png',
      previewLink: book?.volumeInfo?.previewLink || '#',
      id: book?.volumeInfo?.industryIdentifiers?.[0]?.identifier || uuidv4(),
      author: book?.volumeInfo?.authors?.[0] || '',
      isLent: false,
      lentDate: null,
      borrower: null,
      inCollection: false,
    } as IBook || [];
  });
}
}
