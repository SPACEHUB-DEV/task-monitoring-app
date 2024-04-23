import {
  IPayment,
  IPaymentField,
} from '@common/api/paymentApi/payment.api.types'
import { IRealestate } from '@common/api/realestateApi/realestate.api.types'
import { IService } from '@common/api/serviceApi/service.api.types'
import { ServiceType } from '@utils/constants'

export type InvoicesCollection = {
  [key in ServiceType | string]?: IPaymentField
}

export interface IGetInvoiceProps {
  company?: Partial<IRealestate>
  service?: Partial<IService>
  payment?: Partial<IPayment>
  prevPayment?: Partial<IPayment>
}

export interface IGetInvoiceByTypeProps {
  company?: Partial<IRealestate>
  service?: Partial<IService>
  currInvoicesCollection: InvoicesCollection
  prevInvoicesCollection: InvoicesCollection
}

/**
 * Generating initial invoices data, based on received props.
 *
 * If `payment` received - all data will be collected from this `payment`.
 *
 * -or-
 *
 * If `company`, `service`, `prevPayment` is received without `payment` - all data will be generaded by following rules:
 *
 *      price:      from `service` or by corresponding formula or 0
 *      amount:     from `prevPayment#amount` or 0 (optional)
 *      lastAmount: from `prevPayment#amount` or 0 (optional)
 *
 * @param company - represents Company
 * @param service - represents Service
 * @param payment - represents Payment
 * @param prevPayment - represents Payment from previous month
 * @returns array of invoices for provided props
 */
export const getInvoices = ({
  company,
  service,
  payment,
  prevPayment,
}: IGetInvoiceProps): Array<IPaymentField> => {
  const currInvoicesCollection =
    payment?.invoice?.reduce((acc, invoice) => {
      acc[invoice.name || invoice.type] = invoice
      return acc
    }, {} as InvoicesCollection) || {}

  const prevInvoicesCollection =
    prevPayment?.invoice?.reduce((acc, invoice) => {
      acc[invoice.name || invoice.type] = invoice
      return acc
    }, {} as InvoicesCollection) || {}

  const getInvoicesByType = [
    getMaintenanceInvoice,
    getPlacingInvoice,
    getInflicionInvoice,
    getElectricityInvoice,
    getWaterInvoice,
    getWaterPartInvoice,
    getGarbageCollectorInvoice,
    getCleaningInvoice,
    getDiscountInvoice,
  ]

  const invoices = [
    ...getInvoicesByType.map((getInvoiceByType) =>
      getInvoiceByType({
        company,
        service,
        currInvoicesCollection,
        prevInvoicesCollection,
      })
    ),
    ...getCustomInvoices({
      company,
      service,
      currInvoicesCollection,
      prevInvoicesCollection,
    }),
  ]

  return invoices.filter((invoice) => invoice)
}

export const getMaintenanceInvoice = ({
  company,
  service,
  currInvoicesCollection,
  prevInvoicesCollection,
}: IGetInvoiceByTypeProps): IPaymentField | undefined => {
  if (Object.keys(currInvoicesCollection).length > 0) {
    if (!currInvoicesCollection[ServiceType.Maintenance]) {
      return
    }

    const invoice = currInvoicesCollection[ServiceType.Maintenance]

    return {
      type: invoice.type,
      price: invoice.price || invoice.sum,
      amount: invoice.amount,
      sum: invoice.sum,
    }
  }

  if (
    company?.pricePerMeter &&
    !isNaN(company.pricePerMeter) &&
    company?.rentPart &&
    !isNaN(company.rentPart)
  ) {
    return {
      type: ServiceType.Maintenance,
      amount: company.rentPart,
      price: company.pricePerMeter,
      sum: company.rentPart * company.pricePerMeter,
    }
  }
}

