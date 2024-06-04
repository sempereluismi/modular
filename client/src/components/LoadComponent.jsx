import './css/LoadComponent.css'

export function LoadComponent (width, height, color) {
  return (
    <div
      className='spinner' style={{
        width,
        height,
        borderColor: color
      }}
    />
  )
}
