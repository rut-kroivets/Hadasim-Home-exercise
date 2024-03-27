import { observable, action, makeObservable } from 'mobx';
import axios from 'axios';
import { runInAction } from 'mobx';


class VaccinationDetails {
    vaccinations = [{
        id: 6,
        producer:"",
        date:"",
    }];

    constructor() {
        makeObservable(this, {
            vaccinations: observable,
            fetchVaccination: action,
            addVaccination: action,
            updateVaccination: action,
            deleteVaccination: action,
        });
    }
    async getVaccination() {
        try {
            const response = await axios.get("https://localhost:7014/api/Vaccination");
            this.fetchVaccination(response.data); 
        } catch (error) {
            console.error("Error fetching vaccinations:", error);
        }
        return this.vaccinations;
    }

   
    fetchVaccination(vaccinations) {        
        this.vaccinations = vaccinations;
    }

    async addVaccination(s) {
        try {
            const response = await axios.post("https://localhost:7014/api/Vaccination", s);
            runInAction(() => {
                this.vaccinations.push(response.data);
            });
        } catch (error) {
            console.error('Error adding vaccination:', error);
        }
    }

    async updateVaccination(updatedItem) {
        try {
            const response = await axios.put(`https://localhost:7014/api/Vaccination/${updatedItem.id}`, updatedItem);
            runInAction(() => {
                const index = this.vaccinations.findIndex(item => item.id === updatedItem.id);
                if (index !== -1) {
                    this.vaccinations[index] = response.data;
                }
            });
        } catch (error) {
            console.error('Error updating vaccination:', error);
        }
    }

    async deleteVaccination(itemId) {
        try {
            await axios.delete(`https://localhost:7014/api/Vaccination/${itemId}`);
            runInAction(() => {
                this.vaccinations = this.vaccinations.filter(item => item.id !== itemId);
            });
        } catch (error) {
            console.error('Error deleting vaccination:', error);
        }
    }
}

export default new VaccinationDetails();
