import { useState, useEffect } from "react";
import { formatTime, calculateTime } from "../utils/auxiliaryFunction";
import style from "../Component/Timer.module.css"

const Timer = () =>{
    //States to manage time, initialTime, editing and running fields with values
    const [time, setTime] = useState(0); //current time in seconds
    const [intialTime, setinitialTime] = useState(0); //time initially set by user
    const [editState, setEditState] = useState({field: null, value: ''}) //State for editing the value
    const [isRunning, setIsRunning] = useState(false); //tracks if timer is running or paused
    
    useEffect(()=>{
        const progress = intialTime > 0 ? ((intialTime - time)/intialTime)*100 : 0;
        document.documentElement.style.setProperty('--progress', `${progress}%`)
    }, [time, intialTime]);

    useEffect(()=>{
        let interval = 0;
        if(isRunning && time > 0){
            interval = setInterval(()=>{
                setTime((prevTime)=>prevTime-1)
            }, 1000);
        } else if(time===0) {
            setIsRunning(false);
        }
        return () => {
            if(interval) clearInterval(interval);
        };
    }, [isRunning, time]);

    const handleField = (field)=>{
        if(editState.field===field){
            const newTime = {
                ...formatTime(time),
                [field]: editState.value.padStart(2, '0')
            };
        
        const calculatedTime = calculateTime(newTime.hours, newTime.minutes, newTime.seconds);

        setTime(calculatedTime)
        setinitialTime(calculatedTime);

        setEditState({field: null, value: ''});
        } else {
            setIsRunning(false);
            setEditState({field, value: formatTime(time)[field].replace(/^0+/, '')});
        }
    };

    const handleInputChange = (e) =>{
        const value = e.target.value.replace(/\D/g, '').slice(0,2);
        setEditState((prevState)=>({...prevState, value}));
    };

    const {hours, minutes, seconds} = formatTime(time);

    return(
        <div className={style.timerApp}>
            <div className={style.timerDisplay}>
                <div className={style.timerCircle}>
                    <div className={style.timerTime}>
                        {editState.field === 'hours' ? (
                            <input 
                                className={style.timeInput}
                                type="text"
                                value={editState.value}
                                onChange={handleInputChange}
                                onBlur={()=>handleField(hours)}
                                autoFocus
                            />
                        ) : (
                            <span className={style.timeUnit} onClick={()=>handleField('hours')}>{hours}</span>
                        )} :
                        {editState.field==='minutes' ? (
                            <input 
                                className={style.timeInput}
                                type="text"
                                value={editState.value}
                                onChange={handleInputChange}
                                onBlur={()=>handleField('mintues')}
                                autoFocus
                            />
                        ):(
                            <span className={style.timeUnit} onClick={()=>handleField('minutes')}>{minutes}</span>
                        )} :
                        {editState.field==='seconds' ? (
                            <input
                                className={style.timeInput}
                                type="text"
                                value={editState.value}
                                onChange={handleInputChange}
                                onBlur={()=>handleField('seconds')}
                                autoFocus
                            />
                        ):(
                            <span className={style.timeUnit} onClick={()=>handleField('seconds')}>{seconds}</span>
                        )}
                    </div>
                </div>
            </div>
            <div className={style.actionButtons}>
                <button className={style.actionButton} onClick={()=> setIsRunning(!isRunning)}>
                    {isRunning ? 'Pause' : 'Start'}
                </button>

                <button className={style.actionButton} onClick={()=>{setTime(0); setinitialTime(0); setIsRunning(false); }}>
                    Reset
                </button>
            </div>

        </div>
    )
}

export default Timer;