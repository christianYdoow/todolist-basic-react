import {
  Fragment,
  FunctionComponent,
  useEffect,
  useRef,
  useState,
} from "react";
import './App.css' ;
import 'bootstrap/dist/js/bootstrap.min.js';

type TodoItem={
  id:number;
  task:string;
  isDone:boolean;
}

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const finishedTasksCount = todos.filter((todo) => todo.isDone).length;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTask(e.target.value);

  const onAddTodo = () => {
    setTodos((todos) => [
      ...todos,
      { task, isDone: false, id: new Date().getTime() },
    ]);
    setTask("");
  };

  const onDelete = (id: number) => () => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  };

  const onToggleTask = (id: number) => () => {
    setTodos((todos) =>
      todos.map((todo) => {
        return todo.id === id ? { ...todo, isDone: !todo.isDone } : todo;
      })
    );
  };

  return (
    <>
      <div className="row mb-5">
        <h1>TODO-LIST-APP</h1>
      </div>
      <div className="row d-flex my-3">
        <div className="col">
          <input type="text" className="me-5 py-2" value={task} onChange={onChange} />
        </div>
        <div className="col">
          <button type="button" className="btn btn-success px-5 py-2" onClick={onAddTodo}>
          +
          </button>
        </div>
        <div className="row mt-4">
          <h4>Finished Task Count: {finishedTasksCount}</h4>
        </div>
        <div className="row">
          <ul>
            {todos.map((todo) => (
              <li className="d-flex align-items-center justify-content-center" key={todo.id}>
                <div className="col mt-2">
                  <input
                    className="checkbox"
                    type="checkbox"
                    checked={todo.isDone}
                    onChange={onToggleTask(todo.id)}
                  />
                </div>
                <div className="col todoitem">
                  {todo.isDone ? <s>{todo.task}</s> : todo.task}
                </div>
                <div className="col">
                  <button
                    className=""
                    style={{ backgroundColor: "red" }}
                    onClick={onDelete(todo.id)}
                  >
                    x
                  </button>{" "}
                </div>
              </li>
            ))}
          </ul>
        </div>

       
      </div>
    </>
  );
}



export default App
