import React from "react"
import { PartProps } from "../types"

const Part: React.FC<PartProps> = ({ part }) => {
  switch (part.type) {
    case "normal":
      return (
        <div>
          <h3>{part.name}</h3>
          <br></br> Exercises:{part.exerciseCount} <br></br>Description:
          {part.description}
        </div>
      )
    case "submission":
      return (
        <div>
          <h3>{part.name}</h3>
          <br></br> Exercises:{part.exerciseCount} <br></br>Description:
          {part.description}
          <br></br>
          <a href={part.exerciseSubmissionLink}>
            {part.exerciseSubmissionLink}
          </a>
        </div>
      )
    case "groupProject":
      return (
        <div>
          <h3>{part.name}</h3>
          <br></br> Exercises:{part.exerciseCount} <br></br>Group projects:
          {part.groupProjectCount}
        </div>
      )
    case "special":
      return (
        <div>
          <h3>{part.name}</h3>
          <br></br> Exercises:{part.exerciseCount} <br></br>Requirements:
          {JSON.stringify(part.requirements)}
        </div>
      )
    default:
      return <div></div>
  }
}
export default Part
