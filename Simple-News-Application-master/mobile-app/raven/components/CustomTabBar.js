'use strict';

import React from 'react';

import {
  Text,
  View,
  TouchableOpacity,
  Animated,
  StatusBar,
  Image
} from 'react-native';

import { images } from '../common/Images';
import Styles from '../common/Styles';

var CustomTabBar = React.createClass({
  selectedTabIcons: [],
  unselectedTabIcons: [],

  propTypes: {
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.array
  },

  renderTabOption(valsString, page) {
    var vals = valsString.split('!$#');
    var isTabActive = this.props.activeTab === page;
    var rss;
    switch(vals[1]){
      case 'author': 
        rss = images.author.uri;
        break;
      case 'hot': 
        rss = images.hot.uri;
        break;
      case 'new': 
        rss = images.new.uri;
        break;
      case 'category': 
        rss = images.category.uri;
        break;
      case 'home': 
        rss = images.home.uri;
        break;
      default:
        break;
    }
    return (
      <TouchableOpacity key={valsString} onPress={() => this.props.goToPage(page)} style={Styles.tab}>
        <Image
          style={{width: parseInt(vals[2]), height: parseInt(vals[2])}}
          source={rss}
        />
        <Text style={Styles.labelText}>
          {vals[0]}
        </Text>
      </TouchableOpacity>
    );
  },

  componentDidMount() {
    this.setAnimationValue({value: this.props.activeTab});
    this._listener = this.props.scrollValue.addListener(this.setAnimationValue);
  },

  setAnimationValue({value}) {
    var currentPage = this.props.activeTab;

    this.unselectedTabIcons.forEach((icon, i) => {
      var iconRef = icon;

      if (!icon.setNativeProps && icon !== null) {
        iconRef = icon.refs.icon_image
      }

      if (value - i >= 0 && value - i <= 1) {
        iconRef.setNativeProps({opacity: value - i});
      }
      if (i - value >= 0 &&  i - value <= 1) {
        iconRef.setNativeProps({opacity: i - value});
      }
    });
  },

  render() {
    var containerWidth = this.props.containerWidth;
    var numberOfTabs = this.props.tabs.length;
    var tabUnderlineStyle = {
      position: 'absolute',
      width: containerWidth / numberOfTabs,
      height: 3,
      backgroundColor: '#007dff',
      bottom: 0,
    };

    var left = {
      transform: [
        {
          translateX: this.props.scrollValue.interpolate({
            inputRange: [0, 1,], 
            outputRange: [0, containerWidth / numberOfTabs,],
          })
        }
      ]
    }

    return (
      <View>
        <StatusBar backgroundColor={'gray'} />
        <View style={Styles.tabBarSeparator}/>
        <View style={Styles.tabs}>
          {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
        </View>
        <Animated.View style={[tabUnderlineStyle, left]} />
      </View>
    );
  },
});

module.exports = CustomTabBar;