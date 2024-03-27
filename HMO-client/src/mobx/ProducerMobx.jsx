import { observable, action, makeObservable } from 'mobx';
import axios from 'axios';
import { runInAction } from 'mobx';


class ProducerMobx {
    producers = [{
        id: 0,
        name:""
    }];

    constructor() {
        makeObservable(this, {
            producers: observable,
            fetchProducers: action,
        });
    }
    async getProducers() {
        try {
            const response = await axios.get("https://localhost:7014/api/Producer");
            this.fetchProducers(response.data); 
        } catch (error) {
            console.error("Error fetching producers:", error);
        }
        return this.producers;
    }

   
    fetchProducers(p) {        
        this.producers = p;
    }

   

   
}

export default new ProducerMobx();
