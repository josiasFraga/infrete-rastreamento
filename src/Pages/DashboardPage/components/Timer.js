import React, { useState, useEffect } from 'react';

export default function Timer({ refreshInterval, buscaTracesFrota }) {
  const [timeLeft, setTimeLeft] = useState(refreshInterval);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prevTimeLeft => prevTimeLeft - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setTimeLeft(refreshInterval);
  }, [refreshInterval]);

  useEffect(() => {
    if ( timeLeft == 0 ) {
        setTimeLeft(refreshInterval);
        buscaTracesFrota();
    }
  }, [timeLeft]);

  const seconds = (timeLeft-1) % 60;

  return (<span>{`${seconds < 10 ? '0' : ''}${seconds}`}</span>)
}