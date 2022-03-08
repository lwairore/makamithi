import { Pipe, PipeTransform } from '@angular/core';
import { convertItemToString, stringIsEmpty } from '@sharedModule/utilities';

@Pipe({
  name: 'formatPhoneNumber'
})
export class FormatPhoneNumberPipe implements PipeTransform {

  transform(value: any, strictlyInternational = false) {
    const PHONE_NUMBER_STRING = convertItemToString(value);

    if (stringIsEmpty(PHONE_NUMBER_STRING)) {
      return value;
    }

    return formatPhoneNumber(PHONE_NUMBER_STRING, strictlyInternational);

  }

}

const formatPhoneNumber = (phoneNumberString: string, strictlyInternational: boolean) => {
  const CLEANED_PHONE_NUMBER = ('' + phoneNumberString).replace(/\D/g, '');
  if (strictlyInternational) {
    const MATCHED_SECTIONS = CLEANED_PHONE_NUMBER.match(/^(0|)?(\d{3})(\d{3})(\d{3,})$/);
    if (MATCHED_SECTIONS) {
      const intlCode = (MATCHED_SECTIONS[1] ? '+254' : '+');
      return [intlCode, MATCHED_SECTIONS[2], MATCHED_SECTIONS[3], MATCHED_SECTIONS[4]].join('');
    }

  }
  else {
    const MATCHED_SECTIONS = CLEANED_PHONE_NUMBER.match(/^(0|)?(\d{3})(\d{3})(\d{3,})$/);
    if (MATCHED_SECTIONS) {
      const intlCode = (MATCHED_SECTIONS[1] ? '+254 ' : '+');
      return [intlCode, '(', MATCHED_SECTIONS[2], ') ', MATCHED_SECTIONS[3], '-', MATCHED_SECTIONS[4]].join('');
    }
  }

  return null;
}