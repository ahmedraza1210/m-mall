import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../lib/content.jsx';
import { telHref } from '../lib/format.js';
import { productTypeCount, industryLink } from '../lib/industries.js';
import IndustryIcon from './IndustryIcon.jsx';

// The rotating "Industries we serve" hero from the original home page.
// Industries ticked "Show in home hero" in the admin are rotated here.
export default function HeroSlider() {
  const { data } = useContent();
  const s = data.settings;
  const slides = useMemo(
    () => data.industries.filter((i) => i.showInHero).sort((a, b) => (a.heroOrder || 99) - (b.heroOrder || 99)),
    [data.industries]
  );
  const [active, setActive] = useState(0);
  const [cycle, setCycle] = useState(0); // restarts the progress bar
  const seconds = s.heroSlideSeconds || 12;
  const reduced = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (slides.length < 2 || reduced) return undefined;
    const t = setTimeout(() => {
      setActive((a) => (a + 1) % slides.length);
      setCycle((c) => c + 1);
    }, seconds * 1000);
    return () => clearTimeout(t);
  }, [active, cycle, slides.length, seconds, reduced]);

  const go = (i) => {
    setActive(i);
    setCycle((c) => c + 1);
  };

  return (
    <div id="mmhero" className="on-dark">
        <svg viewBox="0 0 1440 620" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: "0", width: "100%", height: "100%" }}>
          <g style={{ transformOrigin: "1180px 200px", animation: "mmspin 52s linear infinite" }}>
            <path d="M1328.3,177.6L1368.2,183.0L1368.2,217.0L1328.3,222.4L1323.4,244.2L1357.0,266.4L1342.2,297.0L1303.9,284.5L1290.0,302.0L1310.6,336.6L1284.1,357.8L1254.9,329.9L1234.9,339.6L1238.4,379.7L1205.3,387.3L1191.1,349.6L1168.9,349.6L1154.7,387.3L1121.6,379.7L1125.1,339.6L1105.1,329.9L1075.9,357.8L1049.4,336.6L1070.0,302.0L1056.1,284.5L1017.8,297.0L1003.0,266.4L1036.6,244.2L1031.7,222.4L991.8,217.0L991.8,183.0L1031.7,177.6L1036.6,155.8L1003.0,133.6L1017.8,103.0L1056.1,115.5L1070.0,98.0L1049.4,63.4L1075.9,42.2L1105.1,70.1L1125.1,60.4L1121.6,20.3L1154.7,12.7L1168.9,50.4L1191.1,50.4L1205.3,12.7L1238.4,20.3L1234.9,60.4L1254.9,70.1L1284.1,42.2L1310.6,63.4L1290.0,98.0L1303.9,115.5L1342.2,103.0L1357.0,133.6L1323.4,155.8Z" fill="#fff" opacity=".07" />
            <circle cx="1180" cy="200" r="63.0" fill="none" stroke="#fff" strokeWidth="13.5" opacity=".07" />
          </g>
          <g style={{ transformOrigin: "1355px 430px", animation: "mmspin 38s linear infinite reverse" }}>
            <path d="M1458.8,414.3L1486.8,418.1L1486.8,441.9L1458.8,445.7L1452.8,468.3L1475.1,485.6L1463.2,506.2L1437.1,495.5L1420.5,512.1L1431.2,538.2L1410.6,550.1L1393.3,527.8L1370.7,533.8L1366.9,561.8L1343.1,561.8L1339.3,533.8L1316.7,527.8L1299.4,550.1L1278.8,538.2L1289.5,512.1L1272.9,495.5L1246.8,506.2L1234.9,485.6L1257.2,468.3L1251.2,445.7L1223.2,441.9L1223.2,418.1L1251.2,414.3L1257.2,391.7L1234.9,374.4L1246.8,353.8L1272.9,364.5L1289.5,347.9L1278.8,321.8L1299.4,309.9L1316.7,332.2L1339.3,326.2L1343.1,298.2L1366.9,298.2L1370.7,326.2L1393.3,332.2L1410.6,309.9L1431.2,321.8L1420.5,347.9L1437.1,364.5L1463.2,353.8L1475.1,374.4L1452.8,391.7Z" fill="#fff" opacity=".07" />
            <circle cx="1355" cy="430" r="44.1" fill="none" stroke="#fff" strokeWidth="9.4" opacity=".07" />
          </g>
          <g style={{ transformOrigin: "1020px 470px", animation: "mmspin 30s linear infinite" }}>
            <path d="M1091.2,459.2L1110.4,461.8L1110.4,478.2L1091.2,480.8L1083.9,503.1L1097.9,516.5L1088.3,529.7L1071.3,520.5L1052.2,534.4L1055.7,553.4L1040.2,558.5L1031.8,541.0L1008.2,541.0L999.8,558.5L984.3,553.4L987.8,534.4L968.7,520.5L951.7,529.7L942.1,516.5L956.1,503.1L948.8,480.8L929.6,478.2L929.6,461.8L948.8,459.2L956.1,436.9L942.1,423.5L951.7,410.3L968.7,419.5L987.8,405.6L984.3,386.6L999.8,381.5L1008.2,399.0L1031.8,399.0L1040.2,381.5L1055.7,386.6L1052.2,405.6L1071.3,419.5L1088.3,410.3L1097.9,423.5L1083.9,436.9Z" fill="#fff" opacity=".07" />
            <circle cx="1020" cy="470" r="30.2" fill="none" stroke="#fff" strokeWidth="6.5" opacity=".07" />
          </g>
          <g style={{ transformOrigin: "120px 520px", animation: "mmspin 46s linear infinite reverse" }}>
            <path d="M228.8,503.6L258.0,507.5L258.0,532.5L228.8,536.4L222.4,560.1L245.8,578.2L233.3,599.8L206.0,588.6L188.6,606.0L199.8,633.3L178.2,645.8L160.1,622.4L136.4,628.8L132.5,658.0L107.5,658.0L103.6,628.8L79.9,622.4L61.8,645.8L40.2,633.3L51.4,606.0L34.0,588.6L6.7,599.8L-5.8,578.2L17.6,560.1L11.2,536.4L-18.0,532.5L-18.0,507.5L11.2,503.6L17.6,479.9L-5.8,461.8L6.7,440.2L34.0,451.4L51.4,434.0L40.2,406.7L61.8,394.2L79.9,417.6L103.6,411.2L107.5,382.0L132.5,382.0L136.4,411.2L160.1,417.6L178.2,394.2L199.8,406.7L188.6,434.0L206.0,451.4L233.3,440.2L245.8,461.8L222.4,479.9Z" fill="#fff" opacity=".045" />
            <circle cx="120" cy="520" r="46.2" fill="none" stroke="#fff" strokeWidth="9.9" opacity=".045" />
          </g>
        </svg>
      <div className="wrap inner r-stack" style={{ display: "flex", gap: "56px", padding: "60px 0 58px", alignItems: "center" }}>
        <div style={{ flex: "1" }}>
          <span className="eyebrow" style={{ color: "#FF8A8E" }}>{s.siteName}™ — {s.tagline}</span>
          <h1 className="h1" style={{ marginTop: "16px", color: "#fff" }}>
            {s.heroTitle1}
            <br />
            <span style={{ color: "#4FA8E0" }}>{s.heroTitle2}</span>
          </h1>
          <p className="lead" style={{ marginTop: "18px", maxWidth: "540px" }}>{s.heroText}</p>
          <div className="r-stack" style={{ display: "flex", gap: "14px", marginTop: "28px", alignItems: "center" }}>
            <Link className="btn btn-red btn-lg" to="/contact">Send Your Requirement</Link>
            <a className="btn btn-out-w btn-lg" href={telHref(s.phone)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1.1 1A16 16 0 0 1 4 5.1 1 1 0 0 1 5 4z" /></svg>
              {s.phone}
            </a>
          </div>
          {slides.length > 1 && (
            <>
              <div style={{ display: "flex", gap: "9px", marginTop: "30px", alignItems: "center", flexWrap: "wrap" }}>
                {slides.map((ind, i) => (
                  <button key={ind.id} className={`mmdot${i === active ? " on" : ""}`} onClick={() => go(i)} aria-label={ind.name} />
                ))}
              </div>
              <div className="mmbarwrap" style={{ maxWidth: "300px" }}>
                <div key={cycle} className="mmbar" style={reduced ? undefined : { animation: `mmprogress ${seconds}s linear forwards` }} />
              </div>
            </>
          )}
        </div>
        {slides.length > 0 && (
          <div className="r-side" style={{ width: "440px", flexShrink: "0" }}>
            <div className="mmstage">
              {slides.map((ind, i) => {
                const items = ind.heroItems?.length ? ind.heroItems : [...(ind.items || []), ...(ind.groups || []).flatMap((g) => g.items)].slice(0, 6);
                return (
                  <div key={ind.id} className={`mmslide${i === active ? " on" : ""}`} aria-hidden={i !== active}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
                      <div style={{ width: "40px", height: "40px", borderRadius: "3px", background: "rgba(224,27,34,.16)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: "0" }}>
                        <IndustryIcon name={ind.icon} size={20} color="#FF6B70" />
                      </div>
                      <div>
                        <span className="tiny" style={{ letterSpacing: ".14em", textTransform: "uppercase", fontWeight: "700", color: "#8FC4E8" }}>Industries we serve</span>
                        <div className="h4" style={{ color: "#fff", marginTop: "2px" }}>{ind.name}</div>
                      </div>
                    </div>
                    <ul style={{ marginBottom: "14px" }}>
                      {items.map((it) => (
                        <li key={it} style={{ display: "flex", gap: "9px", alignItems: "flex-start", padding: "5px 0" }}>
                          <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#E01B22", flexShrink: "0", marginTop: "9px" }} />
                          <span style={{ fontSize: "13.5px", color: "#CBDCEA" }}>{it}</span>
                        </li>
                      ))}
                    </ul>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "13px", borderTop: "1px solid rgba(255,255,255,.13)" }}>
                      <span className="tiny mono" style={{ color: "#8FC4E8" }}>{productTypeCount(ind)} product types</span>
                      <Link to={industryLink(ind)} tabIndex={i === active ? 0 : -1} style={{ display: "flex", alignItems: "center", gap: "7px", fontSize: "13px", fontWeight: "600", color: "#fff" }}>
                        {"View product range "}
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12h15M13 6l6 6-6 6" /></svg>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
