import {
    required,
    minValue,
    maxValue,
    minLength,
    maxLength,
    requiredIf,
    numeric,
    helpers,
} from 'vuelidate/lib/validators';

// Only some vuelidate validators can be reused; others dont work well
export const vuelidateRequired = required;
export const vuelidateMinValue = minValue;
export const vuelidateMaxValue = maxValue;
export const vuelidateRequiredIf = requiredIf;
export const vuelidateNumeric = numeric;
export const vuelidateMinLength = minLength;
export const vuelidateMaxLength = maxLength;

/**
 * @param { string } emailAddress Email Address
 * @returns { boolean } if valid
 */
export function vuelidateEmail(emailAddress) {
    const valid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z][\w]{1,}$/i.test(emailAddress);
    return !helpers.req(emailAddress) || valid;
}

/**
 * @param { number } number US Based phone number
 * @returns { boolean } if valid
 */
export function vuelidatePhone(number) {
    return !helpers.req(number) || /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(number);
}

export const hasNumber = (param) => /[0-9]/.test(param);
export const hasSpecialCharacter = (param) => /\W|_/.test(param);
export const hasUppercaseLetter = (param) => /[A-Z]/.test(param);
export const hasLowercaseLetter = (param) => /[a-z]/.test(param);

export function vuelidateHasNumber(param) {
    return !helpers.req(param) || hasNumber(param);
}

export function vuelidateHasSpecialCharacter(param) {
    return !helpers.req(param) || hasSpecialCharacter(param);
}

export function vuelidateHasUppercaseLetter(param) {
    return !helpers.req(param) || hasUppercaseLetter(param);
}

export function vuelidateHasLowercaseLetter(param) {
    return !helpers.req(param) || hasLowercaseLetter(param);
}
