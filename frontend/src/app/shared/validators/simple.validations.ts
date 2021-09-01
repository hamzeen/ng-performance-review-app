import { AbstractControl } from '@angular/forms';

export class SimpleValidations {



  static confirmPassword(control: AbstractControl): { [key: string]: boolean } | null {
    if(control.value &&
      control.parent.controls["password"].value &&
      control.parent.controls["password"].value === control.value) {
      return null;
    }
    return {passwordsDontMatch: true};
  }

}
