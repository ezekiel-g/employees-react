const validateDepartment = {
    validateName: name => {
        if (!name || name.trim() === '') {
            return { valid: false, message: 'Department name is required' }
        }
        if (name.length > 100) {
            return {
                valid: false,
                message: 'Department name must be fewer than 100 characters'
            }
        }
        return { valid: true, message: '' }
    },

    validateCode: code => {
        if (!code || code.trim() === '') {
            return { valid: false, message: 'Department code is required' }
        }
        if (code.length > 20) {
            return {
                valid: false,
                message: 'Department code must be fewer than 20 characters'
            }
        }
        return { valid: true, message: '' }
    },

    validateLocation: location => {
        const validLocations = ['New York', 'San Francisco', 'London']
        if (!location || location === 'Select location') {
            return { valid: false, message: 'Location is required' }
        }
        if (!validLocations.includes(location)) {
            return { valid: false, message: 'Invalid location value' }
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

export default validateDepartment
