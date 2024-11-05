import {CommonModule, NgForOf} from '@angular/common';
import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from '@angular/material/input'
import {MatCard, MatCardContent, MatCardHeader} from '@angular/material/card';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, MatIconModule, MatSnackBarModule, MatButtonModule, MatInputModule, MatCard, MatCardHeader, MatCardContent, ReactiveFormsModule, NgForOf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public simpleGuid?: string;
  public guidCountFormControl: FormControl<number | null>;


  constructor(private _snackBar: MatSnackBar) {
    this.guidCountFormControl = new FormControl(0, [Validators.min(1),Validators.required]);
  }

  public guidList: string[] = [];

  public copySimpleGuidToClipboard() {
    if(this.simpleGuid!== null && this.simpleGuid !== undefined) {
      navigator.clipboard
        .writeText(this.simpleGuid)
        .then(res => this._snackBar.open("Copied to clipboard"));
      ;
    }
  }

  public copyGuidListToClipboard() {
    if(this.guidList.length > 0) {
      let stringToCopy = this.guidList.join('\n');
      navigator.clipboard
        .writeText(stringToCopy)
        .then(res => this._snackBar.open("Copied to clipboard"));
    }
  }

  public generateGuid() {
    this.simpleGuid = crypto.randomUUID();
  }

  public generateGuidList() {
    if(this.guidCountFormControl.valid) {
      this.guidList = [];
      let numberOfGuidsToGenerate = this.guidCountFormControl.value!
        for(let i = 1; i <= numberOfGuidsToGenerate; i++)
        {
          this.guidList.push(crypto.randomUUID());
        }
    }
    else {
      this._snackBar.open("Please enter a valid number")
    }

  }
}
