import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllFeesComponent } from './all-fees/all-fees.component';
import { AddFeesComponent } from './add-fees/add-fees.component';
import { EditFeesComponent } from './edit-fees/edit-fees.component';
import { FeeReceiptComponent } from './fee-receipt/fee-receipt.component';
import { AddInstallmentComponent } from './add-installment/add-installment.component';
import { AddFeeTypeComponent } from './add-fee-type/add-fee-type.component';
import { FeeStructureComponent } from './fee-structure/fee-structure.component';

const routes: Routes = [
  {
    path: 'all-fees',
    component: AllFeesComponent
  },
  {
    path: 'add-installment',
    component: AddInstallmentComponent
  },
  {
    path: 'add-fee-type',
    component: AddFeeTypeComponent
  },
  {
    path: 'fee-structure',
    component: FeeStructureComponent
  },
  {
    path: 'add-fees',
    component: AddFeesComponent
  },
  {
    path: 'edit-fees',
    component: EditFeesComponent
  },
  {
    path: 'fee-receipt',
    component: FeeReceiptComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeesRoutingModule {}
