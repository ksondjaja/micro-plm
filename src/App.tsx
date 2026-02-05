import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router'
import { Login } from './pages/Login.tsx'
import { Dashboard } from './pages/Dashboard.tsx'
import { auth } from './firebase.tsx'
import { signOut, signInWithEmailAndPassword } from "firebase/auth";
import './App.css'

function App(props: any) {
  const [user, setUser] = useState({})
  const [token, setToken] = useState(window.localStorage.getItem('micro-plm-token') ?? '')

  const navigate = useNavigate()

  const onSubmitLogIn = async (e) => {
    e.preventDefault()

    await signInWithEmailAndPassword(auth, user.email, user.password)
    .then((userCred) => {  
          
          //Set login state and localStorage
          if(userCred){

            // setUser({
            //   ...user,
            //   loggedIn: true,
            // });

            window.localStorage.setItem('auth', 'true');
            window.localStorage.setItem('micro-plm-user', user.email);
          }

          navigate("/dashboard");
      })
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
      });
  }

  

  // Change login form state
  const handleUserChange = (event: any) => {
      const value = event.target.value;

      setUser({
        ...user,
        [event.target.name]: value
      });
  }

  useEffect(()=>{
    // Autologin if user is still logged in through Firebase & last login was less than 24 hours ago
    auth.onAuthStateChanged((userCred) => {
      if(userCred){

        setUser({
          ...user,
          loggedIn: true,
        });

        window.localStorage.setItem("auth", "true");

        userCred.getIdToken().then((token)=>{
            setToken(token);
            window.localStorage.setItem("mini-plm-access", token);
        })
      }
    })}
  ,[])

  return (
    <>
      <Login 
        user = {user}
        handleUserChange = {handleUserChange}
        onSubmitLogIn = {onSubmitLogIn}
        {...props}
      />

      <Routes>
        <Route path="/dashboard"
          element={<Dashboard
            token={token}
            {...props}
          />}
        />
      </Routes>
    </>
  )
}

export default App
