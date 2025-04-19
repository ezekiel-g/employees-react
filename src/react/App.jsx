import { useState } from 'react'
import DepartmentList from './DepartmentList'
import AddDepartment from './AddDepartment'
import EditDepartment from './EditDepartment'
import AddEmployee from './AddEmployee'
import EditEmployee from './EditEmployee'

function App() {
    const [currentDisplay, setCurrentDisplay] = useState('departmentList')
    const [currentDepartment, setCurrentDepartment] = useState(null)
    const [currentEmployee, setCurrentEmployee] = useState(null)

    const baseUrl = import.meta.env.VITE_API_BASE_URL

    const changeDisplay = (displayOption, objectToEdit) => {
        if (displayOption === 'editDepartment') {
            setCurrentDepartment(objectToEdit)
        } else if (displayOption === 'editEmployee') {
            setCurrentEmployee(objectToEdit)
        }

        setCurrentDisplay(displayOption)
    }

    let displayComponent

    if (currentDisplay === 'addDepartment') {
        displayComponent =
            <AddDepartment
                baseUrl={baseUrl}
            />
    } else if (currentDisplay === 'editDepartment') {
        displayComponent =
            <EditDepartment
                currentDepartment={currentDepartment}
                baseUrl={baseUrl}
                changeDisplay={changeDisplay}
            />
    } else if (currentDisplay === 'addEmployee') {
        displayComponent =
            <AddEmployee
                baseUrl={baseUrl}
            />
    } else if (currentDisplay === 'editEmployee') {
        displayComponent =
            <EditEmployee
                currentEmployee={currentEmployee}
                baseUrl={baseUrl}
                changeDisplay={changeDisplay}
            />
    } else {
        displayComponent =
            <DepartmentList
                baseUrl={baseUrl}
                changeDisplay={changeDisplay}
            />
    }

    return (
        <>
            <button onClick={() => changeDisplay('departmentList')}>
                Home
            </button>
            <button onClick={() => changeDisplay('addDepartment')}>
                Add department
            </button>
            <button onClick={() => changeDisplay('addEmployee')}>
                Add employee
            </button>
            {displayComponent}          
        </>
    )
}

export default App
