import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Routes from '../utils/Routes';
import MainScreen from '../Screens/MainScreen/MainScreen';
import AddTaskScreen from '../Screens/AddTaskScreen/AddTaskScreen';
import AddMeetingScreen from '../Screens/AddMeetingScreen/AddMeetingScreen';
import CustomButton from '../Components/CustomButton/CustomButton';
import ArchiveScreen from '../Screens/ArchiveScreen/ArchiveScreen';
import { modal_types } from '../Components/CustomModal/CustomModal';
import { inject, observer } from "mobx-react";

const Stack = createStackNavigator();

@inject('NavigationStore')
export default class StackNavigator extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <NavigationContainer ref={ref => this.props.stackRef(ref)}>
        <Stack.Navigator headerMode='screen' initialRouteName={Routes.Screens.MAIN.routeName}>
          <Stack.Screen 
            options={({ navigation }) => ({
              title: '',
              headerRight: () => (<CustomButton onPress={() => this.props.NavigationStore.setModal(modal_types.SELECT_ADD)} style={{padding: 5}} icon={'plus-square'} size={30} />),
              headerLeft: () => (<CustomButton onPress={() => navigation.navigate(Routes.Screens.ARCHIVE_SCREEN.routeName)} style={{padding: 5}} icon={'history'} size={30} />)
            })} 
            name={Routes.Screens.MAIN.routeName} 
            component={MainScreen} 
          />
          <Stack.Screen name={Routes.Screens.ADD_TASK.routeName} component={AddTaskScreen} />
          <Stack.Screen name={Routes.Screens.ADD_MEETING.routeName} component={AddMeetingScreen} />
          <Stack.Screen name={Routes.Screens.ARCHIVE_SCREEN.routeName} component={ArchiveScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}