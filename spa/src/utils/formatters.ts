export function formatCPF (cpf?: string): string {
  if (!cpf) {
    return ''
  }

  const digits = cpf.replace(/\D/g, '')

  if (digits.length !== 11) {
    return cpf
  }

  return digits.replace(
    /(\d{3})(\d{3})(\d{3})(\d{2})/,
    '$1.$2.$3-$4',
  )
}

export function formatCPFToForm (value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  return digits
    .replace(/^(\d{3})(\d)/, '$1.$2')
    .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1-$2')
}
