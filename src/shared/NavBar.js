import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Navbar () {
  const languages = [{
    name: 'All',
    param: 'all'
  }, {
    name: 'JavaScript',
    param: 'javascript',
  }, {
    name: 'Ruby23',
    param: 'ruby',
  }, {
    name: 'Python123',
    param: 'python',
  }, {
    name: 'Java666888',
    param: 'java',
  }]

  return (
    <ul>
      {languages.map(({ name, param }) => (
        <li key={param}>
          <NavLink activeStyle={{fontWeight: 'bold'}} to={`/popular/${param}`}>
            {name}
          </NavLink>
        </li>
      ))}
    </ul>
  )
}