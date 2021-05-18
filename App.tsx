import React from 'react';
import {StyleSheet, View} from 'react-native';
import {COLOR_BCKG} from './src/consts';
import {FilterButton} from './src/FilterButton';

const App = () => {
  return (
    <View style={styles.view}>
      <FilterButton />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: COLOR_BCKG,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
