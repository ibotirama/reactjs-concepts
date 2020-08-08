import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);
  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', 
      {
        title : `Repositório ${Date.now()}`,	
        url : "https://github.com/ibotirama/reactjs-concepts",
        techs : ["javascript"]	
    });

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);
    if (response.status === 204){
      const position = repositories.findIndex(repo => repo.id === id);
      repositories.splice(position, 1);
      setRepositories([...repositories]);
    }
    
  }

  return (
    <div>
      <ul data-testid="repository-list">

        {repositories.map(repo =>
          <li key={repo.id}>
            {repo.title}

            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
          </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
