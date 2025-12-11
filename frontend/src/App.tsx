import { useState, useEffect } from 'react'
import { Button } from './components/ui/button';
import MyRoutes from './router/router';

function App() {
    const [message, setMessage] = useState<string>("");

    useEffect(() => {
        const fetchMessage = async() => {
            try {
                const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/`);
                const data = await response.text();
                setMessage(data);
            } catch (error) {
                console.error("Error fetching message:", error);
            }
        }

        fetchMessage();
    }, []);

  return (
    <div className="m-auto">
      <MyRoutes/>
      <h1>Vite + Express Full Stack App</h1>
      <p>{message}</p>
      <Button variant="ghost">Click me</Button>
    </div>
  );
}

export default App
