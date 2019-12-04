import Vue from "vue";
import Vuex from "vuex";



export const state = () => ({
  counter: [], 
  mostrar:true
})

export const mutations = {
  increment (state, date) {
    state.counter=date
  },
  cambio (state, estado) {
    state.mostrar=estado
  }
}

/*
export default function() {
  const Store = new Vuex.Store({
    state: () => ({
      list: [],
      contratos: [
        {
          id: "1",
          nombre: "Compra Venta",
          descripcion: "....",
          secciones: [
            {
              id: "1",
              nombre: "objeto",
              contenido:
                "OBJETO: El VENDEDOR, por medio del presente instrumento transfiere a título de compraventa real y efectiva al COMPRADOR el derecho de dominio y la posesión que tiene y ejerce sobre el siguiente bien:",
                bien:[]
            },
            {
              id: "2",
              nombre: "seccion 1",
              contenido:
                "- PRECIO: Las partes han acordado como precio del bien objeto de la compraventa, la suma de: _________ __________________________PESOS M CTE($___________________) valor que EL COMRPADOR pagará AL VENDEDOR de la siguiente manera:_____________________________________________________"
            },
            {
              id: "3",
              nombre: "seccion 2",
              contenido: "este es el contenido de la seccion 2"
            },
            {
              id: "4",
              nombre: "seccion 3",
              contenido: "este es el contenido de la seccion 3"
            }
          ]
        },
        {
          id: "2",
          nombre: "Arendamento",
          objeto: "este contrato tiene por objeto....",
          secciones: [
            {
              id: "1",
              nombre: "seccion 1",
              contenido: "este es el contenido de la seccion 1"
            },
            {
              id: "2",
              nombre: "seccion 2",
              contenido: "este es el contenido de la seccion 2"
            },
            {
              id: "3",
              nombre: "seccion 3",
              contenido: "este es el contenido de la seccion 3"
            }
          ]
        }
      ]
    }),
    mutations: {
      
    },
    modules: {
      datos: {
        namespaced: true,
        state: () => ({
          list: {}
        }),
        mutations: {
          add(state, text) {
            console.log(text);
            state.list = { nombre: text };
          },
          remove(state, { datos }) {
            state.list.splice(state.list.indexOf(todo), 1);
          },
          toggle(state, { todo }) {
            todo.done = !todo.done;
          }
        }
      }
    }
  });
  return Store;
}
*/