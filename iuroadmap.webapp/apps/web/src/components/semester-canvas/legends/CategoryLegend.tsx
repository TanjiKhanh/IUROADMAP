export interface CategoryLegendItem {
  code: string;
  name: string;
  fillColor: string;
  borderColor: string;
}

/** Color legend of the course categories (D12). */
export function CategoryLegend({ items }: { items: ReadonlyArray<CategoryLegendItem> }) {
  if (!items.length) return null;
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
      {items.map((c) => (
        <span key={c.code} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#334155' }}>
          <span
            style={{
              width: 18,
              height: 12,
              borderRadius: 3,
              background: c.fillColor,
              border: `2px solid ${c.borderColor}`,
              display: 'inline-block',
            }}
          />
          {c.name}
        </span>
      ))}
    </div>
  );
}
