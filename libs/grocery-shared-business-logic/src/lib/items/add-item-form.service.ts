import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class AddItemFormService {
  constructor(private _formBuilder: FormBuilder) {}

  getAddItemFormGroup(): FormGroup {
    return this._formBuilder.group({
      itemCategory: [null, Validators.required],
      item: [null, Validators.required],
      addToCurrentList: [false],
    });
  }
}
