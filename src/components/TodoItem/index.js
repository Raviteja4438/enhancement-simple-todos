import {useState} from 'react'
import './index.css'

const TodoItem = ({todo, deleteTodo, saveTodo}) => {
  const [editing, setEditing] = useState(false)
  const [updatedTitle, setUpdatedTitle] = useState(todo.title)

  const onDeleteTodo = () => {
    deleteTodo(todo.id)
  }

  const onToggleEdit = () => {
    setEditing(!editing)
  }

  const onSaveEdit = () => {
    saveTodo(todo.id, updatedTitle)
    setEditing(false)
  }

  const onChangeTitle = e => {
    setUpdatedTitle(e.target.value)
  }

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      onSaveEdit()
    }
  }

  return (
    <li className="todo-item">
      {editing ? (
        <>
          <input
            type="text"
            value={updatedTitle}
            onChange={onChangeTitle}
            onBlur={onSaveEdit}
            onKeyPress={handleKeyPress}
          />
          <button type="button" className="save-btn" onClick={onSaveEdit}>
            Save
          </button>
        </>
      ) : (
        <>
          <p className={todo.completed ? 'title completed' : 'title'}>
            {todo.title}
          </p>
          <button type="button" className="delete-btn" onClick={onDeleteTodo}>
            Delete
          </button>
          <button type="button" className="edit-btn" onClick={onToggleEdit}>
            Edit
          </button>
        </>
      )}
    </li>
  )
}

export default TodoItem
