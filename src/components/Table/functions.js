export const extractNumber = value => {
    if (value===null || value==="" || !/\d/.test(value)) {
        return null;
    }
    return value.match(/\d+/g).map(Number);
}