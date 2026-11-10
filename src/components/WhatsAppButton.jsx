import { useSettings } from '../lib/content.jsx';
import Icon from './Icon.jsx';

export default function WhatsAppButton() {
  const { whatsapp } = useSettings();
  if (!whatsapp) return null;
  return (
    <a className="whatsapp-fab" href={`https://wa.me/${whatsapp}`} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp">
      <Icon name="whatsapp" size={26} />
    </a>
  );
}
