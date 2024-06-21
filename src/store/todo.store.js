import { Todo } from "../todos/models/todo.models";

export const Filters = {
    All: 'All',
    Complete: 'Complete',
    Pending: 'Pending',
}

const state = {
    todos: [
        new Todo('Piedra del alma'),
        new Todo('Piedra del infinito'),
        new Todo('Piedra del tiempo'),
        new Todo('Piedra del poder'),
        new Todo('Piedra de realidad'),
    ],
    filter: Filters.All,
}

const initStore = () => {
    LoadStore();
    console.log('initStore 🥑');
};

/**
 * 
 * @param {Filters} filter 
 * @returns 
 */
const getTodos = (filter = Filters.All) => {
    // Evaluamos con un swith que filtro tenemos aplicado
    switch (filter) {
        case Filters.All:
            return [...state.todos]; // Creamos un nuevo array con el operador spred
        case Filters.Complete:
            return state.todos.filter(todo => todo.done); // Retornamos un nuevo array con los que están en todo.done
        case Filters.Pending:
            return state.todos.filter(todo => !todo.done); // Retornamos un nuevo array con los que estan en !todo.done
        default:
            throw new Error(`Options ${filter} is not valid`); // Retornamos un new Error con el filter invalido usando interpoblación
    }

}

const LoadStore = () => {
    if (!localStorage.getItem('state')) return
    // Usamos JSON.parse() para convertir el string en un objeto y JSON.stringify() para convertir un objeto en un string
    const { todos = [], filter = Filters.All } = JSON.parse(localStorage.getItem('state'));
    // Asignamos los nuevos valores al state.todos y state.filter
    state.todos = todos;
    state.filter = filter;
};

const saveStateToLocalStorage = () => {
    // Accedemos al localStorage y seleccionamos setItem para añadir al localStorage
    // Usamos JSON.stringify() para convertir un objeto en un string y JSON.parse() para convertir el string en un objeto
    localStorage.setItem('state', JSON.stringify(state));
};

/**
 * 
 * @param {String} description 
 */
const addTodo = (description) => {
    if (!description) throw new Error('Description is required');
    // Al ser un array, nada nos impide usar todos los metodos que estos poseen, usamos el método push() para agregar un new todo
    state.todos.push(new Todo(description));
    saveStateToLocalStorage();
};

/**
 * 
 * @param {String} todoId 
 */
const toggleTodo = (todoId) => {
    // Usamos el metodo .map() para retornar un nuevo arreglo del state donde el todo.done sería inverso ( Si está en false retonra true y al inverso )
    state.todos = state.todos.map(todo => {
        if (todo.id === todoId) {
            todo.done = !todo.done;
        }
        return todo;
    });

    saveStateToLocalStorage();
};

/**
 * 
 * @param {String} todoId 
 */
const deleteTodo = (todoId) => {
    //Retornamos un nuevo arreglo donde retornamos todos los todos que no coinciden con el todoId.
    state.todos = state.todos.filter(todo => todo.id !== todoId);
    saveStateToLocalStorage();
};

const deleteCompleted = () => {
    //Retornamos un nuevo arreglo donde eliminamos todos los que estén completados (todo.done).
    state.todos = state.todos.filter(todo => !todo.done);
    saveStateToLocalStorage();
};

/**
 * 
 * @param {Filters} newFilter 
 */
const setFilter = (newFilter = Filters.All) => {
    // Asignamos el nuevo filtro a la propiedad state.Filter con el valor que se pasa como argumento.
    state.filter = newFilter;
    saveStateToLocalStorage();
};

const getCurrentFilter = () => {
    // Retornamos el valor de la propiedad state.Filter actual
    return state.filter;
};

export default {
    addTodo,
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    getTodos,
    initStore,
    LoadStore,
    setFilter,
    toggleTodo,
};