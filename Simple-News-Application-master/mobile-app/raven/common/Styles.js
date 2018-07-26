import { Dimensions, StyleSheet, Platform } from 'react-native';

import Variables from '../common/Variables';

export default Styles = StyleSheet.create({
  container: {
    flex: 1
  },
  toolbar: {
    height: 56,
    backgroundColor: '#007dff'
  },
  rowContainer:{
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
  },
  rowCount: {
      fontSize: 20,
      textAlign: 'right',
      color: 'gray',
      margin: 5,
      marginLeft: 5,
  },
  rowDetailsContainer: {
      flex: 1,
  },
  rowTitle: {
      fontSize: 15,
      textAlign: 'left',
      marginTop: 10,
      marginBottom: 4,
      marginRight: 10,
      color: '#007dff'
  },
  rowDetailsLine: {
      fontSize: 12,
      marginBottom: 10,
      color: 'gray',
  },
  separator: {
      height: 1,
      backgroundColor: '#CCCCCC'
  },
  newsContainer: {
    flex:1,
    backgroundColor: '#F6F6EF',
    flexDirection: 'column',
    paddingRight: 10,
    paddingLeft: 10,
  },
  newsTitle:{
    fontSize: 20,
    textAlign: 'left',
    marginTop: 10,
    color: '#007dff',
  },
  newsContent: {
    marginBottom: 10
  },
  newsInfo: {
    fontSize: 12,
    marginBottom: 10,
    color: 'gray',
  },
  paginationView: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20
  },
  loadMoreText: {
    fontSize: 15,
    color: 'gray',
  },
  loadMoreContainer: {
    paddingRight: 15,
    paddingLeft: 10,
    flexDirection: 'row'
  },
  navBarSpace: {
    height: (Platform.OS !== 'android') ? 64 : 0,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 6,
  },
  tabs: {
    height: 45,
    flexDirection: 'row',
    paddingTop: 5,
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  icon: {
    width: 30,
    height: 30,
    position: 'absolute',
    top: 0,
    left: 20,
  },
  labelText:{
    fontSize: 8,
  },
  tabBarSeparator: {
    height: 0.5,
    backgroundColor: 'gray'
  }
});