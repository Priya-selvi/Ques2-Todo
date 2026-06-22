import {useState} from 'react';
import {useEffect} from 'react';

function App(){
   const[title, setTitle] = useState('');
   const[todos, setTodos] = useState([]);
   const loadTodos = async () => {
      const response = await fetch('http://localhost:3000/todos',
        {
          method:"GET",
         body: JSON.stringify({ title }),
        }
      );
      const data = await response.json();
      setTodos(data);
   }
   useEffect(() => {
      loadTodos();
   }, []);

   //Add a new todo
    const addTodo = async () => {
        const response = await fetch('http://localhost:3000/todos', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title })
        });
        const data = await response.json();
        setTodos([...todos, data]);
    };

    //Toggle a todo's completed status
    const toggleTodo = async (id) => {
        const response = await fetch(`http://localhost:3000/todos/${id}`, {
            method: "PATCH"
        });
        const data = await response.json();
        setTodos(todos.map(todo => todo.id === id ? data : todo));
    };

    //Delete a todo
    const deleteTodo = async (id) => {
        await fetch(`http://localhost:3000/todos/${id}`, {
            method: "DELETE"
        });
        setTodos(todos.filter(todo => todo.id !== id));
    };

    return(
        <div>
            <h1>Todo List</h1>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <button onClick={addTodo}>Add Todo</button>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        <span
                            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                            onClick={() => toggleTodo(todo.id)}
                        >
                            {todo.title}
                        </span>
                        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;