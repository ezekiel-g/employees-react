import { useState, useEffect } from 'react'
import EmployeeTile from './EmployeeTile'

function DepartmentTile({
        department,
        baseUrl,
        changeDisplay,
        handleDeleteDepartment
    }) {
    const [employees, setEmployees] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const getEmployees = async () => {
        try {
            const response = await fetch(`${baseUrl}/api/v1/employees`)
            if (!response.ok) {
                throw new Error('Error fetching employees')
            }
            const data = await response.json()
            const departmentEmployees = data.filter(
                employee => employee.department_id === department.id
            )
            departmentEmployees.sort((a, b) => {
                return a.last_name.localeCompare(b.last_name)
            })
            setEmployees(departmentEmployees)
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleDeleteEmployee = async employee => {
        const isConfirmed = window.confirm(
            `Delete ${employee.last_name}, ${employee.first_name}?`
        )
        if (!isConfirmed) { return }

        try {
            const response = await fetch(
                `${baseUrl}/api/v1/employees/${employee.id}`, { method: 'DELETE' }
            )
            if (response.ok) {
                setEmployees(previousEmployees => previousEmployees.filter(
                    previousEmployee => previousEmployee.id !== employee.id
                ))
                alert('Employee deleted successfully')
            } else {
                throw new Error('Error deleting employee')
            }
        } catch (error) {
            setError(error.message)
        }
    }

    useEffect(() => {
        getEmployees()
    }, [])

    const employeesDisplay = employees.map(employee => {
        return (
            <EmployeeTile
                key={employee.id}
                employee={employee}
                changeDisplay={changeDisplay}
                handleDeleteEmployee={handleDeleteEmployee}
            />
        )
    })

    return (
        <>
            <h2>{department.name}</h2>
            <button onClick={() => changeDisplay('editDepartment', department)}>
                Edit
            </button>
            <button onClick={() => handleDeleteDepartment(department)}>
                Delete
            </button>
            <div>{error}</div>
            {employeesDisplay}
        </>
    )
}

export default DepartmentTile
