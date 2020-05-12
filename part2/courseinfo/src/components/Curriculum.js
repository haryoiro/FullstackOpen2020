import React from 'react'

import Course from './Course'

const Curriculum = ({ course }) => {
  return (
    <div>{course.map((course) => (
      <Course course={course} />
    ))}
    </div>
  )
}

export default Curriculum