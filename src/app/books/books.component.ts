import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IBook } from '../models/books.interface';
import { GoogleBooksService } from '../services/google-books.service';
import { BooksState } from '../state/book.state';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import { RemoveBook, UpdateBookInformation } from '../state/book.actions';
import { RemoveBookDialog } from '../dialogs/remove-book-dialog/remove-book-dialog';
import { MatDialog } from '@angular/material/dialog';
import { EditBookDataDialog } from '../dialogs/edit-book-data-dialog/edit-book-data-dialog';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit, OnDestroy {

  faSearch = faSearch;

  @ViewChild('searchInput', { static: false })
  searchInput!: ElementRef<HTMLInputElement>;

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  destroy$ = new Subject<void>();

  tableData!: MatTableDataSource<IBook>;

  @Select(BooksState.getLatestBooksSearch)
  latestBookSearch$: Observable<IBook[]>

  readonly displayedColumns: string[] = ['title', 'author', 'lent', 'lentDate', 'borrower','edit','remove'];

  constructor(public dialog: MatDialog, private store: Store, private googleBooksService: GoogleBooksService) { }

  ngOnInit(): void {
    this.store
      .select(BooksState.getBooksCollection)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.tableData = new MatTableDataSource(data);
        this.tableData.sort = this.sort;
        this.tableData.paginator = this.paginator;

      });
  }

  searchBook() {
    this.googleBooksService.getGoogleBooks(this.searchInput.nativeElement.value)
      .subscribe({complete: () => this.searchInput.nativeElement.value = null});
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

  editDialog(event: Event,book: IBook) {

    const dialogRef = this.dialog.open(EditBookDataDialog, {
      data: { id: book.id }
    });

    dialogRef.afterClosed().subscribe(editedBook => {
      if(editedBook) {
        this.store.dispatch(new UpdateBookInformation(editedBook));
      }
    });

  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase(); 
    this.tableData.filter = filterValue;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
