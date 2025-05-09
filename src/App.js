import './App.css';
import MemoryGame from './components/MemoryGame';

function App() {
  return (
    <div className="App">
      <h1 className='title'><span className='grass'>Memory Card</span> Game</h1>
      <p className='sentence'>Find all the pairs ! </p>
      <MemoryGame />
    </div>
  );
}

export default App;
