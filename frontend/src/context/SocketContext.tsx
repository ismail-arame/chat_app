"use client";

import { createContext, useContext } from "react";
import { io, Socket } from "socket.io-client";

//socket io
const socket: Socket = io(process.env.NEXT_PUBLIC_API_ENDPOINT!);
const SocketContext = createContext(socket);

export const SocketContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocketContext = () => useContext(SocketContext);

/* 
"use client";

import { createContext, useContext } from "react";
import { io, Socket } from "socket.io-client";

//socket io
const socket: Socket = io(process.env.NEXT_PUBLIC_API_ENDPOINT as string);
const SocketContext = createContext(socket);

export const SocketContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocketContext = () => useContext(SocketContext);
*/
