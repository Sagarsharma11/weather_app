import logo from './logo.svg';
import './App.css';
import Widget from './component/Widget'
import Login from './component/Login';
import React,{useState,useEffect} from 'react';

function App() {
  const [isLogin, setLogin] = useState(null)
  useEffect(()=>{
    checkLogin()
  },[])
  const checkLogin = () =>{
    let login_ = sessionStorage.getItem('isLogin');
    if(login_){
      setLogin(true)
    }else{
      setLogin(false)
    }
  }
  return (
    <>
    {
      isLogin ?  <Widget/> :   <Login checkLogin={checkLogin} />
    }
    </>
  );
}

export default App;
