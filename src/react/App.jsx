import { useState } from 'react'
import DepartmentList from './DepartmentList'
import AddDepartment from './AddDepartment'
import EditDepartment from './EditDepartment'
import AddEmployee from './AddEmployee'
import EditEmployee from './EditEmployee'

function App() {
    const [currentDisplay, setCurrentDisplay] = useState('departmentList')

    const handleDisplayChange = displayOption => {
        setCurrentDisplay(displayOption)
    }

    let displayComponent

    if (currentDisplay === 'addDepartment') {
        displayComponent = <AddDepartment />
    } else if (currentDisplay === 'editDepartment') {
        displayComponent = <EditDepartment />
    } else if (currentDisplay === 'addEmployee') {
        displayComponent = <AddEmployee />
    } else if (currentDisplay === 'editEmployee') {
        displayComponent = <EditEmployee />
    } else {
        displayComponent = <DepartmentList />
    }

    return (
        <>
            <button onClick={() => handleDisplayChange('departmentList')}>
                Home
            </button>
            <button onClick={() => handleDisplayChange('addDepartment')}>
                Add Department
            </button>
            <button onClick={() => handleDisplayChange('addEmployee')}>
                Add Employee
            </button>
            {displayComponent}          
        </>
    )
}

export default App
