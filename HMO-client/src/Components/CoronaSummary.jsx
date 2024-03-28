import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import MemberMobx from '../mobx/MemberMobx';
import { Chart as ChartJS } from 'chart.js/auto'

const CoronaSummary = () => {

    const [dataChart, setDataChart] = useState();
    const[immunesMember,setImmunesMember]= useState(0);
    useEffect(() => {
        const fetchDataAndPrepareChartData = async () => {
            try {
                const PatientsData = await MemberMobx.getMember();
                const activePatientsData = PatientsData.filter(m => m.startOfIll !== "");
                if (activePatientsData.length === 0) {
                    console.log("No active patients data available.");
                    return; // Return early if no active patients data
                }
                prepareChartData(activePatientsData);
                const immunes=PatientsData.filter(p=>p.vaccinations.length==0)
                setImmunesMember(immunes.length);
                console.log(immunes.length)
            } catch (error) {
                console.error('Error fetching active patients data:', error);
            }
        };
        fetchDataAndPrepareChartData();
    }, []);

    const prepareChartData = (data) => {

        const currentDate = new Date();
        const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

        // Filter active members whose startOfIll falls within the last month
        const activeMembersLastMonth = data.filter(m => {
            // Check if the member object has the required properties
            if (!m.startOfIll || !m.endOfIll) {
                return false;
            }
            // Split the string into day, month, and year parts
            const [day, month, year] = m.startOfIll.split('.');
            // Create a new Date object using the extracted parts
            const startOfIllDate = new Date(year, month - 1, day);
            // Split the string into day, month, and year parts
            const [day1, month1, year1] = m.endOfIll.split('.');
            // Create a new Date object using the extracted parts
            const endOfIllDate = new Date(year1, month1 - 1, day1);
            return startOfIllDate >= lastMonth && startOfIllDate <= currentDate;
        });

        // Count active patients for each day in the last month
        activeMembersLastMonth.forEach(m => {
            // Split the string into day, month, and year parts
            const [day, month, year] = m.startOfIll.split('.');
            // Create a new Date object using the extracted parts
            const startOfIllDate = new Date(year, month - 1, day);
            // Split the string into day, month, and year parts
            const [day1, month1, year1] = m.endOfIll.split('.');
            // Create a new Date object using the extracted parts
            const endOfIllDate = new Date(year1, month1 - 1, day1);
            const arr = Array.from({ length: 31 }, () => 0);
            for (let i = 0; i < currentDate.getDate() - lastMonth.getDate(); i++) {
                const startDay = Math.max(startOfIllDate.getDate(), firstDayOfMonth.getDate());
                const endDay = Math.min(endOfIllDate.getDate(), lastDayOfMonth.getDate());
                console.log(startDay, "---", endDay);
                for (let day = startDay; day <= endDay; day++) {
                    arr[day - 1]++;
                }
            }
            setDataChart(arr);
        });
    };
//     const r=[3,4,5,6,7]
// console.log(dataChart)
// console.log(r)
    let days = Array.from({ length: 31 }, (_, index) => index + 1);
    const [userDataChart, setUaerDataChart] = useState(
        {
            labels: days.map(x=>x),
            datasets: [{
                label: "Users sick",
                data: dataChart,                
            }]
        }
    );

    return (
        <div>
            <h2>Active Patients in the Last Month</h2>
            <Line data={userDataChart} style={{ width: '60vw', height: '40vh' }} />
            <h2>Num of patients not immunes: {immunesMember}</h2>

            
        </div>
    );
};
export default CoronaSummary;




