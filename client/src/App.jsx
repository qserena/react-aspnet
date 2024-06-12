import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
    const API_URL = 'http://localhost:4000/'

    const [formData, setFormData] = useState({
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        comments: '',
        isFriendly: true,
        employment: '',
        favColor: '',
    })

    const [employees, setEmployees] = useState([])

    useEffect(() => {
        getEmployees()
    }, [])

    async function getEmployees() {
        const res = await axios.get(API_URL + 'api/Employee/GetEmployees')

        setEmployees(
            res.data.map((elem) => ({
                key: elem.Id,
                id: elem.Id,
                firstName: elem.FirstName,
                lastName: elem.LastName,
                isFriendly: elem.isFriendly,
                employment: elem.Employment,
                favColor: elem.FavColor,
            }))
        )

        // setFormData((prevData) => ({
        //     ...prevData,
        //     databaseId: employee.id,
        //     firstName: employee.first_name,
        //     lastName: employee.last_name,
        //     isFriendly: employee.is_friendly,
        // }))
    }

    async function addClick() {
        const data = new FormData()
        data.append('employee', formData)
        console.log('Add' + JSON.stringify(formData, null, 4))
        const res = await fetch(API_URL + 'api/Employee/AddEmployee', {
            method: 'POST',
            body: employee,
        })
        const result = await res.json()
    }

    function handleChange(e) {
        const { type, name, value, checked } = e.target

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: type === 'checkbox' ? checked : value,
        }))
    }

    function handleSubmit(e) {
        e.preventDefault()
    }

    const employeeList = employees.map((employee) => (
        <li
            key={employee.id}
        >{`${employee.firstName} ${employee.lastName}`}</li>
    ))

    return (
        <div className="container">
            <h1>Test Form</h1>
            <div className="main">
                <div className="form" onSubmit={handleSubmit}>
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        onChange={handleChange}
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                    />
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        onChange={handleChange}
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                    />
                    <label htmlFor="isFriendly">Are you friendly?</label>
                    <input
                        type="checkbox"
                        onChange={handleChange}
                        id="isFriendly"
                        name="isFriendly"
                        checked={formData.isFriendly}
                    />
                    <div className="buttons">
                        <button id="addButton" onClick={addClick}>
                            Add
                        </button>
                        <button id="updateButton">Update</button>
                    </div>
                </div>
                <ul id="list">{employeeList}</ul>
            </div>
        </div>
    )
}

export default App
