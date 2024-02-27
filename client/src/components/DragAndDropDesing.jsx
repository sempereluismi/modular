/* eslint-disable react/prop-types */
import React from 'react'
import { IconFileTypeCsv } from '@tabler/icons-react'

export const DragAndDropDesing = ({ urlImage }) => {
  return (
    <div
      className='bg-repeat border-2  border-gray-400 rounded-lg px-4 py-8 text-center cursor-pointer' style={{
        backgroundImage: `url("${urlImage}")`,
        padding: '40px'
      }}
      // data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' class=\'icon icon-tabler icon-tabler-school\' width=\'30\' height=\'30\' viewBox=\'0 0 24 24\' stroke-width=\'1.5\' stroke=\'%23cfcfcf\' fill=\'none\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath stroke=\'none\' d=\'M0 0h24v24H0z\' fill=\'none\'/%3E%3Cpath d=\'M22 9l-10 -4l-10 4l10 4l10 -4v6\' /%3E%3Cpath d=\'M6 10.6v5.4a6 3 0 0 0 12 0v-5.4\' /%3E%3C/svg%3E
    >
      <h2 className='text-lg font-semibold mb-4 flex gap-2 items-center'>Arrastra y suelta archivos aquí <IconFileTypeCsv /></h2>
      <p className='text-lg font-semibold'>O haz clic para seleccionar archivos</p>
    </div>
  )
}
