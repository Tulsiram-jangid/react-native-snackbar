import React, {
    createContext,
    useContext,
    useState,
    useRef,
    ReactNode,
  } from 'react';
  import { Animated } from 'react-native';
  
  // Define the type for the context value
  interface SnackbarContextType {
    showSnackbar: (message: string, duration?: number) => void;
  }
  
  // Create the context with undefined default
  const SnackbarContext = createContext<SnackbarContextType | undefined>(
    undefined
  );
  
  // Custom hook with type guard
  export const useSnackbar = (): SnackbarContextType => {
    const context = useContext(SnackbarContext);
    if (!context) {
      throw new Error('useSnackbar must be used within a SnackbarProvider');
    }
    return context;
  };
  
  // Props for the provider
  interface SnackbarProviderProps {
    children: ReactNode;
  }
  
  export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({
    children,
  }) => {
    const [message, setMessage] = useState<string>('');
    const [visible, setVisible] = useState<boolean>(false);
    const animation = useRef(new Animated.Value(0)).current;
  
    const showSnackbar = (msg: string, duration = 3000) => {
      setMessage(msg);
      setVisible(true);
  
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(hideSnackbar, duration);
      });
    };
  
    const hideSnackbar = () => {
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setVisible(false);
        setMessage('');
      });
    };
  
    const translateY = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [100, 0],
    });
  
    return (
      <SnackbarContext.Provider value={{ showSnackbar }}>
        {children}
        {visible && (
          <Animated.View
            style={{
              position: 'absolute',
              bottom: 20,
              left: 20,
              right: 20,
              backgroundColor: '#333',
              padding: 16,
              borderRadius: 8,
              transform: [{ translateY }],
              opacity: animation,
            }}
          >
            <Animated.Text style={{ color: '#fff' }}>{message}</Animated.Text>
          </Animated.View>
        )}
      </SnackbarContext.Provider>
    );
  };
  