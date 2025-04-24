import { useState, useEffect } from 'react'
import DepartmentTile from './DepartmentTile'

function DepartmentList({ baseUrl, changeDisplay }) {
    const [departments, setDepartments] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const getDepartments = async () => {
        try {
            const response = await fetch(`${baseUrl}/api/v1/departments`)
            if (!response.ok) {throw new Error('Error in fetch')}
            const data = await response.json()
            data.sort((a, b) => {
                return a.name.localeCompare(b.name)
            })
            setDepartments(data)
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }        
    }

    const handleDeleteDepartment = async department => {
        const isConfirmed = window.confirm(`Delete ${department.name}?`)
        if (!isConfirmed) { return }

        try {
            const response = await fetch(
                `${baseUrl}/api/v1/departments/${department.id}`, {
                    method: 'DELETE'
                }
            )
            if (response.ok) {
                setDepartments(previousDepartments => previousDepartments.filter(
                    previousDepartment => previousDepartment.id !== department.id
                ))
                alert('Department deleted successfully')
            } else {
                throw new Error('Error deleting department')
            }
        } catch (error) {
            setError(error.message)
        }
    }

    useEffect(() => {
        getDepartments()
    }, [])

    const departmentsDisplay = departments.map(department => {
        return (
            <div key={department.id} className="col-12 col-sm-6 col-lg-4 mb-3">
                <div className="card border border-dark rounded-0">
                    <DepartmentTile
                        department={department}
                        baseUrl={baseUrl}
                        changeDisplay={changeDisplay}
                        handleDeleteDepartment={handleDeleteDepartment}
                    />
                </div>
            </div>
        )
    })

    return (
        <>
            <h1>Departments and Employees</h1><br />
            <div>{error}</div>
            <div className="container">
                <div className="row">{departmentsDisplay}</div>
            </div>
                
            
        </>
    )
}

export default DepartmentList
