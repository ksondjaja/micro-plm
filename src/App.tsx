import { useState } from 'react'
import { auth } from './backend/firebase.tsx'
import { Login } from './pages/Login.tsx'
import { rows } from './backend/gcloud-pg.tsx'
import './App.css'

function App(props: any) {
  //const [count, setCount] = useState(0)

  return (
    <>
      {/* <Login/> */}
      <p>
        {rows.map((row) => (
          <div key={row.id}>
            Style No: {row.style_no}, Name: {row.style_name}, Season: {row.season}, Category: {row.demographic} {row.category}, Delivery:{row.delivery_date}
          </div>
        ))}
      </p>
    </>
  )
}

export default App
