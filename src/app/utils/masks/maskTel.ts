export function maskTel(tel: string) {
  const normalized = tel.replace(/\D/g, '')

  return normalized.replace(/(\d{2})(\d)(\d{4})(\d{4})/, '($1) $2 $3-$4')
}
