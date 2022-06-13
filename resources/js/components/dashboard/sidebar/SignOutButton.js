import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const SignOutButton = (props) => {
  
  const logout = () => {
    const url = "http://127.0.0.1:8000/api/logout";

    axios.post(url, {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + props.token
        }
      })
      .then(function(res) {
        console.log(res);
      });
  }

  return (
    <button className="bg-red text-white w-36 h-8 m-2 mt-7 
                      hover:border-2 rounded-xl border-black hover:font-bold hover:cursor-pointer` "
            onClick={logout}
    >Abmelden</button>
  )
}

export default SignOutButton