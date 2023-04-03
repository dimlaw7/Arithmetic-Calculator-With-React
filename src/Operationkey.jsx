import { ACTION } from "./App";

const Operationkey = ({dispatch, operation}) => {
    return (
        <button onClick={() => dispatch({type: ACTION.CHOOSE_OPERATION, payload: { operation } })}>{ operation }</button>
    )
}

export default Operationkey;