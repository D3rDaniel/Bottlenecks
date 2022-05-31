import React from 'react'

import Searchbar from './searchbar/SearchBar'
import MinView from './AnkuendigungMinimumView'

const messages = [
    {subject : "Ankündigung 1" , creator : "Maximilian" , created_at :  "22.04.2022" , message : "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."},
    {subject : "Ankündigung 2" , creator : "Frodo" , created_at :  "22.04.2022" , message : "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."},
    {subject : "Ankündigung 2" , creator : "Hercules" , created_at :  "22.04.2022" , message : "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."}
]
const dashboardAnkuendigung = () => {
  return (
      <div className="flex flex-col w-full mx-1 my-2">
        <Searchbar />

        <div className="h-full w-full">
            {messages.map((message, index) => {
                return (
                    <MinView 
                        message = {message}
                        key = {index}
                    ></MinView>
                )
            })}
        </div>
      </div>
  )
}

export default dashboardAnkuendigung