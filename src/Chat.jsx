import { useEffect, useState } from 'react';
import './App.css';

const ChatBox = ({ chat }) => {
  const [msgList, setMsgList] = useState(chat.messageList || []);
  const [newMsg, setNewMsg] = useState('');

  // Use useEffect to update msgList when chat.messageList changes
  useEffect(() => {
    setMsgList(chat.messageList || []);
  }, [chat.messageList]);

  const sendMessage = () => {
    if (newMsg.trim() === '') return;

    const newMessage = {
      messageId: `msg${msgList.length + 1}`,
      message: newMsg,
      timestamp: Date.now(),
      sender: 'USER',
      messageType: 'text',
    };

    setMsgList((prevMsgList) => [...prevMsgList, newMessage]);
    setNewMsg('');
  };

  return (
    <div className="chatBox">
      <div className="chatTitle">{chat?.title}</div>
      <div className="messages">
        {msgList.length > 0 ? (
          msgList.map((msg) => (
            <div
              key={msg.messageId}
              className={`msg ${msg.sender === 'BOT' ? 'msgBot' : 'msgUser'}`}
            >
              {msg.message}
            </div>
          ))
        ) : (
          <div className="initMsg">Send a message to start chatting</div>
        )}
      </div>
      <div className="msgInput">
        <input
          value={newMsg}
          className="inputMsg"
          type="text"
          placeholder="Type a message ..."
          onChange={(e) => setNewMsg(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage} className="sendBtn">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
