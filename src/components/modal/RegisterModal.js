import { useEffect, useState } from "react";
import DatePicker, {registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ko from 'date-fns/locale/ko';
// import {PL/ACE_TYPE} from '../../constant/index';

const RegisterModal = ({openState, close, onClick, cellData, onChange}) => {
    const [registerData, setRegisterData] = useState();
    const [cellDate, setCellDate] = useState();
const [startDate, setStartDate] = useState(new Date(2021, 5));
registerLocale('ko', ko)

 const PLACE_TYPE = {
    place01 : "대회의실",
    place02: "대강당",
    place03: "소강당"
    }


    return(
        <div className = {openState  ? "modal openModal" : "modal"}
            style = {{
                top: window.innerHeight / 2 - window.innerHeight / 4,
                left: window.innerWidth / 2 - window.innerWidth / 4
            }}>
            <section>
                <header>일정 등록창</header>
                <main>
                    <table>
                        <tr>
                            <td>제목</td>
                            <td><input value = {cellData.name} onChange={(e)=>{onChange({...cellData, name: e.target.value})}}/>
                            </td>
                        </tr>
                        <tr>
                            <td>일시</td>
                            <td>
                            <DatePicker selected={cellData.time} 
                                        onChange={(time)=> {onChange({...cellData, time})}}
                                        locale = {"ko"} />
                            </td>
                        </tr>
                        <tr>
                            <td>장소</td>
                            <td>
                                <select 
                                        value = {cellData.place}
                                        onChange = {(e)=> {onChange({...cellData, place: e.target.value})}}>
                                <option value = {"place01"}>{PLACE_TYPE["place01"]}</option>
                                <option value = {"place02"}>{PLACE_TYPE["place02"]}</option>
                                <option value = {"place03"}>{PLACE_TYPE["place03"]}</option>
                                </select>

                            </td>
                        </tr>
                    </table>
                </main>
                <footer>
                    <button className = "close" onClick = {close}>닫기</button>
                    <button className = "register" onClick = {onClick}>등록</button>
                </footer>
            </section>
        </div>
    );
}

export default RegisterModal;