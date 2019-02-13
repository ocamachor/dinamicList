'use strict';

// variables globales

// variables del DOM
const appDiv = document.querySelector('#app');
const form = document.querySelector('#formulario');
const listaTbody = document.querySelector('tbody');
const titulo = 'Lista Dinámica en ES6';
const firstnameInput = document.querySelector('#firstname');
const lastnameInput = document.querySelector('#lastname');
const ageInput = document.querySelector('#age');


//variables lógicas
let lista_personas = [];

let _id = 0;
let _name = '';
let _lastname = '';
let _age = 0;
let _index = 0;



// plantillas

let row_template = (id,name,lastname,age) => {
   listaTbody.innerHTML += `<tr id="${id}">
      <th scope="row">${id}</th>
      <td>${name}</td>
      <td>${lastname}</td>
      <td>${age}</td>
      <td> <button class="btn btn-outline-danger btn-sm">Del</button> </td>
   </tr>`
}

let title_template = (text) => `<h1 class="display-4">${text}</h1>`


// funciones

let set_storage = (key,value) => localStorage.setItem(key, JSON.stringify(value));
let get_storage = (key) => JSON.parse(localStorage.getItem(key));
let validar_datos = () => ('personas' in localStorage) ? true : false;


function new_person(name, lastname, age) {
   lista_personas = (validar_datos()) ? get_storage('personas') : [];
   _index = parseInt(get_storage('index')) + 1;
   set_storage('index',_index);

   // se crea una nueva persona
   _id = _index;
   _name = name;
   _lastname = lastname;
   _age = age;

   // se agrega la nueva persona a la lista de personas (Modelo)
   lista_personas.push({id:_id, name:_name, lastname:_lastname, age:_age});

   // actualiza la nueva lista en el local storage
   set_storage('personas',lista_personas);

   // Actualiza la Vista
   actualizar_vista();
}

let validar_campo = (text) => (text.length === 0) ? false : true;


// MANEJO del DOM

let header = document.querySelector('header');
header.innerHTML = title_template(titulo);

// función para actualizar la vista
function actualizar_vista(){
   listaTbody.innerHTML = '';
   lista_personas.forEach(element => {
      row_template(element.id, element.name, element.lastname, element.age);
   });
}




// EVENTOS

document.addEventListener('DOMContentLoaded', function (e) {
   e.preventDefault();

   if ('index' in localStorage) {
      _index = parseInt(get_storage('index'));
   }
   else {
      _index = 0;
      set_storage('index',_index);
   }
   lista_personas = (validar_datos()) ? get_storage('personas') : [];
   actualizar_vista();
});


form.addEventListener('submit', function (e) {
   e.preventDefault();

   // llama a la función new_person para crear un nuevo registro
   new_person(firstnameInput.value, lastnameInput.value, ageInput.value);

   // limpiar los campos de la vista
   form.reset();
   firstnameInput.focus();
});

listaTbody.addEventListener('click', function (e) {
   e.preventDefault();

   for (let index = 0; index < e.path.length; index++) {
      let element = e.path[index];
      if (element.tagName === 'TR') {

         for (let index = 0; index < lista_personas.length; index++) {
            const persona = lista_personas[index];
            if (persona.id === parseInt(element.id)) {
               lista_personas.splice(index,1);
               set_storage('personas',lista_personas);
               actualizar_vista();
               firstnameInput.focus();
               console.log(lista_personas);
            }
         }

         break;
      }
   }

});