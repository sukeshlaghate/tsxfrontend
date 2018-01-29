import { observable, action, autorun } from 'mobx';
interface IstateNotification{
    event:string;
    data:any;
}

class StateNotifier {

    @observable private datamap:any;
    private _subscriptions: Map<string, Array<Function>> = new Map<string, Array<Function>>();

    constructor() {
        this.datamap = [];
        autorun((data) => { console.log("autorun");
        this._onEvent(data) });
    }

    public notifyDataChange (event: string, value: any)  {
        let current = this.datamap[event]
        console.log("In Notifychange " + event + " : current value :" + current + " Passed value : " + value);
        // we want to fire notfications only when there is change in data
        if (current !== value) {
             console.log("In Notifychange setting " + event + " Passed value : " + value);
             const _data : IstateNotification = {event: event, data:value};
            this._notifychange(_data);
        }
    }

    @action set _notifychange(_data:any) {

        this.datamap[_data.event] = _data.data;  
    }

    /**
     * subscribe
     */
    public subscribe(event: string, callback: Function) {
        console.log("In subscribe " + event );
        let subscribers = this._subscriptions.get(event) || [];
        subscribers.push(callback);

        this._subscriptions.set(event, subscribers);
    }

    private _onEvent(data: any) {
        console.log(data.event + " : " + data.data);
        let subscribers = this._subscriptions.get(data['event']) || [];

        subscribers.forEach((callback) => {
            callback.call(null, data['data']);
        });
    }
}

const stateNotifier =  new StateNotifier();
export default stateNotifier;