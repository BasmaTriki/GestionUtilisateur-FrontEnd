import React from 'react';

import {
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import GiftedListView from 'react-native-gifted-listview';
import Styles from '../common/Styles';

module.exports = React.createClass({

  getInitialState: function(){
    return {
      renderRow: this.props.renderRow,
      backgroundColor: this.props.backgroundColor ? this.props.backgroundColor : '#FFFFFF',
      loadMoreText: this.props.loadMoreText ? this.props.loadMoreText : '',
      renderPagination: this.props.renderPagination ? this.props.renderPagination : this.renderPaginationWaitingView,
      renderHeader: this.props.renderHeader ? this.props.renderHeader : null,
    };
  },

  onRefresh: function(page=1, callback, options){
    this.props.onRefresh(page, callback);
  },

  renderRow: function(row){
    return this.state.renderRow(row);
  },

  render: function(){
    return(
      <View style={[Styles.container, {backgroundColor: this.state.backgroundColor}, this.props.style]}>
        <View style={Styles.navBarSpace} />
        <GiftedListView rowView={this.renderRow}
                        onFetch={this.onRefresh}
                        paginationAllLoadedView={this.renderPaginationAllLoadedView}
                        paginationWaitingView={this.state.renderPagination}
                        headerView={this.renderHeaderView}
                        PullToRefreshViewAndroidProps={{
                            colors: ['#F6F6EF'],
                            progressBackgroundColor: '#FF6600',
                        }}
                        enableEmptySections={true}
                        customStyles={{
                                        refreshableView: {
                                            backgroundColor: this.state.backgroundColor,
                                            justifyContent: 'flex-end',
                                            paddingBottom: 12,
                                        },
                                        paginationView: {
                                            backgroundColor: this.state.backgroundColor,
                                            height: 60
                                        }
                        }}/>
      </View>
    );
  },

  renderPaginationAllLoadedView: function(){
    return(
      <View />
    );
  },

  renderPaginationWaitingView: function(paginateCallback) {
    if(this.state.loadMoreText != ''){
      return (
        <TouchableOpacity style={Styles.paginationView}
                          onPress={paginateCallback}>
          <Text style={Styles.loadMoreText}>
              {this.state.loadMoreText}
          </Text>
       </TouchableOpacity>
      );
    }
    else{
      return (
        <View></View>
      )
    }
  },

  renderHeaderView: function(){
    if(this.state.renderHeader){
      return this.props.renderHeader();
    }
    return (null);
  }
});
