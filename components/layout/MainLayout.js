import React from 'react';

export default function MainLayout({ children }) {
    return (
        <div className="bg-gray-900 font-inter antialiased  text-gray-200 tracking-tight flex flex-col min-h-screen overflow-hidden">
            {children}
        </div>
    );
}
