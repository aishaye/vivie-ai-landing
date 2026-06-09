const items = [
  'vivie studio', 'design with words', 'vivie community',
  'real aesthetics. no brands.', 'vivie library', 'all about fashion',
  'vivie studio', 'design with words', 'vivie community',
  'real aesthetics. no brands.', 'vivie library', 'all about fashion',
];

export default function Ticker() {
  return (
    <div className="ticker">
      <div className="ticker-t">
        {items.map((item, i) => (
          <span key={i}>
            <span className="ti">{item}</span>
            <span className="ts">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
