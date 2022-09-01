  import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import Vacation from './Vacation'
import { VictoryBar, VictoryChart, VictoryHistogram } from 'victory';


export default function Vacations({ history }) {

    const user = useSelector(state => state.user)

    const [vacations, setVacations] = useState([])
    const [followingVacations, setFollowingVacations] = useState([])
    const [searchBox, setearchBox] = useState("")

    useEffect(() => {
        (async () => {
            let vacations = await fetch(`http://localhost:2000/vacations?userId=${user.userId}`).then(res => res.json())
            let followingVacations = await fetch(`http://localhost:2000/follow?userId=${user.userId}`).then(res => res.json())
            setFollowingVacations(followingVacations)
            setVacations(vacations)
            console.log(vacations.map(v=>v.following))
        })()
    }, [])


    const toggoleFollow = async (id, shouldFollow) => {
        try {
            let followingVacations
            if (shouldFollow) {

                followingVacations = await fetch('http://localhost:2000/follow', {
                    method: "POST",
                    headers: { "content-type": "application/json", "Authorization": localStorage.token },
                    body: JSON.stringify({ userId: user.userId, vacId: id })
                }).then(res => res.json())
            } else {
                followingVacations = await fetch(`http://localhost:2000/follow/${id}?userId=${user.userId}`, {
                    method: "DELETE",
                    headers: { "Authorization": localStorage.token },
                }).then(res => res.json())
            }

            setFollowingVacations(followingVacations)
        } catch (error) {
        }
    }

    const handleSearch = async e => {
        e.preventDefault()
        try {
            let res = await fetch('http://localhost:2000/vacations/search', {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ searchBox })
            })
            let data = await res.json()
            setVacations(data)
        } catch (error) {

        }
    }

    const clearForm = async () => {
        let vacations = await fetch(`http://localhost:2000/vacations?userId=${user.userId}`).then(res => res.json())
        let followingVacations = await fetch(`http://localhost:2000/follow?userId=${user.userId}`).then(res => res.json())

        setFollowingVacations(followingVacations)
        setVacations(vacations)
    }


    const getDataForGraph = () => {
        return vacations &&vacations.filter(v=>v.following > 0).map(vacation => {
            return {
                x: vacation.description,
                y: vacation.following  
            }
        })
    }

    return (
        <div>
            {user.login ?
                (
                    <>
                        <h1>{user.name}</h1>
                        <form onSubmit={handleSearch}>
                            <input onChange={e => setearchBox(e.target.value)} type="text" placeholder="Search..." />
                            <button>Search</button>
                            <input type="reset" name="Reset" id="" onClick={clearForm} />
                        </form>
                    </>
                ) : (
                    <>
                        <Link to="/Signin" >Sign in</Link> if you have an account or
                        <Link to="/Signup">Sign up</Link>
                    </>
                )
            }

            {user.login && user.role === 'user' &&
                <>
                    <h1>Vacations you follow</h1>
                    <div className="vacations">
                        {followingVacations.map(f => (<Vacation toggoleFollow={toggoleFollow} key={f.id} vac={f} isChecked />))}
                    </div>
                    <h1>Vacation offers</h1>
                    <div className="vacations">
                        {vacations.filter(vacation => !followingVacations.find(fv => fv.id === vacation.id)).map(v => (<Vacation toggoleFollow={toggoleFollow} update={setVacations} key={v.id} vac={v} />))}
                    </div>
                </>
            }
            {user.login && user.role === "admin" &&
                <>
                    <div className="vacations">
                        {
                            vacations.map(v => (<Vacation follow={setFollowingVacations} update={setVacations} key={v.id} vac={v} />))}
                    </div>
                    <button onClick={(() => history.push('/add'))}>Add Vacation</button>
                    <VictoryChart>
                        <VictoryBar
                        data={getDataForGraph()}
                        x="x"
                        y="y"    
                        />
                    </VictoryChart>
                </>
            }
        </div>

    )
}
