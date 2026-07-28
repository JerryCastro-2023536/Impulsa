export function isEmptyString(value: any): boolean {
    return value === null || value === undefined || String(value).trim() === "";
}

export function isInvalidNumber(value: any, min: number = 1): boolean {
    if (value === null || value === undefined) {
        return true;
    }
    const numberValue = Number(value);
    return isNaN(numberValue) || numberValue < min;
}

export function isInvalidDate(value: any): boolean {
    if (value === null || value === undefined || String(value).trim() === "") {
        return true;
    }
    return isNaN(new Date(value).getTime());
}

export function isInvalidEmail(value: any): boolean {
    if (isEmptyString(value)) {
        return true;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !emailRegex.test(String(value));
}

export function isInvalidEnum(enumObj: any, value: any): boolean {
    if (value === null || value === undefined) {
        return true;
    }
    return !Object.values(enumObj).includes(value);
}
