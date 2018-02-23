import { DialogComponent } from './../dialog/dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatInputModule, MatCheckboxModule, MatGridListModule, MatIconModule, MatCardModule, MatOptionModule, MatSelectModule, MatDialogModule, MatProgressBarModule, MatProgressSpinnerModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatGridListModule,
    MatIconModule,
    MatCardModule,
    MatOptionModule,
    MatSelectModule,
    MatDialogModule,
    MatProgressBarModule,
    MatProgressSpinnerModule
  ],
  exports: [
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatGridListModule,
    MatIconModule,
    MatCardModule,
    MatOptionModule,
    MatSelectModule,
    MatDialogModule,
    MatProgressBarModule,
    MatProgressSpinnerModule
  ],
  declarations: [
  ]
})
export class MaterialModule { }
