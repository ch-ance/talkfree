export interface Channel {
  name: string;
  id: string;
  description: string;
  groupName: string;
}

export interface Team {
  name: string;
  id: string;
  link: string;
  channels: Channel[];
}

export interface User {
  username: string;
  id: string;
  avatar: string;
}
