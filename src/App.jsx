import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [data, setData] = useState([]);
  const [nextUrl, setNextUrl] = useState('')
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = data.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fetchData = (url) =>{
    fetch(url).then((res)=> res.json())
    .then((data)=>{
      setData((prev)=>[...prev, ...data.results]);
      setNextUrl(data.next);
    })
    .catch(()=> console.log("Fetching error..."))
  };

  useEffect(()=>{
    fetchData('https://pokeapi.co/api/v2/pokemon')
  }, [])
  
  return (
    <div className="App">
      <div className='search-box'>
        <input 
          className='search' 
          type="text" 
          placeholder='Search' 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
        <i className="fa-solid fa-magnifying-glass"></i>
      </div>
      <div className='cardContainer'>
        <div className="cardContainer">
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => {
              const pokemonId = item.url.split("/")[6];
              const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

              return (
                <div className="card" key={index}>
                  <img src={imageUrl} alt={item.name} />
                  <h3>{item.name}</h3>
                </div>
              );
            })
          ) : (
            <p>No Pokemon found...</p> // 
          )}

        </div>
      </div>
          {
            nextUrl && <button className='loadMoreBtn' onClick={fetchData(nextUrl)}>Load more</button>
          }
    </div>
  );
}

export default App;
