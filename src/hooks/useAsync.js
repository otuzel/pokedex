import { useEffect, useReducer, useState } from "react";
const useAsync = fn => {
  // const [data, setData] = useState(null);
  // const [state, setState] = useState("idle");
  const reducer = (state, action) => {
    switch (action.type) {
      case "start": {
        return {
          data: null,
          error: null,
          state: "loading"
        };
      }
      case "complete": {
        return {
          data: action.data,
          error: null,
          state: "idle"
        };
      }
      case "error": {
        return {
          data: null,
          error: action.error,
          state: "error"
        };
      }
      default: {
        throw new Error(`Unknown action ${action.type}`);
      }
    }
  };

  const initialState = {
    data: null,
    error: null,
    state: "idle"
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "start" });
    fn()
      .then(data => dispatch({ data, type: "complete" }))
      .catch(err => dispatch({ type: "error" }));
    //eslint-disable-next-line
  }, [fn]);

  return state;
};
export default useAsync;
