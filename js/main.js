const app = Vue.createApp({
    data() {
        return {
            user:{
                title:'Hola',
                count:0
                
            }
        }
    },

    methods: {
        
        monitor(accion, limit = 1){

            if(accion == 'restar'){

                this.user.count -= limit ;
            }else{

                this.user.count += limit ;

            }
            
           
        }

    },
});


