// // Import necessary dependencies
// import React, { useEffect, useState } from 'react';
// import { Line } from 'react-chartjs-2';
// import Chart from 'chart.js/auto'; // Import Chart.js auto mode to automatically register components

// const CoronaSummary = () => {
//     const [activePatientsData, setActivePatientsData] = useState([]);

//     useEffect(() => {
//         const fetchActivePatientsData = async () => {
//             try {
//                 // Fetch data for active patients from the API
//                 const data = await MemberMobx.getMember();
//                 const activeMembers = data.filter(m => m.startOfIll !== "");

//                 // Process data to calculate active patients each day in the last month
//                 const activePatientsLastMonth = calculateActivePatientsLastMonth(activeMembers);

//                 // Update state with the calculated data
//                 setActivePatientsData(activePatientsLastMonth);
//             } catch (error) {
//                 console.error('Error fetching active patients data:', error);
//             }
//         };

//         fetchActivePatientsData();
//     }, []);

//     const calculateActivePatientsLastMonth = (data) => {
//         const currentDate = new Date();
//         const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);

//         // Filter active members whose startOfIll falls within the last month
//         const activeMembersLastMonth = data.filter(m => {
//             // Split the string into year, month, and day parts
//             const [year, month, day] = startOfIll.split('.');

//             // Create a new Date object using the extracted parts
//             const startOfIllDate = new Date(year, month -1, day);
//             // const startOfIllDate = new Date(m.startOfIll);
//             return startOfIllDate >= lastMonth && startOfIllDate <= currentDate;
//         });

//         // Count active patients for each day in the last month
//         const activePatientsLastMonth = [];
//         for (let date = new Date(lastMonth); date <= currentDate; date.setDate(date.getDate() + 1)) {
//             const dateString = date.toISOString().split('T')[0];
//             const activePatients = activeMembersLastMonth.filter(m => m.startOfIll.split(' ')[0] === dateString).length;
//             activePatientsLastMonth.push({ date: dateString, activePatients: activePatients });
//         }

//         return activePatientsLastMonth;
//     };

//     // Prepare data for chart
//     const chartData = {
//         labels: activePatientsData.map((item) => item.date),
//         datasets: [
//             {
//                 label: 'Active Patients',
//                 data: activePatientsData.map((item) => item.activePatients),
//                 fill: false,
//                 borderColor: 'rgb(75, 192, 192)',
//                 tension: 0.1,
//             },
//         ],
//     };

//     return (
//         <div>
//             <h2>Active Patients in the Last Month</h2>
//             <Line data={chartData} />
//         </div>
//     );
// };

// export default CoronaSummary;
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

const CoronaSummary = () => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        // Fetch data and prepare chart data
        const fetchDataAndPrepareChartData = async () => {
            try {
                // Fetch data for active patients from the API or from local data
                const activePatientsData = await fetchActivePatientsData(); // Implement this function to fetch data

                // Prepare chart data
                const preparedChartData = prepareChartData(activePatientsData); // Implement this function to prepare data

                // Set the prepared chart data to state
                setChartData(preparedChartData);
            } catch (error) {
                console.error('Error fetching active patients data:', error);
            }
        };

        fetchDataAndPrepareChartData();
    }, []);

    // Function to prepare chart data based on the provided logic
    const prepareChartData = (data) => {
        const currentDate = new Date();
        const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);

        // Filter active members whose startOfIll falls within the last month
        const activeMembersLastMonth = data.filter(m => {
            // Split the string into year, month, and day parts
            const [year, month, day] = startOfIll.split('.');

            // Create a new Date object using the extracted parts
            const startOfIllDate = new Date(year, month -1, day);
            // const startOfIllDate = new Date(m.startOfIll);
            return startOfIllDate >= lastMonth && startOfIllDate <= currentDate;
        });

        // Count active patients for each day in the last month
        const activePatientsLastMonth = [];
        for (let date = new Date(lastMonth); date <= currentDate; date.setDate(date.getDate() + 1)) {
            const dateString = date.toISOString().split('T')[0];
            const activePatients = activeMembersLastMonth.filter(m => m.startOfIll.split(' ')[0] === dateString).length;
            activePatientsLastMonth.push({ date: dateString, activePatients: activePatients });
        }

        return activePatientsLastMonth;
    };

    return (
        <div>
            <h2>Active Patients in the Last Month</h2>
            {chartData && <Line data={chartData} />}
        </div>
    );
};

export default CoronaSummary;
