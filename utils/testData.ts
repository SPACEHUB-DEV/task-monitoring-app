import { compareDates } from '@utils/helpers'
import { Roles } from './constants'

export const users = {
  user: {
    name: 'user',
    email: 'user@example.com',
    roles: [Roles.USER],
  },
  user2: {
    name: 'user',
    email: 'user@example2.com',
    roles: [Roles.USER],
  },
  noRoleUser: {
    name: 'noRoleUser',
    email: 'noRoleUser@example.com',
    roles: [],
  },
  domainAdmin: {
    name: 'domainAdmin',
    email: 'domainAdmin@example.com',
    roles: [Roles.DOMAIN_ADMIN],
  },
  domainAdmin2: {
    name: 'domainAdmin2',
    email: 'domainAdmin2@example.com',
    roles: [Roles.DOMAIN_ADMIN],
  },
  globalAdmin: {
    name: 'globalAdmin',
    email: 'globalAdmin@example.com',
    roles: [Roles.GLOBAL_ADMIN],
  },
}

export const streets = [
  {
    _id: '64d68421d9ba2fc8fea79d31',
    address: 'street_0',
    city: 'street_0_city',
  },
  {
    _id: '64d68421d9ba2fc8fea79d32',
    address: 'street_1',
    city: 'street_1_city',
  },
  {
    _id: '64d68421d9ba2fc8fea79d33',
    address: 'street_2',
    city: 'street_2_city',
  },
  {
    _id: '64d68421d9ba2fc8fea79d34',
    address: 'street_3',
    city: 'street_3_city',
  },
  {
    _id: '64d68421d9ba2fc8fea79d35',
    address: 'street_4',
    city: 'street_4_city',
  },
]

export const domains = [
  {
    _id: '64d68421d9ba2fc8fea79d11',
    name: 'domain 0',
    adminEmails: [users.domainAdmin.email],
    streets: [streets[0]._id],
    description: 'none',
  },
  {
    _id: '64d68421d9ba2fc8fea79d12',
    name: 'domain 1',
    adminEmails: [users.user.email],
    streets: [streets[1]._id],
    description: 'none',
  },
  {
    _id: '64d68421d9ba2fc8fea79d13',
    name: 'domain 2',
    adminEmails: [],
    streets: [],
    description: 'none',
  },
  {
    _id: '64d68421d9ba2fc8fea79d14',
    name: 'domain 3',
    adminEmails: [],
    streets: [],
    description: 'none',
  },
  {
    _id: '64d68421d9ba2fc8fea79d15',
    name: 'domain 4',
    adminEmails: [],
    streets: [],
    description: 'none',
  },
  {
    _id: '64d68421d9ba2fc8fea79d16',
    name: 'domain 5',
    adminEmails: [],
    streets: [],
    description: 'none',
  },
  {
    _id: '64e725c7a62fdf2d22b84c4a',
    name: 'domain 6',
    adminEmails: [users.domainAdmin2.email],
    streets: [],
    description: 'none',
  },
]

// TODO: fix tests
export const realEstates = [
  {
    _id: '64d68421d9ba2fc8fea79d21',
    domain: domains[0]._id,
    street: streets[0]._id,
    companyName: 'company_0',
    adminEmails: [users.user.email],
    pricePerMeter: 10,
    description: 'none',
    servicePricePerMeter: 10,
    totalArea: 10,
    discount: 0,
    garbageCollector: true,
    waterPart: 0,
    rentPart: 25,
    inflicion: false,
    archived: true,
  },
  {
    _id: '64d68421d9ba2fc8fea79d22',
    domain: domains[1]._id,
    street: streets[1]._id,
    companyName: 'company_1',
    adminEmails: [users.user.email],
    pricePerMeter: 10,
    servicePricePerMeter: 10,
    description: 'none',
    totalArea: 10,
    discount: 0,
    garbageCollector: true,
    waterPart: 0,
    rentPart: 0,
    inflicion: false,
    archived: false,
  },
  {
    _id: '64d68421d9ba2fc8fea79d23',
    domain: domains[2]._id,
    street: streets[2]._id,
    companyName: 'company_2',
    description: 'none',
    adminEmails: [users.domainAdmin.email],
    pricePerMeter: 10,
    servicePricePerMeter: 10,
    totalArea: 10,
    discount: 0,
    garbageCollector: true,
    waterPart: 0,
    rentPart: 0,
    inflicion: false,
    archived: true,
  },
  {
    _id: '64d68421d9ba2fc8fea79d24',
    domain: domains[3]._id,
    street: streets[3]._id,
    companyName: 'company_3',
    adminEmails: [users.globalAdmin.email],
    pricePerMeter: 10,
    servicePricePerMeter: 10,
    description: 'none',
    totalArea: 10,
    discount: 0,
    garbageCollector: true,
    waterPart: 0,
    rentPart: 45,
    inflicion: false,
    archived: false,
  },
  {
    _id: '64d68421d9ba2fc8fea79d25',
    domain: domains[4]._id,
    street: streets[4]._id,
    companyName: 'company_4',
    description: 'none',
    adminEmails: [users.user.email],
    pricePerMeter: 10,
    servicePricePerMeter: 10,
    totalArea: 10,
    discount: 0,
    garbageCollector: true,
    waterPart: 0,
    rentPart: 0,
    inflicion: false,
    archived: false,
  },
  {
    _id: '64d68421d9ba2fc8fea79d26',
    domain: domains[0]._id,
    street: streets[0]._id,
    companyName: 'company_5',
    description: 'none',
    adminEmails: [users.domainAdmin.email],
    pricePerMeter: 10,
    servicePricePerMeter: 10,
    totalArea: 10,
    discount: 0,
    garbageCollector: true,
    waterPart: 0,
    rentPart: 0,
    inflicion: false,
    archived: true,
  },
  {
    _id: '64e66d436d57a8640543dda4',
    domain: domains[3]._id,
    street: streets[3]._id,
    companyName: 'company_5',
    description: 'none',
    adminEmails: [users.globalAdmin.email],
    pricePerMeter: 10,
    servicePricePerMeter: 10,
    totalArea: 10,
    discount: 0,
    garbageCollector: true,
    waterPart: 0,
    rentPart: 50,
    inflicion: false,
    archived: false,
  },
]

