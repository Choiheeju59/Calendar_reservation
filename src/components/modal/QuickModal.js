import { useEffect, useState } from "react";

const PLACE_TYPE = {
    place01 : "대회의실",
    place02: "대강당",
    place03: "소강당"
    }

const QuickModal = ({openState, close, cellData, location, onDelete}) => {
    const [top, setTop] = useState(0);
    const [left, setleft] = useState(0);
    useEffect(
        ()=>{
            setTop(location.height);
            setleft(location.width);
    

            if(location.width + 450 > window.innerWidth){
                setleft(location.width - 450)
            }else if(location.height + 450 > window.innerHeight){
                setTop(location.height - 450)
            }
        }, [location]);
    
    return(
        <div className = {openState  ? "modal openModal" : "modal"}
            style = {{top: top, left: left}}>
            <section>
                <header>{cellData.name ? cellData.name : null}</header>
                <main>
                    <table>
                        <tr>
                            <td>제목</td>
                            <td>{cellData.name ? cellData.name : null}</td>
                        </tr>
                        <tr>
                            <td>일시</td>
                            <td>{cellData.time ? cellData.time.toLocaleDateString("ko") : null}</td>
                        </tr>
                        {cellData.place &&
                        <tr>
                            <td>장소</td>
                            <td>{PLACE_TYPE[cellData.place]}</td>
                        </tr>
                        }
                    </table>
                </main>
                <footer>
                    <button className = "close" onClick = {close}>닫기</button>
                    <button className = "delete" onClick = {onDelete}>삭제</button>
                </footer>
            </section>
        </div>
    );
}

export default QuickModal;