import React, { useState } from 'react'
import { useEffect } from 'react'

export default function EditVacation({match, history}) {

    const [description, setdescription] = useState("")
    const [price, setprice] = useState("")
    const [picture, setpicture] = useState("")
    const [start, setstart] = useState("")
    const [end, setend] = useState("")

    useEffect(()=> {
        (async () => {
            let res = await fetch('http://localhost:2000/vacations/' + match.params.id)
            let data = await res.json()
            console.log(data)
            setdescription(data.description)
            setprice(data.price)
            setpicture(data.picture)

        })()
    }, [])
    const handleSubmit = async e => {
        e.preventDefault()
        try {
            let res = await fetch('http://localhost:2000/vacations/' + match.params.id, {
                method: "PUT", 
                headers: {"content-type": "application/json", "Authorization": localStorage.token},
                body: JSON.stringify({description, price, picture, start, end})
            })
            let data = await res.json()
            console.log(data)
            history.push('/')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input value={description} onChange={e=>setdescription(e.target.value)} type="text" placeholder="Description" />
                <input value={price} onChange={e=>setprice(e.target.value)} type="text" placeholder="Price" />
                <input value={picture} onChange={e=>setpicture(e.target.value)} type="text" placeholder="Picture" />
                <input value={start} onChange={e=>setstart(e.target.value)} type="date" placeholder="Start" />
                <input value={end} onChange={e=>setend(e.target.value)} type="date" placeholder="End" />
                <button>Save Changes</button>
            </form>
        </div>
    )
}
