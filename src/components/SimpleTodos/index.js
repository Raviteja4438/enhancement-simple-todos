import {Component} from 'react'
import TodoItem from '../TodoItem'
import './index.css'

const initialTodosList = [
  {
    id: 1,
    title: 'Book the ticket for today evening',
  },
  {
    id: 2,
    title: 'Rent the movie for tomorrow movie night',
  },
  {
    id: 3,
    title: 'Confirm the slot for the yoga session tomorrow morning',
  },
  {
    id: 4,
    title: 'Drop the parcel at Bloomingdale',
  },
  {
    id: 5,
    title: 'Order fruits on Big Basket',
  },
  {
    id: 6,
    title: 'Fix the production issue',
  },
  {
    id: 7,
    title: 'Confirm my slot for Saturday Night',
  },
  {
    id: 8,
    title: 'Get essentials for Sunday car wash',
  },
]

class SimpleTodos extends Component {
  state = {
    todosList: initialTodosList,
    newTodo: '',
  }

  deleteTodo = id => {
    this.setState(prevState => ({
      todosList: prevState.todosList.filter(todo => todo.id !== id),
    }))
  }

  saveTodo = (id, updatedTitle) => {
    this.setState(prevState => ({
      todosList: prevState.todosList.map(todo =>
        todo.id === id ? {...todo, title: updatedTitle} : todo,
      ),
    }))
  }

  addTodo = () => {
    const {newTodo} = this.state
    const todoInput = newTodo.trim()
    if (todoInput !== '') {
      let todoTitle = todoInput
      let count = 1
      const lastSpaceIndex = todoInput.lastIndexOf(' ')
      if (lastSpaceIndex !== -1) {
        const lastWord = todoInput.substring(lastSpaceIndex + 1)
        const num = parseInt(lastWord, 10)
        if (!Number.isNaN(num)) {
          todoTitle = todoInput.substring(0, lastSpaceIndex)
          count = num
        }
      }
      const newTodos = Array.from({length: count}, (_, index) => ({
        id: Date.now() + index,
        title: todoTitle,
      }))
      this.setState(prevState => ({
        todosList: [...prevState.todosList, ...newTodos],
        newTodo: '',
      }))
    }
  }

  handleChange = e => {
    this.setState({newTodo: e.target.value})
  }

  render() {
    const {todosList, newTodo} = this.state

    return (
      <div className="app-container">
        <div className="simple-todos-container">
          <h1 className="heading">Simple Todos</h1>
          <div>
            <input
              type="text"
              id="input-box"
              placeholder="Add your text"
              value={newTodo}
              onChange={this.handleChange}
            />
            <button type="button" onClick={this.addTodo}>
              Add
            </button>
          </div>
          <ul className="todos-list">
            {todosList.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                deleteTodo={this.deleteTodo}
                saveTodo={this.saveTodo}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default SimpleTodos
