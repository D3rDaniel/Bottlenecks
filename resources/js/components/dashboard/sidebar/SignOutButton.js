import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const SignOutButton = (props) => {

  const navigate = useNavigate();

  const logout = () => {
    const url = "http://sl-vinf-bordbame.hof-university.de:80/api/logout";

    axios.post(url, "-",  {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + props.token
        }
      })
      .then(function() {
        navigate('/login');
      }).catch(function(response){
        console.log(response);
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