import { useState } from 'react'
import validateDepartment from '../utilities/validateDepartment.jsx'
function EditDepartment({ currentDepartment, baseUrl, changeDisplay }) {
    const [name, setName] = useState(currentDepartment.name)
    const [code, setCode] = useState(currentDepartment.code)
    const [location, setLocation] = useState(currentDepartment.location)
    const [isActive, setIsActive] = useState(!!currentDepartment.is_active)
    const [errors, setErrors] = useState([])

    const handleEditDepartment = async event => {
        const isConfirmed = window.confirm('Update department?')
        if (!isConfirmed) { return }

        event.preventDefault()

        setErrors([])

        const newErrors = []

        const nameValidation = validateDepartment.validateName(name)
        if (!nameValidation.valid) newErrors.push(nameValidation.message)

        const codeValidation = validateDepartment.validateCode(code)
        if (!codeValidation.valid) newErrors.push(codeValidation.message)

        const locationValidation = validateDepartment.validateLocation(location)
        if (!locationValidation.valid) newErrors.push(locationValidation.message)

        const isActiveValidation = validateDepartment.validateIsActive(isActive)
        if (!isActiveValidation.valid) newErrors.push(isActiveValidation.message)

        if (newErrors.length > 0) {
            setErrors(newErrors)
            return
        }

        const departmentData = {
            name,
            code,
            location,
            is_active: isActive
        }

        try {
            const response = await fetch(
                `${baseUrl}/api/v1/departments/${currentDepartment.id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(departmentData)
                }
            )

            if (!response.ok) {
                throw new Error('Error updating department')
            }

            alert('Department updated successfully')
            changeDisplay('departmentList')
        } catch (error) {
            setErrors([error.message])
        }
    }

    const errorDisplay = errors.map((error, index) => {
        return <div key={index}>{error}</div>
    })

    return (
        <>
            <h1>Edit Department</h1><br />

            <div>{errorDisplay}</div>

            <form onSubmit={handleEditDepartment} noValidate>
                <div>
                    <label htmlFor="name">Department name: </label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={event => setName(event.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="code">Department code: </label>
                    <input
                        id="code"
                        type="text"
                        value={code}
                        onChange={event => setCode(event.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="location">Location: </label>
                    <select
                        id="location"
                        value={location}
                        onChange={event => setLocation(event.target.value)}
                    >
                        <option value="">Select location</option>
                        <option value="New York">New York</option>
                        <option value="San Francisco">San Francisco</option>
                        <option value="London">London</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="is_active">Active? </label>
                    <input
                        id="is_active"
                        type="checkbox"
                        checked={isActive}
                        onChange={() => setIsActive(previous => !previous)}
                    />
                </div><br />

                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </>
    )
}

export default EditDepartment
