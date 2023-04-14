import React from 'react';
import { Space, Modal } from 'antd';
import { useState, useEffect } from 'react';
import { priceT } from '@lib/utils';
import { useSession } from '@lib/context';
import { io } from 'socket.io-client';
import SERVER_SETTINGS from '@lib/serverSettings';
import { useRouter } from 'next/router';
import { checkProductPurchase, mutateTokenBalance } from '@lib/service';

const BACKEND_URL = SERVER_SETTINGS.baseURL;
let socket = null;

export default function Chat({ visible, setVisible, id, detail }) {
    console.log('🚀 ~ file: chat.js:15 ~ Chat ~ detail:', detail);
    const [message, setMessage] = useState('');
    const { user } = useSession();
    const listenSocketEvents = () => {
        socket.on('connect', () => {
            console.log('user connected', socket.id);
        });
        // Message from server
        socket.on('message', (message) => {
            console.log(message);
        });
    };

    useEffect(() => {
        if (user?.id) {
            socket = io(`${BACKEND_URL}/`, {
                transports: ['websocket'],
                query: {
                    roomName: JSON.stringify([
                        `joinRoom_${user?.id}_${detail?.user?.id}`,
                    ]),
                },
            });
            listenSocketEvents();

            return () => socket.disconnect();
        }
    }, [user?.id]);

    const sendMessage = () => {
        socket.emit('chatMessage', {
            senderId: user?.id,
            recieverId: detail?.user?.id,
            msg: message,
        });
    };

    return (
        <Modal
            className="hs-modal"
            footer={null}
            open={visible}
            onCancel={setVisible}
            // afterClose={handleModalAfterClose}
        >
            <div className="hs-modal-head">
                <h4 className="h4 mb-4" data-aos="fade-up">
                    Чат
                </h4>
                <input
                    type="text"
                    placeholder="Write your message!"
                    class="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button
                    type="button"
                    onClick={() => sendMessage()}
                    class="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
                >
                    <span class="font-bold">Send</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        class="h-6 w-6 ml-2 transform rotate-90"
                    >
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                    </svg>
                </button>
            </div>
        </Modal>
    );
}