export const getPlacingInvoice = ({
  company,
  service,
  currInvoicesCollection,
  prevInvoicesCollection,
}: IGetInvoiceByTypeProps): IPaymentField | undefined => {
  if (Object.keys(currInvoicesCollection).length > 0) {
    if (!currInvoicesCollection[ServiceType.Placing]) {
      return
    }

    const invoice = currInvoicesCollection[ServiceType.Placing]

    return {
      type: invoice.type,
      price: invoice.price || invoice.sum,
      sum: invoice.sum,
    }
  }

  const prevPlacing = prevInvoicesCollection[ServiceType.Placing]

  if (
    service?.inflicionPrice &&
    !isNaN(service.inflicionPrice) &&
    company?.inflicion
  ) {
    const inflicionIndex = service.inflicionPrice / 100
    const price = (+prevPlacing?.sum || 0) * inflicionIndex

    return {
      type: ServiceType.Placing,
      price: price || prevPlacing?.sum,
      sum: price,
    }
  }

  if (company && service) {
    return {
      type: ServiceType.Placing,
      price: +prevPlacing?.sum || 0,
      sum: +prevPlacing?.sum || 0,
    }
  }
}

export const getInflicionInvoice = ({
  company,
  service,
  currInvoicesCollection,
  prevInvoicesCollection,
}: IGetInvoiceByTypeProps): IPaymentField | undefined => {
  if (Object.keys(currInvoicesCollection).length > 0) {
    if (!currInvoicesCollection[ServiceType.Inflicion]) {
      return
    }

    const invoice = currInvoicesCollection[ServiceType.Inflicion]

    return {
      type: invoice.type,
      price: invoice.price || invoice.sum,
      sum: invoice.sum,
    }
  }

  if (
    service?.inflicionPrice &&
    !isNaN(service.inflicionPrice) &&
    company?.inflicion
  ) {
    const prevPlacing = prevInvoicesCollection[ServiceType.Placing]
    const inflicionIndex = service.inflicionPrice - 100
    const inflicionPrice = (inflicionIndex / 100) * (+prevPlacing?.sum || 0)

    return {
      type: ServiceType.Inflicion,
      price: inflicionPrice,
      sum: inflicionPrice,
    }
  }
}

export const getElectricityInvoice = ({
  company,
  service,
  currInvoicesCollection,
  prevInvoicesCollection,
}: IGetInvoiceByTypeProps): IPaymentField | undefined => {
  if (Object.keys(currInvoicesCollection).length > 0) {
    if (!currInvoicesCollection[ServiceType.Electricity]) {
      return
    }

    const invoice = currInvoicesCollection[ServiceType.Electricity]

    return {
      type: invoice.type,
      price: invoice.price || invoice.sum,
      amount: invoice.amount,
      lastAmount: invoice.lastAmount,
      sum: invoice.sum,
    }
  }

  if (service?.electricityPrice && !isNaN(service.electricityPrice)) {
    const prevElectricity = prevInvoicesCollection[ServiceType.Electricity]

    return {
      type: ServiceType.Electricity,
      amount: +prevElectricity?.amount || 0,
      lastAmount: +prevElectricity?.amount || 0,
      price: service.electricityPrice,
      sum: 0,
    }
  }
}

export const getWaterPartInvoice = ({
  company,
  service,
  currInvoicesCollection,
  prevInvoicesCollection,
}: IGetInvoiceByTypeProps): IPaymentField | undefined => {
  if (Object.keys(currInvoicesCollection).length > 0) {
    if (!currInvoicesCollection[ServiceType.WaterPart]) {
      return
    }

    const invoice = currInvoicesCollection[ServiceType.WaterPart]

    return {
      type: invoice.type,
      price: invoice.price || invoice.sum,
      sum: invoice.sum,
    }
  }

  if (
    service?.waterPrice &&
    !isNaN(service.waterPrice) &&
    company?.waterPart &&
    !isNaN(company.waterPart)
  ) {
    const price = (service.waterPrice * company.waterPart) / 100
    return {
      type: ServiceType.WaterPart,
      price: price,
      sum: price,
    }
  }
}

