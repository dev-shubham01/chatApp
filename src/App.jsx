import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import ChatBox from './Chat';
import Chatlist from './ChatList';

function App() {
  const [chatList, setChatList] = useState([]);
  const [searchedChat, setSearchedChat] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const getChatList = async () => {
    const res = await fetch(
      'https://my-json-server.typicode.com/codebuds-fk/chat/chats'
    );
    const data = await res.json();
    if (data) {
      setChatList(data);
    }
  };
  useEffect(() => {
    getChatList();
  }, []);
  const searchChat = (e) => {
    const val = e.target.value;
    const chat = chatList.filter(
      (ch) => ch.title === val || ch.orderId === val
    );
    setSearchedChat(chat);
  };
  const selectChat = (id) => {
    console.log('clicked');
    const chat = chatList.find((list) => list.id === id);

    setSelectedChat(chat);
  };

  return (
    <div className="App">
      <div
        style={{
          width: selectedChat ? '40%' : '100%',
        }}
      >
        <div className="heading">
        <h3>Filter by Title/Order Id</h3>
        <input
          onChange={(e) => {
            searchChat(e);
          }}
          className="searchInput"
          type="text"
          placeholder="search by title/order id"
        />
        </div>
        <hr></hr>
        {searchedChat ? (
          searchedChat.map((chat) => (
            <div
              key={list.id}
              onClick={() => {
                selectChat(chat?.id);
              }}
              style={{
                backgroundColor: selectedChat.id === chat.id ? 'lightgrey' : '',
              }}
            >
              {' '}
              <Chatlist
                onClick={() => selectChat(chat.id)}
                key={chat.id}
                list={chat}
              />
            </div>
          ))
        ) : (
          <div className="chatLists">
            {chatList &&
              chatList.map((list) => {
                return (
                  <div
                    key={list.id}
                    onClick={() => {
                      console.log('clicked');
                      selectChat(list?.id);
                    }}
                    style={{
                      backgroundColor:
                        selectedChat?.id === list?.id ? 'lightgrey' : '',
                    }}
                  >
                    {' '}
                    <Chatlist list={list} />
                  </div>
                );
              })}
          </div>
        )}
      </div>
      {selectedChat && (
        
          <ChatBox chat={selectedChat} />
        
      )}
    </div>
  );
}

export default App;
