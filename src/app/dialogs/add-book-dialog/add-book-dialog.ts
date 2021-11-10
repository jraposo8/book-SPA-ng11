import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
    selector: 'add-book-dialog',
    templateUrl: 'add-book-dialog.html',
  })
  export class AddBookDialog {
    constructor(@Inject(MAT_DIALOG_DATA) public data: {title: string}) { }
  }