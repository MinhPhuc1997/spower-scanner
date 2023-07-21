import { openDatabase } from "react-native-sqlite-storage";

export let DATABASE_NAME = "MFDatabase.db";

export const getAllEntity = async () => {
  const db = await openDatabase({ name: DATABASE_NAME });

  await db.transaction((tx) => {
    let sql = "SELECT * from db_data";
    tx.executeSql(sql, [], (_tx, results) => {
      console.log("Results", results.rows.length, results.rows.item(1));
    });
  });
};


export const saveEntity = async () => {
  const db = await openDatabase({ name: "MFDatabase.db" });
  db.transaction((tx) => {
    let sql = "INSERT INTO db_data (code,type,total,create_at) values ('A1246',2,1,'2022-12-45 12:45:13')";
    tx.executeSql(sql, [], (_tx, results) => {
      console.log("Results", results.rowsAffected);
    });
  });
};

export const deleteEntity = async (id: number) => {
  const db = await openDatabase({ name: "MFDatabase.db" });
  db.transaction((tx) => {
    let sql = "DELETE FROM  db_data where id=" + id;
    tx.executeSql(sql, [], (_tx, results) => {
      console.log("Results", results.rowsAffected);
    });
  });
};

export const getTotalEntityType = async () => {
  const db = await openDatabase({ name: DATABASE_NAME });

  await db.transaction((tx) => {
    let sql = "SELECT count(*) as total from db_data where type=1";
    tx.executeSql(sql, [], (_tx, results) => {
      console.log(  results.rows.item(0).total);
     // return  results.rows.item(0);
    });
  });
};


