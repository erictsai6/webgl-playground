
class Storage {
  private hasLocalStorageAccess: boolean;
  private dataMap: any;

  constructor() {
    try {
      localStorage.setItem('validateAccess', '1');
      localStorage.removeItem('validateAccess');
      this.hasLocalStorageAccess = true;
    } catch (err) {
      console.error('No local storage access');
      this.hasLocalStorageAccess = false;
      this.dataMap = {};
    }
  }

  get(key: string): any {
    if (this.hasLocalStorageAccess) {
      return JSON.parse(localStorage.getItem(key));
    } 
      return this.dataMap[key];
    
  }

  set(key: string, value: any) {
    if (this.hasLocalStorageAccess) {
      JSON.stringify(localStorage.setItem(key, JSON.stringify(value)));
    } else {
      this.dataMap[key] = value;
    }
  }

  remove(key: string) {
    if (this.hasLocalStorageAccess) {
      localStorage.removeItem(key);
    } else {
      delete this.dataMap[key];
    }
  }
}

export const storage = new Storage();
