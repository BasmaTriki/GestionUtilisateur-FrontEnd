import React, { Component } from 'react';
import { 
  Navigator, Platform, AppRegistry
} from 'react-native';

import List from './screens/List';
import Detail from './screens/Detail';
import Author from './screens/Author';
import Category from './screens/Category';
import { StackNavigator } from 'react-navigation';

const RavenIOS = StackNavigator(
  {
    List: {
      name: 'List news',
      description: 'List of news',
      screen: List,
    },
    Detail: {
      name: 'News detail',
      description: 'News detail',
      path: 'detail/:id',
      screen: Detail,
    },
    Author: {
      name: 'News by Author',
      description: 'News by Author',
      path: 'author/:id',
      screen: Author,
    },
    Category: {
      name: 'News by Category',
      description: 'News by Category',
      path: 'category/:id',
      screen: Category,
    },
  },
  {
    initialRouteName: 'List',
    headerMode: 'none',
    mode: Platform.OS === 'ios' ? 'modal' : 'card',
  }
);

export default RavenIOS;