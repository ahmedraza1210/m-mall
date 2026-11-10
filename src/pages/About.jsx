import { Link } from 'react-router-dom';
import { useSettings } from '../lib/content.jsx';
import { usePageTitle, telHref } from '../lib/format.js';
import PageBand from '../components/PageBand.jsx';

// Converted from about-us.html

export default function About() {
  const s = useSettings();
  usePageTitle('About Us');
  return (
    <>
      <PageBand
        crumbs={[{ label: 'About Us' }]}
        eyebrow={'About Machinery Mall'}
        title={'Your Industry. Your Requirement. Our Solution.'}
        lead={
          'Machinery Mall is a global industrial sourcing and solutions platform built with one simple purpose — to make it easier for industries to find the right machinery, tools, spare parts, equipment and complete industrial solutions, regardless of the industry, application or location.'
        }
      />
      <div style={{ background: '#fff', padding: '56px 0', borderBottom: '1px solid var(--bd)' }}>
        <div className="wrap r-stack" style={{ display: 'flex', gap: '56px', alignItems: 'flex-start' }}>
          <div style={{ flex: '1' }}>
            <span className="eyebrow">Who we are</span>
            <h2 className="h2" style={{ marginTop: '11px', fontSize: '32px' }}>
              Our objective is not simply to sell machinery
            </h2>
            <p className="lead" style={{ marginTop: '18px' }}>
              We believe every industry is different, every production process has its own requirements, and every business faces unique technical and
              operational challenges. Sometimes the required machine is readily available. Sometimes it needs to be customized. Sometimes a critical spare is
              required urgently. Sometimes the right tool or component is available only with a manufacturer located thousands of kilometres away.
            </p>
            <p className="lead" style={{ marginTop: '13px' }}>
              This is where Machinery Mall comes in.
            </p>
            <p className="lead" style={{ marginTop: '13px' }}>
              {
                'We work across industries and applications to understand your requirement, identify the right solution, and help you source it from the appropriate manufacturer, supplier, technology partner or authorized channel. Our objective is not simply to sell machinery — our objective is to '
              }
              <strong style={{ color: 'var(--ink)' }}>solve industrial requirements</strong>.
            </p>
            <div style={{ display: 'flex', gap: '12px', marginTop: '26px' }}>
              <Link className="btn btn-red" to="/contact">
                Send Your Requirement
              </Link>
              <Link className="btn btn-out" to="/case-studies">
                Read the Case Study
              </Link>
            </div>
          </div>
          <div style={{ width: '400px', flexShrink: '0' }} className="r-side">
            <div className="card on-dark blueprint-d" style={{ background: 'var(--ink)', border: '0', padding: '32px 30px' }}>
              <span className="eyebrow" style={{ color: '#FF8A8E' }}>
                Your requirement can be our starting point
              </span>
              <p className="sub" style={{ margin: '12px 0 16px' }}>
                An industrial requirement often begins with a simple question. Machinery Mall exists to help answer these:
              </p>
              <div style={{ display: 'flex', gap: '11px', alignItems: 'flex-start', padding: '9px 0', borderBottom: '1px solid rgba(255,255,255,.12)' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8FC4E8" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 15a2.5 2.5 0 0 1-2.5 2.5H9L4 21V6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5z" />
                </svg>
                <span style={{ fontSize: '14.5px', color: '#DCE8F2' }}>“Where can I find this?”</span>
              </div>
              <div style={{ display: 'flex', gap: '11px', alignItems: 'flex-start', padding: '9px 0', borderBottom: '1px solid rgba(255,255,255,.12)' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8FC4E8" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 15a2.5 2.5 0 0 1-2.5 2.5H9L4 21V6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5z" />
                </svg>
                <span style={{ fontSize: '14.5px', color: '#DCE8F2' }}>“Who manufactures it?”</span>
              </div>
              <div style={{ display: 'flex', gap: '11px', alignItems: 'flex-start', padding: '9px 0', borderBottom: '1px solid rgba(255,255,255,.12)' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8FC4E8" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 15a2.5 2.5 0 0 1-2.5 2.5H9L4 21V6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5z" />
                </svg>
                <span style={{ fontSize: '14.5px', color: '#DCE8F2' }}>“Can it be customized?”</span>
              </div>
              <div style={{ display: 'flex', gap: '11px', alignItems: 'flex-start', padding: '9px 0', borderBottom: '1px solid rgba(255,255,255,.12)' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8FC4E8" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 15a2.5 2.5 0 0 1-2.5 2.5H9L4 21V6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5z" />
                </svg>
                <span style={{ fontSize: '14.5px', color: '#DCE8F2' }}>“Is there a better-quality alternative?”</span>
              </div>
              <div style={{ display: 'flex', gap: '11px', alignItems: 'flex-start', padding: '9px 0', borderBottom: '1px solid rgba(255,255,255,.12)' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8FC4E8" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 15a2.5 2.5 0 0 1-2.5 2.5H9L4 21V6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5z" />
                </svg>
                <span style={{ fontSize: '14.5px', color: '#DCE8F2' }}>“Can I get the spare parts?”</span>
              </div>
              <div style={{ display: 'flex', gap: '11px', alignItems: 'flex-start', padding: '9px 0', borderBottom: '1px solid rgba(255,255,255,.12)' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8FC4E8" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 15a2.5 2.5 0 0 1-2.5 2.5H9L4 21V6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5z" />
                </svg>
                <span style={{ fontSize: '14.5px', color: '#DCE8F2' }}>“Can I source it at a better commercial value?”</span>
              </div>
              <div style={{ display: 'flex', gap: '11px', alignItems: 'flex-start', padding: '9px 0', borderBottom: '1px solid rgba(255,255,255,.12)' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8FC4E8" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 15a2.5 2.5 0 0 1-2.5 2.5H9L4 21V6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5z" />
                </svg>
                <span style={{ fontSize: '14.5px', color: '#DCE8F2' }}>“Can someone develop this machine for my application?”</span>
              </div>
            </div>
            <div className="card" style={{ marginTop: '16px', padding: '24px' }}>
              <div className="h5" style={{ marginBottom: '12px' }}>
                Visit us
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '11px' }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#E01B22" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11z" />
                  <circle cx="12" cy="10" r="2.6" />
                </svg>
                <span style={{ fontSize: '13.5px', lineHeight: '1.6' }}>
                  {s.addressLine1}
                  <br />
                  {s.addressLine2}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#E01B22" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1.1 1A16 16 0 0 1 4 5.1 1 1 0 0 1 5 4z" />
                </svg>
                <span className="mono" style={{ fontSize: '14px', fontWeight: '600' }}>
                  {s.phone}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ background: 'var(--bg)', padding: '56px 0' }}>
        <div className="wrap">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '32px' }}>
            <span className="eyebrow">How we help</span>
            <h2 className="h2" style={{ marginTop: '11px', fontSize: '31px' }}>
              Four things that define how we work
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gap: '16px' }} className="r-g1">
            <div className="card" style={{ padding: '28px 26px' }}>
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '3px',
                  background: 'var(--blue-t)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0071BC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M3 12h18M12 3c2.6 3 2.6 15 0 18M12 3c-2.6 3-2.6 15 0 18" />
                </svg>
              </div>
              <div className="h4" style={{ marginBottom: '9px' }}>
                One platform for every industrial requirement
              </div>
              <p className="sub">
                We work with businesses across pharmaceuticals, food & beverages, chemical, steel, aluminium, copper, cast iron, automobile, aerospace, railway,
                marine, mining, oil & gas, power, water, construction, laboratory, plastics, rubber, recycling, packaging, woodworking, textiles, agriculture,
                HVAC, hospitality, cleaning, robotics and many more.
              </p>
            </div>
            <div className="card" style={{ padding: '28px 26px' }}>
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '3px',
                  background: 'var(--blue-t)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0071BC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3.2" />
                  <path d="M12 2.6v2.6M12 18.8v2.6M21.4 12h-2.6M5.2 12H2.6M18.6 5.4l-1.8 1.8M7.2 16.8l-1.8 1.8M18.6 18.6l-1.8-1.8M7.2 7.2L5.4 5.4" />
                </svg>
              </div>
              <div className="h4" style={{ marginBottom: '9px' }}>
                When standard machinery is not enough
              </div>
              <p className="sub">
                Many industries need machinery designed around their product, capacity, process, dimensions, material, automation level, space limitations or
                operating conditions. We can work towards getting machinery developed, customized, engineered or manufactured to your specific application.
              </p>
            </div>
            <div className="card" style={{ padding: '28px 26px' }}>
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '3px',
                  background: 'var(--blue-t)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0071BC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M20 20l-3.6-3.6" />
                </svg>
              </div>
              <div className="h4" style={{ marginBottom: '9px' }}>
                If you cannot find it, we will try to source it
              </div>
              <p className="sub">
                Whether a requirement needs to be sourced locally, nationally or internationally, our objective is to identify suitable sources and help you
                explore the right options — from a single spare part to a complete production plant.
              </p>
            </div>
            <div className="card" style={{ padding: '28px 26px' }}>
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '3px',
                  background: 'var(--blue-t)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0071BC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3l9 4.6-9 4.6-9-4.6z" />
                  <path d="M3 12.4l9 4.6 9-4.6M3 16.6L12 21l9-4.4" />
                </svg>
              </div>
              <div className="h4" style={{ marginBottom: '9px' }}>
                Machinery, tools & spares — without borders
              </div>
              <p className="sub">
                The right machine may be manufactured in another city or country, while a specialised spare may come from a highly focused manufacturer
                elsewhere. Geography should not become a barrier to finding the right industrial solution.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div style={{ background: '#fff', padding: '56px 0', borderTop: '1px solid var(--bd)' }}>
        <div className="wrap r-stack" style={{ display: 'flex', gap: '56px', alignItems: 'flex-start' }}>
          <div style={{ flex: '1' }}>
            <span className="eyebrow b">From manufacturer to customer — and customer to manufacturer</span>
            <h2 className="h2" style={{ marginTop: '11px', fontSize: '31px' }}>
              A marketplace where businesses can be both customers & suppliers
            </h2>
            <p className="lead" style={{ marginTop: '16px' }}>
              Machinery Mall is built around an Authorized Channel Partner concept. We believe the industrial ecosystem should not be limited to a simple
              buyer–seller relationship.
            </p>
            <p className="lead" style={{ marginTop: '13px' }}>
              Today, you may approach Machinery Mall as a customer looking for machinery. Tomorrow, you may become a supplier, manufacturer, technology partner,
              or a customer for another requirement. Our vision is to connect manufacturers, authorized channel partners, distributors, technology providers,
              industrial buyers, contractors, OEMs and end users in a larger industrial ecosystem.
            </p>
            <p className="lead" style={{ marginTop: '13px' }}>
              Through this ecosystem, Machinery Mall aims to make industrial sourcing simpler, faster, more connected, more flexible and more global.
            </p>
          </div>
          <div style={{ width: '440px', flexShrink: '0' }} className="r-side">
            <span className="eyebrow">More than a machinery supplier</span>
            <p className="sub" style={{ margin: '12px 0 16px' }}>
              We do not want Machinery Mall to be known simply as another machinery trading company, but as a trusted industrial sourcing and solution partner.
              Our role can change according to your requirement:
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '9px' }}>
              <span className="chip" style={{ height: '40px', fontSize: '14px', fontWeight: '600' }}>
                Machinery Sourcing Partner
              </span>
              <span className="chip" style={{ height: '40px', fontSize: '14px', fontWeight: '600' }}>
                Spare Parts Sourcing Partner
              </span>
              <span className="chip" style={{ height: '40px', fontSize: '14px', fontWeight: '600' }}>
                Tooling Partner
              </span>
              <span className="chip" style={{ height: '40px', fontSize: '14px', fontWeight: '600' }}>
                Technology Connector
              </span>
              <span className="chip" style={{ height: '40px', fontSize: '14px', fontWeight: '600' }}>
                Customized Machinery Facilitator
              </span>
              <span className="chip" style={{ height: '40px', fontSize: '14px', fontWeight: '600' }}>
                Authorized Channel Partner
              </span>
              <span className="chip" style={{ height: '40px', fontSize: '14px', fontWeight: '600' }}>
                Industrial Solution Partner
              </span>
            </div>
          </div>
        </div>
      </div>
      <div style={{ background: 'var(--bg)', padding: '56px 0' }}>
        <div className="wrap r-stack" style={{ display: 'flex', gap: '56px', alignItems: 'flex-start' }}>
          <div style={{ width: '400px', flexShrink: '0' }} className="r-side">
            <span className="eyebrow">For industries of every size</span>
            <h2 className="h2" style={{ marginTop: '11px', fontSize: '31px' }}>
              Every requirement matters
            </h2>
            <div className="rule" style={{ margin: '20px 0' }} />
            <p className="lead">
              Machinery Mall is not limited to large corporations. The scale of the requirement does not change how seriously it gets treated.
            </p>
            <Link className="btn btn-red" style={{ marginTop: '24px' }} to="/contact">
              Send Your Requirement
            </Link>
          </div>
          <div style={{ flex: '1' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'baseline', padding: '12px 0', borderBottom: '1px solid var(--bd)' }}>
              <span className="h5" style={{ flexShrink: '0' }}>
                A small manufacturing unit
              </span>
              <span className="sub">may require a single machine</span>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'baseline', padding: '12px 0', borderBottom: '1px solid var(--bd)' }}>
              <span className="h5" style={{ flexShrink: '0' }}>
                A growing company
              </span>
              <span className="sub">may require an automated production line</span>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'baseline', padding: '12px 0', borderBottom: '1px solid var(--bd)' }}>
              <span className="h5" style={{ flexShrink: '0' }}>
                An established manufacturer
              </span>
              <span className="sub">may require replacement machinery</span>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'baseline', padding: '12px 0', borderBottom: '1px solid var(--bd)' }}>
              <span className="h5" style={{ flexShrink: '0' }}>
                A multinational organization
              </span>
              <span className="sub">may require specialized equipment</span>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'baseline', padding: '12px 0', borderBottom: '1px solid var(--bd)' }}>
              <span className="h5" style={{ flexShrink: '0' }}>
                An OEM
              </span>{' '}
              <span className="sub">may require components and spare parts</span>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'baseline', padding: '12px 0', borderBottom: '1px solid var(--bd)' }}>
              <span className="h5" style={{ flexShrink: '0' }}>
                A contractor
              </span>
              <span className="sub">may require machinery for a specific project</span>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'baseline', padding: '12px 0', borderBottom: '1px solid var(--bd)' }}>
              <span className="h5" style={{ flexShrink: '0' }}>
                A new entrepreneur
              </span>
              <span className="sub">may require complete machinery for a new facility</span>
            </div>
          </div>
        </div>
      </div>
      <div className="on-dark blueprint-d" style={{ background: 'var(--ink)', padding: '60px 0' }}>
        <div className="wrap">
          <div style={{ maxWidth: '820px' }}>
            <span className="eyebrow" style={{ color: '#FF8A8E' }}>
              Our commitment
            </span>
            <h2 className="h2" style={{ marginTop: '12px', fontSize: '32px' }}>
              Understand the requirement before recommending a solution
            </h2>
            <p className="lead" style={{ marginTop: '16px' }}>
              We aim to help identify the right type of machinery, suitable manufacturers, appropriate technology, alternative products, customized solutions,
              spare parts, tools and accessories, competitive sourcing options, domestic and international sources, authorized channel partners and complete
              industrial solutions.
            </p>
            <p className="lead" style={{ marginTop: '13px' }}>
              Machinery is an investment that affects production capacity, quality, efficiency, maintenance, manpower, operating cost and ultimately business
              performance. That is why choosing the right equipment matters.
            </p>
          </div>
          <div
            style={{ marginTop: '40px', paddingTop: '32px', borderTop: '1px solid rgba(255,255,255,.14)', display: 'flex', alignItems: 'center', gap: '44px' }}
            className="r-stack"
          >
            <div style={{ flex: '1' }}>
              <h3 className="h3" style={{ color: '#fff', fontSize: '26px' }}>
                Your Requirement. Our Network.
                <br />
                The Right Solution.
              </h3>
              <p className="sub" style={{ marginTop: '12px' }}>
                Machinery | Tools | Spares | Equipment | Automation | Customized Solutions | Global Sourcing
              </p>
              <p className="lead" style={{ marginTop: '12px' }}>
                Whatever your industry. Whatever your requirement. Machinery Mall is here to help.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flexShrink: '0' }}>
              <Link className="btn btn-red btn-lg" to="/contact">
                Send Your Requirement
              </Link>
              <Link className="btn btn-out-w btn-lg" to="/contact">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
