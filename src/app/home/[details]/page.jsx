'use client' 
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function Page({ params: paramsPromise }) {
    const [user, setUser] = useState(null);
    
useEffect(() => {
    (async () => {
        const p = await paramsPromise;
        const data = await fetch('/friends.json').then(r => r.json());
        setUser(data.find(f => f.id == (p.details || p.id)));
    })();
}, [paramsPromise]);

    const handleCheckIn = (type) => {
        if (!user) return;
        const newEntry = {
            id: Date.now(),
            type: type,
            date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
            person: user.name,
        };
        const existingHistory = JSON.parse(localStorage.getItem('activityTimeline')) || [];
        localStorage.setItem('activityTimeline', JSON.stringify([newEntry, ...existingHistory]));
        
       
        window.dispatchEvent(new Event('timelineUpdated'));
        toast.success(`${type} record saved for Timeline!`);
    };

    if (!user) return (
        <div className="flex items-center justify-center min-h-screen">
            <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
    );

    return (
        <div className="bg-slate-50 p-6 flex flex-col md:flex-row gap-6 font-sans min-h-screen">
           
            <div className="w-full md:w-80 flex flex-col gap-4">
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col items-center text-center">
                    <div className="avatar mb-4">
                        <div className="w-24 rounded-full ring ring-slate-100 ring-offset-base-100 ring-offset-2 overflow-hidden">
                            <img src={user.picture} alt={user.name} />
                        </div>
                    </div>
                    <h2 className="text-xl font-bold text-slate-800">{user.name}</h2>
                    <div className="flex flex-col gap-1 mt-2">
                        <span className={`badge text-white text-[10px] h-5 border-none uppercase ${user.status === 'overdue' ? 'bg-red-500' : 'bg-green-500'}`}>
                            {user.status}
                        </span>
                        <div className="flex flex-wrap gap-1 justify-center mt-1">
                            {user.tags?.map((tag, index) => (
                                <span key={index} className="badge bg-green-100 text-green-700 border-none text-[10px] h-5 uppercase">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                    <p className="italic text-slate-400 text-sm mt-4">{user.bio}</p>
                    <p className="text-xs text-slate-400 mt-2">Preferred: {user.email}</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                    <button className="w-full flex items-center justify-center gap-2 py-3 border-b border-slate-50 text-slate-600 hover:bg-slate-50 text-sm">
                        <span><Image src="/vector.png" alt="Snooze" width={10} height={10} /></span> Snooze 2 Weeks
                    </button>
                    <button className="w-full flex items-center justify-center gap-2 py-3 border-b border-slate-50 text-slate-600 hover:bg-slate-50 text-sm">
                        <span><Image src="/archive.png" alt="Archive" width={10} height={10} /></span> Archive
                    </button>
                    <button className="w-full flex items-center justify-center gap-2 py-3 text-red-500 hover:bg-red-50 text-sm">
                        <span><Image src="/delete.png" alt="Delete" width={10} height={10} /></span> Delete
                    </button>
                </div>
            </div>

            <div className="flex-1 flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 text-center">
                        <h3 className="text-2xl font-bold text-slate-800">{user.days_since_contact}</h3>
                        <p className="text-xs text-slate-400">Days Since Contact</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 text-center">
                        <h3 className="text-2xl font-bold text-slate-800">{user.goal}</h3>
                        <p className="text-xs text-slate-400">Goal (Days)</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 text-center">
                        <h3 className="text-2xl font-bold text-slate-800">{user.next_due_date}</h3>
                        <p className="text-xs text-slate-400">Next Due</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex justify-between items-center">
                    <div>
                        <h4 className="text-slate-700 font-semibold mb-2">Relationship Goal</h4>
                        <p className="text-slate-400 text-sm">Connect every <span className="font-bold text-slate-800">{user.goal} days</span></p>
                    </div>
                    <button className="btn btn-sm btn-ghost bg-slate-50 text-slate-500 border border-slate-200 hover:bg-slate-100">Edit</button>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex-1">
                    <h4 className="text-slate-700 font-semibold mb-4">Quick Check-In</h4>
                    <div className="grid grid-cols-3 gap-4">
                        <button onClick={() => handleCheckIn('Call')} className="flex flex-col items-center justify-center gap-2 p-6 bg-slate-50 rounded-lg hover:bg-slate-100 border border-slate-100">
                            <Image src="/call.png" alt="Call" width={30} height={30} />
                            <span className="text-xs font-medium text-slate-600">Call</span>
                        </button>
                        <button onClick={() => handleCheckIn('Text')} className="flex flex-col items-center justify-center gap-2 p-6 bg-slate-50 rounded-lg hover:bg-slate-100 border border-slate-100">
                            <Image src="/text.png" alt="Text" width={30} height={30} />
                            <span className="text-xs font-medium text-slate-600">Text</span>
                        </button>
                        <button onClick={() => handleCheckIn('Video')} className="flex flex-col items-center justify-center gap-2 p-6 bg-slate-50 rounded-lg hover:bg-slate-100 border border-slate-100">
                            <Image src="/video.png" alt="Video" width={30} height={30} />
                            <span className="text-xs font-medium text-slate-600">Video</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}