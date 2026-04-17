'use client'
import { useEffect, useState } from "react";
import Link from "next/link";

const HomePage = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('/friends.json')
            .then(res => res.json())
            .then(data => setUsers(data));
    }, []);


    const totalFriends = users.length;
    const onTrackCount = users.filter(u => u.status === "on track").length;
    const needAttentionCount = users.filter(u => u.status === "almost due").length;
    const interactionsCount = users.filter(u => u.days_since_contact <= 30).length;

    return (
        <div className="bg-slate-50 p-10 font-sans min-h-screen">
           
            <div className="text-center mb-10">
                <h1 className="text-4xl font-extrabold text-[#1a2b3c] mb-4">
                    Friends to keep close in your life
                </h1>
                <p className="text-gray-500 text-sm max-w-md mx-auto mb-6">
                    Your personal shelf of meaningful connections.
                </p>
                <button className="btn bg-[#1e3d33] hover:bg-[#162e26] text-white border-none px-6">
                    + Add a Friend
                </button>
            </div>


            <div className="flex flex-wrap justify-center gap-4 mb-12">

                
                <div className="bg-white shadow-sm border border-gray-100 rounded-lg p-8 w-64 text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-1">{totalFriends}</h2>
                    <p className="text-gray-400 text-sm">Total Friends</p>
                </div>

              
                <div className="bg-white shadow-sm border border-gray-100 rounded-lg p-8 w-64 text-center">
                    <h2 className="text-3xl font-bold text-green-500 mb-1">{onTrackCount}</h2>
                    <p className="text-gray-400 text-sm">On Track</p>
                </div>

              
                <div className="bg-white shadow-sm border border-gray-100 rounded-lg p-8 w-64 text-center">
                    <h2 className="text-3xl font-bold text-orange-400 mb-1">{needAttentionCount}</h2>
                    <p className="text-gray-400 text-sm">Need Attention</p>
                </div>

                
                <div className="bg-white shadow-sm border border-gray-100 rounded-lg p-8 w-64 text-center">
                    <h2 className="text-3xl font-bold text-blue-500 mb-1">{interactionsCount}</h2>
                    <p className="text-gray-400 text-sm font-medium leading-tight">Interactions <br /> This Month</p>
                </div>
            </div>
            <div className="max-w-6xl mx-auto px-4 mt-16 mb-8">
                <div className="relative inline-block">

                    <div className="absolute -top-4 left-0 w-280 h-1 bg-[#E9E9E9] rounded-full"></div>

                    <h2 className="text-3xl font-extrabold text-slate-800 pt-2">
                        Your Friends
                    </h2>
                </div>
            </div>
            
            <div className="flex flex-wrap gap-6 mt-10 justify-center">
                {users.map(user => (
                    <Link href={`/home/${user.id}`} key={user.id}>
                        <div className="card w-72 bg-white shadow-xl border border-gray-100 p-8 rounded-2xl flex flex-col items-center cursor-pointer hover:scale-105 transition">
                            <div className="avatar mb-4">
                                <div className="w-24 rounded-full overflow-hidden border-2 border-slate-100">
                                    <img src={user.picture} alt={user.name} />
                                </div>
                            </div>

                            <div className="text-center">
                                <h2 className="text-2xl font-bold text-slate-800">{user.name}</h2>
                                <p className="text-slate-400 text-sm mt-1 mb-4">{user.days_since_contact}d ago</p>
                            </div>

                            <div className="flex flex-col items-center gap-2">
                                {user.tags?.map((tag, i) => (
                                    <div key={i} className="badge bg-[#D1FAE5] text-[#065F46] border-none font-medium px-4 py-3">
                                        {tag.toUpperCase()}
                                    </div>
                                ))}
                                <div className={`badge text-white border-none font-medium px-6 py-4 rounded-full ${user.status === "overdue" ? "bg-red-500" :
                                    user.status === "on track" ? "bg-green-500" : "bg-yellow-500"
                                    }`}>
                                    {user.status.toUpperCase()}
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default HomePage;