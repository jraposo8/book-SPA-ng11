import { Component, ElementRef, Inject, OnInit, ViewChild } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Store } from "@ngxs/store";
import { IBook } from "src/app/models/books.interface";
import { BooksState } from "src/app/state/book.state";

@Component({
    selector: 'edit-book-data-dialog',
    templateUrl: 'edit-book-data-dialog.html',
  })
  export class EditBookDataDialog implements OnInit{

    book: IBook

    @ViewChild('titleInput', { static: false })
    titleInput!: ElementRef<HTMLInputElement>;

    @ViewChild('authorInput', { static: false })
    authorInput!: ElementRef<HTMLInputElement>;

    @ViewChild('descriptionInput', { static: false })
    descriptionInput!: ElementRef<HTMLTextAreaElement>;

    @ViewChild('dateInput', { static: false })
    dateInput!: ElementRef<HTMLInputElement>;

    @ViewChild('borrowerInput', { static: false })
    borrowerInput!: ElementRef<HTMLInputElement>;

    constructor(@Inject(MAT_DIALOG_DATA) public data: {id: string}, private store: Store, private dialogRef: MatDialogRef<EditBookDataDialog>,
    ) { 
    }
 
    ngOnInit(): void {
      this.book = this.store.selectSnapshot(BooksState.getBookInCollection(this.data.id));      
    }

    save() {
      const validDate = new Date(this.dateInput.nativeElement.value).getTime() ? new Date(this.dateInput.nativeElement.value) : null;
      const editbook: IBook = {
        ...this.book,
        title: this.titleInput?.nativeElement?.value || '',
        author: this.authorInput?.nativeElement?.value || '',
        description: this.authorInput?.nativeElement?.value || '',
        borrower: this.borrowerInput?.nativeElement?.value || '',
        lentDate: validDate,
        isLent: (this.borrowerInput.nativeElement.value || validDate) ? true : false
      }
      this.dialogRef.close(editbook);      
    }
  }