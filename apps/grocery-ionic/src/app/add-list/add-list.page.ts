import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppViewModel } from 'libs/grocery-shared-business-logic/src/lib/app-view-model/app-state.interface';
import { IonicAppStateService } from 'libs/grocery-shared-business-logic/src/lib/app-view-model/ionic/ionic-app-state.service';
import { Observable } from 'rxjs';

import { AddItemFormService } from '../../../../../libs/grocery-shared-business-logic/src/lib/items/add-item-form.service';

@Component({
  templateUrl: './add-list.page.html',
  styleUrls: ['./add-list.page.scss'],
})
export class IonicAddListComponent implements OnInit {
  addItemForm!: FormGroup;
  viewModel$!: Observable<AppViewModel>;

  constructor(
    public appViewModelSvc: IonicAppStateService,
    public router: Router,
    private _formService: AddItemFormService
  ) {}

  ngOnInit(): void {
    this.addItemForm = this._formService.getAddItemFormGroup();
    this.viewModel$ = this.appViewModelSvc.getViewModel();
  }
}
