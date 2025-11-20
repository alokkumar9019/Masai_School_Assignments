
interface Observer {
  update(): void;
}

class Smartphone implements Observer {
  update(): void {
    console.log("Smartphone received notification");
  }
}

class Tablet implements Observer {
  update(): void {
    console.log("Tablet received notification");
  }
}

class NotificationCenter {
  private observers: Observer[] = [];

  attach(observer: Observer): void {
    this.observers.push(observer);
console.log(`Observer added: ${(observer.constructor as any).name}`);

  }

  detach(observer: Observer): void {
    this.observers = this.observers.filter(o => o !== observer);
  }

  notify(): void {
    this.observers.forEach(observer => observer.update());
  }
}

const notificationCenter = new NotificationCenter();

const phone = new Smartphone();
const tab = new Tablet();

notificationCenter.attach(phone);   
notificationCenter.attach(tab);    

notificationCenter.notify();