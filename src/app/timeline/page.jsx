'use client'
import Image from 'next/image';
import { useEffect, useState } from 'react';

const TimelinePage = () => {
    const [history, setHistory] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        
        const loadData = () => {
            if (typeof window !== "undefined") {
                const storedData = localStorage.getItem('activityTimeline');
                if (storedData) {
                    setHistory(JSON.parse(storedData));
                }
                setIsLoaded(true);
            }
        };

      
        loadData();

       
        window.addEventListener('timelineUpdated', loadData);
        window.addEventListener('storage', loadData);

        return () => {
            window.removeEventListener('timelineUpdated', loadData);
            window.removeEventListener('storage', loadData);
        };
    }, []); 

    const getIconSrc = (type) => {
        const icons = {
            'Call': '/call.png',
            'Text': '/text.png',
            'Video': '/video.png',
            'Meeting': '/meeting.png'
        };
        return icons[type] || '/meeting.png';
    };

    if (!isLoaded) return null;

    return (
        <div className="bg-slate-50 min-h-screen p-6 font-sans">
            <h1 className="text-2xl font-bold text-slate-800 mb-6 text-center">Timeline</h1>
            <div className="max-w-2xl mx-auto flex flex-col gap-4">
                {history.length === 0 ? (
                    <p className="text-center text-slate-400 italic">No activity logged yet.</p>
                ) : (
                    history.map((item, index) => (
                        <div key={item.id || index} className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
                            <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-slate-50 rounded-lg">
                                <Image
                                    src={getIconSrc(item.type)}
                                    alt={item.type}
                                    width={20}
                                    height={20}
                                    className="object-contain"
                                />
                            </div>
                            <div>
                                <h4 className="text-slate-800 font-bold">
                                    {item.type} <span className="text-slate-500 font-normal">with {item.person}</span>
                                </h4>
                                <p className="text-slate-400 text-xs mt-1">{item.date}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default TimelinePage;