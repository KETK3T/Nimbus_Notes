import NoteList from "./components/NoteList"
import { useEffect, useState } from "react"
import {nanoid} from 'nanoid'
import Search from "./components/Search"
import Header from "./components/Header"
 
const App = () => {
  const [notes,setNotes] = useState([])

  const [searchText,setSearchText] = useState('')

  const [darkMode,setDarkMode] = useState(false)

  useEffect(()=>{
    const savedNotes = JSON.parse(localStorage.getItem('react-notes-app-data')) || []

    if(savedNotes.length > 0){
      setNotes(savedNotes)
    }

    // when dependency array is empty it will only run on the firs load
  },[])


  // use effect lets us run code at certain points of a components lifecycle or a certain variables change
  useEffect(() => {
    // the key is a string which we will use to retrieve the notes later
    // second param is the data we want to save
    // good practice to stringify
    localStorage.setItem(
      'react-notes-app-data', 
      JSON.stringify(notes) 
    )
      //anytime the notes variable in the bracket below changes it triggers the useeffect function.
      // dependency array 
  }, [notes])

  // passed using the concept of prop drilling
  // the process of passing it through components until it gets to where it is needed
  // a more suitable alternative when prop drilling multiple components is the context api
  const addNote = (text) =>{
    const date = new Date()
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString()
    }
    // not recommended to directly mutate a state (notes array) so instead
    // we copy it into a new state and append
    const newNotes = [newNote,...notes]
    // set the notes to newNotes
    setNotes(newNotes)
  }

  const delNote = (id) =>{
    // creates a new array of notes that dont have the id passed in
    const newNotes = notes.filter((note) => note.id !== id)
    setNotes(newNotes)
  }

  return(
    // using a template string to dynamically determine darkmode
    // if darkmode = true add dark-mode to classname
      <div className={`${darkMode && 'dark-mode'}`}>
        <div className="container">
          <Header handleToggleDarkMode={setDarkMode}/>
          <Search handleSearchNote={setSearchText}/>
          {/* note list takes in 3 props */}
            <NoteList 
            // take curr list of note and filter only the ones in search
              notes={notes.filter((note) => note.text.toLowerCase().includes(searchText))} 
              handleAddNote={addNote} 
              handleDeleteNote={delNote}
            />
        </div>
      </div>
  )
}

export default App