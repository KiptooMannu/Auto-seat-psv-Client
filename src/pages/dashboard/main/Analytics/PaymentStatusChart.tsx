import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { bookingVehicleAPI } from '../../../../features/booking/bookingAPI';

interface PaymentData {
    name: string;
    value: number;
}

const COLORS = ['#4CAF50', '#FFC107', '#F44336', '#9E9E9E'];

const PaymentStatusChart = () => {
    const { data: bookings } = bookingVehicleAPI.useGetBookingVehicleQuery();
    const [chartData, setChartData] = useState<PaymentData[]>([]);

    useEffect(() => {
        if (bookings) {
            const statusCount = bookings.reduce((acc: { [key: string]: number }, booking) => {
                const status = booking.payment_status || 'Unknown';
                acc[status] = (acc[status] || 0) + 1;
                return acc;
            }, {});

            const data = Object.entries(statusCount).map(([name, value]) => ({
                name,
                value
            }));

            setChartData(data);
        }
    }, [bookings]);

    return (
        <div className='bg-gray-100 p-6 rounded-lg shadow-lg'>
            <div className='bg-white p-6 rounded-lg shadow-md'>
                <h2 className="text-2xl font-bold text-gray-700 text-center mb-4">Payment Status Distribution</h2>
                {chartData.length > 0 ? (
                    <div className='w-full h-80'>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={chartData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    label
                                >
                                    {chartData.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                ) : (
                    <div className="text-center text-gray-500 py-10">
                        No payment data available
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentStatusChart;