import { useFormContext } from 'react-hook-form'
import { FormDataPedidos } from './types'
import { ProductProps } from '../produtos/types'
import { CategoryProps } from '@/template/categorias/types'

export const useFormCorePedidos = () => {
  const { getValues } = useFormContext<FormDataPedidos>()

  const cakes = getValues('cakes')

  const getCake = (index: number) => cakes[index]

  const getPesoCake = (index: number) => Number(getCake(index).peso)

  const getRecheios = (index: number) => getCake(index).recheios

  const getLengthRecheios = (index: number) =>
    getRecheios(index).reduce((acc, recheio) => {
      if (recheio.id) return acc + 1

      return acc
    }, 0)

  const getTotalPriceRecheios = (index: number) => {
    const price = getRecheios(index).reduce((acc, recheio) => {
      if (!recheio.id) return acc

      const priceRecheio = recheio.price ? recheio.price : 0

      return acc + +priceRecheio
    }, 0)

    return price
  }

  const isPriceFixed = (index: number) => {
    const recheios = getRecheios(index)

    const recheiosWithPriceFixed = recheios.filter((recheio) => recheio.price_fixed)

    if (recheiosWithPriceFixed.length > 0) {
      recheiosWithPriceFixed.sort((a, b) => b.price - a.price)

      return recheiosWithPriceFixed[0].price
    }

    return false
  }

  const getCobertura = (index: number) => getCake(index).cobertura

  const getMediaPriceRecheios = (index: number) => {
    const lengthRecheios = getLengthRecheios(index)
    const totalPriceRecheios = getTotalPriceRecheios(index)

    if (getCobertura(index) === 'KIT_KAT') return 50

    const priceFixed = isPriceFixed(index)

    if (priceFixed) return priceFixed

    return Number(Math.round(totalPriceRecheios / lengthRecheios).toFixed(2))
  }

  const getStatus = () => getValues('status')

  const getPriceCake = (index: number) => {
    const mediaPriceRecheio = getMediaPriceRecheios(index)

    let peso = getPesoCake(index)

    if (peso == 0.6) return 30

    if (getStatus() != 'EM_PRODUCAO') {
      peso += 0.35
      console.log(peso)
    }

    return Number(Math.round(mediaPriceRecheio * peso).toFixed(2)) || 0
  }

  return { recheios: { getLengthRecheios, getTotalPriceRecheios, getMediaPriceRecheios }, getPriceCake }
}

interface useOrderProductProps<T> {
  productIndex: number
  value: T
}

export const useOrderProduct = (categoryIndex: number) => {
  const { setValue, getValues } = useFormContext<FormDataPedidos>()

  const orderProduct = getValues(`orderProduct.${categoryIndex}`)

  const getProduct = (productIndex: number) => orderProduct[productIndex]

  const getProductQuantity = (productIndex: number) => getProduct(productIndex).quantity

  const getProductPrice = (productIndex: number) => getProduct(productIndex).price

  const getProductTotalPrice = (productIndex: number) => {
    if (getProductQuantityValidation(productIndex)) return 0

    return getProductPrice(productIndex) * getProductQuantity(productIndex)
  }

  const getProductQuantityValidation = (productIndex: number) => {
    if (!getProductPrice(productIndex)) return true

    if (getProductPrice(productIndex) < 0) return true

    if (!getProductQuantity(productIndex)) return true

    if (getProductQuantity(productIndex) < 0) return true
  }

  const setProductId = ({ productIndex, value }: useOrderProductProps<string>) =>
    setValue(`orderProduct.${categoryIndex}.${productIndex}.product_id`, value)

  const setProductPrice = ({ productIndex, value }: useOrderProductProps<number>) =>
    setValue(`orderProduct.${categoryIndex}.${productIndex}.price`, value)

  const setProductTotalPrice = ({ productIndex, value }: useOrderProductProps<number>) =>
    setValue(`orderProduct.${categoryIndex}.${productIndex}.total`, value)

  const filterProducts = (products: ProductProps[], category: CategoryProps) => {
    return products.filter((product) => product.category_id === category.id && product.size !== 'PP')
  }

  const convertProductData = (products: ProductProps[]) => {
    return products.map((product) => ({
      label: product.name,
      value: product.id,
    }))
  }

  const getProducts = (products: ProductProps[], category: CategoryProps) => {
    const filteredProducts = filterProducts(products, category)

    return convertProductData(filteredProducts)
  }

  return {
    getProductQuantity,
    getProductPrice,
    getProductTotalPrice,
    getProducts,
    setProductId,
    setProductPrice,
    setProductTotalPrice,
  }
}

