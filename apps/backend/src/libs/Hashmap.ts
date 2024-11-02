export class HashMap<T>{
    private map = new Map<string,T>();
    set(key:string,val:T,ttl:number){
        this.map.set(key,val)
        setTimeout(()=>{
            this.map.delete(key)
        },ttl*1000)
    }
    get(key:string){
        return this.map.get(key)
    }
    has(key:string){
        return this.map.has(key)
    }

}