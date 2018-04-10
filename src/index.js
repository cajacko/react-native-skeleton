import { AppRegistry } from "react-native";
import { name } from "../app.json";
import App from "./components/App";

export default function() {
  AppRegistry.registerComponent(name, () => App);
}
