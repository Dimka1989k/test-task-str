import { useState, useEffect, useRef, useCallback } from "react";
import socketIOClient from "socket.io-client";
import { IoChevronBack } from "react-icons/io5";

import _ from "lodash"; 

import smallMonn from "../../assets/icon-moon-small.png";
import iconExpert from "../../assets/icon-girl.png";
import notification from "../../assets/notification.png";
import buttonSend from '../../assets/icon-send.png';
import iconStar from '../../assets/iconstar.png';

import "./Chat.styles.css";

const experts = [
  { id: "expert-starzen", name: "Name Surname", online: true },
  { id: "expert-name1", name: "Name Surname", online: false },
  { id: "expert-name2", name: "Name Surname", online: true },
  { id: "expert-name3", name: "Name Surname", online: false },
  { id: "expert-name4", name: "Name Surname", online: true },
];

const autoResponsePhrases = [
  "Hello! How can I help you today?",
  "Thank you for your message. I'm looking into it now.",
  "That's an interesting question! I'm thinking about the answer.",
  "Please hold on a moment, I'm forming a response.",
  "Understood. Give me a second to process this.",
  "Glad to hear from you! How can I be of assistance?",
  "I'm here to help! Feel free to ask your questions.",
  "Oh, that's a great request! Working on it.",
  "No problem! I'll reply shortly.",
  "Okay, I've received your message.",
];

