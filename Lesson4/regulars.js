class validForm {
    constructor(formId) {
        this.form = document.querySelector(formId);

        this.patterns = {
            oneWord: {
                regexp: /^\w+$/gm,
                valid: 'Отлично',
                novalid: 'Имя должно содержать только буквы'
            },
            email: {
                regexp: /.*@.*\..{2,}/gm,
                valid: 'Почта корректна',
                novalid: 'Введите действительный адрес почты'
            },
            phone: {
                regexp: /\+\d\(\d{3}\)\d{3}\-\d{4}/gm,
                valid: 'Телефон корректен',
                novalid: 'Укажите телефон в формате: +7(000)000-0000'
            }
        };

        this.classVlaid = 'is-valid';
        this.classNoValid = 'is-invalid';
        this.classFeedbackVlaid = 'valid-feedback';
        this.classFeedbackNoVlaid = 'invalid-feedback';

        this.fields = this.form.querySelectorAll('.fieldset');

        for(let field of this.fields) {
            let input = field.querySelector('input');
            let pattern = input.getAttribute('data-valid');
            let feedback = field.querySelector('.feedback');

            input.addEventListener('input', () => {
                this.inputHandler(field, input, feedback, pattern);
            });
        }
    }

    inputHandler(field, input, feedback, pattern) {
        let result = input.value.match(this.patterns[pattern].regexp);
        if(result) {

        }
    }


}

new validForm('#form');