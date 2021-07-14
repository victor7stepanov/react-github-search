import React, {useContext, useState} from 'react'
import {AlertContext} from '../context/alert/alertContext'
import {GithubContext} from '../context/github/githubContext'

export const Search = () => {
  const [value, setValue] = useState('')
  // const {show} = useContext(AlertContext)
  const alert = useContext(AlertContext)
  const github = useContext(GithubContext)

  const onSubmit = event => {
    if (event.key !== 'Enter') {
      // show('This is alert!')
      // console.log(value)
      return
    }

    github.clearUsers()

    if (value.trim()) {
      // console.log('Make request with: ', value)
      alert.hide()
      github.search(value.trim())
    } else {
      alert.show('Введите данные пользователя!')
    }
  }

  return (
      <div className="form-group">
        <input
            type="text"
            className="form-control"
            placeholder="Введите ник пользователя..."
            value={value}
            onChange={event => setValue(event.target.value)}
            onKeyPress={onSubmit}
        />
      </div>
  )
}