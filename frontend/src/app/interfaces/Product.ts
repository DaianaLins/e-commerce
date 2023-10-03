export interface IProduct {
  name: string,
  description: string,
  value: string,
  category: string,
  quantity: string,
  image: string,
  convert?: number,
  status?: string,
}

export interface IDolar {
  USDBRL:{
    code: string,
    codein: string,
    name: string,
    high: string,
    low: string,
    varBid: string,
    pctChange: string,
    bid: string,
    ask: string,
    timestamp: string,
    create_date: string
  }

}
