import React, { Component } from 'react';
import { 
  Text, 
  View, 
  ToolbarAndroid, 
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import moment from 'moment';

import Styles from '../common/Styles';
import Variables from '../common/Variables';
import RefreshableListView from '../components/RefreshableListView';

class Author extends Component {

  constructor(props) {
    super(props);
    this.state = {have_more: true};
  }

  renderRow(row, pushNavBarTitle){
    const { navigate } = this.props.navigation;

    return(
      <TouchableHighlight underlayColor={'#f3f3f2'}
                          onPress={() => navigate('Detail', row._id)}>
        <View style={Styles.rowContainer}>
            <Text style={Styles.rowCount}>
            </Text>
            <View style={Styles.rowDetailsContainer}>
                <Text style={Styles.rowTitle}>
                    {row.title}
                </Text>
                <Text style={Styles.rowDetailsLine}>
                    Posted by {row.author.name} | {row.view_count} Views 
                    | {moment(row.created_date).fromNow(new Date())} ago
                </Text>
                <View style={Styles.separator}/>
            </View>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return(
      <View style={{flex:1}}>
        <ToolbarAndroid style={Styles.toolbar}
                        title="News"
                        navIcon={require('../assets/back.png')}
                        onIconClicked={() => this.props.navigation.goBack()}
                        titleColor={'#FFFFFF'}/>
        <RefreshableListView  renderRow={(row)=>this.renderRow(row, 'Home')}
                              onRefresh={(page, callback)=>this.onRefresh(page, callback)}
                              backgroundColor={'#F6F6EF'}
                              renderPagination={(paginateCallback)=>this.renderPagination(paginateCallback)}/>
      </View>
    );
  }

  renderPagination(paginateCallback) {
    if(this.state.have_more == true){
      return (
        <TouchableOpacity style={Styles.paginationView}
                          onPress={paginateCallback}>
          <Text style={Styles.loadMoreText}>
              Load More...
          </Text>
       </TouchableOpacity>
      );
    }
    else{
      return (
        <View></View>
      )
    }
  }

  onRefresh(page, callback){
    fetch(Variables.APIUrl + "author/" + this.props.navigation.state.params + "?page=" + page)
      .then((response) => response.json())
      .then((data) => {
        this.setState(previousState => {
          return { have_more: !data.last };
        });
        callback(data.data);
      })
      .done();
  }
}

export default Author;