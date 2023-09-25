//imports from next js
import { NextRequest, NextResponse } from "next/server";

//imports from db (helpers/utils)
import { fineDataInDb, writeDataInDB } from "@/helpers/db";

//import from third party modules
import bcryptjs from "bcryptjs";

// imported from node js module
import { randomUUID } from "crypto";
//imported from @types
import { IUserData, IUserRequestData } from "@/types";

//===============================
export const POST = async (request: NextRequest) => {
  //get data from request
  const newUserData: IUserRequestData = await request.json();

  //find user in DB
  const user: IUserData | undefined = fineDataInDb(newUserData.email);

  //return error response
  if (user) {
    return NextResponse.json(
      { error: "user already registered" },
      { status: 400 }
    );
  }
  //create salt for password
  const salt: string = await bcryptjs.genSalt(10);

  //crating a haspassword using bcrypt
  const hashPassword: string = await bcryptjs.hash(newUserData.password, salt);

  //created a new user object
  const newUser: IUserData = {
    _id: randomUUID(),
    name: newUserData.name,
    email: newUserData.email,
    password: hashPassword,
  };
  //write data in db
  const response = writeDataInDB(newUser);
  if (response) {
    return NextResponse.json(
      { message: "User Registration is Completed 🤝" },
      { status: 201 }
    );
  }
  return NextResponse.json({ error: "something went wrong" }, { status: 500 });
};
