import { useState, useEffect } from "react";
import Header from "./components/Header";
import Diary from "./components/Diary";
import Notification from "./components/Notification";
import diaryService from "./services/diaryService";
import { type NonSensitiveDiaryEntry, type Visibility, type Weather } from "./types";

const App = () => {
  const header = {
    content: 'Diary entries',
    add: 'Add new entry'
  }

  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);
  const [newDate, setNewDate] = useState('');
  const [newVisibility, setNewVisibility] = useState('');
  const [newWeather, setNewWeather] = useState('');
  const [newComment, setNewComment] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    diaryService.getAll().then(initialDiaries => {
      setDiaries(initialDiaries)
    })
  }, [])

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault()

    diaryService.create({ 
      date: newDate,
      visibility: newVisibility as Visibility,
      weather: newWeather as Weather,
      comment: newComment
     }).then(returnedDiary => {
      setDiaries(diaries.concat(returnedDiary))
    }).catch(error => {
      setErrorMessage(error.message)
      setTimeout(() => setErrorMessage(''), 5000)
    })

    setNewDate('')
    setNewVisibility('')
    setNewWeather('')
    setNewComment('')
  }

  return (
    <div>
      <Header header={header.add} />

      <Notification message={errorMessage} />

      <form onSubmit={diaryCreation}>
        <div>date<input type='date' value={newDate} onChange={(event) => setNewDate(event.target.value)} /></div>
        <div>
          visibility
          {(['great', 'good', 'ok', 'poor'] as const).map(option => (
            <label key={option}>
              <input type='radio' name='visibility' value={option} 
                checked={newVisibility===option} onChange={()=>setNewVisibility(option)} />
              {option}
            </label>
          ))}
        </div>
        <div>
          weather
          {(['sunny', 'rainy', 'cloudy', 'stormy', 'windy'] as const).map(option => (
            <label key={option}>
              <input type='radio' name='weather' value={option} 
                checked={newWeather===option} onChange={()=>setNewWeather(option)} />
              {option}
            </label>
          ))}
        </div>
        <div>comment<input value={newComment} onChange={(event) => setNewComment(event.target.value)} /></div>

        <button type='submit'>add</button>
      </form>

      <Header header={header.content} />

      {diaries.map(d => 
        <Diary key={d.id} diary={d} />
      )}
    </div>
  )
}

export default App;