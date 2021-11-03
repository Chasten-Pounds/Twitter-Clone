class Firebase {
    constructor (url) {
        this.url = url;
    }

    addUser = user => {
        return new Promise(resolve => {
            $.ajax({
                'url': `${this.url}/users.json`,
                'type': 'POST',
                'contentType': 'application/json',
                'data': JSON.stringify(user),
                'success': function() {

                    resolve();
                  
                },

                'error': function (error){
                    console.error(error);
                }

            });
        });

    };

    getUsers = () => {

        return new Promise(resolve => {
            $.ajax({
                'url': `${this.url}/users.json`,
                'type': 'GET',
                'contentType': 'application/json',
                'success': function(data) {
                    //do something with our data

                    let users = [];

                    for (const id in data) {
                        const firstName = data[id].firstName;
                        const lastName = data[id].lastName;
                        const userName = "@" + data[id].userName;
                      
                        
                      

                        const user = new User (id, firstName, lastName, userName);
                        users.push(user);
                    }



                    resolve(users);
                },

                'error': function (error){
                    console.error(error);
                }
    
            });
        });
        

    };


    addTattle = tattle => {
        return new Promise(resolve => {
            $.ajax({
                'url': `${this.url}/tattles.json`,
                'type': 'POST',
                'contentType': 'application/json',
                'data': JSON.stringify(tattle),
                'success': function() {

                    resolve();
                  
                },

                'error': function (error){
                    console.error(error);
                }

            });
        });

    }

    getTattles = () => {

        return new Promise(resolve => {
            $.ajax({
                'url': `${this.url}/tattles.json`,
                'type': 'GET',
                'contentType': 'application/json',
                'success': function(data) {
                    //do something with our data

                    let tattles = [];

                    for (const id in data) {

                        const userName = data[id].userName;
                        const message = data[id].message;
                        const timeStamp = data[id].timeStamp;
                        const image = data[id].image;
                       


                        
                        const tattleTale = new Tattle (id, userName, message, timeStamp, image);
                        tattles.push(tattleTale);


                    }



                    resolve(tattles);
                },

                'error': function (error){
                    console.error(error);
                }
    
            });
        });
        


    };


    

    getUser = () => {
        return new Promise(resolve => {
            $.ajax({
                'url': `${this.url}/users/${userID}.json`,
                'type': 'GET',
                'contentType': 'application/json',
                'success': function(data) {
                    //do something with our data



                    resolve(data);
                },

                'error': function (error){
                    console.error(error);
                }
    
            });
        });
        

    };

    getTattle = tattleId => {
        return new Promise(resolve => {
            $.ajax({
                'url': `${this.url}/tattles/${tattleId}.json`,
                'type': 'GET',
                'contentType': 'application/json',
                'success': function(data) {
                    //do something with our data



                    resolve(data);
                },

                'error': function (error){
                    console.error(error);
                }
    
            });
        });
        

    };

    updateUser = () => {

    };

    updateTattle = (tattle, tattleId) => {

        return new Promise(resolve => {
            $.ajax({
                'url': `${this.url}/tattles/${tattleId}.json`,
                'type': 'PUT',
                'contentType': 'application/json',
                'data': JSON.stringify(tattle),
                'success': function() {
                    //no data coming back

                    resolve();
                    console.log(`${this.url}/tattles/${tattleId}.json`);
                },

                'error': function (error){
                    console.error(error);
                }
    
            });
        });

    }


    deleteUser = () => {

    };

    deleteTattle = tattleId => {

        return new Promise(resolve => {
            $.ajax({
                'url': `${this.url}/tattles/${tattleId}.json`,
                'type': 'DELETE',
                'contentType': 'application/json',
                'success': function() {
                    //no data coming back

                    resolve();
                },

                'error': function (error){
                    console.error(error);
                }
    
            });
        });
    };

}