import React from "react"
import Part from "./Part"
import CoursePart from "../types"

const Content: React.FC<{ parts: CoursePart[] }> = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part part={part} key={part.name} />
      ))}
    </div>
  )
}

export default Content
