import React from 'react'

function EmployeeTile({ employee, changeDisplay, handleDeleteEmployee }) {
    return (
        <div className="d-flex border rounded-0 p-1">
            {employee.last_name}{', '}{employee.first_name}
            <div className="ms-auto">
                <button onClick={() => changeDisplay('editEmployee', employee)}>
                    Edit
                </button>
                <button onClick={() => handleDeleteEmployee(employee)}>
                    Delete
                </button>
            </div>
        </div>
    )
}

export default EmployeeTile
