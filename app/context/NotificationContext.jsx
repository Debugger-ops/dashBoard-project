"use client";
import React, { createContext, useContext, useReducer, useCallback } from 'react';

// Create context
const NotificationContext = createContext(null);

// Notification types
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

// Action types
const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';
const CLEAR_NOTIFICATIONS = 'CLEAR_NOTIFICATIONS';

// Initial state
const initialState = {
  notifications: [],
};

// Reducer function
function notificationReducer(state, action) {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };
    
    case REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(
          notification => notification.id !== action.payload
        ),
      };
    
    case CLEAR_NOTIFICATIONS:
      return {
        ...state,
        notifications: [],
      };
    
    default:
      return state;
  }
}

/**
 * Notification context provider component
 * @param {Object} props - Component props
 * @returns {JSX.Element} Provider component
 */
export function NotificationProvider({ children }) {
  const [state, dispatch] = useReducer(notificationReducer, initialState);
  
  // Add notification
  const addNotification = useCallback((notification) => {
    const id = Date.now().toString();
    const newNotification = {
      id,
      type: NOTIFICATION_TYPES.INFO,
      duration: 5000, // Auto-dismiss after 5 seconds by default
      ...notification,
    };
    
    dispatch({ type: ADD_NOTIFICATION, payload: newNotification });
    
    // Auto-dismiss if duration is provided
    if (newNotification.duration) {
      setTimeout(() => {
        removeNotification(id);
      }, newNotification.duration);
    }
    
    return id;
  }, []);
  
  // Remove notification by ID
  const removeNotification = useCallback((id) => {
    dispatch({ type: REMOVE_NOTIFICATION, payload: id });
  }, []);
  
  // Clear all notifications
  const clearNotifications = useCallback(() => {
    dispatch({ type: CLEAR_NOTIFICATIONS });
  }, []);
  
  // Convenience methods for different notification types
  const success = useCallback((message, options = {}) => {
    return addNotification({
      type: NOTIFICATION_TYPES.SUCCESS,
      message,
      ...options,
    });
  }, [addNotification]);
  
  const error = useCallback((message, options = {}) => {
    return addNotification({
      type: NOTIFICATION_TYPES.ERROR,
      message,
      ...options,
    });
  }, [addNotification]);
  
  const warning = useCallback((message, options = {}) => {
    return addNotification({
      type: NOTIFICATION_TYPES.WARNING,
      message,
      ...options,
    });
  }, [addNotification]);
  
  const info = useCallback((message, options = {}) => {
    return addNotification({
      type: NOTIFICATION_TYPES.INFO,
      message,
      ...options,
    });
  }, [addNotification]);
  
  const value = {
    notifications: state.notifications,
    addNotification,
    removeNotification,
    clearNotifications,
    success,
    error,
    warning,
    info,
  };
  
  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

/**
 * Custom hook to use notification context
 * @returns {Object} Notification context value
 */
export function useNotificationContext() {
  const context = useContext(NotificationContext);
  
  if (context === null) {
    throw new Error('useNotificationContext must be used within a NotificationProvider');
  }
  
  return context;
}

export default NotificationContext;
