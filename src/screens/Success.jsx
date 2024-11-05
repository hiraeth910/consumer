import './success.css'
import success from '../assets/success.png'
function Succes() {
  return (
    <div className="success">
      <div className="inner">      <img src={success} className='successimage'/>
      <h3>Payment successful well deliver your product to your number.</h3>
</div>
    </div>
  )
}
export default Succes