import { useEffect } from 'react'
import { Check } from 'lucide-react'
import './ThankYouModal.css'

export default function ThankYouModal({ onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="thank-you-modal" role="dialog" aria-modal="true" aria-labelledby="thanks-title" onClick={onClose}>
      <div className="thank-you-modal-card" onClick={(e) => e.stopPropagation()}>
        <span className="thank-you-modal-close" aria-hidden="true"><Check /></span>
        <h2 id="thanks-title">¡Gracias por tu consulta!</h2>
        <p>
          Recibimos tus datos. El equipo institucional se pondrá en contacto para acompañarte con la
          información que necesitás.
        </p>
      </div>
    </div>
  )
}