export const getWaterInvoice = ({
  company,
  service,
  currInvoicesCollection,
  prevInvoicesCollection,
}: IGetInvoiceByTypeProps): IPaymentField | undefined => {
  if (Object.keys(currInvoicesCollection).length > 0) {
    if (!currInvoicesCollection[ServiceType.Water]) {
      return
    }

    const invoice = currInvoicesCollection[ServiceType.Water]

    return {
      type: invoice.type,
      price: invoice.price || invoice.sum,
      amount: invoice.amount,
      lastAmount: invoice.lastAmount,
      sum: invoice.sum,
    }
  }

  if (
    service?.waterPrice &&
    !isNaN(service.waterPrice) &&
    !company?.waterPart &&
    isNaN(company?.waterPart)
  ) {
    const prevWater = prevInvoicesCollection[ServiceType.Water]

    return {
      type: ServiceType.Water,
      amount: +prevWater?.amount || 0,
      lastAmount: +prevWater?.amount || 0,
      price: service.waterPrice,
      sum: 0,
    }
  }
}

export const getGarbageCollectorInvoice = ({
  company,
  service,
  currInvoicesCollection,
  prevInvoicesCollection,
}: IGetInvoiceByTypeProps): IPaymentField | undefined => {
  if (Object.keys(currInvoicesCollection).length > 0) {
    if (!currInvoicesCollection[ServiceType.GarbageCollector]) {
      return
    }

    const invoice = currInvoicesCollection[ServiceType.GarbageCollector]

    return {
      type: invoice.type,
      price: invoice.price || invoice.sum,
      sum: invoice.sum,
    }
  }

  if (
    service?.garbageCollectorPrice &&
    !isNaN(service.garbageCollectorPrice) &&
    company?.garbageCollector
  ) {
    const price =
      (service.garbageCollectorPrice * company?.servicePricePerMeter) / 100

    return {
      type: ServiceType.GarbageCollector,
      price: price,
      sum: price,
    }
  }
}

export const getCleaningInvoice = ({
  company,
  service,
  currInvoicesCollection,
  prevInvoicesCollection,
}: IGetInvoiceByTypeProps): IPaymentField | undefined => {
  if (Object.keys(currInvoicesCollection).length > 0) {
    if (!currInvoicesCollection[ServiceType.Cleaning]) {
      return
    }

    const invoice = currInvoicesCollection[ServiceType.Cleaning]

    return {
      type: invoice.type,
      price: invoice.price || invoice.sum,
      sum: invoice.sum,
    }
  }

  if (company?.cleaning && !isNaN(company.cleaning)) {
    return {
      type: ServiceType.Cleaning,
      price: company.cleaning,
      sum: company.cleaning,
    }
  }
}

export const getDiscountInvoice = ({
  company,
  service,
  currInvoicesCollection,
  prevInvoicesCollection,
}: IGetInvoiceByTypeProps): IPaymentField | undefined => {
  if (Object.keys(currInvoicesCollection).length > 0) {
    if (!currInvoicesCollection[ServiceType.Discount]) {
      return
    }

    const invoice = currInvoicesCollection[ServiceType.Discount]

    return {
      type: invoice.type,
      price: invoice.price || invoice.sum,
      sum: invoice.sum,
    }
  }

  if (company?.discount && !isNaN(company.discount)) {
    return {
      type: ServiceType.Discount,
      price: company.discount,
      sum: company.discount,
    }
  }
}

export const getCustomInvoices = ({
  company,
  service,
  currInvoicesCollection,
  prevInvoicesCollection,
}: IGetInvoiceByTypeProps): Array<IPaymentField> => {
  return Object.values(currInvoicesCollection)
    .filter((invoice: IPaymentField) => invoice.type === ServiceType.Custom)
    .map((invoice) => ({
      name: invoice.name,
      type: invoice.type,
      price: invoice.price || invoice.sum,
      sum: invoice.sum,
    }))
}
