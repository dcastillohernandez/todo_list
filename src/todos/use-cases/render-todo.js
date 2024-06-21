import { Todo } from "../models/todo.models";
import { createTodoHtml } from "./";

let element;

/**
 * 
 * @param {String} elementId 
 * @param {Todo} todos 
 */
export const renderTodos = (elementId, todos = []) => {

    // Si el elemento no existe entonces se crea el elemento
    if (!element)
        element = document.querySelector(elementId);

    //Pero si el elemento no exite y no se encuentra el id entonces arroja un error
    if (!element)
        throw new Error(`Element ${elementId} not found`);

    // Limpiamos el html del elemento para que no se duplique el contenido
    element.innerHTML = '';

    // Usamos el ciclo forEach para posicionar todos los elementos en el html
    todos.forEach(todo => {
        element.append(createTodoHtml(todo))
    });

};