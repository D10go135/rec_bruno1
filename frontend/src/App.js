import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'http://localhost:3000/api/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');

  const fetchTasks = async () => {
    const { data } = await axios.get(API);
    setTasks(data);
  };

  const addTask = async () => {
    await axios.post(API, { titulo, descricao });
    setTitulo('');
    setDescricao('');
    fetchTasks();
  };

  const updateStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'pendente' ? 'concluída' : 'pendente';
    await axios.put(`${API}/${id}`, { titulo: '', descricao: '', status: newStatus });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Gerenciador de Ordens de Serviço</h1>
      <input
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        placeholder="Título"
      />
      <input
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
        placeholder="Descrição"
      />
      <button onClick={addTask}>Adicionar OS</button>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <strong>{task.titulo}</strong>: {task.descricao} - <em>{task.status}</em>
            <button onClick={() => updateStatus(task.id, task.status)}>
              Marcar como {task.status === 'pendente' ? 'concluída' : 'pendente'}
            </button>
            <button onClick={() => deleteTask(task.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
