let initalUser = {
    login: false
}

const user = (state = initalUser, action) => {
    switch (action.type) {
        case "LOGIN":
            let newState = {
                login: true,
                userId: action.payload.id,
                name: action.payload.name,
                role: action.payload.role
            }
            return newState
        case "LOGOUT":
            return initalUser
        default:
           return state 
    }
}

module.exports = user