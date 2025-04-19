import { useState } from 'react';
import './CalendarWidget.css';

export default function CalendarWidget({ events = [], onDateSelect }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const daysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const firstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const monthName = currentDate.toLocaleString('default', { month: 'long' });
  
  const days = daysInMonth(year, month);
  const firstDay = firstDayOfMonth(year, month);
  
  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };
  
  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleDateClick = (day) => {
    const clickedDate = new Date(year, month, day);
    setSelectedDate(clickedDate);
    if (onDateSelect) {
      onDateSelect(clickedDate);
    }
  };

  const hasEvent = (day) => {
    const date = new Date(year, month, day);
    return events.some(event => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === date.getDate() &&
             eventDate.getMonth() === date.getMonth() &&
             eventDate.getFullYear() === date.getFullYear();
    });
  };

  const renderCalendarDays = () => {
    const days = [];
    const totalDays = daysInMonth(year, month);
    const firstDay = firstDayOfMonth(year, month);
    
    // Empty cells for days before the first day of month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }
    
    // Cells for each day of the month
    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(year, month, day);
      const isToday = new Date().toDateString() === date.toDateString();
      const isSelected = selectedDate && selectedDate.toDateString() === date.toDateString();
      const hasEventOnDay = hasEvent(day);
      
      days.push(
        <div
          key={`day-${day}`}
          className={`calendar-day ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''} ${hasEventOnDay ? 'has-event' : ''}`}
          onClick={() => handleDateClick(day)}
        >
          {day}
          {hasEventOnDay && <div className="event-dot"></div>}
        </div>
      );
    }
    
    return days;
  };

  return (
    <div className="calendar-widget">
      <div className="calendar-header">
        <button onClick={previousMonth} className="month-nav prev">&lt;</button>
        <h3>{monthName} {year}</h3>
        <button onClick={nextMonth} className="month-nav next">&gt;</button>
      </div>
      
      <div className="calendar-grid">
        <div className="weekday">Sun</div>
        <div className="weekday">Mon</div>
        <div className="weekday">Tue</div>
        <div className="weekday">Wed</div>
        <div className="weekday">Thu</div>
        <div className="weekday">Fri</div>
        <div className="weekday">Sat</div>
        
        {renderCalendarDays()}
      </div>
      
      {selectedDate && (
        <div className="selected-date-events">
          <h4>{selectedDate.toLocaleDateString()}</h4>
          <div className="events-list">
            {events
              .filter(event => {
                const eventDate = new Date(event.date);
                return eventDate.getDate() === selectedDate.getDate() &&
                      eventDate.getMonth() === selectedDate.getMonth() &&
                      eventDate.getFullYear() === selectedDate.getFullYear();
              })
              .map((event, index) => (
                <div key={index} className="event-item">
                  <span className="event-time">
                    {new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <span className="event-title">{event.title}</span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
