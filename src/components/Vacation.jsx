import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import Switch from '@material-ui/core/Switch'
import { useState } from 'react'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import Badge from '@material-ui/core/Badge'
import LocalOfferIcon from '@material-ui/icons/LocalOffer'

export default function Vacation({ update, vac, toggoleFollow, isChecked }) {
    
    const user = useSelector(state => state.user)
    
    const [check, setcheck] = useState(isChecked)
    
    const handleDelete = async () => {
        let res = await fetch('http://localhost:2000/vacations/' + vac.id, {
            method: "DELETE",
            headers: { "Authorization": localStorage.token }
        })
        let data = await res.json()
        console.log(data)
        update(data)
    }
    
    const handelToggol = async e => {
        const on = e.target.checked
        setcheck(on)
        toggoleFollow(vac.id, on)
    }
    
    const useStyles = makeStyles((theme) => ({
        root: {
            '& > *': {
                margin: theme.spacing(4),
            },
        },
    }));
    
    const classes = useStyles();
      const defaultProps = {
        color: 'secondary',
        children: <LocalOfferIcon />,
      };
    return (
        
        <Paper className="card" elevation={3}>
        <div className="vacation">
            {user.login && user.role === "user" &&
                <Switch
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                    checked={check}
                    onChange={handelToggol}
                    inputProps={{ "aria-label": "FOLLOW" }}
                    color="primary"
                />}
            {user.login && user.role === "admin" &&
                <>
                    <ButtonGroup>
                        <Button variant="contained" color="primary" startIcon={<EditIcon />} onClick={handleDelete}>Delete</Button>
                        <Button variant="contained" color="primary" startIcon={<DeleteIcon />}>{<Link to={'/edit/' + vac.id}>Edit</Link>}</Button>
                    </ButtonGroup>
                    <p className={classes.root}>
                    <Badge badgeContent={vac.following} {...defaultProps}></Badge>
                    </p>
                </>
            }
            <img src={vac.picture} />
            <h1>{vac.description}</h1>
            <h3>Price: ${vac.price}</h3>
            <h3>Start: {vac.date_start}</h3>
            <h3>End: {vac.date_end}</h3>
        </div>
        </Paper>
    )
}
