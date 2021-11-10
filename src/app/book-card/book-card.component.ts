import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IBook } from '../models/books.interface';
import { Store } from '@ngxs/store';
import { AddBook, RemoveBook } from '../state/book.actions';
import { AddBookDialog } from '../dialogs/add-book-dialog/add-book-dialog';
import { RemoveBookDialog } from '../dialogs/remove-book-dialog/remove-book-dialog';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent implements OnInit {

  @Input() book!: IBook;

  constructor(public dialog: MatDialog, private store: Store) { }

  ngOnInit(): void {
  }

  addDialog(event: Event,book: IBook) {

    const dialogRef = this.dialog.open(AddBookDialog, {
      data: { title: book.title }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.store.dispatch(new AddBook(book));
      }
    });
  }

  removeDialog(event: Event,book: IBook) {

    const dialogRef = this.dialog.open(RemoveBookDialog, {
      data: { title: book.title }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.store.dispatch(new RemoveBook(book));
      }
    });
  }
}
