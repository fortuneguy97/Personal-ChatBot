import React from 'react'

export default function ChatBubble({ role, text }) {
    const isUser = role === 'user';
    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
            <div className={`max-w-[78%] p-3 rounded-2xl shadow-sm ${isUser ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white' : 'bg-gray-100 text-gray-900'}`}>
                <div className="text-sm whitespace-pre-wrap">{text}</div>
                <div className="text-[10px] opacity-60 mt-1 text-right">{isUser ? 'You' : 'Bot'}</div>
            </div>
        </div>
    )
}