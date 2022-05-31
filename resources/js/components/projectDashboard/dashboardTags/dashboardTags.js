import React from 'react'

import TagElement from './TagElement'
import Input from './TagInputField'

const tags = [
    {name : "Tag1"},
    {name : "Tag2"},
    {name : "Tag3"},
]

const dashboardTags = () => {

  return (
    <div className="flex w-screen h-screen justify-center items-center">
        <div className="flex flex-col justify-between bg-white h-2/3 w-2/3 rounded-xl">
            <div>
                <h1 className="font-bold mt-4 ml-5 text-xl">Tags</h1>
                <div className=" mt-5 ml-10">
                    {tags.map((tag, index) => {
                        return (
                            <TagElement
                                name={tag.name}>
                            </TagElement>
                        )
                    })}
                </div>  
            </div>
            <Input />
        </div>
    </div>
  )
}

export default dashboardTags