export enum AppRoutes {
  INDEX = '/',
  DASHBOARD = '/dashboard',
  PROFILE = '/profile',
  TASK = '/task',
  AUTH = '/auth',
  AUTH_SIGN_IN = '/auth/signin',
  AUTH_SIGN_UP = '/auth/signup',
  CONTACTS = '/contacts',
  ADMIN = '/admin',
  PREMIUM = '/premium',
  CATEGORY = '/category',
  DOMAIN = '/domain',
  PAYMENT = '/payment',
  PAYMENT_BULK = '/payment/bulk',
  PAYMENT_CHART = '/payment/chart',
  SERVICE = '/service',
  CUSTOMER = '/customer',
  REAL_ESTATE = '/real-estate',
  STREETS = '/streets',
  BANKTEST = '/bank',
  SEP_DOMAIN = '/sepdomain',
}

export enum Operations {
  Credit = 'credit',
  Debit = 'debit',
}

export enum ColumnsRoleView {
  GlobalAdmin = 1,
  User = 2,
}

export enum COLOR_THEME {
  DARK = 'dark',
  LIGHT = 'light',
}

export enum PERIOD_FILTR {
  QUARTER = 'quarter',
  MONTH = 'month',
  YEAR = 'year',
}

export enum Roles {
  USER = 'User',
  WORKER = 'Worker',
  MODERATOR = 'Moderator',
  ADMIN = 'Admin',
  GLOBAL_ADMIN = 'GlobalAdmin',
  DOMAIN_ADMIN = 'DomainAdmin',
}

export interface errors {
  [index: string]: string
}

export const errors: errors = {
  SignIn: 'Спробуйте ввійти за допомогою іншого облікового запису.',
  OAuthSignIn: 'Спробуйте ввійти за допомогою іншого облікового запису.',
  OAuthCallback: 'Спробуйте ввійти за допомогою іншого облікового запису.',
  OAuthCreateAccount: 'Спробуйте ввійти за допомогою іншого облікового запису.',
  EmailCreateAccount: 'Спробуйте ввійти за допомогою іншого облікового запису.',
  Callback: 'Спробуйте ввійти за допомогою іншого облікового запису.',
  OAuthAccountNotLinked:
    'Щоб підтвердити свою особу, увійдіть за допомогою того самого облікового запису, який використовували спочатку.',
  EmailSignIn: 'Не вдалося надіслати електронний лист.',
  CredentialsSignIn:
    'Помилка входу. Перевірте правильність наданих вами даних.',
  SessionRequired: 'Увійдіть, щоб отримати доступ до цієї сторінки.',
  default: 'Не вдається ввійти.',
}

export const centerTownGeoCode = {
  lat: 50.264915,
  lng: 28.661954,
}

export enum TaskStatuses {
  PENDING = 'pending',
  PENDING_SELECTION = 'pending selection',
  REJECTED = 'rejected',
  IN_WORK = 'in work',
  EXPIRED = 'expired',
  COMPLETED = 'completed',
  ARCHIVED = 'archived',
}

export enum TaskView {
  CARD = 'card',
  LIST = 'list',
}
export const saltRounds = 10

export enum ServiceName {
  placingPrice = 'Розміщення',
  maintenancePrice = 'Утримання',
  inflicionPrice = 'Індекс інфляції',
  electricityPrice = 'Електропостачання',
  waterPrice = 'Водопостачання',
  garbageCollectorPrice = 'Вивіз ТПВ',
  waterPart = 'Водонарахування',
  discount = 'Знижка',
  cleaningPrice = 'Прибирання',
  custom = 'Додаткові витрати',
}

export enum ServiceType {
  Electricity = 'electricityPrice',
  Water = 'waterPrice',
  Placing = 'placingPrice',
  Maintenance = 'maintenancePrice',
  GarbageCollector = 'garbageCollectorPrice',
  Inflicion = 'inflicionPrice',
  Custom = 'custom',
  WaterPart = 'waterPart',
  Discount = 'discount',
  Cleaning = 'cleaningPrice',
}

export const quarters = {
  '1': [1, 2, 3],
  '2': [4, 5, 6],
  '3': [7, 8, 9],
  '4': [10, 11, 12],
}

export const cascaderYears = ['2021', '2022', '2023', '2024']

export const cascaderQuarters = [
  {
    label: ` І квартал`,
    value: '1',
  },
  {
    label: `ІІ квартал`,
    value: '2',
  },
  {
    label: `III квартал`,
    value: '3',
  },
  {
    label: `IV квартал`,
    value: '4',
  },
]

export const cascaderMonths = [
  {
    label: 'Січень',
    value: '1',
  },
  {
    label: 'Лютий',
    value: '2',
  },
  {
    label: 'Березень',
    value: '3',
  },
  {
    label: 'Квітень',
    value: '4',
  },
  {
    label: 'Травень',
    value: '5',
  },
  {
    label: 'Червень',
    value: '6',
  },
  {
    label: 'Липень',
    value: '7',
  },
  {
    label: 'Серпень',
    value: '8',
  },
  {
    label: 'Вересень',
    value: '9',
  },
  {
    label: 'Жовтень',
    value: '10',
  },
  {
    label: 'Листопад',
    value: '11',
  },
  {
    label: 'Грудень',
    value: '12',
  },
]

export const maintenanceWithoutInflicionDescription = `
  ЧОМУ ПИШУТЬ БЕЗ ВРАХУВАННЯ ІНДЕКСУ ІНФЛЯЦІЇ

  Це означає, що інд інф за поточний місяць не врахований. Врахований тільки за 
  попередній.
  Тобто, коли рахунок на оплату прийшов за жовтень, а інд інф врахований тільки 
  за вересень. За жовтень не доплюсований, бо ще не відомий на тей час
  коефіцієнт. Він же (інд інф за попер міс)
  і доплюсовується окремим рядком в рахунку - це як їх страховка за поточний 
  місяць, так як інд інф явно менший не стане в наст місяці. Він відомий стає 
  після 10 числа, а рахунок потрібно оплатити до 10. Тому, так вони собі і
  гарантують уникнення неприємностей при перевірці.`

export const inflicionDescription = `
Згідно з п. 13 Методики № 786 розмір орендної плати за кожний наступний місяць визначається шляхом коригування розміру місячної орендної плати за попередній місяць на індекс інфляції за поточний місяць.
Тож для того щоб визначити розмір орендної плати за кожний наступний місяць оренди, необхідно розмір орендної плати за попередній місяць помножити на індекс інфляції за поточний місяць.
При цьому зверніть увагу: такий механізм розрахунку застосовується незалежно від розміру індексу інфляції, тобто незалежно від того, перевищує ця величина 100 % чи ні, адже ніяких виключень та додаткових вимог з цього приводу чинне законодавство не містить.`
