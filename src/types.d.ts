export interface IMessage {
  id: string;
  text: string;
  timestamp: number;
  from: string;
  to: string;
}

export interface IChannel {
  id: string;
  name: string;
}
