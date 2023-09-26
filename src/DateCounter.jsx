import { useState, useReducer } from "react";

const initialState = { count: 0, step: 1 };

function reducer(state, action) {
  switch (action.type) {
    case "dec":
      return { ...state, count: state.count - state.step };
    case "inc":
      return { ...state, count: state.count + state.step };
    case "setValue":
      return { ...state, count: action.payload };
    case "setStep":
      return { ...state, step: action.payload };
    case "reset":
      return initialState;
    default:
      throw new Error("Unknown Action");
  }
}

function DateCounter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, step } = state;

  const date = new Date("june 21  2027");
  date.setDate(date.getDate() + count);

  function decrement() {
    dispatch({ type: "dec" });
  }
  function increment() {
    dispatch({ type: "inc" });
  }
  function defineCount(e) {
    dispatch({ type: "setValue", payload: Number(e.target.value) });
  }
  function reset() {
    dispatch({ type: "reset" });
  }
  function defineStep(value) {
    dispatch({ type: "setStep", payload: Number(value) });
  }

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={(e) => defineStep(e.target.value)}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={decrement}>-</button>
        <input value={count} onChange={(e) => defineCount(e)} />
        <button onClick={increment}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
