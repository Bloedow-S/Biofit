import './style.css'

function Card({children, title}) {
  return (      
    <div className='card'>
      {title && <h1>{title}</h1>}
      {children}
    </div>
  )
}

export default Card
