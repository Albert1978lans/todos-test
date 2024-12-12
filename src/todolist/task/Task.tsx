import Checkbox from '@mui/material/Checkbox';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import s from './task.module.css'
import {ChangeEvent, memo} from "react";

type PropsType = {
    id: string
    checked: boolean
    title: string
    changeStatus: (status: boolean, taskId: string) =>void
}

export const Task = memo(function Task(props: PropsType) {

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        props.changeStatus(event.target.checked, props.id);
    }
    // console.log('Task', new Date().toLocaleTimeString())

  return (
      <div className={s.wrapper}>
          <div className={s.checkbox}>
              <Checkbox
                  checked={props.checked}
                  sx={{ '& .MuiSvgIcon-root': { fontSize: '35px' } }}
                  icon={<PanoramaFishEyeIcon />}
                  checkedIcon={<CheckCircleOutlineIcon />}
                  onChange={handleChange}
              />
          </div>

              <div className={`${s.title} ${props.checked ? s.titleCompleted : ''}`}>{props.title}</div>

      </div>
  )
})