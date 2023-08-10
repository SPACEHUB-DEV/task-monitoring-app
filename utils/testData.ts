import { ObjectId } from 'mongodb'
import { Roles } from './constants'

export const users = {
  user: {
    name: 'user',
    email: 'user@example.com',
    roles: [Roles.USER],
  },
  domainAdmin: {
    name: 'domainAdmin',
    email: 'domainAdmin@example.com',
    roles: [Roles.DOMAIN_ADMIN],
  },
  globalAdmin: {
    name: 'globalAdmin',
    email: 'globalAdmin@example.com',
    roles: [Roles.GLOBAL_ADMIN],
  },
}

export const domains = [
  {
    _id: new ObjectId(),
    area: [],
    name: 'domain 0',
    address: 'Domain_address_0',
    adminEmails: [users.domainAdmin.email],
    streets: [],
    description: 'none',
    bankInformation: 'none',
    phone: '+381234567890',
    email: 'domain_0@example.com',
  },
  {
    _id: new ObjectId(),
    area: [],
    name: 'domain 1',
    address: 'Domain_address_1',
    adminEmails: [],
    streets: [],
    description: 'none',
    bankInformation: 'none',
    phone: '+381234567891',
    email: 'domain_1@example.com',
  },
  {
    _id: new ObjectId(),
    area: [],
    name: 'domain 2',
    address: 'Domain_address_2',
    adminEmails: [],
    streets: [],
    description: 'none',
    bankInformation: 'none',
    phone: '+381234567892',
    email: 'domain_2@example.com',
  },
  {
    _id: new ObjectId(),
    area: [],
    name: 'domain 3',
    address: 'Domain_address_3',
    adminEmails: [],
    streets: [],
    description: 'none',
    bankInformation: 'none',
    phone: '+381234567893',
    email: 'domain_3@example.com',
  },
  {
    _id: new ObjectId(),
    area: [],
    name: 'domain 4',
    address: 'Domain_address_4',
    adminEmails: [],
    streets: [],
    description: 'none',
    bankInformation: 'none',
    phone: '+381234567894',
    email: 'domain_4@example.com',
  },
  {
    _id: new ObjectId(),
    area: [],
    name: 'domain 5',
    address: 'Domain_address_5',
    adminEmails: [users.user.email, users.domainAdmin.email],
    streets: [],
    description: 'none',
    bankInformation: 'none',
    phone: '+381234567895',
    email: 'domain_5@example.com',
  },
]

export const streets = [
  {
    _id: new ObjectId(),
    address: 'street_0',
    city: 'street_0_city',
  },
  {
    _id: new ObjectId(),
    address: 'street_1',
    city: 'street_1_city',
  },
  {
    _id: new ObjectId(),
    address: 'street_2',
    city: 'street_2_city',
  },
]

export const realEstates = [
  {
    _id: new ObjectId(),
    domain: domains[0]._id,
    street: streets[0]._id,
    companyName: 'company_0',
    bankInformation: 'none',
    agreement: 'none',
    phone: '+381234567800',
    adminEmails: [users.user.email],
    pricePerMeter: 10,
    servicePricePerMeter: 10,
    totalArea: 10,
    garbageCollector: 10,
  },
  {
    _id: new ObjectId(),
    domain: domains[1]._id,
    street: streets[1]._id,
    companyName: 'company_1',
    bankInformation: 'none',
    agreement: 'none',
    phone: '+381234567801',
    adminEmails: [users.user.email],
    pricePerMeter: 10,
    servicePricePerMeter: 10,
    totalArea: 10,
    garbageCollector: 10,
  },
  {
    _id: new ObjectId(),
    domain: domains[2]._id,
    street: streets[2]._id,
    companyName: 'company_2',
    bankInformation: 'none',
    agreement: 'none',
    phone: '+381234567802',
    adminEmails: [users.domainAdmin.email],
    pricePerMeter: 10,
    servicePricePerMeter: 10,
    totalArea: 10,
    garbageCollector: 10,
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
    _id: new ObjectId(),
    date: new Date(2020, 1, 12),
    domain: domains[0]._id,
    street: streets[0]._id,
    rentPrice: 10,
    electricityPrice: 10,
    waterPrice: 10,
    inflicionPrice: 1.1,
    description: 'none',
  },
  {
    _id: new ObjectId(),
    date: new Date(2020, 6, 19),
    domain: domains[1]._id,
    street: streets[1]._id,
    rentPrice: 20,
    electricityPrice: 20,
    waterPrice: 20,
    inflicionPrice: 1.2,
    description: 'none',
  },
  {
    _id: new ObjectId(),
    date: new Date(2020, 10, 11),
    domain: domains[2]._id,
    street: streets[2]._id,
    rentPrice: 30,
    electricityPrice: 30,
    waterPrice: 30,
    inflicionPrice: 1.3,
    description: 'none',
  },
]

/*
 * Test payments Dates:
 * 11.01.2020
 * 18.06.2020
 * 10.10.2020
 * 16.04.2021
 * 14.05.2021
 * 09.08.2021
 * 01.01.2022
 * 12.03.2022
 * 06.05.2023
 * 31.06.2023
 * 01.10.2023
 */
export const payments = [
  {
    _id: new ObjectId(),
    invoiceNumber: 1,
    type: 'debit',
    date: new Date(2020, 1, 11),
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
    services: [],
    // provider: {
    //   name: 'provider_1',
    //   address: 'address_of_provider_1',
    //   bankInformation: 'none',
    // },
    // receiver: {
    //   companyName: 'receiver_1',
    //   admonEmails: [],
    //   phone: '+3801234567891',
    // },
    generalSum: 1000,
  },
  {
    _id: new ObjectId(),
    invoiceNumber: 2,
    type: 'debit',
    date: new Date(2020, 6, 18),
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
    services: [],
    // provider: {
    //   name: 'provider_2',
    //   address: 'address_of_provider_2',
    //   bankInformation: 'none',
    // },
    // receiver: {
    //   companyName: 'receiver_2',
    //   admonEmails: [],
    //   phone: '+3801234567892',
    // },
    generalSum: 1000,
  },
  {
    _id: new ObjectId(),
    invoiceNumber: 3,
    type: 'debit',
    date: new Date(2020, 10, 10),
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
    services: [],
    // provider: {
    //   name: 'provider_3',
    //   address: 'address_of_provider_3',
    //   bankInformation: 'none',
    // },
    // receiver: {
    //   companyName: 'receiver_3',
    //   admonEmails: [],
    //   phone: '+3801234567893',
    // },
    generalSum: 1000,
  },
]
