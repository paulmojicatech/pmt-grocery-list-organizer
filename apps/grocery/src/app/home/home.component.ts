import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { AppViewModel } from '../../../../../libs/grocery-shared-business-logic/src/lib/app-view-model/app-state.interface';
import { WebAppStateService } from '../../../../../libs/grocery-shared-business-logic/src/lib/app-view-model/web/web-app-state.service';
import { AddItemFormService } from '../../../../../libs/grocery-shared-business-logic/src/lib/items/add-item-form.service';

@Component({
  selector: 'paulmojicatech-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  viewModel$!: Observable<AppViewModel>;
  addItemForm!: FormGroup;

  constructor(
    public webStateServce: WebAppStateService,
    private _formService: AddItemFormService
  ) {}

  ngOnInit(): void {
    this.viewModel$ = this.webStateServce.getViewModel();
    this.addItemForm = this._formService.getAddItemFormGroup();
  }
}
