import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";

import { AddItemFormService } from '../../../../../libs/grocery-shared-business-logic/src/lib/items/add-item-form.service';

@Component({
    templateUrl: './add-list.page.html',
    styleUrls: ['./add-list.page.scss']
})
export class IonicAddListComponent implements OnInit {
    addItemForm!: FormGroup;

    constructor(private _formService: AddItemFormService){}


    ngOnInit(): void {
        this.addItemForm = this._formService.getAddItemFormGroup();
    }
}