import React from 'react'

const EmployeeItem = ({ employee, setForm } = props) => {
    return (
        <li onClick={() => setForm(employee)}>
            {`Id: ${employee.id} ${employee.firstName} ${employee.lastName}`}
        </li>
    )
}

export default EmployeeItem
