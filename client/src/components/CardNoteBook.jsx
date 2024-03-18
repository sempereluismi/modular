import CardNoteBookElements from './CardNoteBookElements'

function CardNoteBook () {
  return (
    <div className='bg-sky-200/30 w-[800px] h-96 rounded-t-lg'>
      <CardNoteBookElements />
      <div className='card__content' />
    </div>
  )
}

export default CardNoteBook
