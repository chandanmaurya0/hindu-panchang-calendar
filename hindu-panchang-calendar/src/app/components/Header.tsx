'use client';
import React, { useState, useEffect, CSSProperties } from 'react';

const Header = () => {
    const [dateTime, setDateTime] = useState(new Date());
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

    useEffect(() => {
        const timer = setInterval(() => setDateTime(new Date()), 1000);
        
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        
        window.addEventListener('resize', handleResize);
        
        return () => {
            clearInterval(timer);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const time = dateTime.toLocaleTimeString();
    const date = dateTime.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });

    // Responsive styles
    const isMobile = windowWidth < 768;
    
    const headerStyle: CSSProperties = {
        backgroundColor: '#9f2800',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: isMobile ? 'center' : 'space-between',
        alignItems: 'center',
        padding: isMobile ? '10px' : '20px',
        gap: isMobile ? '10px' : '0',
    };
    
    const titleStyle: CSSProperties = {
        color: 'white',
        fontSize: isMobile ? '20px' : '30px',
        textAlign: 'center',
    };
    
    const clockStyle: CSSProperties = {
        color: 'white',
        fontSize: isMobile ? '14px' : '18px',
        border: '1px solid white',
        padding: isMobile ? '3px' : '5px',
        borderRadius: '5px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    };

    return (
        <header style={headerStyle}>
            <div style={titleStyle}>
                Hindu Panchang Calendar
            </div>
            <div style={clockStyle}>
                <div suppressHydrationWarning>{time}</div>
                <div>{date}</div>
            </div>
        </header>
    );
}

export default Header;