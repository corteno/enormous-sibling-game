import RootApiUrl from "./RootApiUrl";
import io from "socket.io-client";

const socket = io.connect(`${RootApiUrl}`);

export default socket;