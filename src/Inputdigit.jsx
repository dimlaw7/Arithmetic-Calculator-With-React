import { ACTION } from "./App";

const Inputdigit = ({dispatch, digit}) => {
    return (
        <button onClick={() => dispatch({type: ACTION.ADD_DIGIT, payload: { digit } })}>{ digit }</button>
    )
}

export default Inputdigit;