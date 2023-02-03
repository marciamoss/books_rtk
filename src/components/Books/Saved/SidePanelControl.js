import React from "react";
import { useDispatch } from 'react-redux';
import MovingComponent from 'react-moving-text';
import { setBookSliceData } from '../../../store';
import SidePanel from "./SidePanel";
import { BsChevronDoubleLeft } from 'react-icons/bs';

const SidePanelControl = () => {
    const dispatch = useDispatch();
    return (
        <div className="flex w-30 mr-5 flex-col space-y-2 border-gray-200 p-2">
            <button className="text-green-800 font-bold text-2xl " onClick={()=>dispatch(setBookSliceData({sliderOpen:true}))}>
                <MovingComponent
                    type="effect3D"
                    duration="1000ms"
                    delay="0s"
                    direction="normal"
                    timing="ease"
                    fillMode="none">
                    <div className="flex"><BsChevronDoubleLeft size={40}/><p className="self-center">Open</p></div>
                </MovingComponent>
            </button>
            <SidePanel/> 
        </div>
    );
}
export default SidePanelControl;
