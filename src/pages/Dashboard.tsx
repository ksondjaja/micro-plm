import { useState, useEffect } from 'react'

export function Dashboard(props: any) {

    const { token } = props.token
    const [result, setResult] = useState([] as any)

    async function getStyles() {

        console.log(token)
    
        const url = import.meta.env.VITE_BACKEND_URL + '/';
        const options = {
          method: 'GET', // 'GET' is the default, but explicitly setting it is good practice for non-GET methods
          headers: {
            ContentType: 'application/json',
            Authorization: 'Bearer ' + token, // Example of an auth token header
        }
        };
        try {
          const response = await fetch(url, options);

          if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
          }
    
          const res = await response.json();
          setResult(res);
    
        } catch (error) {
          console.error(error.message);
        }
    }

    useEffect(() => {
        getStyles();
    }, []);

  return (
    <>
    <div>
        <p>{result}</p>
    </div>
    </>
  )
}
