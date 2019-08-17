import _ from "lodash";

export const requiredValidation = (value) => value ? undefined : 'Campo Obrigatório';

export const validateCpf = (cpf) => {
    if (!cpf || _.isEmpty(cpf)) {
        return undefined
    };

    let cpfValue = removeSpecialCharacters(cpf);

    if (cpfValue.length !== 11 ||
        cpfValue === "00000000000" ||
        cpfValue === "11111111111" ||
        cpfValue === "22222222222" ||
        cpfValue === "33333333333" ||
        cpfValue === "44444444444" ||
        cpfValue === "55555555555" ||
        cpfValue === "66666666666" ||
        cpfValue === "77777777777" ||
        cpfValue === "88888888888" ||
        cpfValue === "99999999999")
        return "CPF inválido";

    let add = 0;
    for (let i = 0; i < 9; i++)
        add += parseInt(cpfValue.charAt(i)) * (10 - i);
    let rev = 11 - (add % 11);
    if (rev === 10 || rev === 11)
        rev = 0;
    if (rev !== parseInt(cpfValue.charAt(9)))
        return "CPF inválido";
    add = 0;
    for (let i = 0; i < 10; i++)
        add += parseInt(cpfValue.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev === 10 || rev === 11)
        rev = 0;
    if (rev !== parseInt(cpfValue.charAt(10)))
        return "CPF inválido";
    return undefined;
};

export const phoneValidation = value =>
    value && value.length < 14
        ? "Telefone inválido"
        : undefined;

export const emailValidation = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? 'E-mail Inválido'
        : undefined;

export const dateValidation = (date) => {
    let dateValue = removeSpecialCharacters(date);

    if (dateValue.length === 8) {
        let day = dateValue.substring(0, 2);
        let month = dateValue.substring(2, 4);
        let year = dateValue.substring(4, 10);
        let formatDate = new Date(year, month, day)

        if (formatDate > new Date()) {
            return "Data não pode ser maior que a atual"
        }
        if (day < 1 || day > 31) {
            return "Dia informado é inválido!"
        }
        if (month < 1 || month > 12) {
            return "Mês informado é inválido!"
        }
        if (year < (new Date().getFullYear() - 100)) {
            return "Ano informado é inválido!"
        }
        if (year > new Date().getFullYear()) {
            return "Ano informado maior que o atual"
        }
    } else {
        return "Data inválida"
    }
}

removeSpecialCharacters = (value) => {
    if (!value) {
        return value
    }
    return value.replace(/[^\d]/g, '')
};

export const onlyLetters = value =>
    value && /[^\w\.]|\d/g.test(value)
        ? value.replace(/[^\w\.]|\d/g, '')
        : valu