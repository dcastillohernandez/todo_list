import html from './app.html?raw';
import todoStore, { Filters } from '../store/todo.store';
import { renderPending, renderTodos } from './use-cases';


const ElementIDs = {
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    ClearCompletedButton: '.clear-completed',
    FiltersLIs: '.filtro',
    PendingCountLabel: '#pending-count',
};

/**
 * 
 * @param {String} elementId 
 */
export const App = (elementId) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
        renderTodos(ElementIDs.TodoList, todos);
        updatePendingTodos();
    };

    const updatePendingTodos = () => {
        renderPending(ElementIDs.PendingCountLabel);
        
    };

    //Función autoinvocada que se ejecuta automáticamente cuando se monta la aplicación.
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();
    })();

    // Referencias HTML
    const newDescriptionInputs = document.querySelector(ElementIDs.NewTodoInput);
    const todoListUl = document.querySelector(ElementIDs.TodoList);
    const ClearCompletedButton = document.querySelector(ElementIDs.ClearCompletedButton);
    const FiltersLIs = document.querySelectorAll(ElementIDs.FiltersLIs);


    //Listeners
    newDescriptionInputs.addEventListener('keyup', (event) => {

        // Evaluamos si la tecla que se presiona es desigual de enter que tiene el keyCode de 13
        if (event.keyCode !== 13) return;
        // Evaluamos si el input está vacío
        if (event.target.value.trim().lenght === 0) return;

        // Agregamos el nuevo todo a la lista de todos
        todoStore.addTodo(event.target.value);
        // Mostramos la lista de Todos nuevamente en el screen
        displayTodos();
        // Limpiamos el input y agregamos el todo a la lista de todos
        event.target.value = '';
    });

    todoListUl.addEventListener('click', (event) => {
        const element = event.target.closest('[data-id]');

        // Recordar que el toddleTodo() se encarga de cambiar el done la valor opuesto
        todoStore.toggleTodo(element.getAttribute('data-id'));
        // Mostramos la lista de Todos nuevamente en el screen
        displayTodos();
    });

    todoListUl.addEventListener('click', (event) => {

        // Estoy convirtiendo la constante isDestroyElement en un valor booleano
        const isDestroyElement = event.target.className === 'destroy';
        const element = event.target.closest('[data-id]');

        if (!element || !isDestroyElement) return;
        todoStore.deleteTodo(element.getAttribute('data-id'));
        displayTodos();
    });

    ClearCompletedButton.addEventListener('click', () => {
        // Eliminamos todos los todos que estén completados (todo.done)
        todoStore.deleteCompleted();
        displayTodos();
    });

    FiltersLIs.forEach((element) => {

        // Creamos el listener después de acceder el elemento con el cliclo forEach ya que querySelectedAll retorna un array
        element.addEventListener('click', (element) => {
            // Eliminamos la clase de selected pero usando el forEach ya que con querySelectedAll retonramos un array
            FiltersLIs.forEach((e) => e.classList.remove('selected'));
            // Agregamos la clase selected al elemento que se clickeó
            element.target.classList.add('selected');

            console.log(element.target.text);

            switch (element.target.text) {
                case 'Todos':
                    todoStore.setFilter(Filters.All);
                    break;
                case 'Pendientes':
                    todoStore.setFilter(Filters.Pending);
                    break;
                case 'Completados':
                    todoStore.setFilter(Filters.Complete);
                    break;
            }
            // Despues que terminamos el swift llamamos el diplayTodos();
            displayTodos();

        });
    })
};