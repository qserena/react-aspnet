import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import EmployeeItem from './EmployeeItem'

function App() {
    const BASE_URL = 'http://localhost:4000/api/Employee/'

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
        try {
            const res = await axios.get(BASE_URL + 'GetEmployees')

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
        } catch (error) {
            handleAxiosError(error)
        }
    }

    async function addClick() {
        const data = {
            Id: '',
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
            const response = await axios.post(BASE_URL + 'AddEmployee', data)
            setFormData(emptyForm)
        } catch (error) {
            handleAxiosError(error)
        }
    }

    async function updateClick() {
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
            const response = await axios.put(
                BASE_URL + `UpdateEmployee?id=${data.Id}`,
                data
            )
            setFormData(emptyForm)
        } catch (error) {
            handleAxiosError(error)
        }
    }

    async function deleteClick() {
        try {
            const response = await axios.delete(
                BASE_URL + `DeleteEmployee?id=${formData.id}`
            )
            setFormData(emptyForm)
        } catch (error) {
            handleAxiosError(error)
        }
    }

    function handleChange(e) {
        const { type, name, value, checked } = e.target

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: type === 'checkbox' ? checked : value,
        }))
    }

    function handleAxiosError(error) {
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

    const employeeList = employees.map((item) => (
        <EmployeeItem
            key={item.id}
            employee={item}
            setForm={() => setFormData(item)}
        ></EmployeeItem>
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
                        <button id="updateButton" onClick={() => updateClick()}>
                            Update
                        </button>
                        <button id="deleteButton" onClick={() => deleteClick()}>
                            Delete
                        </button>
                    </div>
                </div>
                <ul id="list">{employeeList}</ul>
            </div>
        </div>
    )
}

export default App
