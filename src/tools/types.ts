export interface ITableItem {
  id: number
  time: number
  clearance: string
  shas?: number
  tonPercent?: number
  weight?: number
  stickingPercent?: number
}

export type SelectType = {
  value: string;
  label: string;
}

type ValuePiece = Date | null;

export type DatePickerValue = ValuePiece | [ValuePiece, ValuePiece];

export interface IModel {
  id: number
  name: string
  kig_plan: string
  weight_planned: string
  weight_passport: string
}

export interface ICoefficient {
  id: number
  name: string
  value: string
}

export interface IRfid {
  id: number
  rfid: string
}

export interface IDescent {
  id: number
  name: string
}

export interface IVehicle {
  id: number
  model: IModel
  rfid: IRfid
  number: string
}

export interface IService {
  id: number
  descent: IDescent
  name: string
  sid: string
  token: string
  last_request: string
  status: 'online' | 'error' | 'offline'
}

export interface IStatus extends IService{
  event: {
    code: string
    name: string
  }
}

export interface IError {
  id: number
  name: string
  code: string
  type: string
}

export interface IEvent {
  id: number
  vehicle: null | IVehicle
  code: string
  name: string | null
  error: IError
  service: IService
  check_in_time: string
  check_out_time: string
  input_volume: string
  output_volume: string
  unloaded_volume: string
  technical_road: boolean
  oversized: boolean
  sticking: string
  kig: string
  mass: string
}

export interface IFault extends IEvent {
  service_id?: string
}

export type TTableRow = number | string | boolean