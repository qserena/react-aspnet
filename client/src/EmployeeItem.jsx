import React from 'react'

const EmployeeItem = ({ employee, setForm, isSelected } = props) => {
    const currentYear = new Date().getFullYear()
    const birthString =
        employee.birthYear > 0 ? `, ${currentYear - employee.birthYear}` : ''
    const styles = {
        backgroundColor: isSelected ? '#F1F1F1' : '#FFFFFF',
    }

    return (
        <li
            onClick={() => setForm(employee)}
            className="employee-item"
            style={styles}
        >
            {`${employee.firstName} ${employee.lastName}` + birthString}
        </li>
    )
}

export default EmployeeItem
