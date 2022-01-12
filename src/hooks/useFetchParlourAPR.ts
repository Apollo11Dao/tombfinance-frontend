import { useEffect, useState } from 'react';
import useIceCreamFinance from './useIceCreamFinance';
import useRefresh from './useRefresh';

const useFetchParlourAPR = () => {
  const [apr, setApr] = useState<number>(0);
  const icecreamFinance = useIceCreamFinance();
  const { slowRefresh } = useRefresh(); 

  useEffect(() => {
    async function fetchParlourAPR() {
      try {
        setApr(await icecreamFinance.getParlourAPR());
      } catch(err){
        console.error(err);
      }
    }
   fetchParlourAPR();
  }, [setApr, icecreamFinance, slowRefresh]);

  return apr;
};

export default useFetchParlourAPR;
