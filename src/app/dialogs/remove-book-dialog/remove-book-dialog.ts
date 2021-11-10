import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
    selector: 'remove-book-dialog',
    templateUrl: 'remove-book-dialog.html',
  })
  export class RemoveBookDialog {
    constructor(@Inject(MAT_DIALOG_DATA) public data: {title: string}) { }
  }