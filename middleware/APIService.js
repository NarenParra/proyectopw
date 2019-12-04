import axios from 'axios';
const API_URL = 'http://localhost:1337';
export class APIService {

  constructor() {

  }
  getContratos() {
    const url = `${API_URL}/api/contrato/otra`;
    return axios.get(url).then(response => response.data);
  }

  getContrato(estado) {
    const url = `${API_URL}/api/contrato/`;
    return axios.get(url, {
      params: {
        estado: estado
      }
    }).then(response => response.data);
  }


  getLinea(idc) {
    const url = `${API_URL}/api/mensaje/`;
    return axios.get(url, {
      params: {
        idc: idc
      }
    }).then(response => response.data);
  }

  getEstado(idc) {
    const url = `${API_URL}/api/estado`;
    return axios.get(url, {
      params: {
        idc: idc
      }
    }).then(response => response.data);
  }


  getContratoUsuario(idc) {
    const url = `${API_URL}/api/contratousuario`;
    return axios.get(url, {
      params: {
        idc: idc
      }
    }).then(response => response.data);
  }

  getUsuarios(idu) {
    const url = `${API_URL}/api/usuario/`;
    return axios.get(url, {
      params: {
        idc: idu
      }
    }).then(response => response.data);
  }
  getUsuario(idu) {
    const url = `${API_URL}/api/user/`;
    return axios.get(url, {
      params: {
        idc: idu
      }
    }).then(response => response.data);
  }

  getRol(idr) {
    const url = `${API_URL}/api/rol/`;
    return axios.get(url, {
      params: {
        idc: idr
      }
    }).then(response => response.data);
  }
  getContratoEtiqueta(idc) {
    const url = `${API_URL}/api/contratoetiqueta/`;
    return axios.get(url, {
      params: {
        idc: idc
      }
    }).then(response => response.data);
  }
  getContratoArticulo(idc) {
    const url = `${API_URL}/api/contratoarticulo/`;
    return axios.get(url, {
      params: {
        idc: idc
      }
    }).then(response => response.data);
  }
  getArticulo(idc) {
    const url = `${API_URL}/api/articulo/`;
    return axios.get(url, {
      params: {
        idc: idc
      }
    }).then(response => response.data);
  }
  postUsuario(docid, nombre, tipodoc) {
    const url = `${API_URL}/api/usuario/`;
    return axios.post(url, {
      params: {
        docid: docid,
        nombre: nombre,
        tipodoc: tipodoc
      }
    }).then(response => response.data);
  }
  putContrato(idc, tipoContrato, dineroN, fechaContrato, contratoCiudad, bien, dineroS, descripValor, usuariolog, docComprador, docExpeCompra, docVendedor, docExpeVende, finalidad) {
    const url = `${API_URL}/api/contrato/${idc}`;
    return axios.put(url, {
      params: {
        estado: tipoContrato,
        observaciones: "por medio del presente instrumento transfiere a título de compraventa real y efectiva al COMPRADOR el derecho de dominio y la posesión que tiene y ejerce sobre",
        valor: dineroN,
        fechainicia: fechaContrato,
        contratoCiudad: contratoCiudad,
        slugObj: "objeto",
        slugArt: bien,
        slugPre: "precio",
        valorletra: dineroS,
        descripcion: descripValor,
        slugAcep: "aceptacion",
        userlog: usuariolog,
        usercomp: docComprador,
        docExpeCompra: docExpeCompra,
        uservend: docVendedor,
        docExpeVende: docExpeVende,
        finalidad: finalidad
      }
    }).then(response => response.data);
  }
}
