import { createContext, useState, React } from "react";

const UserContext = createContext({
    user_id: null,
    user_name: null,
    user_email: null,
    user_token: null,

    clear: () => {},
    login: (id, name, email, token) => {}
});

export function UserContextProvider (props) {

    const [userLogin, setUserLogin] = useState({})

    function setLogin(id, name, email, token){
        setUserLogin({
            user_id: id,
            user_name: name,
            user_email: email,
            user_token: token
        })
    }

    function clearLogin(){
        setUserLogin({
            user_id: null,
            user_name: null,
            user_email: null,
            user_token: null
        })
        
    }

    const context = {
        user_id: userLogin.user_id,
        user_name: userLogin.user_name,
        user_email: userLogin.user_email,
        user_token: userLogin.user_token,

        login: setLogin,
        clear: clearLogin
    };

    return <UserContext.Provider value={context}>
        {props.children}
    </UserContext.Provider>
}

export default UserContext