import { useState, useEffect } from 'react'

function App() {
    const [message, setMessage] = useState<string>("");

    useEffect(() => {
        const fetchMessage = async() => {
            try {
                const response = await fetch(`${import.meta.env.VITE_SERVER_URL}${import.meta.env.VITE_SERVER_API_PATH}`);
                const data = await response.text();
                setMessage(data);
            } catch (error) {
                console.error("Error fetching message:", error);
            }
        }

        fetchMessage();
    }, []);

  return (
    <div>
      <h1>Vite + Express Full Stack App</h1>
      <p>{message}</p>
    </div>
  );
}

export default App
