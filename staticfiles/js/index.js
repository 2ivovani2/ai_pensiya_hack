document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href="#survey_form"]').forEach(function(element) {
        element.addEventListener('click', function(event) {
            event.preventDefault(); // Отменяем стандартное поведение ссылки
            document.querySelector('#survey_form').scrollIntoView({
            behavior: 'smooth' // Плавная прокрутка
            });
        });
    });

    // Получаем элементы формы
    const form = document.getElementById('survey-form');

    const gndrSelect = document.getElementById('gndr');
    const brthYrInput = document.getElementById('brth_yr');
    const prsntAgeInput = document.getElementById('prsnt_age');
    const accntBgnDateInput = document.getElementById('accnt_bgn_date');
    const accntStatusSelect = document.getElementById('accnt_status');
    const pnsnAgeInput = document.getElementById('pnsn_age');
    const prvsNpfInput = document.getElementById('prvs_npf');
    const brthPlcInput = document.getElementById('brth_plc');
    const addrssTypeSelect = document.getElementById('addrss_type');
    const rgnInput = document.getElementById('rgn');
    const dstrctInput = document.getElementById('dstrct');
    const cityInput = document.getElementById('city');
    const sttlmntInput = document.getElementById('sttlmnt');
    const pstlCodeInput = document.getElementById('pstl_code');
    const okatoInput = document.getElementById('okato');
    const phnSelect = document.getElementById('phn');
    const emailSelect = document.getElementById('email');
    const lkSelect = document.getElementById('lk');
    const assgnNpoSelect = document.getElementById('assgn_npo');
    const assgnOpsSelect = document.getElementById('assgn_ops');

    // Функции для показа и скрытия ошибок
    function showError(errorElement, message) {
    errorElement.textContent = message;
    errorElement.classList.add('visible');
    }

    function hideError(errorElement) {
    errorElement.textContent = '';
    errorElement.classList.remove('visible');
    }

    // Функции валидации для каждого поля

    function validateBrthPlc() {
    const value = brthPlcInput.value.trim();
    const error = document.getElementById('brth_plc-error');
    if (value.length < 2) {
        showError(error, 'Место рождения должно содержать минимум 2 символа.');
        brthPlcInput.classList.add('error');
        return false;
    } else {
        hideError(error);
        brthPlcInput.classList.remove('error');
        return true;
    }
    }

    function validateAddrssType() {
    const value = addrssTypeSelect.value;
    const error = document.getElementById('addrss_type-error');
    if (value === '') {
        showError(error, 'Пожалуйста, выберите тип адреса.');
        addrssTypeSelect.classList.add('error');
        return false;
    } else {
        hideError(error);
        addrssTypeSelect.classList.remove('error');
        return true;
    }
    }

    function validateRgn() {
    const value = rgnInput.value.trim();
    const error = document.getElementById('rgn-error');
    if (value.length < 2) {
        showError(error, 'Регион должен содержать минимум 2 символа.');
        rgnInput.classList.add('error');
        return false;
    } else {
        hideError(error);
        rgnInput.classList.remove('error');
        return true;
    }
    }

    function validateDstrct() {
    const value = dstrctInput.value.trim();
    const error = document.getElementById('dstrct-error');
    if (value && value.length < 2) {
        showError(error, 'Район должен содержать минимум 2 символа.');
        dstrctInput.classList.add('error');
        return false;
    } else {
        hideError(error);
        dstrctInput.classList.remove('error');
        return true;
    }
    }

    function validateCity() {
    const value = cityInput.value.trim();
    const error = document.getElementById('city-error');
    if (value.length < 2) {
        showError(error, 'Город должен содержать минимум 2 символа.');
        cityInput.classList.add('error');
        return false;
    } else {
        hideError(error);
        cityInput.classList.remove('error');
        return true;
    }
    }

    function validateSttlmnt() {
    const value = sttlmntInput.value.trim();
    const error = document.getElementById('sttlmnt-error');
    if (value && value.length < 2) {
        showError(error, 'Населенный пункт должен содержать минимум 2 символа.');
        sttlmntInput.classList.add('error');
        return false;
    } else {
        hideError(error);
        sttlmntInput.classList.remove('error');
        return true;
    }
    }

    function validatePstlCode() {
    const value = pstlCodeInput.value.trim();
    const error = document.getElementById('pstl_code-error');
    const postalCodePattern = /^\d{6}$/;
    if (!postalCodePattern.test(value)) {
        showError(error, 'Введите корректный почтовый индекс (6 цифр).');
        pstlCodeInput.classList.add('error');
        return false;
    } else {
        hideError(error);
        pstlCodeInput.classList.remove('error');
        return true;
    }
    }

    function validateOkato() {
    const value = okatoInput.value.trim();
    const error = document.getElementById('okato-error');
    const okatoPattern = /^\d{2,11}$/;
    if (value && !okatoPattern.test(value)) {
        showError(error, 'Введите корректный код ОКАТО (от 2 до 11 цифр).');
        okatoInput.classList.add('error');
        return false;
    } else {
        hideError(error);
        okatoInput.classList.remove('error');
        return true;
    }
    }


    // Добавляем обработчики событий
    brthPlcInput.addEventListener('input', validateBrthPlc);
    addrssTypeSelect.addEventListener('change', validateAddrssType);
    rgnInput.addEventListener('input', validateRgn);
    dstrctInput.addEventListener('input', validateDstrct);
    cityInput.addEventListener('input', validateCity);
    sttlmntInput.addEventListener('input', validateSttlmnt);
    pstlCodeInput.addEventListener('input', validatePstlCode);
    okatoInput.addEventListener('input', validateOkato);
    
    // Проверка формы перед отправкой
    form.addEventListener('submit', function(event) {
    event.preventDefault();

    const isBrthPlcValid = validateBrthPlc();
    const isAddrssTypeValid = validateAddrssType();
    const isRgnValid = validateRgn();
    const isDstrctValid = validateDstrct();
    const isCityValid = validateCity();
    const isSttlmntValid = validateSttlmnt();
    const isPstlCodeValid = validatePstlCode();
    const isOkatoValid = validateOkato();
    
    if (
        isBrthPlcValid &&
        isAddrssTypeValid &&
        isRgnValid &&
        isDstrctValid &&
        isCityValid &&
        isSttlmntValid &&
        isPstlCodeValid &&
        isOkatoValid
    ) {
        // Все поля валидны, можно отправлять форму
        form.submit();
    } else {
        // Форма содержит ошибки
        // Можно добавить общее сообщение об ошибке, если нужно
    }
});
    
});