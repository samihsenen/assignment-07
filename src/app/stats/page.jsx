/* eslint-disable */
'use client'
import { useEffect, useState } from 'react';
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip
} from 'recharts';

const COLORS = ['#8B5CF6', '#1E3A34', '#22C55E'];

const StatsPage = () => {
    const [timeline, setTimeline] = useState([]);

    useEffect(() => {
        const storedData = localStorage.getItem('activityTimeline');

        setTimeline(
            storedData ? JSON.parse(storedData) : []
        );
    }, []);

    const chartData = [
        {
            name: 'Text',
            value: timeline.filter(item => item.type === 'Text').length
        },
        {
            name: 'Call',
            value: timeline.filter(item => item.type === 'Call').length
        },
        {
            name: 'Video',
            value: timeline.filter(item => item.type === 'Video').length
        },
    ];

    return (
        <div className="min-h-screen bg-slate-50 p-12 flex justify-center">
            <div className="w-full max-w-3xl bg-white p-10 rounded-2xl shadow-sm">

                <h1 className="text-3xl font-bold mb-6">
                    Friendship Analytics
                </h1>

                {timeline.length > 0 ? (
                    <>
                        <div className="h-[280px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={chartData}
                                        innerRadius={75}
                                        outerRadius={100}
                                        paddingAngle={6}
                                        dataKey="value"
                                    >
                                        {chartData.map((_, index) => (
                                            <Cell
                                                key={index}
                                                fill={COLORS[index]}
                                                stroke="none"
                                            />
                                        ))}
                                    </Pie>

                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="flex justify-center gap-6 mt-6">
                            {chartData.map((item, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <div
                                        className="w-2 h-2 rounded-full"
                                        style={{ backgroundColor: COLORS[index] }}
                                    />
                                    <span className="text-sm text-slate-500">
                                        {item.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <p className="text-center text-slate-400 py-10">
                        No activity data logged yet.
                    </p>
                )}
            </div>
        </div>
    );
};

export default StatsPage;