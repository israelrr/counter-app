import './App.css';

import React, { useState, useCallback } from "react";

// THIS IS A COPY OF ORIGINAL COMPONENT WHAT MEETS NUMBER 5 REQUIREMENT
// YOU CAN COMMENT IT IN ORDER TO TEST THE ORIGINAL COUNTER COMPONENT
const Counter = (props) => {
  const { id, value, onChange  } = props;
  return (
    <div className="counter">
      <b>{value}</b>
      <div className="counter-controls">
        <button className="button is-danger is-small" onClick={()=>onChange(id, -1)} >-</button>
        <button className="button is-success is-small" onClick={()=>onChange(id, +1)}>+</button>
      </div>
    </div>
  );
}

// THIS IS ORIGINAL COUNTER COMPONENT YOU CAN CHECK OUT IT MEETS REQUIREMENTS FROM 1 TO 4,
//YOU CAN UNCOMMENT TO TEST IT

// Counter Component
// const Counter = (props) => {
//     const { id, value, onIncrement, onDecrement } = props;
//     return (
//       <div className="counter">
//         <b>{value}</b>
//         <div className="counter-controls">
//           <button className="button is-danger is-small" onClick={()=>onDecrement(id)} >-</button>
//           <button className="button is-success is-small" onClick={()=>onIncrement(id)}>+</button>
//         </div>
//       </div>
//     );
// }

const App = () => {
  // state data for 3 counters
const [state, setState] = useState([
  { id: 1, value: 0 },
  { id: 2, value: 0 },
  { id: 3, value: 0 },
  { id: 4, value: 0 }
])

const onChange = useCallback( (counterId, value) => 
    setState( state.map((counter) => {
      if(counter.id === counterId){
        return{
          ...counter,
          value:counter.value + value
        }
      } else
        return counter
    }))
  , [state])

const onIncrement = useCallback( (counterId) => {
    setState( state.map( (counter) => {
      if(counter.id === counterId){
        return{
          ...counter,
          value:counter.value + 1
        }
      } else
        return counter
    }))
  }, [state])

const onDecrement = useCallback( (counterId) => {
    setState( state.map((counter) => {
      if(counter.id === counterId){
        return{
          ...counter,
          value:counter.value - 1
        }
      } else
        return counter
    }))
  }, [state])

  return (
    <div>
      {state.map(counter => (
        <Counter
          key={counter.id} 
          value={counter.value}
          id={counter.id}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
          onChange={onChange}
          />
      ))}
      <Total data = {state}/>
    </div>
  );
}

const Total = (props) => {
  const {data} = props;
  let total = 0;
  for(let i = 0; i < data.length; i++){
    total+= data[i].value;
  }
  
  return (
    <div>
      <p>Total Count is {total}</p>
    </div>
  )
}

export default App;
