"use client";
import { useState, useEffect } from 'react';
import MetricCard from './components/analytics/MetricCard/MetricCard';
import LineChart from './components/analytics/LineChart/LineChart';
import BarChart from './components/analytics/BarChart/BarChart';
import PieChart from './components/analytics/PieChart/PieChart';
import ActivityFeed from './components/analytics/ActivityFeed/ActivityFeed';
import DataTable from './components/analytics/DataTable/DataTable';
import DateRangePicker from './components/analytics/DateRangePicker/DateRangePicker';
import FilterDropdown from './components/analytics/FilterDropdown/FilterDropdown';
import NotificationBell from './components/features/NotificationBell/NotificationBell';
import UserProfile from './components/features/UserProfile/UserProfile';
import RefreshButton from './components/features/RefreshButton/RefreshButton';
import styles from './page.module.css';

export default function Dashboard() {
  const [dateRange, setDateRange] = useState('last30days');
  const [filter, setFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Example notifications
  const notifications = [
    { id: 1, text: 'New feature released: Export to PDF', time: '2 hours ago', unread: true },
    { id: 2, text: 'System maintenance scheduled for tomorrow', time: '1 day ago', unread: true },
    { id: 3, text: 'Your monthly report is ready', time: '3 days ago', unread: false },
  ];

  const metrics = [
    { title: 'Total Users', value: '12,345', change: '+12%', period: 'vs last month', icon: 'users' },
    { title: 'Revenue', value: '$45,678', change: '+8%', period: 'vs last month', icon: 'dollar' },
    { title: 'Conversion Rate', value: '3.2%', change: '-0.5%', period: 'vs last month', icon: 'percent' },
    { title: 'Avg. Session', value: '2m 45s', change: '+10%', period: 'vs last month', icon: 'clock' },
    { title: 'Bounce Rate', value: '25.4%', change: '-2.1%', period: 'vs last month', icon: 'arrowDown' }
  ];

  const lineChartData = [
    { date: '2025-01', users: 1200, revenue: 12400 },
    { date: '2025-02', users: 1900, revenue: 14500 },
    { date: '2025-03', users: 1700, revenue: 13800 },
    { date: '2025-04', users: 2100, revenue: 17200 },
    { date: '2025-05', users: 2300, revenue: 19000 },
    { date: '2025-06', users: 2500, revenue: 21500 }
  ];

  const pieChartData = [
    { name: 'Mobile', value: 45, color: '#8884d8' },
    { name: 'Desktop', value: 35, color: '#82ca9d' },
    { name: 'Tablet', value: 20, color: '#ffc658' }
  ];

  const barChartData = [
    { category: 'Product A', sales: 4000, profit: 2400 },
    { category: 'Product B', sales: 3000, profit: 1398 },
    { category: 'Product C', sales: 2000, profit: 980 },
    { category: 'Product D', sales: 2780, profit: 1908 },
    { category: 'Product E', sales: 1890, profit: 1200 }
  ];

  const tableData = [
    { id: 1, name: 'John Doe', visits: 123, conversion: '3.2%', revenue: '$432', status: 'active' },
    { id: 2, name: 'Jane Smith', visits: 98, conversion: '4.5%', revenue: '$321', status: 'active' },
    { id: 3, name: 'Bob Johnson', visits: 145, conversion: '2.9%', revenue: '$543', status: 'inactive' },
    { id: 4, name: 'Alice Brown', visits: 78, conversion: '5.1%', revenue: '$265', status: 'active' },
    { id: 5, name: 'Carlos Rodriguez', visits: 112, conversion: '3.8%', revenue: '$387', status: 'active' },
    { id: 6, name: 'Emily Chen', visits: 89, conversion: '4.2%', revenue: '$298', status: 'inactive' }
  ];

  const activities = [
    { id: 1, user: 'John Doe', action: 'logged in', timestamp: '5 minutes ago', avatar: '/avatars/john.jpg' },
    { id: 2, user: 'Jane Smith', action: 'updated profile', timestamp: '10 minutes ago', avatar: '/avatars/jane.jpg' },
    { id: 3, user: 'Bob Johnson', action: 'made a purchase', timestamp: '15 minutes ago', avatar: '/avatars/bob.jpg' },
    { id: 4, user: 'Alice Brown', action: 'viewed product', timestamp: '20 minutes ago', avatar: '/avatars/alice.jpg' },
    { id: 5, user: 'Carlos Rodriguez', action: 'left a review', timestamp: '25 minutes ago', avatar: '/avatars/carlos.jpg' },
    { id: 6, user: 'Emily Chen', action: 'shared a product', timestamp: '30 minutes ago', avatar: '/avatars/emily.jpg' }
  ];
  
  const filterOptions = [
    { value: 'all', label: 'All Data' },
    { value: 'web', label: 'Web Traffic' },
    { value: 'mobile', label: 'Mobile Traffic' },
    { value: 'social', label: 'Social Media' }
  ];
  
  const dateRangeOptions = [
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'last7days', label: 'Last 7 Days' },
    { value: 'last30days', label: 'Last 30 Days' },
    { value: 'thisMonth', label: 'This Month' },
    { value: 'lastMonth', label: 'Last Month' },
    { value: 'custom', label: 'Custom Range' }
  ];

  // Simulate data refresh
  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1200);
  };

  // Toggle theme
  useEffect(() => {
    document.body.className = darkMode ? 'dark-theme' : '';
  }, [darkMode]);

  return (
    <div className={`${styles.dashboard} ${darkMode ? styles.darkTheme : ''}`}>
      <header className={styles.dashboardHeader}>
        <div className={styles.dashboardTitle}>
          <h1>Analytics Dashboard</h1>
          <span className={styles.dashboardSubtitle}>Performance overview</span>
        </div>
        
        <div className={styles.dashboardControls}>
          <DateRangePicker 
            value={dateRange} 
            onChange={setDateRange}
            options={dateRangeOptions}
          />
          <FilterDropdown 
            value={filter} 
            onChange={setFilter}
            options={filterOptions}
          />
          <RefreshButton onClick={handleRefresh} isLoading={isLoading} />
          <div className={styles.themeSwitcher} onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? '☀️' : '🌙'}
          </div>
          <div className={styles.notificationContainer}>
            <NotificationBell 
              count={notifications.filter(n => n.unread).length} 
              onClick={() => setShowNotifications(!showNotifications)} 
            />
            {showNotifications && (
              <div className={styles.notificationsPanel}>
                <h3>Notifications</h3>
                {notifications.map(notification => (
                  <div key={notification.id} className={`${styles.notification} ${notification.unread ? styles.unread : ''}`}>
                    <p>{notification.text}</p>
                    <span>{notification.time}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <UserProfile name="Admin User" avatar="/avatars/admin.jpg" />
        </div>
      </header>
      
      <div className={styles.metricsContainer}>
        {metrics.map((metric, index) => (
          <MetricCard
            key={index}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            period={metric.period}
            icon={metric.icon}
          />
        ))}
      </div>

      <div className={styles.chartsGrid}>
        <div className={`${styles.chartContainer} ${styles.fullWidth}`}>
          <div className={styles.chartHeader}>
            <h2 className={styles.chartTitle}>User Growth & Revenue</h2>
            <div className={styles.chartControls}>
              <button className={styles.chartControlBtn}>Users</button>
              <button className={styles.chartControlBtn}>Revenue</button>
              <button className={styles.chartControlBtn}>Combined</button>
            </div>
          </div>
          <LineChart data={lineChartData} />
        </div>
        
        <div className={styles.chartContainer}>
          <div className={styles.chartHeader}>
            <h2 className={styles.chartTitle}>Device Distribution</h2>
            <select className={styles.chartSelect}>
              <option>All Users</option>
              <option>New Users</option>
              <option>Returning Users</option>
            </select>
          </div>
          <PieChart data={pieChartData} />
        </div>
        
        <div className={styles.chartContainer}>
          <div className={styles.chartHeader}>
            <h2 className={styles.chartTitle}>Product Performance</h2>
            <select className={styles.chartSelect}>
              <option>Sales</option>
              <option>Profit</option>
              <option>Units</option>
            </select>
          </div>
          <BarChart data={barChartData} />
        </div>
      </div>

      <div className={styles.dataRow}>
        <div className={styles.tableContainer}>
          <div className={styles.tableHeader}>
            <h2 className={styles.tableTitle}>Top Users</h2>
            <div className={styles.tableControls}>
              <input type="text" placeholder="Search users..." className={styles.searchInput} />
              <button className={styles.exportBtn}>Export</button>
            </div>
          </div>
          <DataTable 
            data={tableData} 
            columns={['name', 'visits', 'conversion', 'revenue', 'status']}
            sortable={true}
          />
          <div className={styles.tablePagination}>
            <button className={styles.paginationBtn}>Previous</button>
            <span className={styles.paginationInfo}>Page 1 of 5</span>
            <button className={styles.paginationBtn}>Next</button>
          </div>
        </div>
        
        <div className={styles.activityContainer}>
          <div className={styles.activityHeader}>
            <h2 className={styles.activityTitle}>Recent Activity</h2>
            <select className={styles.activityFilter}>
              <option>All Activities</option>
              <option>Logins</option>
              <option>Purchases</option>
              <option>Updates</option>
            </select>
          </div>
          <ActivityFeed activities={activities} showAvatars={true} />
          <button className={styles.viewAllBtn}>View All Activities</button>
        </div>
      </div>
      
      <div className={styles.summarySection}>
        <h2 className={styles.sectionTitle}>Performance Summary</h2>
        <div className={styles.summaryCards}>
          <div className={styles.summaryCard}>
            <h3>Top Performing Product</h3>
            <p className={styles.summaryHighlight}>Product A</p>
            <p>Generated $12,450 in revenue this month</p>
          </div>
          <div className={styles.summaryCard}>
            <h3>Growth Trend</h3>
            <p className={styles.summaryHighlight}>+15.2%</p>
            <p>Overall growth compared to previous period</p>
          </div>
          <div className={styles.summaryCard}>
            <h3>Areas for Improvement</h3>
            <p className={styles.summaryHighlight}>Mobile Conversion</p>
            <p>Currently underperforming by 3.5%</p>
          </div>
        </div>
      </div>
      
      <footer className={styles.dashboardFooter}>
        <p>© 2025 Your Company - Analytics Dashboard v2.1</p>
        <div className={styles.footerLinks}>
          <a href="#">Documentation</a>
          <a href="#">Support</a>
          <a href="#">Settings</a>
        </div>
      </footer>
    </div>
  );
}
