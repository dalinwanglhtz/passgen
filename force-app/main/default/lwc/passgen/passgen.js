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
            switch(i.name) {
                case 'lowerCase':
                    if(i.checked) {
                        this.characterString += this.characterString.indexOf(this.lowerCaseCharString) == -1 
                        ? this.lowerCaseCharString : '';
                    } else {
                        this.characterString = this.characterString.replace(this.lowerCaseCharString, '');
                    }
                    break;
                case 'upperCase':
                    if(i.checked) {
                        this.characterString += this.characterString.indexOf(this.upperCaseCharString) == -1 
                        ? this.upperCaseCharString : '';
                    } else {
                        this.characterString = this.characterString.replace(this.upperCaseCharString, '');
                    }
                    break;
                case 'digit':
                    if(i.checked) {
                        this.characterString += this.characterString.indexOf(this.digitCharString) == -1 
                        ? this.digitCharString : '';
                    } else {
                        this.characterString = this.characterString.replace(this.digitCharString, '');
                    }
                    break;
            }
        }
        
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