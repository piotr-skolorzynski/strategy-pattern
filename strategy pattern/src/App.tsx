import { useRef, useState } from "react";
import { generateRandomIntegers } from "./number-generator/number-generator";
import {
  filteringStrategy,
  FilterOption,
} from "./filter-strategy/filter-strategy";

export const App = () => {
  const [numbers, setNumbers] = useState<number[]>([]);
  const generatedNumbers = useRef<number[]>([]);

  const generateRandomNumbers = () => {
    const randomIntegers = generateRandomIntegers();
    generatedNumbers.current = randomIntegers;
    setNumbers(randomIntegers);
  };

  const restoreNumbers = () => setNumbers(generatedNumbers.current);

  const filter = (option: FilterOption): void => {
    const filteredNumbers = filteringStrategy.select(
      generatedNumbers.current,
      option,
    );
    setNumbers(filteredNumbers);
  };

  return (
    <>
      <div className="numbers-wrapper">
        <div className="numbers-container">
          {numbers.length ? (
            numbers.map((number) => (
              <div key={number} className="number">
                {number}
              </div>
            ))
          ) : (
            <h4>Please generate random integers</h4>
          )}
        </div>
        <button
          type="button"
          className="btn btn--green"
          onClick={generateRandomNumbers}
        >
          generate
        </button>
      </div>

      {
        <div className="filter-wrapper">
          <h4>Filter options</h4>
          <div className="filter-buttons">
            <button key="all" className="btn btn-all" onClick={restoreNumbers}>
              Show All
            </button>
            {Object.values(FilterOption).map((option) => (
              <button
                key={option}
                className={`btn btn-${option}`}
                onClick={() => filter(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      }
    </>
  );
};

export default App;
