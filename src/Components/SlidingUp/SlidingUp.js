import React from 'react';
import {View, FlatList, TouchableOpacity} from 'react-native';
import SlidingUpPanel from 'rn-sliding-up-panel';
import Meeting from '../Meeting/Meeting';
import { Divider } from 'react-native-elements';
import { inject, observer } from "mobx-react";
import { window_height, window_width } from '../../utils/Style';
import { Icon } from 'react-native-elements'

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  }
}

@inject('NavigationStore', 'AppStore')
@observer
export default class SlidingUp extends React.Component {
  render() {
    const meetings = this.props.AppStore.getFutureMeetings;
    return (
      <View>
        <Meeting style={{borderTopColor: 'gray', borderTopWidth: 1}} onPress={() => this._panel.show()} data={meetings[0]} />
        <SlidingUpPanel 
          ref={c => this._panel = c}
          draggableRange={{top: window_height*.5, bottom: 0}} 
          allowDragging={false}
        >
          <View style={styles.container}>
            <TouchableOpacity style={{width: window_width}} onPress={() => this._panel.hide()}>
              <Icon name='chevron-down' type='font-awesome' size={15} />
            </TouchableOpacity>
            <FlatList 
                keyExtractor={(item, index) => index.toString()}
                data={meetings}
                renderItem={({item, index}) => (<View>
                  <Meeting onDelete={() => this.props.AppStore.deleteMeeting(index)} data={item} />
                  <Divider />
                </View>)}			
            />
          </View>
        </SlidingUpPanel>
      </View>
    )
  }
}