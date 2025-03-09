'use client';
import React, { useState, useEffect } from 'react';

const Header = () => {
    const [dateTime, setDateTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setDateTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const time = dateTime.toLocaleTimeString();
    const date = dateTime.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });

    return (
        <header style={{ backgroundColor: '#9f2800', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px' }}>
            <div style={{ color: 'white', fontSize: '30px' }}>
                Hindu Panchang Calendar
            </div>
            <div
                style={{
                    color: 'white',
                    fontSize: '18px',
                    border: '1px solid white',
                    padding: '5px',
                    borderRadius: '5px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }} >
                <div suppressHydrationWarning>{time}</div>
                <div>{date}</div>
            </div>
        </header>
    );
}

export default Header;