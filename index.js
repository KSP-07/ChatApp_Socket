// DEBUG=* & npm run start
const app=require('express')();
const server=require('http').Server(app);
const io=require('socket.io')(server);
const port=3000;

server.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/public/index.html')
});
app.get('/javascript',(req,res)=>{
    res.sendFile(__dirname + '/public/javascript.html')
});
app.get('/swift',(req,res)=>{
    res.sendFile(__dirname + '/public/swift.html')
});
app.get('/css',(req,res)=>{
    res.sendFile(__dirname + '/public/css.html')
});

// io.on('connection',(socket)=>{     //when someone will connect
//     console.log('user connected');  //we will alert in the console whats happening
//     socket.emit('message',{manny:'hey how are you'});       //we are going to emit a msg on that particular event 
//     socket.on('another event',(data)=>{          //wait for another event so there is going to be another event being emitted by the client which wiil do in a sec in index.html 
//         console.log(data);        //whatever data was passed in the second event we are doing console log
//     })
// })



// io.on('connection',(socket)=>{
    //     console.log('user connected');
    //     socket.on('message',(msg)=>{ 
        //         console.log(`message: ${msg}`);
        //         io.emit(`message`,msg);
        //     });
        
        //     socket.on('disconnected',()=>{
            //         console.log('user disconnected');
            
            //         io.emit('message','user disconnected ')
            //     })
            
 // })
            
 
 //tech namespace
//  const tech=io.of('/tech');
//  tech.on('connection',(socket)=>{
//          console.log('user connected');
//          socket.on('message',(msg)=>{
//                  console.log(`message: ${msg}`);
//                  tech.emit(`message`,msg);
//              });
         
//              socket.on('disconnected',()=>{
//                      console.log('user disconnected');
             
//                      tech.emit('message','user disconnected ')
//                  })
             
//   })


const tech=io.of('/tech');
 tech.on('connection',(socket)=>{
         socket.on('join',(data)=>{
             socket.join(data.room);
             tech.in(data.room).emit('message',`New user joined ${data.room} room!`)
         })
         socket.on('message',(data)=>{
                 console.log(`message: ${data.msg}`);
                 tech.in(data.room).emit(`message`,data.msg);
             });
         
             socket.on('disconnected',()=>{
                     console.log('user disconnected');
             
                     tech.emit('message','user disconnected ')
                 })
             
  })
             