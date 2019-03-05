export const validateName = value => {
    return /^[A-Za-z0-9_]*$/.test(value);
}

export const validateCOorPO = value => {
    return /^[0-9,]*$/.test(value);
}

export const validateMax = value => {
    return /^[0-9]*$/.test(value);
}