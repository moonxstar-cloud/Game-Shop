
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import React from 'react';

export const withAuth = (WrappedComponent) => {
  // Name the component for better debugging
  const WithAuthComponent = (props) => {
    const { isAuthenticated , user} = useSelector(state => state.auth);
    const navigate = useNavigate();

    const handleAuthRequired = React.useCallback((callback) => {
      if (!isAuthenticated) {
        // Save the current path for redirect after login
        const currentPath = encodeURIComponent(window.location.pathname);
        navigate(`/login?redirect=${currentPath}`);
        return;
      }
      // If authenticated, proceed with the callback
      callback();
      
    }, [isAuthenticated, navigate]);
    console.log('WrappedComponent props:', props);
    const userId = user?.id;
    return < WrappedComponent {...props} onAuthRequired={handleAuthRequired} userId={userId} />;
    
  };

  // Set display name for better debugging
  WithAuthComponent.displayName = `WithAuth(${getDisplayName(WrappedComponent)})`;
  
  return WithAuthComponent;
};

// Helper function to get the display name of a component
function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}