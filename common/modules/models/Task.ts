import { TaskStatuses } from '@utils/constants'
import mongoose, { ObjectId, Schema } from 'mongoose'

export interface ITask {
  _id?: string
  name: string
  creator?: ObjectId | string
  description?: string
  domain: string
  address: IAddress
  category: string
  dateofcreate: Date
  deadline: string
  customer?: string
  taskexecutors: [ITaskExecutors]
  comment?: [IComment]
  status: TaskStatuses | string
  executant?: ObjectId | string
}

export interface ICreateTask {
  name: string
  creator: ObjectId | string
  description?: string
  address: IAddress
  category: string
  dateofcreate: Date
  deadline: string
  customer?: string
}

export interface IAddress {
  name: string
  geoCode: IGeoCode
}

export interface IGeoCode {
  lat: number
  lng: number
}

export interface IComment {
  id: string
  text: string
  datetime: Date
}

export interface ITaskExecutors {
  workerid: ObjectId | string //profile photo and rating will be obtained from this id
  taskId: ObjectId | string
  price: number | string
  description: string
  workerdeadline?: Date
}

export interface ITaskModel {
  _id?: ObjectId
  name: string
  creator: ObjectId | string
  domain: string
  description?: string
  address: IAddress
  category: string
  dateofcreate: Date
  deadline: string
  customer?: string
  taskexecutors: [ITaskExecutors]
  comment?: [IComment]
  status: TaskStatuses
  executant: ObjectId
}

const TaskSchema = new Schema<ITaskModel>({
  name: { type: String, required: true },
  creator: { type: Schema.Types.ObjectId, ref: 'User' },
  description: { type: String, default: 'no description' },
  address: { type: Object, required: true },
  domain: { type: String },
  category: { type: String },
  dateofcreate: { type: Date, required: true, default: Date.now },
  deadline: { type: String, required: false }, //true
  customer: { type: String },
  taskexecutors: [{ type: Object }],
  comment: [{ type: Object }],
  status: { type: String, required: true, default: TaskStatuses.PENDING },
  executant: { type: Schema.Types.ObjectId },
})

const Task = mongoose.models.Task || mongoose.model('Task', TaskSchema)
export default Task