/*
 * Test services Dates:
 * 12.01.2020
 * 19.06.2020
 * 11.10.2020
 * 17.04.2021
 * 15.05.2021
 * 10.08.2021
 * 02.01.2022
 * 13.03.2022
 * 07.05.2023
 * 01.07.2023
 * 02.10.2023
 */
export const services = [
  {
    _id: '64d68421d9ba2fc8fea79d56',
    date: new Date(2021, 8, 10),
    domain: domains[2]._id,
    street: streets[2]._id,
    rentPrice: 30,
    electricityPrice: 30,
    garbageCollectorPrice: 0,
    waterPrice: 30,
    inflicionPrice: 1.3,
    description: 'none',
    waterPriceTotal: 0,
  },
  {
    _id: '64d68421d9ba2fc8fea79d55',
    date: new Date(2021, 5, 15),
    domain: domains[1]._id,
    street: streets[2]._id,
    rentPrice: 30,
    electricityPrice: 30,
    garbageCollectorPrice: 0,
    waterPrice: 30,
    inflicionPrice: 1.3,
    description: 'none',
    waterPriceTotal: 0,
  },
  {
    _id: '64d68421d9ba2fc8fea79d54',
    date: new Date(2021, 4, 17),
    domain: domains[0]._id,
    street: streets[2]._id,
    rentPrice: 30,
    electricityPrice: 30,
    garbageCollectorPrice: 0,
    waterPrice: 30,
    inflicionPrice: 1.3,
    description: 'none',
    waterPriceTotal: 0,
  },
  {
    _id: '64d68421d9ba2fc8fea79d53',
    date: new Date(2020, 10, 11),
    domain: domains[0]._id,
    street: streets[1]._id,
    rentPrice: 30,
    electricityPrice: 30,
    garbageCollectorPrice: 0,
    waterPrice: 30,
    inflicionPrice: 1.3,
    description: 'none',
    waterPriceTotal: 0,
  },
  {
    _id: '64d68421d9ba2fc8fea79d52',
    date: new Date(2020, 6, 19),
    domain: domains[1]._id as any,
    street: streets[1]._id,
    rentPrice: 20,
    electricityPrice: 20,
    garbageCollectorPrice: 0,
    waterPrice: 20,
    inflicionPrice: 1.2,
    description: 'none',
    waterPriceTotal: 0,
  },
  {
    _id: '64d68421d9ba2fc8fea79d51',
    date: new Date(2019, 1, 12),
    domain: domains[0]._id as any,
    street: streets[0]._id,
    rentPrice: 10,
    electricityPrice: 10,
    garbageCollectorPrice: 0,
    waterPrice: 10,
    inflicionPrice: 1.1,
    description: 'none',
    waterPriceTotal: 0,
  },
]

