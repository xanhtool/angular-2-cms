import { Injectable } from '@angular/core';
import { MdSnackBar } from "@angular/material";

@Injectable()
export class SnackbarService {

  constructor(
      private snackBar: MdSnackBar,
  ) { }

  openSnackBar(message,action = "",time = 1000) {
      this.snackBar.open(message,action,{
        duration: time,
      });
  }
}
