import _ from "lodash";

export const cepMask = (cep) => {
    if (_.isEmpty(cep) || String(cep) === '') {
        return cep
    }
    cep = cep.replace(/\D/g, "");
    cep = cep.replace(/^(\d{2})(\d)/, "$1.$2");
    cep = cep.replace(/\.(\d{3})(\d)/, ".$1-$2");
    return cep
};

export const removeSpecialCharacters = (value) => {
    if (!value) {
        return value
    }
    return String(value).replace(/[^\d]/g, '')
};

export const cpfMask = (cpf) => {
    if (_.isEmpty(cpf) || String(cpf) === '') {
        return cpf
    }
    cpf = cpf.replace(/\D/g, "").match(/(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})/);
    let cpf1 = cpf[1] ? cpf[1] : '';
    let cpf2 = cpf[2] ? '.' + cpf[2] : '';
    let cpf3 = cpf[3] ? '.' + cpf[3] : '';
    let cpf4 = cpf[4] ? '-' + cpf[4] : '';
    cpf = cpf1 + cpf2 + cpf3 + cpf4;
    return cpf
};

export const phoneMask = (value) => {
    if (_.isEmpty(value) || String(value) === '') {
        return value
    }
    let phone = String(value);
    let phoneString = removeSpecialCharacters(phone);
    let x = '';
    if (phoneString.length < 11) {
        x = phoneString.replace(/\D/g, '').match(/(\d{0,2})(\d{0,4})(\d{0,4})/);
        phoneString = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    } else {
        x = phoneString.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
        phoneString = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    }
    return phoneString
};

export const creditCardMask = (value) => {
    if (String(value) === '') {
        return value
    }
    value = value.replace(/\D/g, "").match(/(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})/);
    let value1 = value[1] ? value[1] : '';
    let value2 = value[2] ? ' ' + value[2] : '';
    let value3 = value[3] ? ' ' + value[3] : '';
    let value4 = value[4] ? ' ' + value[4] : '';
    value = value1 + value2 + value3 + value4;
    return value
};

export const dateMask = (date) => {
    if (_.isEmpty(date) || String(date) === '') {
        return date;
    }
    let dateValue = removeSpecialCharacters(date);

    if (dateValue.length >= 3 && dateValue.length < 5) {
        return dateValue.substring(0, 2) + "/" + dateValue.substring(2, dateValue.length);
    }
    if (dateValue.length >= 5 && dateValue.length < 8) {
        return dateValue.substring(0, 2) + "/" + dateValue.substring(2, 4) + "/" + dateValue.substring(4, dateValue.length);
    }
    if (dateValue.length >= 8) {
        return dateValue.substring(0, 2) + "/" + dateValue.substring(2, 4) + "/" + dateValue.substring(4, 8);
    }
    return dateValue
};


export const validateCreditCardMask = (value) => {
    if (String(value) === '') {
        return value
    }
    let dateValue = removeSpecialCharacters(value);
    if (dateValue.length >= 3) {
        return dateValue.substring(0, 2) + "/" + dateValue.substring(2, 4)
    }
    return dateValue
};

export const showMoneyMask = (money) => {
    if (String(money) === '') {
        return money;
    } else {
        let moneySplited = String(money).split(".");
        let tmp;
        if (moneySplited.length === 2 && moneySplited[1].length === 1) {
            tmp = moneySplited[0] + "," + moneySplited[1] + "0";
        } else {
            if (money % 1 === 0) {
                money = money + '.00'
            }
            tmp = String(money).replace(/[\D]+/g, '');
            tmp = tmp.replace(/([0-9]{2})$/g, ",$1");
        }

        if (tmp.length > 6) {
            tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
        }

        if (tmp.length === 1) {
            tmp = tmp + ',00'
        }

        return 'R$ ' + tmp;
    }
};

export const moneyMaskInput = (money) => {
    if (_.isEmpty(money) || String(money) === '') {
        return money;
    }
    let intValue = String(money).replace(/[\D]+/g, '');
    let tmp = intValue;
    tmp = tmp.replace(/([0-9]{2})$/g, ",$1");
    if (tmp.length > 6) {
        tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
    }

    return 'R$ ' + tmp;
};

export const formatValueMaskCoin = (value) => {
    if (!_.isUndefined(value)) {
        let valueOnlyNumber = removeSpecialCharacters(value);
        if (valueOnlyNumber.length === 3) {
            return valueOnlyNumber.substring(0, 1) + "." + valueOnlyNumber.substring(1, valueOnlyNumber.length);
        }
        if (valueOnlyNumber.length === 4) {
            return valueOnlyNumber.substring(0, 2) + "." + valueOnlyNumber.substring(2, valueOnlyNumber.length);
        }

        if (valueOnlyNumber.length === 5) {
            return valueOnlyNumber.substring(0, 3) + "." + valueOnlyNumber.substring(3, valueOnlyNumber.length);
        }
        return valueOnlyNumber
    }
    else {
        return value
    }
}