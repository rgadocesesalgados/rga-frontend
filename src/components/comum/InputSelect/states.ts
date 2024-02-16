import { useState } from 'react'

export const useStateInputSelect = () => {
  const [optionOpen, setOptionOpen] = useState(false)

  return { optionOpen, setOptionOpen }
}
