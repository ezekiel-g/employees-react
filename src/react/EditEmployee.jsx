import { useState, useEffect } from 'react'
import validateEmployee from '../utilities/validateEmployee.jsx'

function EditEmployee({ currentEmployee, baseUrl, changeDisplay }) {
    const [firstName, setFirstName] = useState(currentEmployee.first_name)
    const [lastName, setLastName] = useState(currentEmployee.last_name)
    const [email, setEmail] = useState(currentEmployee.email)
    const [hireDate, setHireDate] = useState(currentEmployee.hire_date.split('T')[0])
    const [departmentId, setDepartmentId] = useState(currentEmployee.department_id)
    const [countryCode, setCountryCode] = useState(currentEmployee.country_code)
    const [phoneNumber, setPhoneNumber] = useState(currentEmployee.phone_number)
    const [isActive, setIsActive] = useState(!!currentEmployee.is_active)
    const [departments, setDepartments] = useState([])
    const [loading, setLoading] = useState(true)
    const [errors, setErrors] = useState([])

    const getDepartments = async () => {
        try {
            const response = await fetch(`${baseUrl}/api/v1/departments`)
            if (!response.ok) {
                throw new Error('Error in fetch')
            }
            const data = await response.json()
            setDepartments(data)
        } catch (error) {
            setErrors([error.message])
        } finally {
            setLoading(false)
        }
    }

    const handleEditEmployee = async event => {
        event.preventDefault()

        setErrors([])

        const newErrors = []

        const firstNameValidation = validateEmployee.validateFirstName(firstName)
        if (!firstNameValidation.valid) newErrors.push(firstNameValidation.message)

        const lastNameValidation = validateEmployee.validateLastName(lastName)
        if (!lastNameValidation.valid) newErrors.push(lastNameValidation.message)

        const emailValidation = validateEmployee.validateEmail(email)
        if (!emailValidation.valid) newErrors.push(emailValidation.message)

        const hireDateValidation = validateEmployee.validateHireDate(hireDate)
        if (!hireDateValidation.valid) newErrors.push(hireDateValidation.message)

        const departmentValidation = validateEmployee.validateDepartmentId(departmentId)
        if (!departmentValidation.valid) newErrors.push(departmentValidation.message)

        const countryCodeValidation = validateEmployee.validateCountryCode(countryCode)
        if (!countryCodeValidation.valid) newErrors.push(countryCodeValidation.message)

        const phoneNumberValidation = validateEmployee.validatePhoneNumber(phoneNumber)
        if (!phoneNumberValidation.valid) newErrors.push(phoneNumberValidation.message)

        const isActiveValidation = validateEmployee.validateIsActive(isActive)
        if (!isActiveValidation.valid) newErrors.push(isActiveValidation.message)

        if (newErrors.length > 0) {
            setErrors(newErrors)
            return
        }

        const employeeData = {
            first_name: firstName,
            last_name: lastName,
            email,
            hire_date: hireDate,
            department_id: departmentId,
            country_code: countryCode,
            phone_number: phoneNumber,
            is_active: isActive
        }

        try {
            const response = await fetch(
                `${baseUrl}/api/v1/employees/${currentEmployee.id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(employeeData)
                }
            )

            if (!response.ok) {
                throw new Error('Error updating employee')
            }

            alert('Employee updated successfully')
            changeDisplay('departmentList')
        } catch (error) {
            setErrors([error.message])
        }
    }

    useEffect(() => {
        getDepartments()
    }, [])

    const departmentOptions = departments
        .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
        .map(department => (
            <option key={department.id} value={department.id}>
                {department.name}
            </option>
        ))

    const errorDisplay = errors.map((error, index) => (
        <div key={index}>{error}</div>
    ))

    return (
        <>
            <h1>Edit Employee</h1>

            <div>{errorDisplay}</div>

            <form onSubmit={handleEditEmployee} noValidate>
                <div>
                    <label htmlFor="firstName">First name: </label>
                    <input
                        id="firstName"
                        type="text"
                        value={firstName}
                        onChange={event => setFirstName(event.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="lastName">Last name: </label>
                    <input
                        id="lastName"
                        type="text"
                        value={lastName}
                        onChange={event => setLastName(event.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="email">Email address: </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="hireDate">Hire date: </label>
                    <input
                        id="hireDate"
                        type="date"
                        value={hireDate}
                        onChange={event => setHireDate(event.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="departmentId">Department: </label>
                    <select
                        id="departmentId"
                        value={departmentId}
                        onChange={event => setDepartmentId(event.target.value)}
                    >
                        <option value="">Select department</option>
                        {departmentOptions}
                    </select>
                </div>

                <div>
                    <label htmlFor="countryCode">Country code: </label>
                    <input
                        id="countryCode"
                        type="text"
                        value={countryCode}
                        onChange={event => setCountryCode(event.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="phoneNumber">Phone number:</label>
                    <input
                        id="phoneNumber"
                        type="text"
                        value={phoneNumber}
                        onChange={event => setPhoneNumber(event.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="isActive">Active? </label>
                    <input
                        id="isActive"
                        type="checkbox"
                        checked={isActive}
                        onChange={() => setIsActive(previous => !previous)}
                    />
                </div>

                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </>
    )
}

export default EditEmployee
