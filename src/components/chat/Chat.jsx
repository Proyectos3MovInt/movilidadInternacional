'use client'

import * as Icons from '@/components/Icons';
import MensajeEnviado from './MensajeEnviado';
import MensajeRecibido from './MensajeRecibido';
import Header from './Header';
import { useState, useEffect } from 'react';
import { getMessages, sendMessageAdmin, sendMessageStudent } from '@/lib/chat';

export default function Chat( { admin, id }) {

    const [msgs, setMsgs] = useState([]);
    const [ loaded, setLoaded ] = useState(false);

    const [newMsg, setNewMsg] = useState("");

    useEffect(() => {
        const fetchChat = async () => {
            const response = await getMessages(id);
            console.log(id);
            console.log(response);
            setMsgs(response);
            setLoaded(true);
        }
        fetchChat();
    }, []);

    const handleSubmit = () => {

        if(admin === true) {
            sendMessageAdmin(id, newMsg);
            console.log(newMsg);
        } else {
            sendMessageStudent(newMsg);
        }
        //location.reload();
    }

    return (
        <div className="w-80 inline-flex flex-col justify-start items-start">
            <Header />
            <div className="self-stretch px-6 py-10 bg-white flex flex-col justify-center items-start gap-10">

                <MensajeEnviado msg="Hola" />
                <MensajeRecibido msg="Hola 2" />
                <MensajeEnviado msg="Hola 3" />
            </div>
            <div className="self-stretch px-6 py-4 bg-white rounded-bl-lg rounded-br-lg border-t border-blue-600 inline-flex justify-between items-center">
                <input onChange={(e) => setNewMsg(e.target.value)} className="justify-center text-neutral-500 text-base font-normal font-['Montserrat'] leading-normal" placeholder="Escribe tu consulta..." />
                <div className="w-6 h-6 relative overflow-hidden">
                    <button onClick={handleSubmit}>
                        <Icons.Send onClick={handleSubmit} />
                    </button>

                </div>
            </div>
        </div>
    );
}