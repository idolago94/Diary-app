import { observable, action, computed } from "mobx";
import { persist } from "mobx-persist";
import AddMeetingScreen from "../Screens/AddMeetingScreen/AddMeetingScreen";


class AppStore {
    @persist('list') @observable tasks = [];
    @persist('list') @observable meetings = [];
    @observable userLogin = false;

    @computed
    get getUserLogin() {
        return this.userLogin;
    }

    @computed
    get getNonDoneTasks() {
        return this.tasks.filter(t => !t.done);
    }

    @computed
    get getFutureMeetings() {
        return this.meetings.filter(m => new Date(m.date) > new Date()).sort((a,b) => new Date(a.date) - new Date(b.date));
    }

    @computed
    get getAllTasks() {
        return this.tasks.slice();
    }

    @action 
    addTask(data) {
        let newTask = Object.assign(data, { created_at: new Date(), done: false });
        this.tasks.push(newTask);
    }

    @action
    addMeeting(data) {
        let newMeeting = Object.assign(data, { created_at: new Date() });
        this.meetings.push(newMeeting);
    }

    @action 
    deleteTask(item) {
        console.log('delete task', index);
        let index = this.tasks.findIndex(t => t === item);
        this.tasks.splice(index, 1);
    }

    @action
    doneTask(item) {
        console.log('done task', item);
        let index = this.tasks.findIndex(t => t === item);
        this.tasks[index] = Object.assign(this.tasks[index], { done: true });
    }

    @action 
    deleteMeeting(meeting) {
        console.log('delete meeting', meeting);
        let index = this.meetings.findIndex(m => m === meeting);
        this.meetings.splice(index, 1);
    }
}

export default new AppStore();