import { useState } from "react";
import "./App.css";
import { Grid } from "@mui/material";
import CharacterSelect from './CharacterSelect.js';
import Chat from './Chat.js';

function App() {

  const [person, setPerson] = useState();

  return (
    <div className="App">
        {!person && <CharacterSelect select={(c) => setPerson(c)}/> }
        {person && <Chat person={person} clearPerson={() => setPerson(null)}/> }
    </div>
  );
}

export default App;
