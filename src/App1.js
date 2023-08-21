import React, { useState } from 'react';
import './App.css';
import WindowSizer from '../src/components/WindowSizer';
import '../src/CSS/Todolist.css';
import cross from '../src/assets/free-sticker-scare-10108601.png';
import edit from '../src/assets/free-sticker-smile-10108607.png';
import arrow from '../src/assets/free-sticker-confusing-10108590.png';
import success from '../src/assets/free-sticker-laugh-10108596.png';

function App1({ closeApp }) {
  const initialWidth = 500; // 초기 폭을 자유롭게 설정
  const initialHeight = 600; // 초기 높이를 자유롭게 설정

  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editingIndex, setEditingIndex] = useState(-1);
  const [isEditing, setIsEditing] = useState(false);
  const [checks, setChecks] = useState([]);
  const [editingValue, setEditingValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addTodo = () => {
    setTodos([...todos, inputValue]);
    setInputValue('');

    console.log('할 일 추가:', inputValue);

    setChecks([...checks, false]);
  };

  const toggleCheck = (index) => {
    const updatedChecks = checks.map((check, idx) =>
      idx === index ? !check : check
    );
    setChecks(updatedChecks);
  };

  const updateTodo = () => {
    if (editingValue.trim() !== '') {
      const updatedTodos = todos.map((todo, index) =>
        index === editingIndex ? editingValue : todo
      );
      setTodos(updatedTodos);
      setEditingValue('');
      setInputValue('');
      setIsEditing(false);

      console.log('할 일 수정:', editingValue);
    } else {
      alert('할 일을 입력해주세요.');
    }
  };

  const removeTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
    console.log('할 일 삭제');
  };

  const editTodo = (index) => {
    setEditingValue(todos[index]);
    setEditingIndex(index);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setInputValue('');
    setIsEditing(false);
  };

  return (
    <>
      <div className="fullscreen"  style={{ position: 'fixed', zIndex: 1000 }}>
        <div className="window-container">
          <h2>To do list</h2>
          <WindowSizer
            initialWidth={initialWidth}
            initialHeight={initialHeight}
            minWidth={450} 
            minHeight={500}
          >
            <div className="form">
              <input
                type="text"
                className="form__input"
                placeholder="할 일을 입력하세요."
                value={inputValue}
                onChange={handleInputChange}
              />
              <button className="custom-btn btn-6" onClick={addTodo}>
                <span>+</span>
              </button>
            </div>
            <ul>
              {todos.map((todo, index) => (
                <li key={index}>
                  {editingIndex === index && isEditing ? (
                    <>
                      <input
                        type="text"
                        className="input-line"
                        value={editingValue}
                        onChange={(e) => setEditingValue(e.target.value)}
                      />
                      <button className="modification-button"
                        onClick={() => {
                          updateTodo();
                        }}
                      >
                        <img
                          src={success}
                          alt="modification completed"
                          className="modification-icon"
                        />
                      </button>
                      <button className="cancle-button"
                        onClick={() => {
                          cancelEdit();
                        }}
                      >
                        <img src={arrow} alt="cancle" className="cancle-icon" />
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="label-container">
                          <input
                            type="checkbox"
                            className="custom-checkbox"
                            id={`checkbox-${index}`}
                            checked={checks[index]}
                            onChange={() => toggleCheck(index)}
                          />
                          <label
                            className={`checkbox-label${checks[index] ? ' checked' : ''
                            }`}
                            htmlFor={`checkbox-${index}`}
                          >
                            <span className="todo-text"> {todo}</span>
                          </label>
                          </div>
                      <button className="edit-button" onClick={() => editTodo(index)}>
                        <img src={edit} alt="edit" className="edit-icon" />
                      </button>
                      <button className="delete-button" onClick={() => removeTodo(index)}>
                        <img src={cross} alt="Delete" className="delete-icon" />
                      </button>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </WindowSizer>
          <button className="close-button" onClick={closeApp}>
            ×
          </button>
        </div>
      </div>
    </>
  );
}

export default App1;
