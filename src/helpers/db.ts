//imported from node modules
import path from "path";
import fs from "fs";

//imported from types
import { IUserData } from "@/types";

//create database file path
const databaseFilePath = path.join(process.cwd(), "src/database/db.json");

export const getDataFromDB = (): { users: IUserData[] } => {
  try {
    const db = fs.readFileSync(databaseFilePath, "utf-8");
    const dataFromDB = JSON.parse(db);
    return dataFromDB;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

export const writeDataInDB = (newUserData: object) => {
  try {
    const currentDataFromDB = getDataFromDB();

    const newDataToInsertInDB = JSON.parse(JSON.stringify(currentDataFromDB));

    newDataToInsertInDB.users.push(newUserData);

    fs.writeFileSync(
      databaseFilePath,
      JSON.stringify(newDataToInsertInDB, null, 4)
    );
    return true;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

export const fineDataInDb = (fieldValue: string) => {
  const currentDataFromDB = getDataFromDB();

  try {
    return currentDataFromDB.users.find((user) => {
      if (user._id == fieldValue) return true;
      else if (user.name == fieldValue) return true;
      else if (user.email == fieldValue) return true;
      else return undefined;
    });
  } catch (error: any) {
    throw new Error(error?.message);
  }
};
