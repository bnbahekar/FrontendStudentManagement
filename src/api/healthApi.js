import axios from "axios";

export const getHealth = () =>
  axios.get("http://localhost:8080/actuator/health");