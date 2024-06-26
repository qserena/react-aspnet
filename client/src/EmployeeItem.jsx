import React from 'react'

const EmployeeItem = ({ employee, setForm, isSelected } = props) => {
    const currentYear = new Date().getFullYear()
    const birthString =
        employee.birthYear > 0 ? `, ${currentYear - employee.birthYear}` : ''

    if (isSelected) {
        console.log('selected')
    } else {
        console.log('NOT!')
    }

    const thisId = `employee-item-${employee.id}`

    //const listItem = document.getElementById(`employee-item-${employee.id}`)
    const listItem = document.getElementById(thisId)

    listItem.classList.add('employee-item')
    if (isSelected) {
        console.log('selected')
        listItem.classList.add('selected')
    } else {
        console.log('NOT!')
        listItem.classList.remove('selected')
    }

    console.log(listItem.classList)

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
