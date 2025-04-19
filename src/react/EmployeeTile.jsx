import react from 'react'

function EmployeeTile({ employee, changeDisplay, handleDeleteEmployee }) {
    return (
        <div>
            {employee.last_name}{', '}{employee.first_name}
            <button onClick={() => changeDisplay('editEmployee', employee)}>
                Edit
            </button>
            <button onClick={() => handleDeleteEmployee(employee)}>
                Delete
            </button>
        </div>
    )
}

export default EmployeeTile
