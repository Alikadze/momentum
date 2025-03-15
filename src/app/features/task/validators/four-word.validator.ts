import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const minWordValidator = (minWords: number): ValidatorFn => (
    control: AbstractControl,
): ValidationErrors | null => {
    const value = control.value as string;
    const words = value.trim().split(/\s+/);
    return words.length >= minWords ? null : { minWord: true };
};
