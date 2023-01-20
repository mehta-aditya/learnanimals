import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";

// Deletes whole giphy directory with all its content
export const deleteDatabase = async () => {
  if ((await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
    await FileSystem.deleteAsync(FileSystem.documentDirectory + 'SQLite');
  }
}

//get the animals db from the assets folder and open it on the phone
export const openDatabase = async () => {
  if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
    await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
  }
  if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite/animals.db')).exists) {
    await FileSystem.downloadAsync(
      Asset.fromModule(require('../../assets/database/animals.db')).uri,
      FileSystem.documentDirectory + 'SQLite/animals.db'
    );
  }

  return SQLite.openDatabase('animals.db');
}

//get all the animals in the same family
export const getChoicesFromDatabase = async (family) => {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
     tx.executeSql(
      'SELECT * FROM Animal WHERE family = ? ORDER BY RANDOM() LIMIT 4;',
      [family],
      (_, result) => resolve(result),
      (_, err) => reject(err),
     );
    });
   });
}