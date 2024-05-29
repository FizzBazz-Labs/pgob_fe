export function formatDate(date: string) {
  const months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ]

  const splitDate = date.split('-')

  return `${splitDate[2]} de ${months[Number(splitDate[1]) - 1]} del ${splitDate[0]}`
}

export function formatDateTime(value: string) {
  const date = new Date(value)
  console.log(String(date.getDate()).padStart(2, '0'))

  const yyyy = date.getFullYear()
  const MM = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  const hh = String(date.getHours()).padStart(2, '0')
  const mm = String(date.getMinutes()).padStart(2, '0')

  return `${yyyy}-${MM}-${dd}T${hh}:${mm}:00`
}
