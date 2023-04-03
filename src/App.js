import { useReducer } from 'react';
import './App.css';
import Inputdigit from './Inputdigit';
import Operationkey from './Operationkey';

export const ACTION = {
  ADD_DIGIT: "add-digit",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  CHOOSE_OPERATION: "choose-operation",
  EVALUATE: "evaluate",
  PERCENT_TO_DECIMAL: "p2d",
}

const reducer = (state, {type, payload}) => {
  switch (type) {
    case ACTION.ADD_DIGIT:
      if (state.overwrite == true) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        }
      }
      if(payload.digit === 0 && state.currentOperand === "0") {
        return state;
      }
      if(payload.digit === "." && state.currentOperand.includes(".")) {
        return state;
       }
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`
      }
      break;
    case ACTION.CLEAR:
      return {}
      break;
    case ACTION.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) {
        return state;
      }
      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        }
      }
      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null,
      }
      break;
    case ACTION.EVALUATE:
      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state),
      }
      break;
    case ACTION.DELETE_DIGIT:
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1)
      }
      break;
    case ACTION.PERCENT_TO_DECIMAL:
      return {
        ...state,
        previousOperand: null,
        operation: null,
        overwrite: true,
        currentOperand: percentageDecimal(state),
      }
      break;
    default:
      return state;
  }
}

const percentageDecimal = ({ currentOperand }) => {
  const curr = parseFloat(currentOperand);
  let computation = curr / 100;
  return computation;
}

const evaluate = ({ previousOperand, currentOperand, operation}) => {
  const prev = parseFloat(previousOperand);
  const curr = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(curr)) {
    return `${prev}`
  }
  let computation = "";
  switch (operation) {
    case "+":
      computation = prev + curr;
      break;
    case "-":
      computation = prev - curr;
      break;
    case "*":
      computation = prev * curr;
      break;
    case "/":
      computation = prev / curr;
      break;
  }
  return computation;
}

function App() {
  const [{previousOperand, currentOperand, operation}, dispatch] = useReducer(reducer, {})
  return (
    <div className="App">
      <div className='grid-container'>
        <div className='screen'>
          <div className='output'>
            <div className='previous-operand'>{previousOperand} {operation}</div>
            <div className='current-operand'>{currentOperand}</div>
          </div>
          <div className='actions'>
            <div>
              <span>History</span>
            </div>
            <div>
              <span className='del-digit' onClick={() => dispatch({type: ACTION.DELETE_DIGIT})}>Del</span>
            </div>
          </div>
        </div>
        <button onClick={() => dispatch({type: ACTION.CLEAR})}>C</button>
        <button>( )</button>
        <button onClick={() => dispatch({type: ACTION.PERCENT_TO_DECIMAL})}>%</button>
        <Operationkey operation="*" dispatch={ dispatch } />
        <Inputdigit digit="7" dispatch={ dispatch } />
        <Inputdigit digit="8" dispatch={ dispatch } />
        <Inputdigit digit="9" dispatch={ dispatch } />
        <Operationkey operation="/" dispatch={ dispatch } />
        <Inputdigit digit="4" dispatch={ dispatch } />
        <Inputdigit digit="5" dispatch={ dispatch } />
        <Inputdigit digit="6" dispatch={ dispatch } />
        <Operationkey operation="-" dispatch={ dispatch } />
        <Inputdigit digit="1" dispatch={ dispatch } />
        <Inputdigit digit="2" dispatch={ dispatch } />
        <Inputdigit digit="3" dispatch={ dispatch } />
        <Operationkey operation="+" dispatch={ dispatch } />
        <button>+/-</button>
        <button onClick={() => dispatch({type: ACTION.ADD_DIGIT, payload: { digit: 0} })}>0</button>
        <Inputdigit digit="." dispatch={ dispatch } />
        <button onClick={() => dispatch({type: ACTION.EVALUATE})}>=</button>
      </div>
    </div>
  );
}

export default App;
