import { AbstractControl } from '@angular/forms';

export const passwrodMatch = (control: AbstractControl): { [key: string]: boolean } => {
    const password = control.get('password');
    const passwordConfirm = control.get('passwordConfirmation');

    if ( !password || !passwordConfirm ) { return null; }
    return password.value === passwordConfirm.value ? null : { nomatch: true };
};
