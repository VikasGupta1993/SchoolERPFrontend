import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmBoxComponent } from './view/confirm-box.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmBoxService } from './services/confirm-box.service';
import {MatButtonModule} from '@angular/material/button';



@NgModule({
  declarations: [ConfirmBoxComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  providers: [
    ConfirmBoxService
  ],
  entryComponents: [ConfirmBoxComponent]
})
export class ConfirmBoxModule { }
