
function Validator(options) {

    function validate(inputElement, rule ) {
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
        var errorMessage = rule.test(inputElement.value);
        
                   

        if (errorMessage) {
            errorElement.innerText = errorMessage;
            inputElement.parentElement.classList.add('invalid');
        } else {
            errorElement.innerText = '';
            inputElement.parentElement.classList.remove('invalid');
        }
    }

    var formElement = document.querySelector(options.form);


    if (formElement) {

        options.rules.forEach(function (rule) {

            var inputElement = formElement.querySelector(rule.selector);

            if (inputElement) {
                inputElement.onblur = function () {
                    validate(inputElement, rule);
                    
                }

                inputElement.oninput = function () {
                    var errorElement = inputElement.parentElement.querySelector('.form-message');
                    errorElement.innerText = '';
                    inputElement.parentElement.classList.remove('invalid');
                }
            }
        });
        
    }

}

Validator.isRequired = function(selector) {
    return {
        selector: selector,
        test: function (value) {
            return value.trim() ? undefined: 'Vui lòng nhập trường này'
        }
    };

}

Validator.isEmail = function(selector) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return regex.test(value) ? undefined: 'Vui lòng nhập email'
        }
    };

}

Validator.minLength = function(selector, min) {
    return {
        selector: selector,
        test: function (value) {
            return value.length >= min ? undefined: `Vui lòng nhập tối thiểu ${min} kí tự`;
        }
    };

}