import * as dotenv from "dotenv"
dotenv.config()
const config = {
  port: process.env.PORT,
  db: {
    userDb: process.env.USER_DB,
    passDb: process.env.PASS_DB
  }
}

export default config