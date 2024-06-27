import React from 'react'

const EmployeeItem = ({ employee, setForm, isSelected } = props) => {
    const currentYear = new Date().getFullYear()
    const birthString =
        employee.birthYear > 0 ? `, ${currentYear - employee.birthYear}` : ''

    const thisId = `employee-item-${employee.id}`
    const listItem = document.getElementById(thisId)

    if (isSelected) {
        listItem?.classList?.add('selected')
    } else {
        listItem?.classList?.remove('selected')
    }

    return (
        <li
            onClick={() => setForm(employee)}
            id={thisId}
            className="employee-item"
        >
            {`${employee.firstName} ${employee.lastName}` + birthString}
        </li>
    )
}

export default EmployeeItem
