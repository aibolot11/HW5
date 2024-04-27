import React, { useState } from 'react';

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [names, setNames] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleEditInputChange = (e) => {
    setEditValue(e.target.value);
  };

  const handleAddClick = () => {
    if (inputValue.trim() !== '') {
      setNames([...names, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleUpdateClick = (index) => {
    const newName = editValue.trim();
    if (newName !== '') {
      const updatedNames = [...names];
      updatedNames[index] = newName;
      setNames(updatedNames);
      setEditIndex(null);
    }
  };

  const handleDeleteClick = (index) => {
    const filteredNames = names.filter((_, i) => i !== index);
    setNames(filteredNames);
    if (index === editIndex) {
      setEditIndex(null);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
      />
      <button onClick={handleAddClick} disabled={!inputValue.trim()}>Добавить</button>
      {names.length === 0 && <p>Список пуст</p>}
      <ul>
        {names.map((name, index) => (
          <li key={index}>
            {editIndex === index ? (
              <>
                <input
                  type="text"
                  value={editValue}
                  onChange={handleEditInputChange}
                />
                <button onClick={() => handleUpdateClick(index)}>Сохранить</button>
              </>
            ) : (
              <>
                {name}
                <button onClick={() => { setEditIndex(index); setEditValue(name); }}>Изменить</button>
                <button onClick={() => handleDeleteClick(index)}>Удалить</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
