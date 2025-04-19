import './FilterControls.css';

export default function FilterControls() {
  return (
    <div className="filter-controls">
      <select>
        <option>Last 7 days</option>
        <option>Last 30 days</option>
        <option>Last year</option>
      </select>
      <input type="text" placeholder="Search..." />
    </div>
  );
}
