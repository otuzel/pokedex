import { useEffect, useState } from "react";
const useAsync = (asyncFn, deps) => {
  const [data, setData] = useState(null);
  const [state, setState] = useState("idle");

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
  }, deps);

  return [data, state];
};
export default useAsync;
