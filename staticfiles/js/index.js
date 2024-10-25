document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('survey-form');
    const nameInput = document.getElementById('name');
    const ageInput = document.getElementById('age');
    const emailInput = document.getElementById('email');
    const retirementSelect = document.getElementById('retirement-age');
    const savingsSelect = document.getElementById('savings');

    // Функции валидации
    function validateName() {
        const name = nameInput.value.trim();
        const error = document.getElementById('name-error');
        if (name.length < 2) {
            error.textContent = 'Имя должно содержать минимум 2 символа.';
            showError(error);
            nameInput.classList.add('error');
            return false;
        } else {
            hideError(error);
            nameInput.classList.remove('error');
            return true;
        }
    }

    function validateAge() {
        const age = ageInput.value.trim();
        const error = document.getElementById('age-error');
        const ageNumber = parseInt(age);
        if (!age || isNaN(ageNumber) || ageNumber < 18 || ageNumber > 100) {
            error.textContent = 'Введите корректный возраст от 18 до 100 лет.';
            showError(error);
            ageInput.classList.add('error');
            return false;
        } else {
            hideError(error);
            ageInput.classList.remove('error');
            return true;
        }
    }

    function validateEmail() {
        const email = emailInput.value.trim();
        const error = document.getElementById('email-error');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            error.textContent = 'Введите корректный email.';
            showError(error);
            emailInput.classList.add('error');
            return false;
        } else {
            hideError(error);
            emailInput.classList.remove('error');
            return true;
        }
    }

    function validateRetirement() {
        const value = retirementSelect.value;
        const error = document.getElementById('retirement-error');
        if (value === '') {
            error.textContent = 'Пожалуйста, выберите вариант.';
            showError(error);
            retirementSelect.classList.add('error');
            return false;
        } else {
            hideError(error);
            retirementSelect.classList.remove('error');
            return true;
        }
    }

    function validateSavings() {
        const value = savingsSelect.value;
        const error = document.getElementById('savings-error');
        if (value === '') {
            error.textContent = 'Пожалуйста, выберите вариант.';
            showError(error);
            savingsSelect.classList.add('error');
            return false;
        } else {
            hideError(error);
            savingsSelect.classList.remove('error');
            return true;
        }
    }

    // Функции для показа и скрытия ошибок с анимацией высоты
    function showError(errorElement) {
        errorElement.classList.add('visible');
    }

    function hideError(errorElement) {
        errorElement.classList.remove('visible');
    }

    // Добавляем обработчики событий
    nameInput.addEventListener('input', validateName);
    ageInput.addEventListener('input', validateAge);
    emailInput.addEventListener('input', validateEmail);
    retirementSelect.addEventListener('change', validateRetirement);
    savingsSelect.addEventListener('change', validateSavings);

    // Проверка формы перед отправкой
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const isNameValid = validateName();
        const isAgeValid = validateAge();
        const isEmailValid = validateEmail();
        const isRetirementValid = validateRetirement();
        const isSavingsValid = validateSavings();

        if (isNameValid && isAgeValid && isEmailValid && isRetirementValid && isSavingsValid) {
            // Все поля валидны, можно отправлять форму
            form.submit();
        } else {
            // Форма содержит ошибки
            // Можно добавить общее сообщение об ошибке, если нужно
        }
    });
});