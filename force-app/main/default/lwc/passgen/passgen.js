import { LightningElement } from 'lwc';

export default class Passgen extends LightningElement {
    passwordString;

    characterString = '';
    specialCharString = '!@#$%^&*()';
    digitCharString = '0123456789';
    lowerCaseCharString = 'abcdefghijklmnopqrstuvwxyz';
    upperCaseCharString = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    handleGenerate() {
        let checkboxes = this.template.querySelectorAll('lightning-input');
        for(let i of checkboxes) {
            console.log('checkbox: ', i.checked);
            switch(i.name) {
                case 'lowerCase':
                    this.characterString += i.checked ? this.lowerCaseCharString : '';
                    break;
                case 'upperCase':
                    this.characterString += i.checked ? this.upperCaseCharString : '';
                    break;
            }
        }
        console.log('char string: ', this.characterString);
        this.passwordString = this.getChars(8);
    }

    getChars(num) {
        let str = '';
        for(let i=0; i<num; i++) {
            str += this.characterString.charAt(Math.floor(Math.random()*this.characterString.length));
        }
        return str;
    }
}