export const paymentsForDates = [
  {
    _id: '64f049bd9f13c122008369ad',
    invoiceNumber: 10,
    type: 'debit',
    invoiceCreationDate: '2023-08-31T08:04:14.207Z',
    domain: domains[0]._id,
    street: streets[0]._id,
    company: realEstates[0]._id,
    description: '',
    invoice: [],
    generalSum: 99993,
  },
  {
    _id: '64f047a89f13c12200836945',
    invoiceNumber: 9,
    type: 'debit',
    invoiceCreationDate: '2023-08-31T07:55:21.728Z',
    domain: domains[0]._id,
    street: streets[0]._id,
    company: realEstates[0]._id,
    description: '',
    invoice: [],
    generalSum: 1387,
  },
  {
    _id: '64f0462a9f13c12200836914',
    invoiceNumber: 8,
    type: 'debit',
    invoiceCreationDate: '2023-08-31T07:48:56.012Z',
    domain: domains[0]._id,
    street: streets[0]._id,
    company: realEstates[0]._id,
    description: '',
    invoice: [],
    generalSum: 33580.25,
  },
  {
    _id: '64f086673fcebe9d3ccfdacc',
    invoiceNumber: 12,
    type: 'debit',
    invoiceCreationDate: '2023-08-30T12:24:02.069Z',
    domain: domains[0]._id,
    street: streets[0]._id,
    company: realEstates[0]._id,
    description: 'dsc',
    invoice: [],
    generalSum: 0,
  },
  {
    _id: '64ee5a28d276c6c1938bd068',
    invoiceNumber: 7,
    type: 'debit',
    invoiceCreationDate: '2023-07-01T00:00:00.000Z',
    domain: domains[0]._id,
    street: streets[0]._id,
    company: realEstates[0]._id,
    description: '',
    invoice: [],
    generalSum: 30017.13,
  },
  {
    _id: '64ee5a28d276c6c1938bd065',
    invoiceNumber: 6,
    type: 'debit',
    invoiceCreationDate: '2023-06-01T00:00:00.000Z',
    domain: domains[0]._id,
    street: streets[0]._id,
    company: realEstates[0]._id,
    description: '',
    invoice: [],
    generalSum: 28534.3,
  },
  {
    _id: '64ee5a28d276c6c1938bd063',
    invoiceNumber: 5,
    type: 'debit',
    invoiceCreationDate: '2023-05-01T00:00:00.000Z',
    domain: domains[0]._id,
    street: streets[0]._id,
    company: realEstates[0]._id,
    description: '',
    invoice: [],
    generalSum: 27207.77,
  },
]

export const payments = [
  {
    _id: '64d68421d9ba2fc8fea79d61',
    invoiceNumber: 3,
    type: 'debit',
    invoiceCreationDate: '2020-11-09T22:00:00.000Z',
    domain: domains[2]._id,
    street: streets[2]._id,
    company: realEstates[2]._id,
    monthService: services[2]._id,
    description: 'none',
    invoice: [
      {
        type: 'maintenancePrice',
        amount: 10,
        price: 10,
        sum: 100,
      },
      {
        type: 'placingPrice',
        amount: 10,
        price: 20,
        sum: 200,
      },
      {
        type: 'electricityPrice',
        amount: 10,
        price: 30,
        sum: 300,
      },
      {
        type: 'waterPrice',
        amount: 10,
        price: 40,
        sum: 400,
      },
    ],
    generalSum: 1000,
  },
  {
    _id: '64d68421d9ba2fc8fea79d62',
    invoiceNumber: 2,
    type: 'debit',
    invoiceCreationDate: '2020-07-17T21:00:00.000Z',
    domain: domains[1]._id,
    street: streets[1]._id,
    company: realEstates[1]._id,
    monthService: services[1]._id,
    description: 'none',
    invoice: [
      {
        type: 'maintenancePrice',
        amount: 10,
        price: 10,
        sum: 100,
      },
      {
        type: 'placingPrice',
        amount: 10,
        price: 20,
        sum: 200,
      },
      {
        type: 'electricityPrice',
        amount: 10,
        price: 30,
        sum: 300,
      },
      {
        type: 'waterPrice',
        amount: 10,
        price: 40,
        sum: 400,
      },
    ],
    generalSum: 1000,
  },
  {
    _id: '64d68421d9ba2fc8fea79d63',
    invoiceNumber: 1,
    type: 'debit',
    invoiceCreationDate: '2020-02-10T22:00:00.000Z',
    domain: domains[0]._id,
    street: streets[0]._id,
    company: realEstates[0]._id,
    monthService: services[0]._id,
    description: 'none',
    invoice: [
      {
        type: 'maintenancePrice',
        amount: 10,
        price: 10,
        sum: 100,
      },
      {
        type: 'placingPrice',
        amount: 10,
        price: 20,
        sum: 200,
      },
      {
        type: 'electricityPrice',
        amount: 10,
        price: 30,
        sum: 300,
      },
      {
        type: 'waterPrice',
        amount: 10,
        price: 40,
        sum: 400,
      },
    ],
    generalSum: 1000,
  },
  ...paymentsForDates,
].sort((a, b) => compareDates(a.invoiceCreationDate, b.invoiceCreationDate))
