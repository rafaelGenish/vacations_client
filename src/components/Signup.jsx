import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Signup({ history }) {

    const [name, setname] = useState("")
    const [lname, setlname] = useState("")
    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")
    const [error, seterror] = useState("")

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            let res = await fetch('http://localhost:2000/users/signup', {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ name, lname, username, password })
            })
            let data = await res.json()
            console.log(data)
            if (data.error) {
                seterror(data.msg)
            } else {
                localStorage.token = data.token
                history.push('/signin')
            }
        } catch (error) {

        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>SIGN UP</h1>
                <input onChange={e => setname(e.target.value)} type="text" placeholder="Name" />
                <input onChange={e => setlname(e.target.value)} type="text" placeholder="Last Name" />
                <input onChange={e => setusername(e.target.value)} type="text" placeholder="Username" />
                <input onChange={e => setpassword(e.target.value)} type="password" placeholder="Password" />
                <button>CREATE ACCOUNT</button>
                <span>{error}</span>
            </form>
            <p>already have an account? <Link to="/login">Sign in</Link> </p>
        </div>
    )
}
