let str = `One: 'Hi Mary.' 
Two: 'Oh, hi.'
One: 'How are you doing?'
Two: 'I'm doing alright. How about you?'
One: 'Not too bad. The weather is great isn't it?'
Two: 'Yes. It's absolutely beautiful today.'
One: 'I wish it was like this more frequently.'
Two: 'Me too.'
One: 'So where are you going now?'
Two: 'I'm going to meet a friend of mine at the department store'
One: 'Going to do a little shopping?'
Two: 'Yeah, I have to buy some presents for my parents.'
One: 'What's the occasion?'
Two: 'It's their anniversary.'
One: 'That's great. Well, you better get going. You don't want to be late.'
Two: 'I'll see you next time.'
One: 'Sure.' Bye.'`;
str = str.replace(/!?\B\'/gm, '"');
console.log(str);


class validForm {
    constructor(formId) {
        this.form = document.querySelector(formId);

        this.patterns = {
            oneWord: {
                regexp: /^\w+$/gm,
                valid: 'Отлично',
                invalid: 'Имя должно содержать только буквы'
            },
            email: {
                regexp: /.*@.*\..{2,}/gm,
                valid: 'Почта корректна',
                invalid: 'Введите действительный адрес почты'
            },
            phone: {
                regexp: /\+\d\(\d{3}\)\d{3}\-\d{4}/gm,
                valid: 'Телефон корректен',
                invalid: 'Укажите телефон в формате: +7(000)000-0000'
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

        this.form.querySelector("#submit-form").addEventListener('click', event=> {
            event.preventDefault();
            if(this.allIsValid()) {
                this.form.submit();
            }
        });
    }

    inputHandler(field, input, feedback, pattern) {
        let cur_pattern = this.patterns[pattern];
        let result = input.value.match(cur_pattern.regexp);

        if(result) {
            // Всё ОК !
            field.isValid = true;
            input.classList.remove(this.classNoValid);
            input.classList.add(this.classVlaid);
            feedback.innerText = cur_pattern.valid;
            feedback.classList.add(this.classFeedbackVlaid);
            feedback.classList.remove(this.classFeedbackNoVlaid);
        } else {
            // Сообщение о ошибке
            field.isValid = false;
            input.classList.add(this.classNoValid);
            input.classList.remove(this.classVlaid);
            feedback.innerText = cur_pattern.invalid;
            feedback.classList.remove(this.classFeedbackVlaid);
            feedback.classList.add(this.classFeedbackNoVlaid);
        }
    }

    allIsValid() {
        for(let field of this.fields) {
            if(!field.isValid) {
                return false;
            }
        }
        return true;
    }
}

new validForm('#form');