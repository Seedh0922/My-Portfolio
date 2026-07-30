import { headline, metrics } from "@/lib/site";

/**
 * KPI row. Three headline numbers are a set of stat tiles, not a bar chart —
 * there is no magnitude relationship between them to plot.
 */
export function StatTiles() {
  return (
    <div className="kpi-row">
      {headline.map((tile) => (
        <div className="tile" key={tile.label}>
          <span className="tile-label">{tile.label}</span>
          <span className="tile-value">{tile.value}</span>
          <span className="tile-delta">{tile.delta}</span>
          <span className="tile-note">{tile.note}</span>
        </div>
      ))}
    </div>
  );
}

/**
 * Before → after per metric, drawn as a dumbbell in one hue and two shades.
 *
 * Each row is scaled to its own baseline (0 → baseline) rather than to a shared
 * axis, because the metrics carry different units — milliseconds and kilobytes
 * do not belong on one scale. That makes the rows small multiples: bar length is
 * only comparable within a row, so every value is direct-labelled beside it. The
 * markup is a real table, so the numbers are readable with the graphic ignored
 * entirely.
 */
export function ComparisonTable() {
  return (
    <div>
      <div className="compare-wrap">
        <table className="compare">
          <thead>
            <tr>
              <th scope="col">Metric</th>
              <th scope="col">Baseline</th>
              <th scope="col">Optimized</th>
              <th scope="col">Change</th>
              <th scope="col" className="plot">
                <span aria-hidden="true">0 → baseline</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {metrics.map((m) => {
              const after = Math.round((m.optimized / m.baseline) * 1000) / 10;
              return (
                <tr key={m.label}>
                  <th scope="row">{m.label}</th>
                  <td className="num">{m.baselineText}</td>
                  <td className="num-strong">{m.optimizedText}</td>
                  <td className={m.improved ? "delta-good" : "delta-flat"}>
                    {m.changeText}
                  </td>
                  <td className="plot">
                    <div
                      className="track"
                      aria-hidden="true"
                      style={{ ["--after" as string]: `${after}%` }}
                    >
                      <span className="connector" />
                      <span className="dot dot-before" />
                      <span className="dot dot-after" />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="legend">
          <span className="legend-item">
            <span className="swatch swatch-before" aria-hidden="true" />
            Baseline
          </span>
          <span className="legend-item">
            <span className="swatch swatch-after" aria-hidden="true" />
            Optimized
          </span>
          <span className="legend-item quiet">
            Each row scaled to its own baseline — lengths compare within a row,
            not across rows.
          </span>
        </div>
      </div>
    </div>
  );
}
