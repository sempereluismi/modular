/* eslint-disable react/prop-types */
function CardNoteBookElements ({ text, subtext }) {
  return (
    <div className='flex flex-col p-2 gap-1'>
      <div className='w-full relative'>
        <div className='absolute top-4 left-16 text-lg font-semibold'>{text}</div>
        <div className='bg-blue-500/70 w-full h-[2px] rounded-full mb-6 mt-10' />
        <div className='absolute top-10 left-16 text-lg text-nowrap font-semibold'>{subtext}</div>
        <div className='bg-blue-500/70 w-full h-[2px] rounded-full mb-6' />
        <div className='bg-blue-500/70 w-full h-[2px] rounded-full mb-6' />
        <div className='bg-blue-500/70 w-full h-[2px] rounded-full mb-6' />
        <div className='bg-blue-500/70 w-full h-[2px] rounded-full mb-6' />
        <div className='bg-blue-500/70 w-full h-[2px] rounded-full mb-6' />
        <div className='bg-blue-500/70 w-full h-[2px] rounded-full mb-6' />
        <div className='bg-blue-500/70 w-full h-[2px] rounded-full mb-6' />
        <div className='bg-blue-500/70 w-full h-[2px] rounded-full mb-6' />
        <div className='bg-blue-500/70 w-full h-[2px] rounded-full mb-6' />
        <div className='bg-blue-500/70 w-full h-[2px] rounded-full mb-6' />
        <div className='bg-blue-500/70 w-full h-[2px] rounded-full mb-6' />
        <div className='bg-blue-500/70 w-full h-[2px] rounded-full mb-6' />
        <div className='bg-blue-500/70 w-full h-[2px] rounded-full mb-6' />
        <div className='bg-blue-500/70 w-full h-[2px] rounded-full mb-6' />
        <div className='bg-blue-500/70 w-full h-[2px] rounded-full mb-6' />
        <div className='bg-red-500 absolute top-0 left-[50px] w-[2px] h-[376px] rounded-full' />
      </div>
    </div>
  )
}

export default CardNoteBookElements
