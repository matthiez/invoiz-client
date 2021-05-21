import InvoizClient from './index';

export type ClientConfig = {
    accessToken?: string
    apiKey: string
    apiKeySecret: string
    installationId?: string
}

export enum Endpoint {
    Article = 'article',
    AuthToken = 'auth/token',
    Customer = 'customer',
    Expense = 'expense',
    ExpenseReceipt = 'expense/receipt',
    Invoice = 'invoice',
    Offer = 'offer',
    SettingArticle = 'setting/article',
    SettingPayCondition = 'setting/payCondition',
    SettingMiscellaneous = 'setting/miscellaneous',
    ToDo = 'todo'
}

export type AuthTokenResponse = {
    token: string
}

export type BasePaginationOptions = {
    limit?: number
    offset?: number
}

export type PaginationDescending = {
    desc?: boolean
}

export type PaginationSearchText = {
    searchText?: string
}

export type ArticlePaginationOptions =
    BasePaginationOptions
    & PaginationDescending
    & PaginationSearchText
    & {
    orderBy?: 'number' | 'title'
}

export type CustomerPaginationOptions =
    BasePaginationOptions
    & PaginationDescending
    & PaginationSearchText
    & {
    orderBy?: 'name' | 'number'
}

export type ExpensePaginationOptions =
    BasePaginationOptions
    & PaginationDescending
    & PaginationSearchText
    & {
    orderBy?: 'date' | 'id' | 'payee' | 'payKind' | 'priceTotal'
    filter?: 'all' | 'open' | 'paid'
    payKind?: 'bank' | 'cash'
}

export type OfferPaginationOptions =
    BasePaginationOptions
    & PaginationDescending
    & PaginationSearchText
    & {
    orderBy?: 'customerData.name' | 'number' | 'date' | 'totalNet' | 'totalGross'
}

export type ToDoPaginationOptions = BasePaginationOptions & {
    activeFilter?: 'all' | 'future' | 'overdue'
    customerId?: number
}

export type InvoicePaginationOptions =
    BasePaginationOptions
    & PaginationDescending
    & PaginationSearchText
    & {
    filter?: 'all' | 'dunned' | 'partiallyPaid' | 'paid' | 'draft' | 'locked' | 'cancelled'
    orderBy?: 'customerData.name' | 'date' | 'dueToDate' | 'totalNet' | 'totalGross'
}

export type Article = {
    calculationBase?: 'gross' | 'net'
    category?: string
    description?: string
    notes?: string
    notesAlert?: boolean
    number: string
    price?: number
    priceGross?: number
    title: string
    unit?: string
    vatPercent?: number
}

type BaseArticlePostInvoiceArticle = {
    amount: number
    discount: number
}

export type ArticlePostInvoiceExisting = BaseArticlePostInvoiceArticle & {
    id: number
}

export type ArticlePostInvoiceNew = BaseArticlePostInvoiceArticle & {
    amount?: number
    discount: number
    price?: number
    title?: string
    unit?: string
    vatPercent: number
}

export type ArticlePostInvoiceMixed = {
    existingArticle: ArticlePostInvoiceExisting[]
    newArticle: ArticlePostInvoiceNew[]
}

export type ArticlePostInvoice =
    ArticlePostInvoiceMixed
    | Omit<ArticlePostInvoiceMixed, 'newArticle'>
    | Omit<ArticlePostInvoiceMixed, 'existingArticle'>

export type ApiResponse<T> = {
    meta: {}
    data: T
}

export type PaginatedResponse<T> = {
    meta: {
        count: number
        filter: any[]
    }
    data: T[]
}

export type ArticleSetting = {
    autoCreateArticles?: boolean
    categories?: string
    units?: string
}

export type Customer = {
    address: {
        city: string
        isoCountry: string
        street: string
        zipCode: string

    }
    companyName: string
    companyNameAffix: string
    discount: number
    fax: string
    firstName: string
    id: number
    kind: 'company' | 'person'
    lastName: string
    mobile: string
    name: string
    notes: string
    notesAlert: boolean
    number: string
    payConditionId: number
    phone1: string
    phone2: string
    salutation: string
    title: string
    website: string
}

export type CustomerData = {
    city: string
    description: string
    firstName: string
    lastName: string
    name: string
    number: string
    salutation: string
    street: string
    title: string
    zipCode: string
}

export type Entity = {
    id: number
}

export type Expense = {
    date: string
    payDate?: string
    payKind: 'bank' | 'cash' | 'open'
    payee: string
    description?: string
    price?: number
    priceTotal: number
    vatPercent: number
    vatAmount?: number
    receipts?: ExpenseReceipt
}

export type ExpenseReceipt = {
    id: number
}

export type Invoice = {
    cashDiscountTotal: number
    customerData: Customer
    date: string
    dueToDate: string
    number: string
    outstandingAmount: number
    payConditionId: number
    payConditionData: EntityPayCondition
    positions: InvoicePosition[]
    priceKind: 'gross' | 'net'
    totalGross: number
    totalNet: number
    type: 'invoice'
}

