import { LightningElement } from 'lwc';

export default class Passgen extends LightningElement {
    passwordString;
    numDigits = 10;

    characterString = '';
    specialCharString = '!@#$%^&*()';
    digitCharString = '0123456789';
    lowerCaseCharString = 'abcdefghijklmnopqrstuvwxyz';
    upperCaseCharString = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    handleSlider(event) {
        this.numDigits = event.target.value;
    }

    handleCopy() {
        let pwdCopied = this.template.querySelector('.pwd');
        this.copyText(pwdCopied.value);
    }

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
        
        this.passwordString = this.getChars(this.numDigits);
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

    copyText(text) {
        if(navigator.clipboard && window.isSecureContext) {
            return navigator.clipboard.writeText(text);
        } else {
            let textElement = document.createElement('textarea');
            textElement.value = text;
            document.body.appendChild(textElement);
            textElement.focus();
            textElement.select();
            return new Promise((res, rej) => {
                document.execCommand('copy') ? res() : rej();
                textElement.remove();
            });
        }
    }
}