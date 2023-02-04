import React from "react";
import { useDispatch } from 'react-redux';
import MovingComponent from 'react-moving-text';
import { setBookSliceData } from '../../../store';
import SidePanel from "./SidePanel";
import { BsChevronDoubleLeft } from 'react-icons/bs';

const SidePanelControl = ({userId, userInDb}) => {
    let hidePanel = 'invisible'; let disablePanel = true;
    if(userInDb) {
        hidePanel = 'visible';
        disablePanel = false;
    }
    const dispatch = useDispatch();
    return (
        <div className={`${hidePanel} flex w-30 mr-5 flex-col space-y-2 border-gray-200 p-2`}>
            <button disabled={disablePanel} className="max-[640px]:text-sm text-blue-900 font-bold text-lg " onClick={()=>dispatch(setBookSliceData({sliderOpen:true}))}>
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
            <SidePanel userId={userId}/>
        </div>
    );
}
export default SidePanelControl;
