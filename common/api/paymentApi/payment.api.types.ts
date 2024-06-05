import { IService } from '@common/api/serviceApi/service.api.types'
import { IDomain } from '@common/modules/models/Domain'
import { IRealEstate } from '@common/modules/models/RealEstate'
import { IStreet } from '@common/modules/models/Street'
import { ServiceType } from '@utils/constants'
import { ObjectId } from 'mongoose'
import { IUser } from './../../modules/models/User'

export interface IPaymentField {
  type: ServiceType | string
  name?: string
  lastAmount?: number
  amount?: number
  price: number
  sum: number
}

export interface IProvider {
  description: string
}

export interface IReciever {
  companyName: string
  adminEmails: string[]
  description: string
}

export interface IPayment {
  invoiceNumber: number
  type: string
  invoiceCreationDate: Date
  domain: Partial<IDomain> | string
  street: Partial<IStreet> | string
  company: Partial<IRealEstate> | string
  monthService: Partial<IService> | string
  description?: string
  invoice: IPaymentField[]
  provider: IProvider
  reciever: IReciever
  generalSum: number
}

export interface IExtendedPayment extends IPayment {
  _id: string
  _v: number
}

export interface IAddPaymentResponse {
  success: boolean
  data: IExtendedPayment
}

export interface IFilter {
  text: string
  value: string
}

export interface IGetPaymentResponse {
  totalPayments: {
    generalSum?: number
    credit?: number
    debit?: number
    maintenancePrice?: number
    inflicionPrice?: number
    discount?: number
    waterPart?: number
    electricityPrice?: number
    garbageCollectorPrice?: number
    cleaningPrice?: number
    waterPrice?: number
    custom?: number
    placingPrice?: number
  }
  currentCompaniesCount: number
  currentDomainsCount: number
  domainsFilter: IFilter[]
  realEstatesFilter: IFilter[]
  addressFilter: IFilter[]
  data: IExtendedPayment[]
  success: boolean
  total: number
}

export interface IDeletePaymentResponse {
  data: string
  success: boolean
}

export interface IPayer {
  email: string
  _id: ObjectId | string | IUser['_id']
}

export interface IGetPaymentNumberResponse {
  success: boolean
  data: number
}

export interface IGeneratePaymentPDF {
  payments: IExtendedPayment[]
}

export interface IGeneratePaymentPDFResponce {
  buffer: Buffer
  fileName: string
  fileExtension: string
}
