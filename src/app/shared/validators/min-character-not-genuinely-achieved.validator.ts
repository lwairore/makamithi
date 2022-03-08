import { AbstractControl, ValidatorFn } from '@angular/forms';
import { convertItemToString, stringIsEmpty } from '@sharedModule/utilities';

export class MinCharacterNotGenuinelyAchievedValidator {
    static minCharacterNotGenuinelyAchieved(minCharacters: number = 2): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const controlValue = convertItemToString(
                control.value).trim();
            if (stringIsEmpty(controlValue) && !control.touched)
                // if control is empty return no error
                return null;

            let valid: boolean;
            try {
                valid = controlValue.length >= minCharacters;
            } catch (TypeError) {
                valid = false;
            }


            return valid ? null : { minCharacterNotGenuinelyAchieved: true }
        }
    }
}
