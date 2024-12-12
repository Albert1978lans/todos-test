import {ActionsType, tasksReducer, tasksType} from "./Todolist";

let startState: tasksType;
beforeEach(() => {
    startState = [
        {id: '1', checked: false, title: 'Тестовое задание'},
        {id: '2', checked: false, title: 'Прекрасный код'},
        {id: '3', checked: true, title: 'Покрытие тестами'},
    ];
});

test('status of specified task should be changed', () => {

    const action: ActionsType = {type: 'CHANGE-TASK-STATUS', taskId: '2', status: true};

    const endState = tasksReducer(startState, action)

    expect(endState[0].checked).toBe(false);
    expect(endState[1].checked).toBe(true);
    expect(endState[2].checked).toBe(true);
});

test('correct task should be added to correct array', () => {

    const action: ActionsType = {type: 'CREATE-TASK', title: 'Верстка тудулиста'};

    const endState = tasksReducer(startState, action)


    expect(endState[3].title).toBe('Верстка тудулиста');
    expect(endState.length).toBe(4)
});

test('correct tasks should be deleted from correct array', () => {

    const action: ActionsType = {type: 'CLEAR-COMPLETED'};

    const endState = tasksReducer(startState, action)

    expect(endState[2]).toBe(undefined);
    expect(endState.length).toBe(2)
});

