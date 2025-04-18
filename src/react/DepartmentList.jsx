import { useState, useEffect } from 'react'

function DepartmentList() {
    const [departments, setDepartments] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const baseUrl = import.meta.env.VITE_API_BASE_URL

    const getDepartments = async () => {
        try {
            const response = await fetch(baseUrl.concat('/api/v1/department'))
            if (!response.ok) {throw new Error('Error in fetch')}
            const data = await response.json()
            setDepartments(data)
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }        
    }

    useEffect(() => {
        getDepartments()
    }, [])

    const departmentsDisplay = departments.map(department => {
        <div>{department.name}</div>
    })

    return (
        <>
            <h2>Departments and Employees</h2>
            <div>{error}</div>
            {departmentsDisplay}
        </>
    )
}

export default DepartmentList
