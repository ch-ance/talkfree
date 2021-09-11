export interface IMessage {
  id: string;
  text: string;
  timestamp: number;
  from: string;
  to: string;
  index?: number;
}

export interface IChannel {
  id: string;
  name: string;
}
