const TelegramBot = require('node-telegram-bot-api');
const messager =require("./Nodemailer");

const bot = new TelegramBot('5832658321:AAHi0nql4-cWL2bdrnx4KfJ686H5aEfSWok', { polling: true });

const sessions = {};


bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const messageText = msg.text;

  // Retrieve or create the session for the user
  const session = getSession(userId);

  // Handle the incoming message and update the session
  handleIncomingMessage(chatId, session, messageText);

  // Save the session
  saveSession(userId, session);
});

function getSession(userId) {
  if (!sessions[userId]) {
    sessions[userId] = {
      // Initialize session properties here
    };
  }

  return sessions[userId];
}

function saveSession(userId, session) {
  sessions[userId] = session;
}

function handleIncomingMessage(chatId, session, messageText) {
  // Access and modify session properties based on message content
  // Implement your logic here

  // Example: Greet the user for the first time
  if (!session.isFirstTime) {
    let regex = new RegExp("([!#-'+/-9=?A-Z^-~-]+(\.[!#-'+/-9=?A-Z^-~-]+)|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'+/-9=?A-Z^-~-]+(\.[!#-'+/-9=?A-Z^-~-]+)|\[[\t -Z^-~]*])");
    
    if(messageText=="/start")
    {
    
    }else
    if(messageText.toLowerCase()=="live")
    {
      senddata(chatId);

    }else
    if(regex.test(messageText))
    {
      telegram_id_update(chatId,messageText);

    }
    else
    {
    bot.sendMessage(chatId, 'Enter the Email id or Live ');
    console.log(messageText);
    }
    session.isFirstTime = true;
  } else {
    
    //const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let regex = new RegExp("([!#-'+/-9=?A-Z^-~-]+(\.[!#-'+/-9=?A-Z^-~-]+)|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'+/-9=?A-Z^-~-]+(\.[!#-'+/-9=?A-Z^-~-]+)|\[[\t -Z^-~]*])");
    console.log(regex.test(messageText))
    messageText=messageText.toLowerCase();
    if(regex.test(messageText))
    {
    telegram_id_update(chatId,messageText).
    session.isFirstTime = false;
    }
    else if(messageText=="live")
    {console.log("message of live");
      
        senddata(chatId);
    }
    else if(messageText!="/start")
    {
      bot.sendMessage(chatId, 'Enter the Email id or Live ');
      
    }
  }
}

// Start the bot
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  // Retrieve or create the session for the user
  const session = getSession(userId);

  // Handle the start command and update the session
  handleStartCommand(chatId, session);

  // Save the session
  saveSession(userId, session);
});

function handleStartCommand(chatId, session) {
  // Access and modify session properties based on the start command
  // Implement your logic here

  // Example: Set a welcome message
  session.welcomeMessage = 'Welcome to the Air Quality Management System';
  bot.sendMessage(chatId, session.welcomeMessage).then(res=> { bot.sendMessage(chatId, "Develeoped for HACK-n-LEAD ")}).then(res=> { bot.sendMessage(chatId, "Enter the Email id ").then(res=>{bot.sendMessage(chatId,  "For the AQMS subscription");} ); });
  
  


}

function telegram_id_update(chatId,email)
{email=email.toLowerCase();
  const data={TelegramId:chatId,Email:email};
			const option ={
				method:'POST',
				headers: {
					'Content-Type': 'application/json'
				  },
				body:JSON.stringify(data)
			}
			fetch("http://192.46.211.177:3001/customerData",{
				method:'POST',
				headers: {
					'Content-Type': 'application/json'
				  },
				body:JSON.stringify(data)
			}).then( res => res.json()).then(res=> {console.log(res);
				console.log(res.message);
				if(res.message==undefined)
				{
					messageq=res.error;
          bot.sendMessage(chatId,messageq).then(res=>{bot.sendMessage(chatId,"Enter the Correct Email id")});
				}
				else
				{
					messageq=res.message;
          bot.sendMessage(chatId,messageq).then(res=>{bot.sendMessage(chatId,"Thank you")});
				}
				
        console.log(messageq);

		})

	
	


}

