const validateEmployee = {
    validateFirstName: firstName => {
        if (!firstName) {
            return { valid: false, message: 'First name is required' }
        }
        if (firstName.length < 2) {
            return {
                valid: false,
                message: 'First name must be at least 2 characters'
            }
        }
        return { valid: true, message: '' }
    },

    validateLastName: lastName => {
        if (!lastName) {
            return { valid: false, message: 'Last name is required' }
        }
        if (lastName.length < 2) {
            return {
                valid: false,
                message: 'Last name must be at least 2 characters'
            }
        }
        return { valid: true, message: '' }
    },

    validateEmail: email => {
        if (!email) {
            return { valid: false, message: 'Email address is required' }
        }
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
        if (!emailRegex.test(email)) {
            return {
                valid: false,
                message: 'Email address format must be valid'
            }
        }
        return { valid: true, message: '' }
    },

    validateHireDate: hireDate => {
        if (!hireDate) {
            return { valid: false, message: 'Hire date is required' }
        }
        return { valid: true, message: '' }
    },

    validateDepartmentId: departmentId => {
        if (!departmentId) {
            return { valid: false, message: 'Department is required' }
        }
        return { valid: true, message: '' }
    },

    validateCountryCode: countryCode => {
        if (!countryCode) {
            return { valid: false, message: 'Country code is required' }
        }
        const countryCodeRegex = /^[0-9]{1,4}$/
        if (!countryCodeRegex.test(countryCode)) {
            return {
                valid: false,
                message:
                    'Country code must be a number between 1 and 4 digits'
            }
        }
        return { valid: true, message: '' }
    },

    validatePhoneNumber: phoneNumber => {
        if (!phoneNumber) {
            return { valid: false, message: 'Phone number is required' }
        }
        const phoneNumberRegex = /^[0-9]{7,15}$/
        if (!phoneNumberRegex.test(phoneNumber)) {
            return {
                valid: false,
                message: 'Phone number must be between 7 and 15 digits'
            }
        }
        return { valid: true, message: '' }
    },

    validateIsActive: isActive => {
        if (typeof isActive !== 'boolean') {
            return { valid: false, message: 'isActive must be true or false' }
        }
        return { valid: true, message: '' }
    }
}

export default validateEmployee
