export interface IUsuario {
  name: string;
  email: string;
  password: string;
}

export interface IUserReturn {
  msg: string;
  access_token: string
  user:{
    id: string
    email:string
    name: string
    password:string
  }
}


export interface IDesign {
  key: string;
  value: string
}
export interface IHeader {
  show?: boolean
}
