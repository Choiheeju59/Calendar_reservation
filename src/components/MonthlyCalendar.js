import WeekTable from './WeekTable';
import MonthRow from './MonthRow';
import {initialData} from '../rawData';
import {useEffect, useState} from 'react';
import QuickModal from './modal/QuickModal';
import RegisterModal from './modal/RegisterModal';
import { isSameWeek } from 'date-fns';

export const MonthlyCalendar = () => {
    const dateList = [ //6월 데이터
        [new Date(2021,4,30),new Date(2021,4,31),new Date(2021,5,1),new Date(2021,5,2),new Date(2021,5,3),new Date(2021,5,4),new Date(2021,5,5)],
        [new Date(2021,5,6),new Date(2021,5,7),new Date(2021,5,8),new Date(2021,5,9),new Date(2021,5,10),new Date(2021,5,11),new Date(2021,5,12)],
        [new Date(2021,5,13),new Date(2021,5,14),new Date(2021,5,15),new Date(2021,5,16),new Date(2021,5,17),new Date(2021,5,18),new Date(2021,5,19)],
        [new Date(2021,5,20),new Date(2021,5,21),new Date(2021,5,22),new Date(2021,5,23),new Date(2021,5,24),new Date(2021,5,25),new Date(2021,5,26)],
        [new Date(2021,5,27),new Date(2021,5,28),new Date(2021,5,29),new Date(2021,5,30),new Date(2021,6,1),new Date(2021,6,2),new Date(2021,6,3)]    
    ];

    const getSortedDataList = (allScheduleList) => {
        let resultList = [];
        const len = dateList.length;
        for(let i = 0 ; i< len; i++){
            resultList.push([]);
            allScheduleList && allScheduleList.map((schedule) => {
                if(isSameWeek(schedule.time,dateList[i][0]))
                resultList[i].push(schedule);
            })
        }
    
        return resultList;

    }

    const monthHeight = 100/dateList.length;
    const [rawData, setRawData] = useState([...initialData]);
    const [scheduleList, setScheduleList] = useState(getSortedDataList(rawData));
    const [openState, setOpenState] = useState(false);
    const [openRegisterState, setOpenRegisterState] = useState(false);
    const[location, setlocation] =useState({
        height : "",
        width : ""
    });
    const initCellData = {
        name: "",
        time: new Date(2021,5),
        place: "place01"
    }

    const[cellData, setCellData] = useState({...initCellData});

    const openRegisterModal = (time) => {
        setCellData({
            ...initCellData,
            time
        })
        setOpenRegisterState(true);
        setOpenState(false);
    }

    const open = (width, height, cellData) => {
        setOpenState(true);
        setOpenRegisterState(false);
        setlocation({
            height: height,
            width: width
        })

        setCellData(cellData);

    }

    const close = () => {
        setOpenState(false);
    }

    const onRegister = () => {
        setRawData(rawData.concat({...cellData, id : rawData.length + 1}));
        setOpenRegisterState(false);
    }

    const onDelete = () => {
        var afterDeleteArr = rawData.filter((data) => data.id !== cellData.id)
        setRawData(afterDeleteArr);
        close();
    }

    useEffect(()=> { // rawData가 바뀔 때마다 정렬
        setScheduleList(getSortedDataList(rawData));
    }, [rawData]);

    return(
        <>
        <div className = "monthly_calendar">
            <WeekTable />
            <div className = "month_table">
            {dateList.map((row, idx) => {
                return <MonthRow rowDateList = {{...row}} 
                                weekScheduleList = {scheduleList[idx]} 
                                height = {monthHeight} 
                                openModal={open} // QUick modal 창 관리
                                openRegisterModal = {openRegisterModal}/> // 일정 등록창 관리
            })}
            </div>
        </div>
        <QuickModal openState = {openState} close = {close} location = {location} cellData={cellData}
                    onDelete = {onDelete}/>
        <RegisterModal 
                    openState = {openRegisterState} 
                    close = {() => {setOpenRegisterState(false)}} 
                    onClick= {onRegister}
                    cellData = {{...cellData}}
                    onChange= {setCellData}/>
        </>
    );
};

