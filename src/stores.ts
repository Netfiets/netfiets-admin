import { AuthStore } from "./components";
import NotifierStore from "./components/Notifier/NotifierStore";

const notifierStore = new NotifierStore()

export default () => ({
  authStore: new AuthStore(notifierStore),
  notifierStore,
})
