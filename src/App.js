import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setProjects(response.data);
    });
  }, []);


  async function handleAddRepository() {
    // TODO

    const response = await api.post('repositories', {
      title: `Novo projeto ${Date.now()}`,
      owner: 'Diego'
    });

    setProjects([...projects, response.data]);

  }

  async function handleRemoveRepository(id) {
    try {

      await api.delete(`repositories/${id}`);

      setProjects(projects.filter( p => p.id != id));

    } catch (ex) {
      console.trace(ex);
    }

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {projects.map(p =>
          <li key={p.id}>
            {p.title}

            <button onClick={() => handleRemoveRepository(p.id)}>
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
