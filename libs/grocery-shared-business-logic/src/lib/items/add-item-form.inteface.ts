import { FormGroup } from '@angular/forms';

export interface IAddItemFormService {
  buildForm: () => FormGroup;
}
