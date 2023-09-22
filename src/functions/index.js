import {parsePhoneNumber} from "libphonenumber-js";

export const formatNumber = (num) => {
    return parseFloat(num).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        .replace('.', ',');
}

export const currency = '€';

export const isValidPhoneNumberForCountry = (phoneNumberString, country) => {
    try {
        const phoneNumber = parsePhoneNumber(phoneNumberString, {
            defaultCountry: country,
            // Demand that the entire input string must be a phone number.
            // Otherwise, it would "extract" a phone number from an input string.
            extract: false
        })

        if (!phoneNumber) {
            return false
        }
        if (phoneNumber.country !== country) {
            return false
        }

        return (phoneNumber.isValid());
    }catch (e) {
        return false;
    }


}