import React, { Component } from 'react';
import moment from 'moment';
import { 
  Text,
  View,
  Image
} from 'react-native';

import ToolbarAndroid from 'ToolbarAndroid';
import RefreshableListView from '../components/RefreshableListView';
import HTML from 'react-native-render-html'
import Styles from '../common/Styles';
import Variables from '../common/Variables';

class Detail extends Component {

  render(){
    return (
      <View style={Styles.container}>
        <ToolbarAndroid style={Styles.toolbar}
                        title="News"
                        navIcon={require('../assets/back.png')}
                        onIconClicked={() => this.props.navigation.goBack()}
                        titleColor={'#FFFFFF'}/>
        <RefreshableListView 
                        renderRow={(row) => this.renderRow(row)}
                        onRefresh={(page, callback)=>this.listViewOnRefresh(page, callback)}
                        backgroundColor={'#F6F6EF'}/>
      </View>
    )
  }

  renderRow(row){
    const html_styles = {
      p: { marginBottom: 0, marginTop: 14, fontSize: 14 },
      h1: { marginBottom: 0, marginTop: 14, fontSize: 14 },
      h2: { marginBottom: 0, marginTop: 14, fontSize: 14 },
      h3: { marginBottom: 0, marginTop: 14, fontSize: 14 },
      h4: { marginBottom: 0, marginTop: 14, fontSize: 14 },
      h5: { marginBottom: 0, marginTop: 14, fontSize: 14 },
      h6: { marginBottom: 0, marginTop: 14, fontSize: 14 },
      img: { marginTop: 14},
    }

    const renderers = {
      img: (htmlAttribs, children, passProps) => {
        return (
          <Image
            source={{uri: htmlAttribs.src, width: Variables.width - 20, height: 400}}
            style={passProps.htmlStyles.img}
            {...passProps} />)
      }
    }

    return(
      <View style={Styles.newsContainer}>
        <Text style={Styles.newsTitle}>
          {row.title}
        </Text>
        <Text style={Styles.newsInfo}>
            Posted by {row.author.name} | {row.view_count} Views | {moment(row.created_date).fromNow(new Date())} ago
          </Text>
        <View style={Styles.separator}/>
        <View style={Styles.newsContent}>
          <HTML
            html={row.content}
            htmlStyles={html_styles}
            renderers={renderers}
          />
        </View>
      </View>
    );
  }

  listViewOnRefresh(page, callback){
    fetch(Variables.APIUrl + "news/" + this.props.navigation.state.params)
      .then((response) => response.json())
      .then((data) => callback([data]))
      .done();
  }
}

export default Detail;