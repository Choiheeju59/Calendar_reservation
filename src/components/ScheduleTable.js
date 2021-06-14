const ScheduleTable = ({rowDateList, weekScheduleList, openModal}) => {
    console.log("weekdata: ", weekScheduleList);
    const clickEvent = (e, cellData) => {
        const width = e.clientX;
        const height = e.clientY;
        openModal(width, height, cellData);
    }
    return(
    <table className = "schedule_list">
        {/* //날짜 */}
        {console.log("rowDateList", rowDateList)}
        <tr>
            {Object.values(rowDateList).map((date, idx) => {
                return(
                <td style = {{"textAlign" : "left"}}
                    className = {idx == 0 ? "red" : ""}
                >
                    {date.getDate()}
                </td>)
            })}
        </tr>
        {/* //일정 */}
        {
            weekScheduleList && weekScheduleList.map((rawScheduleList) => {
            return(
                <tr>
                {
                rawScheduleList.map((cellData) => {
                    return(
                        cellData ?
                        <td className = {`${cellData.color} cursor`}
                            onClick = {(e)=>{clickEvent(e, cellData)}}
                        >
                        {cellData.name}
                        </td> : <td>&nbsp;</td>
                            )
                })
                }
                </tr>
                )
            })
        }
    </table>
    );

}

export default ScheduleTable;