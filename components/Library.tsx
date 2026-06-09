import Image from 'next/image';

const BRANDS = [
  { id: 'miumiu', img: '/images/miumiu.jpg', name: 'Miu Miu', sub: 'Milan · Est. 1993' },
  { id: 'acne', img: '/images/acne.jpg', name: 'Acne Studios', sub: 'Stockholm · Est. 1996' },
  { id: 'mugler', img: '/images/mugler.jpg', name: 'Mugler', sub: 'Paris · Est. 1974' },
  { id: 'ck', img: null, name: 'Calvin Klein', sub: 'New York · Est. 1968' },
  { id: 'vw', img: null, name: 'Vivienne Westwood', sub: 'London · Est. 1971' },
  { id: 'chanel', img: null, name: 'Chanel', sub: 'Paris · Est. 1910' },
];

export default function Library() {
  return (
    <section className="s03" id="library">
      <div className="rev">
        <span className="s00-num" style={{ color: 'rgba(245,239,232,.4)' }}>03</span>
        <h2 className="sec-title">vivie library</h2>
        <p className="sec-desc">all about fashion</p>
      </div>

      <div className="lib-grid rev">
        {BRANDS.map(b => (
          <div className="brand-card" key={b.id}>
            {b.img && (
              <Image
                className="bc-img"
                src={b.img}
                alt={b.name}
                width={600}
                height={280}
                style={{ width: '100%', height: 280, objectFit: 'cover', objectPosition: 'top' }}
              />
            )}
            <div className="bc-overlay" />
            <div className="bc-body">
              <div className="bc-name">{b.name}</div>
              <div className="bc-sub">{b.sub}</div>
            </div>
          </div>
        ))}
        <div className="brand-card empty" style={{ minHeight: 180, gridColumn: 'span 3' }}>
          <div className="bc-placeholder">
            <p style={{ fontSize: 13, letterSpacing: '.08em' }}>More brands coming soon &nbsp;✦</p>
            <small style={{ fontSize: 9, letterSpacing: '.18em', textTransform: 'uppercase' }}>Drop your images here</small>
          </div>
        </div>
      </div>
    </section>
  );
}
