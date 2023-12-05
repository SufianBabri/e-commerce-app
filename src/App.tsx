import {SafeAreaView, StatusBar, Text} from 'react-native';
import {Provider} from 'react-redux';
import {store} from './store/configure-store';
import HomeTab from './HomeTab';

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <StatusBar />
        <HomeTab />
      </SafeAreaView>
    </Provider>
  );
}
