import './CSVDownloader.css';

export default function CSVDownloader() {
  const handleDownload = () => {
    const csv = 'Name,Email\nAlice,alice@example.com\nBob,bob@example.com';
    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'users.csv';
    link.click();
  };

  return (
    <button className="csv-download-btn" onClick={handleDownload}>
      ⬇️ Download CSV
    </button>
  );
}
