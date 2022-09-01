import React, { useState } from 'react'
import decode from 'jwt-decode'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'


export default function Signin({ history }) {
    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")
    const [error, seterror] = useState("")

    const dispatch = useDispatch()

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            let res = await fetch('http://localhost:2000/users/signin', {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ username, password })
            })
            let data = await res.json()
            console.log(data)
            if (data.error) {
                seterror(data.msg)
                delete localStorage.token
            } else {
                localStorage.token = data.token
                let { id, name, role } = decode(localStorage.token)
                dispatch({ type: "LOGIN", payload: { id, name, role }})
                console.log(dispatch({ type: "LOGIN", payload: { id, name, role }}))
                history.push('/')
            }
        } catch (error) {

        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>SIGN IN</h1>
                <input onChange={e=>setusername(e.target.value)} type="text" placeholder="username" />
                <input onChange={e=>setpassword(e.target.value)} type="password" placeholder="password" />
                <button>SIGN IN</button>
                <span>{error}</span>
            </form>
            <p>don't have an account yet? <Link to="/signup">Sign up</Link> </p>
        </div>
    )
}
