import "./styles.css";
import "mvp.css";
import { useState, useEffect } from "react";

//this function will toggle the styling of the buttons
function ToggleButton({ isHover }) {
  const buttonStyle = {
    backgroundColor: "rgb(0, 191, 255)",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease-in-out",
  };

  const buttonStyleWithHover = {
    buttonStyle,
    backgroundColor: isHover ? "lightblue" : "rgb(0, 191, 255)",
  };

  return buttonStyleWithHover;
}

//This function will search through the data set under the conditions given
function SearchCocktails({ data }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isHoverReset, setIsHoverReset] = useState(false);
  const [isHoverMojito, setIsHoverMojito] = useState(false);
  const [isHoverMargarita, setIsHoverMargarita] = useState(false);
  const [isHoverMartini, setIsHoverMartini] = useState(false);

  const handleSearch = async () => {
    const searchUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`;
    const response = await fetch(searchUrl);
    const searchData = await response.json();

    setSearchResults(searchData.drinks || []);
  };

  useEffect(() => {
    if (searchTerm !== "") {
      handleSearch();
    }
  }, [searchTerm]);

  function handleReset() {
    setSearchTerm("");
    setSearchResults(data.drinks || []);
  }

  function inputChange(event) {
    setSearchTerm(event.target.value);
  }

  return (
    <div>
      <h1>Cocktails A-Z</h1>
      <div class="search">
        <input
          type="text"
          placeholder="Search by name or alcohol type"
          value={searchTerm}
          onChange={inputChange}
        />
        <div class="buttonStyle">
          <button
            style={ToggleButton({ isHover: isHoverReset })}
            onMouseEnter={() => setIsHoverReset(true)}
            onMouseLeave={() => setIsHoverReset(false)}
            onClick={handleReset}
          >
            Reset Search
          </button>
          <button
            style={ToggleButton({ isHover: isHoverMojito })}
            onMouseEnter={() => setIsHoverMojito(true)}
            onMouseLeave={() => setIsHoverMojito(false)}
            onClick={() => setSearchTerm("Mojito")}
          >
            Mojito's
          </button>
          <button
            style={ToggleButton({ isHover: isHoverMargarita })}
            onMouseEnter={() => setIsHoverMargarita(true)}
            onMouseLeave={() => setIsHoverMargarita(false)}
            onClick={() => setSearchTerm("Margarita")}
          >
            Margarita's
          </button>
          <button
            style={ToggleButton({ isHover: isHoverMartini })}
            onMouseEnter={() => setIsHoverMartini(true)}
            onMouseLeave={() => setIsHoverMartini(false)}
            onClick={() => setSearchTerm("Martini")}
          >
            Martini's
          </button>
        </div>
      </div>
      <div class="results">
        {searchResults.map((drink) => (
          <div class="result">
            <div class="info">
              <h3>{drink.strDrink}</h3>
              <p>{drink.strInstructions}</p>
            </div>
            <img src={drink.strDrinkThumb} alt={drink.strDrink} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App({ data }) {
  return (
    <>
      <SearchCocktails data={data} />
    </>
  );
}
