  const stores = ['negociacoes'];
  const version = 4;
  const dbName = 'aluraframe';

  let connection = null;
  let close = null;

  export class ConnectionFactory {

    constructor() {
        throw new Error('Não é possível criar instâncias de ConnectionFactory');
    }

    static getConnection() {
        return new Promise((resolve, reject) => {

          let openRequest = window.indexedDB.open(dbName, version); 

          openRequest.onupgradeneeded = e => {
            ConnectionFactory._createStores(e.target.result);
          };
          
          openRequest.onsuccess = e => {
            if(!connection) {
              connection = e.target.result;
              close = connection.close.bind(connection);
              connection.close = function() { // monkey patch
                throw new Error('Você não pode fechar diretamente a conexão');
              };
            }
            resolve(connection);
          };
          
          openRequest.onerror = e => {
            console.log(e.target.error);
            reject(e.target.error.name);
          };
          
        });
      }
      static _createStores(connection) {
        stores.forEach(store => {
          if(connection.objectStoreNames.contains(store)) connection.deleteObjectStore(store);
          connection.createObjectStore(store, { autoincrement: true});
        });
        
      }

      static closeConnection() {
        if(connection) {
          close();
          connection = null;
        }
      }
  }


// getConnection vai ser um metodo estatico
// getConnection vai retornar uma promise
// nao importa o nº de x que eu chamar o metodo estatico a conexao tem que ser a mesma
// o programados nao pode chamar close diretamente
