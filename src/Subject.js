class Subject {
  constructor(){
    this.observers = [];
  }

  subscribe(observer) {
    if (observer != null) this.observers.push(observer);
  }

  unsubscribe(observer) {
    if (observer == null) return;
    this.observers = this.observers.filter((e)=>e != observer);
  }

  unsubscribeAll() {
    this.observers = [];
  }

  notifySubscribers(source, ...others) {
    for (let obs of this.observers){
      if (obs != null) obs.update(source, ...others);
    }
  }
}

export { Subject };