import React from "react"
import "./Message.css"

// Call from 2nd page i.e CHAT.js

const Message = ({ user, message, classs }) => {
    // execute in other users case 
    if (user) {
        return (
            <div className={`messageBox ${classs}`}>
                {`${user}: ${message}`}
            </div>
        )
    }
    // execute in my case 
    else {


        return (
            <div className={`messageBox ${classs}`}>
                {`You: ${message}`}
            </div>
        )
    }
}

export default Message