function senddata(chatId)
{
  const data={telegramId:chatId};
  
  const option ={
    method:'POST',
    headers: {
      'Content-Type': 'application/json'
      },
    body:JSON.stringify(data)
  }
  fetch("http://192.46.211.177:4001/get-zone-by-tid",{
    method:'POST',
    headers: {
      'Content-Type': 'application/json'
      },
    body:JSON.stringify(data)
  }).then( res => res.json()).then(res=> {console.log(res);
    console.log(res.message);
    if(res.ZoneId==undefined)
    {
      messageq=res.message;
      bot.sendMessage(chatId,messageq).then(res=>{bot.sendMessage(chatId," Please subscribe")});
    }
    else
    {
      
      messageq=res.ZoneId;
      data1={ZoneId:messageq}
      fetch("http://192.46.211.177:4001/get-live-by-zone",{
    method:'POST',
    headers: {
      'Content-Type': 'application/json'
      },
    body:JSON.stringify(data1)
  }).then( res => res.json()).then(res=> {console.log(res);
    messagedata=""
    
      messagedata+=`The Live Data of Zone ${res[0].ZoneId} \nTemperature: ${res[0].Temperature}\nHumidity: ${res[0].Humidity}\nRainLevel: ${res[0].RainLevel}\nFlammableConcentration: ${res[0].FlammableConcentration}\nAirQuality: ${res[0].AirQuality}`;
      
     NotificationManager();
    bot.sendMessage(chatId,messagedata).then(res=>{bot.sendMessage(chatId,"Thank you")});
  
  });
      
    }
    
    console.log(messageq);

})

}


function NotificationManager()
{

//let zone=undefined;
fetch("http://192.46.211.177:3001/zone",{
    method:'POST',
    headers: {
      'Content-Type': 'application/json'
      },
      body:""
   
  }).then( res => res.json()).then(res=> {console.log(res);
    
      // checking the  Value
          console.log(typeof(res));
        res.forEach(zone => {
          
        
       // console.log(zone.ZoneId)
          data1={"ZoneId":zone.ZoneId}
          fetch("http://192.46.211.177:4001/get-live-by-zone",{
    method:'POST',
    headers: {
      'Content-Type': 'application/json'
      },
    body:JSON.stringify(data1)
  }).then(res=>res.json()).then(res => {console.log(res)
    //console.log("Temp",res[0].Temperature)
    temp=res[0].Temperature;
    
  if(temp>40)
  {
    console.log("Zone",zone.ZoneId);
    sendnotification(zone.ZoneId,"Notification \nFeeling the heat? Stay chill and beat the temperature rise with a refreshing breeze! ")
  }
  if(res[0].AirQuality>1000)
  {
    sendnotification(zone.ZoneId," Notification \n Air Quality Above Mentioned level  ")

  }

  if(res[0].FlammableConcentration>1000)
  {
    sendnotification(zone.ZoneId,"Notification \n FlammbleConcentratin  Above Mentioned level  ")

  }
  if(res[0].RainLevel==1)
  {
    sendnotification(zone.ZoneId," Notification \n it's Raining   ")

  }



  
  
  
  
  }).catch(error=>{ console.log(error)});
        })

   


})
}


function  sendnotification(zone,message)
{
    data={ZoneId:zone}
    console.log(data)
  fetch("http://192.46.211.177:3001/TelegramData",{
    method:'POST',
    headers: {
      'Content-Type': 'application/json'
      },
      body:JSON.stringify(data)
   
  }).then(res=>res.json()).then(res=>{
    console.log(res)
    res.forEach(element => {
      console.log(element.telegramId);
      messager("IOT ALERT ",message,element.email);
      bot.sendMessage(element.telegramId,message);
    });
  })

}

setInterval(NotificationManager,30000);

function smtp_send()
{

}
// Run the bot
bot.startPolling();