import MetricCard from './components/analytics/MetricCard/MetricCard';
import LineChart from './components/analytics/LineChart/LineChart';
import BarChart from './components/analytics/BarChart/BarChart';
import PieChart from './components/analytics/PieChart/PieChart';
import ActivityFeed from './components/analytics/ActivityFeed/ActivityFeed';
import DataTable from './components/analytics/DataTable/DataTable';
import styles from './page.module.css';

export default function Dashboard() {
  const metrics = [
    { title: 'Total Users', value: '12,345', change: '+12%', period: 'vs last month' },
    { title: 'Revenue', value: '$45,678', change: '+8%', period: 'vs last month' },
    { title: 'Conversion Rate', value: '3.2%', change: '-0.5%', period: 'vs last month' },
    { title: 'Avg. Session', value: '2m 45s', change: '+10%', period: 'vs last month' }
  ];

  const lineChartData = [
    { date: '2025-01', users: 1200 },
    { date: '2025-02', users: 1900 },
    { date: '2025-03', users: 1700 },
    { date: '2025-04', users: 2100 }
  ];

  const pieChartData = [
    { name: 'Mobile', value: 45 },
    { name: 'Desktop', value: 35 },
    { name: 'Tablet', value: 20 }
  ];

  const barChartData = [
    { category: 'Product A', sales: 4000 },
    { category: 'Product B', sales: 3000 },
    { category: 'Product C', sales: 2000 },
    { category: 'Product D', sales: 2780 }
  ];

  const tableData = [
    { id: 1, name: 'John Doe', visits: 123, conversion: '3.2%', revenue: '$432' },
    { id: 2, name: 'Jane Smith', visits: 98, conversion: '4.5%', revenue: '$321' },
    { id: 3, name: 'Bob Johnson', visits: 145, conversion: '2.9%', revenue: '$543' },
    { id: 4, name: 'Alice Brown', visits: 78, conversion: '5.1%', revenue: '$265' }
  ];

  const activities = [
    { id: 1, user: 'John Doe', action: 'logged in', timestamp: '5 minutes ago' },
    { id: 2, user: 'Jane Smith', action: 'updated profile', timestamp: '10 minutes ago' },
    { id: 3, user: 'Bob Johnson', action: 'made a purchase', timestamp: '15 minutes ago' },
    { id: 4, user: 'Alice Brown', action: 'viewed product', timestamp: '20 minutes ago' }
  ];

  return (
    <div className={styles.dashboard}>
      <h1 className={styles.dashboardTitle}>Dashboard</h1>
      
      <div className={styles.metricsContainer}>
        {metrics.map((metric, index) => (
          <MetricCard 
            key={index}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            period={metric.period}
          />
        ))}
      </div>

      <div className={styles.chartsRow}>
        <div className={styles.chartContainer}>
          <h2 className={styles.chartTitle}>User Growth</h2>
          <LineChart data={lineChartData} />
        </div>
        
        <div className={styles.chartContainer}>
          <h2 className={styles.chartTitle}>Device Distribution</h2>
          <PieChart data={pieChartData} />
        </div>
        
        <div className={styles.chartContainer}>
          <h2 className={styles.chartTitle}>Product Performance</h2>
          <BarChart data={barChartData} />
        </div>
      </div>

      <div className={styles.dataRow}>
        <div className={styles.tableContainer}>
          <h2 className={styles.tableTitle}>Top Users</h2>
          <DataTable data={tableData} />
        </div>
        
        <div className={styles.activityContainer}>
          <h2 className={styles.activityTitle}>Recent Activity</h2>
          <ActivityFeed activities={activities} />
        </div>
      </div>
    </div>
  );
}