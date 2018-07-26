import React, { Component } from 'react';
import { 
  Text, 
  View, 
  ToolbarAndroid, 
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';

import TabBar from '../components/TabBar';
import Styles from '../common/Styles';
import Variables from '../common/Variables';
import RefreshableListView from '../components/RefreshableListView';

class List extends Component {

  constructor(props) {
    super(props);
    this.state = {have_more: true};
  }

  renderRow(row){
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

  renderAuthorRow(row){
    const { navigate } = this.props.navigation;

    return(
      <TouchableHighlight underlayColor={'#f3f3f2'}
                          onPress={() => navigate('Author', row._id)}>
        <View style={Styles.rowContainer}>
            <Text style={Styles.rowCount}>
            </Text>
            <View style={Styles.rowDetailsContainer}>
                <Text style={Styles.rowTitle}>
                    {row.name}
                </Text>
                <Text style={Styles.rowDetailsLine}>
                    Posted {row.view_count} posts | {row.view_count} Views 
                    | Joined {moment(row.created_date).fromNow(new Date())} ago
                </Text>
                <View style={Styles.separator}/>
            </View>
        </View>
      </TouchableHighlight>
    );
  }

  renderCategoryRow(row){
    const { navigate } = this.props.navigation;

    return(
      <TouchableHighlight underlayColor={'#f3f3f2'}
                          onPress={() => navigate('Category', row._id)}>
        <View style={Styles.rowContainer}>
            <Text style={Styles.rowCount}>
            </Text>
            <View style={Styles.rowDetailsContainer}>
                <Text style={Styles.rowTitle}>
                    {row.name}
                </Text>
                <Text style={Styles.rowDetailsLine}>
                    Have {row.news_count} posts | {row.view_count} Views 
                    | Created {moment(row.created_date).fromNow(new Date())} ago
                </Text>
                <View style={Styles.separator}/>
            </View>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <TabBar structure={
        [
          {
            title: 'Author',
            iconName: 'author',
            renderContent: () => {
              return(
                <View style={{flex:1}}>
                  <ToolbarAndroid style={Styles.toolbar}
                                  title={'Authors'}
                                  titleColor={'#FFFFFF'}/>
                  <RefreshableListView  renderRow={(row)=>this.renderAuthorRow(row)}
                                        onRefresh={(page, callback)=>this.onRefreshAuthor(page, callback)}
                                        backgroundColor={'#F6F6EF'}/>
                </View>
              );
            }
          },
          {
            title: 'Hot',
            iconName: 'hot',
            renderContent: () => {
              return(
                <View style={{flex:1}}>
                  <ToolbarAndroid style={Styles.toolbar}
                                title={'Hot News'}
                                titleColor={'#FFFFFF'}/>
                  <RefreshableListView  renderRow={(row)=>this.renderRow(row)}
                                        onRefresh={(page, callback)=>this.onRefreshTop(page, callback)}
                                        renderPagination={(paginateCallback)=>this.renderPagination(paginateCallback)}
                                        backgroundColor={'#F6F6EF'}/>
                </View>
              );
            }
          },
          {
            title: 'Home',
            iconName: 'home',
            renderContent: () => {
              return(
                <View style={{flex:1}}>
                  <ToolbarAndroid style={Styles.toolbar}
                                  title={'Home'}
                                  titleColor={'#FFFFFF'}/>
                  <RefreshableListView  renderRow={(row)=>this.renderRow(row)}
                                        renderPagination={(paginateCallback)=>this.renderPagination(paginateCallback)}
                                        onRefresh={(page, callback, options)=>this.onRefreshHome(page, callback)}
                                        backgroundColor={'#F6F6EF'}
                                        />
                </View>
              );
            }
          },
          {
            title: 'New',
            iconName: 'new',
            renderContent: () => {
              return(
                <View style={{flex:1}}>
                  <ToolbarAndroid style={Styles.toolbar}
                                title={'Today News'}
                                titleColor={'#FFFFFF'}/>
                  <RefreshableListView  renderRow={(row)=>this.renderRow(row)}
                                        onRefresh={(page, callback)=>this.onRefreshNew(page, callback)}
                                        renderPagination={(paginateCallback)=>this.renderPagination(paginateCallback)}
                                        backgroundColor={'#F6F6EF'}/>
                </View>
              );
            }
          },
          {
            title: 'Category',
            iconName: 'category',
            renderContent: () => {
              return(
                <View style={{flex:1}}>
                  <ToolbarAndroid style={Styles.toolbar}
                                title={'Categories'}
                                titleColor={'#FFFFFF'}/>
                  <RefreshableListView  renderRow={(row)=>this.renderCategoryRow(row)}
                                        onRefresh={(page, callback)=>this.onRefreshCategory(page, callback)}
                                        backgroundColor={'#F6F6EF'}/>
                </View>
              );
            }
          }
        ]
      }
      selectedTab={2}
      activeTintColor={'#007dff'}
      iconSize={20}/>
    )
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

  onRefreshHome(page, callback){
    fetch(Variables.APIUrl + "list_all_news?page=" + page)
      .then((response) => response.json())
      .then((data) => {
        this.setState(previousState => {
          return { have_more: !data.last };
        });
        callback(data.data);
      })
      .done();
  }

  onRefreshNew(page, callback){
    fetch(Variables.APIUrl + "today_news?page=" + page)
      .then((response) => response.json())
      .then((data) => {
        this.setState(previousState => {
          return { have_more: !data.last };
        });
        callback(data.data);
      })
      .done();
  }

  onRefreshTop(page, callback){
    fetch(Variables.APIUrl + "top_news?page=" + page)
      .then((response) => response.json())
      .then((data) => {
        this.setState(previousState => {
          return { have_more: !data.last };
        });
        callback(data.data);
      })
      .done();
  }

  onRefreshAuthor(page, callback){
    fetch(Variables.APIUrl + "authors?page=" + page)
      .then((response) => response.json())
      .then((data) => callback(data))
      .done();
  }

  onRefreshCategory(page, callback){
    fetch(Variables.APIUrl + "categories?page=" + page)
      .then((response) => response.json())
      .then((data) => callback(data))
      .done();
  }
}

export default List;