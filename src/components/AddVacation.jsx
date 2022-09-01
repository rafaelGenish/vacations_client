 import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'

export default function AddVacation({history}) {
    
    let user = useSelector(state => state.user)

    useEffect( ()=> {
        if(!user.login || user.role !== 'admin') {
            history.push('/')
        }
    }, [])
    const [description, setdescription] = useState("")
    const [price, setprice] = useState("")
    const [picture, setpicture] = useState("")
    const [start, setstart] = useState("")
    const [end, setend] = useState("")

    const handleSubmit = async e => {
        try {
            let res = await fetch('http://localhost:2000/vacations/add', {
                method: "POST", 
                headers: {"content-type": "application/json", "Authorization": localStorage.token},
                body: JSON.stringify({description, price, picture, start, end})
            })
            let data = await res.json()
            console.log(data)
            // history.push('/')
        } catch (error) {
            
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>ADD</h1>
                <input onChange={e=>setdescription(e.target.value)} type="text" placeholder="Description" />
                <input onChange={e=>setprice(e.target.value)} type="text" placeholder="Price" />
                <input onChange={e=>setpicture(e.target.value)} type="text" placeholder="Link to picture" />
                <input onChange={e=>setstart(e.target.value)} type="datetime-local" placeholder="Start" />
                <input onChange={e=>setend(e.target.value)} type="datetime-local" placeholder="End" />
                <button>Add</button>
            </form>
        </div>
    )
}
