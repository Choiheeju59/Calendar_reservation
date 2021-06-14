import { useEffect, useState } from 'react';
import GridTable from './GridTable';
import ScheduleTable from './ScheduleTable';
import {isEqual} from 'date-fns';

const MonthRow = ({rowDateList, weekScheduleList, height, openRegisterModal, openModal}) => {
    const groupingSameDate = (weekList, idx) => {
        var groupingList = new Array(7);
        for(var i = 0; i < 7; i++){
            // weekScheduleList.map((sch) => {
            // console.log("time: ", sch.time, rowDateList[i], isEqual(sch.time, rowDateList[i]))});

            // weekList[i] = weekScheduleList && weekScheduleList.filter((data) => {isEqual(rowDateList[i], data.time)});
            groupingList[i] = weekScheduleList && weekScheduleList.filter((data) => isEqual(rowDateList[i],data.time));
        }

        // console.log("group: ", groupingList);
        return groupingList;

    }

    const getMax = (groupingList) => {
        let max = 0;
        groupingList.map(data => {
            if(data.length > max)
            max = data.length;
        })
        return max;
    }

    const getSortedScheduleList = (weekList) => {
        var groupings = groupingSameDate(weekScheduleList);
        var maxCnt = getMax(groupings);
        var resultList = [];
        for(var i = 0; i < maxCnt; i++){
            resultList[i] = [];
            for(var j = 0; j<7; j++){
                resultList[i].push(groupings[j][i])
            }
        }
        console.log("ResultList: ", resultList);
        return resultList;
    }

    useEffect(() => {
        setScheduleObj(getSortedScheduleList(weekScheduleList))
     },[weekScheduleList]);

    const [weekScheduleObj, setScheduleObj] = useState(getSortedScheduleList(weekScheduleList));

    return(
        <div className = "month_row" style = {{"height" : height + "%"}}>
            <GridTable rowDateList = {{...rowDateList}} openModal ={openRegisterModal}/>
            <ScheduleTable rowDateList = {{...rowDateList}} weekScheduleList = {weekScheduleObj} openModal = {openModal}/>
        </div>
    );
};

export default MonthRow;