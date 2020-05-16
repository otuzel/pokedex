import { useEffect, useState } from "react";
const useAsync = asyncFn => {
  const [data, setData] = useState(null);
  const [state, setState] = useState("idle");
  debugger;
  useEffect(() => {
    setState("loading");
    setData(null);
    asyncFn()
      .then(data => {
        setState("idle");
        setData(data);
      })
      .catch(err => {
        setState("error");
      });
    //eslint-disable-next-line
  }, [asyncFn]);

  return [data, state];
};
export default useAsync;
