import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/*
  Generated class for the IndoorDB provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class IndoorDB {

  private db: SQLiteObject;

  constructor(private sqlite: SQLite) {

    /*
    this.sqlite.create({
        name: 'data.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
        this.db = db;
        console.log('Base de datos inicializada: ' + db);
        db.executeSql('create table if not exists controllers(name VARCHAR(50), ip VARCHAR(20))', {})
        .catch(e => console.log(e));
      })
      .catch(e => console.log(e));
      */
  }

  listControllers() : Promise<Array<{ name: string, ip: string}>> {
      return new Promise((resolve, reject) => {
        resolve(Array({ name: 'Prueba', ip: '127.0.0.1'},{ name: 'Otro', ip: '127.0.0.2'}));
      });
    /*
      return new Promise((resolve, reject) => {
          this.db.executeSql("SELECT name, ip FROM controllers", [])
          .then((data) => {
              let response = Array<{ name: string, ip: string}>();
              if(data.rows.length > 0) {
                  for(var i = 0; i < data.rows.length; i++) {
                      response.push({ name: data.rows.item(i).name, ip: data.rows.item(i).ip });
                  }
              }
              resolve(response);
          }, (error) => {
              reject(error);
          });
      });
      */
  }
}
