import { observable, action, computed } from "mobx";
import {Alert} from 'react-native';

class NavigationStore {
    @observable _navigator = null;
    @observable prevPage = null;
    @observable currentScreen = null;
    @observable modal = null;

    //GET

    @computed
    get getCurrentScreen() {
        return this.currentScreen;
    }

    @computed
    get isModal() {
        return this.modal;
    }

    //SET

    @action
    showAlert(title, msg, confirmCallback, cancelCallback) {
        Alert.alert(title, msg,
            [{
                text: 'Cancel',
                onPress: (cancelCallback) ? (() => cancelCallback()):(() => console.log('Cancel Pressed')),
            },
            {
                text: 'OK', 
                onPress: () => confirmCallback()
            }],
            {cancelable: false},
        );
    }

    @action
    setMainNavigation(data) {
        console.log('NavigationStore -> setMainNavigation');
        this._navigator = { ...data }
    }

    @action
    updateCurrentScreen = (data) => {
        this.prevPage = this.currentScreen
        this.currentScreen = data.routeName;
    }

    @action
    updatePrevPage(data) {
        this.prevPage = data
    }

    @action 
    setModal(modal_type) {
        this.modal = modal_type;
    }

    updatePages = (prev, cur) => {
        this.updatePrevPage(prev);
        this.updateCurrentScreen(cur)
    };

    //ACTIONS

    navigate = (data, _params) => {
        let { routeName, params } = data;
        this._navigator.navigate(routeName ? routeName:data, params ? params:_params);
    };

    @action
    goBack = () => {
        // const navigateAction = NavigationActions.back();
        // this._navigator.dispatch(navigateAction)
        this._navigator.goBack();
    };
}

export default new NavigationStore();