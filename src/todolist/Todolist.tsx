import s from './todolist.module.css'
import {Task} from "./task/Task";
import Input from '@mui/material/Input';
import {InputAdornment} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import React, {ChangeEvent, useCallback, useEffect, useReducer, useState} from "react";
import {v1} from 'uuid';

export type tasksType = Array<{ id: string, checked: boolean, title: string }>
const initialTasks: tasksType = [
    {id: v1(), checked: false, title: 'Тестовое задание'},
    {id: v1(), checked: true, title: 'Прекрасный код'},
    {id: v1(), checked: false, title: 'Покрытие тестами'},
]

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    status: boolean
}
type CreateTaskActionType = {
    type: 'CREATE-TASK'
    title: string
}
type ClearCompletedActionType = {
    type: 'CLEAR-COMPLETED'
}


export type ActionsType = ChangeTaskStatusActionType
    | CreateTaskActionType
    | ClearCompletedActionType

export function tasksReducer(state: tasksType, action: ActionsType) {
    switch (action.type) {
        case 'CHANGE-TASK-STATUS':
            return state.map(task => {
                return task.id === action.taskId ? {...task, checked: action.status} : task
            })
        case 'CREATE-TASK':
            return [...state, {id: v1(), checked: false, title: action.title}]
        case "CLEAR-COMPLETED":
            return state.filter(task => !task.checked)
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
    const [activeTasks, setActiveTasks] = useState<number>(0)
    const [taskFilter, setTaskFilter] = useState<'all' | 'active' | 'completed'>('all')

    const createTask = (title: string) => {
        dispatch({type: 'CREATE-TASK', title})
        setInput('')
        setActiveTasks(activeTasks + 1)
    }

    const changeStatus = useCallback( (status: boolean, taskId: string) => {
        dispatch({type: 'CHANGE-TASK-STATUS', status: status, taskId: taskId})
        setActiveTasks(status ? activeTasks - 1 : activeTasks + 1)
    }, [])

    const clearCompleted = () => {
        dispatch({type: 'CLEAR-COMPLETED'})
    }

    useEffect(() => {
        let activeTasks = tasks.reduce((acc, task) => {
            if (!task.checked) return acc + 1
            return acc
        }, 0)
        setActiveTasks(activeTasks)
    }, [])

    let filteredTasks: tasksType
    if (taskFilter === 'all') {
        filteredTasks = tasks.filter(task => task)
    } else if (taskFilter === 'active') {
        filteredTasks = tasks.filter(task => !task.checked)
    } else {
        filteredTasks = tasks.filter(task => task.checked)
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
                        onBlur={() => {
                            createTask(input)
                        }}
                        onKeyPress={(event) => {
                            if (event.key === 'Enter') createTask(input)

                        }}
                    />

                </div>

                <div>
                    {filteredTasks.map(task => <Task
                        key={task.id}
                        id={task.id}
                        checked={task.checked}
                        title={task.title}
                        changeStatus={changeStatus}
                    />)}
                </div>
                <div className={s.buttons}>
                    <div>{activeTasks} items left</div>
                    <div>
                        <Button
                            variant={taskFilter === 'all' ? 'outlined' : 'text'}
                            color={'inherit'}
                            onClick={() => setTaskFilter('all')}
                        >All</Button>
                        <Button
                            variant={taskFilter === 'active' ? 'outlined' : 'text'}
                            color={'inherit'}
                            onClick={() => setTaskFilter('active')}
                        >Active</Button>
                        <Button
                            variant={taskFilter === 'completed' ? 'outlined' : 'text'}
                            color={'inherit'}
                            onClick={() => setTaskFilter('completed')}
                        >Completed</Button>
                    </div>
                    <div>
                        <Button
                            variant="text"
                                color={'inherit'}
                            onClick={() => clearCompleted()}
                        >Clear completed</Button>
                    </div>
                </div>

            </div>

        </div>
    )
}


