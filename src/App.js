import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [color, setColor] = useState('white');
  const [disabledBtn, setDisabledBtn] = useState(false);
  const [message, setMessage] = useState('');

  const style = {
    color: color,
  };

  const checkMetaMask = () => {
    const { ethereum } = window;

    if (!ethereum) {
      setColor('#f44336');
      setDisabledBtn(true);
      setMessage('Please install MetaMask!');
    } else {
      setDisabledBtn(false);
      setMessage('');
    }
  };

  const getKey = () => {
    const { ethereum } = window;
    ethereum
      .request({ method: 'eth_requestAccounts' })
      .then((accounts) => {
        const key = accounts[0];
        setMessage(key);
        setColor('#66bb6a');
      })
      .catch(() => {
        setColor('#ffa726');
        setMessage('MetaMask is locked - please login');
      });
  };

  useEffect(() => {
    checkMetaMask();
  }, []);

  return (
    <div className="container">
      <button className="button" disabled={disabledBtn} onClick={getKey}>
        Get public key
      </button>
      <span style={style}>
        {message}
      </span>
    </div>
  );
}

export default App;