export type InvoiceList = {
    cashDiscountTotal: number
    customerData: CustomerData
    customerId: number
    date: string
    dueToDate: string
    id: number
    metaData: {
        cancellation: {
            date: string
            id: number
            number: number
            totalNet: number
            totalGross: number
        }
        currentDunning: {
            date: string
            label: string
        }
        nextDunning: {
            date: string
            dunningLevel: string
            label: string
        }
    }
    number: string
    outstandingAmount: number
    state: 'draft' | 'locked' | 'partiallyPaid' | 'paid' | 'cancelled'
    totalGross: number
    totalNet: number
    type: 'invoice' | 'closingInvoice' | 'depositInvoice' | 'recurringInvoice' | 'recurringInvoiceTemplate'
}

export type InvoiceMailParams = {
    attachmentName: string
    recipients: string[]
    subject: string
}

export type InvoicePosition = {
    id: number
    title: string
}

export type ItemValidationError = {
    code: string
}

export type Miscellaneous = {
    articleCategories: string[]
    articleUnits: string[]
    autoCreateArticles: boolean
    customerCategories: string[]
    jobTitles: string[]
    salutations: string[]
    titles: string[]
    vats: number[]
}

export type NoContent = {
    code: string
}

export type Offer = {
    cashDiscountTotal: number
    date: string
    dueToDate: string
    id: number
    number: string
    outstandingAmount: number
    totalGross: number
    totalNet: number
}

export type PayCondition = {
    dueDays?: number
    invoiceText?: string
    isBasic?: boolean
    isInstant?: boolean
    name: string
    offerText?: string
}

export type InvoicePayment = {
    amount: number
    notes: string
    type: 'payment' | 'partial' | 'discount' | 'bankcharge' | 'surcharge'
}

export type ToDo = {
    customerId?: number
    date: string
    doneAt?: string
    metaData?: {
        description?: string
    }
    tenantId?: number
    title: string
}

export type EntityArticle = Entity & Article;
export type EntityExpense = Entity & Expense;
export type EntityPayCondition = Entity & PayCondition;
export type EntityToDo = Entity & ToDo;
export type EntityInvoice = Entity & Invoice;
export type EntityInvoicePayment = Entity & InvoicePayment;

export type PaginatedArticles = PaginatedResponse<EntityArticle>;
export type PaginatedCustomers = PaginatedResponse<Customer>;
export type PaginatedEntityExpenses = PaginatedResponse<EntityExpense>;
export type PaginatedEntityInvoices = PaginatedResponse<EntityInvoice>;
export type PaginatedOffers = PaginatedResponse<Offer>;
export type PaginatedToDos = PaginatedResponse<EntityToDo>;

export type PaginatedMethod = keyof Pick<InvoizClient,
    'getOffers' | 'getArticles' | 'getToDos'
    | 'getCustomers' | 'getExpenses' | 'getInvoices'>;

export type ParameterlessGetMethod = keyof Pick<InvoizClient,
    'getMiscellaneousSettings' | 'getPayConditions'>;

export type InfoSectionCustomField = {
    label: string
    value: string
}

type BasePostInvoice = {
    date: string
    infoSectionCustomFields?: [InfoSectionCustomField?, InfoSectionCustomField?, InfoSectionCustomField?]
    options?: {
        deliveryDateEnd?: number
        deliveryDateStart?: string
        dueDays?: number
        showArticleNumber?: boolean
    }
    payConditionId: number
    priceKind?: 'net' | 'gross'
    texts?: {
        conclusion?: boolean
        introduction?: string
    }
    title?: string
}

export type PostInvoiceCustomerId = BasePostInvoice & {
    customerData?: never
    customerId: number
}

type BasePostInvoiceCustomerData<T> = BasePostInvoice & {
    customerData: T
    customerId?: never
}

export type PostInvoiceCustomerDataCompany = BasePostInvoiceCustomerData<{
    kindCompany: {
        city?: string
        companyName: string
        companyNameAffix?: string
        country?: string
        kind: 'company'
        street?: string
        zipCode?: string
    }
}>

export type PostInvoiceCustomerDataPerson = BasePostInvoiceCustomerData<{
    kindPerson: {
        city?: string
        countryIso?: string
        firstName?: string
        kind: 'person'
        lastName: string
        required: false
        street?: string
        zipCode?: string
    }
}>

export type ResponseArticle = ApiResponse<EntityArticle>;
export type ResponseCustomer = ApiResponse<Customer>;
export type ResponseExpense = ApiResponse<EntityExpense>;
export type ResponseInvoice = ApiResponse<EntityInvoice>;
export type ResponseOffer = ApiResponse<Offer>;

export type RetrieveMethod = PaginatedMethod | ParameterlessGetMethod;

export type ValidationError = {
    message: string
    meta: {
        [k: string]: ItemValidationError[]
    }
    name: string
}
