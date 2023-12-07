import { useState, useEffect } from 'react'
import Persons from './Components/persons'
import personService from './services/persons'
import './index.css'

const Filter = ({ persons }) => {
  const [findPerson, setFindPerson] = useState('')

  const handleFindPerson = (event) => {
      console.log(event.target.value);
      setFindPerson(event.target.value);
  };

  const filteredPersons = persons.filter((person) =>
      person.name.toLowerCase().includes(findPerson.toLowerCase())
  );

  return (
      <div>
      filter shown with <input value={findPerson} onChange={handleFindPerson} />
      <ul>
      {filteredPersons.map((person) => (<li key={person.name}>{person.name}</li>))}
      </ul>
      </div>
  );
};

const Button = ({type, text, handleNewChange}) => {
  return(
    <button type={type} onClick={handleNewChange} >{text}</button>
  )
}

const PersonForm = ({onSubmit, newName, newNumber, handleNameChange, handleNumberChange}) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>name: <input value={newName} onChange={handleNameChange} /></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange}></input></div>
        <div><button type="submit">add</button></div>
      </form>
    </div>
  )
}

const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  const className = type === 'error' ? 'error' : 'success';

  return (
    <div className={className}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)


  useEffect(() => {
    personService
      .getAll()
      .then(initialPerson => {
        setPersons(initialPerson)
      })
  }, [])
  
  const addPerson = async (event) => {
    event.preventDefault();
  
    const newPerson = {
      name: newName,
      number: newNumber,
    };
  
    const existingPerson = persons.find(
      (person) => person.name.toLowerCase() === newPerson.name.toLowerCase()
    );
  
    if (existingPerson) {
      if (existingPerson.number === newPerson.number) {
        window.alert(`${newName} is already added to the phonebook`);
      } else {
        const confirmUpdate = window.confirm(
          `${newName} is already added to the phonebook, replace the old number with a new one?`
        );
  
        if (confirmUpdate) {
          try {
            const updatedPerson = await personService.updatePerson(
              existingPerson.id,
              { ...existingPerson, number: newNumber }
            );
  
            setPersons((prevPersons) =>
              prevPersons.map((person) =>
                person.id !== existingPerson.id ? person : updatedPerson
              )
            );
  
            setSuccessMessage(`Number of ${newName} is changed`);
          } catch (error) {
            setErrorMessage(
              `Information of ${newName} has already been removed from the server`
            );
          }
        }
      }
    } else {
      try {
        const returnedPerson = await personService.create(newPerson);
  
        setPersons((prevPersons) => [...prevPersons, returnedPerson]);
        setSuccessMessage(`Successfully added ${newName}`);
      } catch (error) {
        setErrorMessage(`[error] ${error.response.data.error}`);
      }
    }
  
    // Clear input fields
    setNewName('');
    setNewNumber('');
  
    // Set a timer to clear success message after 5 seconds
    setTimeout(() => {
      setSuccessMessage(null);
    }, 5000);
  };
  

  const deletedPerson = id => {
    const person = persons.find(n => n.id === id);
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService.deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
          setSuccessMessage(`Deleted ${person.name}`);
          setTimeout(() => {
            setSuccessMessage(null);
          }, 5000);
        })
        .catch(error => {
          setErrorMessage(`Information of ${person.name} has already been removed from server.`);
        });
    }
  };
  
  const handleNameChange = (event) => {
  console.log(event.target.value)
  setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
  console.log(event.target.value)
  setNewNumber(event.target.value)
  }  

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} type="error"/>
      <Notification message={successMessage} type="success"/>
      <Filter persons={persons}/>
      <h3>Add a new person</h3>
      <PersonForm onSubmit={addPerson}
                  newName={newName} 
                  newNumber={newNumber} 
                  handleNameChange={handleNameChange} 
                  handleNumberChange={handleNumberChange}
                  />
      <h3>Numbers</h3> 
      <Persons persons={persons}/>
      <ul>
        {persons.map(person => 
        <li key={person.id}>{person.name} {person.number} 
        <Button text='delete' type="submit" 
        handleNewChange={() => 
          deletedPerson(person.id)} />
          </li>
        )}
      </ul>
    </div>
  )

}

export default App