//set
var names = ['Vasya', 'Nastya', 'Kolya'];
localStorage.names = JSON.stringify(names);
if(localStorage.names){alert('"names" are in storage, well done')}
//get
names = localStorage.names ? JSON.parse(localStorage.names) : [];
