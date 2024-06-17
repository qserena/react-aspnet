import React from 'react'

const EmployeeItem = ({ employee, setForm } = props) => {
    const currentYear = new Date().getFullYear()
    const birthString =
        employee.birthYear > 0 ? `, ${currentYear - employee.birthYear}` : ''
    return (
        <li onClick={() => setForm(employee)}>
            {`${employee.firstName} ${employee.lastName}` + birthString}
        </li>
    )
}

export default EmployeeItem
