import mongoose, { ObjectId, Schema } from 'mongoose'

export interface IRealEstateModel {
  domain: ObjectId
  street: ObjectId
  companyName: string
  description: string
  adminEmails: string[]
  pricePerMeter: number
  servicePricePerMeter?: number
  garbageCollector?: number
  totalArea?: number
  rentPart?: number
  waterPart?: number
  inflicion?: boolean
}

export const RealEstateSchema = new Schema<IRealEstateModel>({
  domain: { type: Schema.Types.ObjectId, ref: 'Domain' },
  street: { type: Schema.Types.ObjectId, ref: 'Street' },
  companyName: { type: String, required: true },
  description: { type: String, required: true },
  adminEmails: { type: [String], required: true },
  pricePerMeter: { type: Number, required: true, default: 0 },
  servicePricePerMeter: { type: Number, required: false },
  totalArea: { type: Number, required: true, default: 0 },
  garbageCollector: { type: Number, required: false, default: 0 },
  rentPart: { type: Number, required: true, default: 0 },
  waterPart: { type: Number, required: true, default: 0 },
  inflicion: { type: Boolean, required: false, default: false },
})

const RealEstate = mongoose.model('RealEstate', RealEstateSchema)

export default RealEstate
