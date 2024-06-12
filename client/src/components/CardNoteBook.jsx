/* eslint-disable react/prop-types */
import CardNoteBookElements from './CardNoteBookElements'

function CardNoteBook ({ text, subtext }) {
  return (
    <div className='bg-sky-200/30 w-[1000px] h-96 rounded-t-lg'>
      <CardNoteBookElements text={text} subtext={subtext} />
      <div className='card__content' />
    </div>
  )
}

export default CardNoteBook
