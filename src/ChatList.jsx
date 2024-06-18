import {useState} from 'react';
import './App.css';

const Chatlist=({list})=>{
  
  
    return <div className="chatList">
     <img src={list.imageURL} alt={list.title}/>
     <div className="listContent">
       <span>{list.title}</span>
       <span>{list.orderId}</span>
       </div>
       
        </div>
}

export default Chatlist;