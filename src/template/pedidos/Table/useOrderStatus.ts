'use client'

import { parseAsBoolean, parseAsInteger, parseAsString, useQueryStates } from 'nuqs'

export const useOrderStates = () => {
  const [{ page, take, query, orderId, openOrderModal, idRemove, openDelete, openPrint }, setOrderStates] =
    useQueryStates({
      query: parseAsString.withDefault(''),
      page: parseAsInteger.withDefault(0),
      take: parseAsInteger.withDefault(10),

      orderId: parseAsString.withDefault(''),
      openOrderModal: parseAsBoolean.withDefault(false),
      idRemove: parseAsString.withDefault(''),
      openDelete: parseAsBoolean.withDefault(false),
      openPrint: parseAsBoolean.withDefault(false),
    })

  return { page, take, query, setOrderStates, orderId, openOrderModal, idRemove, openDelete, openPrint }
}
