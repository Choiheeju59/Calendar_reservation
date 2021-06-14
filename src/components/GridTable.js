const GridTable = ({rowDateList, openModal}) => {

    return(
        <table className = "grid">
            <tr>
                {
                    Object.values(rowDateList).map(
                        (date) => {
                           return (
                            <td className = "_month_cell"
                            id = {date.getDate()}
                            onClick = {()=>openModal(date)}>
                               <div className = "outline"></div>
                            </td>
                           )
                        }
                    )
                }
            </tr>
        </table>
    );
}

export default GridTable;