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

export type InvoiceMailParams = {
    attachmentName: string
    recipients: string[]
    subject: string
}

export type InvoicePosition = {
    id: number
    title: string
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

export type Micellaneous = {
    data: {
        articleCategories: string[]
        articleUnits: string[]
        autoCreateArticles: boolean
        customerCategories: string[]
        jobTitles: string[]
        salutations: string[]
        titles: string[]
    }
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
    title: string
    customerId?: number
    date: string
    doneAt?: string
    metaData?: {
        description?: string
    }
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

export type ResponseArticle = ApiResponse<EntityArticle>;
export type ResponseCustomer = ApiResponse<Customer>;
export type ResponseExpense = ApiResponse<EntityExpense>;
export type ResponseInvoice = ApiResponse<EntityInvoice>;
export type ResponseOffer = ApiResponse<Offer>;