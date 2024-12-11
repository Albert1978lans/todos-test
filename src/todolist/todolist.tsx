import s from './todolist.module.css'
import {Task} from "./task/Task";
import Input from '@mui/material/Input';
import {InputAdornment} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
import React, {ChangeEvent, useReducer, useState} from "react";
import {v1} from 'uuid';

type tasksType = Array<{ id: string, checked: boolean, title: string }>
const initialTasks: tasksType = [
    {id: v1(), checked: false, title: 'Тестовое задание'},
    {id: v1(), checked: false, title: 'Прекрасный код'},
    {id: v1(), checked: false, title: 'Покрытие тестами'},
]

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    status: boolean
}
export type CreateTaskActionType = {
    type: 'CREATE-TASK'
    title: string
}
type ActionsType = ChangeTaskStatusActionType
    | CreateTaskActionType


function tasksReducer(state: tasksType, action: ActionsType) {
    switch (action.type) {
        case 'CHANGE-TASK-STATUS':
            return state.map(task => {
                return task.id === action.taskId ? {...task, checked: action.status} : task
            })
        case 'CREATE-TASK':
            return [...state, {id: v1(), checked: false, title: action.title}]
        default:
            return state
    }
}

export function Todolist() {

    const [tasks, dispatch] = useReducer(
        tasksReducer,
        initialTasks
    );

    const [input, setInput] = useState('')

    const createTask = (title: string) => {
        dispatch({type: 'CREATE-TASK', title})
        setInput('')
    }

    const changeStatus = (status: boolean, taskId: string) => {
        dispatch({type: 'CHANGE-TASK-STATUS', status: status, taskId: taskId})
    }

    return (
        <div className={s.wrapper}>
            <div className={s.title}>todos</div>
            <div className={s.todolist}>
                <div>
                    <Input
                        id="input-with-icon-adornment"
                        value={input}
                        fullWidth
                        placeholder={'What needs to be done?'}
                        size="medium"
                        sx={{padding: '15px', fontSize: '25px'}}
                        startAdornment={
                            <InputAdornment position="start">
                                <ExpandMoreIcon/>
                            </InputAdornment>
                        }
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            setInput(event.target.value);
                        }}
                        onBlur={(event) => {
                            createTask(input)
                        }}
                        onKeyPress={(event) =>{
                            if (event.key === 'Enter') createTask(input)

                        }}
                    />

                </div>

                <div>
                    {tasks.map(task => <Task
                        key={task.id}
                        id={task.id}
                        checked={task.checked}
                        title={task.title}
                        changeStatus={changeStatus}
                    />)}
                </div>
                <div className={s.buttons}>
                    <div>{2} items left</div>
                    <div>
                        <Button variant="outlined" color={'inherit'}>All</Button>
                        <Button variant="text" color={'inherit'}>Active</Button>
                        <Button variant="text" color={'inherit'}>Completed</Button>
                    </div>
                    <div>
                        <Button variant="text"
                                color={'inherit'}
                        >Clear completed</Button>
                    </div>
                </div>

            </div>

        </div>
    )
}














{/*<TextField*/}
{/*    id="input-with-icon-textfield"*/}
{/*    sx={{ paddingTop: '15px', paddingBottom: '15px' , fontSize: '25px' }}*/}
{/*    fullWidth*/}
{/*    placeholder={'What needs to be done?'}*/}
{/*    size="medium"*/}
{/*    slotProps={{*/}
{/*        input: {*/}
{/*            startAdornment: (*/}
{/*                <InputAdornment position="start">*/}
{/*                    <ExpandMoreIcon />*/}
{/*                </InputAdornment>*/}
{/*            ),*/}
{/*        },*/}
{/*    }}*/}
{/*    variant="standard"*/}
{/*/>*/}

