import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { bookingVehicleAPI } from '../../../../features/booking/bookingAPI';

interface RevenueData {
    name: string;
    revenue: number;
    monthOrder: number;
}

const RevenueChart = () => {
    const { data: bookings } = bookingVehicleAPI.useGetBookingVehicleQuery();
    const [chartData, setChartData] = useState<RevenueData[]>([]);

    useEffect(() => {
        if (bookings) {
            const revenueByMonth = new Map<string, { revenue: number; monthOrder: number }>();
            
            const currentDate = new Date();
            const twelveMonthsAgo = new Date(currentDate.getFullYear(), currentDate.getMonth() - 11, 1);

            bookings.forEach((booking) => {
                if (booking.payment_status === 'completed') {
                    const bookingDate = new Date(booking.booking_date);
                    
                    if (bookingDate >= twelveMonthsAgo) {
                        const monthYear = bookingDate.toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short'
                        });
                        
                        const monthOrder = (bookingDate.getFullYear() * 100) + (bookingDate.getMonth() + 1);
                        const revenue = Number(booking.total_price) || 0;

                        if (!revenueByMonth.has(monthYear)) {
                            revenueByMonth.set(monthYear, { revenue, monthOrder });
                        } else {
                            const current = revenueByMonth.get(monthYear)!;
                            revenueByMonth.set(monthYear, { 
                                revenue: current.revenue + revenue,
                                monthOrder: current.monthOrder
                            });
                        }
                    }
                }
            });

            const data = Array.from(revenueByMonth, ([name, { revenue, monthOrder }]) => ({
                name,
                revenue,
                monthOrder
            })).sort((a, b) => a.monthOrder - b.monthOrder);

            setChartData(data);
        }
    }, [bookings]);

    return (
        <div className='bg-gray-100 p-6 rounded-lg shadow-lg'>
            <div className='bg-white p-6 rounded-lg shadow-md'>
                <h2 className="text-2xl font-bold text-gray-700 text-center mb-4">Revenue Over Time</h2>
                {chartData.length > 0 ? (
                    <div className='w-full h-80'>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
                                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.5} />
                                <XAxis 
                                    dataKey="name" 
                                    stroke="#6b7280" 
                                    tick={{ fontSize: 12 }}
                                    angle={-45}
                                    textAnchor="end"
                                    height={60}
                                />
                                <YAxis 
                                    stroke="#6b7280" 
                                    tick={{ fontSize: 12 }}
                                    allowDecimals={false}
                                />
                                <Tooltip 
                                    cursor={{ fill: '#f3f4f6' }}
                                    formatter={(value: number) => [`KSh ${value.toLocaleString()}`, 'Revenue']}
                                />
                                <Legend />
                                <Line 
                                    type="monotone" 
                                    dataKey="revenue" 
                                    name="Monthly Revenue"
                                    stroke="#4f46e5" 
                                    strokeWidth={2}
                                    dot={{ r: 4 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                ) : (
                    <div className="text-center text-gray-500 py-10">
                        No revenue data available
                    </div>
                )}
            </div>
        </div>
    );
};

export default RevenueChart;