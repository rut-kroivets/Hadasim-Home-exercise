import { observable, action, makeObservable } from 'mobx';
import axios from 'axios';
import { runInAction } from 'mobx';

class MemberMobx {
    members = [{
        id: 6,
        identity: "23456",
        name: "ruti",
        city: "zz",
        street: "hadasim",
        houseNumber: 3,
        dateOfBirth: "2024-03-19 14:38:45.4400000",
        phone: "12345",
        mobilePhone: "12345",
        vaccinations: [],
        startOfIll: "2024-03-19 14:38:45.4400000",
        endOfIll: "2024-03-19 14:38:45.4400000"
    }];

    constructor() {
        makeObservable(this, {
            members: observable,
            fetchMembers: action,
            addMember: action,
            updateMember: action,
            deleteMember: action,
        });
    }

    async getMember() {
        try {
            const response = await axios.get("https://localhost:7014/api/Members");
            this.fetchMembers(response.data); 
        } catch (error) {
            console.error("Error fetching members:", error);
        }
        return this.members;
    }

    fetchMembers(members) {        
        this.members = members;
    }

    async addMember(s) {
        try {
            const response = await axios.post("https://localhost:7014/api/Members", s);
            runInAction(() => {
                this.members.push(response.data);
            });
        } catch (error) {
            console.error('Error adding member:', error);
        }
    }

    async updateMember(updatedItem,id) {
        try {
            const response = await axios.put(`https://localhost:7014/api/Members/${id}`, updatedItem);
            runInAction(() => {
                const index = this.members.findIndex(item => item.id === updatedItem.id);
                if (index !== -1) {
                    this.members[index] = response.data;
                }
            });
        } catch (error) {
            console.error('Error updating member:', error);
        }
    }

    async deleteMember(itemId) {
        try {
            await axios.delete(`https://localhost:7014/api/Members/${itemId}`);
            runInAction(() => {
                this.members = this.members.filter(item => item.id !== itemId);
            });
        } catch (error) {
            console.error('Error deleting member:', error);
        }
    }
}

export default new MemberMobx();
