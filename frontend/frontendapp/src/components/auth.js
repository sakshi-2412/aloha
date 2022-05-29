// User details and authentication with token

import { useEffect, useState, useContext, createContext } from 'react'
import { useCookies } from 'react-cookie'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {

  // details of logged-in user that can be accessed throught the app
  const [profileName, setProfileName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [idUser, setIdUser] = useState('')
  const [banned, setBanned] = useState(false)
  const [avatarImage, setAvatarImage] = useState('#')

  // auth token and cookies
  const [cookies, setCookies, removeCookies] = useCookies(['token'])
  const token = cookies.token
  const setToken = (newToken) => setCookies('token', newToken, { path: '/' })
  const deleteToken = () => removeCookies('token')

  const logout = () => {
    deleteToken()
    setProfileName('')
    setAvatarImage('#')
    setEmail('')
    setUsername('')
    setIdUser('')
    setBanned(false)
  }

  useEffect(() => {

    // fetch details of logged-in user if token present
    if(token) {
      fetch('http://127.0.0.1:8000/auth/profile/', {
          method: 'POST',
          headers: {
              Authorization: 'Token ' + token,
            },
        })
        .then( data => data.json())
        .then(
          data => {
            setAvatarImage("http://127.0.0.1:8000/media/"+data.photo);
            setProfileName(data.first_name);
            setIdUser(data.id);
            setBanned(data.banned);
            setEmail(data.email);
            setUsername(data.username);
          }
        )
        .catch( error => console.error(error))
    }
  }, [setAvatarImage, setProfileName, setIdUser, setBanned, token, setUsername, setEmail])


  // accessable parameters
  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        profileName,
        avatarImage,
        email,
        banned,
        username,
        idUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)