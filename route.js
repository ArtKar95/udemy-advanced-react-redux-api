import signUp from "./controllers/authentication.js";

const route = (app) => {
  app.post("/signup", signUp);
};

export default route;
