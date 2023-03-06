import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TransactionComponent } from './transaction.component';
import { ModalsModule, WidgetsModule } from '../../_metronic/partials';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [TransactionComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: TransactionComponent,
      },
    ]),
    WidgetsModule,
    ModalsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
})
export class TransactionModule {}
