import { Todo } from "../models/todo.models";


/**
 * 
 * @param {Todo} todo 
 */
export const createTodoHtml = (todo) => {
    if (!todo) throw new Error('A todo object is required');

    // Destructuramos el objeto todo para obtener sus propiedades
    const { done, description, id } = todo

    const html = `
        <div class="view">
            <input class="toggle" type="checkbox" ${done ? 'checked' : ''}>
            <label>${description}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    `;

    const liElement = document.createElement('li');
    liElement.innerHTML = html;

    // Agregamos el atributo id con el método serAtribute
    liElement.setAttribute('data-id', id);

    // Agregamos la clase completed con el método classList.add solo si el done está en true
    if (done)
        liElement.classList.add('completed');

    return liElement;
};