export const useDocesPP = () => {
  const { setValue, getValues } = useFormContext<FormDataPedidos>()

  const orderProduct = getValues('docesPP')

  const getProduct = (productIndex: number) => orderProduct[productIndex]

  const getProductQuantity = (productIndex: number) => getProduct(productIndex).quantity

  const getProductPrice = (productIndex: number) => getProduct(productIndex).price

  const getProductTotalPrice = (productIndex: number) => {
    if (getProductQuantityValidation(productIndex)) return 0

    return getProductPrice(productIndex) * getProductQuantity(productIndex)
  }

  const getProductQuantityValidation = (productIndex: number) => {
    if (!getProductPrice(productIndex)) return true

    if (getProductPrice(productIndex) < 0) return true

    if (!getProductQuantity(productIndex)) return true

    if (getProductQuantity(productIndex) < 0) return true
  }

  const setProductId = ({ productIndex, value }: useOrderProductProps<string>) =>
    setValue(`docesPP.${productIndex}.product_id`, value)

  const setProductPrice = ({ productIndex, value }: useOrderProductProps<number>) =>
    setValue(`docesPP.${productIndex}.price`, value)

  const setProductTotalPrice = ({ productIndex, value }: useOrderProductProps<number>) =>
    setValue(`docesPP.${productIndex}.total`, value)

  const filterProducts = (products: ProductProps[]) => {
    return products.filter((product) => product.size === 'PP')
  }

  const convertProductData = (products: ProductProps[]) => {
    return products.map((product) => ({
      label: product.name,
      value: product.id,
    }))
  }

  const getProducts = (products: ProductProps[]) => {
    const filteredProducts = filterProducts(products)

    return convertProductData(filteredProducts)
  }

  return {
    getProductQuantity,
    getProductPrice,
    getProductTotalPrice,
    getProducts,
    setProductId,
    setProductPrice,
    setProductTotalPrice,
  }
}

export const useOrder = () => {
  const { getValues, setValue } = useFormContext<FormDataPedidos>()

  const products = getValues('orderProduct')
  const docesPP = getValues('docesPP') || []
  const cakes = getValues('cakes')

  const getProducts = () => {
    const allProducts = products?.reduce((acc, category) => {
      return [...acc, ...category]
    }, [])

    return [...allProducts, ...docesPP]
  }

  const getProductsPrice = () => {
    const products = getProducts()

    return products?.reduce((acc, product) => {
      if (!product.total) return acc

      if (product.total < 0) return acc

      return acc + +product.total
    }, 0)
  }

  const getCakesPrice = () => {
    return cakes?.reduce((acc, cake) => {
      if (!cake.price) return acc

      if (cake.price < 0) return acc

      return acc + +cake.price
    }, 0)
  }

  const getTopperPrice = () => {
    return cakes?.reduce((acc, cake) => {
      if (!cake.tem_topper) return acc

      if (!cake?.topper?.price) return acc

      return acc + +cake?.topper?.price
    }, 0)
  }

  const getFretePrice = () => {
    return Number(getValues('value_frete') || 0)
  }

  const toFixed = (value: number) => {
    return Number(value.toFixed(2))
  }
  const getTotalPrice = () => {
    return toFixed(getProductsPrice() + getCakesPrice() + getTopperPrice() + getFretePrice())
  }

  const executeCalculateTotal = () => {
    setValue('total', getTotalPrice())
  }

  return { executeCalculateTotal }
}
