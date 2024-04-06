declare interface SaleItem {
  readonly masterStyleId: string
  readonly name: string
  readonly family?: string
  readonly price: string
  readonly salePrice: string
  readonly parsedPrice: number
  readonly parsedDiscount: number
  readonly discount: number
  readonly isNew: boolean
  readonly regDate: string

  readonly url: string
  // readonly rating: number
  // readonly totalReviewCount: number

  readonly productImages: string[]
  readonly swatches: Array<{
    readonly swatchImage?: string
    readonly productImage: string
    readonly family: string
    readonly name: string
    readonly url: string
  }>
}

declare type SalesResult = Readonly<{
  stacks: Readonly<
    Array<{
      totalProducts: number
      list: Array<SaleItem>
    }>
  >
}>

declare type Nullable<T> = T | null