const formatTimestamp = (timestamp) => {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  const now = new Date();

  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  const time = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (isToday) {
    return `Today, ${time}`;
  } else {
    const formattedDate = date.toLocaleDateString([], {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    return `${formattedDate} ${time}`;
  }
};

const ChatListPanel = ({
  conversations,
  onSelectConversation,
  currentUserId,
  showChatList
}) => {
  return (
    <div className={`chat_list_panel ${showChatList ? '' : 'hidden-on-mobile'}`}>
      {conversations.length === 0 ? (
        <p className="no_conversations">
          No active conversations. Start one by selecting an expert!
        </p>
      ) : (
        conversations
          .sort((a, b) => new Date(b.lastTimestamp || 0) - new Date(a.lastTimestamp || 0))
          .map((conv) => (
            <div
              key={conv.id}
              className="conversation_item"
              onClick={() => onSelectConversation(conv.id, conv.expert.id)}
            >
              <div className="conversation_info">
                <img
                  src={iconExpert}
                  alt="iconExpert"
                  style={{ width: 64, height: 64 }}
                />

                <div className="container-info">
                  <div className="top_row">
                    <p className="expert_name">{conv.expert.name}</p>
                    {conv.lastTimestamp && (
                      <span className="last_message_time">
                        {formatTimestamp(conv.lastTimestamp)}
                      </span>
                    )}
                  </div>
                  <div className="bottom_row">
                    {conv.lastMessage ? (
                      <p className="last_message">{conv.lastMessage}</p>
                    ) : (
                      <p className="last_message no_message">Start chatting!</p>
                    )}
                    {conv.unreadCount > 0 && (
                      <span className="unread_badge">{conv.unreadCount}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
      )}

      <span className="panel_subtitle"></span>
      <div className="new_chat_options">
        {experts
          .filter(
            (exp) =>
              !conversations.some(
                (conv) =>
                  conv.expert.id === exp.id && conv.expert.id !== currentUserId
              )
          )
          .map((expert) => (
            <div
              key={expert.id}
              className="new_chat_expert_item"
              onClick={() => onSelectConversation(null, expert.id)}
            >
              <div className="container-expert-icon">
                <img
                  className="img-expert"
                  src={iconExpert}
                  alt="iconExpert"
                  style={{ width: 64, height: 64 }}
                />
                <div className="container-text-expert">
                  <div className="name-date">
                    <p className="name-expert"> {expert.name}</p>
                    <p>Today, 9:34</p>
                  </div>
                  <div className="text-notification">
                    <p className="text-expert">
                      It is a long established fact that a <br />
                      reader will be distracted by the readable content of a
                      page when looking at its
                    </p>
                    <img
                      className="notify"
                      src={notification}
                      alt="notification"
                      style={{ width: 16, height: 16 }}
                    />
                  </div>
                </div>
              </div>
              {expert.online ? (
                <span className="online_indicator"></span>
              ) : (
                <span className="offline_indicator"></span>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

const ChatWindow = ({
  chats,
  activeExpert,
  addMessage,
  onBackToList,
  currentUserId,
  showChatList
}) => {
  const endOfMessages = useRef();
  const [messageText, setMessageText] = useState("");

  const sendMessage = () => {
    if (!messageText.trim() || !activeExpert) return;

    addMessage(messageText, activeExpert.conversationId, activeExpert.id);
    setMessageText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    endOfMessages.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  return (
    <div className={`chat_window ${showChatList ? 'hidden-on-mobile' : ''}`}>
      <div className="chat_window_header">
        <IoChevronBack className="back_icon" onClick={onBackToList} />
        <div className="header_info">
          {/* Додав зображення експерта, щоб воно не було порожнім */}
          <img src={iconExpert} alt="Expert" style={{width: 40, height: 40, borderRadius: '50%'}} />
          <h3 className="exper-name">{activeExpert.name}</h3>
          <div className="container-dot">
            <span
              className={`status_dot ${
                activeExpert.online ? "online" : "offline"
              }`}
            ></span>
            <span
              className={`status_text ${
                activeExpert.online ? "online" : "offline"
              }`}
            >
              {activeExpert.online ? "Online" : "Offline"}
            </span>
          </div>
        </div>
        <img
          src={smallMonn}
          alt="smallMonn"
          style={{ width: 36, height: 36 }}
        />
      </div>
      <div className="chats_display">
        {chats.map((chat, index) => {
          const isMe = chat.senderId === currentUserId;

          return (
            <div
              key={chat._id || index}
              className={`message_bubble_wrapper ${
                isMe ? "my_message" : "their_message"
              }`}
            >
              <div className="message_content">
                <p className="message_text">{chat.message}</p>
              </div>
            </div>
          );
        })}
        <div ref={endOfMessages}></div>
      </div>
      <div className="inputtext_container">
        <span className="container-star-chat">
          <img src={iconStar} alt="iconStar" style={{width: 24, height: 24}}/>
        </span>
        <input
          placeholder="Type your question..."
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          onKeyDown={handleKeyDown}
          rows="1"
        />
        <button onClick={sendMessage}>
          <img src={buttonSend} alt="buttonSend" style={{width: 24, height: 24}}/>
        </button>
      </div>
    </div>
  );
};

export default function Chat({ user, userId }) {
  const [conversations, setConversations] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [activeExpert, setActiveExpert] = useState(null);
  const [activeChatMessages, setActiveChatMessages] = useState([]);
  const [showChatList, setShowChatList] = useState(true);

  const socketio = useRef(null);

  useEffect(() => {
    if (!user || !userId) {
        console.warn("Chat component: User or userId props are missing. Socket.IO will not connect.");
        return;
    }
    if (!socketio.current) {
      socketio.current = socketIOClient("https://chat-strazen-media-1.onrender.com", {
        query: { userId: userId },
      });

      socketio.current.on("connect", () => {
        console.log("Connected to chat server with ID:", socketio.current.id);
        socketio.current.emit("loadConversations");
      });

      socketio.current.on("conversations", (convs) => {
        console.log("Received conversations:", convs);
        setConversations(convs);
      });

      socketio.current.on("conversationMessages", (messages) => {
        console.log("Received conversation messages:", messages);
        setActiveChatMessages(messages);
      });

      socketio.current.on("message", (newMessage) => {
        console.log(
          "New message received from server (e.g., from another user, not auto-response):",
          newMessage
        );   
        if (newMessage.conversationId === activeConversationId) {
          setActiveChatMessages((prevMessages) => {
            const messageExists = prevMessages.some(
              (msg) => msg._id === newMessage._id && newMessage._id !== undefined
            );
            if (messageExists) {
              return prevMessages;
            }
            return [...prevMessages, newMessage];
          });
        }  
        setConversations((prevConvs) => {
          const updatedConvs = prevConvs.map((conv) => {
            if (conv.id === newMessage.conversationId) {
              return {
                ...conv,
                lastMessage: newMessage.message,
                lastTimestamp: newMessage.timestamp,
                unreadCount:
                  newMessage.senderId !== userId && 
                  conv.id !== activeConversationId
                    ? conv.unreadCount + 1
                    : conv.unreadCount,
              };
            }
            return conv;
          });
          const conversationExistsInList = updatedConvs.some(
            (conv) => conv.id === newMessage.conversationId
          );
          if (!conversationExistsInList) {
            const expert = experts.find(
              (exp) => exp.id === newMessage.senderId || exp.id === newMessage.receiverId
            );
            if (expert) {
              return [
                ...updatedConvs,
                {
                  id: newMessage.conversationId,
                  expert: expert,
                  lastMessage: newMessage.message,
                  lastTimestamp: newMessage.timestamp,
                  unreadCount: newMessage.senderId !== userId ? 1 : 0,
                },
              ];
            }
          }
          return updatedConvs;
        });
      });

      socketio.current.on("disconnect", () => {
        console.log("Disconnected from chat server");
      });
    }
    return () => {
      if (socketio.current) {
        socketio.current.off("connect");
        socketio.current.off("conversations");
        socketio.current.off("conversationMessages");
        socketio.current.off("message");
        socketio.current.off("disconnect");
        socketio.current.disconnect();
        socketio.current = null;
      }
    };
  }, [user, userId, activeConversationId]); 

  const handleSelectConversation = useCallback(
    async (convId, expertId) => {
      let targetConversationId = convId;
      if (!convId) {
        targetConversationId = `conv_${userId}_${expertId}_${Date.now()}`;
      }

      const expert = experts.find((e) => e.id === expertId);
      setActiveExpert({ ...expert, conversationId: targetConversationId });
      setActiveConversationId(targetConversationId);
      setShowChatList(false);  
      setConversations((prevConvs) => {
        const exists = prevConvs.find((c) => c.id === targetConversationId);
        if (exists) {
          return prevConvs.map((conv) =>
            conv.id === targetConversationId ? { ...conv, unreadCount: 0 } : conv
          );
        }
        return [
          ...prevConvs,
          {
            id: targetConversationId,
            expert: expert,
            lastMessage: null,
            lastTimestamp: null,
            unreadCount: 0,
          },
        ];
      });

      // Завантажуємо повідомлення для вибраної розмови
      if (socketio.current) {
        socketio.current.emit("loadConversationMessages", targetConversationId);
      }
    },
    [userId] 
  );


  const addMessage = useCallback((message, convId, receiverId) => {
    const currentUserId = userId; 

    const userMessage = {
      conversationId: convId,
      senderId: currentUserId,
      receiverId: receiverId,
      message: message,
      timestamp: new Date().toISOString(),
      _id: `temp_${Date.now()}_${Math.random()}`, 
    };

    setConversations((prevConvs) => {
      return prevConvs.map((conv) => {
        if (conv.id === convId) {
          return {
            ...conv,
            lastMessage: message,
            lastTimestamp: userMessage.timestamp,
          };
        }
        return conv;
      });
    });

    setActiveChatMessages((prevMessages) => {
      const messageExists = prevMessages.some(
        (msg) => msg._id === userMessage._id && userMessage._id !== undefined
      );
      if (messageExists) {
        return prevMessages;
      }
      return [...prevMessages, userMessage];
    });

    if (socketio.current) {
      socketio.current.emit("newMessage", userMessage);
    }

    const randomIndex = Math.floor(Math.random() * autoResponsePhrases.length);
    const autoResponseMessageText = autoResponsePhrases[randomIndex];

    setTimeout(() => {
      const botMessage = {
        conversationId: convId,
        senderId: receiverId, 
        receiverId: currentUserId, 
        message: autoResponseMessageText,
        timestamp: new Date().toISOString(),
        _id: `temp_bot_${Date.now()}_${Math.random()}`, 
      };

      setActiveChatMessages((prevMessages) => [...prevMessages, botMessage]);

      setConversations((prevConvs) => {
        return prevConvs.map((conv) => {
          if (conv.id === convId) {
            return {
              ...conv,
              lastMessage: autoResponseMessageText,
              lastTimestamp: botMessage.timestamp,
            };
          }
          return conv;
        });
      });


      if (socketio.current) {
        socketio.current.emit("saveBotMessage", botMessage);
      }
    }, 1500); 
  }, [userId]); 

  const handleBackToList = () => {
    setActiveConversationId(null);
    setActiveExpert(null);
    setActiveChatMessages([]);
    setShowChatList(true); 
    if (socketio.current) {
      socketio.current.emit("loadConversations"); 
    }
  };

  const Logout = () => {   
    setActiveConversationId(null);
    setActiveExpert(null);
    setActiveChatMessages([]);
    setShowChatList(true); 
    if (socketio.current) {
      socketio.current.disconnect(); 
      socketio.current = null;
    }
  };

  return (
    <div className="chat-app-container">    
      <div className="chat-layout">
        <ChatListPanel
          conversations={conversations}
          onSelectConversation={handleSelectConversation}
          currentUserId={userId} 
          showChatList={showChatList}
        />
        {activeExpert ? (
          <ChatWindow
            chats={activeChatMessages}
            activeExpert={activeExpert}
            addMessage={addMessage}
            onBackToList={handleBackToList}
            currentUserId={userId} 
            showChatList={showChatList}
          />
        ) : (
          <div className={`chat_window_placeholder ${showChatList ? 'hidden-on-mobile' : ''}`}>
            <p>Select a chat or start a new one to begin.</p>
          </div>
        )}
      </div>
    </div>
  );
}