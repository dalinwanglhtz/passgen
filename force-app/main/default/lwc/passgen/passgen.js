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
        for(let cb of checkboxes) {
            switch(cb.name) {
                case 'lowerCase':
                    this.updateCharString(this.lowerCaseCharString, cb);
                    break;
                case 'upperCase':
                    this.updateCharString(this.upperCaseCharString, cb);
                    break;
                case 'digit':
                    this.updateCharString(this.digitCharString, cb);
                    break;
                case 'special':
                    this.updateCharString(this.specialCharString, cb);
            }
        }
        
        this.passwordString = this.getChars(8);
    }

    updateCharString(partString, checkbox) {
        if(checkbox.checked) {
            this.characterString += this.characterString.indexOf(partString) == -1 ? partString : '';
        } else {
            this.characterString = this.characterString.replace(partString, '');
        }
    }

    getChars(num) {
        let str = '';
        for(let i=0; i<num; i++) {
            str += this.characterString.charAt(Math.floor(Math.random()*this.characterString.length));
        }
        return str;
    }
}