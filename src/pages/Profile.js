import React, {useContext, useEffect, Fragment} from 'react'
import {GithubContext} from '../context/github/githubContext'
import {Link} from 'react-router-dom'
import {Repos} from '../components/Repos'

export const Profile = ({match}) => {
  // const github = useContext(GithubContext)
  // console.log(match)
  const {getUser, getRepos, loading, user, repos} = useContext(GithubContext)

  const urlName = match.params.name

  useEffect(() => {
    // github.getUser(name)
    // github.getRepos(name)
    // console.log('Effect')
    getUser(urlName)
    getRepos(urlName)
    // eslint-disable-next-line
  }, [])

  if (loading) {
    return <p className="text-center">Загрузка...</p>
  }

  // return (
  //     <div>
  //       <h1>Profile page</h1>
  //     </div>
  // )

  const {
    name, company, avatar_url,
    location, bio, blog,
    login, html_url, followers,
    following, public_repos, public_gists
  } = user

  return (
      <Fragment>
        <Link to="/" className="btn btn-link">На главную</Link>

        <div className="card mb-4">
          <div className="card-body">
            <div className="row">
              <div className="col-sm-3 text-center">
                <img
                    src={avatar_url}
                    alt={name}
                    // style={{width: 150}}
                    style={{width: '150px'}}
                />
                <h1>{name}</h1>
                {location && <p>Location: {location}</p>}
              </div>
              <div className="col">
                {
                  bio && <Fragment>
                    <h3>BIO</h3>
                    <p>{bio}</p>
                  </Fragment>
                }
                <a
                    href={html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-dark"
                >Открыть профиль</a>
                <ul>
                  {login && <li>
                    <strong>Username: </strong> {login}
                  </li>}

                  {company && <li>
                    <strong>Company: </strong> {company}
                  </li>}

                  {blog && <li>
                    <strong>Website: </strong> {blog}
                  </li>}
                </ul>

                <div className="badge bg-primary">Followers: {followers}</div>
                <div className="badge bg-success">Following: {following}</div>
                <div className="badge bg-info">Repos: {public_repos}</div>
                <div className="badge bg-dark">Gists: {public_gists}</div>
              </div>
            </div>
          </div>
        </div>

        {/*{repos.join()}*/}
        <Repos repos={repos} />
      </Fragment>
  )
}