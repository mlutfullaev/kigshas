import * as XLSX from 'xlsx'
import { IEvent, TTableRow } from '@/tools/types.ts'
export const exportExcel = async (
  data: TTableRow[][],
): Promise<void> => {
  try {
    const headers = [
      'ID',
      'рудоспуска',
      'check_out_time',
      'model_type',
      'MT_number',
      'oversized',
      'input_volume',
      'output_volume',
      'unloaded_volume',
      'Масса в кузове input',
      'КИГ',
      '% налипания по массе',
      'Технический рейс',
    ]

    // Add headers as the first row
    const sheetData = [headers, ...data]

    // Create a worksheet from the data array
    const worksheet = XLSX.utils.aoa_to_sheet(sheetData)

    // Apply bold styling to the header row
    headers.forEach((_, index) => {
      const cellAddress = XLSX.utils.encode_cell({ r: 0, c: index })
      if (worksheet[cellAddress]) {
        worksheet[cellAddress].s = { font: { bold: true } }
      }
    })

    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Events')

    // Generating and downloading the Excel file
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' })

    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'kigshas.xlsx'

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  } catch (error) {
    console.error('Error exporting to Excel:', error)
  }
}

export const formatEventsForExcel = (data: IEvent[]) => {
  return data.map((event, index) => {
    return [
      index,
      typeof event.service.descent === 'object'
        ? event.service.descent.name
        : event.service.descent,
      event.check_out_time,
      event.vehicle?.model.name || '-',
      event.vehicle?.number || '-',
      event.oversized,
      event.input_volume,
      event.output_volume,
      event.unloaded_volume,
      event.mass,
      event.kig,
      event.sticking,
      event.technical_road
    ]
  })
}