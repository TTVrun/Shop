export const required = (text: string) => {
    return text.trim().length > 0 ? null : 'Please enter your information'
}

export const min6 = (text: string) => {
    return text.trim().length >= 6 ? null : 'Information greater than 6 characters'
}

export const min4 = (text: string) => {
    return text.trim().length >= 4 ? null : 'Information greater than 4 characters'
}

export const min2 = (text: string) => {
    return text.trim().length >= 2 ? null : 'Information greater than 2 characters'
}

export const max10 = (text: string) => {
    return text.trim().length <= 10 ? null : 'Information must be less than 10 characters'
}

export const notSpace = (text: string) => {
    return text.trim().includes(' ') ? 'Information must not contain spaces' : null
}

export const email = (text: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return emailRegex.test(text) ? null : 'Information must be email'
}

export const phone = (text: string) => {
    var regex = /^[0-9]+$/
    return regex.test(text.trim()) && text.trim().length <= 11 && text.trim().length >= 9
        ? null
        : 'Please enter the phone number'
}
