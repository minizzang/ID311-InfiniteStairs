class Subject {
  constructor(){
    this.observers = [];
  }

  subscribe(observer) {
    if (observer != null) this.observers.push(observer);
  }

  notifySubscribers(source, ...others) {
    for (let obs of this.observers){
      if (obs != null) obs.update(source, ...others);
    }
  }
}

export { Subject };