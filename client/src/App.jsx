import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
    const API_URL = 'http://localhost:4000/'

    const emptyForm = {
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        comments: '',
        isFriendly: true,
        birthYear: 0,
        weight: 0,
        employmentStatus: 0,
        favoriteColor: 0,
    }

    const [formData, setFormData] = useState(emptyForm)
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
                email: elem.Email,
                comments: elem.Comments,
                isFriendly: elem.IsFriendly,
                birthYear: elem.BirthYear,
                weight: elem.Weight,
                employmentStatus: elem.EmploymentStatus,
                favoriteColor: elem.FavoriteColor,
            }))
        )
    }

    async function addClick() {
        console.log('Add')
        const data = {
            Id: formData.id,
            FirstName: formData.firstName,
            LastName: formData.lastName,
            Email: formData.email,
            Comments: formData.comments,
            IsFriendly: formData.isFriendly,
            BirthYear: formData.birthYear,
            Weight: formData.weight,
            EmploymentStatus: formData.employmentStatus,
            FavoriteColor: formData.favoriteColor,
        }

        try {
            const response = await axios.post(
                API_URL + 'api/Employee/AddEmployee',
                data
            )

            console.log(response)
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data)
                console.log(error.response.status)
                console.log(error.response.headers)
            } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request)
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message)
            }
            console.log(error.config)
        }
    }

    function handleChange(e) {
        const { type, name, value, checked } = e.target

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: type === 'checkbox' ? checked : value,
        }))
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
                <div className="form">
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
                        <button id="addButton" onClick={() => addClick()}>
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
