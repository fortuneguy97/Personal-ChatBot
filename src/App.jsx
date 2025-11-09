import React, { useEffect, useState, useRef } from 'react';
import ChatBubble from './components/ChatBubble';

export default function App() {
    const [messages, setMessages] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('conv')) || [
                { role: 'system', content: 'You are a helpful personal assistant.' }
            ]
        } catch (e) { return [{ role: 'system', content: 'You are a helpful personal assistant.' }] }
    })
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const containerRef = useRef(null)


    useEffect(() => {
        localStorage.setItem('conv', JSON.stringify(messages))
        containerRef.current?.scrollTo({ top: containerRef.current.scrollHeight, behavior: 'smooth' })
    }, [messages])

    const send = async () => {
        if (!input.trim()) return
        const userMsg = { role: 'user', content: input.trim() }
        const next = [...messages, userMsg]
        setMessages(next)
        setInput('')
        setLoading(true)


        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: next.filter(m => m.role !== 'system' ? true : true) })
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.error || 'API error')


            const assistant = data.assistant || { role: 'assistant', content: 'No reply' }
            setMessages(prev => [...prev, assistant])
        } catch (err) {
            setMessages(prev => [...prev, { role: 'assistant', content: `❗ Error: ${err.message}` }])
        } finally {
            setLoading(false)
        }
    }

    const clear = () => {
        const starter = [{ role: 'system', content: 'You are a helpful personal assistant.' }]
        setMessages(starter)
        localStorage.removeItem('conv')
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 flex items-center justify-center p-6">
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 grid grid-rows-[auto_1fr_auto] gap-4">
                <header className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">My AI Chatbot</h1>
                        <p className="text-sm text-gray-500">AI-powered assistant — portfolio demo</p>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={clear} className="text-sm px-3 py-1 rounded-md border">New</button>
                    </div>
                </header>


                <div ref={containerRef} className="overflow-y-auto p-3 rounded-md border border-gray-100" style={{ maxHeight: '60vh' }}>
                    {messages.filter(m => m.role !== 'system').map((m, i) => (
                        <ChatBubble key={i} role={m.role} text={m.content} />
                    ))}
                    {loading && <div className="text-sm text-gray-500">Bot is thinking...</div>}
                </div>


                <div className="mt-2 flex gap-2">
                    <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Ask me something..." className="flex-1 px-4 py-3 rounded-xl border focus:outline-none" />
                    <button onClick={send} disabled={loading} className="px-4 py-3 rounded-xl bg-indigo-600 text-white disabled:opacity-60">Send</button>
                </div>


            </div>
        </div>
    )
}