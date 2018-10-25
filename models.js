const uuid = require("uuid");

function StorageException(message) {
    this.message = message;
    this.name = "StorageException";
 }


const localCityName = {
    create: function(localname, teamName){
        console.log("Creating new city name");
        const item = {
            localCityName: localCityName,
            id: uuid.v4(),
            teamName: teamName
        };
        this.items[item.id] = item;
        return item;
    },
    get:function(){
        console.log("Retrieving local team name");
        return Object.keys(this.items).map(key => this.items[key]);
    },
    delete: function(id){
        console.log(`Deleting local team name ${id}`);
        delete this.items[id];
    },
    update: function(updatedItem){
        console.log(`Updating local team name ${updatedItem.id}`);
        const {id} = updatedItem;
        if(!(id in this.items)){
            throw StorageException(`Can't update item $id} because doesn't exist`);
        }
        this.items[updatedItem.id] = updatedItem;
        return updatedItem;
    }
};

function createLocalCityName() {
    const storage = Object.create(localCityName);
    storage.items = {};
    return storage;
  }
  
  const localTeamName = {
    create: function(localName, teamName) {
      console.log('Creating a new local name');
      const item = {
        localName: localName,
        id: uuid.v4(),
        teamName: teamName
      };
      this.items[item.id] = item;
      return item;
    },
    get: function() {
      console.log('Retreiving team name');
      return Object.keys(this.items).map(key => this.items[key]);
    },
    delete: function(itemId) {
      console.log(`Deleting team name with id \`${itemId}\``);
      delete this.items[itemId];
    },
    update: function(updatedItem) {
      console.log(`Updating team name with id \`${updatedItem.id}\``);
      const {id} = updatedItem;
      if (!(id in this.items)) {
        throw StorageException(
          `Can't update item \`${id}\` because doesn't exist.`)
      }
      this.items[updatedItem.id] = updatedItem;
      return updatedItem;
    }
  };

  function createLocalTeamName(){
      const storage = Object.create(localTeamName);
      storage.items = {};
      return storage;
  }

  module.exports = {
    localCityName: createLocalCityName(),
    localTeamName: createLocalTeamName()
  }