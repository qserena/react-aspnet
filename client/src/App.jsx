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
        isFriendly: false,
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
        if (formData.firstName === '') {
            alert('First Name is required')
            return
        }

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
        getEmployees()
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
        getEmployees()
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
        getEmployees()
    }

    function handleChange(e) {
        const { type, name, value, checked } = e.target
        const convertedValue = type === 'radio' ? parseInt(value) : value
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: type === 'checkbox' ? checked : convertedValue,
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
            isSelected={item.id === formData.id}
        ></EmployeeItem>
    ))

    return (
        <div className="container">
            <h1>Admin Form</h1>
            <div className="main">
                <div className="left">
                    <h2>Employee</h2>
                    <div className="form">
                        <div id="form-left">
                            <label htmlFor="firstName">First Name *</label>
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
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                onChange={handleChange}
                                id="email"
                                name="email"
                                value={formData.email}
                            />
                            <label htmlFor="comments" className="htmlFor">
                                Comments
                            </label>
                            <textarea
                                onChange={handleChange}
                                id="comments"
                                name="comments"
                                value={formData.comments}
                            />
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    onChange={handleChange}
                                    id="isFriendly"
                                    name="isFriendly"
                                    checked={formData.isFriendly}
                                    className="checkbox"
                                />
                                Are you friendly?
                            </label>
                            <label htmlFor="birthYear">Birth Year</label>
                            <input
                                type="number"
                                onChange={handleChange}
                                id="birthYear"
                                name="birthYear"
                                value={formData.birthYear}
                            />
                            <label htmlFor="weight">Weight</label>
                            <input
                                type="number"
                                onChange={handleChange}
                                id="weight"
                                name="weight"
                                value={formData.weight}
                            />
                        </div>
                        <div id="form-right">
                            <fieldset>
                                <legend>Current employment status</legend>
                                <label>
                                    <input
                                        type="radio"
                                        onChange={handleChange}
                                        id="fullTime"
                                        name="employmentStatus"
                                        value={1}
                                        checked={
                                            formData.employmentStatus === 1
                                        }
                                    />
                                    Full Time
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        onChange={handleChange}
                                        id="partTime"
                                        name="employmentStatus"
                                        value={2}
                                        checked={
                                            formData.employmentStatus === 2
                                        }
                                    />
                                    Part Time
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        onChange={handleChange}
                                        id="contractor"
                                        name="employmentStatus"
                                        value={3}
                                        checked={
                                            formData.employmentStatus === 3
                                        }
                                    />
                                    Contractor
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        onChange={handleChange}
                                        id="temp"
                                        name="employmentStatus"
                                        value={4}
                                        checked={
                                            formData.employmentStatus === 4
                                        }
                                    />
                                    Temp
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        onChange={handleChange}
                                        id="intern"
                                        name="employmentStatus"
                                        value={5}
                                        checked={
                                            formData.employmentStatus === 5
                                        }
                                    />
                                    Intern
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        onChange={handleChange}
                                        id="retired"
                                        name="employmentStatus"
                                        value={6}
                                        checked={
                                            formData.employmentStatus === 6
                                        }
                                    />
                                    Retired
                                </label>
                            </fieldset>
                            <br />

                            <label htmlFor="favoriteColor">
                                Favorite Color
                            </label>
                            <select
                                id="favoriteColor"
                                name="favoriteColor"
                                value={formData.favoriteColor}
                                onChange={handleChange}
                            >
                                <option value={0}>-- Choose --</option>
                                <option value={1}>Red</option>
                                <option value={2}>Orange</option>
                                <option value={3}>Yellow</option>
                                <option value={4}>Green</option>
                                <option value={5}>Blue</option>
                                <option value={6}>Indigo</option>
                                <option value={7}>Violet</option>
                            </select>
                            <br />
                        </div>
                    </div>

                    <div className="buttons">
                        <button
                            id="addButton"
                            disabled={formData.firstName === ''}
                            onClick={() => addClick()}
                        >
                            Add
                        </button>
                        <button
                            id="updateButton"
                            disabled={formData.id === ''}
                            onClick={() => updateClick()}
                        >
                            Update
                        </button>
                        <button
                            id="deleteButton"
                            disabled={formData.id === ''}
                            onClick={() => deleteClick()}
                        >
                            Delete
                        </button>
                    </div>
                </div>

                <div className="right">
                    <h2>Employees</h2>
                    <ul className="list">{employeeList}</ul>
                </div>
            </div>
        </div>
    )
}

export default App
